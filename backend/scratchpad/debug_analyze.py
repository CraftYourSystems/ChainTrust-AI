"""Stage-by-stage diagnostic for a failing POST /analyze.

Development script only. Imports production code read-only and changes
nothing. Run from backend/:

    PYTHONPATH=. .venv/Scripts/python.exe scratchpad/debug_analyze.py
    PYTHONPATH=. .venv/Scripts/python.exe scratchpad/debug_analyze.py path/to/contract.pdf

Walks the real pipeline one stage at a time, printing everything at each
boundary, and reports which stage fails first. Exceptions are printed with
full tracebacks, never swallowed.
"""

from __future__ import annotations

import json
import sys
import traceback
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import httpx
from pydantic import ValidationError

from app.config import settings
from app.schemas.response import DueDiligenceReport
from app.services import llm_service as svc
from app.services.gemini_provider import _API_BASE, _TEMPERATURE, _extract_text
from app.services.parser import extract_text
from app.services.validator import validate_report

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sample_contract import SAMPLE_CONTRACT  # noqa: E402


BAR = "-" * 70


def section(title: str) -> None:
    print(f"\n{BAR}\n{title}\n{BAR}")


def fail(stage: str, reason: str) -> None:
    print(f"\n{'!' * 70}")
    print(f"FAILING STAGE: {stage}")
    print(f"REASON       : {reason}")
    print(f"{'!' * 70}")
    sys.exit(1)


def estimate_tokens(text: str) -> int:
    """Rough English heuristic: ~4 characters per token."""
    return len(text) // 4


# ============================================================ STAGE 1: PARSER
section("STAGE 1  PARSER")

if len(sys.argv) > 1:
    source = Path(sys.argv[1])
    print(f"  source          : {source}")
    try:
        contract_text = extract_text(source)
    except Exception as exc:
        traceback.print_exc()
        fail("STAGE 1 - PARSER", f"{type(exc).__name__}: {exc}")
else:
    print("  source          : built-in sample contract (no path given)")
    contract_text = extract_text(SAMPLE_CONTRACT.encode("utf-8"), filename="sample.txt")

print(f"  contract length : {len(contract_text):,} characters")
print(f"  contract tokens : ~{estimate_tokens(contract_text):,}")
print(f"  lines           : {contract_text.count(chr(10)) + 1}")
print(f"  first 120 chars : {contract_text[:120]!r}")
print("  STAGE 1 OK")

# =================================================== STAGE 2: PROMPT BUILDING
section("STAGE 2  PROMPT CONSTRUCTION")

template = svc._TEMPLATE
placeholder = svc._PLACEHOLDER
print(f"  template chars  : {len(template):,}")
print(f"  placeholder     : {placeholder!r} present={placeholder in template}")

prompt = template.replace(placeholder, contract_text)

if placeholder in prompt:
    fail("STAGE 2 - PROMPT", "placeholder survived substitution")
if contract_text[:60] not in prompt:
    fail("STAGE 2 - PROMPT", "contract text is not present in the rendered prompt")

print(f"  prompt length   : {len(prompt):,} characters")
print(f"  prompt tokens   : ~{estimate_tokens(prompt):,}")
print("  STAGE 2 OK")

# ================================================ STAGE 3: GEMINI API REQUEST
section("STAGE 3  GEMINI API REQUEST")

api_key = settings.gemini_api_key.strip()
if not api_key:
    fail("STAGE 3 - REQUEST", "GEMINI_API_KEY is empty")

url = f"{_API_BASE}/{settings.gemini_model}:generateContent"
payload = {
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {
        "responseMimeType": "application/json",
        "temperature": _TEMPERATURE,
    },
}
encoded = json.dumps(payload).encode("utf-8")

print(f"  provider        : gemini (chain = {svc.LLMService().provider_names})")
print(f"  model           : {settings.gemini_model}")
print(f"  request URL     : {url}")
print(f"  payload size    : {len(encoded):,} bytes")
print(f"  timeout         : {settings.request_timeout}s")
print(f"  temperature     : {_TEMPERATURE}")
print(f"  responseMimeType: {payload['generationConfig']['responseMimeType']}")
print("  api key         : <redacted>")

try:
    response = httpx.post(
        url,
        json=payload,
        headers={"x-goog-api-key": api_key, "Content-Type": "application/json"},
        timeout=settings.request_timeout,
    )
except Exception as exc:
    traceback.print_exc()
    fail("STAGE 3 - REQUEST", f"transport error {type(exc).__name__}: {exc}")

