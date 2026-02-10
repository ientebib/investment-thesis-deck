import demandInputs from "@/lib/data/series/ai_demand_physical_inputs_2024_2030.json";
import type { Slide42IntersectionDemandData } from "@/lib/data/types";

const rows = demandInputs as Array<{
  input: string;
  unit: string;
  growth_pct: number;
  value_2024: number;
  value_2030: number;
}>;

export const slide42IntersectionDemandData: Slide42IntersectionDemandData = {
  sectionLabel: "INTERSECTION",
  title: "AI is deflationary in cognition. Inflationary in everything it needs to run",
  subtitle: "Physical bottlenecks are now the real constraint layer",
  body: "Electricity, copper, grid hardware, aluminum, advanced packaging, and specialized memory all face permitting, geopolitical, and supply-chain bottlenecks.",
  inputs: rows.map((row) => ({
    input: row.input,
    unit: row.unit,
    growthPct: row.growth_pct,
    value2024: row.value_2024,
    value2030: row.value_2030
  })),
  sourceLine: "Source: IEA, McKinsey, Goldman Sachs commodity research"
};
