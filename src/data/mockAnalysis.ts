import { DueDiligenceReport } from '../types/analysis';

export const mockReports: Record<string, DueDiligenceReport> = {
  'ANL-001': {
    analysisId: 'ANL-001',
    overallRisk: 84,
    riskLevel: 'High',
    executiveSummary: 'This Software-as-a-Service (SaaS) Agreement contains multiple high-risk clauses that heavily favor the Vendor. Key areas of concern include an overly broad IP assignment, unfavorable automatic renewal terms without price caps, and absolute limitations of liability that leave the customer with virtually no recourse in the event of major service breaches or data exposure.',
    keyFindings: [
      'Automatic renewal of the contract occurs 30 days prior to expiry with a 15% price increase clause and no prior notification requirement.',
      'Customer IP rights are compromised in the Data Usage clause, granting the Vendor an irrevocable, perpetual, worldwide license to "usage insights" which may include customer data.',
      'Vendor limitation of liability is capped at $500, regardless of actual direct damages incurred or data breach scope.',
      'Indemnification is one-sided, protecting only the Vendor from customer breaches but offering no reciprocal protection for IP infringement.'
    ],
    actionItems: [
      'Negotiate the automatic renewal clause to require a 60-day written notice and limit any annual price increases to a maximum of 3% or CPI (Consumer Price Index).',
      'Amend Section 8.2 (Data Usage) to explicitly exclude Customer Confidential Information and limit Vendor\'s use to aggregated, anonymized metadata.',
      'Increase the limitation of liability cap from a flat $500 to a multiple of fees paid (e.g., 12 months\' fees) or establish a separate super-cap for data breaches.',
      'Demand mutual indemnification for third-party intellectual property infringement claims.'
    ],
    clauses: [
      {
        title: 'Section 4.2 - Automatic Renewal & Price Adjustments',
        risk: 'High',
        reason: 'The contract automatically renews unless cancelled in writing 60 days prior. Upon renewal, the provider reserves the right to increase fees by up to 15% annually without warning, leaving the customer vulnerable to unexpected cost spikes.',
        recommendation: 'Request that automatic renewal require an explicit 30-day confirmation or, if automatic, cap annual price increases at 3% or the CPI rate, and require at least 90 days\' advance written notice of fee changes.'
      },
      {
        title: 'Section 8.2 - Intellectual Property & Customer Data License',
        risk: 'High',
        reason: 'The clause grants the vendor a perpetual, irrevocable, worldwide license to use data collected from the customer\'s platform for "product enhancement and research." The phrasing is broad enough to potentially include sensitive business data or personally identifiable information (PII).',
        recommendation: 'Modify the license to be non-exclusive, non-transferable, and terminating upon contract end. Add strict language stating that any analytics data must be completely anonymized, aggregated, and free of any PII or client-identifying attributes.'
      },
      {
        title: 'Section 11.1 - Limitation of Liability',
        risk: 'High',
        reason: 'The vendor\'s total liability is capped at $500 for any and all claims, including negligence and data breach. Since the annual subscription fee exceeds $15,000, this cap is grossly inadequate and exposes the buyer to catastrophic operational risk.',
        recommendation: 'Negotiate a liability cap equal to 12-24 months of fees paid. Additionally, establish a dedicated "Super-Cap" (e.g., $1M or 5x contract value) for confidentiality breaches and data security/privacy claims.'
      },
      {
        title: 'Section 12.4 - Indemnification Obligations',
        risk: 'Medium',
        reason: 'The indemnification clause is unilateral, requiring the customer to defend and hold the vendor harmless against all third-party claims, but offers zero reciprocal indemnification for vendor-caused intellectual property infringement.',
        recommendation: 'Make the indemnification clause fully mutual. The vendor must indemnify the customer against third-party claims alleging that the software infringes a patent, copyright, or trade secret.'
      },
      {
        title: 'Section 14.7 - Governing Law & Venue',
        risk: 'Medium',
        reason: 'Governing law is set to the State of Delaware, and disputes must be resolved via binding arbitration in Wilmington, Delaware, which could incur high travel and administrative costs for local operations.',
        recommendation: 'If possible, request governing law and dispute venue to be changed to your local jurisdiction. Alternatively, agree on Delaware law but specify that arbitration may be conducted virtually.'
      }
    ],
    verification: {
      status: 'Pending'
    }
  },
  'ANL-002': {
    analysisId: 'ANL-002',
    overallRisk: 42,
    riskLevel: 'Medium',
    executiveSummary: 'This Mutual Non-Disclosure Agreement (NDA) is relatively standard but contains a few clauses that require attention. Specifically, the definition of Confidential Information is narrow, the non-solicitation clause is overly restrictive for a preliminary discussion, and the term of confidentiality is exceptionally long (7 years).',
    keyFindings: [
      'Confidentiality obligation extends for 7 years post-termination, which is longer than the standard 2-3 years for commercial NDAs.',
      'Contains a unilateral non-solicitation clause preventing the receiving party from hiring any employees of the disclosing party for 24 months.',
      'Definition of Confidential Information requires all oral disclosures to be confirmed in writing within 15 days, which is operationally difficult to enforce.'
    ],
    actionItems: [
      'Reduce the confidentiality term from 7 years to 3 years from the date of disclosure.',
      'Remove the non-solicitation clause entirely or make it reciprocal and limit it to key personnel directly involved in the project discussions.',
      'Modify the definition of Confidential Information so that marking is not strictly required if the information is clearly of a confidential nature by its context.'
    ],
    clauses: [
      {
        title: 'Section 2 - Confidentiality Period',
        risk: 'Medium',
        reason: 'The confidentiality term is set to 7 years. In fast-moving industries, information rarely remains proprietary or valuable for that long, and maintaining tracking mechanisms for 7 years creates an unnecessary administrative burden.',
        recommendation: 'Reduce the term of confidentiality to 3 years, which is the industry standard for standard business discussions.'
      },
      {
        title: 'Section 5 - Non-Solicitation of Employees',
        risk: 'Medium',
        reason: 'A strict 24-month non-solicitation clause is included. During exploratory discussions, it is premature to restrict general recruitment efforts, especially since recruitment is often done through public job postings.',
        recommendation: 'Delete this section. If required, restrict it only to direct solicitation (not general advertising) of employees who were directly involved in the project, and reduce the duration to 12 months.'
      },
      {
        title: 'Section 1 - Definition of Confidential Information',
        risk: 'Low',
        reason: 'Requires oral disclosures to be summarized and marked "Confidential" in writing within 15 days to be protected. If team members forget to follow up in writing, valuable spoken disclosures lose protection.',
        recommendation: 'Add standard clause protecting information that by its nature or circumstances of disclosure should reasonably be understood to be confidential.'
      }
    ],
    verification: {
      status: 'Pending'
    }
  },
  'ANL-003': {
    analysisId: 'ANL-003',
    overallRisk: 15,
    riskLevel: 'Low',
    executiveSummary: 'This standard Independent Contractor Agreement is exceptionally balanced and uses standard industry terms. The intellectual property rights are clearly defined, payment terms are standard (Net 30), and termination is equitable for both parties, allowing cancellation with 15 days\' notice.',
    keyFindings: [
      'Intellectual property is assigned upon payment, protecting both the contractor\'s right to payment and the client\'s ownership.',
      'Termination is mutual and flexible, requiring 15 days\' notice.',
      'Governing law is standard and set to the local state.'
    ],
    actionItems: [
      'Confirm that the scope of work (Exhibit A) is clearly documented before signing.',
      'Ensure contractor holds active professional liability insurance if handling sensitive infrastructure.'
    ],
    clauses: [
      {
        title: 'Section 3 - Intellectual Property Assignment',
        risk: 'Low',
        reason: 'IP transfers to the client only after full payment is received. This is a fair and standard protection mechanism for independent contractors.',
        recommendation: 'No action needed. Ensure payments are made on time to prevent any delays in IP transfer.'
      },
      {
        title: 'Section 6 - Termination for Convenience',
        risk: 'Low',
        reason: 'Either party may terminate the agreement with 15 days\' written notice, which is fair and allows for quick adaptation to changing business needs.',
        recommendation: 'No action needed.'
      }
    ],
    verification: {
      status: 'Pending'
    }
  }
};

export const defaultReport = mockReports['ANL-001'];
