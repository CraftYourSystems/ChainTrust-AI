import { NextRequest, NextResponse } from "next/server";
import { validateRequestSession } from "@/blockchain/auth/middleware/auth.middleware";

export async function GET(req: NextRequest) {
  try {
    const { payload, session } = await validateRequestSession(req);

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.sessionId,
        walletAddress: payload.walletAddress,
        expiresAt: session.expiresAt
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 401 });
  }
}
