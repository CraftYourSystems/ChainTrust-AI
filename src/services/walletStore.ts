/**
 * walletStore.ts — Global singleton for Demo Wallet state.
 * Persists to localStorage so balance survives page refreshes.
 * Dispatches 'wallet-balance-updated' event on every change so
 * React components can subscribe and re-render.
 */

export const DEMO_WALLET = "PIKPW7D6G4RCGAU35ACWQWGXDCOYYGGD35L3BTNU27CGVU7GTNVALN3VAY";
export const STARTING_BALANCE = 10.0;
const STORAGE_KEY = "ct_wallet";

export interface WalletState {
  address: string | null;
  balance: number;
  connected: boolean;
}

function defaultState(): WalletState {
  return { address: null, balance: STARTING_BALANCE, connected: false };
}

function load(): WalletState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as WalletState;
  } catch {}
  return defaultState();
}

function save(state: WalletState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("wallet-balance-updated"));
}

export const walletStore = {
  /** Connect a wallet address. Preserves existing balance if already connected once. */
  connect(address: string = DEMO_WALLET): void {
    const current = load();
    // If connecting for first time, start with full balance
    const balance = current.connected ? current.balance : STARTING_BALANCE;
    save({ address, balance, connected: true });
  },

  /** Disconnect wallet and reset balance back to starting amount. */
  disconnect(): void {
    save(defaultState());
  },

  /**
   * Deduct a fee from the wallet balance.
   * Returns true on success, false if insufficient funds.
   */
  deductFee(amountAlgo: number): boolean {
    const state = load();
    if (!state.connected) return false;
    if (state.balance < amountAlgo) return false;
    const newBalance = Math.round((state.balance - amountAlgo) * 10) / 10;
    save({ ...state, balance: newBalance });
    return true;
  },

  getState(): WalletState {
    return load();
  },

  getBalance(): number {
    return load().balance;
  },

  getAddress(): string | null {
    return load().address;
  },

  isConnected(): boolean {
    return load().connected;
  },
};
