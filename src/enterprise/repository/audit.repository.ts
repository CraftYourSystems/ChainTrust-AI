import prisma from "@/lib/db";

export class AuditRepository {
  async createLog(action: string, resource: string, userId?: string, ip?: string, userAgent?: string, metadata?: any) {
    return await prisma.auditLog.create({
      data: {
        userId: userId || null,
        action,
        resource,
        ip: ip || null,
        userAgent: userAgent || null,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
  }

  async getLogs(limit: number = 50) {
    return await prisma.auditLog.findMany({
      take: limit,
      orderBy: { timestamp: "desc" },
      include: { user: true }
    });
  }
}

export const auditRepository = new AuditRepository();
