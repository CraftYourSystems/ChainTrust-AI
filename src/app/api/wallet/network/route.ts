import { NextRequest, NextResponse } from "next/server";
import { algorandConfig } from "@/services/algorand/config";
import { walletRepository } from "@/blockchain/wallet/repository/wallet.repository";

export async function GET(req: NextRequest) {
  try {
    const status = await walletRepository.getNodeStatus();
    
    return NextResponse.json({
      success: true,
      data: {
        network: algorandConfig.network,
        // algosdk v3 returns round numbers as BigInt, which JSON.stringify
        // cannot serialize. Same conversion as /api/ledger/record.
        round: ((status as any).lastRound ?? (status as any)["last-round"] ?? 0).toString(),
        provider: algorandConfig.provider
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 503 });
  }
}
