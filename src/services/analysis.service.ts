import { DueDiligenceReport, ProgressStep } from '../types/analysis';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const REPORT_KEY = (id: string) => `report:${id}`;

export class AnalysisService {
  /**
   * Uploads the contract to the Python FastAPI engine and returns the real
   * DueDiligenceReport.
   *
   * There is no fallback report. If the backend fails, this throws and the
   * caller shows the error — fabricating an analysis would be worse than
   * showing nothing.
   */
  static async analyzeContract(
    file: File,
    onProgress: (step: ProgressStep) => void
  ): Promise<DueDiligenceReport> {
    onProgress({ percentage: 10, message: 'Uploading contract to analysis engine...' });

    const formData = new FormData();
    formData.append('file', file);

    onProgress({ percentage: 30, message: 'Extracting document text...' });

    let response: Response;
    try {
      // No Content-Type header: the browser must set the multipart boundary.
      response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });
    } catch {
      throw new Error(
        `Could not reach the analysis engine at ${API_BASE_URL}. ` +
        `Make sure the Python backend is running on port 8000.`
      );
    }

    onProgress({ percentage: 75, message: 'AI analysing clauses and legal risk...' });

    // fetch() does not throw on 4xx/5xx — check explicitly.
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(
        body?.detail || body?.error || `Analysis failed (HTTP ${response.status})`
      );
    }

    const data: DueDiligenceReport = await response.json();

    // The backend owns analysisId. If it is missing, something is wrong with
    // the API contract — fail loudly rather than inventing one.
    if (!data?.analysisId) {
      throw new Error('Analysis engine returned a report without an analysisId.');
    }

    onProgress({ percentage: 90, message: 'Anchoring report proof on Algorand...' });

    // Anchoring must never block or invalidate the analysis. If it fails, the
    // report is returned unchanged with verification left Pending/Failed.
    const verified = await AnalysisService.anchorReport(data);

    onProgress({ percentage: 95, message: 'Preparing due diligence report...' });

    // Hand the report to the report page. sessionStorage keeps this simple —
    // no database is needed just to move one object between two routes.
    try {
      sessionStorage.setItem(REPORT_KEY(verified.analysisId), JSON.stringify(verified));
      sessionStorage.setItem('latest_report', JSON.stringify(verified));
    } catch (e) {
      console.warn('Could not cache report in sessionStorage', e);
    }

    onProgress({ percentage: 100, message: 'Ready' });

    return verified;
  }

  /**
   * Records the report's SHA-256 proof on Algorand TestNet.
   *
   * Always resolves. On failure the report comes back with a truthful
   * Pending/Failed verification rather than a fabricated transaction.
   */
  private static async anchorReport(report: DueDiligenceReport): Promise<DueDiligenceReport> {
    try {
      const response = await fetch('/api/ledger/anchor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report }),
      });

      const body = await response.json().catch(() => null);

      if (body?.success && body?.data?.transactionId) {
        return { ...report, verification: body.data };
      }

      // Anchoring did not complete. Keep the real hash when we have one.
      return {
        ...report,
        verification: {
          ...report.verification,
          status: 'Pending',
          reportHash: body?.data?.reportHash,
        },
      };
    } catch {
      return { ...report, verification: { ...report.verification, status: 'Pending' } };
    }
  }

  /**
   * Retrieves a previously analysed report from the session cache.
   *
   * Returns null when it is not there — the report page renders a proper
   * "not available" state rather than fabricated data.
   */
  static async getReportById(id: string): Promise<DueDiligenceReport | null> {
    try {
      const cached =
        sessionStorage.getItem(REPORT_KEY(id)) || sessionStorage.getItem('latest_report');
      if (!cached) return null;

      const parsed = JSON.parse(cached) as DueDiligenceReport;
      return parsed.analysisId === id ? parsed : null;
    } catch (e) {
      console.warn('Could not retrieve cached report', e);
      return null;
    }
  }
}
