import { NextRequest, NextResponse } from "next/server";
import { withX402Payment } from "@/blockchain/payment/middleware/payment.middleware";
import { aiPipelineService } from "@/ai/service/ai-pipeline.service";

async function submitAnalysisHandler(req: NextRequest, sessionContext: any) {
  try {
    const userId = sessionContext.payload.userId;
    const body = await req.json();
    const { filename, contractText, contractType } = body;

    if (!filename || !contractText) {
      return NextResponse.json({ success: false, error: { message: "filename and contractText are required" } }, { status: 400 });
    }

    const reportResponse = await aiPipelineService.processAndAnalyze(
      userId,
      filename,
      contractText,
      contractType || "SMART_CONTRACT"
    );

    return NextResponse.json({
      success: true,
      data: reportResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: { code: error.code || "ANALYSIS_ERROR", message: error.message }
    }, { status: error.statusCode || 500 });
  }
}

// Protected by Auth & x402 Payment Middleware
export const POST = await withX402Payment(submitAnalysisHandler);
