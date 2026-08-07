import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/blockchain/auth/service/auth.service";
import { validateAlgorandAddress } from "@/blockchain/wallet/middleware/validation.middleware";
import { withRateLimit } from "@/blockchain/auth/middleware/auth.middleware";

async function challengeHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress } = body;

    validateAlgorandAddress(walletAddress);

    const data = await authService.generateChallenge(walletAddress);

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 400 });
  }
}

export const POST = withRateLimit(challengeHandler, 5, 60000); // 5 reqs per minute
