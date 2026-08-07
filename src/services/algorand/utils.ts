/**
 * Helper to log Algorand-related actions with consistent formatting.
 */
export function logAlgorandAction(action: string, details: Record<string, any> = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[Algorand][${timestamp}] ${action}`, JSON.stringify(details, (key, value) => 
    typeof value === 'bigint' ? value.toString() : value
  , 2));
}

/**
 * Custom Fetch implementation with Retries and Timeouts, useful for robust blockchain interactions.
 * Note: algosdk internally uses global fetch or a provided fetch polyfill.
 * We can provide this to the Algod/Indexer clients if needed via custom client configurations, 
 * but algosdk native clients already implement internal retries for some operations. 
 * We expose this utility for explicit health checks or manual API calls.
 */
export async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, timeoutMs = 10000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);

      if (response.ok) {
        return response;
      }

      // Retry on Too Many Requests or Server Errors
      if (response.status === 429 || response.status >= 500) {
        logAlgorandAction("API Retry", { url, status: response.status, attempt: i + 1 });
        await new Promise((res) => setTimeout(res, Math.pow(2, i) * 500)); // Exponential backoff (500ms, 1s, 2s)
        continue;
      }

      // If it's a client error (e.g. 400), don't retry
      return response;

    } catch (error: any) {
      clearTimeout(id);
      
      // AbortError indicates a timeout
      if (error.name === 'AbortError') {
         logAlgorandAction("API Timeout", { url, timeoutMs, attempt: i + 1 });
      } else {
         logAlgorandAction("API Fetch Error", { url, error: error.message, attempt: i + 1 });
      }

      if (i === retries - 1) throw error;
      
      await new Promise((res) => setTimeout(res, Math.pow(2, i) * 500));
    }
  }
  
  throw new Error(`Max retries reached for ${url}`);
}
