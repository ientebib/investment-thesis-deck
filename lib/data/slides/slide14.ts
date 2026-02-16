import dmCoreInflationSeries from "@/lib/data/series/dm_core_inflation.json";
import type { Slide14CoreInflationData } from "@/lib/data/types";

const inflationRows = dmCoreInflationSeries as Array<{
  date: string;
  us: number;
  euro_area: number;
  uk: number;
  canada: number;
  australia: number;
}>;

export const slide14CoreInflationData: Slide14CoreInflationData = {
  sectionLabel: "MACRO THESIS",
  title: "Core inflation has settled higher than pre-2020 across every major DM economy",
  subtitle:
    "Inflation has not returned to pre-COVID levels. We appear to be entering a structurally higher regime above the target rate of most major central banks.",
  dates: inflationRows.map((row) => row.date),
  us: inflationRows.map((row) => row.us),
  euroArea: inflationRows.map((row) => row.euro_area),
  uk: inflationRows.map((row) => row.uk),
  canada: inflationRows.map((row) => row.canada),
  australia: inflationRows.map((row) => row.australia),
  projectionStartDate: "2025-10",
  targetInflation: 2,
  sourceLine: "Source: Goldman Sachs. Dashed divider marks forecast horizon."
};
