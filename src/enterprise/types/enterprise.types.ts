export interface ServiceHealthStatus {
  status: "HEALTHY" | "DEGRADED" | "UNHEALTHY";
  latencyMs: number;
  message?: string;
}

export interface SystemHealthReport {
  status: "OPERATIONAL" | "DEGRADED" | "DOWN";
  network: string;
  components: {
    algod: ServiceHealthStatus;
    indexer: ServiceHealthStatus;
    database: ServiceHealthStatus;
  };
  metrics: {
    activeSessions: number;
    totalPaymentsVerified: number;
    totalReportsGenerated: number;
    totalProofRecordsOnChain: number;
  };
  timestamp: string;
}
