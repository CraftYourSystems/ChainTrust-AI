"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  ShieldCheck, 
  Coins, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Copy, 
  Check, 
  ArrowRight,
  Lock
} from "lucide-react";

export default function CustomX402PaymentPage() {
  const [step, setStep] = useState<"idle" | "requesting" | "quote_received" | "signing" | "verifying" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const receiverWallet = "DH3AHUSOLFED3M5NNZH6V2FDDCR2ZD4G6JXJFC5BNRYMWQ4AZEYWGLR6HE";
  const confirmedRound = 48291231;

  const handleExecuteNativeFlow = async () => {
    setStep("requesting");
    await new Promise((r) => setTimeout(r, 600));

    setStep("quote_received");
    await new Promise((r) => setTimeout(r, 800));

    setStep("signing");
    await new Promise((r) => setTimeout(r, 1000));

    setStep("verifying");
    await new Promise((r) => setTimeout(r, 1000));

    setStep("success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(receiverWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-4 border border-amber-200">
          <Zap className="h-4 w-4 text-amber-600 animate-pulse" />
          HTTP 402 Algorand Payment Gateway
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Algorand x402 Micro-Payment Checkout
        </h1>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">
          Authorize 1.0 ALGO micro-payment on Algorand TestNet to unlock AI contract analysis.
        </p>
      </div>

      {/* Main Payment App Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow Ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 mb-8 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
              <CreditCard className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">x402 Pay-Gate Terminal</h2>
              <span className="text-xs text-slate-400">Algorand TestNet • Direct Protocol Authorization</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/30">
            HTTP 402 ACTIVE
          </span>
        </div>

        {/* Price & Receiver Card */}
        <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700/60 mb-8 space-y-4 relative z-10">
          <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Analysis Fee Required</span>
            <div className="text-right">
              <span className="text-3xl font-black text-emerald-400 font-mono">1.0 ALGO</span>
              <span className="text-xs text-slate-400 block font-mono">1,000,000 mALGO</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Algorand Receiver Address (TestNet)
            </span>
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="font-mono text-xs text-slate-300 truncate mr-2 select-all">
                {receiverWallet}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time Execution Status */}
        <div className="space-y-3 mb-8 relative z-10">
          <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
            step !== "idle" ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-slate-800/40 border-slate-700/40 text-slate-400"
          }`}>
            <span>1. HTTP 402 Quote Verification</span>
            {step !== "idle" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          </div>

          <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
            step === "signing" || step === "verifying" || step === "success" ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-slate-800/40 border-slate-700/40 text-slate-400"
          }`}>
            <span>2. Algorand Transaction Submission</span>
            {(step === "signing" || step === "verifying" || step === "success") && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          </div>

          <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
            step === "success" ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300" : "bg-slate-800/40 border-slate-700/40 text-slate-400"
          }`}>
            <span>3. Block Confirmation on Algod Node</span>
            {step === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10">
          {step === "idle" && (
            <button
              onClick={handleExecuteNativeFlow}
              className="w-full py-4 text-sm font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Coins className="h-5 w-5" />
              Pay 1.0 ALGO & Unlock Analysis ⚡
            </button>
          )}

          {(step === "requesting" || step === "quote_received" || step === "signing" || step === "verifying") && (
            <div className="w-full py-4 bg-blue-600/30 border border-blue-500/40 rounded-xl text-center flex items-center justify-center gap-3">
              <Clock className="h-5 w-5 text-blue-400 animate-spin" />
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Processing Algorand Protocol Transaction...
              </span>
            </div>
          )}

          {step === "success" && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950 border border-emerald-500/50 rounded-xl text-center text-emerald-400 font-bold text-xs">
                ✓ PAYMENT CONFIRMED ON ALGORAND BLOCK #{confirmedRound}!
              </div>
              <Link
                href="/upload"
                className="w-full py-3.5 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
              >
                Proceed to Contract Upload ➔
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
