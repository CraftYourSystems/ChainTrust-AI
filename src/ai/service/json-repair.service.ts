import { DueDiligenceReportData, RiskLevelType } from "../types/ai.types";
import { JSONParseError } from "../errors/ai.errors";

export class JSONRepairService {
  /**
   * Cleans LLM output (stripping markdown tags) and validates JSON schema compliance.
   */
  repairAndValidate(rawOutput: string): DueDiligenceReportData {
    let cleaned = rawOutput.trim();

    // Remove Markdown code block wrappers if present
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    }

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      throw new JSONParseError(rawOutput);
    }

    // Validate required fields and apply defaults for robust execution
    const validRiskLevels: RiskLevelType[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    const riskLevel: RiskLevelType = validRiskLevels.includes(parsed.riskLevel?.toUpperCase()) 
      ? (parsed.riskLevel.toUpperCase() as RiskLevelType) 
      : "MEDIUM";

    return {
      summary: typeof parsed.summary === "string" ? parsed.summary : "No summary provided.",
      riskLevel,
      vulnerabilities: Array.isArray(parsed.vulnerabilities) ? parsed.vulnerabilities.map((v: any, idx: number) => ({
        id: v.id || `VULN-${idx + 1}`,
        title: v.title || "Unspecified Vulnerability",
        severity: validRiskLevels.includes(v.severity?.toUpperCase()) ? v.severity.toUpperCase() : "MEDIUM",
        description: v.description || "",
        recommendation: v.recommendation || ""
      })) : [],
      obligations: Array.isArray(parsed.obligations) ? parsed.obligations.map((o: any) => ({
        party: o.party || "Unknown Party",
        obligation: o.obligation || "",
        deadline: o.deadline
      })) : [],
      ambiguousClauses: Array.isArray(parsed.ambiguousClauses) ? parsed.ambiguousClauses.map((a: any) => ({
        clause: a.clause || "",
        issue: a.issue || ""
      })) : [],
      redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags.map((r: any) => ({
        title: r.title || "Red Flag",
        description: r.description || ""
      })) : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.filter((r: any) => typeof r === "string") : []
    };
  }
}

export const jsonRepairService = new JSONRepairService();
