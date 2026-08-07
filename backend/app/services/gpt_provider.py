"""OpenAI GPT provider (fallback).

Implements LLMProvider against the Chat Completions REST API. Structurally
identical to GeminiProvider — only the endpoint, request body, authentication
scheme, and response shape differ.

The HTTP envelope is deserialised to reach the generated text — but the text
itself is never inspected, trimmed, or validated. That is the validator's job.
"""

from __future__ import annotations

import httpx

from app.config import settings
from app.services.base_provider import LLMProvider
from app.utils.exceptions import LLMProviderError, LLMTimeoutError

_API_URL = "https://api.openai.com/v1/chat/completions"

# Low but non-zero: due diligence should be reproducible, not robotic.
_TEMPERATURE = 0.2


def _describe_http_error(response: httpx.Response) -> str:
    """Build a message from OpenAI's own error body when it provides one."""
    try:
        message = response.json().get("error", {}).get("message", "")
    except ValueError:
        message = response.text[:200]

    suffix = f": {message}" if message else ""
    return f"OpenAI request failed with HTTP {response.status_code}{suffix}"


def _extract_text(response: httpx.Response) -> str:
    """Pull the generated text out of the Chat Completions response envelope."""
    try:
        body = response.json()
    except ValueError as exc:
        raise LLMProviderError("OpenAI returned a non-JSON response.") from exc

    choices = body.get("choices")
    if not choices:
        raise LLMProviderError("OpenAI returned no choices.")

    choice = choices[0]
    message = choice.get("message")
    if not isinstance(message, dict):
        # Typically a content filter or a token limit hit before any output.
        raise LLMProviderError(
            f"OpenAI returned no message (finish_reason: {choice.get('finish_reason')})."
        )

    refusal = message.get("refusal")
    if refusal:
        raise LLMProviderError(f"OpenAI declined to analyse this contract ({refusal}).")

    text = message.get("content")
    if not isinstance(text, str) or not text.strip():
        raise LLMProviderError(
            f"OpenAI returned an empty response (finish_reason: {choice.get('finish_reason')})."
        )

    return text


class GPTProvider(LLMProvider):
    """Calls OpenAI's chat completions endpoint."""

    provider_name = "gpt"

    def __init__(self) -> None:
        api_key = settings.openai_api_key.strip()
        if not api_key:
            raise LLMProviderError("OPENAI_API_KEY is not set. Add it to backend/.env")

        self._api_key = api_key
        self._model = settings.openai_model
        self._timeout = settings.request_timeout

    async def generate(self, prompt: str) -> str:
        payload = {
            "model": self._model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": _TEMPERATURE,
            # Ask for raw JSON so the model has no reason to emit fences.
            # The validator still strips them defensively.
            "response_format": {"type": "json_object"},
        }
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=self._timeout) as client:
                response = await client.post(_API_URL, json=payload, headers=headers)
        except httpx.TimeoutException as exc:
            raise LLMTimeoutError() from exc
        except httpx.HTTPError as exc:
            raise LLMProviderError(f"Could not reach OpenAI ({type(exc).__name__}).") from exc

        if response.status_code >= 400:
            raise LLMProviderError(_describe_http_error(response))

        return _extract_text(response)
