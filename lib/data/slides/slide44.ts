import almpSeries from "@/lib/data/series/oecd_almp_spending_2019_pct_gdp.json";
import type { Slide44FiscalPathData } from "@/lib/data/types";

const rows = almpSeries as Array<{
  country: string;
  pct_gdp: number;
  is_us: boolean;
}>;

export const slide44FiscalPathData: Slide44FiscalPathData = {
  sectionLabel: "INTERSECTION - FISCAL",
  title: "There is no fiscally neutral path through AI displacement",
  subtitle: "Labor-heavy tax systems face rising automation pressure",
  body: "60% of advanced-economy jobs are exposed to AI. UBI-style responses are possible in theory, but the US still relies on labor-heavy taxes and has not enacted a replacement tax base at comparable scale.",
  chartLabel: "Public spending on active labor market policies (% of GDP, 2019)",
  oecdAveragePct: 0.5,
  almpSeries: rows.map((row) => ({
    country: row.country,
    pctGdp: row.pct_gdp,
    isUs: row.is_us
  })),
  cards: [
    {
      title: "Revenue Concentration",
      metric: "84%",
      supportingLabel: "of FY2024 receipts tied to labor taxes",
      body: "Individual income plus social insurance receipts were $4.136T of $4.919T. VAT, AI-rent, and automation-tax proposals remain exploratory in current US federal policy.",
      source: "US Treasury FY2024 Table 2; RAND (Federal Revenue When AI Replaces Labor, 2025)",
      tone: "primary"
    },
    {
      title: "Safety Net Is Policy-Sensitive",
      metric: "$187B",
      supportingLabel: "SNAP cuts (2025-2034 estimate)",
      body: "P.L. 119-21 tightened eligibility and work rules while shifting costs to states. CBO estimated 2.4M fewer SNAP participants in an average month.",
      source: "CRS R48552 (Aug 15, 2025), summarizing CBO estimates (Jul 21 and Aug 11, 2025)",
      tone: "primary"
    },
    {
      title: "Workforce Adjustment Underfunded",
      metric: "~$20B",
      supportingLabel: "federal workforce programs today",
      body: "Down from roughly $60B inflation-adjusted in 1979 while the labor force grew about 50%. Core WIOA Titles I and II are about $6B.",
      source: "Brookings (May 23, 2023), citing GAO-19-200",
      tone: "secondary"
    }
  ],
  sourceLine: "Source: OECD SOCX (2019 baseline); US Treasury; RAND; CRS; CBO; Brookings"
};
