export class AuthError extends Error {
  public code: string;
  public statusCode: number;

  constructor(message: string, code: string, statusCode: number = 401) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ChallengeExpiredError extends AuthError {
  constructor() {
    super("Challenge nonce has expired", "CHALLENGE_EXPIRED");
  }
}

export class ReplayAttackError extends AuthError {
  constructor() {
    super("Nonce has already been used", "REPLAY_ATTACK", 403);
  }
}

export class NonceNotFoundError extends AuthError {
  constructor() {
    super("Challenge nonce not found", "NONCE_NOT_FOUND");
  }
}

export class InvalidSignatureError extends AuthError {
  constructor() {
    super("Cryptographic signature verification failed", "INVALID_SIGNATURE");
  }
}

export class SessionExpiredError extends AuthError {
  constructor() {
    super("Session has expired", "SESSION_EXPIRED");
  }
}

export class SessionRevokedError extends AuthError {
  constructor() {
    super("Session has been revoked", "SESSION_REVOKED", 403);
  }
}

export class UnauthorizedWalletError extends AuthError {
  constructor(message: string = "Unauthorized wallet access") {
    super(message, "UNAUTHORIZED_WALLET", 403);
  }
}
