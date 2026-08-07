import { DueDiligenceReport } from '../types/analysis';
import { MockAnalysisService, ProgressStep } from './mockAnalysis.service';

/**
 * Production Analysis Service - Phase 2 API integration entry point.
 * In Phase 1, this delegates to MockAnalysisService or serves as a placeholder.
 */
export class AnalysisService {
  /**
   * Calls POST /analyze (Phase 2)
   */
  static async analyzeContract(
    file: File,
    onProgress: (step: ProgressStep) => void
  ): Promise<DueDiligenceReport> {
    // Phase 1 fallback to mock analysis
    return MockAnalysisService.analyzeContract(file.name, onProgress);
  }

  /**
   * Retrieves report details (Phase 2)
   */
  static async getReportById(id: string): Promise<DueDiligenceReport | null> {
    // Phase 1 fallback to mock analysis
    return MockAnalysisService.getReportById(id);
  }
}
