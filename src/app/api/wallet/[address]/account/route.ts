import { NextRequest, NextResponse } from "next/server";
import { walletService } from "@/blockchain/wallet/service/wallet.service";
import { withAddressValidation } from "@/blockchain/wallet/middleware/validation.middleware";
import { ApiSuccessResponse, WalletInfo } from "@/blockchain/wallet/dto/wallet.dto";

async function getAccountInfo(req: NextRequest, { params }: { params: Promise<{ address?: string }> }) {
  const { address } = await params;
  const info = await walletService.getWalletInfo(address!);

  // Note: JSON.stringify handles bigints implicitly here if we use a helper, 
  // but Next.js NextResponse.json does not support BigInt directly. 
  // We need to map BigInt to string.
  const serializedInfo = JSON.parse(JSON.stringify(info, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));

  const response: ApiSuccessResponse<WalletInfo> = {
    success: true,
    data: serializedInfo,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(response);
}

export const GET = withAddressValidation(getAccountInfo);
