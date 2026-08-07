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
import { MockAnalysisService } from '@/services/mockAnalysis.service';
import { DueDiligenceReport } from '@/types/analysis';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : 'ANL-001';

  const [report, setReport] = useState<DueDiligenceReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const data = await MockAnalysisService.getReportById(id);
      setReport(data);
      setLoading(false);
    };

    fetchReport();
  }, [id]);


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

          {/* Verification / Security panel */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <div className="p-1.5 bg-blue-50 text-brand-primary rounded-lg">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Blockchain Certificate
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Status</span>
                <span className="inline-flex items-center gap-1 font-bold text-brand-warning bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-warning animate-pulse" />
                  Notarization Pending
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-4.5 space-y-3">
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1">Ledger Target</span>
                  <span className="font-semibold text-slate-700">Algorand TestNet</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1">Payment Endpoint</span>
                  <span className="font-mono text-slate-700">HTTP 402 Pay-Gated</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1">Report Hash</span>
                  <span className="font-mono text-slate-700 break-all select-all">
                    f83a216c5d98e72c842b083c26d83a1b02cf8c3f
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed text-center">
                In Phase 2, this section will host your wallet credentials, transaction receipt, and the live explorer link.
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
