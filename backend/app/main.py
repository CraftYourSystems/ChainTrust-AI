"""FastAPI application entrypoint.

Creates the app, installs middleware, mounts the router, and translates
domain exceptions into HTTP responses. Contains no business logic.

Run with:

    uvicorn app.main:app --reload
"""

from __future__ import annotations

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app import __version__
from app.routes import analyze
from app.utils.exceptions import ChainTrustError

app = FastAPI(
    title="ChainTrust AI",
    description=(
        "AI-powered contract due diligence. Upload a contract and receive a "
        "structured risk report."
    ),
    version=__version__,
)

# Open CORS so a browser-based demo page can call the API directly. Tighten
# this to specific origins before any real deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ChainTrustError)
async def handle_chaintrust_error(request: Request, exc: ChainTrustError) -> JSONResponse:
    """Render any domain exception using the status code it carries.

    New exceptions need no change here — they inherit both the mapping and
    this handler from ChainTrustError.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": type(exc).__name__, "detail": exc.detail},
    )


app.include_router(analyze.router)
