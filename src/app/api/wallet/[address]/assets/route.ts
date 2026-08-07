import { NextRequest, NextResponse } from "next/server";
import { walletService } from "@/blockchain/wallet/service/wallet.service";
import { withAddressValidation } from "@/blockchain/wallet/middleware/validation.middleware";
import { ApiSuccessResponse } from "@/blockchain/wallet/dto/wallet.dto";

async function getAssets(req: NextRequest, { params }: { params: { address?: string } }) {
  const address = params.address!;
  const info = await walletService.getWalletInfo(address);

  const serializedAssets = JSON.parse(JSON.stringify(info.assets, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));

  const response = {
    success: true,
    data: serializedAssets,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(response);
}

export const GET = withAddressValidation(getAssets);
