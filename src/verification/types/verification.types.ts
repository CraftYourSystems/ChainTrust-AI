export type TamperStatus = "VERIFIED" | "TAMPERED" | "NOT_FOUND";

export interface OnChainProofDetails {
  txId: string;
  confirmedRound: number;
  recordedReportHash: string;
  recordedContractHash: string;
  explorerUrl: string;
  recordedAt?: string;
  senderAddress?: string;
}

export interface VerificationResultPayload {
  status: TamperStatus;
  isAuthentic: boolean;
  computedReportHash: string;
  proofDetails?: OnChainProofDetails;
  message: string;
}
