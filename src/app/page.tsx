"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Upload, 
  CreditCard, 
  FileText, 
  Search, 
  Zap, 
  ArrowRight, 
  Activity, 
  Database, 
  ExternalLink,
  CheckCircle2,
  Clock,
  Lock,
  TrendingUp,
  Cpu
} from "lucide-react";
import { useWalletIdentity } from "@/blockchain/wallet/hooks/useWalletIdentity";

export default function EnterpriseAppDashboard() {
  const { address } = useWalletIdentity();
  const activeAddr = address || "PIKPW7D6G4RCGAU35ACWQWGXDCOYYGGD35L3BTNU27CGVU7GTNVALN3VAY";

  const [recentScans] = useState([
    {
      id: "ANL-98421",
      name: "TokenVault.sol",
      type: "Solidity Smart Contract",
      date: "Just now",
      risk: "High",
      riskScore: 78,
      status: "VERIFIED_ON_CHAIN",
      txId: "F5X4J9A2K7839102938472910293847281903847",
      round: 48291231,
    },
    {
      id: "ANL-98418",
      name: "StakingPool.teal",
      type: "PyTeal Smart Contract",
      date: "2 hours ago",
      risk: "Low",
      riskScore: 12,
      status: "VERIFIED_ON_CHAIN",
      txId: "A910238472910293847281903847F5X4J9A2K78",
      round: 48289410,
    },
    {
      id: "ANL-98412",
      name: "SaaS_Vendor_Agreement.pdf",
      type: "Legal Agreement",
      date: "1 day ago",
      risk: "Medium",
      riskScore: 45,
      status: "VERIFIED_ON_CHAIN",
      txId: "B82910293847281903847F5X4J9A2K78A9102",
      round: 48281002,
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* App Welcome & Quick Action Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              ChainTrust AI Engine • Enterprise App v2.0
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Contract Intelligence Workspace
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Upload legal agreements or smart contracts for AI risk scoring & instant Algorand blockchain notarization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href="/upload"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Upload className="h-4 w-4" />
              Analyze New Contract
            </Link>

            <Link
              href="/payment"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
            >
              <CreditCard className="h-4 w-4 text-amber-400" />
              x402 Pay Gateway
            </Link>
          </div>
        </div>
      </div>

      {/* Live System Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Algorand Node</span>
            <span className="text-xl font-black text-slate-900 font-mono">#48291231</span>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">TestNet • 142ms Latency</span>
          </div>
          <div className="p-3 bg-blue-50 text-brand-primary rounded-xl">
            <Cpu className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Security Standard</span>
            <span className="text-xl font-black text-slate-900 font-mono">HTTP 402</span>
            <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">Pay-Gated Engine</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Zap className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Contracts Audited</span>
            <span className="text-xl font-black text-slate-900 font-mono">1,482</span>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">100% On-Chain Certified</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Verification Rate</span>
            <span className="text-xl font-black text-slate-900 font-mono">100.0%</span>
            <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">SHA-256 Tamper-Proof</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Workflow App Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Recent Contract Audit Logs Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Contract Audit Logs</h2>
              <p className="text-xs text-slate-500">Live feed of contract audits notarized on Algorand TestNet</p>
            </div>
            <Link href="/account" className="text-xs font-bold text-brand-primary hover:underline">
              View All ➔
            </Link>
          </div>

          <div className="space-y-4">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${
                    scan.risk === "High" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                  }`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{scan.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        scan.risk === "High" ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                      }`}>
                        {scan.risk} Risk ({scan.riskScore}/100)
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                      {scan.type} • ID: {scan.id} • Round #{scan.round}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link
                    href={`/report/${scan.id}`}
                    className="px-3 py-1.5 text-xs font-bold text-brand-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                  >
                    Report 📄
                  </Link>
                  <a
                    href={`https://testnet.explorer.perawallet.app/tx/${scan.txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-200/60 hover:bg-slate-200 rounded-lg transition flex items-center gap-1"
                  >
                    Explorer
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): App Navigation Actions Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-white">App Navigation Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access workspace tools for uploading contracts, executing x402 payments, or verifying audit proof.
            </p>

            <div className="space-y-3 pt-2">
              <Link
                href="/upload"
                className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition flex items-center justify-between text-xs font-bold text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <Upload className="h-4 w-4 text-blue-400" />
                  <span>1. Contract Ingestion</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition" />
              </Link>

              <Link
                href="/payment"
                className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition flex items-center justify-between text-xs font-bold text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="h-4 w-4 text-amber-400" />
                  <span>2. x402 Pay Gateway</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition" />
              </Link>

              <Link
                href="/verify"
                className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition flex items-center justify-between text-xs font-bold text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>3. Tamper Verification</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition" />
              </Link>

              <Link
                href="/account"
                className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition flex items-center justify-between text-xs font-bold text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <Database className="h-4 w-4 text-purple-400" />
                  <span>4. User Account & Logs</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
