export interface HashReportResult {
  reportHash: string;
  contractHash: string;
  combinedHash: string;
  canonicalJson: string;
}

export interface VerificationResult {
  isValid: boolean;
  computedHash: string;
  expectedHash: string;
}
