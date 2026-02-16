import bucketSeries from "@/lib/data/series/sp500_valuation_buckets_forward_returns.json";
import type { Slide53RegimeShiftData } from "@/lib/data/types";

const rows = bucketSeries as Array<{
  bucket: string;
  median_pct: number;
  p25_pct: number;
  p75_pct: number;
  observations: number;
}>;

export const slide53RegimeShiftData: Slide53RegimeShiftData = {
  sectionLabel: "LONG STRUCTURE PORTFOLIO SLEEVE",
  title: "Passive equity is no longer the core return driver",
  subtitle: "In high valuation regimes, alpha matters more than allocation",
  chartLabel: "Historical base rates by starting CAPE",
  buckets: rows.map((row) => ({
    bucket: row.bucket,
    medianPct: row.median_pct,
    p25Pct: row.p25_pct,
    p75Pct: row.p75_pct,
    observations: row.observations
  })),
  currentCape: 40.38,
  tableTitle: "S&P 500 valuation snapshot",
  snapshotRows: [
    { metric: "Shiller CAPE", current: "40.38", longRunMean: "17.33", signal: "98.8th percentile", tone: "negative" },
    { metric: "Trailing P/E", current: "29.75", longRunMean: "16.19", signal: "+84%", tone: "negative" },
{ metric: "Dividend Yield", current: "1.13%", longRunMean: "4.22%", signal: "-73%", tone: "negative" }
  ],
  whereWeAreTitle: "Where we are now",
  whereWeAreMetric: "CAPE 40.38",
  whereWeAreBody:
    "The 40+ bucket historically mapped to a -3.45% median next-10Y annualized real return, around the 98.8th percentile of historical CAPE readings.",
  implicationTitle: "Portfolio construction implication",
  implicationBody:
    "In high-starting-valuation regimes, index beta carries weaker long-horizon base rates. Allocation edge shifts to manager selection, dispersion capture, and non-index exposures that do not rely on multiple expansion.",
  sourceLine:
    "Source: Robert Shiller online data (Yale) and multpl.com valuation series (captured Monday, February 9, 2026; latest close Friday, February 6, 2026)."
};
