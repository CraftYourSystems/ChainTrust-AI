import { EventEmitter } from "events";
import { WalletInfo } from "../types/wallet.types";

class WalletEventEmitter extends EventEmitter {}

export const walletEvents = new WalletEventEmitter();

// Define standard event names
export const EventTypes = {
  WALLET_CONNECTED: "WalletConnected",
  WALLET_DISCONNECTED: "WalletDisconnected",
  BALANCE_LOOKUP_FAILED: "BalanceLookupFailed",
};

// Strongly typed event emitters
export function emitWalletConnected(address: string, provider: string) {
  walletEvents.emit(EventTypes.WALLET_CONNECTED, { address, provider, timestamp: new Date().toISOString() });
}

export function emitWalletDisconnected(address: string) {
  walletEvents.emit(EventTypes.WALLET_DISCONNECTED, { address, timestamp: new Date().toISOString() });
}

export function emitBalanceLookupFailed(address: string, error: string) {
  walletEvents.emit(EventTypes.BALANCE_LOOKUP_FAILED, { address, error, timestamp: new Date().toISOString() });
}

// Log events for observability (can be wired to a real logger later)
walletEvents.on(EventTypes.WALLET_CONNECTED, (data) => console.log(`[EVENT] ${EventTypes.WALLET_CONNECTED}`, data));
walletEvents.on(EventTypes.WALLET_DISCONNECTED, (data) => console.log(`[EVENT] ${EventTypes.WALLET_DISCONNECTED}`, data));
walletEvents.on(EventTypes.BALANCE_LOOKUP_FAILED, (data) => console.error(`[EVENT] ${EventTypes.BALANCE_LOOKUP_FAILED}`, data));
