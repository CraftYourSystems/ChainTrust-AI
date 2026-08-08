/**
 * reportHistory.ts — Stores past analysis results in localStorage.
 * Each entry records enough info to display in the History drawer
 * and navigate back to the full report.
 */

const HISTORY_KEY = "ct_report_history";
const MAX_ENTRIES = 20;

export interface ReportHistoryEntry {
  id: string;
  fileName: string;
  contractType: string;
  riskLevel: string;
  riskScore: number;
  date: string; // ISO string
  feeAlgo: string;
}

export const reportHistory = {
  /** Add or update an entry (deduplicates by id, most recent first). */
  addToHistory(entry: ReportHistoryEntry): void {
    if (typeof window === "undefined") return;
    const history = this.getHistory();
    const filtered = history.filter((h) => h.id !== entry.id);
    filtered.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, MAX_ENTRIES)));
    window.dispatchEvent(new Event("report-history-updated"));
  },

  getHistory(): ReportHistoryEntry[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) return JSON.parse(raw) as ReportHistoryEntry[];
    } catch {}
    return [];
  },

  clearHistory(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new Event("report-history-updated"));
  },
};
