import algosdk from "algosdk";
import { algodClient } from "./client";
import { logAlgorandAction } from "./utils";

/**
 * Get suggested transaction parameters from the Algod node.
 */
export async function getSuggestedParams() {
  try {
    const params = await algodClient.getTransactionParams().do();
    return params;
  } catch (error: any) {
    logAlgorandAction("Get Suggested Params Error", { error: error.message });
    throw error;
  }
}

/**
 * Broadcasts a signed transaction to the network.
 */
export async function submitTransaction(signedTxn: Uint8Array) {
  try {
    const res = await algodClient.sendRawTransaction(signedTxn).do();
    const txId = res.txid || (res as any).txId || "";
    logAlgorandAction("Transaction Submitted", { txId });
    return txId;
  } catch (error: any) {
    logAlgorandAction("Submit Transaction Error", { error: error.message });
    throw error;
  }
}

/**
 * Waits for a transaction to be confirmed on the blockchain.
 */
export async function waitForConfirmation(txId: string, timeout = 4) {
  try {
    const status = await algosdk.waitForConfirmation(algodClient, txId, timeout);
    const round = (status as any).confirmedRound || (status as any)["confirmed-round"];
    logAlgorandAction("Transaction Confirmed", { txId, round });
    return status;
  } catch (error: any) {
    logAlgorandAction("Wait For Confirmation Error", { txId, error: error.message });
    throw error;
  }
}
