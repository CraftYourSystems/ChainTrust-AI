"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Upload, CreditCard, Award, CheckCircle2, ChevronRight } from "lucide-react";

export const PipelineProgressTracker: React.FC = () => {
  const pathname = usePathname();

  const steps = [
    { name: "1. Upload", key: "upload", icon: Upload },
    { name: "2. Payment", key: "payment", icon: CreditCard },
    { name: "3. Certificate", key: "report", icon: Award },
  ];

  const getCurrentStepIndex = (): number => {
    if (pathname.includes("upload")) return 0;
    if (pathname.includes("payment") || pathname.includes("loading")) return 1;
    // Only the actual report page (not demo pages like /nft-badge, /notary, /verify, /ai-ingestion)
    if (pathname.startsWith("/report/")) return 2;
    return -1;
  };

  const currentIndex = getCurrentStepIndex();
  if (currentIndex === -1) return null; // Hide on home page / other pages

  const progressPercentage = Math.round(((currentIndex + 1) / steps.length) * 100);

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-16 z-40 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Step Progress Pills — non-clickable read-only indicators */}
        <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isFuture = idx > currentIndex;

            return (
              <React.Fragment key={step.key}>
                {/* Non-clickable div — prevents jumping back and forth */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 select-none ${
                    isCurrent
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105"
                      : isCompleted
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-400 opacity-50"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                  <span>{step.name}</span>
                </div>
                {idx < steps.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full sm:w-48">
          <span className="text-[11px] font-mono font-bold text-slate-600 shrink-0">
            Step {currentIndex + 1}/3 ({progressPercentage}%)
          </span>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
