"use client";

import React, { useState } from "react";
import { Terminal, CheckCircle2, ShieldCheck, Activity, X, ChevronUp, ChevronDown } from "lucide-react";

export const LiveAuditTimeline: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const logs = [
    { time: "10:31:02", text: "Wallet Session Established (PIKPW7D...)", type: "wallet" },
    { time: "10:31:14", text: "POST /api/analysis/submit - HTTP 402 Required", type: "api" },
    { time: "10:31:22", text: "1.0 ALGO Tx Confirmed (Block #48291231)", type: "blockchain" },
    { time: "10:31:28", text: "LLM Parsing AST Nodes & Clause Vectors", type: "ai" },
    { time: "10:31:35", text: "Canonical SHA-256 Digest: b3b1b1ab...", type: "crypto" },
    { time: "10:31:42", text: "ARC Note Notarization Anchored on Algorand", type: "blockchain" },
    { time: "10:31:48", text: "ASA NFT Minted (Asset ID #789410293)", type: "nft" }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Closed Floating Pill Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-full shadow-2xl border border-slate-800 hover:bg-slate-800 text-xs font-mono font-bold transition hover:scale-105"
        >
          <Terminal className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>Developer Console & Audit Logs ⚡</span>
          <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
        </button>
      )}

      {/* Expanded Console Window */}
      {isOpen && (
        <div className="bg-slate-900 text-white rounded-3xl w-80 sm:w-96 p-5 shadow-2xl border border-slate-800 space-y-4 animate-in fade-in slide-in-from-bottom duration-200">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-xs font-bold text-slate-200">Live Audit Lifecycle Console</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Activity Logs Stream */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 font-mono text-[11px] scrollbar-thin">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 shrink-0 text-[10px]">{log.time}</span>
                <div className="space-y-0.5">
                  <span className="text-emerald-400 font-bold block">{log.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1 flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-slate-800">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Algod TestNet Node Connected
            </span>
            <span>Block #48291322</span>
          </div>
        </div>
      )}
    </div>
  );
};
