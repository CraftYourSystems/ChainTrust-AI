"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const WalletConnectButton = dynamic(
  () => import("@/blockchain/wallet/components/WalletConnectButton").then(m => m.WalletConnectButton),
  { ssr: false }
);

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-blue-50 rounded-xl text-brand-primary group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight">
                ChainTrust<span className="text-brand-primary">AI</span>
              </span>
            </Link>
          </div>

          {/* Clean Navigation Links */}
          <div className="hidden md:flex items-center gap-6" suppressHydrationWarning>
            <Link 
              href="/payment" 
              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200/80 transition"
            >
              x402 Gateway ⚡
            </Link>

            <Link 
              href="/verify" 
              className="text-xs font-semibold text-slate-600 hover:text-brand-primary transition"
            >
              Verify Portal
            </Link>

            <Link 
              href="/account" 
              className="text-xs font-semibold text-slate-600 hover:text-brand-primary transition"
            >
              Account
            </Link>

            <Link 
              href="/demo" 
              className="text-xs font-bold text-blue-600 bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition"
            >
              Live Demo 🚀
            </Link>
          </div>

          {/* CTA Buttons & Sleek Wallet Connect */}
          <div className="flex items-center gap-3">
            <WalletConnectButton />

            <button
              onClick={() => router.push('/upload')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-brand-primary hover:bg-blue-700 transition rounded-xl shadow-md shadow-blue-500/10 hover:scale-105"
            >
              Analyze Contract
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
