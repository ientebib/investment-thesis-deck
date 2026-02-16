import frontierPowerSeries from "@/lib/data/series/frontier_datacenter_power_2020_2029.json";
import type { Slide38DatacenterBuildoutData } from "@/lib/data/types";

const rows = frontierPowerSeries as Array<{
  year: string;
  actual_gw: number | null;
  projected_gw: number | null;
}>;

export const slide38DatacenterBuildoutData: Slide38DatacenterBuildoutData = {
  sectionLabel: "THESIS B - INFRASTRUCTURE",
  title: "The datacenter buildout is at megaproject scale",
  subtitle: "Operational AI datacenter power moves from low single digits to triple digits in GW terms",
  stats: [
    { value: "4.3", label: "2023 GW" },
    { value: "21", label: "2025 GW" },
    { value: "120", label: "2029 GW (proj.)" }
  ],
  years: rows.map((row) => row.year),
  actualGw: rows.map((row) => row.actual_gw),
  projectedGw: rows.map((row) => row.projected_gw),
  sourceLine: "Source: RAND / SemiAnalysis / Epoch AI"
};
