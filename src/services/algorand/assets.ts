import { indexerClient } from "./indexer";
import { logAlgorandAction } from "./utils";

/**
 * Get information about a specific Algorand Standard Asset (ASA).
 */
export async function getAssetInfo(assetId: number) {
  try {
    const response = await indexerClient.lookupAssetByID(assetId).do();
    return response.asset;
  } catch (error: any) {
    logAlgorandAction("Get Asset Info Error", { assetId, error: error.message });
    throw error;
  }
}
