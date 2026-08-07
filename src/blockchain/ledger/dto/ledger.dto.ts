export interface RecordProofRequestDTO {
  reportId: string;
}

export interface LedgerRecordResponseDTO {
  id: string;
  reportId: string;
  txId: string;
  confirmedRound: string;
  notePayload: string;
  senderAddress: string;
  status: string;
  createdAt: string;
}
