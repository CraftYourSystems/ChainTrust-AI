import { NextRequest, NextResponse } from "next/server";
import { verificationPortalService } from "@/verification/service/verification-portal.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportData, txId } = body;

    if (!reportData) {
      return NextResponse.json({ success: false, error: { message: "reportData is required for verification" } }, { status: 400 });
    }

    const result = await verificationPortalService.verifyReportData(reportData, txId);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 400 });
  }
}
