import crypto from "crypto";
import algosdk from "algosdk";
import { SignJWT, jwtVerify } from "jose";
import { authRepository } from "../repository/auth.repository";
import { 
  ChallengeExpiredError, 
  InvalidSignatureError, 
  NonceNotFoundError, 
  ReplayAttackError 
} from "../errors/auth.errors";
import { 
  emitChallengeGenerated, 
  emitReplayAttemptDetected, 
  emitSignatureInvalid, 
  emitSessionCreated 
} from "../events/auth.events";
import { algorandConfig } from "@/services/algorand/config";
import { JwtPayload } from "../types/auth.types";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-fallback-key-change-in-prod");

export class AuthService {
  /**
   * Generates a secure random nonce and structured challenge message, saving it to the DB.
   */
  async generateChallenge(walletAddress: string) {
    const nonce = crypto.randomBytes(32).toString("hex");
    const timestamp = new Date().toISOString();
    
    // Expires in 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    await authRepository.createChallengeNonce(walletAddress, nonce, expiresAt);
    
    emitChallengeGenerated(walletAddress, nonce);

    const message = this.formatChallengeMessage(walletAddress, nonce, timestamp);
    return { challenge: message, expiresIn: 300 }; // 300 seconds
  }

  /**
   * Verifies the signature, checks replay protection via DB, and creates a session.
   */
  async verifySignatureAndCreateSession(walletAddress: string, signatureHex: string, rawMessage: string, ip?: string, userAgent?: string) {
    // 1. Extract nonce from the raw message
    const nonceMatch = rawMessage.match(/Nonce:\s*([a-f0-9]{64})/i);
    if (!nonceMatch) {
      throw new InvalidSignatureError();
    }
    const extractedNonce = nonceMatch[1];

    // 2. Validate Nonce in DB
    const nonceRecord = await authRepository.getNonce(extractedNonce);
    
    if (!nonceRecord) {
      throw new NonceNotFoundError();
    }
    
    if (nonceRecord.wallet !== walletAddress) {
      throw new InvalidSignatureError();
    }

    if (nonceRecord.used) {
      emitReplayAttemptDetected(walletAddress, extractedNonce);
      throw new ReplayAttackError();
    }

    if (nonceRecord.expiresAt < new Date()) {
      throw new ChallengeExpiredError();
    }

    // 3. Cryptographically verify signature using Algorand SDK
    const messageBytes = new Uint8Array(Buffer.from(rawMessage, "utf8"));
    const signatureBytes = new Uint8Array(Buffer.from(signatureHex, "hex"));

    const isValid = algosdk.verifyBytes(messageBytes, signatureBytes, walletAddress);
    
    if (!isValid) {
      emitSignatureInvalid(walletAddress);
      throw new InvalidSignatureError();
    }

    // 4. Mark Nonce as used
    await authRepository.markNonceUsed(extractedNonce);

    // 5. Create Session in DB
    const user = await authRepository.getOrCreateUser(walletAddress);
    await authRepository.updateLastLogin(user.id);

    const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await authRepository.createSession(user.id, sessionExpiresAt, ip, userAgent);

    emitSessionCreated(walletAddress, session.sessionId);

    // 6. Generate JWT
    const jwt = await new SignJWT({
      sessionId: session.sessionId,
      userId: user.id,
      walletAddress: walletAddress
    } as any)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    return { jwt, session };
  }

  /**
   * Formats a structured authentication challenge.
   */
  private formatChallengeMessage(walletAddress: string, nonce: string, timestamp: string): string {
    return `ChainTrust-AI Authentication

Wallet:
${walletAddress}

Nonce:
${nonce}

Timestamp:
${timestamp}

Purpose:
Authenticate

Network:
${algorandConfig.network}`;
  }

  /**
   * Validates a JWT token and cross-references DB session status.
   */
  async validateSession(token: string): Promise<JwtPayload> {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JwtPayload;
  }
}

export const authService = new AuthService();
