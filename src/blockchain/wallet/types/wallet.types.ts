export type NetworkType = "mainnet" | "testnet" | "localnet" | "betanet";
export type WalletProviderType = "pera" | "defly" | "exodus" | "myalgo" | "walletconnect" | "mnemonic" | "custom";
export type ConnectionStatus = "connected" | "disconnected" | "connecting" | "error";

export interface AssetInfo {
  assetId: number;
  amount: bigint;
  isFrozen: boolean;
}

export interface AppOptIn {
  appId: number;
  isCreator: boolean;
}

export interface LocalState {
  appId: number;
  keyValue: Array<{ key: string; value: { bytes: string; type: number; uint: number } }>;
}

export interface GlobalState {
  keyValue: Array<{ key: string; value: { bytes: string; type: number; uint: number } }>;
}

export interface WalletInfo {
  address: string;
  network: NetworkType;
  balance: bigint; // microAlgos
  minimumBalance: bigint; // microAlgos
  assets: AssetInfo[];
  createdRound: number;
  status: string; // 'Offline', 'Online'
  isOnline: boolean;
  pendingRewards: bigint; // microAlgos
  totalAssets: number;
  appsOptedIn: AppOptIn[];
  localStates: LocalState[];
}

export interface WalletAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getActiveAddress(): string | null;
  getStatus(): ConnectionStatus;
  getNetwork(): NetworkType;
}
