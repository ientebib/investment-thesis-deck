import type { Slide50ScenarioAnalysisData } from "@/lib/data/types";

export const slide50ScenarioAnalysisData: Slide50ScenarioAnalysisData = {
  sectionLabel: "WHAT WE EXPECT & FUND TERMS",
  title: "Scenario analysis",
  subtitle: "Adjust assumptions to model projected returns. NOI escalates 2% annually. 10-year fund life",
  controls: [
    {
      id: "entryCapRatePct",
      label: "Entry Cap Rate",
      min: 3,
      max: 9,
      step: 0.25,
      defaultValue: 6,
      format: "percent_1"
    },
    {
      id: "exitCapRatePct",
      label: "Exit Cap Rate (Yr 10)",
      min: 4,
      max: 10,
      step: 0.25,
      defaultValue: 6,
      format: "percent_1"
    },
    {
      id: "loanRatePct",
      label: "Loan Rate",
      min: 3,
      max: 9,
      step: 0.25,
      defaultValue: 5.5,
      format: "percent_1"
    },
    {
      id: "structuralLongReturnPct",
      label: "Structural Long Portfolio Return",
      min: -100,
      max: 100,
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
    "Source: Internal scenario model. Projections are illustrative. 2% management fee (years 1-5 on committed capital, years 6-10 on NAV) and 20% carry above 9% preferred return."
};
