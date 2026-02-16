import mineralsConcentrationSeries from "@/lib/data/series/strategic_minerals_refining_share.json";
import type { Slide24MineralConcentrationData } from "@/lib/data/types";

const rows = mineralsConcentrationSeries as Array<{ mineral: string; share_pct: number }>;

export const slide24MineralConcentrationData: Slide24MineralConcentrationData = {
  sectionLabel: "MACRO THESIS",
  title: "China refines 19 of the 20 strategic minerals the IEA tracks",
  subtitle: "Average market share: ~70%. Gallium: 98.7%. Magnesium: 95%. Rare earths: ~90%",
  minerals: rows.map((row) => row.mineral),
  refiningSharePct: rows.map((row) => row.share_pct),
  sourceLine: "Source: Various. See IEA Critical Minerals report."
};
