import { AIModelAdapter } from "./AIModelAdapter";
import { ModelInferenceError } from "../errors/ai.errors";

export class OpenAIAdapter implements AIModelAdapter {
  providerName = "OpenAI-GPT4o";
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || "";
  }

  async analyzeContract(contractText: string, contractType: string): Promise<string> {
    if (!this.apiKey) {
      throw new ModelInferenceError(this.providerName, "OPENAI_API_KEY environment variable is not configured");
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: "You are an expert AI Due Diligence Auditor. Analyze the provided contract text and respond strictly in JSON matching the required schema."
            },
            {
              role: "user",
              content: `Contract Type: ${contractType}\n\nContract Source:\n${contractText}`
            }
          ],
          temperature: 0.1
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new ModelInferenceError(this.providerName, `HTTP ${response.status}: ${errText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error: any) {
      throw new ModelInferenceError(this.providerName, error.message);
    }
  }
}
