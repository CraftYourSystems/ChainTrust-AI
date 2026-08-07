export const algorandConfig = {
  network: process.env.NETWORK || "testnet",
  provider: process.env.BLOCKCHAIN_PROVIDER || "algonode",
  
  algod: {
    server: process.env.ALGOD_SERVER || "https://testnet-api.algonode.cloud",
    port: process.env.ALGOD_PORT || "443",
    token: process.env.ALGOD_TOKEN || "",
  },
  
  indexer: {
    server: process.env.INDEXER_SERVER || "https://testnet-idx.algonode.cloud",
    port: process.env.INDEXER_PORT || "443",
    token: process.env.INDEXER_TOKEN || "",
  }
};
