"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  Coins, 
  Users, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Lock,
  Copy,
  Check
} from "lucide-react";

export default function ProofOfAuditNFTPage() {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [assetId, setAssetId] = useState<number | null>(null);

  const handleMintASA = async () => {
    setMinting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setAssetId(789410293);
    setMinting(false);
    setMinted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-4 border border-amber-200">
          <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
          Algorand Standard Asset (ASA) • Proof-of-Audit NFT Module
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          On-Chain ASA "Proof-of-Audit" NFT Badges
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Mint an official Algorand Standard Asset (ASA) NFT certificate directly into the client's Web3 wallet upon successful contract verification.
        </p>
      </div>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: ASA NFT Minting Terminal */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">ASA Audit NFT Generator</h3>
                <span className="text-xs text-slate-400">Unit Name: AUDITNFT</span>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
              ASA NON-FUNGIBLE
            </span>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Asset Name</span>
              <span className="font-bold text-white">ChainTrust Audit Badge</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Total Supply</span>
              <span className="font-mono font-bold text-emerald-400">1 (Non-Fungible)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Algorand Network</span>
              <span className="font-semibold text-slate-300">Algorand TestNet</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Metadata Hash</span>
              <span className="font-mono text-[10px] text-amber-300 truncate select-all">b3b1b1ab12e4a7d5362110b2b85...</span>
            </div>
          </div>

          <div>
            {!minted ? (
              <button
                onClick={handleMintASA}
                disabled={minting}
                className="w-full py-4 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                {minting ? "Minting ASA NFT on Algorand..." : "Mint Proof-of-Audit ASA NFT 🏆"}
              </button>
            ) : (
              <div className="p-4 bg-amber-950 border border-amber-500/50 rounded-xl text-center space-y-2">
                <span className="text-xs font-bold text-amber-400 block">
                  ✓ ASA NFT MINTED SUCCESSFULLY! (Asset ID: #{assetId})
                </span>
                <a
                  href={`https://testnet.explorer.perawallet.app/asset/${assetId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white underline hover:text-amber-300"
                >
                  View ASA Asset on Pera Explorer 🔗
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Card: 2-of-3 Multisig Governance */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Multisig Audit Governance</h3>
                <span className="text-xs text-slate-400">2-of-3 Algorand Multi-Signature</span>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/30">
              MULTISIG 2/3
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
              <span>1. Lead Security Auditor Key</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> SIGNED
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
              <span>2. ChainTrust AI Engine Key</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> SIGNED
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs opacity-60">
              <span>3. Enterprise Client Officer Key</span>
              <span className="font-bold text-slate-400">PENDING</span>
            </div>
          </div>

          <div className="p-4 bg-blue-950/60 border border-blue-500/30 rounded-xl text-xs text-blue-300 leading-relaxed">
            <strong className="block mb-1 text-white">Multisig Threshold Met (2/3):</strong>  
            The required signature threshold is satisfied. The audit certificate is cryptographically valid and anchored on Algorand.
          </div>
        </div>
      </div>
    </div>
  );
}
