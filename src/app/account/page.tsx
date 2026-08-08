"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Wallet,
  FileText,
  Clock,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Trash2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/common/Button";
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
  const [mounted, setMounted] = useState(false);
  const [walletState, setWalletState] = useState({
    address: null as string | null,
    balance: 10.0,
    connected: false,
  });
  const [realHistory, setRealHistory] = useState<ReportHistoryEntry[]>([]);

  const refreshWallet = () => setWalletState(walletStore.getState());
  const refreshHistory = () => setRealHistory(reportHistory.getHistory());

  useEffect(() => {
    setMounted(true);
    refreshWallet();
    refreshHistory();

    window.addEventListener("wallet-balance-updated", refreshWallet);
    window.addEventListener("report-history-updated", refreshHistory);

    return () => {
      window.removeEventListener("wallet-balance-updated", refreshWallet);
      window.removeEventListener("report-history-updated", refreshHistory);
    };
  }, []);

  const isConnected = mounted && walletState.connected;
  const activeAddr =
    (mounted && walletState.address) || "PIKPW7D6G4RCGAU35ACWQWGXDCOYYGGD35L3BTNU27CGVU7GTNVALN3VAY";

  // Combine real user history from localStorage with demo history fallback
  const displayHistory = mounted && realHistory.length > 0 ? realHistory : demoHistory;
  const isRealData = mounted && realHistory.length > 0;

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
                {isConnected ? "Connected Wallet" : "Demo Auditor Session"}
              </span>
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-slate-800 break-all select-all block bg-slate-50 p-3 rounded-xl border border-slate-100">
            {activeAddr}
          </span>
        </div>

        {/* ALGO Balance Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase">TestNet Balance</span>
              <span className="text-xs font-bold text-slate-700">x402 Micropayment Ready</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {mounted ? walletState.balance.toFixed(1) : "10.0"}
            </span>
            <span className="text-xs font-extrabold text-brand-primary uppercase">ALGO</span>
          </div>
        </div>

        {/* Audits Completed Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase">Audits Performed</span>
              <span className="text-xs font-bold text-purple-600">
                {isRealData ? "Live Session Activity" : "Sample Demo Records"}
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{displayHistory.length}</span>
            <span className="text-xs font-semibold text-slate-500">Reports Anchored</span>
          </div>
        </div>
      </div>

      {/* History Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-primary" />
              Contract Due Diligence History
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isRealData
                ? "Recent contract reports analyzed in this browser session."
                : "Sample audit reports demonstrating dashboard capabilities."}
            </p>
          </div>

          {isRealData && (
            <Button variant="outline" size="sm" onClick={handleClearHistory}>
              <Trash2 className="h-3.5 w-3.5 mr-1.5 text-red-500" />
              Clear History
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Report ID</th>
                <th className="py-3.5 px-6">Document Name</th>
                <th className="py-3.5 px-6">Risk Assessment</th>
                <th className="py-3.5 px-6">Fee Paid</th>
                <th className="py-3.5 px-6">Analysis Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {displayHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">
                    <Link href={`/report/${item.id}`} className="hover:text-brand-primary hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {item.fileName}
                    <span className="block text-[11px] text-slate-400 font-normal">{item.contractType}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        item.riskLevel === "High" || item.riskLevel === "Critical"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : item.riskLevel === "Medium"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {item.riskLevel === "High" || item.riskLevel === "Critical" ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : (
                        <CheckCircle className="h-3 w-3" />
                      )}
                      {item.riskLevel} Risk ({item.riskScore}/100)
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-700">{item.feeAlgo} ALGO</td>
                  <td className="py-4 px-6 text-slate-500">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/report/${item.id}`}
                      className="inline-flex items-center gap-1 font-bold text-brand-primary hover:text-blue-700 hover:underline"
                    >
                      View Report
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
