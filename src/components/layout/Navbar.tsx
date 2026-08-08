"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, User, Terminal, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ReportHistoryDrawer } from "@/components/layout/ReportHistoryDrawer";

const WalletConnectButton = dynamic(
  () =>
    import("@/blockchain/wallet/components/WalletConnectButton").then(
      (m) => m.WalletConnectButton
    ),
  { ssr: false }
);

export const Navbar: React.FC = () => {
  const router = useRouter();
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left Side: Logo & Links */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-1.5 bg-blue-50 rounded-xl text-brand-primary group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-lg font-black text-slate-900 tracking-tight">
                  ChainTrust<span className="text-brand-primary">AI</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-4 border-l border-slate-200 pl-6">
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-primary px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition"
                >
                  <User className="h-3.5 w-3.5 text-slate-500" />
                  Account
                </Link>

                <Link
                  href="/demo"
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-100 transition"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Live Demo 🚀
                </Link>
              </div>
            </div>

            {/* Right Side: History + Wallet + CTA */}
            <div className="flex items-center gap-3">
              {/* Report History Button */}
              <button
                onClick={() => setHistoryOpen(true)}
                title="View report history"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-primary bg-slate-100 hover:bg-blue-50 px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-200 transition"
              >
                <Clock className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">History</span>
              </button>

              <WalletConnectButton />

              <button
                onClick={() => router.push("/upload")}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-brand-primary hover:bg-blue-700 transition rounded-xl shadow-md shadow-blue-500/10 hover:scale-105"
              >
                Analyze Contract
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-in Report History Drawer */}
      <ReportHistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </>
  );
};
