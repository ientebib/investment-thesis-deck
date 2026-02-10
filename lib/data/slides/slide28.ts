import electricitySeries from "@/lib/data/series/china_us_electricity_generation_twh.json";
import type { Slide28AiPortfolioImpactData } from "@/lib/data/types";

const rows = electricitySeries as Array<{
  year: number;
  china_twh: number;
  us_twh: number;
}>;

export const slide28AiPortfolioImpactData: Slide28AiPortfolioImpactData = {
  sectionLabel: "AI INFRASTRUCTURE",
  title: "Why AI matters for this portfolio",
  subtitle:
    "Not a technology bet - a physical infrastructure bet. Every GPU cluster needs power, copper, and concrete.",
  cards: [
    {
      label: "Power demand",
      metric: "120 GW",
      description:
        "Projected US data center load by 2029 (from 4.3 GW in 2023), driving power-generation and grid capex.",
      tone: "primary"
    },
    {
      label: "Copper intensity",
      metric: "5-10x",
      description:
        "More copper per MW in data centers than traditional buildings, accelerating existing supply deficits.",
      tone: "secondary"
    },
    {
      label: "Capex cycle",
      metric: "$600B",
      description:
        "Large-platform 2026 capex guidance points to a multi-year physical infrastructure deployment phase.",
      tone: "primary"
    }
  ],
  years: rows.map((row) => row.year),
  chinaTwh: rows.map((row) => row.china_twh),
  usTwh: rows.map((row) => row.us_twh),
  sourceLine: "Source: IEA; Goldman Sachs; Ember; EIA; company earnings disclosures (2026)"
};
