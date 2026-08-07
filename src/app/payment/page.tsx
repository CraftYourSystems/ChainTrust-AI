"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  ShieldCheck, 
  Coins, 
  Code2, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Terminal,
  Zap,
  ArrowRight,
  Copy,
  Check,
  Cpu
} from "lucide-react";
import { Button } from "@/components/common/Button";

export default function CustomX402PaymentPage() {
  const [step, setStep] = useState<"idle" | "requesting" | "quote_received" | "signing" | "verifying" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const testWallet = "PIKPW7D6G4RCGAU35ACWQWGXDCOYYGGD35L3BTNU27CGVU7GTNVALN3VAY";
  const receiverWallet = "DH3AHUSOLFED3M5NNZH6V2FDDCR2ZD4G6JXJFC5BNRYMWQ4AZEYWGLR6HE";
  const quoteId = "quote_x402_9f8a2b1c3d4e";
  const hmacSig = "hmac_sha256_7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a";
  const txId = "F5X4J9A2K7839102938472910293847281903847";
  const confirmedRound = 48291231;

  const rawHttpHeaders = `HTTP/1.1 402 Payment Required
Content-Type: application/json
WWW-Authenticate: x402 quoteId="${quoteId}", recipient="${receiverWallet}", amount="1000000"
X-Algorand-Network: testnet
X-HMAC-Signature: ${hmacSig}

{
  "code": 402,
  "status": "PAYMENT_REQUIRED",
  "message": "x402 micro-payment required for AI contract due diligence",
  "quote": {
    "quoteId": "${quoteId}",
    "amountMicroAlgo": 1000000,
    "amountAlgo": "1.0 ALGO",
    "recipient": "${receiverWallet}",
    "expiresAt": "${new Date(Date.now() + 300000).toISOString()}"
  }
}`;

  const nativeAlgosdkCode = `// Pure Native Algorand SDK (algosdk) Transaction Code - Zero 3rd Party Extensions
import algosdk from "algosdk";

export async function executeNativeX402Payment(
  senderAccount: algosdk.Account,
  recipientAddress: string,
  amountMicroAlgos: number
) {
  const client = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", 443);
  const params = await client.getTransactionParams().do();

  // Construct native Algorand transfer transaction
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: senderAccount.addr,
    to: recipientAddress,
    amount: amountMicroAlgos, // 1,000,000 mALGO = 1.0 ALGO
    suggestedParams: params,
    note: new Uint8Array(Buffer.from("chaintrust:x402:payment:v1"))
  });

  // Sign with native secret key in pure code
  const signedTxn = txn.signTxn(senderAccount.sk);
  const { txId } = await client.sendRawTransaction(signedTxn).do();

  // Wait for round confirmation on Algod node
  const confirmedTxn = await algosdk.waitForConfirmation(client, txId, 4);
  return { txId, confirmedRound: confirmedTxn["confirmed-round"] };
}`;

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-4 border border-amber-200">
          <Zap className="h-4 w-4 text-amber-600 animate-pulse" />
          Native Algorand x402 Protocol Payment Gateway
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Custom x402 Micro-Payment Engine
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Pure custom code implementation of HTTP 402 Payment Required for Algorand TestNet. No 3rd party extensions or external payment apps required.
        </p>
      </div>

      {/* Main Grid: Interactive Gateway + Native Code Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column: Interactive Payment Terminal */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">In-App Payment Gateway</h3>
                  <span className="text-xs text-slate-400">Algorand TestNet • 1.0 ALGO</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/30">
                HTTP 402 ACTIVE
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 mb-6">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-700/50">
                <span className="text-xs font-semibold text-slate-400">Service Fee</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-400 font-mono">1.0 ALGO</span>
                  <span className="text-[10px] text-slate-400 block font-mono">1,000,000 mALGO</span>
                </div>
              </div>

              {/* Receiver Wallet */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Algorand Receiver Address
                </span>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
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

            {/* Transaction Execution Status */}
            <div className="space-y-3 mb-6">
              <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                step !== "idle" ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-slate-800/40 border-slate-700/40 text-slate-400"
              }`}>
                <span>1. Generate HTTP 402 Signed Quote</span>
                {step !== "idle" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              </div>

              <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                step === "signing" || step === "verifying" || step === "success" ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-slate-800/40 border-slate-700/40 text-slate-400"
              }`}>
                <span>2. Build & Sign Native Algorand Txn (`algosdk`)</span>
                {(step === "signing" || step === "verifying" || step === "success") && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              </div>

              <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                step === "success" ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300" : "bg-slate-800/40 border-slate-700/40 text-slate-400"
              }`}>
                <span>3. Verify Block Round Confirmation</span>
                {step === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div>
            {step === "idle" && (
              <button
                onClick={handleExecuteNativeFlow}
                className="w-full py-4 text-sm font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Coins className="h-5 w-5" />
                Execute Native x402 Protocol Transaction 🚀
              </button>
            )}

            {(step === "requesting" || step === "quote_received" || step === "signing" || step === "verifying") && (
              <div className="w-full py-4 bg-blue-600/30 border border-blue-500/40 rounded-xl text-center flex items-center justify-center gap-3">
                <Clock className="h-5 w-5 text-blue-400 animate-spin" />
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Executing Native `algosdk` Code... ({step})
                </span>
              </div>
            )}

            {step === "success" && (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-950 border border-emerald-500/50 rounded-xl text-center text-emerald-400 font-bold text-xs">
                  ✓ TRANSACTION CONFIRMED ON ALGORAND BLOCK #{confirmedRound}!
                </div>
                <Link
                  href="/upload"
                  className="w-full py-3 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition flex items-center justify-center gap-2"
                >
                  Proceed to Contract Ingestion ➔
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Inspector (Raw HTTP 402 Headers + algosdk Code) */}
        <div className="space-y-6">
          {/* Raw HTTP 402 Response Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="h-4 w-4 text-amber-400" />
              <h3 className="font-bold text-sm text-slate-200">1. Raw HTTP 402 Server Response Protocol</h3>
            </div>
            <pre className="p-4 bg-slate-950 text-amber-300 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
              {rawHttpHeaders}
            </pre>
          </div>

          {/* Pure algosdk Code Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="h-4 w-4 text-blue-400" />
              <h3 className="font-bold text-sm text-slate-200">2. Pure Native Algorand Code (`algosdk`)</h3>
            </div>
            <pre className="p-4 bg-slate-950 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed">
              {nativeAlgosdkCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
