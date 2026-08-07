export interface VerifyReportRequestDTO {
  reportData: any;
  txId?: string;
}

export interface VerifyTxResponseDTO {
  status: "VERIFIED" | "TAMPERED" | "NOT_FOUND";
  isAuthentic: boolean;
  txId: string;
  confirmedRound: number;
  recordedReportHash: string;
  recordedContractHash: string;
  explorerUrl: string;
  message: string;
}
