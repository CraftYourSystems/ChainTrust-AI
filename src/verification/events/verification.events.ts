import { EventEmitter } from "events";

class VerificationEventEmitter extends EventEmitter {}
export const verificationEvents = new VerificationEventEmitter();

export const VerificationEventTypes = {
  PUBLIC_VERIFICATION_EXECUTED: "PublicVerificationExecuted",
  REPORT_AUTHENTICATED: "PublicReportAuthenticated",
  REPORT_TAMPER_DETECTED: "PublicReportTamperDetected"
};

export function emitPublicVerificationExecuted(status: string, txId?: string) {
  verificationEvents.emit(VerificationEventTypes.PUBLIC_VERIFICATION_EXECUTED, { status, txId, timestamp: new Date().toISOString() });
}

// Global Logger
Object.values(VerificationEventTypes).forEach(eventType => {
  verificationEvents.on(eventType, (data) => console.log(`[VERIFICATION EVENT] ${eventType}`, data));
});
