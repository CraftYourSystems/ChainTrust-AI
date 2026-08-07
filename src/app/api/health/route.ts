import { NextRequest, NextResponse } from "next/server";
import { healthService } from "@/enterprise/service/health.service";

export async function GET(req: NextRequest) {
  try {
    const report = await healthService.checkSystemHealth();
    
    const statusCode = report.status === "OPERATIONAL" ? 200 : report.status === "DEGRADED" ? 200 : 503;

    return NextResponse.json({
      success: report.status !== "DOWN",
      data: report,
      timestamp: new Date().toISOString()
    }, { status: statusCode });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
