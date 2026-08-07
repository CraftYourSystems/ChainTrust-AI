import { EventEmitter } from "events";

class AIEventEmitter extends EventEmitter {}
export const aiEvents = new AIEventEmitter();

export const AIEventTypes = {
  ANALYSIS_STARTED: "AnalysisStarted",
  ANALYSIS_COMPLETED: "AnalysisCompleted",
  ANALYSIS_FAILED: "AnalysisFailed"
};

export function emitAnalysisStarted(contractId: string, userId: string, filename: string) {
  aiEvents.emit(AIEventTypes.ANALYSIS_STARTED, { contractId, userId, filename, timestamp: new Date().toISOString() });
}

export function emitAnalysisCompleted(reportId: string, contractId: string, riskLevel: string) {
  aiEvents.emit(AIEventTypes.ANALYSIS_COMPLETED, { reportId, contractId, riskLevel, timestamp: new Date().toISOString() });
}

export function emitAnalysisFailed(contractId: string, reason: string) {
  aiEvents.emit(AIEventTypes.ANALYSIS_FAILED, { contractId, reason, timestamp: new Date().toISOString() });
}

// Global Logger
Object.values(AIEventTypes).forEach(eventType => {
  aiEvents.on(eventType, (data) => console.log(`[AI EVENT] ${eventType}`, data));
});
