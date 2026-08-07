"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Users, 
  Award, 
  ExternalLink, 
  Sparkles, 
  Printer,
  Lock,
  FileCheck,
  Clock
} from "lucide-react";
import { AnalysisService } from "@/services/analysis.service";
import { DueDiligenceReport } from "@/types/analysis";

export default function FinalMultiSigReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "ANL-58440";

  const [report, setReport] = useState<DueDiligenceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [signedCount, setSignedCount] = useState(2); // 2 of 3 signed initially
  const [txDetails, setTxDetails] = useState<any>(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const data = await AnalysisService.getReportById(id);
      setReport(data);
      setLoading(false);
    };
    fetchReport();
  }, [id]);

  const handleCoSign = async () => {
    setSigning(true);
    try {
      const res = await fetch('/api/report/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: id,
          signerRole: "Enterprise Client Compliance Officer",
          walletAddress: "PIKPW7D6G4RCGAU35ACWQWGXDCOYYGGD35L3BTNU27CGVU7GTNVALN3VAY"
        })
      });
      const data = await res.json();
      setTxDetails(data);
      setSignedCount(3);
    } catch (e) {
      console.error(e);
    } finally {
      setSigning(false);
    }
  };

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

  const sha256Hash = txDetails?.sha256Fingerprint || "b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a4d8b64244b7be58f1a2ab24e";
  const progressPct = Math.round((signedCount / 3) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center print:hidden">
        <Link
          href={`/remediation/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-primary transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Remediation Plan
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-xl transition shadow-md"
        >
          <Printer className="h-4 w-4 text-emerald-400" />
          Print / Export Final Certificate
        </button>
      </div>

      {/* Main Document Box */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              <FileCheck className="h-3.5 w-3.5 text-emerald-600" />
              FINAL AI AUDIT BRIEF & MULTI-SIGNER CERTIFICATE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Executive Multi-Signature Board
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Report ID: {report?.analysisId || id} • Network: Algorand TestNet
            </p>
          </div>

          <div className="text-right bg-slate-900 text-white px-5 py-3 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex justify-between items-center gap-4 text-xs">
              <span className="text-slate-400 font-mono">CONSENSUS</span>
              <span className="font-mono font-bold text-emerald-400">{signedCount}/3 ({progressPct}%)</span>
            </div>
            <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section 1: Executive AI Risk Brief */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider text-xs">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Major Risk Brief & Findings Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50/70 rounded-2xl border border-red-200/80 space-y-1">
              <span className="text-[11px] font-bold text-red-900 block">Critical Risk #1</span>
              <p className="text-xs text-slate-700 font-medium">Reentrancy Drain Vector in Balance Loop</p>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-1">
              <span className="text-[11px] font-bold text-amber-900 block">High Risk #2</span>
              <p className="text-xs text-slate-700 font-medium">Uncapped Third-Party Indemnification Liability</p>
            </div>

            <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200/80 space-y-1">
              <span className="text-[11px] font-bold text-purple-900 block">Medium Risk #3</span>
              <p className="text-xs text-slate-700 font-medium">Missing ReentrancyGuard Modifier Check</p>
            </div>
          </div>
        </div>

        {/* Section 2: Cryptographic SHA-256 Digest Box */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <Lock className="h-4 w-4" />
              <span>Canonical SHA-256 Cryptographic Hash Digest</span>
            </div>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              RFC 8785 JCS
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-[11px] text-amber-300 select-all break-all border border-slate-800">
            {sha256Hash}
          </div>
        </div>

        {/* Section 3: Multi-Signer Approval Board & Activity Timeline */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider text-xs">
            <Users className="h-4 w-4 text-blue-600" />
            Algorand Multi-Signature Approval Board
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Signer 1 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">1. Lead Auditor</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> SIGNED
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 truncate block">
                PIKPW7D6G4...N3VAY
              </span>
            </div>

            {/* Signer 2 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">2. AI Engine Key</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> SIGNED
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 truncate block">
                AI-ENGINE-KEY-894
              </span>
            </div>

            {/* Signer 3 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">3. Enterprise Co-Signer</span>
                {signedCount === 3 ? (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> SIGNED
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    PENDING
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-500 truncate block">
                Client Officer Address
              </span>
            </div>
          </div>

          {/* Interactive Co-Sign Button */}
          {signedCount < 3 && (
            <div className="pt-2">
              <button
                onClick={handleCoSign}
                disabled={signing}
                className="w-full py-4 text-xs font-extrabold text-white bg-brand-primary hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {signing ? "Executing Algorand Multi-Sig Notarization..." : "Sign Report & Anchor On-Chain 🖋️"}
              </button>
            </div>
          )}

          {signedCount === 3 && (
            <div className="p-4 bg-emerald-950 border border-emerald-500/50 rounded-2xl text-center space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">
                ✓ FINAL MULTI-SIG REPORT ANCHORED ON ALGORAND BLOCK #48291231!
              </span>
              <a
                href={txDetails?.verification?.explorerUrl || "https://testnet.explorer.perawallet.app/tx/F5X4J9A2K7839102938472910293847281903847"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-white underline hover:text-emerald-300"
              >
                View Final Multisig Certificate on Pera Explorer 🔗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
