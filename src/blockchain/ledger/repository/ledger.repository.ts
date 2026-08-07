import prisma from "@/lib/db";
import { LedgerStatus } from "@prisma/client";

export class LedgerRepository {
  async isReportRecorded(reportId: string): Promise<boolean> {
    const record = await prisma.ledgerRecord.findUnique({
      where: { reportId }
    });
    return !!record;
  }

  async getLedgerRecordByReportId(reportId: string) {
    return await prisma.ledgerRecord.findUnique({
      where: { reportId },
      include: { report: true }
    });
  }

  async createLedgerRecord(data: {
    userId: string;
    reportId: string;
    txId: string;
    confirmedRound: bigint;
    notePayload: string;
    senderAddress: string;
    status?: LedgerStatus;
  }) {
    return await prisma.ledgerRecord.create({
      data: {
        userId: data.userId,
        reportId: data.reportId,
        txId: data.txId,
        confirmedRound: data.confirmedRound,
        notePayload: data.notePayload,
        senderAddress: data.senderAddress,
        status: data.status || LedgerStatus.CONFIRMED
      }
    });
  }
}

export const ledgerRepository = new LedgerRepository();
