export interface ChallengeRequestDTO {
  walletAddress: string;
}

export interface VerifyRequestDTO {
  walletAddress: string;
  signature: string; // Base64 or Hex encoded signature
}

export interface ChallengeResponseDTO {
  challenge: string;
  expiresIn: number;
}
