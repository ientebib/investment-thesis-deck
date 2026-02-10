import policyUncertaintyQuarterly from "@/lib/data/series/policy_uncertainty_quarterly_legacy.json";
import type { Slide16PolicyUncertaintyData } from "@/lib/data/types";

const policySeries = policyUncertaintyQuarterly as {
  qLabels: string[];
  tpuData: number[];
  gprData: number[];
  fiscalData: number[];
  vixData: number[];
};

export const slide16PolicyUncertaintyData: Slide16PolicyUncertaintyData = {
  sectionLabel: "THESIS A - POLICY",
  title: "Policy uncertainty is structural, not episodic",
  subtitle: "Tariffs, sanctions, and fiscal expansion create persistent repricing across asset classes",
  qLabels: policySeries.qLabels,
  panels: [
    {
      key: "trade",
      title: "Trade Policy Uncertainty",
      valueLabel: "2,205",
      valueDate: "Jan 2026",
      baseline: 100,
      baselineLabel: "Avg (100)",
      tone: "negative",
      series: policySeries.tpuData
    },
    {
      key: "geopolitical",
      title: "Geopolitical Risk Index",
      valueLabel: "164",
      valueDate: "Jan 2026",
      baseline: 100,
      baselineLabel: "Avg (100)",
      tone: "secondary",
      series: policySeries.gprData
    },
    {
      key: "fiscal",
      title: "Fiscal Policy Uncertainty",
      valueLabel: "438",
      valueDate: "Jan 2026",
      baseline: 100,
      baselineLabel: "Avg (100)",
      tone: "primary",
      series: policySeries.fiscalData
    },
    {
      key: "vix",
      title: "CBOE VIX",
      valueLabel: "22",
      valueDate: "Jan 2026",
      baseline: 20,
      baselineLabel: "Avg (20)",
      tone: "caution",
      series: policySeries.vixData
    }
  ],
  sourceLine:
    "Source: Baker, Bloom & Davis (EPU, TPU, Fiscal); Caldara & Iacoviello (GPR); CBOE (VIX); policyuncertainty.com."
};
