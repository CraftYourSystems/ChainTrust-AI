export interface JwtPayload {
  sessionId: string;
  userId: string;
  walletAddress: string;
  iat: number;
  exp: number;
}
