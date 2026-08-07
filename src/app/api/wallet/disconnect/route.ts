import { NextRequest, NextResponse } from "next/server";
import { emitWalletDisconnected } from "@/blockchain/wallet/events/wallet.events";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address } = body;

    if (address) {
      emitWalletDisconnected(address);
    }

    return NextResponse.json({
      success: true,
      data: { connected: false, address: null },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 400 });
  }
}
