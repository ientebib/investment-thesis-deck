import metalPricesSeries from "@/lib/data/series/metal_prices_indexed_2021_2026.json";
import type { Slide26BeyondGoldData } from "@/lib/data/types";

const rows = metalPricesSeries as Array<{
  date: string;
  silver_index: number | null;
  copper_index: number | null;
  uranium_index: number | null;
}>;

export const slide26BeyondGoldData: Slide26BeyondGoldData = {
  sectionLabel: "MACRO THESIS",
  title: "Beyond gold: silver, copper, and uranium are repricing on structural demand",
  subtitle: "Electrification, AI infrastructure, and reshoring are converging on the same constrained supply chains",
  cards: [
    {
      title: "Silver",
      range: "$26.4/oz -> $79.1/oz",
      description:
        "Industrial demand exceeds mine supply for the fourth consecutive year. Solar consumes about 20% of annual production while monetary demand rises.",
      tone: "neutral"
    },
    {
      title: "Copper",
      range: "$4.09/lb -> $5.88/lb",
      description:
        "EVs, solar buildout, and AI data centers all push demand higher. Supply remains slow because major new mines take nearly two decades to scale.",
      tone: "secondary"
    },
    {
      title: "Uranium",
      range: "$28.7/lb -> $63.5/lb",
      description:
        "Nuclear capacity expansion and hyperscaler interest in baseload power increase long-cycle fuel demand after a decade of underinvestment.",
      tone: "primary"
    }
  ],
  reshoringTitle: "Reshoring & tariffs",
  reshoringBody:
    "Industrial policy is redirecting massive public capital toward domestic manufacturing, clean energy, and infrastructure. Reshoring, export controls, and tariffs are reshaping supply chains and tightening already constrained commodity markets.",
  dates: rows.map((row) => row.date),
  silverIndex: rows.map((row) => row.silver_index),
  copperIndex: rows.map((row) => row.copper_index),
  uraniumIndex: rows.map((row) => row.uranium_index),
  sourceLine:
    "Source: Yahoo Finance futures monthly closes (SI=F, HG=F) through February 9, 2026; FRED PURANUSDM (IMF uranium price) through December 2025"
};
