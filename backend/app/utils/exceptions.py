"""Domain exceptions.

Services raise these instead of ``HTTPException``, so they stay testable
without a web server and know nothing about HTTP mechanics. Each exception
carries the status code it should surface as, letting ``main.py`` register a
single handler for the whole family.

Every exception is raised somewhere in the current pipeline — there are no
placeholders for future features.
"""

from __future__ import annotations


class ChainTrustError(Exception):
    """Base class for every error the application raises deliberately.

    Subclasses override ``status_code`` and ``detail``. Anything not derived
    from this class is an unexpected bug and becomes a generic 500.
    """

    status_code: int = 500
    detail: str = "An unexpected error occurred."

    def __init__(self, detail: str | None = None) -> None:
        # Callers may pass a specific message; otherwise the class default is
        # already user-facing and safe to return in a response.
        if detail is not None:
            self.detail = detail
        super().__init__(self.detail)


# --- Upload and document errors -----------------------------------------


class InvalidFileTypeError(ChainTrustError):
    """Raised by the route when the upload is not a PDF, DOCX, or TXT."""

    status_code = 415
    detail = "Unsupported file type. Upload a PDF, DOCX, or TXT file."


class FileTooLargeError(ChainTrustError):
    """Raised by the route when the upload exceeds MAX_FILE_SIZE_MB."""

    status_code = 413
    detail = "File is too large."


class DocumentParseError(ChainTrustError):
    """Raised by the parser when a file cannot be opened or decoded."""

    status_code = 422
    detail = "The document could not be read. It may be corrupt or password protected."


class EmptyDocumentError(ChainTrustError):
    """Raised by the parser when a file opens but yields no usable text.

    Typically a scanned PDF with no text layer.
    """

    status_code = 422
    detail = "The document contains no readable text. Scanned images are not supported."


# --- LLM errors ----------------------------------------------------------


class LLMProviderError(ChainTrustError):
    """Raised by a provider on a failed call: bad key, rate limit, 5xx."""

    status_code = 502
    detail = "The AI provider could not complete the request."


class LLMTimeoutError(ChainTrustError):
    """Raised by a provider when a call exceeds REQUEST_TIMEOUT."""

    status_code = 504
    detail = "Analysis timed out. Try again or upload a shorter contract."


class InvalidLLMResponseError(ChainTrustError):
    """Raised by the validator when model output is not a usable report."""

    status_code = 502
    detail = "The AI returned a response that could not be parsed."
