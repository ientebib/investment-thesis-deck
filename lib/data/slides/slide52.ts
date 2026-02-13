import type { Slide52RiskArchitectureData } from "@/lib/data/types";

export const slide52RiskArchitectureData: Slide52RiskArchitectureData = {
  sectionLabel: "WHAT WE EXPECT & FUND TERMS",
  title: "Risk architecture",
  subtitle: "Every risk has a structural mitigation built into the fund design",
  riskFactorsTitle: "Risk Factors",
  riskFactors: [
    "Market risk across concentrated long positions",
    "Crypto and FX volatility at the position level",
    "Liquidity risk in alternative and smaller-cap positions",
    "Correlation risk in macro drawdowns across asset classes",
    "Regulatory and geopolitical disruption to portfolio themes",
    "Key-person risk concentrated in a small team"
  ],
  mitigantsTitle: "Structural Mitigants",
  mitigants: [
    "10% single-position limit enforces diversification",
    "No margin and no outright shorts eliminates forced liquidation risk",
    "Multi-asset class exposure (equities, commodities, crypto, FX, Treasuries)",
    "Conviction positions sized with defined downside tolerance",
    "Quarterly NAV reporting with direct LP-to-GP communication",
    "10-year lock-up aligns incentives and prevents forced selling"
  ],
  stressTitle: "Stress scenario — what if everything goes wrong?",
  stressCards: [
    { title: "-50% Portfolio", detail: "No margin means no forced liquidation; fund can wait for recovery" },
    { title: "Correlation Spike", detail: "Multi-asset diversification limits single-scenario drawdown" },
    { title: "Liquidity Freeze", detail: "Long-only structure with no leverage eliminates margin calls" },
    { title: "Regime Reversal", detail: "Conviction positions underwritten with 3-5 year thesis horizon" }
  ],
  conclusion: "A long-only, no-leverage structure with position limits creates natural downside protection. The concentrated thesis creates the upside.",
  sourceLine: ""
};
