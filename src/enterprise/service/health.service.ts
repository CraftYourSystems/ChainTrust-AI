import prisma from "@/lib/db";
import { algorandClient } from "@/services/algorand/client";
import { algorandConfig } from "@/services/algorand/config";
import { SystemHealthReport, ServiceHealthStatus } from "../types/enterprise.types";

export class HealthService {
  /**
   * Performs live health checks against Algod, Indexer, and PostgreSQL Database.
   */
  async checkSystemHealth(): Promise<SystemHealthReport> {
    const algodHealth = await this.checkAlgod();
    const indexerHealth = await this.checkIndexer();
    const dbHealth = await this.checkDatabase();

    const isAllHealthy = algodHealth.status === "HEALTHY" && indexerHealth.status === "HEALTHY" && dbHealth.status === "HEALTHY";
    const isAnyUnhealthy = algodHealth.status === "UNHEALTHY" || indexerHealth.status === "UNHEALTHY" || dbHealth.status === "UNHEALTHY";

    const overallStatus = isAllHealthy ? "OPERATIONAL" : isAnyUnhealthy ? "DOWN" : "DEGRADED";

    const metrics = await this.calculateMetrics();

    return {
      status: overallStatus,
      network: algorandConfig.network,
      components: {
        algod: algodHealth,
        indexer: indexerHealth,
        database: dbHealth
      },
      metrics,
      timestamp: new Date().toISOString()
    };
  }

  private async checkAlgod(): Promise<ServiceHealthStatus> {
    const start = Date.now();
    try {
      await algorandClient.algod.healthCheck().do();
      return { status: "HEALTHY", latencyMs: Date.now() - start };
    } catch (e: any) {
      return { status: "DEGRADED", latencyMs: Date.now() - start, message: e.message };
    }
  }

  private async checkIndexer(): Promise<ServiceHealthStatus> {
    const start = Date.now();
    try {
      await algorandClient.indexer.makeHealthCheck().do();
      return { status: "HEALTHY", latencyMs: Date.now() - start };
    } catch (e: any) {
      return { status: "DEGRADED", latencyMs: Date.now() - start, message: e.message };
    }
  }

  private async checkDatabase(): Promise<ServiceHealthStatus> {
    const start = Date.now();
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: "HEALTHY", latencyMs: Date.now() - start };
    } catch (e: any) {
      return { status: "DEGRADED", latencyMs: Date.now() - start, message: e.message };
    }
  }

  private async calculateMetrics() {
    try {
      const activeSessions = await prisma.session.count({ where: { revoked: false, expiresAt: { gt: new Date() } } });
      const totalPaymentsVerified = await prisma.payment.count();
      const totalReportsGenerated = await prisma.report.count();
      const totalProofRecordsOnChain = await prisma.ledgerRecord.count();

      return {
        activeSessions,
        totalPaymentsVerified,
        totalReportsGenerated,
        totalProofRecordsOnChain
      };
    } catch (e) {
      return {
        activeSessions: 0,
        totalPaymentsVerified: 0,
        totalReportsGenerated: 0,
        totalProofRecordsOnChain: 0
      };
    }
  }
}

export const healthService = new HealthService();
