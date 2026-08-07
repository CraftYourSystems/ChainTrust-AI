"""Pydantic response models — the public API contract.

These models serve two purposes at once:

  1. They validate the JSON the LLM produces (the untrusted side).
  2. They type the ``POST /analyze`` response (the public side).

Using one set of models for both guarantees the contract we promise callers
and the contract we demand of the model can never drift apart.

Field names are snake_case in Python and camelCase on the wire, via
``alias_generator``. Both spellings are accepted on input, so a model that
returns ``overall_risk`` instead of ``overallRisk`` still validates.
"""

from __future__ import annotations

from enum import Enum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from pydantic.alias_generators import to_camel


class RiskLevel(str, Enum):
    """Qualitative risk band.

    Bands are chosen so a score of 84 reads as High, matching the severity
    language used in the due diligence prompt.
    """

    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

    @classmethod
    def from_score(cls, score: int) -> "RiskLevel":
        """Map a 0-100 risk score onto its band."""
        if score < 30:
            return cls.LOW
        if score < 60:
            return cls.MEDIUM
        if score < 85:
            return cls.HIGH
        return cls.CRITICAL

    @classmethod
    def _missing_(cls, value: Any) -> "RiskLevel | None":
        """Accept the casing and phrasing variants LLMs actually emit."""
        if not isinstance(value, str):
            return None
        normalised = value.strip().casefold()
        for member in cls:
            if member.value.casefold() == normalised:
                return member
        return _RISK_SYNONYMS.get(normalised)


_RISK_SYNONYMS: dict[str, RiskLevel] = {
    "none": RiskLevel.LOW,
    "minimal": RiskLevel.LOW,
    "minor": RiskLevel.LOW,
    "moderate": RiskLevel.MEDIUM,
    "med": RiskLevel.MEDIUM,
    "medium-high": RiskLevel.HIGH,
    "elevated": RiskLevel.HIGH,
    "very high": RiskLevel.CRITICAL,
    "severe": RiskLevel.CRITICAL,
}


class _CamelModel(BaseModel):
    """Shared config: camelCase on the wire, tolerant of extra model output."""

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        extra="ignore",
        str_strip_whitespace=True,
        use_enum_values=False,
    )


class Clause(_CamelModel):
    """A single contract clause the model flagged as noteworthy."""

    title: str = Field(min_length=1, description="Name of the clause, e.g. 'Limitation of Liability'.")
    risk: RiskLevel = Field(description="Risk band for this clause.")
    reason: str = Field(min_length=1, description="Why this clause is risky, citing the contract.")
    recommendation: str = Field(min_length=1, description="Concrete redline or negotiation ask.")


class DueDiligenceReport(_CamelModel):
    """The full due diligence report returned by ``POST /analyze``."""

    contract_type: str = Field(
        default="Commercial Agreement",
        description="Identified type of contract, e.g. Service Agreement, NDA, Employment Agreement."
    )
    overall_risk: int = Field(ge=0, le=100, description="Aggregate risk score, 0 (safe) to 100 (severe).")
    risk_level: RiskLevel = Field(description="Band for overall_risk; derived if the model omits it.")
    executive_summary: str = Field(min_length=1, description="Plain-English summary for a decision maker.")
    key_findings: list[str] = Field(default_factory=list, description="Headline risks, one per entry.")
    action_items: list[str] = Field(default_factory=list, description="Recommended next steps, one per entry.")
    clauses: list[Clause] = Field(default_factory=list, description="Per-clause breakdown.")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "contractType": "Consulting Agreement",
                "overallRisk": 62,
                "riskLevel": "High",
                "executiveSummary": (
                    "This consulting agreement shifts commercial risk onto the consultant. "
                    "Liability is uncapped and termination rights are unilateral."
                ),
                "keyFindings": [
                    "Liability is uncapped for all claim types.",
                    "Customer may terminate for convenience on 7 days' notice.",
                ],
                "actionItems": [
                    "Negotiate a liability cap at 12 months of fees.",
                    "Add a reciprocal termination-for-convenience right.",
                ],
                "clauses": [
                    {
                        "title": "Limitation of Liability",
                        "risk": "Critical",
                        "reason": "Clause 11.2 disclaims any cap on supplier liability.",
                        "recommendation": "Insert a mutual cap equal to fees paid in the preceding 12 months.",
                    }
                ],
            }
        }
    )

    @model_validator(mode="before")
    @classmethod
    def _derive_missing_risk_level(cls, data: Any) -> Any:
        """Fill in ``riskLevel`` from ``overallRisk`` when the model omits it.

        Runs before field validation so the field stays required and
        non-nullable in the OpenAPI schema.
        """
        if not isinstance(data, dict):
            return data
        if data.get("riskLevel") or data.get("risk_level"):
            return data

        score = data.get("overallRisk", data.get("overall_risk"))
        if isinstance(score, bool) or not isinstance(score, (int, float)):
            return data
        if not 0 <= score <= 100:
            return data

        data = dict(data)
        data["riskLevel"] = RiskLevel.from_score(int(score))
        return data

    @field_validator("key_findings", "action_items", mode="after")
    @classmethod
    def _drop_blank_entries(cls, values: list[str]) -> list[str]:
        """Keep empty and duplicate bullets out of the rendered report."""
        seen = set()
        result = []
        for item in (v.strip() for v in values):
            if item and item.casefold() not in seen:
                seen.add(item.casefold())
                result.append(item)
        return result
