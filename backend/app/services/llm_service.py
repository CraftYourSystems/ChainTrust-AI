"""LLM orchestration facade — the only LLM entrypoint the application uses.

Owns the two decisions no single provider can make:

  1. Which provider runs first (settings.LLM_PROVIDER).
  2. When to fall back to the other provider.

Callers pass contract text and receive the model's raw reply. They never
import GeminiProvider or GPTProvider, and never see which one answered.
Turning that reply into a report is the validator's job.
"""

from __future__ import annotations

from pathlib import Path

from app.config import settings
from app.services.base_provider import LLMProvider
from app.services.gemini_provider import GeminiProvider
from app.services.gpt_provider import GPTProvider
from app.utils.exceptions import LLMProviderError, LLMTimeoutError

_PROMPT_PATH = Path(__file__).resolve().parent.parent / "prompts" / "due_diligence_prompt.txt"
_PLACEHOLDER = "{{CONTRACT_TEXT}}"

_PROVIDERS: dict[str, type[LLMProvider]] = {
    "gemini": GeminiProvider,
    "gpt": GPTProvider,
}

# Read once at import. No API key needed, so startup stays lightweight, and a
# missing or malformed prompt file fails immediately rather than mid-demo.
_TEMPLATE = _PROMPT_PATH.read_text(encoding="utf-8")

if _PLACEHOLDER not in _TEMPLATE:
    raise RuntimeError(f"{_PROMPT_PATH.name} is missing the {_PLACEHOLDER} placeholder.")


def _build_chain() -> list[LLMProvider]:
    """Instantiate the configured provider first, then the other as fallback.

    A provider whose API key is absent raises on construction and is simply
    left out of the chain, so a single-key setup still works.
    """
    preferred = settings.llm_provider
    order = [preferred] + [name for name in _PROVIDERS if name != preferred]

    chain: list[LLMProvider] = []
    for name in order:
        try:
            chain.append(_PROVIDERS[name]())
        except LLMProviderError:
            continue

    if not chain:
        raise LLMProviderError(
            "No LLM provider is configured. Set GEMINI_API_KEY or OPENAI_API_KEY "
            "in backend/.env"
        )
    return chain


class LLMService:
    """Runs a contract through the configured provider chain."""

    def __init__(self) -> None:
        self._providers = _build_chain()

    @property
    def provider_names(self) -> list[str]:
        """Providers in the order they will be attempted."""
        return [provider.provider_name for provider in self._providers]

    async def analyse(self, contract_text: str) -> str:
        """Return the model's raw reply for ``contract_text``.

        Each provider gets exactly one attempt. A failure moves straight to
        the fallback rather than retrying, which caps worst-case latency at
        two requests — the right trade for a live demo. If both fail, the last
        error is re-raised so the route surfaces an accurate status code:
        504 for a timeout, 502 otherwise.

        Raises:
            LLMTimeoutError: The final attempt timed out.
            LLMProviderError: No provider is configured, or all attempts failed.
        """
        prompt = _TEMPLATE.replace(_PLACEHOLDER, contract_text)
        last_error: LLMProviderError | LLMTimeoutError | None = None

        for provider in self._providers:
            try:
                return await provider.generate(prompt)
            except (LLMTimeoutError, LLMProviderError) as exc:
                last_error = exc

        raise last_error
