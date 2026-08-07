import React from 'react';
import { Badge } from '../common/Badge';
import { ShieldCheck, FileText, Calendar } from 'lucide-react';
import { DueDiligenceReport } from '../../types/analysis';

interface SummaryCardProps {
  report: DueDiligenceReport;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ report }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-brand-primary rounded-xl">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Contract Due Diligence Report</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ID: {report.analysisId}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Risk Assessment:</span>
          <Badge level={report.riskLevel} />
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Executive Summary</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {report.executiveSummary}
        </p>
      </div>
    </div>
  );
};
