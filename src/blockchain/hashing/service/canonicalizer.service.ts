import { CanonicalizationError } from "../errors/hash.errors";

export class CanonicalizerService {
  /**
   * Recursively sorts all keys of an object in lexicographical order.
   * Produces a deterministic canonical string regardless of initial key ordering.
   */
  canonicalize(data: any): string {
    try {
      return JSON.stringify(this.sortKeys(data));
    } catch (error: any) {
      throw new CanonicalizationError(error.message);
    }
  }

  private sortKeys(obj: any): any {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sortKeys(item));
    }

    const sortedObj: Record<string, any> = {};
    const sortedKeys = Object.keys(obj).sort();

    for (const key of sortedKeys) {
      sortedObj[key] = this.sortKeys(obj[key]);
    }

    return sortedObj;
  }
}

export const canonicalizerService = new CanonicalizerService();
