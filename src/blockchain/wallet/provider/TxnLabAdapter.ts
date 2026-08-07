"use client";

import { WalletAdapter } from "./WalletAdapter";
import { NetworkType, ConnectionStatus, WalletProviderType } from "../types/wallet.types";

/**
 * Concrete implementation of WalletAdapter using @txnlab/use-wallet.
 */
export class TxnLabAdapter implements WalletAdapter {
  private useWalletHook: any;
  private configuredNetwork: NetworkType;

  constructor(hook: any, network: NetworkType = "testnet") {
    this.useWalletHook = hook;
    this.configuredNetwork = network;
  }

  async connect(providerId: string): Promise<void> {
    const provider = this.useWalletHook?.providers?.find((p: any) => p.metadata.id.toLowerCase().includes(providerId.toLowerCase()));
    if (!provider) {
      throw new Error(`Provider ${providerId} not found or not initialized`);
    }
    await provider.connect();
  }

  async disconnect(): Promise<void> {
    const provider = this.useWalletHook?.activeAccount?.providerId;
    if (provider) {
      const activeProvider = this.useWalletHook?.providers?.find((p: any) => p.metadata.id === provider);
      if (activeProvider) {
        await activeProvider.disconnect();
      }
    }
  }

  getActiveAddress(): string | null {
    return this.useWalletHook?.activeAddress || null;
  }

  getActiveProvider(): WalletProviderType | null {
    return (this.useWalletHook?.activeAccount?.providerId as WalletProviderType) || null;
  }

  getStatus(): ConnectionStatus {
    return this.useWalletHook?.activeAddress ? "connected" : "disconnected";
  }

  getNetwork(): NetworkType {
    return this.configuredNetwork;
  }
}
