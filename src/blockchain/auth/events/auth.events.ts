import { EventEmitter } from "events";

class AuthEventEmitter extends EventEmitter {}
export const authEvents = new AuthEventEmitter();

export const AuthEventTypes = {
  CHALLENGE_GENERATED: "ChallengeGenerated",
  CHALLENGE_EXPIRED: "ChallengeExpired",
  CHALLENGE_USED: "ChallengeUsed",
  SESSION_CREATED: "SessionCreated",
  SESSION_EXPIRED: "SessionExpired",
  SESSION_REVOKED: "SessionRevoked",
  REPLAY_ATTEMPT_DETECTED: "ReplayAttemptDetected",
  SIGNATURE_INVALID: "SignatureInvalid"
};

// Strongly typed emitters
export function emitChallengeGenerated(walletAddress: string, nonce: string) {
  authEvents.emit(AuthEventTypes.CHALLENGE_GENERATED, { walletAddress, nonce, timestamp: new Date().toISOString() });
}

export function emitSignatureInvalid(walletAddress: string) {
  authEvents.emit(AuthEventTypes.SIGNATURE_INVALID, { walletAddress, timestamp: new Date().toISOString() });
}

export function emitReplayAttemptDetected(walletAddress: string, nonce: string) {
  authEvents.emit(AuthEventTypes.REPLAY_ATTEMPT_DETECTED, { walletAddress, nonce, timestamp: new Date().toISOString() });
}

export function emitSessionCreated(walletAddress: string, sessionId: string) {
  authEvents.emit(AuthEventTypes.SESSION_CREATED, { walletAddress, sessionId, timestamp: new Date().toISOString() });
}

export function emitSessionRevoked(sessionId: string) {
  authEvents.emit(AuthEventTypes.SESSION_REVOKED, { sessionId, timestamp: new Date().toISOString() });
}

// Global logger
Object.values(AuthEventTypes).forEach(eventType => {
  authEvents.on(eventType, (data) => console.log(`[AUTH EVENT] ${eventType}`, data));
});
