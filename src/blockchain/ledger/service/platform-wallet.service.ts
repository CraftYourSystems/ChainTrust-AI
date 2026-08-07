import algosdk from "algosdk";
import { KeyManagementError } from "../errors/ledger.errors";

export class PlatformWalletService {
  private account: algosdk.Account | null = null;

  constructor() {
    this.initializeAccount();
  }

  private initializeAccount() {
    const mnemonic = process.env.PLATFORM_MNEMONIC;
    if (mnemonic) {
      try {
        this.account = algosdk.mnemonicToSecretKey(mnemonic);
      } catch (err: any) {
        throw new KeyManagementError(`Invalid PLATFORM_MNEMONIC: ${err.message}`);
      }
    } else {
      // Fallback to an ephemeral test account for development/testing environments
      this.account = algosdk.generateAccount();
      console.log(`[PLATFORM WALLET] Auto-generated ephemeral test account: ${this.account.addr}`);
    }
  }

  getAccount(): algosdk.Account {
    if (!this.account) {
      this.initializeAccount();
    }
    return this.account!;
  }

  getAddress(): string {
    const addr = this.getAccount().addr;
    return typeof addr === "string" ? addr : (addr as any).toString();
  }
}

export const platformWalletService = new PlatformWalletService();
