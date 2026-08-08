"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Clock, FileText, ShieldAlert, ShieldCheck, Trash2, ArrowUpRight } from "lucide-react";
import { reportHistory, ReportHistoryEntry } from "@/services/reportHistory";

interface ReportHistoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const riskColors: Record<string, string> = {
  High: "text-red-600 bg-red-50 border-red-200",
  Medium: "text-amber-600 bg-amber-50 border-amber-200",
  Low: "text-emerald-600 bg-emerald-50 border-emerald-200",
};

const riskIcons: Record<string, React.ReactNode> = {
  High: <ShieldAlert className="h-3.5 w-3.5" />,
  Medium: <ShieldAlert className="h-3.5 w-3.5" />,
  Low: <ShieldCheck className="h-3.5 w-3.5" />,
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function ReportHistoryDrawer({ open, onClose }: ReportHistoryDrawerProps) {
  const [entries, setEntries] = useState<ReportHistoryEntry[]>([]);

  const refresh = () => setEntries(reportHistory.getHistory());

  useEffect(() => {
    refresh();
    window.addEventListener("report-history-updated", refresh);
    return () => window.removeEventListener("report-history-updated", refresh);
  }, []);

  const handleClear = () => {
    reportHistory.clearHistory();
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Slide-in Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand-primary" />
            <h2 className="text-base font-extrabold text-slate-900">Report History</h2>
            {entries.length > 0 && (
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {entries.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {entries.length > 0 && (
              <button
                onClick={handleClear}
                title="Clear all history"
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-20">
              <div className="p-4 bg-slate-50 rounded-2xl mb-3 border border-slate-100">
                <FileText className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-500">No reports yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                Analyzed reports will appear here automatically.
              </p>
            </div>
          ) : (
            entries.map((entry) => {
              const riskKey =
                entry.riskLevel.charAt(0).toUpperCase() + entry.riskLevel.slice(1).toLowerCase();
              const colorClass = riskColors[riskKey] ?? "text-slate-600 bg-slate-50 border-slate-200";
              const icon = riskIcons[riskKey] ?? null;

              return (
                <Link
                  key={entry.id}
                  href={`/report/${entry.id}`}
                  onClick={onClose}
                  className="block bg-white border border-slate-200 hover:border-brand-primary hover:shadow-md rounded-2xl p-4 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{entry.fileName}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{entry.id}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-brand-primary transition shrink-0 mt-0.5" />
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorClass}`}
                    >
                      {icon}
                      {riskKey} Risk
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Score: {entry.riskScore}/100
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-100">
                      {entry.feeAlgo} ALGO
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-2">{formatDate(entry.date)}</p>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100">
          <Link
            href="/upload"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-extrabold text-white bg-brand-primary hover:bg-blue-700 rounded-xl transition shadow-md"
          >
            Analyze New Contract →
          </Link>
        </div>
      </div>
    </>
  );
}
