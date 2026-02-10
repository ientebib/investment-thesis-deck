import type { Slide17UsAdvantageData } from "@/lib/data/types";

export const slide17UsAdvantageData: Slide17UsAdvantageData = {
  sectionLabel: "THESIS A - STRUCTURAL ADVANTAGE",
  title: "The US still grows. Most developed economies don't",
  subtitle:
    "AI and reindustrialization can drive US GDP growth, but growth alone does not protect the dollar or reverse the fiscal trajectory.",
  cards: [
    {
      title: "Growth & Pro-Business Environment",
      metric: "2.4%",
      description: "IMF 2026 GDP forecast — roughly 2x the Eurozone and 3x Japan.",
      points: [
        "21% corporate tax vs 23.5% OECD average; #3 World Bank B-READY ranking.",
        "Population still growing +0.5%/yr while Japan, Germany, and China decline.",
        "$940B R&D spending at 3.45% of GDP — highest absolute total globally."
      ],
      tone: "primary"
    },
    {
      title: "Supply Chain & Resource Dependency",
      metric: "15",
      description: "Critical minerals where the US is 100% import-reliant (USGS).",
      points: [
        ">90% of leading-edge chips fabricated in Taiwan; no domestic alternative.",
        "China controls 98% of gallium and 90%+ of graphite and rare-earth processing.",
        "88% of DoD supply chains have exposure to Chinese-sourced materials."
      ],
      tone: "negative"
    },
    {
      title: "Energy & Innovation Dominance",
      metric: "8 of 10",
      description: "Largest companies globally are American. Largest oil producer at 13.2M bbl/d.",
      points: [
        "Net energy exporter since 2019 — +9.3 quads, highest surplus ever recorded.",
        "$109.1B AI investment in 2024 — 12x China's total (Stanford HAI).",
        "73% of global top-100 market cap; 50% of global unicorns; 57% of VC flows."
      ],
      tone: "primary"
    },
    {
      title: "Geopolitical & Institutional Risk",
      metric: "57%",
      metricDelta: "from 72%",
      description: "USD share of global reserves at a 30-year low. No AAA rating remaining.",
      points: [
        "All three agencies have downgraded US sovereign credit — first time in history.",
        "Only 17% of Americans trust the federal government (Pew, 2024).",
        "BRICS nations now 37-42% of world GDP (PPP) vs G7 at 29.6%."
      ],
      tone: "negative"
    }
  ],
  tensionLabel: "The tension",
  tensionBody:
    "The US can grow its way forward, but the path runs through fiscal expansion, AI-driven labor disruption, and commodity-intensive reindustrialization. GDP rises, while deficits and inflation pressure can rise with it.",
  sourceLine: "Source: IMF WEO Jan 2026; EIA; USGS MCS 2025; NSF NCSES; Stanford HAI; Pew Research; World Bank B-READY 2024."
};
