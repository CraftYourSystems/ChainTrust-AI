import React from 'react';

interface ProgressIndicatorProps {
  percentage: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ percentage }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Analysis Status</span>
        <span className="text-2xl font-bold text-brand-primary tracking-tight">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-brand-primary h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
