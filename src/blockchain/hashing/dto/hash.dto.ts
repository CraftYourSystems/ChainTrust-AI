export interface VerifyHashRequestDTO {
  reportId?: string;
  reportData: any;
  expectedHash: string;
}

export interface HashRecordResponseDTO {
  id: string;
  reportId: string;
  contractHash: string;
  reportHash: string;
  combinedHash: string;
  canonicalJson: string;
  createdAt: string;
}
