import prisma from "@/lib/db";
import { PaymentQuoteStatus, PaymentStatus } from "@prisma/client";

export class PaymentRepository {
  async createQuote(userId: string, amount: bigint, recipient: string, purpose: string, expiresAt: Date, signature: string) {
    return await prisma.paymentQuote.create({
      data: {
        userId,
        amount,
        recipient,
        purpose,
        expiresAt,
        signature,
        status: PaymentQuoteStatus.PENDING
      }
    });
  }

  async getQuote(quoteId: string) {
    return await prisma.paymentQuote.findUnique({
      where: { id: quoteId }
    });
  }

  async updateQuoteStatus(quoteId: string, status: PaymentQuoteStatus) {
    return await prisma.paymentQuote.update({
      where: { id: quoteId },
      data: { status }
    });
  }

  async isTxIdUsed(txId: string): Promise<boolean> {
    const payment = await prisma.payment.findUnique({
      where: { txId }
    });
    return !!payment;
  }

  async createPayment(data: {
    txId: string;
    quoteId: string;
    userId: string;
    senderAddress: string;
    recipientAddress: string;
    amount: bigint;
    network: string;
    confirmedRound: bigint;
    verificationLatency?: number;
    status?: PaymentStatus;
    metadata?: string;
  }) {
    return await prisma.payment.create({
      data: {
        txId: data.txId,
        quoteId: data.quoteId,
        userId: data.userId,
        senderAddress: data.senderAddress,
        recipientAddress: data.recipientAddress,
        amount: data.amount,
        network: data.network,
        confirmedRound: data.confirmedRound,
        verificationLatency: data.verificationLatency,
        status: data.status || PaymentStatus.CONFIRMED,
        metadata: data.metadata
      }
    });
  }

  async getPaymentByQuoteId(quoteId: string) {
    return await prisma.payment.findUnique({
      where: { quoteId }
    });
  }
}

export const paymentRepository = new PaymentRepository();
