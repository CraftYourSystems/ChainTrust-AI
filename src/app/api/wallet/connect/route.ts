import { NextRequest, NextResponse } from "next/server";
import { emitWalletConnected } from "@/blockchain/wallet/events/wallet.events";
import { validateAlgorandAddress } from "@/blockchain/wallet/middleware/validation.middleware";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, provider } = body;

    // Validate
    validateAlgorandAddress(address);

    // Emit event for audit logs
    emitWalletConnected(address, provider);

    // Acknowledge connection state (Unverified context)
    // Note: No backend authenticated session is created here.
    return NextResponse.json({
      success: true,
      data: {
        connected: true,
        address,
        status: "connected_unverified",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 400 });
  }
}
