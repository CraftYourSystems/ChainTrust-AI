import { NextRequest, NextResponse } from "next/server";
import { validateRequestSession } from "@/blockchain/auth/middleware/auth.middleware";
import { paymentService } from "../service/payment.service";
import { PaymentRequiredError } from "../errors/payment.errors";

/**
 * Middleware function enforcing x402 payment requirements for protected AI routes.
 */
export async function withX402Payment(handler: (req: NextRequest, sessionContext: any) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    // 1. Auth Check (Must be logged in first)
    let sessionContext;
    try {
      sessionContext = await validateRequestSession(req);
    } catch (error: any) {
      return NextResponse.json({ success: false, error: { message: "Authentication required before payment" } }, { status: 401 });
    }

    const userId = sessionContext.payload.userId;

    // 2. Check for Payment Proof Headers / Body
    const txId = req.headers.get("x-payment-txid") || req.headers.get("x-algorand-txid");
    const quoteId = req.headers.get("x-payment-quote-id");

    if (!txId || !quoteId) {
      // Return HTTP 402 Payment Required with a fresh quote
      const quote = await paymentService.createQuote(userId);
      
      const responseBody = {
        error: "Payment Required",
        code: 402,
        message: "This service requires an Algorand payment. Please submit payment using the provided quote details.",
        quote
      };

      const response = NextResponse.json(responseBody, { status: 402 });
      response.headers.set("WWW-Authenticate", `x402 quoteId="${quote.quoteId}", recipient="${quote.recipient}", amount="${quote.amount}"`);
      return response;
    }

    // 3. Verify Payment Proof
    try {
      await paymentService.verifyAndRecordPayment(userId, quoteId, txId);
      // Access Granted - proceed to protected route handler
      return await handler(req, sessionContext);
    } catch (error: any) {
      const statusCode = error.statusCode || 400;
      return NextResponse.json({
        success: false,
        error: { code: error.code || "PAYMENT_FAILED", message: error.message }
      }, { status: statusCode });
    }
  };
}
