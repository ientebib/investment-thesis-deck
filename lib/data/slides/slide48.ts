import type { Slide48LeadingIndicatorsData } from "@/lib/data/types";

export const slide48LeadingIndicatorsData: Slide48LeadingIndicatorsData = {
  sectionLabel: "PORTFOLIO - LEADING INDICATORS",
  title: "What we track",
  subtitle: "Three signal towers feed one decision engine: buildout velocity, macro constraints, and market regime",
  towers: [
    {
      title: "AI Buildout",
      tone: "primary",
      points: [
        "Capex revision breadth: hyperscaler guidance revision momentum.",
        "Power conversion pace: queue conversion and energization delay trend.",
        "Packaging and HBM tightness: CoWoS and HBM lead-time slope.",
        "Training-to-inference mix: deployment intensity and monetization quality."
      ]
    },
    {
      title: "Macro Regime",
      tone: "secondary",
      points: [
        "Term premium and curve structure: discount-rate repricing pressure.",
        "Real-rate and breakeven split: growth shock versus inflation shock.",
        "Debt-service and fiscal impulse: policy room to absorb shocks.",
        "Commodity supply response lag: constraints feeding inflation persistence."
      ]
    },
    {
      title: "Market Regime and Positioning",
      tone: "negative",
      points: [
        "Index valuation state: CAPE, trailing and forward P/E, earnings-yield spread.",
        "Volatility and policy uncertainty composites across markets.",
        "Cross-asset stress transmission: rates, FX, metals, credit, and equities.",
        "Crowding and breadth deterioration checks."
      ]
    }
  ],
  coverageTitle: "Monitoring coverage map",
  coverageRows: [
    {
      cadence: "Daily",
      aiBuildout: "Primary",
      macro: "Primary",
      market: "Primary",
      action: "Size risk and update gross/net exposure."
    },
    {
      cadence: "Weekly",
      aiBuildout: "Primary",
      macro: "Secondary",
      market: "Primary",
      action: "Rotate conviction weights and tighten stops."
    },
    {
      cadence: "Monthly + Event",
      aiBuildout: "Secondary",
      macro: "Primary",
      market: "Secondary",
      action: "Re-underwrite, re-rank, and approve adds/exits."
    }
  ],
  sourceLine: "Source: Internal investment committee dashboard schema and linked public data feeds"
};
