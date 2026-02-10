import goldTreasuriesSeries from "@/lib/data/series/gold_vs_treasuries_reserves.json";
import type { Slide18GoldTreasuriesData } from "@/lib/data/types";

const rows = goldTreasuriesSeries as Array<{
  date: string;
  gold_holdings_trillions: number;
  treasury_holdings_trillions: number;
}>;

export const slide19GoldTreasuriesData: Slide18GoldTreasuriesData = {
  sectionLabel: "REAL ASSETS - GOLD",
  title: "Gold has overtaken Treasuries in central bank reserves",
  subtitle: "Sovereign reserve managers are diversifying away from dollar-denominated debt",
  dates: rows.map((row) => row.date),
  goldHoldingsTrillions: rows.map((row) => row.gold_holdings_trillions),
  treasuryHoldingsTrillions: rows.map((row) => row.treasury_holdings_trillions),
  sourceLine: "Source: IMF, Department of Treasury"
};
