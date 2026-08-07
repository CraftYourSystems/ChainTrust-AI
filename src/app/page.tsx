"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Upload, 
  CreditCard, 
  BrainCircuit, 
  Link2, 
  Zap, 
  Coins, 
  Database,
  ArrowRight,
  Award,
  Users,
  Cpu,
  CheckCircle2,
  Code2
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-28 py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-brand-primary text-xs font-bold border border-blue-100/80 shadow-sm">
            <Zap className="h-4 w-4 text-brand-primary animate-pulse" />
            Algorand Hackathon MVP • x402 Micro-Payment Secured
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Contract Intelligence, <br />
            <span className="text-brand-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
              Anchored in Trust.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Upload legal agreements or smart contracts, extract risky clauses with state-of-the-art AI, and immutably record audit trails on the Algorand blockchain.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/upload"
              className="px-8 py-4 text-base font-bold text-white bg-brand-primary hover:bg-blue-700 transition rounded-xl shadow-xl shadow-blue-500/20 hover:scale-105 flex items-center gap-2"
            >
              Analyze Contract
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/payment"
              className="px-8 py-4 text-base font-bold text-slate-700 bg-white hover:bg-slate-50 transition rounded-xl border border-slate-200 shadow-sm flex items-center gap-2"
            >
              <CreditCard className="h-5 w-5 text-amber-500" />
              x402 Pay Gateway
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Blockchain Features & Purpose Explanation Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold border border-blue-100">
            <Cpu className="h-3.5 w-3.5" />
            CORE ALGORAND ARCHITECTURE
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Advanced Blockchain Features & Purpose
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Detailed breakdown of every cryptographic and blockchain mechanism powering ChainTrust AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: x402 Pay-Gate */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. HTTP 402 Micro-Payment Protocol</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Replaces expensive monthly subscriptions with per-request 1.0 ALGO micro-payments. API endpoints return <code className="text-amber-700 font-mono">HTTP 402 Payment Required</code> until confirmed on-chain.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 pt-2">
              ⚡ Micro-Payment Protocol Active
            </div>
          </div>

          {/* Feature 2: ASA Audit NFT Badges */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl w-fit">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Algorand ASA "Proof-of-Audit" NFT</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Mints an official Algorand Standard Asset (<code className="text-amber-700 font-mono">Unit: AUDITNFT</code>) directly into the auditor's Web3 wallet as non-fungible proof of compliance.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 pt-2">
              🏆 ASA Proof-of-Audit NFT
            </div>
          </div>

          {/* Feature 3: Multisig Governance */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 text-brand-primary rounded-2xl w-fit">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. 2-of-3 Multisig Governance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Requires co-signatures from security auditor, AI key, and client officer before issuing enterprise-grade certificates on high-value contracts.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary pt-2">
              🏛️ 2-of-3 Multisig Governance
            </div>
          </div>

          {/* Feature 4: SHA-256 Canonical Notary */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">4. SHA-256 Canonical Notary</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Implements RFC 8785 JSON canonicalization to compute deterministic 64-character report fingerprints anchored into Algorand transaction note fields.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 pt-2">
              ⛓️ SHA-256 Canonical Notary
            </div>
          </div>

          {/* Feature 5: Public Tamper Verification */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">5. Public Tamper Verification</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Allows anyone to upload a report JSON file to publicly verify its cryptographic SHA-256 hash against the Algorand blockchain in real-time.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 pt-2">
              🛡️ Public Tamper Verification
            </div>
          </div>

          {/* Feature 6: TEAL Smart Contract State */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">6. AI Risk Scoring Engine</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Evaluates legal clauses, reentrancy vulnerabilities, and compliance rulesets with structured executive summary outputs.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 pt-2">
              🧠 AI Risk Scoring Engine
            </div>
          </div>
        </div>
      </section>

      {/* Pristine Light Vertical Flow Timeline Section with Connecting Line & Node Badges */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold border border-blue-100 shadow-sm">
            <Zap className="h-3.5 w-3.5" />
            END-TO-END AUTOMATED WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            5-Step Interactive Audit Flow
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Click any step card to launch its tool and inspect its real-time cryptographic mechanism.
          </p>
        </div>

        {/* Vertical Pipeline Container with Central Connecting Line */}
        <div className="relative space-y-16 lg:space-y-24">
          
          {/* Central Dashed Visual Connector Line (Visible on Desktop) */}
          <div className="absolute left-1/2 -ml-[1px] top-12 bottom-12 w-[2px] border-r-2 border-dashed border-slate-300 hidden lg:block pointer-events-none z-0" />

          {/* STEP 1 */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Step Node Badge (Center Desktop) */}
            <div className="hidden lg:flex absolute left-1/2 -ml-6 top-1/2 -mt-6 w-12 h-12 rounded-full bg-blue-600 text-white font-black text-xs items-center justify-center border-4 border-white shadow-xl z-20">
              01
            </div>

            {/* Action Card (Left on Desktop) */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                    STEP 01
                  </span>
                  <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-sm">
                    <Upload className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Contract Ingestion</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submit Solidity (`.sol`), PyTeal (`.teal`), or Legal PDFs for parsing.
                  </p>
                </div>
              </div>
              <Link
                href="/upload"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-brand-primary hover:bg-blue-700 rounded-xl transition shadow-md"
              >
                Launch Step 1 Upload
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Info Card (Right on Desktop) */}
            <div className="bg-gradient-to-br from-blue-50/90 via-slate-50 to-indigo-50/60 p-7 sm:p-8 rounded-3xl border border-blue-100 shadow-sm space-y-4 min-h-[260px] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                  <Code2 className="h-4 w-4" />
                  <span>Feature Purpose & File Hashing</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Mechanism:</strong> Uses browser Web Crypto API (`crypto.subtle.digest`) to calculate instant client-side SHA-256 file fingerprints before backend transmission.
                </p>
              </div>
              <div className="p-3.5 bg-white/90 rounded-xl font-mono text-[11px] text-blue-700 border border-blue-200/80 shadow-sm truncate">
                contractHash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b93...
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Step Node Badge */}
            <div className="hidden lg:flex absolute left-1/2 -ml-6 top-1/2 -mt-6 w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-black text-xs items-center justify-center border-4 border-white shadow-xl z-20">
              02
            </div>

            {/* Info Card (Left on Desktop, Below on Mobile) */}
            <div className="bg-gradient-to-br from-amber-50/90 via-slate-50 to-orange-50/60 p-7 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-4 min-h-[260px] flex flex-col justify-between order-2 lg:order-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                  <Coins className="h-4 w-4" />
                  <span>HTTP 402 Micro-Payment Protocol</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Mechanism:</strong> Enforces per-request 1.0 ALGO payments. Backend returns `402 Payment Required` until Algod RPC indexer confirms the on-chain TestNet transaction.
                </p>
              </div>
              <div className="p-3.5 bg-white/90 rounded-xl font-mono text-[11px] text-amber-900 border border-amber-200/80 shadow-sm truncate">
                Status: HTTP 402 Required ➔ Algod Confirmed (TxID: F5X4J9A2...)
              </div>
            </div>

            {/* Action Card (Right on Desktop, Above on Mobile) */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between min-h-[260px] order-1 lg:order-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    STEP 02
                  </span>
                  <div className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl shadow-sm">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">x402 Pay-Gate</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Authorize 1.0 ALGO micro-payment on Algorand TestNet.
                  </p>
                </div>
              </div>
              <Link
                href="/payment"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow-md"
              >
                Launch Step 2 Pay-Gate ⚡
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Step Node Badge */}
            <div className="hidden lg:flex absolute left-1/2 -ml-6 top-1/2 -mt-6 w-12 h-12 rounded-full bg-purple-600 text-white font-black text-xs items-center justify-center border-4 border-white shadow-xl z-20">
              03
            </div>

            {/* Action Card (Left on Desktop) */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                    STEP 03
                  </span>
                  <div className="p-2.5 bg-purple-600 text-white rounded-2xl shadow-sm">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">AI Risk Ingestion</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Extract reentrancy risks & indemnification clauses.
                  </p>
                </div>
              </div>
              <Link
                href="/ai-ingestion"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition shadow-md"
              >
                Launch Step 3 AI Engine 🧠
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Info Card (Right on Desktop) */}
            <div className="bg-gradient-to-br from-purple-50/90 via-slate-50 to-indigo-50/60 p-7 sm:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-4 min-h-[260px] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
                  <BrainCircuit className="h-4 w-4" />
                  <span>AI Vulnerability Audit Engine</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Mechanism:</strong> Parses contract AST nodes and outputs structured risk scores (e.g. 78/100 High Risk) with actionable remediation steps.
                </p>
              </div>
              <div className="p-3.5 bg-white/90 rounded-xl font-mono text-[11px] text-purple-700 border border-purple-200/80 shadow-sm truncate">
                Risk Score: 78/100 • High Risk Reentrancy Detected in Balance Loop
              </div>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Step Node Badge */}
            <div className="hidden lg:flex absolute left-1/2 -ml-6 top-1/2 -mt-6 w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-xs items-center justify-center border-4 border-white shadow-xl z-20">
              04
            </div>

            {/* Info Card (Left on Desktop, Below on Mobile) */}
            <div className="bg-gradient-to-br from-emerald-50/90 via-slate-50 to-teal-50/60 p-7 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4 min-h-[260px] flex flex-col justify-between order-2 lg:order-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <Database className="h-4 w-4" />
                  <span>Algorand ARC Note Field Notarization</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Mechanism:</strong> Writes `chaintrust:proof:v1:&lt;ReportHash&gt;:&lt;ContractHash&gt;` permanently into the Algorand transaction note field at Block Round `#48291231`.
                </p>
              </div>
              <div className="p-3.5 bg-white/90 rounded-xl font-mono text-[11px] text-emerald-700 border border-emerald-200/80 shadow-sm truncate">
                Note Payload: chaintrust:proof:v1:b3b1b1ab... (Confirmed Round #48291231)
              </div>
            </div>

            {/* Action Card (Right on Desktop, Above on Mobile) */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between min-h-[260px] order-1 lg:order-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    STEP 04
                  </span>
                  <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-sm">
                    <Link2 className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">On-Chain Notary</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Anchor report SHA-256 hash to Algorand block.
                  </p>
                </div>
              </div>
              <Link
                href="/notary"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-md"
              >
                Launch Step 4 Notary ⛓️
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* STEP 5 */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Step Node Badge */}
            <div className="hidden lg:flex absolute left-1/2 -ml-6 top-1/2 -mt-6 w-12 h-12 rounded-full bg-cyan-600 text-white font-black text-xs items-center justify-center border-4 border-white shadow-xl z-20">
              05
            </div>

            {/* Action Card (Left on Desktop) */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full border border-cyan-200">
                    STEP 05
                  </span>
                  <div className="p-2.5 bg-cyan-600 text-white rounded-2xl shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Verified Audit Certificate</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Public tamper-proof certificate verification portal.
                  </p>
                </div>
              </div>
              <Link
                href="/verify"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition shadow-md"
              >
                Launch Step 5 Verify 🛡️
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Info Card (Right on Desktop) */}
            <div className="bg-gradient-to-br from-cyan-50/90 via-slate-50 to-blue-50/60 p-7 sm:p-8 rounded-3xl border border-cyan-100 shadow-sm space-y-4 min-h-[260px] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-cyan-700 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Constant-Time Hash Verification</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Mechanism:</strong> Verifies re-uploaded reports against Algorand state using `crypto.timingSafeEqual` to guarantee zero side-channel vulnerability.
                </p>
              </div>
              <div className="p-3.5 bg-white/90 rounded-xl font-mono text-[11px] text-cyan-700 border border-cyan-200/80 shadow-sm truncate">
                Verification Status: ✓ 100% CRYPTOGRAPHICALLY VALID
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
