import { EventEmitter } from "events";

class HashingEventEmitter extends EventEmitter {}
export const hashingEvents = new HashingEventEmitter();

export const HashingEventTypes = {
  REPORT_HASHED: "ReportHashed",
  INTEGRITY_VERIFIED: "IntegrityVerified",
  MISMATCH_DETECTED: "HashMismatchDetected"
};

export function emitReportHashed(reportId: string, combinedHash: string) {
  hashingEvents.emit(HashingEventTypes.REPORT_HASHED, { reportId, combinedHash, timestamp: new Date().toISOString() });
}

export function emitIntegrityVerified(reportId: string, hash: string) {
  hashingEvents.emit(HashingEventTypes.INTEGRITY_VERIFIED, { reportId, hash, timestamp: new Date().toISOString() });
}

export function emitMismatchDetected(reportId: string, expectedHash: string, actualHash: string) {
  hashingEvents.emit(HashingEventTypes.MISMATCH_DETECTED, { reportId, expectedHash, actualHash, timestamp: new Date().toISOString() });
}

// Global Logger
Object.values(HashingEventTypes).forEach(eventType => {
  hashingEvents.on(eventType, (data) => console.log(`[HASH EVENT] ${eventType}`, data));
});
