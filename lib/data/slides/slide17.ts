import type { Slide17UsAdvantageData } from "@/lib/data/types";

export const slide17UsAdvantageData: Slide17UsAdvantageData = {
  sectionLabel: "MACRO THESIS",
  title: "The US still grows. Most developed economies don't",
  subtitle:
    "AI and reindustrialization can drive US GDP growth, but growth alone does not protect the dollar or reverse the fiscal trajectory.",
  cards: [
    {
      title: "Growth & Pro-Business Environment",
      metric: "",
      description: "IMF 2026 GDP forecast — roughly 2x the Eurozone and 3x Japan.",
      points: [
        "Eurozone 1.2%, Japan 0.7%, and UK 1.3% on IMF 2026 forecasts.",
        "US population still growing +0.5%/yr while Japan, Germany, and China decline.",
        "$892B in R&D spending at ~3.5% of GDP, among the highest globally."
      ],
      tone: "primary"
    },
    {
      title: "Supply Chain & Resource Dependency",
      metric: "",
      description: "Strategic dependencies now extend beyond minerals into chips, pharma, shipping, and food systems.",
      points: [
        ">90% of leading-edge chips fabricated in Taiwan; no domestic alternative.",
        "USGS reports 15 nonfuel mineral commodities with 100% net import reliance (2024).",
        "Pharmaceutical supply chains remain heavily dependent on overseas API sourcing.",
        "US commercial shipbuilding capacity is minimal while external trade dependence remains high.",
        "US agriculture has shifted from long-running surpluses to recurring trade deficits."
      ],
      tone: "negative"
    },
    {
      title: "Energy & Innovation Dominance",
      metric: "",
      description: "Most valuable companies globally are American; the US remains the largest oil producer (~13.5M bbl/d).",
      points: [
        "Net energy exporter since 2019, supporting domestic reindustrialization capacity.",
        "$109.1B of private AI investment in 2024, nearly 12x China (Stanford HAI).",
        "US institutions produced 40 notable AI models in 2024 versus 15 in China (Stanford HAI)."
      ],
      tone: "primary"
    },
    {
      title: "Geopolitical & Institutional Risk",
      metric: "",
      description:
        "USD share of allocated global reserves is about 58% (IMF COFER), down from roughly 72% around 2000. No AAA rating remaining.",
      points: [
        "All three agencies have downgraded US sovereign credit — first time in history.",
        "Only 22% of Americans trust the federal government to do what is right most of the time (Pew, 2024).",
        "Political polarization and policy volatility are elevated, weakening institutional execution.",
        "Affordability pressures (housing, healthcare, and cost of living) are rising and widening social stress.",
        "BRICS now account for a larger share of world GDP (PPP) than the G7."
      ],
      tone: "negative"
    }
  ],
  tensionLabel: "The tension",
  tensionBody:
    "The US can grow its way forward, but the path runs through fiscal expansion, AI-driven labor disruption, and commodity-intensive reindustrialization. GDP rises, while deficits and inflation pressure can rise with it.",
  sourceLine:
    "Source: IMF WEO Jan 2026; IMF COFER; EIA; USGS MCS 2025; Stanford HAI AI Index 2025; Pew Research; Census Bureau (compiled Feb 2026)."
};
