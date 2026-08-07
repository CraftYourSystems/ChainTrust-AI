"use client";

import { useEffect, useState } from "react";
import * as TxnLab from "@txnlab/use-wallet";
import { TxnLabAdapter } from "../provider/TxnLabAdapter";
import { WalletAdapter } from "../provider/WalletAdapter";
import { ConnectionStatus } from "../types/wallet.types";

export function useWalletIdentity() {
  const useWalletHook = (TxnLab as any).useWallet ? (TxnLab as any).useWallet() : { activeAddress: null, activeAccount: null, providers: [] };
  const [adapter] = useState<WalletAdapter>(new TxnLabAdapter(useWalletHook));
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  
  const address = useWalletHook.activeAddress;
  const providerId = useWalletHook.activeAccount?.providerId;

  useEffect(() => {
    if (address && providerId) {
      setStatus("connecting");
      
      fetch("/api/wallet/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, provider: providerId }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus("connected");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
    } else {
      if (status !== "disconnected") {
        fetch("/api/wallet/disconnect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: null }),
        }).then(() => setStatus("disconnected"));
      }
    }
  }, [address, providerId]);

  return {
    adapter,
    address,
    status,
    providers: useWalletHook.providers,
    disconnect: () => adapter.disconnect(),
  };
}
