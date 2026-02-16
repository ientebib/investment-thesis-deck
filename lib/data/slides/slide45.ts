import repressionReturns from "@/lib/data/series/repression_real_returns_1946_1980.json";
import type { Slide45FinancialRepressionData } from "@/lib/data/types";

const rows = repressionReturns as Array<{
  asset: string;
  real_return_pct: number;
}>;

export const slide45FinancialRepressionData: Slide45FinancialRepressionData = {
  sectionLabel: "INTERSECTION - ENDGAME",
  title: "Financial repression is the proven playbook for sovereign deleveraging",
  subtitle: "Real rates below nominal growth transfer wealth from nominal claims to the sovereign",
  body: "Real rates held below nominal growth for decades, silently transferring wealth from holders of nominal claims to the government. The same real assets that capture value from the AI buildout are the natural hedge.",
  chartLabel: "Real annualized returns during financial repression (1946-1980)",
  returns: rows.map((row) => ({
    asset: row.asset,
    realReturnPct: row.real_return_pct
  })),
  precedentTitle: "The Precedent",
  precedentMetricFrom: "119%",
  precedentMetricTo: "32%",
  precedentBody: "Debt-to-GDP fell 87 percentage points over 35 years of negative real rates, without default or hyperinflation.",
  todayTitle: "Today",
  todayMetric: "123%",
  todayBody: "US federal debt-to-GDP has surpassed the 1946 wartime peak for the first time in history.",
  sourceLine:
    "Source: Federal Reserve, BLS, Ibbotson SBBI, Dimson-Marsh-Staunton Global Returns; Dalio (Principles for Navigating Big Debt Crises, 2018)"
};
