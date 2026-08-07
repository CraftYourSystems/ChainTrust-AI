"use client";

import React, { useState } from "react";
import { useWalletIdentity } from "../hooks/useWalletIdentity";
import { Wallet, X, CheckCircle2, ExternalLink, LogOut } from "lucide-react";

export function WalletConnectButton() {
  const { status, address, providers, disconnect } = useWalletIdentity();
  const [showModal, setShowModal] = useState(false);
  const [demoAddress, setDemoAddress] = useState<string | null>(null);

  const demoWallet = "PIKPW7D6G4RCGAU35ACWQWGXDCOYYGGD35L3BTNU27CGVU7GTNVALN3VAY";

  const handleDemoConnect = () => {
    setDemoAddress(demoWallet);
    setShowModal(false);
  };

  const activeAddr = address || demoAddress;

  if ((status === "connected" || demoAddress) && activeAddr) {
    const shortAddr = `${activeAddr.slice(0, 4)}...${activeAddr.slice(-4)}`;
    return (
      <button
        onClick={() => {
          setDemoAddress(null);
          disconnect();
        }}
        title="Click to Disconnect"
        className="group inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50/90 hover:bg-red-50 hover:text-red-600 px-3.5 py-2 rounded-xl border border-emerald-200 hover:border-red-200 shadow-sm transition-all duration-200 cursor-pointer"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500 group-hover:bg-red-500 animate-pulse transition-colors" />
        <span className="font-mono">{shortAddr}</span>
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
                className="w-full text-left p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    <span>⚡ Demo Auditor Account</span>
                    <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">Fast Test</span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5 font-mono">
                    PIKPW7D6G4...N3VAY (10 ALGO)
                  </span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-brand-primary opacity-0 group-hover:opacity-100 transition" />
              </button>

              {/* Option 2: Real Pera Extension */}
              {providers && providers.length > 0 ? (
                providers.map((provider: any) => (
                  <button
                    key={provider.metadata.id}
                    onClick={() => {
                      provider.connect();
                      setShowModal(false);
                    }}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">
                        {provider.metadata.name} Wallet
                      </span>
                      <span className="text-xs text-slate-500">Connect via Pera Extension or Mobile QR</span>
                    </div>
                  </button>
                ))
              ) : (
                <a
                  href="https://perawallet.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-between text-slate-700 text-xs font-semibold"
                >
                  <span>Install Pera Chrome Extension 🔗</span>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
