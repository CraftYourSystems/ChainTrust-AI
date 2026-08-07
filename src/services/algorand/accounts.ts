import { algodClient } from "./client";
import { indexerClient } from "./indexer";
import { logAlgorandAction } from "./utils";

/**
 * Get account information including balance from the Algod node.
 */
export async function getAccountInfo(address: string) {
  try {
    const accountInfo = await algodClient.accountInformation(address).do();
    return accountInfo;
  } catch (error: any) {
    logAlgorandAction("Get Account Info Error", { address, error: error.message });
    throw error;
  }
}

/**
 * Get account transaction history from the Indexer.
 */
export async function getAccountTransactions(address: string, limit = 10) {
  try {
    const response = await indexerClient.lookupAccountTransactions(address).limit(limit).do();
    return response.transactions;
  } catch (error: any) {
    logAlgorandAction("Get Account Transactions Error", { address, error: error.message });
    throw error;
  }
}
