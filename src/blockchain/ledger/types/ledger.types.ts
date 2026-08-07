export type LedgerStatusType = "SUBMITTED" | "CONFIRMED" | "FAILED";

export interface OnChainProofResult {
  txId: string;
  confirmedRound: number;
  notePayload: string;
  senderAddress: string;
  status: LedgerStatusType;
}
