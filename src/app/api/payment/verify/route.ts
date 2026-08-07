import { NextRequest, NextResponse } from "next/server";
import { validateRequestSession } from "@/blockchain/auth/middleware/auth.middleware";
import { paymentService } from "@/blockchain/payment/service/payment.service";

export async function POST(req: NextRequest) {
  try {
    const { payload } = await validateRequestSession(req);
    const body = await req.json();
    const { quoteId, txId } = body;

    if (!quoteId || !txId) {
      return NextResponse.json({ success: false, error: { message: "Both quoteId and txId are required" } }, { status: 400 });
    }

    const payment = await paymentService.verifyAndRecordPayment(payload.userId, quoteId, txId);

    const serializedPayment = JSON.parse(JSON.stringify(payment, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    ));

    return NextResponse.json({
      success: true,
      data: serializedPayment,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { code: error.code || "VERIFY_ERROR", message: error.message } }, { status: error.statusCode || 400 });
  }
}
