import prisma from "@/lib/db";
import { RiskLevel } from "@prisma/client";

export class AIRepository {
  async createContract(userId: string, filename: string, fileHash: string, fileSize: number, contractType: string) {
    return await prisma.contract.create({
      data: {
        userId,
        filename,
        fileHash,
        fileSize,
        contractType
      }
    });
  }

  async createReport(userId: string, contractId: string, summary: string, riskLevel: RiskLevel, reportHash: string, structuredOutput: string) {
    return await prisma.report.create({
      data: {
        userId,
        contractId,
        summary,
        riskLevel,
        reportHash,
        structuredOutput
      }
    });
  }

  async getReportById(reportId: string) {
    return await prisma.report.findUnique({
      where: { id: reportId },
      include: { contract: true }
    });
  }
}

export const aiRepository = new AIRepository();
