export class HashingError extends Error {
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

export class HashMismatchError extends HashingError {
  constructor(expected: string, actual: string) {
    super(`Report integrity verification failed. Expected: ${expected}, Got: ${actual}`, "HASH_MISMATCH", 409);
  }
}

export class CanonicalizationError extends HashingError {
  constructor(details: string) {
    super(`Failed to canonicalize JSON object: ${details}`, "CANONICALIZATION_FAILED", 422);
  }
}
