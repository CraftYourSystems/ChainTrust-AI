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
from app.config import settings
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
    allow_origins=settings.allowed_origins_list,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Added after CORSMiddleware, so it wraps it: Starlette treats the
# last-registered middleware as the outermost one, which means this sees the
# preflight response CORSMiddleware returns and can still add to it.
@app.middleware("http")
async def allow_private_network_access(request: Request, call_next):
    """Let an HTTPS page on a public origin reach this loopback server.

    Chrome's Private Network Access check blocks a public origin (the deployed
    Vercel frontend) from calling a private address (this server on
    localhost). It sends the preflight with
    ``Access-Control-Request-Private-Network: true`` and refuses the real
    request unless the response grants it. CORSMiddleware does not emit that
    header, so it is added here.

    Chrome 130+ additionally shows the user a Local Network Access permission
    prompt; the header is necessary but the user must still accept.
    """
    response = await call_next(request)
    if request.headers.get("access-control-request-private-network") == "true":
        response.headers["Access-Control-Allow-Private-Network"] = "true"
    return response


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
