export interface CreateQuoteRequestDTO {
  purpose?: string;
}

export interface VerifyPaymentRequestDTO {
  quoteId: string;
  txId: string;
}

export interface X402PaymentRequiredResponseDTO {
  error: "Payment Required";
  code: 402;
  message: string;
  quote: {
    quoteId: string;
    recipient: string;
    amount: string;
    expiresAt: string;
    purpose: string;
    signature: string;
  };
}
