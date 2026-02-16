import type { Slide62UnderwriteData } from "@/lib/data/types";

export const slide62UnderwriteData: Slide62UnderwriteData = {
  sectionLabel: "APPENDIX - UNDERWRITING",
  title: "How we underwrite",
  subtitle: "Institutional gate-based underwriting with explicit failure conditions, kill-switches, and hard risk rails",
  gates: [
    {
      step: "1",
      title: "Structural demand quality",
      body: "End-market growth must remain durable through an entire cycle.",
      failCondition: "Fail if demand depends on one-off policy, subsidy, or single-buyer concentration."
    },
    {
      step: "2",
      title: "Supply-constraint persistence",
      body: "Scarcity duration must exceed what current valuation already discounts.",
      failCondition: "Fail if supply response can normalize before demand compounding peaks."
    },
    {
      step: "3",
      title: "Balance-sheet and liquidity integrity",
      body: "No plausible forced-seller path under adverse rates, spreads, or volumes.",
      failCondition: "Fail if covenant stress, refinancing fragility, or liquidity mismatch is material."
    },
    {
      step: "4",
      title: "Entry multiple and exit optionality",
      body: "Return profile must clear hurdle rates without multiple-expansion heroics.",
      failCondition: "Fail if the thesis requires precise timing to crystallize value."
    }
  ],
  sidePanels: [
    {
      title: "IC decision states",
      tone: "primary",
      bullets: [
        "Go: all gates pass and no trigger is active.",
        "Watch: thesis intact, but one gate is degrading.",
        "Pass / Exit: gate break persists beyond tolerance."
      ]
    },
    {
      title: "Kill-switch protocol",
      tone: "negative",
      bullets: [
        "Structural demand downgrade.",
        "Scarcity unwind faster than underwriting case.",
        "Balance-sheet stress above approved limits."
      ]
    },
    {
      title: "Non-negotiable risk rails",
      tone: "neutral",
      bullets: [
        "Max single position: 10% NAV.",
        "Margin / borrowing: prohibited.",
        "Outright shorts: prohibited.",
        "Mandatory re-underwrite on material signal break."
      ]
    }
  ],
  sourceLine: "Source: Internal IC underwriting playbook (v2026.02)"
};
