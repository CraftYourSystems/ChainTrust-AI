import { DueDiligenceReport } from '../types/analysis';
import { ProgressStep } from './mockAnalysis.service';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class AnalysisService {
  /**
   * Calls POST /analyze on the FastAPI backend
   */
  static async analyzeContract(
    file: File,
    onProgress: (step: ProgressStep) => void
  ): Promise<DueDiligenceReport> {
    onProgress({ percentage: 15, message: 'Uploading contract to API server...' });

    const formData = new FormData();
    formData.append('file', file);

    onProgress({ percentage: 40, message: 'AI model analyzing document clauses & legal risks...' });

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });
    } catch (err: any) {
      throw new Error(`Could not connect to backend server at ${API_BASE_URL}. Please verify the backend is running.`);
    }

    onProgress({ percentage: 85, message: 'Structuring report response...' });

    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.error || errorMessage;
      } catch (e) {
        // ignore
      }
      throw new Error(errorMessage);
    }

    const data: DueDiligenceReport = await response.json();

    // Ensure analysisId and verification metadata exist
    if (!data.analysisId) {
      data.analysisId = `ANL-${Math.floor(100 + Math.random() * 900)}`;
    }
    if (!data.verification) {
      data.verification = { status: 'Pending' };
    }

    // Cache the report in sessionStorage so report details page can render it
    try {
      sessionStorage.setItem(`report_${data.analysisId}`, JSON.stringify(data));
      sessionStorage.setItem('latest_report', JSON.stringify(data));
    } catch (e) {
      console.warn('Could not cache report in sessionStorage', e);
    }

    onProgress({ percentage: 100, message: 'Ready' });

    return data;
  }

  /**
   * Retrieves report details by ID from local session cache
   */
  static async getReportById(id: string): Promise<DueDiligenceReport | null> {
    try {
      const cached = sessionStorage.getItem(`report_${id}`) || sessionStorage.getItem('latest_report');
      if (cached) {
        const parsed = JSON.parse(cached) as DueDiligenceReport;
        return parsed;
      }
    } catch (e) {
      console.warn('Could not retrieve cached report', e);
    }
    
    return null;
  }
}
