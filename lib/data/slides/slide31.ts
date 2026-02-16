import metrSeries from "@/lib/data/series/metr_task_horizon_models.json";
import type { Slide31TaskHorizonData } from "@/lib/data/types";

const rows = metrSeries as Array<{
  group: "sota" | "non_sota";
  x_month: number;
  horizon_hours: number;
  label: string | null;
  ci_low_hours: number | null;
  ci_high_hours: number | null;
}>;

export const slide31TaskHorizonData: Slide31TaskHorizonData = {
  sectionLabel: "THESIS B - SCALING",
  title: "The task horizon is doubling every 4.3 months",
  subtitle: "METR Horizon v1.1 - GPT-5.2 can complete tasks that take humans roughly 6.5 hours",
  points: rows.map((row) => ({
    group: row.group,
    xMonth: row.x_month,
    horizonHours: row.horizon_hours,
    label: row.label,
    ciLowHours: row.ci_low_hours,
    ciHighHours: row.ci_high_hours
  })),
  sourceLine: "Source: METR Horizon v1.1 benchmark; p50 = median task duration where AI succeeds 50% of the time"
};
