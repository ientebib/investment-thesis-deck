import centralBankGoldSeries from "@/lib/data/series/central_bank_gold_purchases.json";
import type { Slide19CentralBankGoldData } from "@/lib/data/types";

const rows = centralBankGoldSeries as Array<{
  year: number;
  net_purchases_tonnes: number;
  source_note: string;
}>;

export const slide20CentralBankGoldData: Slide19CentralBankGoldData = {
  sectionLabel: "REAL ASSETS - GOLD",
  title: "Central-bank buying stayed elevated in 2025 after three 1,000t+ years",
  subtitle: "Annual net change in central-bank gold holdings (tonnes)",
  years: rows.map((row) => row.year),
  netPurchasesTonnes: rows.map((row) => row.net_purchases_tonnes),
  highlightYears: [2022, 2023, 2024],
  sourceLine: "Source: World Gold Council, Gold Demand Trends FY2025",
  note: "2025 figure reflects full-year data (863t). Net purchases include reported and estimated unreported activity."
};
