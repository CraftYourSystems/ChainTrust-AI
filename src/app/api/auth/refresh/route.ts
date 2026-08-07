import { NextRequest, NextResponse } from "next/server";
import { validateRequestSession } from "@/blockchain/auth/middleware/auth.middleware";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-fallback-key-change-in-prod");

export async function POST(req: NextRequest) {
  try {
    // 1. Validate existing (unexpired) session
    const { payload, session } = await validateRequestSession(req);

    // 2. Refresh JWT
    const newJwt = await new SignJWT({
      sessionId: session.sessionId,
      userId: payload.userId,
      walletAddress: payload.walletAddress
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      data: { sessionId: session.sessionId },
      timestamp: new Date().toISOString()
    });

    response.cookies.set("auth_token", newJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 401 });
  }
}
