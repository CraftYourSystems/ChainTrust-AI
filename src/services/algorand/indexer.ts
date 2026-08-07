import algosdk from "algosdk";
import { algorandConfig } from "./config";
import { logAlgorandAction } from "./utils";

const token = algorandConfig.indexer.token;
const server = algorandConfig.indexer.server;
const port = algorandConfig.indexer.port;

export const indexerClient = new algosdk.Indexer(token, server, port);

/**
 * Checks the health of the Indexer.
 */
export async function checkIndexerHealth() {
  const startTime = Date.now();
  try {
    const health = await indexerClient.makeHealthCheck().do();
    const latency = Date.now() - startTime;
    
    logAlgorandAction("Indexer Health Check Success", { 
      latencyMs: latency, 
      status: health 
    });
    
    return {
      healthy: true,
      latency: `${latency}ms`,
      network: algorandConfig.network
    };
  } catch (error: any) {
    logAlgorandAction("Indexer Health Check Failed", { error: error.message });
    return {
      healthy: false,
      latency: null,
      network: algorandConfig.network,
      error: error.message
    };
  }
}
