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
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-24 py-12">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 text-xs font-mono font-bold">
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
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. HTTP 402 Micro-Payment Protocol</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Replaces expensive monthly subscriptions with per-request 1.0 ALGO micro-payments. API endpoints return <code className="text-amber-700 font-mono">HTTP 402 Payment Required</code> until confirmed on-chain.
              </p>
            </div>
            <Link
              href="/payment"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 pt-2"
            >
              Launch Payment Gateway ⚡ ➔
            </Link>
          </div>

          {/* Feature 2: ASA Audit NFT Badges */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl w-fit">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Algorand ASA "Proof-of-Audit" NFT</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Mints an official Algorand Standard Asset (<code className="text-amber-700 font-mono">Unit: AUDITNFT</code>) directly into the auditor's Web3 wallet as non-fungible proof of compliance.
              </p>
            </div>
            <Link
              href="/nft-badge"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 pt-2"
            >
              Mint ASA Audit NFT 🏆 ➔
            </Link>
          </div>

          {/* Feature 3: Multisig Governance */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 text-brand-primary rounded-2xl w-fit">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. 2-of-3 Multisig Governance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Requires co-signatures from security auditor, AI key, and client officer before issuing enterprise-grade certificates on high-value contracts.
              </p>
            </div>
            <Link
              href="/nft-badge"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-blue-700 pt-2"
            >
              Inspect Multisig Governance 🏛️ ➔
            </Link>
          </div>

          {/* Feature 4: SHA-256 Canonical Notary */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">4. SHA-256 Canonical Notary</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Implements RFC 8785 JSON canonicalization to compute deterministic 64-character report fingerprints anchored into Algorand transaction note fields.
              </p>
            </div>
            <Link
              href="/notary"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-2"
            >
              Open Ledger Notary ⛓️ ➔
            </Link>
          </div>

          {/* Feature 5: Public Tamper Verification */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">5. Public Tamper Verification</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Allows anyone to upload a report JSON file to publicly verify its cryptographic SHA-256 hash against the Algorand blockchain in real-time.
              </p>
            </div>
            <Link
              href="/verify"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700 pt-2"
            >
              Open Verification Portal 🛡️ ➔
            </Link>
          </div>

          {/* Feature 6: TEAL Smart Contract State */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">6. AI Risk Scoring Engine</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Purpose:</strong> Evaluates legal clauses, reentrancy vulnerabilities, and compliance rulesets with structured executive summary outputs.
              </p>
            </div>
            <Link
              href="/ai-ingestion"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 pt-2"
            >
              Open AI Ingestion Engine 🧠 ➔
            </Link>
          </div>
        </div>
      </section>

      {/* Connected Interactive Workflow Flow Pipeline Stepper */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Automated Audit Workflow Pipeline
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Follow the connected 5-step flow from document upload to Algorand on-chain certification. Click any step to launch it.
          </p>
        </div>

        {/* Connected Flow Stepper Container */}
        <div className="relative">
          {/* Connecting Background Pipeline Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 -translate-y-1/2 rounded-full z-0 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {/* Step 1 Flow Card */}
            <Link
              href="/upload"
              className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 hover:ring-4 hover:ring-blue-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[270px] justify-between relative"
            >
              {/* Step Connector Indicator */}
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  STEP 01
                </span>
                <ChevronRight className="h-4 w-4 text-blue-500 hidden lg:block group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300 shadow-inner">
                  <Upload className="h-6 w-6 text-brand-primary group-hover:text-white transition" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-blue-600 transition">Contract Ingestion</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload smart contracts or legal agreement PDFs.
                </p>
              </div>

              <span className="w-full mt-4 text-xs font-bold text-brand-primary bg-blue-50 group-hover:bg-blue-600 group-hover:text-white py-2 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-1">
                Launch Step 1 ➔
              </span>
            </Link>

            {/* Step 2 Flow Card */}
            <Link
              href="/payment"
              className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-amber-500 hover:ring-4 hover:ring-amber-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[270px] justify-between relative"
            >
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-[11px] font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  STEP 02
                </span>
                <ChevronRight className="h-4 w-4 text-amber-500 hidden lg:block group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300 shadow-inner">
                  <CreditCard className="h-6 w-6 text-amber-500 group-hover:text-white transition" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-amber-600 transition">x402 Pay-Gate</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Authorize 1.0 ALGO payment on Algorand TestNet.
                </p>
              </div>

              <span className="w-full mt-4 text-xs font-bold text-amber-800 bg-amber-50 group-hover:bg-amber-500 group-hover:text-white py-2 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-1">
                Launch Step 2 ⚡
              </span>
            </Link>

            {/* Step 3 Flow Card */}
            <Link
              href="/ai-ingestion"
              className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-purple-500 hover:ring-4 hover:ring-purple-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[270px] justify-between relative"
            >
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-[11px] font-black text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  STEP 03
                </span>
                <ChevronRight className="h-4 w-4 text-purple-500 hidden lg:block group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300 shadow-inner">
                  <BrainCircuit className="h-6 w-6 text-purple-600 group-hover:text-white transition" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-purple-600 transition">AI Risk Scoring</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Extract legal clauses & risk vulnerability scores.
                </p>
              </div>

              <span className="w-full mt-4 text-xs font-bold text-purple-800 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white py-2 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-1">
                Launch Step 3 🧠
              </span>
            </Link>

            {/* Step 4 Flow Card */}
            <Link
              href="/notary"
              className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-500 hover:ring-4 hover:ring-emerald-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[270px] justify-between relative"
            >
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  STEP 04
                </span>
                <ChevronRight className="h-4 w-4 text-emerald-500 hidden lg:block group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-300 shadow-inner">
                  <Link2 className="h-6 w-6 text-emerald-600 group-hover:text-white transition" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-emerald-600 transition">On-Chain Notary</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Anchor SHA-256 report hash to Algorand block note.
                </p>
              </div>

              <span className="w-full mt-4 text-xs font-bold text-emerald-800 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white py-2 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-1">
                Launch Step 4 ⛓️
              </span>
            </Link>

            {/* Step 5 Flow Card */}
            <Link
              href="/verify"
              className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-cyan-500 hover:ring-4 hover:ring-cyan-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[270px] justify-between relative"
            >
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-[11px] font-black text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                  STEP 05
                </span>
                <ShieldCheck className="h-4 w-4 text-cyan-500 hidden lg:block" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:bg-cyan-600 group-hover:scale-110 transition-all duration-300 shadow-inner">
                  <ShieldCheck className="h-6 w-6 text-cyan-600 group-hover:text-white transition" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-cyan-600 transition">Verified Audit</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Public tamper-proof certificate verification portal.
                </p>
              </div>

              <span className="w-full mt-4 text-xs font-bold text-cyan-800 bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white py-2 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-1">
                Launch Step 5 🛡️
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
