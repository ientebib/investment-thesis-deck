import computeSpendSeries from "@/lib/data/series/ai_lab_compute_spend_openai_anthropic_2022_2025e.json";
import type { Slide60ComputeSpendData } from "@/lib/data/types";

const rows = computeSpendSeries as Array<{
  year: string;
  openai_usd_billions: number | null;
  anthropic_usd_billions: number | null;
}>;

export const slide60ComputeSpendData: Slide60ComputeSpendData = {
  sectionLabel: "APPENDIX - COMPUTE SPEND",
  title: "AI lab compute spend is doubling every year",
  subtitle: "Every dollar here flows into chips, power, and cooling - the physical layer of the AI stack",
  points: rows.map((row) => ({
    year: row.year,
    openAiUsdBillions: row.openai_usd_billions,
    anthropicUsdBillions: row.anthropic_usd_billions
  })),
  sourceLine: "Source: Epoch AI, The Information, company disclosures"
};
