import { algorandClient } from "@/services/algorand/client";
import { hashService } from "@/blockchain/hashing/service/hash.service";
import { explorerService } from "./explorer.service";
import { VerificationResultPayload, OnChainProofDetails } from "../types/verification.types";
import { emitPublicVerificationExecuted } from "../events/verification.events";
import { TransactionNotFoundVerificationError, InvalidNotePayloadError } from "../errors/verification.errors";

export class VerificationPortalService {
  /**
   * Parses the transaction note payload format: chaintrust:proof:v1:<reportHash>:<contractHash>
   */
  parseNotePayload(noteString: string): { reportHash: string; contractHash: string } | null {
    if (!noteString || !noteString.startsWith("chaintrust:proof:v1:")) {
      return null;
    }
    const parts = noteString.split(":");
    if (parts.length < 5) return null;

    return {
      reportHash: parts[3],
      contractHash: parts[4]
    };
  }

  /**
   * Fetches transaction from Algorand Indexer/Node and extracts proof details.
   */
  async fetchOnChainProofByTxId(txId: string): Promise<OnChainProofDetails> {
    let txInfo: any = null;

    try {
      const res = await algorandClient.indexer.lookupTransactionByID(txId).do();
      txInfo = res.transaction;
    } catch (e) {
      try {
        txInfo = await algorandClient.algod.pendingTransactionInformation(txId).do();
      } catch (algodErr) {
        throw new TransactionNotFoundVerificationError(txId);
      }
    }

    if (!txInfo) {
      throw new TransactionNotFoundVerificationError(txId);
    }

    const noteRaw = txInfo.note || txInfo.txn?.txn?.note;
    if (!noteRaw) {
      throw new InvalidNotePayloadError(txId);
    }

    const noteString = Buffer.from(noteRaw, "base64").toString("utf8");
    const parsed = this.parseNotePayload(noteString);

    if (!parsed) {
      throw new InvalidNotePayloadError(txId);
    }

    const confirmedRound = Number(txInfo["confirmed-round"] || txInfo.confirmedRound || 0);
    const senderAddress = txInfo.sender || txInfo.txn?.txn?.snd || "unknown";

    return {
      txId,
      confirmedRound,
      recordedReportHash: parsed.reportHash,
      recordedContractHash: parsed.contractHash,
      explorerUrl: explorerService.getTxExplorerUrl(txId),
      senderAddress
    };
  }

  /**
   * Public verification entry point: Accepts report JSON and optional TxID.
   */
  async verifyReportData(reportData: any, txId?: string): Promise<VerificationResultPayload> {
    // 1. Compute local canonical report hash
    const { hash: computedReportHash } = hashService.hashReport(reportData);

    if (!txId) {
      return {
        status: "NOT_FOUND",
        isAuthentic: false,
        computedReportHash,
        message: "No transaction ID provided to match against Algorand on-chain proof records."
      };
    }

    // 2. Fetch On-Chain Proof from Algorand
    try {
      const proofDetails = await this.fetchOnChainProofByTxId(txId);

      // 3. Compare Computed Canonical Hash vs On-Chain Recorded Hash
      const isAuthentic = computedReportHash.toLowerCase() === proofDetails.recordedReportHash.toLowerCase();
      const status = isAuthentic ? "VERIFIED" : "TAMPERED";

      emitPublicVerificationExecuted(status, txId);

      return {
        status,
        isAuthentic,
        computedReportHash,
        proofDetails,
        message: isAuthentic
          ? "REPORT VERIFIED AUTHENTIC: Computed SHA-256 hash matches the immutable record on the Algorand blockchain!"
          : "TAMPER WARNING: The content of this report has been modified and does NOT match the immutable record on the Algorand blockchain!"
      };
    } catch (error: any) {
      emitPublicVerificationExecuted("NOT_FOUND", txId);
      return {
        status: "NOT_FOUND",
        isAuthentic: false,
        computedReportHash,
        message: error.message || "On-chain transaction proof not found."
      };
    }
  }
}

export const verificationPortalService = new VerificationPortalService();
