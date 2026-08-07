export class PaymentError extends Error {
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

export class PaymentRequiredError extends PaymentError {
  public quote: any;
  constructor(quote: any) {
    super("Payment is required to proceed with this operation", "PAYMENT_REQUIRED", 402);
    this.quote = quote;
  }
}

export class QuoteNotFoundError extends PaymentError {
  constructor(quoteId: string) {
    super(`Payment quote ${quoteId} was not found`, "QUOTE_NOT_FOUND", 440);
  }
}

export class QuoteExpiredError extends PaymentError {
  constructor(quoteId: string) {
    super(`Payment quote ${quoteId} has expired`, "QUOTE_EXPIRED", 440);
  }
}

export class QuoteTamperedError extends PaymentError {
  constructor() {
    super("Payment quote signature invalid or tampered", "QUOTE_TAMPERED", 400);
  }
}

export class DoubleSpendError extends PaymentError {
  constructor(txId: string) {
    super(`Transaction ${txId} has already been claimed for another payment`, "DOUBLE_SPEND_DETECTED", 409);
  }
}

export class TransactionNotFoundError extends PaymentError {
  constructor(txId: string) {
    super(`Transaction ${txId} was not found on the Algorand blockchain`, "TRANSACTION_NOT_FOUND", 404);
  }
}

export class InsufficientPaymentError extends PaymentError {
  constructor(required: string, received: string) {
    super(`Insufficient payment amount. Required: ${required} microAlgos, Received: ${received} microAlgos`, "INSUFFICIENT_PAYMENT", 400);
  }
}

export class InvalidPaymentRecipientError extends PaymentError {
  constructor(expected: string, actual: string) {
    super(`Invalid payment recipient. Expected: ${expected}, Actual: ${actual}`, "INVALID_RECIPIENT", 400);
  }
}

export class TransactionUnconfirmedError extends PaymentError {
  constructor(txId: string) {
    super(`Transaction ${txId} is not yet confirmed on the blockchain`, "TRANSACTION_UNCONFIRMED", 422);
  }
}
