export class WalletError extends Error {
  public code: string;
  public statusCode: number;

  constructor(message: string, code: string, statusCode: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class WalletConnectionError extends WalletError {
  constructor(message: string = "Failed to connect to wallet provider") {
    super(message, "WALLET_CONNECTION_ERROR", 500);
  }
}

export class WalletNotFoundError extends WalletError {
  constructor(address: string) {
    super(`Wallet account not found for address: ${address}`, "WALLET_NOT_FOUND", 404);
  }
}

export class InvalidAddressError extends WalletError {
  constructor(address: string) {
    super(`Invalid Algorand address format: ${address}`, "INVALID_ADDRESS", 400);
  }
}

export class NetworkUnavailableError extends WalletError {
  constructor(network: string) {
    super(`Network unavailable: ${network}`, "NETWORK_UNAVAILABLE", 503);
  }
}

export class WalletProviderError extends WalletError {
  constructor(message: string) {
    super(message, "WALLET_PROVIDER_ERROR", 500);
  }
}
