import { NextRequest, NextResponse } from "next/server";
import { validateRequestSession } from "@/blockchain/auth/middleware/auth.middleware";
import { auditRepository } from "@/enterprise/repository/audit.repository";

export async function GET(req: NextRequest) {
  try {
    await validateRequestSession(req);
    
    const limit = Number(req.nextUrl.searchParams.get("limit") || 50);
    const logs = await auditRepository.getLogs(limit);

    const serializedLogs = JSON.parse(JSON.stringify(logs, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    ));

    return NextResponse.json({
      success: true,
      data: serializedLogs,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: error.statusCode || 401 });
  }
}
