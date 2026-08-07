import { walletEvents } from "@/blockchain/wallet/events/wallet.events";
import { authEvents } from "@/blockchain/auth/events/auth.events";
import { paymentEvents } from "@/blockchain/payment/events/payment.events";
import { aiEvents } from "@/ai/events/ai.events";
import { hashingEvents } from "@/blockchain/hashing/events/hash.events";
import { ledgerEvents } from "@/blockchain/ledger/events/ledger.events";
import { verificationEvents } from "@/verification/events/verification.events";
import { auditRepository } from "../repository/audit.repository";

export class AuditLoggerService {
  constructor() {
    this.registerEventListeners();
  }

  /**
   * Listens to event emitters across all system domains and records unified audit logs.
   */
  private registerEventListeners() {
    // Wallet Events
    walletEvents.on("WalletConnected", (d) => this.log("WALLET_CONNECTED", "Wallet", undefined, d));
    walletEvents.on("WalletDisconnected", (d) => this.log("WALLET_DISCONNECTED", "Wallet", undefined, d));

    // Auth Events
    authEvents.on("ChallengeGenerated", (d) => this.log("CHALLENGE_GENERATED", "Auth", undefined, d));
    authEvents.on("SessionCreated", (d) => this.log("SESSION_CREATED", "Auth", undefined, d));
    authEvents.on("SessionRevoked", (d) => this.log("SESSION_REVOKED", "Auth", undefined, d));
    authEvents.on("ReplayAttemptDetected", (d) => this.log("SECURITY_REPLAY_ATTEMPT", "Auth", undefined, d));

    // Payment Events
    paymentEvents.on("PaymentQuoteGenerated", (d) => this.log("PAYMENT_QUOTE_GENERATED", "Payment", d.userId, d));
    paymentEvents.on("PaymentVerified", (d) => this.log("PAYMENT_VERIFIED", "Payment", d.userId, d));
    paymentEvents.on("DoubleSpendAttemptDetected", (d) => this.log("SECURITY_DOUBLE_SPEND", "Payment", d.userId, d));

    // AI Pipeline Events
    aiEvents.on("AnalysisStarted", (d) => this.log("AI_ANALYSIS_STARTED", "AI", d.userId, d));
    aiEvents.on("AnalysisCompleted", (d) => this.log("AI_ANALYSIS_COMPLETED", "AI", undefined, d));

    // Hashing Events
    hashingEvents.on("ReportHashed", (d) => this.log("REPORT_HASHED", "Hashing", undefined, d));
    hashingEvents.on("HashMismatchDetected", (d) => this.log("SECURITY_HASH_MISMATCH", "Hashing", undefined, d));

    // Ledger Events
    ledgerEvents.on("LedgerProofRecorded", (d) => this.log("LEDGER_PROOF_RECORDED", "Ledger", undefined, d));

    // Verification Events
    verificationEvents.on("PublicVerificationExecuted", (d) => this.log("PUBLIC_VERIFICATION", "Verification", undefined, d));
  }

  async log(action: string, resource: string, userId?: string, metadata?: any) {
    try {
      await auditRepository.createLog(action, resource, userId, undefined, undefined, metadata);
    } catch (e) {
      // In non-DB environment, fail gracefully
      console.log(`[AUDIT LOG] ${action} on ${resource}`, metadata);
    }
  }
}

export const auditLoggerService = new AuditLoggerService();
