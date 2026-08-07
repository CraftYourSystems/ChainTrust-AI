import { DueDiligenceReport } from '../types/analysis';
import { mockReports } from '../data/mockAnalysis';

export interface ProgressStep {
  percentage: number;
  message: string;
}

export const LOADING_STEPS: ProgressStep[] = [
  { percentage: 10, message: 'Uploading Contract...' },
  { percentage: 30, message: 'Reading Document...' },
  { percentage: 55, message: 'Extracting Clauses...' },
  { percentage: 80, message: 'Analyzing Legal Risks...' },
  { percentage: 95, message: 'Generating Due Diligence Report...' },
  { percentage: 100, message: 'Ready' }
];

export class MockAnalysisService {
  /**
   * Simulates contract analysis with progress updates
   */
  static async analyzeContract(
    fileName: string,
    onProgress: (step: ProgressStep) => void
  ): Promise<DueDiligenceReport> {
    // Determine report based on file name or random selection
    let reportId = 'ANL-001';
    const lowerName = fileName.toLowerCase();
    
    if (lowerName.includes('nda') || lowerName.includes('non-disclosure') || lowerName.includes('disclosure')) {
      reportId = 'ANL-002';
    } else if (lowerName.includes('contractor') || lowerName.includes('independent') || lowerName.includes('consulting') || lowerName.includes('freelance')) {
      reportId = 'ANL-003';
    } else {
      // Pick randomly or default to ANL-001
      const keys = Object.keys(mockReports);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      reportId = randomKey || 'ANL-001';
    }

    const report = mockReports[reportId] || mockReports['ANL-001'];

    // Run the progress simulation
    for (const step of LOADING_STEPS) {
      onProgress(step);
      // Wait for simulated time
      const delay = step.percentage === 100 ? 500 : 800 + Math.random() * 400; // ms
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return report;
  }

  /**
   * Retrieves a report by ID
   */
  static async getReportById(id: string): Promise<DueDiligenceReport | null> {
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockReports[id] || null;
  }
}
