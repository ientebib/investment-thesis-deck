import capacitySeries from "@/lib/data/series/datacenter_capacity_estimates_analysts.json";
import type { Slide39DatacenterLoadData } from "@/lib/data/types";

const rows = capacitySeries as Array<{
  analyst: string;
  current_gw_2024_25: number;
  projected_gw_2030_35: number;
}>;

export const slide39DatacenterLoadData: Slide39DatacenterLoadData = {
  sectionLabel: "THESIS B - POWER",
  title: "US datacenter load doubles to 130 GW by 2030",
  subtitle: "62 GW consumed in 2025, while capacity market pricing and queue dynamics indicate sustained power scarcity",
  analysts: rows.map((row) => row.analyst),
  currentGw: rows.map((row) => row.current_gw_2024_25),
  projectedGw: rows.map((row) => row.projected_gw_2030_35),
  sourceLine: "Source: Energy Institute, JPMAM, PJM Interconnection"
};
