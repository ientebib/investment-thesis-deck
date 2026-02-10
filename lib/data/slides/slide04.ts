import type { Slide04CapitalWaterfallData } from "@/lib/data/types";

export const slide04CapitalWaterfallData: Slide04CapitalWaterfallData = {
  sectionLabel: "FUND STRUCTURE",
  title: "How capital flows through the structure",
  subtitle: "100% equity acquisition → 55% LTV cash-out refinance → structural long portfolio",
  yAxisTitle: "Capital ($M)",
  yAxisMax: 24,
  yAxisStep: 4,
  points: [
    {
      label: "LP Capital",
      tickLabel: "LP Capital",
      base: 0,
      increase: 20,
      decrease: 0,
      total: 0,
      annotationText: "$20.0M",
      annotationDataset: "increase"
    },
    {
      label: "Property\\nAcquisition",
      tickLabel: ["Property", "Acquisition"],
      base: 0,
      increase: 0,
      decrease: 20,
      total: 0,
      annotationText: "($20.0M)",
      annotationDataset: "decrease"
    },
    {
      label: "Cash-Out\\nRefi (55%)",
      tickLabel: ["Cash-Out", "Refi (55%)"],
      base: 0,
      increase: 11,
      decrease: 0,
      total: 0,
      annotationText: "+$11.0M",
      annotationDataset: "increase"
    },
    {
      label: "Upfront\\nCosts",
      tickLabel: ["Upfront", "Costs"],
      base: 10.18,
      increase: 0,
      decrease: 0.82,
      total: 0,
      annotationText: "($0.82M)",
      annotationDataset: "decrease"
    },
    {
      label: "Structural\\nLong Portfolio",
      tickLabel: ["Structural", "Long Portfolio"],
      base: 0,
      increase: 0,
      decrease: 0,
      total: 10.18,
      annotationText: "$10.18M",
      annotationDataset: "total"
    }
  ],
  sourceLine:
    "Illustrative deployment · $20M LP capital · Upfront costs include formation, acquisition, and origination fees"
};
