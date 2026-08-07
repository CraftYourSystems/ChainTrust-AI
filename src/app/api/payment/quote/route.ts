import { NextRequest, NextResponse } from "next/server";
import { validateRequestSession } from "@/blockchain/auth/middleware/auth.middleware";
import { paymentService } from "@/blockchain/payment/service/payment.service";

export async function POST(req: NextRequest) {
  try {
    const { payload } = await validateRequestSession(req);
    const body = await req.json().catch(() => ({}));
    const purpose = body.purpose || "DUE_DILIGENCE";

    const quote = await paymentService.createQuote(payload.userId, purpose);

    return NextResponse.json({
      success: true,
      data: quote,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: error.statusCode || 400 });
  }
}
