# ChainTrust AI 🛡️⚡
> **Blockchain-Powered Contract Intelligence & Due Diligence Platform**

![Algorand](https://img.shields.io/badge/Blockchain-Algorand%20TestNet-000000?style=for-the-badge&logo=algorand&logoColor=white)
![Next.js](https://img.shields.io/badge/Framework-Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📌 Executive Summary

**ChainTrust AI** is a next-generation decentralized contract due diligence and audit platform built on the **Algorand blockchain**. 

Traditional legal and smart contract audits are expensive, opaque, and produce easily tampered static PDFs. ChainTrust AI solves this by combining **AI-powered vulnerability detection** with **immutable on-chain notarization** and an **HTTP 402 micro-payment protocol** — replacing costly monthly SaaS subscriptions with per-request 1.0–5.0 ALGO micro-transactions.

---

## ✨ Key Features & Technical Mechanisms

### 1. ⚡ HTTP 402 Micro-Payment Protocol
- Replaces flat monthly subscriptions with per-request micro-payments.
- API endpoints enforce `HTTP 402 Payment Required` headers until confirmed on-chain via Algorand TestNet.
- Dynamic fee tiers based on file complexity:
  - **`.sol` (Solidity)**: `5.0 ALGO` (Enterprise Audit)
  - **`.teal` (PyTeal)**: `2.0 ALGO` (Express Audit)
  - **`.pdf` / `.docx` / `.txt`**: `1.0 ALGO` (Standard Due Diligence)

### 2. 💳 Persistent Demo Wallet Engine
- Features an integrated **Demo Auditor Account** pre-funded with **10.0 ALGO**.
- Dynamically decrements wallet balance after each audit using a `localStorage` state singleton (`walletStore.ts`).
- Balance persists across browser refreshes and resets back to 10.0 ALGO on wallet disconnect.

### 3. 🧠 AI Risk Scoring & AST Ingestion Engine
- Analyzes uploaded legal documents (`.pdf`, `.docx`) and smart contracts (`.sol`, `.teal`).
- Detects reentrancy loops, uncapped indemnification liabilities, and access control flaws.
- Outputs structured 0–100 risk scores (High, Medium, Low) with clause-by-clause breakdowns and actionable remediation guides.

### 4. ⛓️ RFC 8785 Canonical Notary & SHA-256 Fingerprinting
- Implements RFC 8785 JSON canonicalization to compute deterministic 64-character SHA-256 report fingerprints.
- Permanently anchors report hashes into Algorand transaction note fields (`chaintrust:proof:v1:<ReportHash>:<ContractHash>`).

### 5. 🛡️ Public Tamper Verification Portal
- Allows anyone to upload a report JSON file to publicly verify its integrity.
- Performs real-time hash comparison against the Algorand blockchain ledger to guarantee zero tampering or post-audit alteration.

### 6. 🏛️ 2-of-3 Multisig Governance
- Enterprise-grade certificates require co-signatures from **2 of 3 authorized parties**:
  1. Security Auditor Key
  2. AI Inference Attestation Key
  3. Client Compliance Officer Key
- Constructed using `algosdk.multisigAddress({ version: 1, threshold: 2, addrs: [...] })`.

### 7. 🏆 Algorand Standard Asset (ASA) "Proof-of-Audit" NFT
- Mints an official Algorand ASA (`Unit: AUDITNFT`) directly into the auditor's Web3 wallet as non-fungible proof of compliance.

### 8. 📋 Report History Drawer & Account Dashboard
- Automatically records every completed audit report into a persistent history store (`reportHistory.ts`).
- Accessible via the **Navbar History drawer** and the **User Account Dashboard** (`/account`).

### 9. 🔒 Enforced 3-Step Linear Workflow
- Streamlined pipeline: **Upload → Payment → Certificate (Report)**.
- Linear progress tracker prevents accidental step-skipping or reverse navigation.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library & Styling** | [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/) |
| **Blockchain Integration** | [Algorand TestNet](https://algorand.co/), `algosdk`, `@algorandfoundation/algokit-utils` |
| **Wallet Provider** | Pera Wallet SDK & Custom Demo Auditor Provider |
| **Cryptography** | Web Crypto API (`crypto.subtle`), Node.js `crypto`, RFC 8785 Canonicalization |
| **State Management** | Custom Reactive Event Bus & LocalStorage Singletons |

---

## 📁 Repository Structure

```
ChainTrust-AI/
├── src/
│   ├── app/
│   │   ├── account/          # User Account & Audit History Dashboard
│   │   ├── ai-ingestion/     # AI Pipeline Execution Engine
│   │   ├── api/              # API Routes (Payment, Notary, NFT, Verify, Sign)
│   │   ├── demo/             # Interactive Demo Workflow Setup
│   │   ├── loading/          # Analysis Pipeline Progress Orchestrator
│   │   ├── multisig/         # 2-of-3 Multisig Governance Explainer & Simulator
│   │   ├── nft-badge/        # ASA Proof-of-Audit NFT Minting Page
│   │   ├── notary/           # On-Chain Notary Proof Explorer
│   │   ├── payment/          # x402 Payment Gateway Page
│   │   ├── pitch-deck/       # Embedded Hackathon Pitch Deck
│   │   ├── report/[id]/      # Final Certificate & Clause Risk Detail Page
│   │   ├── upload/           # Contract File Dropzone & Validation
│   │   ├── verify/           # Public Cryptographic Verification Portal
│   │   └── page.tsx          # Main Landing Page
│   ├── blockchain/           # Wallet Hooks, Pera Connect, & Payment Services
│   ├── components/           # UI Components (Navbar, Drawer, Modals, Cards)
│   ├── services/             # Application State (walletStore, reportHistory, analysis)
│   └── types/                # TypeScript Interfaces & Contract Definitions
├── public/                   # Static Media & Brand Assets
└── next.config.ts            # Next.js Build Configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CraftYourSystems/ChainTrust-AI.git
   cd ChainTrust-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_ALGORAND_NETWORK=testnet
   NEXT_PUBLIC_ALGOD_SERVER=https://testnet-api.algonode.cloud
   NEXT_PUBLIC_ALGOD_PORT=443
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/payment/quote` | `POST` | Generates x402 payment quote & Algorand receiver address |
| `/api/payment/verify` | `POST` | Verifies TestNet transaction confirmation on-chain |
| `/api/verify/report` | `POST` | Validates report SHA-256 fingerprint against Algorand state |
| `/api/report/sign` | `POST` | Executes 2-of-3 multisig co-signing via `algosdk` |
| `/api/nft/mint` | `POST` | Mints ASA `AUDITNFT` to specified wallet address |
| `/api/wallet/balance` | `GET` | Queries live Algorand TestNet ALGO balance |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Crafted with ❤️ for the Algorand Ecosystem.
</p>
