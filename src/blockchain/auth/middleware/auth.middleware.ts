import { NextRequest, NextResponse } from "next/server";
import { authService } from "../service/auth.service";
import { authRepository } from "../repository/auth.repository";
import { SessionExpiredError, SessionRevokedError } from "../errors/auth.errors";

/**
 * Middleware function to validate JWT tokens and database revocation status.
 */
export async function validateRequestSession(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value || req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Missing authentication token");
  }

  const payload = await authService.validateSession(token);
  
  const session = await authRepository.getSession(payload.sessionId);
  if (!session) throw new SessionExpiredError();
  if (session.revoked) throw new SessionRevokedError();
  if (session.expiresAt < new Date()) throw new SessionExpiredError();

  return { payload, session };
}

// In-memory rate limiter store
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

export function checkRateLimit(ip: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const record = rateLimitStore.get(ip) || { count: 0, timestamp: now };

  if (now - record.timestamp > windowMs) {
    record.count = 0;
    record.timestamp = now;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  rateLimitStore.set(ip, record);
  return true;
}

export function withRateLimit(handler: (req: NextRequest, params?: any) => Promise<NextResponse>, maxReq: number, windowMs: number) {
  return async (req: NextRequest, params: any) => {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    if (!checkRateLimit(ip, maxReq, windowMs)) {
      return NextResponse.json({ success: false, error: { message: "Too many requests, please try again later" } }, { status: 429 });
    }
    return await handler(req, params);
  };
}

