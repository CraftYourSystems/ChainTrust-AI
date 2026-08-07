'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const WalletConnectButton = dynamic(
  () => import('@/blockchain/wallet/components/WalletConnectButton').then(m => m.WalletConnectButton),
  { ssr: false }
);

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <ShieldCheck className="h-7 w-7 text-brand-primary transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                ChainTrust<span className="text-brand-primary">AI</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">
              How It Works
            </Link>
            <Link href="/verify" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
              Verify Portal
            </Link>
          </div>

          {/* CTA Buttons & Wallet Connect */}
          <div className="flex items-center gap-4">
            <WalletConnectButton />
            <button
              onClick={() => router.push('/upload')}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-blue-700 transition-colors rounded-lg shadow-sm"
            >
              Analyze Contract
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
