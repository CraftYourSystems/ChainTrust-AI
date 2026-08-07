export class LedgerError extends Error {
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

export class LedgerSubmissionError extends LedgerError {
  constructor(details: string) {
    super(`Failed to submit proof transaction to Algorand: ${details}`, "LEDGER_SUBMISSION_FAILED", 502);
  }
}

export class LedgerTimeoutError extends LedgerError {
  constructor(txId: string) {
    super(`Transaction ${txId} timed out waiting for round confirmation`, "LEDGER_CONFIRMATION_TIMEOUT", 504);
  }
}

export class KeyManagementError extends LedgerError {
  constructor(message: string) {
    super(message, "KEY_MANAGEMENT_ERROR", 500);
  }
}
