"""Centralised application configuration.

Every tunable value lives here and is read from the environment (or
``backend/.env``). No other module calls ``os.getenv``, so switching LLM
provider or bumping a timeout is always a one-line change in one file.

Import the module-level ``settings`` singleton:

    from app.config import settings
"""

from __future__ import annotations

from pathlib import Path
from typing import Literal

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# backend/ — resolved from this file so the app works from any working directory.
BACKEND_ROOT = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    """Application settings, populated from environment variables."""

    model_config = SettingsConfigDict(
        env_file=BACKEND_ROOT / ".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # --- LLM provider ---------------------------------------------------
    llm_provider: Literal["gemini", "gpt"] = "gemini"
    gemini_api_key: str = ""
    openai_api_key: str = ""
    # Floating alias: Google points it at a currently-served flash model.
    # Pinned versions get retired ("no longer available to new users") or run
    # out of capacity, which surfaces as a 404 or 503 on every request.
    gemini_model: str = "gemini-flash-latest"
    openai_model: str = "gpt-4o-mini"

    # --- LLM request behaviour ------------------------------------------
    request_timeout: int = Field(default=60, gt=0, description="Seconds to wait for an LLM response.")

    # --- Uploads ---------------------------------------------------------
    max_file_size_mb: int = Field(default=10, gt=0)
    upload_directory: Path = BACKEND_ROOT / "app" / "uploads"

    @property
    def max_file_size_bytes(self) -> int:
        """Upload ceiling in bytes, for comparing against a request body."""
        return self.max_file_size_mb * 1024 * 1024

    @field_validator("llm_provider", mode="before")
    @classmethod
    def _normalise_provider(cls, value: object) -> object:
        """Accept ``GPT`` / ``Gemini`` as well as the canonical lowercase."""
        return value.strip().lower() if isinstance(value, str) else value

    @field_validator("upload_directory", mode="after")
    @classmethod
    def _anchor_to_backend_root(cls, value: Path) -> Path:
        """Resolve a relative UPLOAD_DIRECTORY against backend/, not the cwd."""
        resolved = value if value.is_absolute() else BACKEND_ROOT / value
        resolved.mkdir(parents=True, exist_ok=True)
        return resolved


settings = Settings()
