"use client";

import React, { useState } from "react";

export default function VerificationPortalPage() {
  const [txId, setTxId] = useState("");
  const [reportJson, setReportJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      let parsedReport: any = null;
      if (reportJson.trim()) {
        parsedReport = JSON.parse(reportJson);
      }

      const res = await fetch("/api/verify/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportData: parsedReport,
          txId: txId.trim() || undefined,
        }),
      });

      const data = await res.json();
      setResult(data.data);
    } catch (err: any) {
      setResult({
        status: "NOT_FOUND",
        isAuthentic: false,
        message: `Invalid Input: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
          Public Proof Verification Portal
        </h1>
        <p className="text-slate-400 mb-6 text-sm">
          Verify the cryptographic authenticity of any ChainTrust-AI Due Diligence Report against the immutable Algorand blockchain.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Algorand Transaction ID (Optional)
            </label>
            <input
              type="text"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder="e.g. TXID_ON_CHAIN_PROOFOFEXISTENCE_..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Report JSON Content
            </label>
            <textarea
              rows={6}
              value={reportJson}
              onChange={(e) => setReportJson(e.target.value)}
              placeholder="Paste Report JSON payload here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Verifying On-Chain Proof..." : "Verify Authenticity"}
          </button>
        </form>

        {result && (
          <div className="mt-8 border-t border-slate-800 pt-6">
            <div
              className={`p-4 rounded-lg border ${
                result.status === "VERIFIED"
                  ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                  : result.status === "TAMPERED"
                  ? "bg-rose-950/40 border-rose-500/50 text-rose-300"
                  : "bg-amber-950/40 border-amber-500/50 text-amber-300"
              }`}
            >
              <div className="flex items-center justify-between font-bold text-lg mb-1">
                <span>Status: {result.status}</span>
                <span>{result.isAuthentic ? "✓ AUTHENTIC" : "✕ UNVERIFIED"}</span>
              </div>
              <p className="text-sm opacity-90">{result.message}</p>
            </div>

            {result.proofDetails && (
              <div className="mt-4 bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Transaction ID:</span>
                  <span className="font-mono text-cyan-400">{result.proofDetails.txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confirmed Block Round:</span>
                  <span className="font-mono text-slate-200">{result.proofDetails.confirmedRound}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">On-Chain Recorded Hash:</span>
                  <span className="font-mono text-slate-200">{result.proofDetails.recordedReportHash}</span>
                </div>
                <div className="pt-2">
                  <a
                    href={result.proofDetails.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-cyan-400 hover:underline"
                  >
                    View on Algorand Explorer →
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
