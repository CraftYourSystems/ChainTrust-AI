"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  User, 
  Wallet, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  Clock, 
  Coins, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Trash2,
  Upload
} from "lucide-react";
import { walletStore } from "@/services/walletStore";
import { reportHistory, ReportHistoryEntry } from "@/services/reportHistory";

const demoHistory: ReportHistoryEntry[] = [
  {
    id: "ANL-98421",
    fileName: "TokenVault.sol",
    contractType: "Solidity Smart Contract",
    riskLevel: "High",
    riskScore: 78,
    date: "2026-08-07T12:00:00Z",
    feeAlgo: "5.0",
  },
  {
    id: "ANL-98418",
    fileName: "StakingPool.teal",
    contractType: "PyTeal Approval Program",
    riskLevel: "Low",
    riskScore: 18,
    date: "2026-08-06T15:30:00Z",
    feeAlgo: "2.0",
  },
];

export default function UserAccountPage() {
  const [walletState, setWalletState] = useState(() =>
    typeof window !== "undefined" ? walletStore.getState() : { address: null, balance: 10.0, connected: false }
  );
  const [realHistory, setRealHistory] = useState<ReportHistoryEntry[]>([]);

  const refreshWallet = () => setWalletState(walletStore.getState());
  const refreshHistory = () => setRealHistory(reportHistory.getHistory());

  useEffect(() => {
    refreshWallet();
    refreshHistory();

    window.addEventListener("wallet-balance-updated", refreshWallet);
    window.addEventListener("report-history-updated", refreshHistory);

    return () => {
      window.removeEventListener("wallet-balance-updated", refreshWallet);
      window.removeEventListener("report-history-updated", refreshHistory);
    };
  }, []);

  const activeAddr =
    walletState.address || "PIKPW7D6G4RCGAU35ACWQWGXDCOYYGGD35L3BTNU27CGVU7GTNVALN3VAY";

  // Combine real user history from localStorage with demo history fallback
  const displayHistory = realHistory.length > 0 ? realHistory : demoHistory;
  const isRealData = realHistory.length > 0;

  const handleClearHistory = () => {
    reportHistory.clearHistory();
    refreshHistory();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold mb-2">
            <User className="h-3.5 w-3.5" />
            Authenticated User Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            User Account & Document History
          </h1>
        </div>

        <Link
          href="/upload"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-blue-700 transition rounded-xl shadow-sm hover:scale-105"
        >
          Analyze New Contract
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Account Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Wallet Address Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 text-brand-primary rounded-xl">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase">Wallet Identity</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {walletState.connected ? "Connected Wallet" : "Demo Auditor Session"}
              </span>
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-slate-800 break-all select-all block bg-slate-50 p-3 rounded-xl border border-slate-100">
            {activeAddr}
          </span>
        </div>

        {/* Balance & Network Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase">Algorand Network</span>
              <span className="text-xs font-bold text-slate-700">Algorand TestNet</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Available Balance</span>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              {walletState.balance.toFixed(1)} ALGO
            </span>
          </div>
        </div>

        {/* Security & Verification Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase">Security Level</span>
              <span className="text-xs font-bold text-emerald-600">Enterprise Verified</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 font-medium">
            x402 Pay-Gated • HMAC-SHA256 Notarized
          </div>
        </div>
      </div>

      {/* Document & Audit History Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-primary" />
            <h2 className="text-lg font-bold text-slate-900">Your Audited Documents & Certificates</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {displayHistory.length} {displayHistory.length === 1 ? "Audit" : "Audits"}
            </span>
            {isRealData && (
              <button
                onClick={handleClearHistory}
                title="Clear user history"
                className="p-1 text-slate-400 hover:text-red-500 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {displayHistory.map((item) => {
            const riskKey = item.riskLevel.toLowerCase();
            const isHigh = riskKey.includes("high");
            const isMedium = riskKey.includes("medium");

            return (
              <div
                key={item.id}
                className="p-6 hover:bg-slate-50/60 transition flex flex-col sm:flex-row justify-between sm:items-center gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-base">{item.fileName}</span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isHigh
                          ? "bg-red-50 text-red-600 border-red-200"
                          : isMedium
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-emerald-50 text-emerald-600 border-emerald-200"
                      }`}
                    >
                      {item.riskLevel} Risk
                    </span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                      {item.feeAlgo} ALGO Paid
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono flex-wrap">
                    <span>ID: {item.id}</span>
                    <span>•</span>
                    <span>Type: {item.contractType || "Smart Contract"}</span>
                    <span>•</span>
                    <span>
                      Date: {new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/report/${item.id}`}
                    className="px-4 py-2 text-xs font-bold text-brand-primary bg-blue-50 hover:bg-blue-100 rounded-xl transition flex items-center gap-1.5"
                  >
                    View Report & Certificate 📄
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
