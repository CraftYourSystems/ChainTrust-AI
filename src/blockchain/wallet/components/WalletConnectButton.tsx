"use client";

import React, { useState, useEffect } from "react";
import { walletStore, DEMO_WALLET, STARTING_BALANCE } from "@/services/walletStore";
import { Wallet, X, CheckCircle2, ExternalLink, LogOut } from "lucide-react";

export function WalletConnectButton() {
  const [walletState, setWalletState] = useState(() =>
    typeof window !== "undefined" ? walletStore.getState() : { address: null, balance: STARTING_BALANCE, connected: false }
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleUpdate = () => setWalletState(walletStore.getState());
    window.addEventListener("wallet-balance-updated", handleUpdate);
    handleUpdate(); // sync on mount in case localStorage already has state
    return () => window.removeEventListener("wallet-balance-updated", handleUpdate);
  }, []);

  const handleDemoConnect = () => {
    walletStore.connect(DEMO_WALLET);
    setShowModal(false);
  };

  const handleDisconnect = () => {
    walletStore.disconnect();
  };

  if (walletState.connected && walletState.address) {
    const addr = walletState.address;
    const shortAddr = `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    return (
      <button
        onClick={handleDisconnect}
        title="Click to Disconnect (resets to 10.0 ALGO)"
        className="group inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50/90 hover:bg-red-50 hover:text-red-600 px-3.5 py-2 rounded-xl border border-emerald-200 hover:border-red-200 shadow-sm transition-all duration-200 cursor-pointer"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500 group-hover:bg-red-500 animate-pulse transition-colors" />
        <span className="font-mono">{shortAddr}</span>
        <span className="font-black text-emerald-700 group-hover:text-red-500 transition-colors">
          • {walletState.balance.toFixed(1)} ALGO
        </span>
        <LogOut className="h-3.5 w-3.5 text-slate-400 group-hover:text-red-500 transition-colors ml-1" />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
      >
        <Wallet className="h-3.5 w-3.5 text-brand-primary" />
        Connect Wallet
      </button>

      {/* Wallet Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-50 text-brand-primary rounded-xl">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Connect Algorand Wallet</h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Select your wallet provider or connect instantly with our pre-funded Demo Auditor Account.
            </p>

            <div className="space-y-3">
              {/* Option 1: Demo Auditor Wallet */}
              <button
                onClick={handleDemoConnect}
                className="w-full text-left p-4 rounded-xl border-2 border-blue-300 bg-blue-50/60 hover:bg-blue-50 transition flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    <span>⚡ Demo Auditor Account</span>
                    <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      Pre-funded
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5 font-mono">
                    PIKPW7...N3VAY • {STARTING_BALANCE.toFixed(1)} ALGO starting balance
                  </span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-brand-primary opacity-0 group-hover:opacity-100 transition" />
              </button>

              {/* Option 2: Pera Install Link */}
              <a
                href="https://perawallet.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-between text-slate-700 text-xs font-semibold"
              >
                <span>Install Pera Chrome Extension 🔗</span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </a>
            </div>

            <p className="text-[10px] text-slate-400 text-center mt-4">
              Demo wallet starts with {STARTING_BALANCE.toFixed(1)} ALGO. Balance resets on disconnect.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
