import { NextRequest, NextResponse } from "next/server";
import { hashRepository } from "@/blockchain/hashing/repository/hash.repository";

export async function GET(req: NextRequest, { params }: { params: { reportId?: string } }) {
  try {
    const reportId = params.reportId;
    if (!reportId) {
      return NextResponse.json({ success: false, error: { message: "reportId is required" } }, { status: 400 });
    }

    const record = await hashRepository.getHashRecordByReportId(reportId);
    if (!record) {
      return NextResponse.json({ success: false, error: { message: "Hash record not found" } }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: record,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
