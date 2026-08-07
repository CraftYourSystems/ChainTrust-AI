"""Probe which Gemini models this API key can actually reach.

Development script only. Lists the models the key is entitled to, then sends
the real ChainTrust prompt to each flash-class candidate and reports the HTTP
status. Read-only: imports production code but changes nothing.

    PYTHONPATH=. .venv/Scripts/python.exe scratchpad/probe_models.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import httpx

from app.config import settings
from app.services import llm_service as svc
from app.services.gemini_provider import _API_BASE, _TEMPERATURE
from app.services.parser import extract_text

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sample_contract import SAMPLE_CONTRACT  # noqa: E402

API_KEY = settings.gemini_api_key.strip()
HEADERS = {"x-goog-api-key": API_KEY, "Content-Type": "application/json"}

print("=" * 74)
print("MODELS AVAILABLE TO THIS API KEY")
print("=" * 74)

listing = httpx.get(f"{_API_BASE}", headers=HEADERS, timeout=30)
print(f"GET /v1beta/models -> HTTP {listing.status_code}")

available = []
if listing.status_code == 200:
    for model in listing.json().get("models", []):
        name = model.get("name", "").replace("models/", "")
        methods = model.get("supportedGenerationMethods", [])
        if "generateContent" in methods:
            available.append(name)
    for name in sorted(available):
        marker = "  <-- configured" if name == settings.gemini_model else ""
        print(f"  {name}{marker}")
    print(f"\n  total generateContent models: {len(available)}")
    print(f"  is '{settings.gemini_model}' in the list? {settings.gemini_model in available}")
else:
    print(listing.text[:1000])

# ---------------------------------------------------------------- live probe
contract = extract_text(SAMPLE_CONTRACT.encode("utf-8"), filename="s.txt")
prompt = svc._TEMPLATE.replace(svc._PLACEHOLDER, contract)

CANDIDATES = [
    settings.gemini_model,
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
]
seen = set()
candidates = [m for m in CANDIDATES if not (m in seen or seen.add(m))]

print("\n" + "=" * 74)
print(f"REAL PROMPT ({len(prompt):,} chars) SENT TO EACH CANDIDATE")
print("=" * 74)

results = {}
for model in candidates:
    if available and model not in available:
        print(f"\n{model:24} SKIPPED - not offered to this key")
        results[model] = "not available"
        continue

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": _TEMPERATURE,
        },
    }
    try:
        response = httpx.post(
            f"{_API_BASE}/{model}:generateContent",
            json=payload,
            headers=HEADERS,
            timeout=settings.request_timeout,
        )
    except Exception as exc:
        print(f"\n{model:24} TRANSPORT ERROR {type(exc).__name__}: {exc}")
        results[model] = f"transport {type(exc).__name__}"
        continue

    elapsed = response.elapsed.total_seconds()
    print(f"\n{model:24} HTTP {response.status_code}  ({elapsed:.1f}s)")

    if response.status_code != 200:
        try:
            message = response.json()["error"]["message"]
        except Exception:
            message = response.text[:200]
        print(f"{'':24} {message}")
        results[model] = f"HTTP {response.status_code}"
        continue

    body = response.json()
    candidate = (body.get("candidates") or [{}])[0]
    finish = candidate.get("finishReason")
    content = candidate.get("content") or {}
    parts = content.get("parts") or []
    text = "".join(p.get("text", "") for p in parts)
    usage = body.get("usageMetadata", {})

    print(f"{'':24} finishReason={finish}  parts={len(parts)}  text={len(text)} chars")
    print(f"{'':24} tokens: prompt={usage.get('promptTokenCount')} "
          f"candidates={usage.get('candidatesTokenCount')} "
          f"thoughts={usage.get('thoughtsTokenCount')} total={usage.get('totalTokenCount')}")

    if not text:
        print(f"{'':24} NO TEXT RETURNED")
        results[model] = f"200 but empty (finishReason={finish})"
        continue

    try:
        parsed = json.loads(text)
        keys = sorted(parsed) if isinstance(parsed, dict) else type(parsed).__name__
        print(f"{'':24} valid JSON, keys={keys}")
        results[model] = "OK"
    except json.JSONDecodeError as exc:
        print(f"{'':24} INVALID JSON: {exc.msg}")
        print(f"{'':24} first 200 chars: {text[:200]!r}")
        results[model] = "200 but invalid JSON"

print("\n" + "=" * 74)
print("SUMMARY")
print("=" * 74)
for model, outcome in results.items():
    flag = "OK  " if outcome == "OK" else "FAIL"
    print(f"  [{flag}] {model:24} {outcome}")
