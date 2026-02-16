import spGoldRatioSeries from "@/lib/data/series/sp500_gold_ratio.json";
import type { Slide20SpGoldRatioData } from "@/lib/data/types";

const rows = spGoldRatioSeries as Array<{ date: string; sp500_gold_ratio: number }>;

export const slide21SpGoldRatioData: Slide20SpGoldRatioData = {
  sectionLabel: "MACRO THESIS",
  title: "Priced in gold, US equities have made no progress since the GFC",
  subtitle: "Equities have kept pace with money supply growth, but not with real store-of-value assets",
  dates: rows.map((row) => row.date),
  ratio: rows.map((row) => row.sp500_gold_ratio),
  sourceLine: "Source: S&P Global, LBMA, IndexMundi; ratio indexed to Q1 2006 = 100."
};
