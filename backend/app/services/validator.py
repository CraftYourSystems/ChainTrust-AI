"""Model-output validation — the trust boundary.

Everything upstream of this module is untrusted text. Everything downstream
can assume a well-formed DueDiligenceReport.

The only permitted repairs are to the *envelope* around the JSON: code
fences, surrounding prose, and stray whitespace. The contents are never
altered. If a required field is missing or a value is out of range, this
module raises rather than guessing — a wrong report is worse than no report.

Documented exception — three normalisations happen inside the schema itself
(app/schemas/response.py), not here, and are approved:

  1. riskLevel is derived from overallRisk when the model omits it. The
     derivation is deterministic and never overrides a value the model
     actually supplied.
  2. Risk values are normalised for casing and common synonyms, so
     "moderate" and "HIGH" resolve to Medium and High.
  3. Blank strings are dropped from keyFindings and actionItems.

No other missing or invalid business field is ever repaired or invented.
Notably, a missing overallRisk, executiveSummary, or clause field is a hard
failure, as is any out-of-range score.

Deterministic and side-effect free. Retries and provider fallback belong to
LLMService.
"""

from __future__ import annotations

import json
import re

from pydantic import ValidationError

from app.schemas.response import DueDiligenceReport
from app.utils.exceptions import InvalidLLMResponseError

# Matches a ```json ... ``` or ``` ... ``` block, capturing its contents.
_FENCED_BLOCK = re.compile(r"```(?:json)?\s*(.*?)\s*```", re.DOTALL | re.IGNORECASE)


def _strip_code_fences(text: str) -> str:
    """Return the contents of the first fenced block, or the text unchanged."""
    match = _FENCED_BLOCK.search(text)
    return match.group(1) if match else text


def _extract_json_object(text: str) -> str:
    """Return the first complete top-level JSON object in ``text``.

    Scans with brace depth while tracking string state, so braces inside
    string values (common in contract quotations) do not end the object, and
    trailing prose after the closing brace is discarded.
    """
    start = text.find("{")
    if start == -1:
        raise InvalidLLMResponseError("The AI response did not contain a JSON object.")

    depth = 0
    in_string = False
    escaped = False

    for index in range(start, len(text)):
        char = text[index]

        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                in_string = False
            continue

        if char == '"':
            in_string = True
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return text[start : index + 1]

    raise InvalidLLMResponseError("The AI response contained an incomplete JSON object.")


def _summarise(error: ValidationError, limit: int = 3) -> str:
    """Condense Pydantic errors into one line for the response and logs."""
    parts = []
    for detail in error.errors()[:limit]:
        location = ".".join(str(item) for item in detail["loc"]) or "root"
        parts.append(f"{location}: {detail['msg']}")

    remaining = error.error_count() - len(parts)
    if remaining > 0:
        parts.append(f"and {remaining} more")

    return "; ".join(parts)


def validate_report(raw: str) -> DueDiligenceReport:
    """Convert a raw LLM reply into a verified DueDiligenceReport.

    Args:
        raw: The model's response text, possibly fenced or wrapped in prose.

    Returns:
        A validated report. Values are exactly as the model produced them.

    Raises:
        InvalidLLMResponseError: The response was empty, contained no JSON,
            was malformed, or did not satisfy the report schema.
    """
    if not isinstance(raw, str) or not raw.strip():
        raise InvalidLLMResponseError("The AI returned an empty response.")

    candidate = _extract_json_object(_strip_code_fences(raw))

    try:
        payload = json.loads(candidate)
    except json.JSONDecodeError as exc:
        raise InvalidLLMResponseError(
            f"The AI response was not valid JSON ({exc.msg} at line {exc.lineno})."
        ) from exc

    if not isinstance(payload, dict):
        raise InvalidLLMResponseError("The AI response was not a JSON object.")

    try:
        return DueDiligenceReport.model_validate(payload)
    except ValidationError as exc:
        raise InvalidLLMResponseError(
            f"The AI response did not match the required format ({_summarise(exc)})."
        ) from exc
