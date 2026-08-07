export interface AIModelAdapter {
  providerName: string;
  analyzeContract(contractText: string, contractType: string): Promise<string>;
}
