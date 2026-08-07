"""POST /analyze — the only endpoint in the API.

Pure orchestration. The route enforces request-level limits, then hands off:

    parser -> LLMService -> validator

It contains no parsing, prompting, provider, or schema logic, and raises only
domain exceptions. main.py maps those to HTTP responses.
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, File, UploadFile

from app.config import settings
from app.schemas.response import DueDiligenceReport, new_analysis_id
from app.services.llm_service import LLMService
from app.services.parser import SUPPORTED_EXTENSIONS, extract_text
from app.services.validator import validate_report
from app.utils.exceptions import FileTooLargeError, InvalidFileTypeError

router = APIRouter(tags=["Analysis"])

_ERROR_RESPONSES: dict[int | str, dict] = {
    413: {"description": "File exceeds MAX_FILE_SIZE_MB."},
    415: {"description": "Unsupported file type. Upload a PDF, DOCX, or TXT file."},
    422: {"description": "Document is empty, corrupt, password protected, or has no text layer."},
    502: {"description": "The AI provider failed, or returned a response that could not be parsed."},
    504: {"description": "The AI analysis timed out."},
}


def _reject_unsupported(filename: str | None) -> None:
    """Reject by extension before reading the body into memory."""
    if not filename:
        raise InvalidFileTypeError("The upload has no filename, so its type cannot be determined.")

    extension = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if extension not in SUPPORTED_EXTENSIONS:
        raise InvalidFileTypeError(
            f"Unsupported file type '{extension or filename}'. Upload a PDF, DOCX, or TXT file."
        )


@router.post(
    "/analyze",
    response_model=DueDiligenceReport,
    summary="Analyse a contract and return a due diligence report",
    description=(
        "Upload a contract as PDF, DOCX, or TXT. The text is extracted, sent to the "
        "configured AI provider for review, and returned as a structured due diligence "
        "report with an overall risk score, an executive summary, key findings, "
        "recommended actions, and a clause-by-clause breakdown."
    ),
    responses=_ERROR_RESPONSES,
)
async def analyze_contract(
    file: Annotated[UploadFile, File(description="Contract to analyse: PDF, DOCX, or TXT.")],
) -> DueDiligenceReport:
    _reject_unsupported(file.filename)

    data = await file.read()
    if len(data) > settings.max_file_size_bytes:
        raise FileTooLargeError(
            f"File is {len(data) / 1_048_576:.1f} MB; the limit is {settings.max_file_size_mb} MB."
        )

    contract_text = extract_text(data, filename=file.filename)
    raw_reply = await LLMService().analyse(contract_text)
    report = validate_report(raw_reply)

    # Assigned here, not by the model: the id must be server-authoritative for
    # the TypeScript ledger to anchor against it. verification stays Pending
    # until that layer records the transaction.
    report.analysis_id = new_analysis_id()
    return report
