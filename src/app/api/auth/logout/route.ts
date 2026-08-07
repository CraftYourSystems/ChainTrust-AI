import { NextRequest, NextResponse } from "next/server";
import { authRepository } from "@/blockchain/auth/repository/auth.repository";
import { validateRequestSession } from "@/blockchain/auth/middleware/auth.middleware";
import { emitSessionRevoked } from "@/blockchain/auth/events/auth.events";

export async function POST(req: NextRequest) {
  try {
    const { payload } = await validateRequestSession(req);
    
    // Revoke the session in DB
    await authRepository.revokeSession(payload.sessionId);
    emitSessionRevoked(payload.sessionId);

    const response = NextResponse.json({
      success: true,
      data: { message: "Logged out successfully" },
      timestamp: new Date().toISOString()
    });

    // Clear cookie
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    // Even if validation fails, try to clear cookie
    const response = NextResponse.json({ success: false, error: { message: error.message } }, { status: 401 });
    response.cookies.set("auth_token", "", { maxAge: 0 });
    return response;
  }
}
