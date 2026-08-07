import { NextRequest, NextResponse } from "next/server";
import { walletService } from "@/blockchain/wallet/service/wallet.service";
import { withAddressValidation } from "@/blockchain/wallet/middleware/validation.middleware";
import { ApiSuccessResponse } from "@/blockchain/wallet/dto/wallet.dto";

async function getBalance(req: NextRequest, { params }: { params: { address?: string } }) {
  const address = params.address!;
  const balance = await walletService.getBalance(address);

  const response: ApiSuccessResponse<{ balance: string }> = {
    success: true,
    data: { balance: balance.toString() },
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(response);
}

export const GET = withAddressValidation(getBalance);
