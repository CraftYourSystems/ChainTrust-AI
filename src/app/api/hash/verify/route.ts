import { NextRequest, NextResponse } from "next/server";
import { hashService } from "@/blockchain/hashing/service/hash.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportData, expectedHash, reportId } = body;

    if (!reportData || !expectedHash) {
      return NextResponse.json({ success: false, error: { message: "Both reportData and expectedHash are required" } }, { status: 400 });
    }

    const result = hashService.verifyReportIntegrity(reportData, expectedHash, reportId);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 400 });
  }
}
