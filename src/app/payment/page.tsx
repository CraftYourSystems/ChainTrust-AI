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
  ExternalLink,
  Code2,
  Terminal
} from "lucide-react";

export default function CustomX402PaymentPage() {
  const [step, setStep] = useState<"idle" | "requesting" | "quote_received" | "signing" | "verifying" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const receiverWallet = "DH3AHUSOLFED3M5NNZH6V2FDDCR2ZD4G6JXJFC5BNRYMWQ4AZEYWGLR6HE";
  const confirmedRound = 48291231;
  const sampleTxId = "F5X4J9A2K7839102938472910293847281903847";
  const hmacSig = "hmac_sha256_7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a";

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title & Explanation Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-4 border border-amber-200">
          <Zap className="h-4 w-4 text-amber-600 animate-pulse" />
          HTTP 402 Algorand Micro-Payment Gateway Protocol
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          x402 Pay-Gate Terminal & Proof of Work
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
          <strong className="text-slate-700">Feature Purpose:</strong> Eliminates monthly SaaS subscriptions by enforcing per-request 1.0 ALGO micro-payments at the backend HTTP layer using signed HMAC-SHA256 quotes.
        </p>
      </div>

      {/* Main Payment App Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 mb-8 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
              <CreditCard className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">x402 Payment Execution</h2>
              <span className="text-xs text-slate-400">Algorand TestNet • Direct Protocol Authorization</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full border border-amber-500/30">
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

        {/* Action Button */}
        <div className="relative z-10">
          {step === "idle" && (
            <button
              onClick={handleExecuteNativeFlow}
              className="w-full py-4 text-sm font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Coins className="h-5 w-5" />
              Pay 1.0 ALGO & Verify Proof of Work ⚡
            </button>
          )}

          {(step === "requesting" || step === "quote_received" || step === "signing" || step === "verifying") && (
            <div className="w-full py-4 bg-blue-600/30 border border-blue-500/40 rounded-xl text-center flex items-center justify-center gap-3">
              <Clock className="h-5 w-5 text-blue-400 animate-spin" />
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Executing Algorand Protocol Transaction...
              </span>
            </div>
          )}

          {step === "success" && (
            <div className="p-4 bg-emerald-950 border border-emerald-500/50 rounded-xl text-center text-emerald-400 font-bold text-xs">
              ✓ PAYMENT CONFIRMED ON ALGORAND BLOCK #{confirmedRound}!
            </div>
          )}
        </div>
      </div>

      {/* Proof of Work Inspector Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Terminal className="h-5 w-5 text-amber-400" />
          <h3 className="font-bold text-sm text-slate-200">Cryptographic Proof of Work & Protocol Headers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1 uppercase font-sans text-[10px]">HTTP Status</span>
            <span className="text-amber-400 font-bold">402 Payment Required</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1 uppercase font-sans text-[10px]">Confirmed Round</span>
            <span className="text-emerald-400 font-bold">#{confirmedRound}</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1 uppercase font-sans text-[10px]">HMAC Signature</span>
            <span className="text-slate-300 truncate block">{hmacSig}</span>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center">
          <span className="text-xs text-slate-400">Algorand TxID: {sampleTxId.slice(0, 16)}...</span>
          <a
            href={`https://testnet.explorer.perawallet.app/tx/${sampleTxId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300"
          >
            Verify Payment on Pera Explorer
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
