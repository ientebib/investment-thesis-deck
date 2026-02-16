import copperSeries from "@/lib/data/series/copper_supply_demand_mt_2024_2040.json";
import type { Slide61CopperDeficitData } from "@/lib/data/types";

const rows = copperSeries as Array<{
  year: number;
  supply_mt: number;
  demand_mt: number;
}>;

export const slide61CopperDeficitData: Slide61CopperDeficitData = {
  sectionLabel: "APPENDIX - COPPER",
  title: "Even if every announced project proceeds, copper faces a ~27% supply deficit by 2035",
  subtitle: "Demand from electrification and AI infrastructure outpaces credible supply additions",
  points: rows.map((row) => ({
    year: row.year,
    supplyMt: row.supply_mt,
    demandMt: row.demand_mt
  })),
  deficitLabelYear: "2037",
  deficitLabelValueMt: 28,
  sourceLine: "Source: IEA Global Critical Minerals Outlook 2025 (STEPS), BloombergNEF"
};
