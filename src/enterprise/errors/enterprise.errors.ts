export class EnterpriseError extends Error {
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

export class ConfigurationError extends EnterpriseError {
  constructor(variableName: string, reason: string) {
    super(`Configuration Error for ${variableName}: ${reason}`, "CONFIG_ERROR", 500);
  }
}
