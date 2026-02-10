import japanUkYieldSeries from "@/lib/data/series/japan_uk_yields.json";
import type { Slide13GlobalRepricingData } from "@/lib/data/types";

const yieldRows = japanUkYieldSeries as Array<{
  date: string;
  japan_10y: number;
  uk_10y: number;
  jpyusd: number;
  gbpusd: number;
}>;

export const slide13GlobalRepricingData: Slide13GlobalRepricingData = {
  sectionLabel: "THESIS A - GLOBAL",
  title: "This is not just the US",
  subtitle: "Japan and the UK are repricing long-run constraints",
  dates: yieldRows.map((row) => row.date),
  japan10y: yieldRows.map((row) => row.japan_10y),
  jpyusd: yieldRows.map((row) => row.jpyusd),
  uk10y: yieldRows.map((row) => row.uk_10y),
  gbpusd: yieldRows.map((row) => row.gbpusd),
  yccAdjustmentDate: "2022-12",
  brexitDate: "2016-06",
  trussDate: "2022-09",
  sourceLine: "Source: FRED, Bank of Japan, Bank of England"
};
