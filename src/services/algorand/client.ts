import algosdk from "algosdk";
import { algorandConfig } from "./config";
import { fetchWithRetry, logAlgorandAction } from "./utils";

// Custom fetcher for Algod client that implements our retry and timeout logic
async function algodCustomFetcher(
  req: RequestInit & { url: string }
): Promise<Uint8Array> {
  const { url, ...options } = req;
  const response = await fetchWithRetry(url, options);

  if (!response.ok) {
    let errorMsg = `Algod Request Failed: ${response.status} ${response.statusText}`;
    try {
      const text = await response.text();
      errorMsg += ` - ${text}`;
    } catch (e) {
      // Ignore text parsing errors
    }
    throw new Error(errorMsg);
  }

  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

// Initialize the Algod client
const token = algorandConfig.algod.token;
const server = algorandConfig.algod.server;
const port = algorandConfig.algod.port;

import { indexerClient } from "./indexer";

export const algodClient = new algosdk.Algodv2(token, server, port);

export const algorandClient = {
  algod: algodClient,
  indexer: indexerClient
};

/**
 * Checks the health of the Algod node.
 */
export async function checkAlgodHealth() {
  const startTime = Date.now();
  try {
    const status = await algodClient.status().do();
    const latency = Date.now() - startTime;
    const lastRound = (status as any).lastRound || (status as any)["last-round"];
    
    logAlgorandAction("Algod Health Check Success", { 
      latencyMs: latency, 
      round: lastRound
    });
    
    return {
      healthy: true,
      latency: `${latency}ms`,
      round: lastRound,
      network: algorandConfig.network
    };
  } catch (error: any) {
    logAlgorandAction("Algod Health Check Failed", { error: error.message });
    return {
      healthy: false,
      latency: null,
      round: null,
      network: algorandConfig.network,
      error: error.message
    };
  }
}
