import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-brand-primary" />
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                ChainTrust<span className="text-brand-primary">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm">
              Blockchain-powered contract due diligence and risk intelligence. Upload contracts, identify risks, and verify reports immutably.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/#features" className="hover:text-brand-primary transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-brand-primary transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/upload" className="hover:text-brand-primary transition-colors">Analyze Contract</Link>
              </li>
            </ul>
          </div>

          {/* Legal / Metadata */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Verification</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <span className="text-xs text-slate-400 block">Algorand TestNet Ready</span>
              </li>
              <li>
                <span className="text-xs text-slate-400 block">HTTP 402 Pay-Gated</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} ChainTrust AI. All rights reserved. Built for Algorand Hackathon.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <span className="hover:text-brand-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-brand-primary cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
