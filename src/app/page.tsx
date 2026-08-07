"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Upload, 
  CreditCard, 
  BrainCircuit, 
  Link2, 
  Lock, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Coins,
  Database,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/common/Button";

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-primary text-xs font-bold mb-6 border border-blue-100 shadow-sm">
            <Zap className="h-4 w-4 text-brand-primary animate-pulse" />
            Algorand Hackathon MVP • x402 Micro-Payment Secured
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Contract Intelligence, <br />
            <span className="text-brand-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Anchored in Trust.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Upload legal agreements or smart contracts, extract risky clauses with state-of-the-art AI, and immutably record audit trails on the Algorand blockchain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/upload"
              className="px-8 py-4 text-base font-bold text-white bg-brand-primary hover:bg-blue-700 transition rounded-xl shadow-xl shadow-blue-500/20 hover:scale-105 flex items-center gap-2"
            >
              Analyze Contract ➔
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

      {/* 5-Step Workflow Section with Clickable Buttons */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Five Automated Workflow Steps
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Click any step below to launch that specific application module.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Step 1 Button */}
          <Link
            href="/upload"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500 hover:ring-2 hover:ring-blue-500/20 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-brand-primary group-hover:scale-110 transition-all">
              <Upload className="h-6 w-6 text-brand-primary group-hover:text-white transition" />
            </div>
            <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-1">Step 1</span>
            <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition">Upload Contract</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Submit PDF, DOCX, or Solidity files for ingestion.
            </p>
            <span className="mt-auto text-xs font-bold text-brand-primary bg-blue-50 group-hover:bg-blue-600 group-hover:text-white px-3 py-1 rounded-full transition">
              Try Upload ➔
            </span>
          </Link>

          {/* Step 2 Button */}
          <Link
            href="/payment"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-500 hover:ring-2 hover:ring-amber-500/20 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:scale-110 transition-all">
              <CreditCard className="h-6 w-6 text-amber-500 group-hover:text-white transition" />
            </div>
            <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mb-1">Step 2</span>
            <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition">x402 Pay-Gate</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Authorize 1.0 ALGO micro-payment on Algorand TestNet.
            </p>
            <span className="mt-auto text-xs font-bold text-amber-700 bg-amber-50 group-hover:bg-amber-500 group-hover:text-white px-3 py-1 rounded-full transition">
              Launch Gateway ⚡
            </span>
          </Link>

          {/* Step 3 Button */}
          <Link
            href="/demo"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-purple-500 hover:ring-2 hover:ring-purple-500/20 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:scale-110 transition-all">
              <BrainCircuit className="h-6 w-6 text-purple-600 group-hover:text-white transition" />
            </div>
            <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full mb-1">Step 3</span>
            <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-purple-600 transition">AI Ingestion</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              LLM model audits clauses & vulnerability risk scores.
            </p>
            <span className="mt-auto text-xs font-bold text-purple-700 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white px-3 py-1 rounded-full transition">
              Test AI Engine 🧠
            </span>
          </Link>

          {/* Step 4 Button */}
          <Link
            href="/demo"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/20 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:scale-110 transition-all">
              <Link2 className="h-6 w-6 text-emerald-600 group-hover:text-white transition" />
            </div>
            <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">Step 4</span>
            <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-600 transition">On-Chain Notary</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              SHA-256 report hash notarized on Algorand block.
            </p>
            <span className="mt-auto text-xs font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white px-3 py-1 rounded-full transition">
              Test Ledger ⛓️
            </span>
          </Link>

          {/* Step 5 Button */}
          <Link
            href="/verify"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-cyan-500 hover:ring-2 hover:ring-cyan-500/20 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-3 group-hover:bg-cyan-600 group-hover:scale-110 transition-all">
              <ShieldCheck className="h-6 w-6 text-cyan-600 group-hover:text-white transition" />
            </div>
            <span className="text-[10px] font-extrabold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full mb-1">Step 5</span>
            <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-cyan-600 transition">Verified Audit</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Public tamper-proof certificate verification portal.
            </p>
            <span className="mt-auto text-xs font-bold text-cyan-700 bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white px-3 py-1 rounded-full transition">
              Verify Portal 🛡️
            </span>
          </Link>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit border border-blue-500/20">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Clause Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts indemnification liability, reentrancy risks, and compliance vectors automatically.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit border border-amber-500/20">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">x402 Pay-Per-Use</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                HTTP 402 pay-gated API endpoints with instant 1.0 ALGO micro-payments on Algorand TestNet.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit border border-emerald-500/20">
                <Database className="h-6 w-6" />
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
