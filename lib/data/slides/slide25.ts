import mineralDemandSeries from "@/lib/data/series/critical_mineral_demand_steps.json";
import type { Slide25MineralDemandData } from "@/lib/data/types";

const rows = mineralDemandSeries as Array<{
  mineral: string;
  index_2024: number;
  index_2030: number;
  index_2035: number;
  index_2040: number;
  kt_2024: number;
  kt_2030: number;
  kt_2035: number;
  kt_2040: number;
}>;

export const slide25MineralDemandData: Slide25MineralDemandData = {
  sectionLabel: "REAL ASSETS - DEMAND",
  title: "Critical mineral demand is accelerating across the board",
  subtitle:
    "Under stated policies, lithium demand more than doubles by 2030 and quadruples by 2040. Every mineral on this chart faces a supply gap.",
  minerals: rows.map((row) => row.mineral),
  index2024: rows.map((row) => row.index_2024),
  index2030: rows.map((row) => row.index_2030),
  index2035: rows.map((row) => row.index_2035),
  index2040: rows.map((row) => row.index_2040),
  kt2024: rows.map((row) => row.kt_2024),
  kt2030: rows.map((row) => row.kt_2030),
  kt2035: rows.map((row) => row.kt_2035),
  kt2040: rows.map((row) => row.kt_2040),
  sourceLine: "Source: IEA Global Critical Minerals Outlook 2025 (STEPS scenario)"
};
