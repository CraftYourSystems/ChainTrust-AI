import crypto from "crypto";
import { DocumentProcessingError } from "../errors/ai.errors";

export class DocumentProcessorService {
  /**
   * Computes SHA-256 hash of contract text/file buffer.
   */
  computeHash(content: string | Buffer): string {
    return crypto.createHash("sha256").update(content).digest("hex");
  }

  /**
   * Preprocesses contract text, sanitizing whitespace and validating non-empty input.
   */
  processText(contractText: string): { processedText: string; charCount: number; hash: string } {
    if (!contractText || contractText.trim().length === 0) {
      throw new DocumentProcessingError("Contract content cannot be empty.");
    }

    const processedText = contractText.trim();
    const hash = this.computeHash(processedText);

    return {
      processedText,
      charCount: processedText.length,
      hash
    };
  }
}

export const documentProcessorService = new DocumentProcessorService();
