import type { Slide51TermsAtGlanceData } from "@/lib/data/types";

export const slide51TermsAtGlanceData: Slide51TermsAtGlanceData = {
  sectionLabel: "WHAT WE EXPECT & FUND TERMS",
  title: "Terms at a glance",
  subtitle: "Key economics, governance, and liquidity mechanics",
  panels: [
    {
      title: "Fee Structure",
      rows: [
        { label: "Management Fee", value: "2.0% committed capital (years 1-5), 2.0% NAV (years 6-10)" },
        { label: "Carried Interest", value: "20% above 9% preferred" },
        { label: "Preferred Return", value: "9.0% cumulative" },
        { label: "GP Catch-Up", value: "100% until 20% of profits" },
        { label: "Formation Fee", value: "1.0% of LP capital" }
      ]
    },
    {
      title: "Investment Guidelines",
      rows: [
        { label: "Permitted", value: "Equities, ETFs, bonds, commodities, FX, futures, options, crypto, Treasuries" },
        { label: "Max Single Position", value: "10% of portfolio NAV" },
        { label: "Margin", value: "Prohibited" },
        { label: "Outright Shorts", value: "Prohibited" },
        { label: "Derivatives Leverage", value: "Permitted" }
      ]
    },
    {
      title: "Liquidity",
      rows: [
        { label: "Years 1-5", value: "Full lock-up, no redemptions" },
        { label: "Years 6-10", value: "GP discretionary liquidation window" },
        { label: "Secondary Transfers", value: "90% NAV seller / 95% NAV buyer; 5% spread accrues to fund" },
        { label: "ROFR", value: "Existing LPs have first right of refusal" },
        { label: "GP Capital", value: "Locked until full dissolution" }
      ]
    },
    {
      title: "Reporting and Benchmarks",
      rows: [
        { label: "Real Estate (~45%)", value: "NCREIF Property Index" },
        { label: "Structural Long (~55%)", value: "S&P 500 Total Return" },
        { label: "Fund Level", value: "Weighted composite" },
        { label: "Reporting", value: "Quarterly NAV and annual letter" },
        { label: "Access", value: "Direct LP-to-GP communication" }
      ]
    }
  ],
  lifecycleTitle: "Fund lifecycle",
  lifecycleSegments: [
    { label: "Yr 1", tone: "secondary" },
    { label: "Yr 2", tone: "secondary" },
    { label: "Yr 3", tone: "secondary" },
    { label: "Yr 4", tone: "secondary" },
    { label: "Yr 5", tone: "secondary" },
    { label: "Yr 6", tone: "primary" },
    { label: "Yr 7", tone: "primary" },
    { label: "Yr 8", tone: "primary" },
    { label: "Yr 9", tone: "primary" },
    { label: "Yr 10", tone: "primary" }
  ],
  lifecycleNotes: [
    "Full Lock-Up - 2% fee on committed capital",
    "GP Discretionary Window - 2% fee on NAV"
  ],
  sourceLine: ""
};
