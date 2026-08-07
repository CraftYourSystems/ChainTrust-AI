import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/blockchain/auth/service/auth.service";
import { validateAlgorandAddress } from "@/blockchain/wallet/middleware/validation.middleware";
import { withRateLimit } from "@/blockchain/auth/middleware/auth.middleware";

async function verifyHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, signature, message } = body;

    validateAlgorandAddress(walletAddress);

    if (!signature || !message) {
      return NextResponse.json({ success: false, error: { message: "Signature and original message are required" } }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const { jwt, session } = await authService.verifySignatureAndCreateSession(walletAddress, signature, message, ip, userAgent);

    const response = NextResponse.json({
      success: true,
      data: { sessionId: session.sessionId },
      timestamp: new Date().toISOString()
    });

    response.cookies.set("auth_token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    const status = error.statusCode || 400;
    return NextResponse.json({ success: false, error: { code: error.code || "VERIFY_ERROR", message: error.message } }, { status });
  }
}

export const POST = withRateLimit(verifyHandler, 10, 60000); // 10 reqs per minute
