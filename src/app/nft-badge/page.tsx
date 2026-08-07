"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, ShieldCheck, CheckCircle2, ExternalLink, Sparkles, ArrowLeft, Loader2 } from "lucide-react";

export default function NftBadgePage() {
  const [minting, setMinting] = useState(false);
  const [mintedData, setMintedData] = useState<any>(null);

  const handleMintASA = async () => {
    setMinting(true);
    try {
      const res = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success) {
        setMintedData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back Link */}
      <Link 
        href="/account" 
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-primary transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex p-3 bg-amber-50 text-amber-600 rounded-2xl mb-4 border border-amber-200">
          <Award className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Step 6: Proof-of-Audit ASA NFT Certificate
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Mint a Non-Fungible Algorand Standard Asset (ASA) tied directly to your verified audit report fingerprint.
        </p>
      </div>

      {/* Main Minting Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-8 text-center">
        <div className="w-24 h-24 bg-amber-500/10 text-amber-400 rounded-3xl flex items-center justify-center mx-auto border border-amber-500/30 shadow-inner">
          <Award className="h-12 w-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold block uppercase tracking-wider">
            Algorand Standard Asset (ASA Specification)
          </span>
          <h2 className="text-2xl font-bold text-white">ChainTrust Audit Badge</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Unit Name: <strong className="text-slate-200 font-mono">AUDITNFT</strong> • Total Supply: <strong className="text-slate-200 font-mono">1</strong> (Non-Fungible)
          </p>
        </div>

        {/* Action Button */}
        {!mintedData ? (
          <button
            onClick={handleMintASA}
            disabled={minting}
            className="w-full py-4 text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            {minting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                Executing algosdk.makeAssetCreateTxn...
              </span>
            ) : (
              "Mint Proof-of-Audit ASA NFT 🏆"
            )}
          </button>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="p-4 bg-emerald-950 border border-emerald-500/50 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-emerald-400 block">
                ✓ ASA NFT MINTED ON ALGORAND TESTNET!
              </span>
              <span className="text-xs text-slate-300 font-mono block">
                Asset ID: #{mintedData.assetId}
              </span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs font-mono text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="text-amber-400 truncate max-w-[200px]">{mintedData.txId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmed Round:</span>
                <span className="text-slate-200">#{mintedData.confirmedRound}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unit Name:</span>
                <span className="text-emerald-400 font-bold">{mintedData.unitName}</span>
              </div>
            </div>

            <a
              href={mintedData.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition shadow-md"
            >
              View ASA Asset on Pera Explorer
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
