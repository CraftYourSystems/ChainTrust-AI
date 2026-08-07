export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ProgressStep {
  percentage: number;
  message: string;
}

export interface ClauseAnalysis {
  title: string;
  risk: RiskLevel;
  reason: string;
  recommendation: string;
}

export interface DueDiligenceReport {
  analysisId: string;
  contractType?: string;
  overallRisk: number; // 0 - 100
  riskLevel: RiskLevel;
  executiveSummary: string;
  keyFindings: string[];
  actionItems: string[];
  clauses: ClauseAnalysis[];
  verification?: {
    status: 'Pending' | 'Verified';
    walletAddress?: string;
    transactionId?: string;
    timestamp?: string;
    aiVersion?: string;
    reportHash?: string;
    contractHealthScore?: number;
  };
}
