import laborSignals from "@/lib/data/series/labor_ai_signals_2025_2030.json";
import type { Slide43LaborExposureData } from "@/lib/data/types";

const rows = laborSignals as Array<{
  metric: string;
  value_pct: number;
  source_note: string;
  group: "exposure" | "employer";
}>;

export const slide43LaborExposureData: Slide43LaborExposureData = {
  sectionLabel: "INTERSECTION - LABOR",
  title: "Labor exposure is broad and automation plans are accelerating",
  subtitle: "Sourced values only: 2025 labor exposure and 2030 employer planning signals",
  body: "ILO's 2025 index puts exposure at 25% globally (34% in high-income economies; 11% in low-income). WEF reports 73% of employers plan task automation and 41% expect workforce reductions by 2030.",
  signals: rows.map((row) => ({
    metric: row.metric,
    valuePct: row.value_pct,
    sourceNote: row.source_note,
    group: row.group
  })),
  sourceLine: "Source: ILO-NASK Generative AI and Jobs Index (2025); World Economic Forum Future of Jobs Report 2025"
};
