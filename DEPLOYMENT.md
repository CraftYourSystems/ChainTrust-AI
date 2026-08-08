# Deploying ChainTrust AI — Vercel frontend, local backend

The Next.js app deploys to Vercel. The Python analysis engine keeps running on
your own machine at `localhost:8000`.

## Why this works

The contract upload calls the Python engine from a **client component**
(`src/services/analysis.service.ts`, used by `/loading` and `/ai-ingestion`).
That `fetch` executes in the visitor's browser, so `http://localhost:8000`
resolves to *their* machine — and on your machine, that is your running
backend. Vercel's servers are never involved in that request and never need to
reach your laptop.

The Algorand anchoring route (`/api/ledger/anchor`) does run server-side on
Vercel, but it only talks to public AlgoNode endpoints, so it needs no tunnel.

```
Browser (your machine)
   |
   |-- https -----> Vercel: pages, /api/ledger/anchor --> Algorand TestNet
   |
   '-- http ------> localhost:8000 (FastAPI on your machine)
```

## Read this before you rely on it

- **Only your machine can use the analysis feature.** Anyone else opening the
  Vercel URL has nothing on their port 8000, so upload fails with "Could not
  reach the analysis engine". If judges or teammates need a working demo, use
  the tunnel option at the bottom.
- **Chrome will ask permission.** A public HTTPS origin calling a loopback
  address triggers Private Network Access. The backend now returns the
  `Access-Control-Allow-Private-Network` header it requires, but Chrome 130+
  also shows a "Local network access" prompt — click **Allow**.
- **Mixed content is fine here.** Browsers classify `http://localhost` as a
  potentially trustworthy origin, so an HTTPS page is allowed to call it.
- **Firefox is the fallback if Chrome misbehaves**; it does not implement the
  PNA permission prompt.

## 1. Deploy the frontend

```bash
npm i -g vercel
vercel            # first run links the project
vercel --prod
```

Or import the GitHub repo at vercel.com — the Next.js preset needs no changes.

`backend/` is excluded from the upload via `.vercelignore`, and `postinstall`
runs `prisma generate` so the Prisma client is built fresh on Vercel.

## 2. Set environment variables

In **Vercel → Settings → Environment Variables**, add the values from
`.env.example`. The minimum for the full flow:

| Variable | Value | Why |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Where the browser sends contracts |
| `PLATFORM_MNEMONIC` | your 25-word TestNet mnemonic | Signs the on-chain proof |

`NEXT_PUBLIC_API_URL` is inlined at build time — **redeploy after changing it**.

Everything else has a working default. `DATABASE_URL` is optional: only
`/api/analysis/submit`, `/api/ledger/[reportId]` and `/api/payment/*` use
Postgres, and the main upload → analyse → anchor → report flow does not touch
them. Vercel cannot reach a database on your localhost, so point it at a hosted
Postgres (Neon, Supabase, Vercel Postgres) if you need those routes.

## 3. Run the backend locally

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Keep this running while you use the deployed site.

Optionally restrict who may call it — in `backend/.env`:

```
ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:3000
```

Default is `*`, which is what local development expects.

## 4. Verify

1. Open your Vercel URL.
2. Upload a contract. Allow the Chrome local-network prompt if it appears.
3. A failure here is the backend: check the uvicorn terminal, and confirm
   `http://localhost:8000/docs` loads.
4. The report page should show a real Algorand TxID. If it says
   "Pending anchoring", `PLATFORM_MNEMONIC` is missing or its account is
   unfunded — fund it at the Algorand TestNet dispenser.

## Making it work for everyone (tunnel)

To let other people use the deployed demo, expose the backend publicly instead:

```bash
cloudflared tunnel --url http://localhost:8000
# or: ngrok http 8000
```

Set `NEXT_PUBLIC_API_URL` to the HTTPS URL it prints and redeploy. This also
removes the Private Network Access prompt entirely, since the request is no
longer public → private.
