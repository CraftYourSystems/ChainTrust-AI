import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return NextResponse.json({
    success: true,
    reportId: id || "ANL-58440",
    contractName: "TokenVault.sol",
    remediationPlan: {
      overallRiskScore: 78,
      recommendedFixesCount: 2,
      fixes: [
        {
          id: "FIX-1",
          severity: "CRITICAL",
          title: "Reentrancy Drain Mitigation",
          vulnerableCode: "function withdrawBalance() external {\n    uint bal = userBalances[msg.sender];\n    (bool sent, ) = msg.sender.call{value: bal}(\"\");\n    userBalances[msg.sender] = 0;\n}",
          remediatedCode: "function withdrawBalance() external nonReentrant {\n    uint bal = userBalances[msg.sender];\n    userBalances[msg.sender] = 0;\n    (bool sent, ) = msg.sender.call{value: bal}(\"\");\n    require(sent, \"Transfer failed\");\n}",
          pattern: "Checks-Effects-Interactions"
        },
        {
          id: "FIX-2",
          severity: "HIGH",
          title: "Uncapped Indemnification Liability",
          vulnerableCode: "Clause 4.2: Client agrees to indemnify vendor for all consequential damages without cap.",
          remediatedCode: "Clause 4.2: Vendor liability for indemnification shall be capped at 12x monthly fees.",
          pattern: "Mutual Liability Cap"
        }
      ]
    },
    verification: {
      confirmedRound: 48291231,
      txId: "F5X4J9A2K7839102938472910293847281903847"
    }
  });
}
