import prisma from "@/lib/db";

export class AuthRepository {
  async getOrCreateUser(walletAddress: string) {
    let user = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress }
      });
      
      await prisma.wallet.create({
        data: {
          walletAddress,
          provider: "unknown",
          network: "unknown"
        }
      });
    }

    return user;
  }

  async createChallengeNonce(walletAddress: string, nonce: string, expiresAt: Date) {
    return await prisma.challengeNonce.create({
      data: {
        wallet: walletAddress,
        nonce,
        expiresAt,
        used: false
      }
    });
  }

  async getValidNonce(nonce: string, walletAddress: string) {
    return await prisma.challengeNonce.findFirst({
      where: {
        nonce,
        wallet: walletAddress,
        used: false,
        expiresAt: {
          gt: new Date()
        }
      }
    });
  }

  async getNonce(nonce: string) {
    return await prisma.challengeNonce.findUnique({
      where: { nonce }
    });
  }

  async markNonceUsed(nonce: string) {
    return await prisma.challengeNonce.update({
      where: { nonce },
      data: { used: true }
    });
  }

  async createSession(userId: string, expiresAt: Date, ip?: string, userAgent?: string) {
    return await prisma.session.create({
      data: {
        userId,
        expiresAt,
        ip,
        userAgent
      }
    });
  }

  async getSession(sessionId: string) {
    return await prisma.session.findUnique({
      where: { sessionId },
      include: { user: true }
    });
  }

  async revokeSession(sessionId: string) {
    return await prisma.session.update({
      where: { sessionId },
      data: { revoked: true }
    });
  }

  async updateLastLogin(userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() }
    });
  }
}

export const authRepository = new AuthRepository();
