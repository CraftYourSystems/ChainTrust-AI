export class AIError extends Error {
  public code: string;
  public statusCode: number;

  constructor(message: string, code: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ModelInferenceError extends AIError {
  constructor(provider: string, details: string) {
    super(`AI inference failed via ${provider}: ${details}`, "MODEL_INFERENCE_ERROR", 502);
  }
}

export class JSONParseError extends AIError {
  constructor(rawOutput: string) {
    super(`Failed to parse AI output into valid JSON schema`, "JSON_PARSE_ERROR", 422);
  }
}

export class DocumentProcessingError extends AIError {
  constructor(message: string) {
    super(message, "DOCUMENT_PROCESSING_ERROR", 400);
  }
}
