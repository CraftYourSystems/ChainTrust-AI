'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UploadBox } from '@/components/upload/UploadBox';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

import { setUploadedFile } from '@/services/fileStore';

export default function UploadPage() {
  const router = useRouter();

  const handleUpload = (file: File) => {
    // Store File in memory store
    setUploadedFile(file);
    // Navigate to loading screen with the file name as a query parameter
    router.push(`/loading?fileName=${encodeURIComponent(file.name)}`);
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </Link>

        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-blue-50 text-brand-primary rounded-2xl mb-4">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            New Contract Analysis
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Upload your agreement below. We support PDF and DOCX files. Files are analyzed locally using our secure Phase 1 pipeline.
          </p>
        </div>

        {/* Upload Box */}
        <UploadBox onUpload={handleUpload} />

        {/* Trust disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Your document data is encrypted in transit and never stored on-chain. Only cryptographic hashes are recorded.
          </p>
        </div>
      </div>
    </div>
  );
}
