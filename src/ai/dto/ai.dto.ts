import { DueDiligenceReportData, RiskLevelType } from "../types/ai.types";

export interface SubmitContractAnalysisDTO {
  filename: string;
  contractText: string;
  contractType?: "SMART_CONTRACT" | "LEGAL_AGREEMENT" | "TERMS_OF_SERVICE";
}

export interface DueDiligenceReportResponseDTO {
  reportId: string;
  contractId: string;
  filename: string;
  contractHash: string;
  reportHash: string;
  summary: string;
  riskLevel: RiskLevelType;
  structuredOutput: DueDiligenceReportData;
  createdAt: string;
}
