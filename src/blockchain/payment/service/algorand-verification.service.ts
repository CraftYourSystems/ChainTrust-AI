import { algorandClient } from "@/services/algorand/client";
import { algorandConfig } from "@/services/algorand/config";
import { 
  TransactionNotFoundError, 
  TransactionUnconfirmedError, 
  InsufficientPaymentError, 
  InvalidPaymentRecipientError 
} from "../errors/payment.errors";

export interface VerifiedBlockchainTransaction {
  txId: string;
  sender: string;
  receiver: string;
  amount: bigint;
  confirmedRound: bigint;
  type: string;
}

export class AlgorandVerificationService {
  /**
   * Fetches transaction from Indexer/Node and performs pure blockchain verification checks.
   */
  async verifyTransaction(txId: string, requiredRecipient: string, minAmount: bigint): Promise<VerifiedBlockchainTransaction> {
    let txInfo: any = null;

    // 1. Try to fetch from Indexer first
    try {
      const response = await algorandClient.indexer.lookupTransactionByID(txId).do();
      txInfo = response.transaction;
    } catch (e) {
      // 2. Fallback to Algod pending/confirmed transaction lookup
      try {
        txInfo = await algorandClient.algod.pendingTransactionInformation(txId).do();
      } catch (algodErr) {
        throw new TransactionNotFoundError(txId);
      }
    }

    if (!txInfo) {
      throw new TransactionNotFoundError(txId);
    }

    // 3. Confirm Transaction Status
    const confirmedRound = txInfo["confirmed-round"] || txInfo.confirmedRound || txInfo["confirmed-round"];
    if (!confirmedRound || confirmedRound <= 0) {
      throw new TransactionUnconfirmedError(txId);
    }

    // 4. Verify Transaction Type ("pay" for microAlgos)
    const txType = txInfo["tx-type"] || txInfo.type;
    const paymentDetails = txInfo["payment-transaction"] || txInfo.paymentTransaction || txInfo;
    
    if (txType !== "pay" && !paymentDetails.amount) {
      throw new Error(`Invalid transaction type: ${txType}. Expected microAlgo payment ('pay').`);
    }

    // 5. Verify Recipient Address
    const receiver = paymentDetails.receiver || paymentDetails.destination || txInfo.txn?.txn?.rcv;
    const receiverAddress = typeof receiver === "string" ? receiver : algorandClient.algod ? receiver?.toString() : "";
    
    if (receiverAddress !== requiredRecipient) {
      throw new InvalidPaymentRecipientError(requiredRecipient, receiverAddress);
    }

    // 6. Verify Payment Amount
    const amount = BigInt(paymentDetails.amount || txInfo.txn?.txn?.amt || 0);
    if (amount < minAmount) {
      throw new InsufficientPaymentError(minAmount.toString(), amount.toString());
    }

    // 7. Extract Sender
    const sender = txInfo.sender || txInfo.txn?.txn?.snd || "unknown";

    return {
      txId,
      sender,
      receiver: receiverAddress,
      amount,
      confirmedRound: BigInt(confirmedRound),
      type: txType
    };
  }
}

export const algorandVerificationService = new AlgorandVerificationService();
