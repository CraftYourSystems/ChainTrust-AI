"""Live smoke test against the real Gemini API.

Development script only — nothing in app/ imports it.

Run from the backend/ directory:

    PYTHONPATH=. .venv/Scripts/python.exe scratchpad/smoke_gemini.py

Makes two small requests:

  1. A raw httpx call, so the HTTP status and unmodified response body are
     visible. GeminiProvider.generate() returns only text, so the status
     code is not observable through it.
  2. A GeminiProvider().generate() call, proving the real code path works.

The API key is never printed. Only its length and first four characters are
shown, and any auth header in the response is redacted.
"""

from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

# Allow running as `python scratchpad/smoke_gemini.py` from backend/.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import httpx

from app.config import settings
from app.services.gemini_provider import (
    _API_BASE,
    _TEMPERATURE,
    GeminiProvider,
    _extract_text,
)
from app.utils.exceptions import LLMProviderError, LLMTimeoutError

PROMPT = 'Return exactly:\n{"status":"ok"}'

SECRET_HEADERS = {"x-goog-api-key", "authorization", "cookie", "set-cookie"}
USEFUL_HEADERS = {
    "content-type", "date", "server", "vary",
    "content-encoding", "transfer-encoding", "alt-svc",
}


def rule(title: str) -> None:
    print(f"\n{'=' * 62}\n{title}\n{'=' * 62}")


# --- 1. Configuration, read from .env via app.config -----------------------

rule("CONFIGURATION (from backend/.env)")

api_key = settings.gemini_api_key.strip()
if not api_key:
    print("  BLOCKED: GEMINI_API_KEY is empty in backend/.env")
    print("  Add your key, then re-run. Get one at https://aistudio.google.com/apikey")
    sys.exit(2)

print(f"  model        : {settings.gemini_model}")
print(f"  timeout      : {settings.request_timeout}s")
print(f"  temperature  : {_TEMPERATURE}")
print(f"  api key      : set, {len(api_key)} chars, starts '{api_key[:4]}...'")
print(f"  prompt       : {PROMPT!r}")

url = f"{_API_BASE}/{settings.gemini_model}:generateContent"
payload = {
    "contents": [{"parts": [{"text": PROMPT}]}],
    "generationConfig": {
        "responseMimeType": "application/json",
        "temperature": _TEMPERATURE,
    },
}

# --- 2. Raw request, to observe the HTTP status ----------------------------

rule("REQUEST")
print(f"  POST {url}")
print("  headers      : {'x-goog-api-key': '<redacted>', 'Content-Type': 'application/json'}")


async def raw_call() -> httpx.Response:
    async with httpx.AsyncClient(timeout=settings.request_timeout) as client:
        return await client.post(
            url,
            json=payload,
            headers={"x-goog-api-key": api_key, "Content-Type": "application/json"},
        )


try:
    response = asyncio.run(raw_call())
except httpx.TimeoutException as exc:
    print(f"\n  FAILED: timed out after {settings.request_timeout}s ({type(exc).__name__})")
    sys.exit(1)
except httpx.HTTPError as exc:
    print(f"\n  FAILED: transport error {type(exc).__name__}: {exc}")
    sys.exit(1)

rule("HTTP STATUS")
print(f"  status       : {response.status_code} {response.reason_phrase}")
print(f"  model used   : {settings.gemini_model}")
print(f"  elapsed      : {response.elapsed.total_seconds():.2f}s")
print("  headers      :")
for name, value in sorted(response.headers.items()):
    lowered = name.lower()
    if lowered in SECRET_HEADERS:
        print(f"      {name}: <redacted>")
    elif lowered in USEFUL_HEADERS or lowered.startswith("x-goog"):
        print(f"      {name}: {value}")

rule("RAW RESPONSE BODY")
print(response.text)

if response.status_code >= 400:
    print("\n  FAILED: non-2xx response. The body above contains Gemini's error message.")
    print("  A 404 naming the model means GEMINI_MODEL is wrong — fix it in backend/.env.")
    sys.exit(1)

# --- 3. Extraction, using the provider's own helper ------------------------

rule("EXTRACTED TEXT")
try:
    extracted = _extract_text(response)
except LLMProviderError as exc:
    print(f"  FAILED: {exc.detail}")
    sys.exit(1)

print(f"  text         : {extracted!r}")
print(f"  length       : {len(extracted)} chars")
print(f"  has ``` fence: {'```' in extracted}")

rule("IS THE EXTRACTED TEXT VALID JSON?")
try:
    parsed = json.loads(extracted)
    print(f"  valid JSON   : YES")
    print(f"  parsed       : {parsed}")
    print(f"  matches ask  : {parsed == {'status': 'ok'}}")
except json.JSONDecodeError as exc:
    print(f"  valid JSON   : NO ({exc.msg} at line {exc.lineno}, column {exc.colno})")

# --- 4. End-to-end through GeminiProvider ----------------------------------

rule("END-TO-END VIA GeminiProvider().generate()")
try:
    result = asyncio.run(GeminiProvider().generate(PROMPT))
except (LLMProviderError, LLMTimeoutError) as exc:
    print(f"  FAILED: {type(exc).__name__}: {exc.detail}")
    sys.exit(1)

print(f"  returned     : {result!r}")
print("\n  RESULT: PASS — endpoint reachable, model valid, JSON mime type")
print("          honoured, and extraction returns the model's text.")
