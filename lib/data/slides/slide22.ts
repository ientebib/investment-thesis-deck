import goldYieldSeries from "@/lib/data/series/gold_vs_real_yield.json";
import type { Slide21GoldYieldData } from "@/lib/data/types";

const rows = goldYieldSeries as Array<{
  date: string;
  gold_price_ln: number;
  real_10y_yield: number;
}>;

export const slide22GoldYieldData: Slide21GoldYieldData = {
  sectionLabel: "MACRO THESIS",
  title: "The gold-real yield relationship broke in 2022",
  subtitle: "Gold is now priced as a hedge against institutional risk, not rates",
  dates: rows.map((row) => row.date),
  goldPriceLn: rows.map((row) => row.gold_price_ln),
  real10yYield: rows.map((row) => row.real_10y_yield),
  relationshipBreakDate: "2022-01-01",
  sourceLine: "Source: Federal Reserve, Bloomberg"
};
