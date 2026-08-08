"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadBox } from "@/components/upload/UploadBox";
import { ArrowLeft, Shield, FileCheck, Clock, Zap, AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { setUploadedFile } from "@/services/fileStore";

export default function UploadPage() {
  const router = useRouter();
  const [parsing, setParsing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  const handleUpload = (file: File) => {
    setErrorMsg(null);

    // 1. File Size Validation (Max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File exceeds 10MB limit. Please upload a smaller contract document.");
      return;
    }

    // 2. File Extension Validation (.sol, .teal, .pdf, .docx, .txt)
    const validExts = [".sol", ".teal", ".pdf", ".docx", ".txt"];
    const hasValidExt = validExts.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExt) {
      setErrorMsg("Unsupported file format. Please upload a .sol, .teal, .pdf, or .docx contract file.");
      return;
    }

    // Clear any previous payment/report state so each upload forces re-payment
    sessionStorage.removeItem("payment_confirmed");
    sessionStorage.removeItem("current_report_id");
    sessionStorage.removeItem("payment_fee_algo");

    // Persist filename for report history
    sessionStorage.setItem("last_upload_filename", file.name);

    // Store File in module-level store
    setUploadedFile(file);
    setUploadedFileName(file.name);
    setParsing(true);


    // Auto-advance countdown
    let timer = 3;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (timer === 0) {
        clearInterval(interval);
        router.push(`/payment?fileName=${encodeURIComponent(file.name)}`);
      }
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </Link>

        {/* Title */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-blue-50 text-brand-primary rounded-2xl mb-4 shadow-sm">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Step 1: Upload Contract Document
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Upload your Solidity (`.sol`), PyTeal (`.teal`), or Legal Agreement PDF (`.pdf`). Files are validated and hashed locally.
          </p>
        </div>

        {/* Error Recovery Box */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-red-800 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="px-3 py-1 bg-red-100 hover:bg-red-200 font-bold rounded-lg transition shrink-0"
            >
              Choose Another File
            </button>
          </div>
        )}

        {/* Upload Box or Parsing Banner */}
        {!parsing ? (
          <UploadBox onUpload={handleUpload} />
        ) : (
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/30">
              <FileCheck className="h-8 w-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold block">
                ✓ CONTRACT PARSED SUCCESSFULLY
              </span>
              <h3 className="text-xl font-bold text-white font-mono">{uploadedFileName}</h3>
              <p className="text-xs text-slate-400">Client-Side SHA-256 Hash Generated</p>
            </div>

            {/* Progress Bar & Auto-Redirect */}
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Auto-Advancing to Step 2 Payment...</span>
                <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 animate-spin" /> {countdown}s
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-amber-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => router.push(`/payment?fileName=${encodeURIComponent(uploadedFileName || '')}`)}
              className="w-full py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Proceed to x402 Pay-Gate Immediately ➔
            </button>
          </div>
        )}

        {/* Trust disclaimer */}
        <div className="text-center">
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Your document data is encrypted in transit and never stored on-chain. Only cryptographic hashes are recorded.
          </p>
        </div>
      </div>
    </div>
  );
}
