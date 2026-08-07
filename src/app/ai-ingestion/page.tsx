"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BrainCircuit, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Loader2,
  Code2,
  Zap,
  Terminal,
  FileCheck
} from "lucide-react";

export default function AIIngestionPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("Initializing LLM Auditor...");
  const [scanComplete, setScanComplete] = useState(false);

  const handleRunScan = async () => {
    setScanning(true);
    setScanComplete(false);
    setProgress(15);
    setStageText("1. Reading Contract AST Structure...");

    await new Promise((r) => setTimeout(r, 600));
    setProgress(45);
    setStageText("2. Extracting Reentrancy & Access Control Vectors...");

    await new Promise((r) => setTimeout(r, 800));
    setProgress(75);
    setStageText("3. Evaluating Compliance & Indemnification Clauses...");

    await new Promise((r) => setTimeout(r, 800));
    setProgress(100);
    setStageText("4. Computing Final Risk Score Matrix...");

    await new Promise((r) => setTimeout(r, 600));
    setScanning(false);
    setScanComplete(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-4 border border-purple-200">
          <BrainCircuit className="h-4 w-4 text-purple-600 animate-pulse" />
          Step 3 of 6 • LLM Vulnerability & Risk Scoring Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          AI Risk Ingestion Engine
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
          <strong className="text-slate-700">Feature Purpose:</strong> Evaluates legal clauses, reentrancy vulnerabilities, and compliance rulesets with structured executive summary outputs.
        </p>
      </div>

      {/* Main Terminal Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
              <BrainCircuit className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">LLM Audit Scanning Console</h2>
              <span className="text-xs text-slate-400 font-mono">Model: ChainTrust Legal-Audit-v4</span>
            </div>
          </div>

          <span className="text-xs font-mono font-bold bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/30">
            AI READY
          </span>
        </div>

        {/* Action Button & Animated Progress */}
        {!scanning && !scanComplete && (
          <button
            onClick={handleRunScan}
            className="w-full py-4 text-sm font-extrabold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Run Live AI Vulnerability Audit 🧠
          </button>
        )}

        {scanning && (
          <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-purple-300 flex items-center gap-2">
                <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
                {stageText}
              </span>
              <span className="font-mono font-bold text-amber-400">{progress}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {scanComplete && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            {/* Score Banner */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-red-500/40 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/20 text-red-400 rounded-xl">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Audit Scan Completed</h3>
                  <p className="text-xs text-slate-400">Identified 1 Critical Vulnerability & 2 Indemnity Risks</p>
                </div>
              </div>

              <div className="text-right bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono uppercase">Overall Risk Score</span>
                <span className="text-2xl font-black text-red-500 font-mono">78 / 100 HIGH</span>
              </div>
            </div>

            {/* Step Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/notary")}
                className="w-full py-3.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                Proceed to Step 4 On-Chain Notary ⛓️
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => router.push("/report/ANL-58440")}
                className="w-full py-3.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition border border-slate-700 flex items-center justify-center gap-2"
              >
                Open Full Due Diligence Report 📄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
