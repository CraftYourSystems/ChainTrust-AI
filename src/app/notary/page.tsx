"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Link2, 
  Database, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Hash, 
  Copy, 
  Check,
  Cpu
} from "lucide-react";

export default function OnChainNotaryPage() {
  const [copied, setCopied] = useState(false);

  const txId = "F5X4J9A2K7839102938472910293847281903847";
  const confirmedRound = 48291231;
  const reportHash = "b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a4d8b64244b7be58f1a2ab24e";
  const notePayload = `chaintrust:proof:v1:${reportHash}:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;

  const handleCopy = () => {
    navigator.clipboard.writeText(txId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-4 border border-emerald-200">
          <Link2 className="h-4 w-4 text-emerald-600 animate-pulse" />
          Step 4: Algorand On-Chain Notary Ledger Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Immutable Algorand Ledger Notarization
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Audit report fingerprints and SHA-256 contract hashes are permanently written to Algorand block transaction note fields.
        </p>
      </div>

      {/* Main Ledger Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Algorand TestNet Transaction Notary</h3>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                STATUS: CONFIRMED ON-CHAIN
              </span>
            </div>
          </div>

          <span className="text-xs font-mono font-bold bg-slate-800 px-3 py-1.5 rounded-xl text-slate-300 border border-slate-700">
            Block Round #{confirmedRound}
          </span>
        </div>

        {/* Transaction Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Algorand TxID</span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-200 truncate select-all mr-2">{txId}</span>
              <button onClick={handleCopy} className="text-slate-400 hover:text-white p-1">
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">SHA-256 Fingerprint</span>
            <span className="font-mono text-xs text-emerald-300 truncate block select-all">{reportHash}</span>
          </div>
        </div>

        {/* Raw ARC Note Payload */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            On-Chain ARC Note Field Payload (Stored Directly on Algorand Ledger)
          </span>
          <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800">
            {notePayload}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <a
            href={`https://testnet.explorer.perawallet.app/tx/${txId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-slate-700 transition"
          >
            Inspect Note Payload on Pera Explorer
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <Link
            href="/verify"
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition flex items-center gap-2 shadow-lg"
          >
            Proceed to Step 5: Verification Portal ➔
          </Link>
        </div>
      </div>
    </div>
  );
}
