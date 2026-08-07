import React from 'react';
import { RiskLevel } from '../../types/analysis';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, level }) => {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColorClass = () => {
    switch (level) {
      case 'High':
        return 'text-brand-danger';
      case 'Medium':
        return 'text-brand-warning';
      case 'Low':
        return 'text-brand-success';
      default:
        return 'text-slate-400';
    }
  };

  const getBgColorClass = () => {
    switch (level) {
      case 'High':
        return 'stroke-red-100';
      case 'Medium':
        return 'stroke-amber-100';
      case 'Low':
        return 'stroke-green-100';
      default:
        return 'stroke-slate-100';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            className={getBgColorClass()}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            className={`transition-all duration-1000 ease-out stroke-current ${getColorClass()}`}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        
        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-slate-900 leading-none">
            {score}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Risk Score
          </span>
        </div>
      </div>

      <div className="text-center mt-4">
        <span className={`text-sm font-bold uppercase tracking-widest ${getColorClass()}`}>
          {level} RISK
        </span>
      </div>
    </div>
  );
};
