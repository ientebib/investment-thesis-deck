import type { Slide50ScenarioAnalysisData } from "@/lib/data/types";

export const slide50ScenarioAnalysisData: Slide50ScenarioAnalysisData = {
  sectionLabel: "WHAT WE EXPECT & FUND TERMS",
  title: "Scenario analysis",
  subtitle: "Adjust assumptions to model projected returns. 10-year fund life",
  controls: [
    {
      id: "annualReturnPct",
      label: "Expected Annual Return",
      min: -30,
      max: 50,
      step: 1,
      defaultValue: 25,
      format: "percent_1"
    }
  ],
  metrics: [
    { key: "grossIrr", label: "Gross IRR", tone: "primary" },
    { key: "grossMoic", label: "Gross MOIC", tone: "primary" },
    { key: "lpNetIrr", label: "LP Net IRR", tone: "secondary" },
    { key: "lpNetMoic", label: "LP Net MOIC", tone: "secondary" },
    { key: "lpNetProfit", label: "LP Net Profit", tone: "secondary" },
    { key: "gpCarry", label: "GP Carry", tone: "caution" }
  ],
  sourceLine:
    "Source: Internal scenario model. Projections are illustrative. 2% management fee on NAV. 20% performance fee above 5% hurdle."
};
