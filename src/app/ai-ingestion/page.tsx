"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BrainCircuit, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Zap, 
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";

export default function AIIngestionPage() {
  const [selectedContract, setSelectedContract] = useState("TokenVault.sol");
  const [analyzing, setAnalyzing] = useState(false);

  const sampleContracts: Record<string, any> = {
    "TokenVault.sol": {
      type: "Solidity Smart Contract",
      overallRisk: 78,
      riskLevel: "High",
      clauses: [
        { title: "withdraw() Function Balance Loop", risk: "High", detail: "State mapping balance updated after external call. High vulnerability to Reentrancy Attack." },
        { title: "Owner Emergency Drain", risk: "Medium", detail: "Single multisig threshold permits instant total liquidity withdrawal." }
      ]
    },
    "StakingPool.teal": {
      type: "PyTeal Smart Contract",
      overallRisk: 12,
      riskLevel: "Low",
      clauses: [
        { title: "App Opt-In Verification", risk: "Low", detail: "State schema checks opt-in status before updating asset balances." }
      ]
    },
    "SaaS_Agreement.pdf": {
      type: "Legal PDF Agreement",
      overallRisk: 45,
      riskLevel: "Medium",
      clauses: [
        { title: "Section 8.2 Indemnification", risk: "Medium", detail: "Uncapped financial liability exposure for third-party IP claims." }
      ]
    }
  };

  const current = sampleContracts[selectedContract];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-4 border border-purple-200">
          <BrainCircuit className="h-4 w-4 text-purple-600 animate-pulse" />
          Step 3: AI Contract Ingestion & Clause Audit Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          AI Legal Extraction & Risk Scoring
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Deep learning models parse contract structure, identify high-risk legal clauses, and calculate compliance scores.
        </p>
      </div>

      {/* Contract Selector */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Sample Contract to Audit:</span>
        <div className="flex flex-wrap gap-2">
          {Object.keys(sampleContracts).map((name) => (
            <button
              key={name}
              onClick={() => setSelectedContract(name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedContract === name
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Output Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Document: {selectedContract}</span>
            <span className="text-lg font-bold text-white">{current.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              current.riskLevel === "High" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }`}>
              Overall Risk Score: {current.overallRisk}/100 ({current.riskLevel} Risk)
            </span>
          </div>
        </div>

        {/* Clauses List */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Audited Legal Clauses</span>
          {current.clauses.map((c: any, i: number) => (
            <div key={i} className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white">{c.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  c.risk === "High" ? "bg-red-950 text-red-400 border border-red-500/40" : "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                }`}>
                  {c.risk} Risk
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">Step 3 Complete • Next: On-Chain Notary</span>
          <Link
            href="/notary"
            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition flex items-center gap-2 shadow-lg"
          >
            Proceed to Step 4: On-Chain Notary ➔
          </Link>
        </div>
      </div>
    </div>
  );
}