print(f"  HTTP status     : {response.status_code} {response.reason_phrase}")
print(f"  elapsed         : {response.elapsed.total_seconds():.2f}s")

if response.status_code != 200:
    section("NON-200 RESPONSE DETAIL")
    print(f"  HTTP status     : {response.status_code} {response.reason_phrase}")
    print(f"  request URL     : {url}")
    print(f"  model name      : {settings.gemini_model}")
    print(f"  response body   :\n{response.text}")
    fail("STAGE 3 - GEMINI API REQUEST", f"HTTP {response.status_code}")

section("RAW GEMINI RESPONSE (HTTP 200)")
raw_body = response.text
print(raw_body if len(raw_body) < 6000 else raw_body[:6000] + f"\n... [{len(raw_body):,} bytes total]")

body = response.json()
section("RESPONSE STRUCTURE")
print(f"  top-level keys  : {list(body)}")
if "usageMetadata" in body:
    print(f"  usageMetadata   : {json.dumps(body['usageMetadata'], indent=2)}")
if "promptFeedback" in body:
    print(f"  promptFeedback  : {json.dumps(body['promptFeedback'], indent=2)}")
for index, candidate in enumerate(body.get("candidates", [])):
    print(f"  candidate[{index}] keys       : {list(candidate)}")
    print(f"  candidate[{index}] finishReason: {candidate.get('finishReason')}")
    content = candidate.get("content")
    print(f"  candidate[{index}] content     : {list(content) if isinstance(content, dict) else content!r}")
    if isinstance(content, dict):
        parts = content.get("parts")
        print(f"  candidate[{index}] parts       : {parts if not parts else [list(p) for p in parts]}")
print("  STAGE 3 OK (HTTP 200 received)")

# ============================================ STAGE 4: RESPONSE EXTRACTION
section("STAGE 4  GEMINI RESPONSE EXTRACTION")

try:
    extracted = _extract_text(response)
except Exception as exc:
    traceback.print_exc()
    print(f"\n  extraction raised: {type(exc).__name__}: {getattr(exc, 'detail', exc)}")
    fail("STAGE 4 - RESPONSE EXTRACTION", f"{type(exc).__name__}: {getattr(exc, 'detail', exc)}")

print(f"  extracted length: {len(extracted):,} characters")
print(f"  has ``` fences  : {'```' in extracted}")
print(f"  starts with {{   : {extracted.lstrip().startswith('{')}")
print(f"  extracted text  :\n{extracted if len(extracted) < 4000 else extracted[:4000] + ' ...'}")
print("  STAGE 4 OK")

# ========================================================= STAGE 5: VALIDATOR
section("STAGE 5  VALIDATOR")

try:
    report = validate_report(extracted)
except Exception as exc:
    traceback.print_exc()
    print(f"\n  validator raised: {type(exc).__name__}: {getattr(exc, 'detail', exc)}")

    print("\n  --- attempting raw Pydantic validation for the exact error ---")
    try:
        DueDiligenceReport.model_validate(json.loads(extracted))
    except ValidationError as verr:
        print(f"  ValidationError with {verr.error_count()} error(s):")
        for detail in verr.errors():
            location = ".".join(str(part) for part in detail["loc"]) or "root"
            print(f"      {location}: {detail['msg']}  (got {detail.get('input')!r})")
    except json.JSONDecodeError as jerr:
        print(f"  JSONDecodeError: {jerr.msg} at line {jerr.lineno}, column {jerr.colno}")

    fail("STAGE 5 - VALIDATOR", f"{type(exc).__name__}: {getattr(exc, 'detail', exc)}")

print(f"  overallRisk     : {report.overall_risk}")
print(f"  riskLevel       : {report.risk_level.value}")
print(f"  keyFindings     : {len(report.key_findings)}")
print(f"  actionItems     : {len(report.action_items)}")
print(f"  clauses         : {len(report.clauses)}")
print("  STAGE 5 OK")

# ============================================================= STAGE 6: ROUTE
section("STAGE 6  ROUTE (full stack via TestClient)")

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)
http_response = client.post(
    "/analyze",
    files={"file": ("contract.txt", contract_text.encode("utf-8"), "text/plain")},
)
print(f"  HTTP status     : {http_response.status_code}")
body_text = json.dumps(http_response.json(), indent=2)
print(f"  body            :\n{body_text if len(body_text) < 3000 else body_text[:3000] + ' ...'}")

if http_response.status_code != 200:
    fail("STAGE 6 - ROUTE", f"HTTP {http_response.status_code}")

section("RESULT")
print("  ALL SIX STAGES PASSED — POST /analyze succeeds with Gemini only.")
