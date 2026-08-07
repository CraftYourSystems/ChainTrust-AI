import { NextRequest, NextResponse } from "next/server";
import { validateRequestSession } from "@/blockchain/auth/middleware/auth.middleware";
import { ledgerRecordingService } from "@/blockchain/ledger/service/ledger-recording.service";

export async function POST(req: NextRequest) {
  try {
    const { payload } = await validateRequestSession(req);
    const body = await req.json();
    const { reportId } = body;

    if (!reportId) {
      return NextResponse.json({ success: false, error: { message: "reportId is required" } }, { status: 400 });
    }

    const record = await ledgerRecordingService.recordProofOnLedger(payload.userId, reportId);

    const serializedRecord = JSON.parse(JSON.stringify(record, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    ));

    return NextResponse.json({
      success: true,
      data: serializedRecord,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: { code: error.code || "LEDGER_ERROR", message: error.message }
    }, { status: error.statusCode || 500 });
  }
}
