import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  BrainCircuit, 
  Wallet, 
  ArrowRight, 
  Zap,
  Lock,
  Upload,
  ChevronRight,
  Link2,
  ShieldCheck
} from 'lucide-react';
import { FeatureCard } from '@/components/landing/FeatureCard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-blue-50/20 via-white to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-brand-primary text-xs font-semibold mb-6">
            <Zap className="h-3.5 w-3.5" />
            Algorand Hackathon MVP
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-none mb-6">
            Contract Intelligence,<br />
            <span className="text-brand-primary">Anchored in Trust.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload legal agreements, extract risky clauses with state-of-the-art AI, and immutably record audit trails on the Algorand blockchain.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/upload"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-brand-primary hover:bg-blue-700 transition-colors rounded-xl shadow-lg shadow-blue-500/10"
            >
              Analyze Contract
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Enterprise-Grade Contract Auditing
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Our platform bridges the gap between deep AI language processing and cryptographic verification to offer secure pay-per-use legal insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<BrainCircuit className="h-6 w-6" />}
              title="AI Due Diligence"
              description="Identify risky liabilities, automatic renewal terms, and indemnity loops instantly."
            />
            <FeatureCard 
              icon={<ShieldAlert className="h-6 w-6" />}
              title="Clause Risk Scoring"
              description="Review individual clauses rated from Low to High risk with plain-English reasons."
            />
            <FeatureCard 
              icon={<Wallet className="h-6 w-6" />}
              title="x402 Pay-per-use"
              description="Pay securely using micro-payments on Algorand TestNet, eliminating monthly fees."
            />
            <FeatureCard 
              icon={<Lock className="h-6 w-6" />}
              title="Cryptographic Proof"
              description="Notarize contract and report hashes on-chain for tamper-evident audit trials."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              The Trust Chain Workflow
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Five automated steps from document ingestion to an immutably certified legal report.
            </p>
          </div>

          <div className="relative lg:h-[400px] w-full">
            {/* Curvy Connecting Line (Desktop Only) */}
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>
              <path
                d="M 10 25 C 20 25, 20 75, 30 75 C 40 75, 40 25, 50 25 C 60 25, 60 75, 70 75 C 80 75, 80 25, 90 25"
                fill="none"
                stroke="url(#flow-gradient)"
                strokeWidth="2"
                className="animate-flow-line opacity-60"
              />
            </svg>

            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 h-full relative z-10">
              
              {/* Step 1 */}
              <div className="group flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 lg:self-start lg:h-[200px]">
                <div className="relative mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-300">
                    <Upload className="h-5.5 w-5.5 text-brand-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                    1
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Upload Contract</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Submit your PDF or DOCX agreement to the secure ingestion pipeline.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 lg:self-end lg:h-[200px]">
                <div className="relative mb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-brand-warning transition-colors duration-300">
                    <Wallet className="h-5.5 w-5.5 text-brand-warning group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                    2
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">x402 Pay-Gate</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Authorize a secure micropayment on Algorand TestNet to unlock analysis.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 lg:self-start lg:h-[200px]">
                <div className="relative mb-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                    <BrainCircuit className="h-5.5 w-5.5 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                    3
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">AI Ingestion</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Deep legal extraction engine processes and scores every contract clause.
                </p>
              </div>

              {/* Step 4 */}
              <div className="group flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 lg:self-end lg:h-[200px]">
                <div className="relative mb-3">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-brand-success transition-colors duration-300">
                    <Link2 className="h-5.5 w-5.5 text-brand-success group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                    4
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">On-Chain Notary</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Document and report hashes are permanently written to the Algorand ledger.
                </p>
              </div>

              {/* Step 5 */}
              <div className="group flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 lg:self-start lg:h-[200px]">
                <div className="relative mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-300">
                    <ShieldCheck className="h-5.5 w-5.5 text-brand-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                    5
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Verified Audit</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Download your certified due diligence report with blockchain proof.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                Ready to verify your contract risk?
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Run an automated compliance review with our mock testbed and preview the report interface.
              </p>
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 transition-colors rounded-xl"
              >
                Analyze Contract
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/3" />
          </div>
        </div>
      </section>
    </div>
  );
}

