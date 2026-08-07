import { ConfigurationError } from "../errors/enterprise.errors";

export class ConfigValidator {
  /**
   * Validates required environment variables on startup.
   */
  static validateConfig() {
    const requiredEnvVars = [
      "ALGORAND_NETWORK",
      "ALGORAND_NODE_SERVER",
      "ALGORAND_INDEXER_SERVER"
    ];

    const missing: string[] = [];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        missing.push(envVar);
      }
    }

    if (missing.length > 0) {
      console.warn(`[CONFIG WARNING] Missing recommended environment variables: ${missing.join(", ")}`);
    }

    // Validate JWT & secret fallback keys in production
    if (process.env.NODE_ENV === "production") {
      if (!process.env.DATABASE_URL) {
        throw new ConfigurationError("DATABASE_URL", "Must be configured in production");
      }
      if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
        throw new ConfigurationError("JWT_SECRET", "Must be at least 32 characters long in production");
      }
    }

    return true;
  }
}

// Auto-run validation check
ConfigValidator.validateConfig();
