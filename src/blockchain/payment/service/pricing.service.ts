export class PricingService {
  private static BASE_FEE_MICRO_ALGOS = BigInt(1_000_000); // 1.0 ALGO

  /**
   * Calculates the analysis fee in microAlgos.
   * Can be expanded with page counts, priority tiers, etc.
   */
  calculateFee(purpose: string = "DUE_DILIGENCE"): bigint {
    switch (purpose.toUpperCase()) {
      case "ENTERPRISE_AUDIT":
        return BigInt(5_000_000); // 5.0 ALGO
      case "EXPRESS_AUDIT":
        return BigInt(2_000_000); // 2.0 ALGO
      case "DUE_DILIGENCE":
      default:
        return PricingService.BASE_FEE_MICRO_ALGOS;
    }
  }
}

export const pricingService = new PricingService();
