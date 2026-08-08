import algosdk from "algosdk";
import { algorandClient } from "@/services/algorand/client";
import { platformWalletService } from "./platform-wallet.service";
import { ledgerRepository } from "../repository/ledger.repository";
import { hashRepository } from "@/blockchain/hashing/repository/hash.repository";
import { aiRepository } from "@/ai/repository/ai.repository";
import { LedgerSubmissionError, LedgerTimeoutError } from "../errors/ledger.errors";
import { emitRecordingStarted, emitProofRecorded, emitRecordingFailed } from "../events/ledger.events";

export class LedgerRecordingService {
  /**
   * Constructs the ARC-compatible note payload: chaintrust:proof:v1:<reportHash>:<contractHash>
   */
  formatNotePayload(reportHash: string, contractHash: string): string {
    return `chaintrust:proof:v1:${reportHash}:${contractHash}`;
  }

  /**
   * Anchors a proof without touching Postgres.
   *
   * recordProofOnLedger() below is the full pipeline: it reads the Report and
   * HashRecord rows, persists a LedgerRecord, and requires an authenticated
   * session. Reports produced by the Python AI engine have no database rows,
   * so this variant takes the hashes directly and does nothing but sign and
   * submit. It reuses the same note format, platform wallet, and algod client.
   *
   * Throws on failure — the caller decides how to degrade.
   */
  async recordProofDirect(reportHash: string, contractHash: string) {
    const noteString = this.formatNotePayload(reportHash, contractHash);
    const noteBytes = new Uint8Array(Buffer.from(noteString, "utf8"));

    const platformAccount = platformWalletService.getAccount();
    const rawAddr = platformAccount.addr;
    const sender = typeof rawAddr === "string" ? rawAddr : (rawAddr as any).toString();

    const params = await algorandClient.algod.getTransactionParams().do();
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender,
      receiver: sender,
      amount: 0,
      note: noteBytes,
      suggestedParams: params
    });

    const signedTxn = txn.signTxn(platformAccount.sk);
    const txId = txn.txID();

    await algorandClient.algod.sendRawTransaction(signedTxn).do();
    const confirmation = await algosdk.waitForConfirmation(algorandClient.algod, txId, 4);
    const confirmedRound =
      confirmation.confirmedRound || (confirmation as any)["confirmed-round"] || 0;

    return {
      txId,
      confirmedRound: confirmedRound.toString(),
      senderAddress: sender,
      notePayload: noteString
    };
  }

  /**
   * Submits a zero-ALGO proof transaction to Algorand with exponential backoff retries.
   */
  async recordProofOnLedger(userId: string, reportId: string) {
    // 1. Idempotency Check: Don't record multiple times
    const existing = await ledgerRepository.getLedgerRecordByReportId(reportId);
    if (existing) {
      return existing;
    }

    emitRecordingStarted(reportId);

    // 2. Fetch Hash Record & Report from DB
    const hashRecord = await hashRepository.getHashRecordByReportId(reportId);
    const report = await aiRepository.getReportById(reportId);

    if (!hashRecord || !report) {
      throw new Error(`Report or HashRecord not found for reportId ${reportId}`);
    }

    const noteString = this.formatNotePayload(hashRecord.reportHash, hashRecord.contractHash);
    const noteBytes = new Uint8Array(Buffer.from(noteString, "utf8"));

    const platformAccount = platformWalletService.getAccount();
    const rawAddr = platformAccount.addr;
    const sender = typeof rawAddr === "string" ? rawAddr : (rawAddr as any).toString();

    let attempts = 0;
    const maxAttempts = 3;
    let txId = "";
    let confirmedRound = BigInt(0);

    while (attempts < maxAttempts) {
      attempts++;
      try {
        // 3. Query Suggested Parameters from Algod
        const params = await algorandClient.algod.getTransactionParams().do();

        // 4. Construct 0-ALGO Payment Self-Transaction with Note Payload
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          sender,
          receiver: sender,
          amount: 0,
          note: noteBytes,
          suggestedParams: params
        });

        // 5. Sign Transaction with Platform Private Key
        const signedTxn = txn.signTxn(platformAccount.sk);
        txId = txn.txID();

        // 6. Submit Raw Transaction
        await algorandClient.algod.sendRawTransaction(signedTxn).do();

        // 7. Wait for Algorand Confirmation (4 rounds)
        const confirmation = await algosdk.waitForConfirmation(algorandClient.algod, txId, 4);
        confirmedRound = BigInt(confirmation.confirmedRound || (confirmation as any)["confirmed-round"] || 0);

        break; // Successfully submitted & confirmed
      } catch (err: any) {
        if (attempts >= maxAttempts) {
          emitRecordingFailed(reportId, err.message);
          throw new LedgerSubmissionError(`Failed after ${maxAttempts} attempts: ${err.message}`);
        }
        // Exponential backoff delay (1s, 2s)
        await new Promise(res => setTimeout(res, 1000 * attempts));
      }
    }

    // 8. Persist Ledger Record in DB
    const ledgerRecord = await ledgerRepository.createLedgerRecord({
      userId,
      reportId,
      txId,
      confirmedRound,
      notePayload: noteString,
      senderAddress: sender
    });

    emitProofRecorded(reportId, txId, confirmedRound.toString());

    return ledgerRecord;
  }
}

export const ledgerRecordingService = new LedgerRecordingService();
