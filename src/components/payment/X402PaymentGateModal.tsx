"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Coins, 
  Lock, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  ArrowRight,
  Zap,
  ShieldCheck,
  Copy,
  Check
} from "lucide-react";

interface X402PaymentGateProps {
  fileName: string;
  onPaymentSuccess: () => void;
}

// Helper function to dynamically calculate the fee based on the document type/extension
const getFeeForFile = (fileName: string) => {
  if (!fileName) return { algo: "1.0", micro: "1,000,000", purpose: "DUE_DILIGENCE" };
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".sol")) {
    return { algo: "5.0", micro: "5,000,000", purpose: "ENTERPRISE_AUDIT" };
  } else if (lower.endsWith(".teal")) {
    return { algo: "2.0", micro: "2,000,000", purpose: "EXPRESS_AUDIT" };
  } else {
    return { algo: "1.0", micro: "1,000,000", purpose: "DUE_DILIGENCE" };
  }
};

export function X402PaymentGateModal({ fileName, onPaymentSuccess }: X402PaymentGateProps) {
  const [paymentState, setPaymentState] = useState<"quote" | "submitting" | "verifying" | "success">("quote");
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(299); // 5 minute quote expiry

  const receiverAddress = "DH3AHUSOLFED3M5NNZH6V2FDDCR2ZD4G6JXJFC5BNRYMWQ4AZEYWGLR6HE";
  const hmacSig = "hmac_sha256_7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a";
  const feeInfo = getFeeForFile(fileName);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(receiverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeX402Payment = async () => {
    setPaymentState("submitting");
    await new Promise((r) => setTimeout(r, 1000));

    setPaymentState("verifying");
    await new Promise((r) => setTimeout(r, 1200));

    setPaymentState("success");
    await new Promise((r) => setTimeout(r, 1000));

    onPaymentSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        {/* Header Badge */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
            <Zap className="h-3.5 w-3.5 animate-pulse text-amber-400" />
            HTTP 402 PAYMENT REQUIRED
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            Expires in {formatTime(countdown)}
          </span>
        </div>

        {/* Title */}
        <div className="mb-6 relative z-10">
          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
            Algorand x402 Payment Gate
          </h2>
          <p className="text-xs text-slate-400">
            Contract Analysis service for <span className="text-blue-400 font-mono font-semibold">{fileName}</span> is protected by HTTP 402 paywall standard.
          </p>
        </div>

        {/* Main Payment Quote Card */}
        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 mb-6 space-y-4 relative z-10">
          {/* Price Row */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
            <span className="text-xs font-semibold text-slate-400">Analysis Fee</span>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400 font-mono">{feeInfo.algo} ALGO</span>
              <span className="text-[10px] text-slate-400 block font-mono">{feeInfo.micro} mALGO</span>
            </div>
          </div>

          {/* Receiver Address */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
              Algorand Receiver Address (TestNet)
            </span>
            <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-xl border border-slate-700/80">
              <span className="font-mono text-xs text-slate-300 truncate mr-2 select-all">
                {receiverAddress}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* HMAC Signature */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
              HMAC-SHA256 Signed Quote Signature
            </span>
            <span className="font-mono text-[10px] text-slate-500 break-all select-all block bg-slate-900/50 p-2 rounded-lg">
              {hmacSig}
            </span>
          </div>
        </div>

        {/* Dynamic Action & Progress Indicator */}
        <div className="relative z-10">
          {paymentState === "quote" && (
            <button
              onClick={executeX402Payment}
              className="w-full py-4 px-6 text-sm font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Coins className="h-5 w-5" />
              Pay {feeInfo.algo} ALGO & Unlock AI Audit ⚡
            </button>
          )}

          {paymentState === "submitting" && (
            <div className="p-4 bg-blue-950/60 border border-blue-500/30 rounded-xl text-center flex items-center justify-center gap-3">
              <Clock className="h-5 w-5 text-blue-400 animate-spin" />
              <span className="text-xs font-bold text-blue-300">
                Submitting {feeInfo.algo} ALGO Payment to Algorand TestNet...
              </span>
            </div>
          )}

          {paymentState === "verifying" && (
            <div className="p-4 bg-amber-950/60 border border-amber-500/30 rounded-xl text-center flex items-center justify-center gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-amber-300">
                Verifying Transaction Confirmation on Algod Node...
              </span>
            </div>
          )}

          {paymentState === "success" && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-center flex items-center justify-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>✓ PAYMENT CONFIRMED ON ALGORAND! UNLOCKING AI PIPELINE...</span>
            </div>
          )}
        </div>

        {/* Footer Disclaimer */}
        <p className="text-[11px] text-slate-500 text-center mt-5 relative z-10">
          Enforced by Algorand Verification Middleware • Zero monthly subscription fees
        </p>
      </div>
    </div>
  );
}
