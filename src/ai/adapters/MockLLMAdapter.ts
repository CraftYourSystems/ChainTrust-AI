import { AIModelAdapter } from "./AIModelAdapter";

export class MockLLMAdapter implements AIModelAdapter {
  providerName = "Mock-LLM-Engine";

  async analyzeContract(contractText: string, contractType: string): Promise<string> {
    // Simulate LLM inference delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const isSmartContract = contractType === "SMART_CONTRACT" || contractText.includes("pragma solidity") || contractText.includes("TEAL");

    if (isSmartContract) {
      return JSON.stringify({
        summary: "Automated analysis detected a Solidity smart contract with token vault functionality and administrative controls.",
        riskLevel: "HIGH",
        vulnerabilities: [
          {
            id: "VULN-001",
            title: "Potential Reentrancy in Withdraw Function",
            severity: "HIGH",
            description: "State variable updates occur after transferring native ALGO / tokens to external recipients.",
            recommendation: "Apply nonReentrant modifier or reorder state mutations prior to external calls."
          },
          {
            id: "VULN-002",
            title: "Unrestricted Owner Admin Privileges",
            severity: "MEDIUM",
            description: "Owner can pause transfers and drain funds without multi-sig approval or timelock.",
            recommendation: "Integrate a 48-hour timelock and multi-signature governance requirement."
          }
        ],
        obligations: [
          {
            party: "Contract Owner",
            obligation: "Maintain sufficient liquidity reserve for user redemptions.",
            deadline: "Continuous"
          }
        ],
        ambiguousClauses: [
          {
            clause: "emergencyWithdraw() function body",
            issue: "Lack of explicit event emission during emergency funds withdrawal."
          }
        ],
        redFlags: [
          {
            title: "Centralized Admin Control",
            description: "Single private key holds full control over pool parameters."
          }
        ],
        recommendations: [
          "Enforce Checks-Effects-Interactions design pattern.",
          "Add timelocks to admin privilege modifications."
        ]
      });
    } else {
      return JSON.stringify({
        summary: "Analysis of legal agreement detected binding terms with unilateral termination clauses.",
        riskLevel: "MEDIUM",
        vulnerabilities: [],
        obligations: [
          {
            party: "Service Provider",
            obligation: "Deliver monthly compliance reports within 5 business days.",
            deadline: "Monthly"
          },
          {
            party: "Client",
            obligation: "Remit invoice payment within 30 days of receipt.",
            deadline: "30 Days Net"
          }
        ],
        ambiguousClauses: [
          {
            clause: "Section 8.1 - Force Majeure",
            issue: "Does not specify whether supply chain delays constitute excuse for non-performance."
          }
        ],
        redFlags: [
          {
            title: "Uncapped Indemnification Liability",
            description: "Client bears unlimited financial liability for third-party IP claims."
          }
        ],
        recommendations: [
          "Cap total liability at 12 months of paid fees.",
          "Clarify notice requirements in Section 12."
        ]
      });
    }
  }
}
