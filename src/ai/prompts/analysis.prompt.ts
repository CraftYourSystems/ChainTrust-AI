export function buildDueDiligencePrompt(contractText: string, contractType: string): string {
  return `You are ChainTrust-AI, an enterprise Due Diligence Auditor.
Analyze the following ${contractType} and generate a structured risk assessment.

Output MUST be a valid JSON object matching this exact TypeScript structure:
{
  "summary": string,
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "vulnerabilities": Array<{ "id": string, "title": string, "severity": "LOW"|"MEDIUM"|"HIGH"|"CRITICAL", "description": string, "recommendation": string }>,
  "obligations": Array<{ "party": string, "obligation": string, "deadline"?: string }>,
  "ambiguousClauses": Array<{ "clause": string, "issue": string }>,
  "redFlags": Array<{ "title": string, "description": string }>,
  "recommendations": Array<string>
}

Do not include any Markdown formatting or outer text wrappers. Return ONLY raw JSON.

Contract Source Code / Text:
${contractText}`;
}
