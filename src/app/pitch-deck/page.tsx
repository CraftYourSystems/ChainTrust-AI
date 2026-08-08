'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Lock,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  ExternalLink,
  Code,
  Globe,
  Terminal,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

interface Slide {
  id: number;
  title: string;
  category: string;
  content: React.ReactNode;
}

export default function PitchDeckPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    // Slide 1: Cover
    {
      id: 1,
      category: 'STARTUP PITCH DECK',
      title: 'ChainTrust AI',
      content: (
        <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
          <div className="inline-flex p-4 bg-blue-500/10 text-blue-400 rounded-3xl border border-blue-500/20 shadow-xl backdrop-blur-md">
            <ShieldCheck className="h-16 w-16 animate-pulse" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
            ChainTrust <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-2xl font-medium text-slate-300">
            Understand. Negotiate. Trust.
          </p>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            The AI-powered contract due diligence platform backed by immutable Algorand SHA-256 state proof verification & x402 payment protocol.
          </p>
          <div className="flex items-center gap-3 pt-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800/80 text-cyan-400 border border-cyan-500/30">
              Web3 + AI Hackathon 2026
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800/80 text-purple-400 border border-purple-500/30">
              Algorand TestNet Ready
            </span>
          </div>
        </div>
      ),
    },

    // Slide 2: Problem
    {
      id: 2,
      category: 'THE PROBLEM',
      title: 'The Contract Due Diligence Bottleneck',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2 bg-red-500/10 text-red-400 rounded-xl w-fit">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Overlooked Legal Risks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Important indemnity caps, payment schedules, and termination clauses are frequently hidden in 50+ page contract PDFs.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl w-fit">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Expensive & Slow Legal Counsel</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traditional lawyers cost $400–$900/hour and require 3–7 business days to deliver due diligence feedback.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl w-fit">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Superficial AI Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Raw ChatGPT outputs unstructured paragraph summaries without health scores or actionable negotiation playbooks.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Zero Verification & Audit Trail</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traditional AI summaries cannot prove when a review occurred, who requested it, or whether the report was tampered with.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: Solution
    {
      id: 3,
      category: 'OUR SOLUTION',
      title: 'Intelligence Meets Verification',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
          <div className="p-8 bg-gradient-to-br from-blue-950/40 to-slate-900/80 rounded-3xl border border-blue-500/30 space-y-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl w-fit">
              <BrainCircuit className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Artificial Intelligence</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> Deep Legal Text Extraction & Structural Parsing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> Dynamic 0–100 Contract Health Score</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> Clause-Level Risk Classification (High/Critical)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> Actionable Negotiation Recommendations</li>
            </ul>
          </div>

          <div className="p-8 bg-gradient-to-br from-purple-950/40 to-slate-900/80 rounded-3xl border border-purple-500/30 space-y-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl w-fit">
              <Database className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Algorand Blockchain</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-purple-400" /> Native x402 Pay-Gated Micro-Settlement (1 ALGO)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-purple-400" /> Canonical RFC 8785 SHA-256 Hash Digest</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-purple-400" /> Immutable Block Note Field Proof Anchoring</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-purple-400" /> ARC-0003 Proof-of-Audit ASA NFT Badge</li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 4: Workflow Architecture
    {
      id: 4,
      category: 'SYSTEM WORKFLOW',
      title: 'End-to-End Pipeline',
      content: (
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 block mb-1">01. UPLOAD</span>
              <p className="text-xs font-bold text-white">Contract PDF / Code</p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 block mb-1">02. X402 SETTLE</span>
              <p className="text-xs font-bold text-white">1 ALGO Micro-Payment</p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 block mb-1">03. AI INGEST</span>
              <p className="text-xs font-bold text-white">Clause Analysis & Score</p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 block mb-1">04. ANCHOR</span>
              <p className="text-xs font-bold text-white">SHA-256 Ledger Proof</p>
            </div>
          </div>

          <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-2 text-cyan-400">
              <span>PROTOCOL DATA LOAD</span>
              <span>ALGORAND TESTNET</span>
            </div>
            <p>1. Contract Upload ➔ PyMuPDF Text Extraction</p>
            <p>2. Gemini LLM Pipeline ➔ Generates Health Score (78/100) & Action Items</p>
            <p>3. Canonical SHA-256 ➔ Digest: b3b1b1ab12e4a7d5362110b2b858...</p>
            <p>4. Block Note Payload ➔ chaintrust:proof:v1:&lt;ReportHash&gt;:&lt;ContractHash&gt;</p>
          </div>
        </div>
      ),
    },

    // Slide 5: Tech Stack
    {
      id: 5,
      category: 'TECH STACK',
      title: 'Modern High-Performance Stack',
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Frontend</span>
            <p className="text-sm font-bold text-white">Next.js 15 + React 19</p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Styling</span>
            <p className="text-sm font-bold text-white">Tailwind CSS</p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Backend</span>
            <p className="text-sm font-bold text-white">Python FastAPI</p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">AI Engine</span>
            <p className="text-sm font-bold text-white">Gemini 1.5 Pro + PyMuPDF</p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Blockchain</span>
            <p className="text-sm font-bold text-white">Algorand TestNet</p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Payments</span>
            <p className="text-sm font-bold text-white">x402 Protocol</p>
          </div>
        </div>
      ),
    },

    // Slide 6: Conclusion
    {
      id: 6,
      category: 'SUMMARY',
      title: 'Transforming Contract Due Diligence',
      content: (
        <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
          <div className="p-6 bg-slate-900/80 rounded-3xl border border-slate-800 max-w-xl space-y-4">
            <p className="text-lg font-semibold text-white leading-relaxed">
              "AI delivers legal intelligence.<br />
              Blockchain guarantees trust and accountability."
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => router.push('/upload')}>
              Try Live Demo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => router.push('/verify')}>
              Public Verifier
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top Header */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-400" />
          <span className="font-extrabold text-white text-lg tracking-tight">ChainTrust AI</span>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>

      {/* Slide Body */}
      <div className="my-auto max-w-4xl mx-auto w-full z-10 animate-in fade-in duration-300">
        <span className="text-xs font-extrabold tracking-widest text-blue-400 uppercase mb-2 block">
          {slide.category}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          {slide.title}
        </h2>
        {slide.content}
      </div>

      {/* Bottom Nav Bar */}
      <div className="flex justify-between items-center z-10 pt-6 border-t border-slate-800/80">
        <Button variant="outline" onClick={handlePrev} disabled={currentSlide === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {/* Slide Indicator Dots */}
        <div className="flex gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <Button onClick={handleNext} disabled={currentSlide === slides.length - 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
