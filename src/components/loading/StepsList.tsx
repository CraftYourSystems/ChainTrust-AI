import React from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';
import { LOADING_STEPS, ProgressStep } from '../../services/mockAnalysis.service';

interface StepsListProps {
  currentPercentage: number;
}

export const StepsList: React.FC<StepsListProps> = ({ currentPercentage }) => {
  const getStepStatus = (stepPercentage: number, prevStepPercentage: number) => {
    if (currentPercentage >= stepPercentage) {
      return 'completed';
    }
    if (currentPercentage > prevStepPercentage && currentPercentage < stepPercentage) {
      return 'active';
    }
    return 'pending';
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
      <div className="space-y-4">
        {LOADING_STEPS.filter(step => step.percentage < 100).map((step, index) => {
          const prevStepPercentage = index === 0 ? 0 : LOADING_STEPS[index - 1].percentage;
          const status = getStepStatus(step.percentage, prevStepPercentage);

          return (
            <div 
              key={step.message} 
              className={`flex items-center gap-4 transition-all duration-300 ${
                status === 'pending' ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div className="shrink-0">
                {status === 'completed' && (
                  <CheckCircle2 className="h-5 w-5 text-brand-success" />
                )}
                {status === 'active' && (
                  <Loader2 className="h-5 w-5 text-brand-primary animate-spin" />
                )}
                {status === 'pending' && (
                  <Circle className="h-5 w-5 text-slate-300" />
                )}
              </div>
              <span className={`text-sm font-medium ${
                status === 'active' ? 'text-slate-900 font-semibold' : 'text-slate-600'
              }`}>
                {step.message}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
