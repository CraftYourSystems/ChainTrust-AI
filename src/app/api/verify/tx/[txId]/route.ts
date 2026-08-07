import { NextRequest, NextResponse } from "next/server";
import { verificationPortalService } from "@/verification/service/verification-portal.service";

export async function GET(req: NextRequest, { params }: { params: { txId?: string } }) {
  try {
    const txId = params.txId;
    if (!txId) {
      return NextResponse.json({ success: false, error: { message: "txId is required" } }, { status: 400 });
    }

    const proofDetails = await verificationPortalService.fetchOnChainProofByTxId(txId);

    return NextResponse.json({
      success: true,
      data: proofDetails,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: error.statusCode || 500 });
  }
}
