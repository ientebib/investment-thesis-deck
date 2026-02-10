import type { Slide03CapitalSplitData } from "@/lib/data/types";

export const slide03CapitalSplitData: Slide03CapitalSplitData = {
  sectionLabel: "FUND STRUCTURE",
  title: "Anchored in real assets. Driven by structural conviction",
  subtitle: "Protected downside with uncapped upside",
  centerValue: "$20M",
  centerCaption: "LP CAPITAL",
  pillars: [
    {
      concept: "real_estate",
      title: "REAL ESTATE (~45%)",
      allocationPct: 45,
      description:
        "Triple-net commercial real estate with investment-grade tenants. Contractual USD cash flows with hard asset collateral.",
      rows: [
        { label: "Structure", value: "100% equity → 55% LTV refi" },
        { label: "Tenants", value: "AAA credit, NNN lease" },
        { label: "Debt", value: "10yr term, 30yr amortization" },
        { label: "NOI", value: "Surplus → U.S. Treasuries" }
      ]
    },
    {
      concept: "structural_long",
      title: "STRUCTURAL LONG PORTFOLIO (~55%)",
      allocationPct: 55,
      description:
        "Long-duration positions in commodities, infrastructure, real assets, and technology across secular macro themes.",
      rows: [
        { label: "Permitted", value: "Equities, ETFs, commodities, FX, futures, options, crypto" },
        { label: "Max Position", value: "10% of portfolio NAV" },
        { label: "Prohibited", value: "Margin, borrowing, shorts" },
        { label: "Benchmark", value: "S&P 500 Total Return" }
      ]
    }
  ],
  sourceLine: "Source: Internal fund construction model (target allocation and constraints), Feb 2026"
};
