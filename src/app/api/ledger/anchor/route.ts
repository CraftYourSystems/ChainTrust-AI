import { NextRequest, NextResponse } from "next/server";
import { hashService } from "@/blockchain/hashing/service/hash.service";
import { ledgerRecordingService } from "@/blockchain/ledger/service/ledger-recording.service";

/**
 * Anchors a real AI report on Algorand TestNet.
 *
 * /api/ledger/record is the full pipeline and requires an authenticated
 * session plus Report and HashRecord rows in Postgres. Reports from the
 * Python AI engine have neither, so this route composes the same underlying
 * services — hashService for the digest, ledgerRecordingService for the
 * transaction — without the database.
 *
 * The hash is always computed and returned, even when anchoring fails: a
 * SHA-256 of the real report is genuine cryptographic evidence regardless of
 * whether it reached the chain.
 */
export async function POST(req: NextRequest) {
  try {
    const { report, contractText } = await req.json();

    if (!report?.analysisId) {
      return NextResponse.json(
        { success: false, error: { message: "A report with an analysisId is required" } },
        { status: 400 }
      );
    }

    // Real SHA-256 over the canonicalised report the user is looking at.
    const { hash: reportHash } = hashService.hashReport(report);
    const contractHash = contractText
      ? hashService.hashContract(contractText)
      : hashService.hashContract(report.analysisId);

    try {
      const receipt = await ledgerRecordingService.recordProofDirect(reportHash, contractHash);

      return NextResponse.json({
        success: true,
        data: {
          status: "Verified",
          transactionId: receipt.txId,
          reportHash,
          contractHash,
          confirmedRound: receipt.confirmedRound,
          walletAddress: receipt.senderAddress,
          explorerUrl: `https://testnet.explorer.perawallet.app/tx/${receipt.txId}`,
          timestamp: new Date().toISOString()
        }
      });
    } catch (anchorError: any) {
      // Anchoring failed. Return the real hash and a truthful failure reason —
      // never a fabricated transaction. The report stays fully usable.
      return NextResponse.json({
        success: false,
        data: {
          status: "Failed",
          reportHash,
          contractHash,
          error: anchorError?.message || "Algorand anchoring failed"
        }
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error?.message || "Anchoring request failed" } },
      { status: 500 }
    );
  }
}
