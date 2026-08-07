import React from 'react';
import { ClauseAnalysis } from '../../types/analysis';
import { Badge } from '../common/Badge';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface RiskCardsProps {
  clauses: ClauseAnalysis[];
}

export const RiskCards: React.FC<RiskCardsProps> = ({ clauses }) => {
  const getBorderColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'border-l-4 border-l-brand-danger';
      case 'Medium':
        return 'border-l-4 border-l-brand-warning';
      case 'Low':
        return 'border-l-4 border-l-brand-success';
      default:
        return 'border-l-4 border-l-slate-300';
    }
  };

  const getIcon = (risk: string) => {
    switch (risk) {
      case 'High':
        return <AlertCircle className="h-5 w-5 text-brand-danger shrink-0 mt-0.5" />;
      case 'Medium':
        return <AlertTriangle className="h-5 w-5 text-brand-warning shrink-0 mt-0.5" />;
      case 'Low':
        return <CheckCircle className="h-5 w-5 text-brand-success shrink-0 mt-0.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
        Analyzed Clauses & Risks
      </h3>
      <div className="space-y-4">
        {clauses.map((clause, index) => (
          <div
            key={`${clause.title}-${index}`}
            className={`bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md ${getBorderColor(
              clause.risk
            )}`}
          >
            <div className="p-5">
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex items-start gap-2.5">
                  {getIcon(clause.risk)}
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {clause.title}
                  </h4>
                </div>
                <Badge level={clause.risk} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-50">
                <div>
                  <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Risk Assessment
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {clause.reason}
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-brand-primary uppercase tracking-wider mb-1">
                    Safer Alternative / Action Item
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {clause.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
