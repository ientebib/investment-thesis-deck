import type { Slide52RiskArchitectureData } from "@/lib/data/types";

export const slide52RiskArchitectureData: Slide52RiskArchitectureData = {
  sectionLabel: "WHAT WE EXPECT & FUND TERMS",
  title: "Risk architecture",
  subtitle: "Every risk has a structural mitigation built into the fund design",
  riskFactorsTitle: "Risk Factors",
  riskFactors: [
    "Property value decline affecting refinancing ability",
    "Tenant default and loss of contractual cash flow",
    "Interest-rate risk at balloon refinancing in year 10",
    "Market risk across structural long portfolio positions",
    "Crypto and FX volatility at the position level",
    "Structural leverage through real estate debt"
  ],
  mitigantsTitle: "Structural Mitigants",
  mitigants: [
    "55% LTV hard cap preserves a 45% equity cushion",
    "AAA NNN tenants with contractual investment-grade cash flows",
    "Full NOI surplus accumulated in US Treasuries",
    "10% position limit enforces diversification",
    "No margin and no outright shorts",
    "30-year amortization for manageable debt service"
  ],
  stressTitle: "Stress scenario - what if everything goes wrong?",
  stressCards: [
    { title: "-30% Real Estate", detail: "45% equity cushion absorbs decline before LTV breach" },
    { title: "-50% Portfolio", detail: "No margin means no forced liquidation; RE collar preserves capital" },
    { title: "Tenant Default", detail: "AAA NNN lease plus T-bill reserve covers 2+ years debt service" },
    { title: "Rate Spike", detail: "10-year fixed term insulates from interim rate movements" }
  ],
  conclusion: "The real estate collar creates a structural floor. The structural long portfolio creates the upside.",
  sourceLine: ""
};
