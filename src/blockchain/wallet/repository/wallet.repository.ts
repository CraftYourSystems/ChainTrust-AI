import { algodClient, algorandClient } from "@/services/algorand/client";
const indexerClient = algorandClient.indexer;
import { NetworkUnavailableError, WalletNotFoundError, WalletProviderError } from "../errors/wallet.errors";

/**
 * WalletRepository isolates all direct Algorand SDK calls from the business logic.
 */
export class WalletRepository {
  /**
   * Fetches account information from Algod Node.
   */
  async getAccountInformation(address: string) {
    try {
      const accountInfo = await algodClient.accountInformation(address).do();
      return accountInfo;
    } catch (error: any) {
      if (error?.status === 404 || error?.message?.includes('not found')) {
        throw new WalletNotFoundError(address);
      }
      throw new WalletProviderError(`Algod lookup failed: ${error.message}`);
    }
  }

  /**
   * Fetches account information from Indexer (can be slightly delayed compared to Algod).
   */
  async getAccountFromIndexer(address: string) {
    try {
      const response = await indexerClient.lookupAccountByID(address).do();
      return response.account;
    } catch (error: any) {
      if (error?.status === 404 || error?.message?.includes('not found')) {
        throw new WalletNotFoundError(address);
      }
      throw new WalletProviderError(`Indexer lookup failed: ${error.message}`);
    }
  }

  /**
   * Gets the current node status to determine network and round.
   */
  async getNodeStatus() {
    try {
      return await algodClient.status().do();
    } catch (error: any) {
      throw new NetworkUnavailableError("Algod Node");
    }
  }
}

export const walletRepository = new WalletRepository();
