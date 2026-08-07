import crypto from "crypto";
import { AIModelAdapter } from "../adapters/AIModelAdapter";
import { MockLLMAdapter } from "../adapters/MockLLMAdapter";
import { OpenAIAdapter } from "../adapters/OpenAIAdapter";
import { documentProcessorService } from "./document-processor.service";
import { jsonRepairService } from "./json-repair.service";
import { aiRepository } from "../repository/ai.repository";
import { buildDueDiligencePrompt } from "../prompts/analysis.prompt";
import { emitAnalysisStarted, emitAnalysisCompleted, emitAnalysisFailed } from "../events/ai.events";
import { RiskLevel } from "@prisma/client";

export class AIPipelineService {
  private adapter: AIModelAdapter;

  constructor(adapter?: AIModelAdapter) {
    // Default to OpenAI if API key present, else fallback to MockLLMAdapter
    if (adapter) {
      this.adapter = adapter;
    } else if (process.env.OPENAI_API_KEY) {
      this.adapter = new OpenAIAdapter();
    } else {
      this.adapter = new MockLLMAdapter();
    }
  }

  /**
   * Sets the active model adapter dynamically (OpenAI, Anthropic, Mock).
   */
  setAdapter(adapter: AIModelAdapter) {
    this.adapter = adapter;
  }

  /**
   * Orchestrates Document Processing -> Prompt Assembly -> LLM Inference -> JSON Validation -> DB Persistence.
   */
  async processAndAnalyze(userId: string, filename: string, contractText: string, contractType: string = "SMART_CONTRACT") {
    // 1. Process Document & Compute File Hash
    const doc = documentProcessorService.processText(contractText);

    // 2. Persist Contract Record to DB
    const contract = await aiRepository.createContract(userId, filename, doc.hash, doc.charCount, contractType);
    emitAnalysisStarted(contract.id, userId, filename);

    try {
      // 3. Assemble Prompt & Call Model Adapter
      const prompt = buildDueDiligencePrompt(doc.processedText, contractType);
      const rawModelOutput = await this.adapter.analyzeContract(prompt, contractType);

      // 4. Clean, Repair, and Validate JSON Output
      const structuredReport = jsonRepairService.repairAndValidate(rawModelOutput);

      // 5. Compute SHA-256 Report Hash (Prepared for Phase 6 immutable ledger recording)
      const reportJsonString = JSON.stringify(structuredReport);
      const reportHash = crypto.createHash("sha256").update(reportJsonString).digest("hex");

      // 6. Persist Report to DB
      const report = await aiRepository.createReport(
        userId,
        contract.id,
        structuredReport.summary,
        structuredReport.riskLevel as RiskLevel,
        reportHash,
        reportJsonString
      );

      emitAnalysisCompleted(report.id, contract.id, structuredReport.riskLevel);

      return {
        reportId: report.id,
        contractId: contract.id,
        filename,
        contractHash: doc.hash,
        reportHash,
        summary: structuredReport.summary,
        riskLevel: structuredReport.riskLevel,
        structuredOutput: structuredReport,
        createdAt: report.createdAt.toISOString()
      };
    } catch (error: any) {
      emitAnalysisFailed(contract.id, error.message);
      throw error;
    }
  }
}

export const aiPipelineService = new AIPipelineService();
