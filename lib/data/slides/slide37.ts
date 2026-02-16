import capexSeries from "@/lib/data/series/hyperscaler_capex_2016_2026e.json";
import type { Slide37HyperscalerCapexData } from "@/lib/data/types";

const rows = capexSeries as Array<{
  year: string;
  amazon_capex_usd_billions: number;
  alphabet_capex_usd_billions: number;
  meta_capex_usd_billions: number;
  microsoft_capex_usd_billions: number;
}>;

export const slide37HyperscalerCapexData: Slide37HyperscalerCapexData = {
  sectionLabel: "AI INFRASTRUCTURE",
  title: "Hyperscaler capex is entering escape velocity",
  subtitle:
    "Microsoft, Meta, Alphabet, and Amazon are expected to spend above $600B this year, up materially from 2025 levels.",
  years: rows.map((row) => row.year),
  amazonCapexUsdBillions: rows.map((row) => row.amazon_capex_usd_billions),
  alphabetCapexUsdBillions: rows.map((row) => row.alphabet_capex_usd_billions),
  metaCapexUsdBillions: rows.map((row) => row.meta_capex_usd_billions),
  microsoftCapexUsdBillions: rows.map((row) => row.microsoft_capex_usd_billions),
  sourceLine:
    "Source: Company earnings (Q4 2025 / Q2 FY2026); 2026E = company guidance (META, GOOGL, AMZN) and Bloomberg consensus (MSFT)"
};
