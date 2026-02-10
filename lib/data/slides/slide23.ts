import mineLeadSeries from "@/lib/data/series/mine_development_timelines.json";
import type { Slide23MineLeadTimesData } from "@/lib/data/types";

const rows = mineLeadSeries as Array<{
  period: string;
  years: number;
  category: "operating" | "projected";
}>;

export const slide23MineLeadTimesData: Slide23MineLeadTimesData = {
  sectionLabel: "REAL ASSETS - SUPPLY INELASTICITY",
  title: "Mine development timelines have tripled in three decades",
  subtitle: "Even if demand signals are clear today, new supply cannot respond for 18-29 years",
  periods: rows.map((row) => row.period),
  yearsToProduction: rows.map((row) => row.years),
  projectedPeriod: "Non-Operating (Projected)",
  sourceLine: "Source: S&P Global Market Intelligence - Study of 268 mines across 23 countries (2024)"
};
