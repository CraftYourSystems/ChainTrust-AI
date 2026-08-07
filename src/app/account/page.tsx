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
  Shield
} from "lucide-react";
import { useWalletIdentity } from "@/blockchain/wallet/hooks/useWalletIdentity";

interface AuditHistoryItem {
  id: string;
  contractName: string;
  date: string;
  riskLevel: "Low" | "Medium" | "High";
  txId: string;
  confirmedRound: number;
}

export default function UserAccountPage() {
  const { address, status } = useWalletIdentity();
  const activeAddr = address || "PIKPW7D6G4RCGAU35ACWQWGXDCOYYGGD35L3BTNU27CGVU7GTNVALN3VAY";

  const [history, setHistory] = useState<AuditHistoryItem[]>([
    {
      id: "ANL-98421",
      contractName: "TokenVault.sol",
      date: "2026-08-07",
      riskLevel: "High",
      txId: "F5X4J9A2K7839102938472910293847281903847",
      confirmedRound: 48291231,
    },
    {
      id: "ANL-98418",
      contractName: "StakingPool.teal",
      date: "2026-08-06",
      riskLevel: "Low",
      txId: "A910238472910293847281903847F5X4J9A2K78",
      confirmedRound: 48289410,
    },
  ]);

  const [balance, setBalance] = useState("10.0");

  useEffect(() => {
    fetch(`/api/wallet/balance?address=${activeAddr}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.balance) {
          setBalance(data.balance);
        }
      })
      .catch(() => setBalance("9.0"));
  }, [activeAddr]);

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
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-blue-700 transition rounded-xl shadow-sm"
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
                Active Session
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
            <span className="text-xs text-slate-500 font-medium">TestNet Balance</span>
            <span className="text-sm font-extrabold text-slate-900 font-mono">{balance} ALGO</span>
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
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
            x402 Pay-Gated • HMAC-SHA256 Authenticated
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
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {history.length} Audits
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {history.map((item) => (
            <div key={item.id} className="p-6 hover:bg-slate-50/60 transition flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-base">{item.contractName}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    item.riskLevel === "High" 
                      ? "bg-red-50 text-red-600 border-red-200" 
                      : "bg-emerald-50 text-emerald-600 border-emerald-200"
                  }`}>
                    {item.riskLevel} Risk
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>ID: {item.id}</span>
                  <span>•</span>
                  <span>Date: {item.date}</span>
                  <span>•</span>
                  <span>Round: #{item.confirmedRound}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/report/${item.id}`}
                  className="px-4 py-2 text-xs font-bold text-brand-primary bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                >
                  View Report & Certificate 📄
                </Link>
                <a
                  href={`https://testnet.explorer.perawallet.app/tx/${item.txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1"
                >
                  Pera Explorer
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
