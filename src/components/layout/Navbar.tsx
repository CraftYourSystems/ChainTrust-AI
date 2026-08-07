"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, User } from "lucide-react";
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
          {/* Left Side: Logo & Account Link */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-blue-50 rounded-xl text-brand-primary group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight">
                ChainTrust<span className="text-brand-primary">AI</span>
              </span>
            </Link>

            <Link
              href="/account"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-primary bg-slate-100/80 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
            >
              <User className="h-3.5 w-3.5 text-slate-500" />
              Account
            </Link>
          </div>

          {/* Right Side: Wallet Connect & CTA */}
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
