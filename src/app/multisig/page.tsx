"use client";

import React, { useState } from "react";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Key,
  Lock,
  AlertTriangle,
  Award,
  ArrowRight,
} from "lucide-react";

const signers = [
  {
    role: "Security Auditor",
    key: "AUDITOR_KEY_7f8a9b2c3d4e5f6",
    color: "blue",
    icon: ShieldCheck,
    description: "Independent certified smart contract auditor. Signs after completing vulnerability assessment.",
    status: "signed" as const,
    signedAt: "2026-08-07T12:04:31Z",
  },
  {
    role: "AI Inference Key",
    key: "AI_MODEL_KEY_e4a7d5362110b2",
    color: "purple",
    icon: Zap,
    description: "On-chain AI attestation key. Automatically signs when risk scoring model confirms report integrity.",
    status: "signed" as const,
    signedAt: "2026-08-07T12:04:58Z",
  },
  {
    role: "Client Officer",
    key: "CLIENT_KEY_c44298fc1c149a",
    color: "emerald",
    icon: Users,
    description: "Authorised representative of the contracting party. Signs to accept and finalise the certificate.",
    status: "pending" as const,
    signedAt: null,
  },
];

const statusStyles = {
  signed: {
    badge: "bg-emerald-50 border-emerald-200 text-emerald-700",
    dot: "bg-emerald-400",
    label: "SIGNED",
  },
  pending: {
    badge: "bg-amber-50 border-amber-200 text-amber-700",
    dot: "bg-amber-400 animate-pulse",
    label: "AWAITING",
  },
};

export default function MultisigGovernancePage() {
  const [simulating, setSimulating] = useState(false);
  const [clientSigned, setClientSigned] = useState(false);
  const [certified, setCertified] = useState(false);

  const handleSimulateSign = async () => {
    setSimulating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setClientSigned(true);
    setSimulating(false);
    await new Promise((r) => setTimeout(r, 600));
    setCertified(true);
  };

  const currentSigners = signers.map((s) =>
    s.role === "Client Officer" && clientSigned
      ? { ...s, status: "signed" as const, signedAt: new Date().toISOString() }
      : s
  );

  const signedCount = currentSigners.filter((s) => s.status === "signed").length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-primary text-xs font-bold border border-blue-100">
          <Users className="h-4 w-4" />
          2-of-3 MULTISIG GOVERNANCE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Multisig Certificate Governance
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
          Enterprise-grade audit certificates require co-signatures from{" "}
          <strong className="text-slate-700">2 of 3 authorised parties</strong> before they are
          published on-chain. This prevents unilateral issuance of fraudulent compliance certificates.
        </p>
      </div>

      {/* Signature Progress Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-white">Signature Collection Progress</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {signedCount}/3 signatures collected • Threshold: 2-of-3
            </p>
          </div>
          <div
            className={`text-sm font-extrabold px-4 py-2 rounded-full border ${
              certified
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                : signedCount >= 2
                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                : "bg-amber-500/20 border-amber-500/40 text-amber-300"
            }`}
          >
            {certified ? "✓ CERTIFICATE ISSUED" : signedCount >= 2 ? "THRESHOLD MET" : "COLLECTING…"}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.round((signedCount / 3) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>0%</span>
          <span className="text-amber-400 font-bold">Threshold at 67%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Signer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentSigners.map((signer, idx) => {
          const Icon = signer.icon;
          const st = statusStyles[signer.status];
          const colorMap: Record<string, string> = {
            blue: "bg-blue-50 text-brand-primary border-blue-100",
            purple: "bg-purple-50 text-purple-600 border-purple-100",
            emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
          };

          return (
            <div
              key={signer.role}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              {/* Icon + Badge */}
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl border w-fit ${colorMap[signer.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-full border ${st.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                  {st.label}
                </span>
              </div>

              {/* Role & Key */}
              <div>
                <h3 className="text-sm font-bold text-slate-900">{signer.role}</h3>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">{signer.key}</p>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">{signer.description}</p>

              {/* Signed At */}
              {signer.signedAt ? (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {new Date(signer.signedAt).toLocaleString()}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-amber-600 font-semibold">
                  <Clock className="h-3.5 w-3.5" />
                  Awaiting signature…
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900">How 2-of-3 Multisig Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          {[
            {
              icon: Key,
              color: "text-blue-600 bg-blue-50 border-blue-100",
              title: "Three Independent Keys",
              body: "Each party holds a unique Algorand private key. No single party can unilaterally issue a certificate.",
            },
            {
              icon: Lock,
              color: "text-purple-600 bg-purple-50 border-purple-100",
              title: "Threshold Logic On-Chain",
              body: "An Algorand TEAL smart contract enforces the 2-of-3 rule. The certificate transaction is rejected if fewer than 2 signatures are present.",
            },
            {
              icon: Award,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
              title: "Tamper-Proof Certificate",
              body: "Once the threshold is met, the certificate is written immutably to the Algorand ledger with all three public keys as co-signers in the note field.",
            },
          ].map(({ icon: Icon, color, title, body }) => (
            <div key={title} className="space-y-2">
              <div className={`p-2.5 rounded-xl w-fit border ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-800">{title}</h4>
              <p className="text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Simulate Sign Button */}
      {!certified && (
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-4">
            Simulate the Client Officer signing to complete the 2-of-3 threshold and trigger certificate issuance.
          </p>
          <button
            onClick={handleSimulateSign}
            disabled={simulating || clientSigned}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-extrabold text-white bg-brand-primary hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition shadow-xl shadow-blue-500/20 hover:scale-105"
          >
            {simulating ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                Signing on Algorand…
              </>
            ) : (
              <>
                <Users className="h-4 w-4" />
                Simulate Client Officer Signature
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Certificate Issued Banner */}
      {certified && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-3">
          <div className="inline-flex p-4 bg-emerald-100 text-emerald-600 rounded-2xl mb-2">
            <Award className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-800">
            ✓ Enterprise Certificate Issued On-Chain!
          </h3>
          <p className="text-sm text-emerald-700 max-w-md mx-auto">
            All 3 signatures collected. The 2-of-3 multisig threshold has been met. Certificate
            is now permanently anchored to the Algorand ledger.
          </p>
          <div className="inline-block px-4 py-2 bg-white rounded-xl font-mono text-xs text-emerald-700 border border-emerald-200 mt-2">
            TxID: MSA-{Date.now().toString(36).toUpperCase()}-CERT
          </div>
        </div>
      )}
    </div>
  );
}
