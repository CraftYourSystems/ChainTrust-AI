import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Return the list of supported wallet providers
  const providers = [
    { id: "pera", name: "Pera Wallet", type: "mobile" },
    { id: "defly", name: "Defly Wallet", type: "mobile" },
    { id: "walletconnect", name: "WalletConnect", type: "universal" }
  ];

  return NextResponse.json({
    success: true,
    data: { providers },
    timestamp: new Date().toISOString()
  });
}
