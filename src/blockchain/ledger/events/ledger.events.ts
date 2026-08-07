import { EventEmitter } from "events";

class LedgerEventEmitter extends EventEmitter {}
export const ledgerEvents = new LedgerEventEmitter();

export const LedgerEventTypes = {
  RECORDING_STARTED: "ProofRecordingStarted",
  PROOF_RECORDED: "LedgerProofRecorded",
  RECORDING_FAILED: "ProofRecordingFailed"
};

export function emitRecordingStarted(reportId: string) {
  ledgerEvents.emit(LedgerEventTypes.RECORDING_STARTED, { reportId, timestamp: new Date().toISOString() });
}

export function emitProofRecorded(reportId: string, txId: string, confirmedRound: string) {
  ledgerEvents.emit(LedgerEventTypes.PROOF_RECORDED, { reportId, txId, confirmedRound, timestamp: new Date().toISOString() });
}

export function emitRecordingFailed(reportId: string, reason: string) {
  ledgerEvents.emit(LedgerEventTypes.RECORDING_FAILED, { reportId, reason, timestamp: new Date().toISOString() });
}

// Global Logger
Object.values(LedgerEventTypes).forEach(eventType => {
  ledgerEvents.on(eventType, (data) => console.log(`[LEDGER EVENT] ${eventType}`, data));
});
