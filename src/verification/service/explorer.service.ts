import { algorandConfig } from "@/services/algorand/config";

export class ExplorerService {
  /**
   * Generates a direct clickable link to the transaction on an Algorand Block Explorer.
   */
  getTxExplorerUrl(txId: string): string {
    const isTestnet = algorandConfig.network.toLowerCase() === "testnet";
    
    if (isTestnet) {
      return `https://testnet.explorer.perawallet.app/tx/${txId}`;
    }
    return `https://explorer.perawallet.app/tx/${txId}`;
  }
}

export const explorerService = new ExplorerService();
