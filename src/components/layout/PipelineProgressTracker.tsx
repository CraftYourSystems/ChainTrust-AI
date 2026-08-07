"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Upload, 
  CreditCard, 
  BrainCircuit, 
  Link2, 
  ShieldCheck, 
  Award, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export const PipelineProgressTracker: React.FC = () => {
  const pathname = usePathname();

  const steps = [
    { name: "1. Upload", href: "/upload", key: "upload", icon: Upload },
    { name: "2. Payment", href: "/payment", key: "payment", icon: CreditCard },
    { name: "3. AI Audit", href: "/ai-ingestion", key: "ai-ingestion", icon: BrainCircuit },
    { name: "4. Notary", href: "/notary", key: "notary", icon: Link2 },
    { name: "5. Verify", href: "/verify", key: "verify", icon: ShieldCheck },
    { name: "6. Certificate", href: "/nft-badge", key: "nft-badge", icon: Award },
  ];

  const getCurrentStepIndex = () => {
    if (pathname.includes("upload")) return 0;
    if (pathname.includes("payment")) return 1;
    if (pathname.includes("ai-ingestion")) return 2;
    if (pathname.includes("notary")) return 3;
    if (pathname.includes("verify")) return 4;
    if (pathname.includes("nft-badge") || pathname.includes("report") || pathname.includes("remediation") || pathname.includes("final-report")) return 5;
    return -1;
  };

  const currentIndex = getCurrentStepIndex();
  if (currentIndex === -1) return null; // Only show on workflow pages

  const progressPercentage = Math.round(((currentIndex + 1) / steps.length) * 100);

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-16 z-40 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Step Progress Pills */}
        <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <React.Fragment key={step.key}>
                <Link
                  href={step.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isCurrent
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105"
                      : isCompleted
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                  <span>{step.name}</span>
                </Link>
                {idx < steps.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Global Progress Percentage Bar */}
        <div className="flex items-center gap-3 w-full sm:w-48">
          <span className="text-[11px] font-mono font-bold text-slate-600 shrink-0">
            Step {currentIndex + 1}/6 ({progressPercentage}%)
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
