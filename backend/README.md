# ChainTrust AI — Backend

AI-powered contract due diligence. Upload a contract, get back a structured
risk report.

> **Status:** backend complete. All twelve modules are implemented and
> verified against stubbed transports. The live Gemini call is still
> unverified — add an API key and run the smoke test to confirm.

---

## Pipeline

```
POST /analyze  (multipart file)
      │
      ▼
┌─────────────┐   bytes → clean text
│   parser    │   PDF · DOCX · TXT
└─────────────┘
      │
      ▼
┌─────────────┐   prompt template + contract text
│ llm_service │   ──► GeminiProvider  (primary)
│  (facade)   │   ──► GPTProvider     (fallback)
└─────────────┘
      │  raw model text
      ▼
┌─────────────┐   strip fences → json.loads → Pydantic
│  validator  │   trust boundary
└─────────────┘
      │
      ▼
  DueDiligenceReport (JSON)
```

Each stage depends only on the stage before it. The route orchestrates; it
does not do the work.

---

## Layout

```
backend/
├── app/
│   ├── main.py                     FastAPI app, exception handlers
│   ├── config.py                   typed settings from .env
│   │
│   ├── routes/
│   │   └── analyze.py              POST /analyze — the only endpoint
│   │
│   ├── services/
│   │   ├── parser.py               document → clean text
│   │   ├── llm_service.py          provider selection + fallback (facade)
│   │   ├── base_provider.py        LLMProvider abstract contract
│   │   ├── gemini_provider.py      Gemini implementation
│   │   ├── gpt_provider.py         OpenAI implementation
│   │   └── validator.py            raw text → validated report
│   │
│   ├── prompts/
│   │   └── due_diligence_prompt.txt
│   │
│   ├── schemas/
│   │   └── response.py             Pydantic API contract
│   │
│   ├── utils/
│   │   └── exceptions.py           domain errors → HTTP codes
│   │
│   └── uploads/                    scratch space (gitignored)
│
├── requirements.txt
├── .env.example
└── README.md
```

---

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux

pip install -r requirements.txt
cp .env.example .env            # then add your API key

uvicorn app.main:app --reload
```

Interactive docs: <http://127.0.0.1:8000/docs>

---

## API

### `POST /analyze`

**Request** — `multipart/form-data`

| Field | Type | Notes                      |
| ----- | ---- | -------------------------- |
| file  | file | `.pdf`, `.docx`, or `.txt` |

**Response** — `200 OK`

```json
{
  "overallRisk": 84,
  "riskLevel": "High",
  "executiveSummary": "...",
  "keyFindings": ["..."],
  "actionItems": ["..."],
  "clauses": [
    {
      "title": "Unlimited Liability",
      "risk": "High",
      "reason": "...",
      "recommendation": "..."
    }
  ]
}
```

**Errors**

| Code | Cause                                      |
| ---- | ------------------------------------------ |
| 413  | File exceeds `MAX_UPLOAD_MB`               |
| 415  | Unsupported file type                      |
| 422  | Document contained no extractable text     |
| 502  | LLM provider error or unparseable response |
| 504  | LLM request timed out                      |

---

## Switching LLM providers

Change one line in `.env`:

```env
LLM_PROVIDER=gpt
```

No code changes. Application code talks only to `LLMService`; providers sit
behind the `LLMProvider` interface in `base_provider.py`.

If both API keys are set, the other provider is used automatically as a
fallback. Each provider gets **one** attempt, so worst-case latency is
`2 x REQUEST_TIMEOUT`. If only one key is set, that provider is used and
there is no fallback.

---

## Not in scope yet

- Blockchain (Algorand + x402) — planned for a later phase
- Frontend, authentication, database
