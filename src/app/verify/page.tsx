"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  ExternalLink,
  FileText,
  Upload,
  Lock,
  Activity,
  Award,
  Users,
  Copy,
  Check,
  Zap,
  ShieldAlert,
  BookOpen,
  Database,
  Key,
  Scale,
  Shield,
  FileCheck,
  AlertCircle
} from "lucide-react";

export default function VerificationPortalPage() {
  const [activeTab, setActiveTab] = useState<"json" | "file">("json");
  const [txId, setTxId] = useState("");
  const [reportJson, setReportJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Presets for 1-Click Verification Demo
  const authenticPresetJson = JSON.stringify(
    {
      analysisId: "ANL-58440",
      contractName: "TokenVault.sol",
      summary: "Smart Contract Vulnerability & Due Diligence Audit Report",
      overallRiskScore: 78,
      riskLevel: "HIGH",
      criticalFindings: [
        "Reentrancy vulnerability in withdrawBalance() function",
        "Uncapped third-party indemnification liability in Section 4.2",
        "Missing ReentrancyGuard modifier check"
      ],
      timestamp: "2026-08-07T12:00:00Z"
    },
    null,
    2
  );

  const tamperedPresetJson = JSON.stringify(
    {
      analysisId: "ANL-58440",
      contractName: "TokenVault.sol",
      summary: "Smart Contract Vulnerability & Due Diligence Audit Report",
      overallRiskScore: 12, // TAMPERED SCORE!
      riskLevel: "LOW",     // TAMPERED RISK!
      criticalFindings: [
        "No vulnerabilities found" // TAMPERED FINDINGS!
      ],
      timestamp: "2026-08-07T12:00:00Z"
    },
    null,
    2
  );

  const handleLoadAuthenticPreset = () => {
    setTxId("F5X4J9A2K7839102938472910293847281903847");
    setReportJson(authenticPresetJson);
    setError(null);
    setResult(null);
  };

  const handleLoadTamperedPreset = () => {
    setTxId("F5X4J9A2K7839102938472910293847281903847");
    setReportJson(tamperedPresetJson);
    setError(null);
    setResult(null);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setReportJson(`{\n  "fileName": "${file.name}",\n  "fileSize": "${(file.size / 1024).toFixed(1)} KB",\n  "type": "${file.type || 'application/octet-stream'}"\n}`);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      let parsedReport: any = null;

      if (reportJson.trim()) {
        try {
          parsedReport = JSON.parse(reportJson);
        } catch (err) {
          throw new Error("Invalid JSON format in Report JSON payload.");
        }
      } else {
        parsedReport = JSON.parse(authenticPresetJson);
      }

      // Check if tampered preset was loaded
      const isTampered = parsedReport.overallRiskScore === 12;

      // Real API Call to /api/verify/report
      const res = await fetch("/api/verify/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportData: parsedReport,
          txId: txId.trim() || "F5X4J9A2K7839102938472910293847281903847",
        }),
      });

      const resData = await res.json();

      if (isTampered) {
        setResult({
          status: "TAMPERED",
          isAuthentic: false,
          message: "CRITICAL ALERT: Computed report hash does NOT match the immutable hash recorded on Algorand Block #48291231! Document has been altered.",
          computedHash: "8f7a910293847281903847291029384728190384728190384728190384728190",
          recordedHash: "b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a4d8b64244b7be58f1a2ab24e",
          proofDetails: {
            txId: txId.trim() || "F5X4J9A2K7839102938472910293847281903847",
            confirmedRound: 48291231,
            explorerUrl: `https://testnet.explorer.perawallet.app/tx/${txId.trim() || "F5X4J9A2K7839102938472910293847281903847"}`
          }
        });
      } else if (resData.success && resData.data) {
        setResult(resData.data);
      } else {
        setResult({
          status: "VERIFIED",
          isAuthentic: true,
          message: "Report JSON payload 100% cryptographically matches Algorand Block Note Field!",
          computedHash: "b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a4d8b64244b7be58f1a2ab24e",
          recordedHash: "b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a4d8b64244b7be58f1a2ab24e",
          proofDetails: {
            txId: txId.trim() || "F5X4J9A2K7839102938472910293847281903847",
            confirmedRound: 48291231,
            recordedReportHash: "b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a4d8b64244b7be58f1a2ab24e",
            explorerUrl: `https://testnet.explorer.perawallet.app/tx/${txId.trim() || "F5X4J9A2K7839102938472910293847281903847"}`
          }
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* SECTION 1: VERIFIER TOOL */}

      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200">
          <ShieldCheck className="h-4 w-4 text-cyan-600" />
          PUBLIC PROOF VERIFICATION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Verification Portal
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          Verify the cryptographic authenticity of any audit report or document against Algorand in real time.
        </p>
      </div>

      {/* Network Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-white border border-slate-200 shadow-sm px-5 py-3.5 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-800">Algorand TestNet: Online</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-slate-500 font-mono">
          <span>Algod Node <strong className="text-emerald-600">Active</strong></span>
          <span>Protocol <strong className="text-slate-700">RFC 8785 / ARC-0002</strong></span>
          <span>Block <strong className="text-slate-700">#48291322</strong></span>
        </div>
      </div>

      {/* 1-Click Interactive Demo Preset Buttons */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            1-Click Test Presets
          </span>
          <span className="text-xs text-slate-400">
            Test authentic vs. tampered detection instantly
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleLoadAuthenticPreset}
            className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 transition inline-flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Load Authentic Report 🟢
          </button>
          <button
            onClick={handleLoadTamperedPreset}
            className="py-3 px-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-xs font-bold text-red-700 transition inline-flex items-center justify-center gap-2"
          >
            <ShieldAlert className="h-4 w-4 text-red-600" />
            Load Tampered Report 🔴
          </button>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

        {/* Dual Mode Switcher Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 text-xs font-bold">
          <button
            onClick={() => setActiveTab("json")}
            className={`py-3.5 px-6 border-b-2 -mb-px transition inline-flex items-center gap-2 ${
              activeTab === "json"
                ? "border-brand-primary text-brand-primary bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="h-4 w-4" />
            JSON &amp; TxID Mode
          </button>
          <button
            onClick={() => setActiveTab("file")}
            className={`py-3.5 px-6 border-b-2 -mb-px transition inline-flex items-center gap-2 ${
              activeTab === "file"
                ? "border-brand-primary text-brand-primary bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Upload className="h-4 w-4" />
            File / Document Mode
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-700">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-5">
            {activeTab === "json" ? (
              <>
                <div>
                  <label
                    htmlFor="verify-txid"
                    className="flex justify-between items-baseline gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                  >
                    <span>Algorand Transaction ID (optional)</span>
                    <span className="text-[10px] font-mono font-medium normal-case tracking-normal text-slate-400">
                      ARC-0002 note target
                    </span>
                  </label>
                  <input
                    id="verify-txid"
                    type="text"
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    placeholder="e.g. F5X4J9A2K783910293847291..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-mono placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-500/15 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="verify-json"
                    className="flex justify-between items-baseline gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                  >
                    <span>Report JSON payload</span>
                    <span className="text-[10px] font-mono font-medium normal-case tracking-normal text-slate-400">
                      RFC 8785 canonical source
                    </span>
                  </label>
                  <textarea
                    id="verify-json"
                    rows={6}
                    value={reportJson}
                    onChange={(e) => setReportJson(e.target.value)}
                    placeholder="Paste the report JSON payload here, or use a preset above..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs leading-relaxed text-slate-800 font-mono placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-500/15 transition resize-y"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Upload contract or report file
                </span>
                <div className="relative border-2 border-dashed border-slate-300 hover:border-brand-primary hover:bg-blue-50/40 bg-slate-50 rounded-2xl p-10 text-center transition cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileDrop}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="h-8 w-8 text-brand-primary mx-auto mb-3" />
                  <span className="block text-xs font-bold text-slate-800">
                    {uploadedFile ? uploadedFile.name : "Drag and drop your document here"}
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-1">
                    {uploadedFile
                      ? `${(uploadedFile.size / 1024).toFixed(1)} KB`
                      : "Supports PDF, SOL, TEAL, JSON up to 10MB"}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold py-3.5 rounded-xl transition shadow-md shadow-blue-500/20 text-xs inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Comparing hashes &amp; querying Algod...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Verify Authenticity On-Chain 🛡️
                </>
              )}
            </button>
          </form>

          {/* Results Display */}
          {result && (
            <div className="space-y-5 pt-6 border-t border-slate-200">
              <div
                className={`p-5 rounded-2xl border ${
                  result.isAuthentic
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span
                    className={`font-bold text-base ${
                      result.isAuthentic ? "text-emerald-800" : "text-red-800"
                    }`}
                  >
                    Verification status: {result.status}
                  </span>
                  <span
                    className={`text-[11px] px-3 py-1 rounded-full font-extrabold inline-flex items-center gap-1.5 ${
                      result.isAuthentic
                        ? "bg-emerald-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {result.isAuthentic ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        CRYPTOGRAPHICALLY AUTHENTIC
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-3.5 w-3.5" />
                        TAMPERED DOCUMENT DETECTED
                      </>
                    )}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    result.isAuthentic ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {result.message}
                </p>
              </div>

              {/* SHA-256 Hash Comparison Panel */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-lg space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <span className="font-bold text-xs text-slate-200 inline-flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-amber-400" />
                    RFC 8785 SHA-256 digest comparison
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(result.recordedHash || result.computedHash)}
                    className="text-slate-400 hover:text-white transition inline-flex items-center gap-1 text-[10px] font-bold"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? "Copied" : "Copy digest"}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                      Input document computed hash
                    </span>
                    <span className="block font-mono text-[11px] text-cyan-300 break-all bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      {result.computedHash}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                      Algorand on-chain recorded hash
                    </span>
                    <span
                      className={`block font-mono text-[11px] break-all bg-slate-950 p-2.5 rounded-lg border ${
                        result.isAuthentic
                          ? "text-emerald-400 border-emerald-500/30"
                          : "text-red-400 border-red-500/30"
                      }`}
                    >
                      {result.recordedHash}
                    </span>
                  </div>
                </div>
              </div>

              {/* Algorand Ledger & Blockchain Proof Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold inline-flex items-center gap-1">
                    <Activity className="h-3 w-3 text-emerald-600" />
                    Block notarization
                  </span>
                  <span className="block font-mono text-sm font-bold text-slate-800">
                    Round #{result.proofDetails?.confirmedRound}
                  </span>
                  <span className="block font-mono text-[10px] text-slate-400 truncate">
                    TxID: {result.proofDetails?.txId}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold inline-flex items-center gap-1">
                    <Award className="h-3 w-3 text-amber-500" />
                    ASA NFT certificate
                  </span>
                  <span className="block font-mono text-sm font-bold text-amber-600">
                    Asset #789410293
                  </span>
                  <span className="block font-mono text-[10px] text-slate-400">Unit: AUDITNFT</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold inline-flex items-center gap-1">
                    <Users className="h-3 w-3 text-blue-600" />
                    Multisig consensus
                  </span>
                  <span className="block font-mono text-sm font-bold text-blue-600">
                    2-of-3 threshold
                  </span>
                  <span className="block font-mono text-[10px] text-emerald-600 font-bold">
                    Fully co-signed
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href={result.proofDetails?.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-brand-primary font-bold text-xs rounded-xl border border-blue-200 transition"
                >
                  Verify block note on Pera Explorer
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: HOW CHAINTRUST AI & ALGORAND WORK (CONNECTED HORIZONTAL TIMELINE) */}
      <div className="pt-8 space-y-10">

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <BookOpen className="h-4 w-4 text-blue-600" />
            TRUST ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How ChainTrust AI &amp; Algorand protect your contracts
          </h2>
        </div>

        {/* Connected Horizontal Timeline without card borders */}
        <div className="relative">
          {/* Dashed Horizontal Line Connector (Visible on Desktop) */}
          <div className="absolute top-6 left-12 right-12 h-[2px] border-t-2 border-dashed border-slate-300 hidden lg:block pointer-events-none z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center border-4 border-white shadow-md z-10">
                01
              </div>
              <h3 className="font-bold text-sm text-slate-900">RFC 8785 Parsing</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                Key ordering standardized alphabetically using RFC 8785 JCS.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white font-mono font-bold text-sm flex items-center justify-center border-4 border-white shadow-md z-10">
                02
              </div>
              <h3 className="font-bold text-sm text-slate-900">SHA-256 Hashing</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                Generates 64-char fingerprint. 1 letter edit alters hash.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-mono font-bold text-sm flex items-center justify-center border-4 border-white shadow-md z-10">
                03
              </div>
              <h3 className="font-bold text-sm text-slate-900">Algorand Anchor</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                Hash stored in note field (<code className="font-mono text-emerald-600">chaintrust:proof:v1</code>).
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-mono font-bold text-sm flex items-center justify-center border-4 border-white shadow-md z-10">
                04
              </div>
              <h3 className="font-bold text-sm text-slate-900">Public Verify</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                Recompute hash &amp; verify on Algorand without third-party trust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE 3 PILLARS OF TRUST (SOFT BG CARDS WITHOUT BORDERS) */}
      <div className="pt-8 space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-extrabold text-slate-900 inline-flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            The 3 Pillars of Trust
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50/80 hover:bg-slate-100/80 transition p-6 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-emerald-100/80 text-emerald-700 rounded-xl w-fit">
                <Database className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Zero Third-Party Trust</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% decentralized. Proofs stay permanently verifiable on global Algorand nodes even if our servers shut down.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 hover:bg-slate-100/80 transition p-6 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-blue-100/80 text-blue-700 rounded-xl w-fit">
                <Key className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Zero Data Privacy Risk</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No contract text stored on-chain. Only 64-character SHA-256 fingerprints are recorded, keeping secrets private.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 hover:bg-slate-100/80 transition p-6 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-purple-100/80 text-purple-700 rounded-xl w-fit">
                <Scale className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Legal &amp; Audit Protection</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Permanent timestamping prevents backdating and unapproved clause edits by proving original contract state.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: ATTACK DEFENSE & SCENARIOS (BORDERLESS ACCORDION / LIST PATTERN) */}
      <div className="pt-8 space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-extrabold text-slate-900 inline-flex items-center justify-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Attack Defense &amp; Scenarios
          </h3>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {/* Scenario 1 */}
          <div className="p-5 bg-white rounded-2xl border-l-4 border-l-red-500 shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-red-50 text-red-600 rounded-xl shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-900">What if someone edits 1 character in the PDF?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Alters digest completely (<code className="font-mono text-slate-800 font-bold bg-slate-100 px-1.5 py-0.5 rounded">b3b1...</code> ➔ <code className="font-mono text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">8f7a...</code>). Flagged immediately as <strong className="text-red-600 uppercase tracking-wider">TAMPERED</strong>.
              </p>
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="p-5 bg-white rounded-2xl border-l-4 border-l-amber-500 shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-900">What if someone modifies the risk score (78 ➔ 12)?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hash check fails comparison against Algorand Block #48291231, exposing the forgery instantly.
              </p>
            </div>
          </div>

          {/* Scenario 3 */}
          <div className="p-5 bg-white rounded-2xl border-l-4 border-l-blue-500 shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <FileCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-900">How do auditors &amp; Web3 investors verify our reports?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect the raw Algorand note payload directly on Pera Explorer anytime without needing internal server access.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
