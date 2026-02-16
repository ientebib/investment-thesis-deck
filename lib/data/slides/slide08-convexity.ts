import type { Slide08ConvexityData } from "@/lib/data/types";

export const slide08ConvexityData: Slide08ConvexityData = {
  sectionLabel: "WHAT WE EXPECT & FUND TERMS",
  title: "The portfolio wins in every scenario",
  subtitle: "No matter what happens next, demand for real assets grows",
  xAxisLeft: "AI SLOWS DOWN",
  xAxisRight: "AI ACCELERATES",
  yAxisTop: "US STAYS DOMINANT",
  yAxisBottom: "GLOBAL ORDER FRACTURES",
  quadrants: [
    {
      title: "US dominance persists, AI underwhelms",
      narrative:
        "Governments keep interest rates low to manage their debt. Savings lose value over time. Gold, commodities, and energy assets are the few things that hold their purchasing power.",
      assets: "Gold · Silver · Copper · Energy infrastructure · TIPS · Crypto",
      tone: "secondary",
      position: "tl"
    },
    {
      title: "US dominance persists, AI delivers at scale",
      narrative:
        "Tech giants spend hundreds of billions building AI infrastructure. That requires enormous amounts of power, copper, and chips — all of which are already in short supply. Owners of those resources benefit directly.",
      assets: "Copper · Uranium · Semiconductors · Grid utilities · Datacenter REITs",
      tone: "primary",
      position: "tr"
    },
    {
      title: "Global order fractures, AI underwhelms",
      narrative:
        "Governments restrict capital movement and control where money flows. Traditional financial assets lose reliability. Hard assets like gold and energy become the safest stores of wealth.",
      assets: "Gold · Crypto · Commodity producers · Silver",
      tone: "caution",
      position: "bl"
    },
    {
      title: "Global order fractures, AI delivers at scale",
      narrative:
        "Countries stop sharing supply chains and each build their own. That means the world needs two or three of everything — doubling demand for the same scarce materials, driving prices higher.",
      assets: "Rare earths · Copper · Energy independence · Defense · Onshoring beneficiaries",
      tone: "negative",
      position: "br"
    }
  ],
  sourceLine: "Source: Stack Capital internal scenario analysis (February 2026)"
};
