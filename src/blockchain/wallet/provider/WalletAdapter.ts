import { NetworkType, ConnectionStatus, WalletProviderType } from "../types/wallet.types";

export interface WalletAdapter {
  connect(providerId: string): Promise<void>;
  disconnect(): Promise<void>;
  getActiveAddress(): string | null;
  getActiveProvider(): WalletProviderType | null;
  getStatus(): ConnectionStatus;
  getNetwork(): NetworkType;
}
