export interface AuditLogDTO {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  ip?: string;
  userAgent?: string;
  metadata?: any;
  timestamp: string;
}

export interface HealthCheckResponseDTO {
  status: string;
  network: string;
  components: any;
  metrics: any;
  timestamp: string;
}
