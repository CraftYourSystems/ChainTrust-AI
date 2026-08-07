"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldAlert, 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  Code2, 
  FileText, 
  ExternalLink,
  Award,
  Sparkles,
  Zap,
  AlertTriangle
} from "lucide-react";
import { AnalysisService } from "@/services/analysis.service";
import { DueDiligenceReport } from "@/types/analysis";

export default function RemediationHighlightsPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "ANL-001";

  const [report, setReport] = useState<DueDiligenceReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const data = await AnalysisService.getReportById(id);
      setReport(data);
      setLoading(false);
    };
    fetchReport();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center print:hidden">
        <Link
          href={`/report/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-primary transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Audit Report
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-xl transition shadow-md"
        >
          <Printer className="h-4 w-4 text-amber-400" />
          Print / Export Executive PDF
        </button>
      </div>

      {/* Document Header */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex justify-between items-start border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200">
              <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
              EXECUTIVE ISSUE HIGHLIGHT & REMEDIATION REPORT
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Audit Vulnerability & Risk Action Plan
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Report ID: {report?.analysisId || id} • Target Contract: {report?.contractType || "Smart Contract"}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-semibold">Overall Risk Score</span>
            <span className="text-3xl font-black text-red-600 font-mono">
              {report?.overallRisk || 78}/100
            </span>
          </div>
        </div>

        {/* Section 1: Highlighted Issues Matrix */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-600" />
            Highlighted High-Risk Vulnerabilities
          </h2>

          <div className="space-y-3">
            <div className="p-4 bg-red-50/70 rounded-2xl border border-red-200/80 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-red-900 uppercase tracking-wider">
                  1. High-Risk Reentrancy Vulnerability
                </span>
                <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">
                  CRITICAL
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                External call `msg.sender.call{`value: amount`}("")` executed before balance mapping is zeroed (`balances[msg.sender] = 0`), creating a classic reentrancy drain vector.
              </p>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  2. Uncapped Indemnification Liability
                </span>
                <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                  HIGH
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Section 4.2 contains un-bounded third-party indemnification liability, exposing the deploying organization to unlimited financial legal claims.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Code Diff & Remediation Plan */}
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-600" />
            Recommended Code & Clause Fixes
          </h2>

          <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 font-mono text-xs space-y-3">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">
              Checks-Effects-Interactions Fix Pattern
            </span>
            <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`// BEFORE (Vulnerable Reentrancy):
(bool success, ) = msg.sender.call{value: amount}("");
balances[msg.sender] = 0; // State updated AFTER call!

// AFTER (Remediated Checks-Effects-Interactions):
balances[msg.sender] = 0; // State updated BEFORE call!
(bool success, ) = msg.sender.call{value: amount}("");
require(success, "Transfer failed");`}
            </pre>
          </div>
        </div>

        {/* Section 3: Algorand Notary Proof */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <Award className="h-4 w-4" />
              <span>Algorand Ledger Remediation Notary Proof</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              BLOCK #48291231
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-[11px] text-slate-300 space-y-1 border border-slate-800">
            <span className="text-slate-500 block">Note Field Payload:</span>
            <span className="text-amber-300 break-all select-all block">
              chaintrust:remediation:v1:b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a
            </span>
          </div>

          <div className="flex justify-between items-center pt-1 text-xs">
            <span className="text-slate-400">Algorand TxID: F5X4J9A2K78391...</span>
            <a
              href="https://testnet.explorer.perawallet.app/tx/F5X4J9A2K7839102938472910293847281903847"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
            >
              Verify Notary on Pera Explorer
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
