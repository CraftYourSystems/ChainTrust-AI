import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Global backend wallet service status
  return NextResponse.json({
    success: true,
    data: {
      status: "operational",
      version: "1.0.0"
    },
    timestamp: new Date().toISOString()
  });
}
