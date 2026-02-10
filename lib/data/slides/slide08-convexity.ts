import type { Slide08ConvexityData } from "@/lib/data/types";

export const slide08ConvexityData: Slide08ConvexityData = {
  sectionLabel: "PORTFOLIO CONVEXITY",
  title: "Scenario matrix",
  subtitle: "How the portfolio performs across macro regimes",
  xAxisLeft: "ADOPTION STALLS",
  xAxisRight: "BROAD AUTOMATION",
  yAxisTop: "US HEGEMONY HOLDS",
  yAxisBottom: "US FRAGMENTS",
  quadrants: [
    {
      title: "Fiscal Repression",
      narrative:
        "Yield-curve control pins rates below inflation, engineering negative real returns for savers. Capital migrates toward gold, farmland, and energy infrastructure — the only assets that preserve purchasing power when the sovereign deliberately debases its own currency.",
      tone: "secondary",
      position: "tl"
    },
    {
      title: "Orderly Buildout",
      narrative:
        "Hyperscaler capex floods into data centers, grid upgrades, and mineral supply chains. Physical bottlenecks — copper, transformers, cooling water — tighten even as productivity gains accelerate. Hard-asset holders benefit from both rising demand and scarcity premiums.",
      tone: "primary",
      position: "tr"
    },
    {
      title: "Maximum Repression",
      narrative:
        "Capital controls, financial repression, and fiscal dominance converge. Governments direct credit and restrict cross-border flows. Hard assets become the only credible store of value as nominal instruments are subordinated to sovereign funding needs.",
      tone: "caution",
      position: "bl"
    },
    {
      title: "Accelerated Fragmentation",
      narrative:
        "Supply chains re-shore and duplicate across blocs, multiplying demand for physical capacity. Mineral and energy bottlenecks reach their most acute levels as every region races to build parallel infrastructure simultaneously.",
      tone: "negative",
      position: "br"
    }
  ],
  sourceLine: "Source: Stack Capital internal scenario analysis (February 2026)"
};
