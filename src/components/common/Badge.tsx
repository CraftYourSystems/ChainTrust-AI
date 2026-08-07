import React from 'react';
import { RiskLevel } from '../../types/analysis';

interface BadgeProps {
  level: RiskLevel | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ level, className = '' }) => {
  const getStyles = () => {
    switch (level) {
      case 'High':
        return 'bg-red-50 text-brand-danger border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-brand-warning border-amber-200';
      case 'Low':
        return 'bg-green-50 text-brand-success border-green-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStyles()} ${className}`}
    >
      {level}
    </span>
  );
};
