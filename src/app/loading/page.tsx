'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProgressIndicator } from '@/components/loading/ProgressIndicator';
import { StepsList } from '@/components/loading/StepsList';
import { MockAnalysisService, ProgressStep } from '@/services/mockAnalysis.service';
import { ShieldAlert, BrainCircuit, Shield } from 'lucide-react';

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileName = searchParams.get('fileName') || 'contract.pdf';
  
  const [percentage, setPercentage] = useState(0);
  const [currentStep, setCurrentStep] = useState('Uploading Contract...');

  useEffect(() => {
    let active = true;

    const runAnalysis = async () => {
      try {
        const report = await MockAnalysisService.analyzeContract(
          fileName,
          (step: ProgressStep) => {
            if (active) {
              setPercentage(step.percentage);
              setCurrentStep(step.message);
            }
          }
        );

        if (active) {
          // Push to the resulting report page
          router.push(`/report/${report.analysisId}`);
        }
      } catch (err) {
        console.error('Analysis failed:', err);
      }
    };

    runAnalysis();

    return () => {
      active = false;
    };
  }, [fileName, router]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Animated brain/shield icon */}
        <div className="inline-flex relative mb-8">
          <div className="p-5 bg-blue-50 text-brand-primary rounded-3xl animate-pulse-ring">
            <BrainCircuit className="h-10 w-10" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-1.5 bg-brand-primary text-white rounded-xl shadow-md">
            <Shield className="h-4 w-4" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Analyzing Contract
        </h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
          Please wait while we run our automated due diligence audit. This will take a few seconds.
        </p>

        {/* Progress bar */}
        <ProgressIndicator percentage={percentage} />

        {/* Action item descriptions */}
        <div className="text-sm font-semibold text-brand-primary h-6 mb-8 animate-pulse">
          {currentStep}
        </div>

        {/* Dynamic steps list checklist */}
        <StepsList currentPercentage={percentage} />
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="inline-flex p-5 bg-blue-50 text-brand-primary rounded-3xl mb-8 animate-pulse">
          <BrainCircuit className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Loading Ingestion Pipeline
        </h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-8">
          Initializing secure analysis container...
        </p>
      </div>
    </div>
  );
}

export default function LoadingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoadingContent />
    </Suspense>
  );
}
