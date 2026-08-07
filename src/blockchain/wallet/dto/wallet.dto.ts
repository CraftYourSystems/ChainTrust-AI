import { WalletProviderType, NetworkType, ConnectionStatus, WalletInfo } from "../types/wallet.types";
export type { WalletInfo };

export interface ConnectWalletDTO {
  address: string;
  provider: WalletProviderType;
  network: NetworkType;
}

export interface WalletStatusDTO {
  connected: boolean;
  address: string | null;
  status: ConnectionStatus;
}

export interface WalletInfoResponseDTO {
  wallet: WalletInfo;
  success: boolean;
}

// Responses for standard API routes
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  timestamp: string;
}
