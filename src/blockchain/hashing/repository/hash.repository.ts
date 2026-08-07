import prisma from "@/lib/db";

export class HashRepository {
  async createHashRecord(userId: string, reportId: string, contractHash: string, reportHash: string, combinedHash: string, canonicalJson: string) {
    return await prisma.hashRecord.create({
      data: {
        userId,
        reportId,
        contractHash,
        reportHash,
        combinedHash,
        canonicalJson
      }
    });
  }

  async getHashRecordByReportId(reportId: string) {
    return await prisma.hashRecord.findUnique({
      where: { reportId },
      include: { report: true }
    });
  }
}

export const hashRepository = new HashRepository();
