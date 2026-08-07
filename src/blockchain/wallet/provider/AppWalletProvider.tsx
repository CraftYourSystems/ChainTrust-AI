"use client";

import React from "react";
import * as TxnLab from "@txnlab/use-wallet";

export function AppWalletProvider({ children }: { children: React.ReactNode }) {
  const TxnLabAny = TxnLab as any;
  const WalletProvider = TxnLabAny.WalletProvider || (({ children }: any) => <>{children}</>);
  const useInitializeProviders = TxnLabAny.useInitializeProviders || (() => []);
  const PROVIDER_ID = TxnLabAny.PROVIDER_ID || { PERA: "pera", DEFLY: "defly" };

  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA },
      { id: PROVIDER_ID.DEFLY },
    ],
    nodeConfig: {
      network: "testnet",
      nodeServer: "https://testnet-api.algonode.cloud",
      nodePort: "443",
      nodeToken: "",
    },
    algosdkStatic: undefined,
  });

  return (
    <WalletProvider value={walletProviders}>
      {children}
    </WalletProvider>
  );
}
