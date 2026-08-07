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
  ArrowRight
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16">
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

      {/* 5-Step Workflow Section with Breathable Cards */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Five Automated Workflow Steps
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Click any step card below to open its dedicated application page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Step 1 Button */}
          <Link
            href="/upload"
            className="group bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-500 hover:ring-4 hover:ring-blue-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[260px] justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
                <Upload className="h-6 w-6 text-brand-primary group-hover:text-white transition" />
              </div>
              <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full mb-2">Step 1</span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-blue-600 transition">Upload Contract</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Submit PDF, DOCX, or Solidity files for ingestion.
              </p>
            </div>
            <span className="text-xs font-bold text-brand-primary bg-blue-50 group-hover:bg-blue-600 group-hover:text-white px-3.5 py-1.5 rounded-full transition-colors duration-300">
              Try Upload ➔
            </span>
          </Link>

          {/* Step 2 Button */}
          <Link
            href="/payment"
            className="group bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-amber-500 hover:ring-4 hover:ring-amber-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[260px] justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
                <CreditCard className="h-6 w-6 text-amber-500 group-hover:text-white transition" />
              </div>
              <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full mb-2">Step 2</span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-amber-600 transition">x402 Pay-Gate</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Authorize 1.0 ALGO micro-payment on Algorand TestNet.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 group-hover:bg-amber-500 group-hover:text-white px-3.5 py-1.5 rounded-full transition-colors duration-300">
              Launch Gateway ⚡
            </span>
          </Link>

          {/* Step 3 Button */}
          <Link
            href="/ai-ingestion"
            className="group bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-purple-500 hover:ring-4 hover:ring-purple-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[260px] justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300">
                <BrainCircuit className="h-6 w-6 text-purple-600 group-hover:text-white transition" />
              </div>
              <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full mb-2">Step 3</span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-purple-600 transition">AI Ingestion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                LLM model audits clauses & vulnerability risk scores.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white px-3.5 py-1.5 rounded-full transition-colors duration-300">
              Open AI Ingestion 🧠
            </span>
          </Link>

          {/* Step 4 Button */}
          <Link
            href="/notary"
            className="group bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-emerald-500 hover:ring-4 hover:ring-emerald-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[260px] justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-300">
                <Link2 className="h-6 w-6 text-emerald-600 group-hover:text-white transition" />
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-2">Step 4</span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-emerald-600 transition">On-Chain Notary</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                SHA-256 report hash notarized on Algorand block.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white px-3.5 py-1.5 rounded-full transition-colors duration-300">
              Open Ledger Notary ⛓️
            </span>
          </Link>

          {/* Step 5 Button */}
          <Link
            href="/verify"
            className="group bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-cyan-500 hover:ring-4 hover:ring-cyan-500/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer min-h-[260px] justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:bg-cyan-600 group-hover:scale-110 transition-all duration-300">
                <ShieldCheck className="h-6 w-6 text-cyan-600 group-hover:text-white transition" />
              </div>
              <span className="text-[10px] font-extrabold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded-full mb-2">Step 5</span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-cyan-600 transition">Verified Audit</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Public tamper-proof certificate verification portal.
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-700 bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white px-3.5 py-1.5 rounded-full transition-colors duration-300">
              Verify Portal 🛡️
            </span>
          </Link>
        </div>
      </section>

      {/* Feature Highlights Section with Generous Padding */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-14 shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-2xl w-fit border border-blue-500/20">
                <BrainCircuit className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Clause Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts indemnification liability, reentrancy risks, and compliance vectors automatically.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-amber-500/10 text-amber-400 rounded-2xl w-fit border border-amber-500/20">
                <Coins className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white">x402 Pay-Per-Use</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                HTTP 402 pay-gated API endpoints with instant 1.0 ALGO micro-payments on Algorand TestNet.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit border border-emerald-500/20">
                <Database className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white">Immutable Ledger Proof</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                SHA-256 canonical report fingerprints permanently anchored into Algorand transaction note fields.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
