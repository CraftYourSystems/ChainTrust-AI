"""The LLM provider contract.

Defines the single interface every provider implements. Deliberately holds
no logic: no HTTP, no retries, no configuration, no parsing, no validation.
Those belong to the concrete providers and to LLMService.
"""

from __future__ import annotations

from abc import ABC, abstractmethod


class LLMProvider(ABC):
    """A text-in, text-out large language model.

    Implementations are interchangeable: LLMService selects one from
    configuration and never depends on which it received.
    """

    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Short identifier for logs and error messages, e.g. "gemini"."""

    @abstractmethod
    async def generate(self, prompt: str) -> str:
        """Send ``prompt`` to the model and return its raw reply.

        Returns the response text exactly as received — unparsed and
        unvalidated. Extracting JSON is the validator's job.

        Raises:
            LLMTimeoutError: The call exceeded the configured timeout.
            LLMProviderError: The provider rejected or failed the request.
        """
