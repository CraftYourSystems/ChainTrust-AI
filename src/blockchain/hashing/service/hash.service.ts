import crypto from "crypto";
import { canonicalizerService } from "./canonicalizer.service";
import { HashReportResult, VerificationResult } from "../types/hash.types";
import { emitReportHashed, emitIntegrityVerified, emitMismatchDetected } from "../events/hash.events";

export class HashService {
  /**
   * Canonicalizes JSON object and computes SHA-256 hex digest.
   */
  hashReport(reportData: any): { hash: string; canonicalJson: string } {
    const canonicalJson = canonicalizerService.canonicalize(reportData);
    const hash = crypto.createHash("sha256").update(canonicalJson).digest("hex");
    return { hash, canonicalJson };
  }

  /**
   * Computes SHA-256 hash of raw contract text.
   */
  hashContract(contractText: string): string {
    return crypto.createHash("sha256").update(contractText.trim()).digest("hex");
  }

  /**
   * Combines contract hash and report hash into a composite SHA-256 root hash for on-chain recording.
   */
  combineHashes(contractHash: string, reportHash: string): string {
    const payload = `${contractHash}:${reportHash}`;
    return crypto.createHash("sha256").update(payload).digest("hex");
  }

  /**
   * Generates complete HashReportResult preparing payload for Algorand ledger recording.
   */
  generateIntegrityPayload(reportData: any, contractText: string): HashReportResult {
    const { hash: reportHash, canonicalJson } = this.hashReport(reportData);
    const contractHash = this.hashContract(contractText);
    const combinedHash = this.combineHashes(contractHash, reportHash);

    return {
      reportHash,
      contractHash,
      combinedHash,
      canonicalJson
    };
  }

  /**
   * Constant-time integrity verification of local report against an expected SHA-256 hash.
   */
  verifyReportIntegrity(localReportData: any, expectedHash: string, reportId?: string): VerificationResult {
    const { hash: computedHash } = this.hashReport(localReportData);

    const bufComputed = Buffer.from(computedHash, "hex");
    const bufExpected = Buffer.from(expectedHash, "hex");

    let isValid = false;
    if (bufComputed.length === bufExpected.length) {
      isValid = crypto.timingSafeEqual(bufComputed, bufExpected);
    }

    if (isValid) {
      if (reportId) emitIntegrityVerified(reportId, computedHash);
    } else {
      if (reportId) emitMismatchDetected(reportId, expectedHash, computedHash);
    }

    return {
      isValid,
      computedHash,
      expectedHash
    };
  }
}

export const hashService = new HashService();
