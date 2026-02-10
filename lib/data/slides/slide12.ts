import termPremiumSeries from "@/lib/data/series/term_premium_10y.json";
import type { Slide12TermPremiumData } from "@/lib/data/types";

const termPremiumRows = termPremiumSeries as Array<{ date: string; value: number }>;

export const slide12TermPremiumData: Slide12TermPremiumData = {
  sectionLabel: "MACRO THESIS",
  title: "The term premium is back",
  subtitle:
    "After a decade of suppression, investors are again demanding compensation for holding long-duration government debt.",
  dates: termPremiumRows.map((row) => row.date),
  values: termPremiumRows.map((row) => row.value),
  recessionPeriods: [
    { start: "2001-03-01", end: "2001-11-01" },
    { start: "2007-12-01", end: "2009-06-01" },
    { start: "2020-02-01", end: "2020-04-01" }
  ],
  sourceLine: "Source: Board of Governors of the Federal Reserve System (US) via FRED. Shaded areas indicate U.S. recessions."
};
