import crypto from "crypto";
import { pricingService } from "./pricing.service";
import { algorandVerificationService } from "./algorand-verification.service";
import { paymentRepository } from "../repository/payment.repository";
import { 
  QuoteNotFoundError, 
  QuoteExpiredError, 
  QuoteTamperedError, 
  DoubleSpendError 
} from "../errors/payment.errors";
import { 
  emitQuoteGenerated, 
  emitPaymentVerified, 
  emitPaymentFailed, 
  emitDoubleSpendDetected 
} from "../events/payment.events";
import { algorandConfig } from "@/services/algorand/config";
import { PaymentQuoteStatus, PaymentStatus } from "@prisma/client";

const SECRET_KEY = process.env.PAYMENT_QUOTE_SECRET || "fallback-payment-quote-secret-key-32-bytes";
const PLATFORM_TREASURY = process.env.PLATFORM_TREASURY_ADDRESS || "DH3AHUSOLFED3M5NNZH6V2FDDCR2ZD4G6JXJFC5BNRYMWQ4AZEYWGLR6HE";

// In-memory mutex for active verification concurrency locking
const verificationLocks = new Set<string>();

export class PaymentService {
  /**
   * Generates a cryptographically signed payment quote and persists it to DB.
   */
  async createQuote(userId: string, purpose: string = "DUE_DILIGENCE") {
    const fee = pricingService.calculateFee(purpose);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minute quote window
    const recipient = PLATFORM_TREASURY;

    // Create HMAC signature over quote parameters
    const signature = this.signQuotePayload(userId, fee.toString(), recipient, purpose, expiresAt.toISOString());

    const quote = await paymentRepository.createQuote(userId, fee, recipient, purpose, expiresAt, signature);

    emitQuoteGenerated(quote.id, userId, fee.toString());

    return {
      quoteId: quote.id,
      amount: fee.toString(),
      recipient,
      purpose,
      expiresAt: expiresAt.toISOString(),
      signature
    };
  }

  /**
   * Cryptographically verifies the payment quote signature.
   */
  verifyQuoteSignature(userId: string, amount: string, recipient: string, purpose: string, expiresAt: string, signature: string): boolean {
    const expected = this.signQuotePayload(userId, amount, recipient, purpose, expiresAt);
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  }

  private signQuotePayload(userId: string, amount: string, recipient: string, purpose: string, expiresAt: string): string {
    const payload = `${userId}:${amount}:${recipient}:${purpose}:${expiresAt}`;
    return crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");
  }

  /**
   * Orchestrates the complete payment verification pipeline with double-spend locks and blockchain checks.
   */
  async verifyAndRecordPayment(userId: string, quoteId: string, txId: string) {
    const startTime = Date.now();

    // 1. Acquire Concurrency Lock on TxID to prevent race conditions
    if (verificationLocks.has(txId)) {
      throw new Error(`Payment verification already in progress for transaction ${txId}`);
    }
    verificationLocks.add(txId);

    try {
      // 2. Fetch and validate PaymentQuote from DB
      const quote = await paymentRepository.getQuote(quoteId);
      if (!quote) {
        throw new QuoteNotFoundError(quoteId);
      }

      if (quote.userId !== userId) {
        throw new QuoteTamperedError();
      }

      if (quote.status === PaymentQuoteStatus.PAID) {
        const existingPayment = await paymentRepository.getPaymentByQuoteId(quoteId);
        if (existingPayment) return existingPayment;
      }

      if (quote.status === PaymentQuoteStatus.EXPIRED || quote.expiresAt < new Date()) {
        await paymentRepository.updateQuoteStatus(quoteId, PaymentQuoteStatus.EXPIRED);
        emitPaymentFailed(quoteId, "Quote Expired");
        throw new QuoteExpiredError(quoteId);
      }

      // 3. Check Double-Spend in DB
      const isUsed = await paymentRepository.isTxIdUsed(txId);
      if (isUsed) {
        emitDoubleSpendDetected(txId, userId);
        throw new DoubleSpendError(txId);
      }

      // 4. Verify pure Blockchain Details via AlgorandVerificationService
      const blockchainTx = await algorandVerificationService.verifyTransaction(
        txId,
        quote.recipient,
        quote.amount
      );

      // 5. Persist Payment & Update Quote Status
      const latency = Date.now() - startTime;
      
      const payment = await paymentRepository.createPayment({
        txId: blockchainTx.txId,
        quoteId: quote.id,
        userId,
        senderAddress: blockchainTx.sender,
        recipientAddress: blockchainTx.receiver,
        amount: blockchainTx.amount,
        network: algorandConfig.network,
        confirmedRound: blockchainTx.confirmedRound,
        verificationLatency: latency,
        status: PaymentStatus.CONFIRMED
      });

      await paymentRepository.updateQuoteStatus(quote.id, PaymentQuoteStatus.PAID);

      emitPaymentVerified(txId, quote.id, userId, blockchainTx.amount.toString());

      return payment;
    } finally {
      // Release Concurrency Lock
      verificationLocks.delete(txId);
    }
  }
}

export const paymentService = new PaymentService();
