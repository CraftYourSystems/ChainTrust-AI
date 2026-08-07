export type RiskLevelType = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Vulnerability {
  id: string;
  title: string;
  severity: RiskLevelType;
  description: string;
  recommendation: string;
}

export interface Obligation {
  party: string;
  obligation: string;
  deadline?: string;
}

export interface AmbiguousClause {
  clause: string;
  issue: string;
}

export interface RedFlag {
  title: string;
  description: string;
}

export interface DueDiligenceReportData {
  summary: string;
  riskLevel: RiskLevelType;
  vulnerabilities: Vulnerability[];
  obligations: Obligation[];
  ambiguousClauses: AmbiguousClause[];
  redFlags: RedFlag[];
  recommendations: string[];
}
