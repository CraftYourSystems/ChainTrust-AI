'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProgressIndicator } from '@/components/loading/ProgressIndicator';
import { StepsList } from '@/components/loading/StepsList';
import { DueDiligenceReport, ProgressStep } from '@/types/analysis';
import { AnalysisService } from '@/services/analysis.service';
import { getUploadedFile } from '@/services/fileStore';
import { BrainCircuit, Shield, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common/Button';

import { X402PaymentGateModal } from '@/components/payment/X402PaymentGateModal';

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileName = searchParams.get('fileName') || 'contract.pdf';
  
  const [showPaymentGate, setShowPaymentGate] = useState(true);
  const [paymentPaid, setPaymentPaid] = useState(false);

  const [percentage, setPercentage] = useState(0);
  const [currentStep, setCurrentStep] = useState('x402 Payment Pending...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentPaid) return; // Wait for x402 payment confirmation first!

    let active = true;

    const runAnalysis = async () => {
      setError(null);
      try {
        const uploadedFile = getUploadedFile();
        let report: DueDiligenceReport;

        if (uploadedFile) {
          // Real backend API analysis
          report = await AnalysisService.analyzeContract(
            uploadedFile,
            (step: ProgressStep) => {
              if (active) {
                setPercentage(step.percentage);
                setCurrentStep(step.message);
              }
            }
          );
        } else {
          throw new Error('No uploaded contract file found in session. Please go back to the upload page and select a file.');
        }

        if (active) {
          // Store report ID so payment guard knows where to redirect
          sessionStorage.setItem('current_report_id', report.analysisId);
          router.push(`/report/${report.analysisId}`);
        }
      } catch (err: any) {
        if (active) {
          console.error('Analysis execution error:', err);
          setError(err?.message || 'Failed to complete contract analysis. Please try again.');
        }
      }
    };

    runAnalysis();

    return () => {
      active = false;
    };
  }, [fileName, router, paymentPaid]);

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-md mx-auto text-center px-4">
        <div className="p-4 bg-red-50 text-brand-danger rounded-full mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Analysis Failed</h2>
        <p className="text-sm text-slate-600 mb-6 bg-red-50/50 p-4 rounded-xl border border-red-100 leading-relaxed text-left">
          {error}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button variant="outline" onClick={() => router.push('/upload')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Upload New File
          </Button>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Analysis
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {showPaymentGate && (
        <X402PaymentGateModal
          fileName={fileName}
          onPaymentSuccess={() => {
            setShowPaymentGate(false);
            setPaymentPaid(true);
          }}
        />
      )}

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
          Please wait while our backend engine processes document text and identifies legal risk factors.
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
