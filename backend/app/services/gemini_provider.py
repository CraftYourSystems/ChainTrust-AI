"""Google Gemini provider (primary).

Implements LLMProvider against the Generative Language REST API. Its only
job is transport: build the request, send it, unwrap the reply, and return
the model's text exactly as received.

The HTTP envelope is deserialised to reach that text — but the text itself
is never inspected, trimmed, or validated. That is the validator's job.
"""

from __future__ import annotations

import httpx

from app.config import settings
from app.services.base_provider import LLMProvider
from app.utils.exceptions import LLMProviderError, LLMTimeoutError

_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

# Low but non-zero: due diligence should be reproducible, not robotic.
_TEMPERATURE = 0.2


def _describe_http_error(response: httpx.Response) -> str:
    """Build a message from Gemini's own error body when it provides one."""
    try:
        message = response.json().get("error", {}).get("message", "")
    except ValueError:
        message = response.text[:200]

    suffix = f": {message}" if message else ""
    return f"Gemini request failed with HTTP {response.status_code}{suffix}"


def _extract_text(response: httpx.Response) -> str:
    """Pull the generated text out of the Gemini response envelope."""
    try:
        body = response.json()
    except ValueError as exc:
        raise LLMProviderError("Gemini returned a non-JSON response.") from exc

    blocked = body.get("promptFeedback", {}).get("blockReason")
    if blocked:
        raise LLMProviderError(f"Gemini declined to analyse this contract (reason: {blocked}).")

    candidates = body.get("candidates")
    if not candidates:
        raise LLMProviderError("Gemini returned no candidates.")

    candidate = candidates[0]
    if "content" not in candidate:
        # Typically a safety filter or a token limit hit before any output.
        raise LLMProviderError(
            f"Gemini returned no content (finishReason: {candidate.get('finishReason')})."
        )

    try:
        parts = candidate["content"]["parts"]
        text = "".join(part["text"] for part in parts)
    except (KeyError, TypeError) as exc:
        raise LLMProviderError("Gemini returned an unexpected response shape.") from exc

    if not text.strip():
        raise LLMProviderError("Gemini returned an empty response.")

    return text


class GeminiProvider(LLMProvider):
    """Calls Gemini's generateContent endpoint."""

    provider_name = "gemini"

    def __init__(self) -> None:
        api_key = settings.gemini_api_key.strip()
        if not api_key:
            raise LLMProviderError("GEMINI_API_KEY is not set. Add it to backend/.env")

        self._api_key = api_key
        self._model = settings.gemini_model
        self._timeout = settings.request_timeout

    async def generate(self, prompt: str) -> str:
        url = f"{_API_BASE}/{self._model}:generateContent"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                # Ask for raw JSON so the model has no reason to emit fences.
                # The validator still strips them defensively.
                "responseMimeType": "application/json",
                "temperature": _TEMPERATURE,
            },
        }
        headers = {
            # Header rather than ?key= so the secret stays out of URLs and logs.
            "x-goog-api-key": self._api_key,
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=self._timeout) as client:
                response = await client.post(url, json=payload, headers=headers)
        except httpx.TimeoutException as exc:
            raise LLMTimeoutError() from exc
        except httpx.HTTPError as exc:
            raise LLMProviderError(f"Could not reach Gemini ({type(exc).__name__}).") from exc

        if response.status_code >= 400:
            raise LLMProviderError(_describe_http_error(response))

        return _extract_text(response)
