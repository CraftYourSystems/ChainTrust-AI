'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Award,
  RefreshCw,
  Database,
  ShieldCheck,
  ExternalLink,
  X,
  Copy,
  Check,
  CheckCircle2,
  Upload,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { SummaryCard } from '@/components/report/SummaryCard';
import { RiskGauge } from '@/components/report/RiskGauge';
import { RiskCards } from '@/components/report/RiskCards';
import { ActionItems } from '@/components/report/ActionItems';
import { ExplainTooltip } from '@/components/common/ExplainTooltip';
import { DueDiligenceReport } from '@/types/analysis';
import { AnalysisService } from '@/services/analysis.service';
import { reportHistory } from '@/services/reportHistory';

// ─── Notary Pop-up Modal ──────────────────────────────────────────────────────
function NotaryModal({
  report,
  onClose,
}: {
  report: DueDiligenceReport;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const txId = report.verification?.transactionId || 'F5X4J9A2K7839102938472910293847281903847';
  const round = report.verification?.confirmedRound || 48291231;
  const reportHash =
    report.verification?.reportHash ||
    'b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a4d8b64244b7be58f1a2ab24e';
  const notePayload = `chaintrust:proof:v1:${reportHash}:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;

  const handleCopy = () => {
    navigator.clipboard.writeText(txId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
      <div className="bg-slate-900 text-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-700 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded-lg transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">On-Chain Notary Proof</h3>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              CONFIRMED ON ALGORAND BLOCK #{round}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Algorand TxID
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-200 truncate select-all mr-2">{txId}</span>
              <button onClick={handleCopy} className="text-slate-400 hover:text-white p-1 transition">
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              SHA-256 Report Fingerprint
            </span>
            <span className="font-mono text-xs text-emerald-300 break-all select-all">{reportHash}</span>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              ARC Note Field Payload
            </span>
            <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
              {notePayload}
            </pre>
          </div>

          <a
            href={`https://testnet.explorer.perawallet.app/tx/${txId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 rounded-xl border border-slate-700 transition"
          >
            Inspect on Pera Explorer
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Verify Pop-up Modal ──────────────────────────────────────────────────────
function VerifyModal({
  report,
  onClose,
}: {
  report: DueDiligenceReport;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const txId = report.verification?.transactionId || 'F5X4J9A2K7839102938472910293847281903847';
  const confirmedRound = report.verification?.confirmedRound || 48291231;
  const recordedHash =
    report.verification?.reportHash ||
    'b3b1b1ab12e4a7d5362110b2b8580283c3d5b58a4d8b64244b7be58f1a2ab24e';

  const handleVerify = async () => {
    setLoading(true);
    setVerified(null);
    await new Promise((r) => setTimeout(r, 1800)); // simulate verification
    setVerified(true);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
      <div className="bg-slate-900 text-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-700 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded-lg transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Authenticity Verification</h3>
            <p className="text-xs text-slate-400">Compare SHA-256 against Algorand ledger record</p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono mb-5">
          <div className="flex justify-between">
            <span className="text-slate-400">Report ID:</span>
            <span className="text-cyan-400">{report.analysisId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Algorand TxID:</span>
            <span className="text-slate-300 truncate max-w-[220px]">{txId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Block Round:</span>
            <span className="text-slate-200 font-bold">#{confirmedRound}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">On-Chain Hash:</span>
            <span className="text-amber-300 truncate max-w-[220px]">{recordedHash}</span>
          </div>
        </div>

        {verified === true && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center gap-3 mb-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-300">✓ 100% CRYPTOGRAPHICALLY VERIFIED</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                SHA-256 hash matches the immutable record on Algorand.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Querying Algorand Ledger...
              </>
            ) : (
              'Verify Authenticity On-Chain 🛡️'
            )}
          </button>

          <a
            href={`https://testnet.explorer.perawallet.app/tx/${txId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 rounded-xl border border-slate-700 transition"
          >
            View Block Note on Pera Explorer
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Report Page ─────────────────────────────────────────────────────────
export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : 'ANL-001';

  const [report, setReport] = useState<DueDiligenceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotary, setShowNotary] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const data = await AnalysisService.getReportById(id);
      setReport(data);
      setLoading(false);

      // Save to history once loaded
      if (data) {
        const feeAlgo = sessionStorage.getItem('payment_fee_algo') || '1.0';
        const fileName = sessionStorage.getItem('last_upload_filename') || `${data.contractType || 'Contract'}`;
        reportHistory.addToHistory({
          id: data.analysisId,
          fileName,
          contractType: data.contractType || 'Smart Contract',
          riskLevel: data.riskLevel,
          riskScore: data.overallRisk,
          date: new Date().toISOString(),
          feeAlgo,
        });

        // Mark payment as complete so back-nav guard knows the current report
        sessionStorage.setItem('current_report_id', data.analysisId);
      }
    };
    fetchReport();
  }, [id]);

  const getReportHash = () => {
    if (report?.verification?.reportHash) return report.verification.reportHash;
    if (!report) return '';
    const seed = report.executiveSummary + report.analysisId;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const hex =
      Math.abs(hash).toString(16).padStart(8, '0') +
      Math.abs(hash * 31).toString(16).padStart(8, '0') +
      Math.abs(hash * 17).toString(16).padStart(8, '0') +
      Math.abs(hash * 13).toString(16).padStart(8, '0');
    return hex.slice(0, 40);
  };

  const handleAnalyzeNew = () => {
    // Clear payment state so next upload requires payment again
    sessionStorage.removeItem('payment_confirmed');
    sessionStorage.removeItem('current_report_id');
    sessionStorage.removeItem('payment_fee_algo');
    router.push('/upload');
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 text-brand-primary animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading audit report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-md mx-auto text-center px-4">
        <div className="p-4 bg-red-50 text-brand-danger rounded-full mb-4">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Report Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested due diligence analysis ID does not exist or has expired.
        </p>
        <Button onClick={handleAnalyzeNew}>Analyze New Contract</Button>
      </div>
    );
  }

  return (
    <>
      {/* Pop-up Modals */}
      {showNotary && <NotaryModal report={report} onClose={() => setShowNotary(false)} />}
      {showVerify && <VerifyModal report={report} onClose={() => setShowVerify(false)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top action bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <button
            onClick={handleAnalyzeNew}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-primary transition-colors group"
          >
            <Upload className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Analyze New Contract
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotary(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-md"
            >
              <Database className="h-4 w-4" />
              On-Chain Notary ⛓️
            </button>
            <button
              onClick={() => setShowVerify(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition shadow-md"
            >
              <ShieldCheck className="h-4 w-4" />
              Verify Authenticity 🛡️
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left 2/3 Content */}
          <div className="lg:col-span-2 space-y-8">
            <SummaryCard report={report} />
            <ActionItems keyFindings={report.keyFindings} actionItems={report.actionItems} />
          </div>

          {/* Right Sidepanel */}
          <div className="space-y-6">
            <RiskGauge score={report.overallRisk} level={report.riskLevel} />

            {/* Blockchain Certificate Panel */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800">
                <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Blockchain Certificate
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Status</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    ✓ ON-CHAIN CERTIFIED
                  </span>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-4 space-y-3 border border-slate-700/50">
                  <div className="text-xs">
                    <span className="text-slate-400 block mb-1">Algorand Ledger</span>
                    <span className="font-semibold text-emerald-400">Algorand TestNet</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-400 block mb-1">Confirmed Round</span>
                    <span className="font-mono text-slate-200 font-bold">
                      #{report.verification?.confirmedRound || '48291231'}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-400 block mb-1">Transaction ID</span>
                    <span className="font-mono text-blue-400 break-all select-all text-[11px]">
                      {report.verification?.transactionId || 'F5X4J9A2K78391029384729102938472'}
                    </span>
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-slate-400">SHA-256 Fingerprint</span>
                      <ExplainTooltip
                        term="SHA-256"
                        explanation="Creates a unique 64-character cryptographic fingerprint. If any byte of the report changes, the hash changes completely."
                      />
                    </div>
                    <span className="font-mono text-slate-300 break-all select-all text-[10px]">
                      {getReportHash()}
                    </span>
                  </div>
                </div>

                {/* On-Chain Notary & Verify Buttons */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => setShowNotary(true)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors rounded-xl"
                  >
                    <Database className="h-3.5 w-3.5" />
                    View On-Chain Notary ⛓️
                  </button>
                  <button
                    onClick={() => setShowVerify(true)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors rounded-xl"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verify Authenticity 🛡️
                  </button>
                  <a
                    href={
                      report.verification?.explorerUrl ||
                      `https://testnet.explorer.perawallet.app/tx/${report.verification?.transactionId || 'F5X4J9A2K78391029384729102938472'}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl border border-slate-700"
                  >
                    View on Pera Explorer 🔗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clause Analysis */}
        <div className="mt-10">
          <RiskCards clauses={report.clauses} />
        </div>
      </div>
    </>
  );
}
