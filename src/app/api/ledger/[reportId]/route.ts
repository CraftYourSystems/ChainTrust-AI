import { NextRequest, NextResponse } from "next/server";
import { ledgerRepository } from "@/blockchain/ledger/repository/ledger.repository";

export async function GET(req: NextRequest, { params }: { params: { reportId?: string } }) {
  try {
    const reportId = params.reportId;
    if (!reportId) {
      return NextResponse.json({ success: false, error: { message: "reportId is required" } }, { status: 400 });
    }

    const record = await ledgerRepository.getLedgerRecordByReportId(reportId);
    if (!record) {
      return NextResponse.json({ success: false, error: { message: "Ledger proof record not found" } }, { status: 404 });
    }

    const serializedRecord = JSON.parse(JSON.stringify(record, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    ));

    return NextResponse.json({
      success: true,
      data: serializedRecord,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
