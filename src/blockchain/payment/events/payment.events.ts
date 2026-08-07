import { EventEmitter } from "events";

class PaymentEventEmitter extends EventEmitter {}
export const paymentEvents = new PaymentEventEmitter();

export const PaymentEventTypes = {
  QUOTE_GENERATED: "PaymentQuoteGenerated",
  PAYMENT_SUBMITTED: "PaymentSubmitted",
  VERIFICATION_STARTED: "PaymentVerificationStarted",
  PAYMENT_VERIFIED: "PaymentVerified",
  PAYMENT_FAILED: "PaymentFailed",
  QUOTE_EXPIRED: "PaymentQuoteExpired",
  DOUBLE_SPEND_DETECTED: "DoubleSpendAttemptDetected",
  ANALYSIS_UNLOCKED: "AnalysisUnlocked"
};

export function emitQuoteGenerated(quoteId: string, userId: string, amount: string) {
  paymentEvents.emit(PaymentEventTypes.QUOTE_GENERATED, { quoteId, userId, amount, timestamp: new Date().toISOString() });
}

export function emitPaymentVerified(txId: string, quoteId: string, userId: string, amount: string) {
  paymentEvents.emit(PaymentEventTypes.PAYMENT_VERIFIED, { txId, quoteId, userId, amount, timestamp: new Date().toISOString() });
}

export function emitPaymentFailed(quoteId: string, reason: string) {
  paymentEvents.emit(PaymentEventTypes.PAYMENT_FAILED, { quoteId, reason, timestamp: new Date().toISOString() });
}

export function emitDoubleSpendDetected(txId: string, userId: string) {
  paymentEvents.emit(PaymentEventTypes.DOUBLE_SPEND_DETECTED, { txId, userId, timestamp: new Date().toISOString() });
}

// Global Logger
Object.values(PaymentEventTypes).forEach(eventType => {
  paymentEvents.on(eventType, (data) => console.log(`[PAYMENT EVENT] ${eventType}`, data));
});
