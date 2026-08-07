import React from 'react';
import { ShieldAlert, ListChecks, CheckCircle2 } from 'lucide-react';

interface ActionItemsProps {
  keyFindings: string[];
  actionItems: string[];
}

export const ActionItems: React.FC<ActionItemsProps> = ({ keyFindings, actionItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Key Findings */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
          <div className="p-1.5 bg-red-50 text-brand-danger rounded-lg">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Critical Findings
          </h3>
        </div>
        <ul className="space-y-3.5">
          {keyFindings.map((finding, index) => (
            <li key={`finding-${index}`} className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-danger shrink-0 mt-2" />
              <span className="text-xs text-slate-600 leading-relaxed">{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Action Items */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
          <div className="p-1.5 bg-blue-50 text-brand-primary rounded-lg">
            <ListChecks className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Negotiation Playbook
          </h3>
        </div>
        <ul className="space-y-3.5">
          {actionItems.map((item, index) => (
            <li key={`action-${index}`} className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
              <span className="text-xs text-slate-600 leading-relaxed font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
