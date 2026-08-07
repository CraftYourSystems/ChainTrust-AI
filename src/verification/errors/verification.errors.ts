export class VerificationError extends Error {
  public code: string;
  public statusCode: number;

  constructor(message: string, code: string, statusCode: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class TransactionNotFoundVerificationError extends VerificationError {
  constructor(txId: string) {
    super(`Transaction ${txId} was not found on the Algorand blockchain`, "VERIFICATION_TX_NOT_FOUND", 404);
  }
}

export class InvalidNotePayloadError extends VerificationError {
  constructor(txId: string) {
    super(`Transaction ${txId} does not contain a valid ChainTrust proof note payload`, "INVALID_NOTE_PAYLOAD", 422);
  }
}
