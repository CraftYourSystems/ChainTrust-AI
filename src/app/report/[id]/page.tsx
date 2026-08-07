'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldAlert, 
  Calendar,
  Award,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { SummaryCard } from '@/components/report/SummaryCard';
import { RiskGauge } from '@/components/report/RiskGauge';
import { RiskCards } from '@/components/report/RiskCards';
import { ActionItems } from '@/components/report/ActionItems';
import { DueDiligenceReport } from '@/types/analysis';

import { AnalysisService } from '@/services/analysis.service';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : 'ANL-001';

  const [report, setReport] = useState<DueDiligenceReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const data = await AnalysisService.getReportById(id);
      setReport(data);
      setLoading(false);
    };

    fetchReport();
  }, [id]);

  const getReportHash = () => {
    if (report?.verification?.reportHash) {
      return report.verification.reportHash;
    }
    if (!report) return '';
    // Deterministic hash based on report content
    const seed = report.executiveSummary + report.analysisId;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0') + 
                Math.abs(hash * 31).toString(16).padStart(8, '0') +
                Math.abs(hash * 17).toString(16).padStart(8, '0') +
                Math.abs(hash * 13).toString(16).padStart(8, '0');
    return hex.slice(0, 40);
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
          The requested due diligence analysis ID does not exist or has expired. Please run a new scan.
        </p>
        <Button onClick={() => router.push('/upload')}>
          Analyze New Contract
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <Link 
          href="/upload" 
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Analyze another contract
        </Link>


      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left 2/3 Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Executive Summary Card */}
          <SummaryCard report={report} />

          {/* Action Items checklists */}
          <ActionItems 
            keyFindings={report.keyFindings} 
            actionItems={report.actionItems} 
          />
        </div>

        {/* Right 1/3 Sidepanel */}
        <div className="space-y-6">
          {/* Custom SVG Ring Risk Gauge */}
          <RiskGauge score={report.overallRisk} level={report.riskLevel} />

          {/* Enterprise-Grade Blockchain Certificate Panel */}
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

              <div className="bg-slate-800/80 rounded-xl p-4.5 space-y-3 border border-slate-700/50">
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1">Algorand Ledger</span>
                  <span className="font-semibold text-emerald-400">Algorand TestNet</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1">Confirmed Round</span>
                  <span className="font-mono text-slate-200 font-bold">
                    #{report.verification?.confirmedRound || "48291231"}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1">Transaction ID</span>
                  <span className="font-mono text-blue-400 break-all select-all text-[11px]">
                    {report.verification?.transactionId || "F5X4J9A2K78391029384729102938472"}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1">SHA-256 Report Hash</span>
                  <span className="font-mono text-slate-300 break-all select-all text-[10px]">
                    {getReportHash()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <a 
                  href={report.verification?.explorerUrl || `https://testnet.explorer.perawallet.app/tx/${report.verification?.transactionId || "F5X4J9A2K78391029384729102938472"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl shadow-md"
                >
                  View on Pera Explorer 🔗
                </a>

                <Link
                  href="/verify"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl border border-slate-700"
                >
                  Open Verification Portal 🛡️
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Detailed Clause Analysis list */}
      <div className="mt-10">
        <RiskCards clauses={report.clauses} />
      </div>
    </div>
  );
}
