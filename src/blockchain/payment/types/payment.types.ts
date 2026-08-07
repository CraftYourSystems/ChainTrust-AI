export type PaymentQuoteStatusType = "PENDING" | "PAID" | "EXPIRED" | "CANCELLED";
export type PaymentStatusType = "PENDING" | "VERIFYING" | "CONFIRMED" | "FAILED" | "EXPIRED" | "REFUNDED";

export interface PaymentQuoteDetails {
  quoteId: string;
  amount: string; // stringified microAlgos to avoid JSON BigInt issues
  recipient: string;
  purpose: string;
  expiresAt: string;
  signature: string;
}

export interface PaymentVerificationResult {
  paymentId: string;
  txId: string;
  quoteId: string;
  senderAddress: string;
  amount: string;
  confirmedRound: number;
  status: PaymentStatusType;
}
