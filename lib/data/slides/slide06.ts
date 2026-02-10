import type { Slide06NnnStructureData } from "@/lib/data/types";

export const slide06NnnStructureData: Slide06NnnStructureData = {
  sectionLabel: "REAL ESTATE FOUNDATION",
  title: "NNN leases in Florida: structure and financing",
  subtitle: "The asset, location edge, and debt profile",
  assetLabel: "THE ASSET",
  assetDescription:
    "Triple-net (NNN): the tenant pays property taxes, insurance, and maintenance. The landlord collects rent with near-zero operating cost. Tenants are investment-grade corporates on 10-20 year leases with 1.5-2% annual escalators.",
  whyFloridaLabel: "WHY FLORIDA",
  whyFloridaRows: [
    { label: "Population growth", value: "+2.1M since 2020" },
    { label: "State income tax", value: "None" },
    { label: "Net domestic migration", value: "#1 in US" },
    { label: "Landlord legal framework", value: "Strong protections" },
    { label: "GDP growth (2020-24)", value: "+32%" }
  ],
  migrationChartTitle: "FLORIDA NET DOMESTIC MIGRATION (THOUSANDS)",
  migrationYears: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  migrationValues: [235, 250, 290, 322, 290, 210, 330, 444, 406, 380],
  debtProfileLabel: "EXPECTED DEBT PROFILE",
  debtProfileRows: [
    { label: "Structure", value: "Buy all-equity, cash-out refi" },
    { label: "LTV", value: "55% (hard cap)" },
    { label: "Loan term", value: "10 years" },
    { label: "Amortization", value: "30 years (balloon at maturity)" },
    { label: "Rate assumption", value: "~5.5% fixed" },
    { label: "NOI surplus", value: "Retained in Treasuries" }
  ],
  noiDebtChartTitle: "ILLUSTRATIVE: NOI SURPLUS ACCUMULATION vs. BALLOON ($20M PROPERTY, 6% CAP)",
  noiDebtAssumptions: {
    propertyValue: 20000000,
    capRate: 0.06,
    ltv: 0.55,
    rate: 0.055,
    amortizationYears: 30,
    treasuryYield: 0.035,
    noiEscalation: 0.015,
    years: 10
  },
  sourceLine: "Source: U.S. Census Bureau; BEA; Florida Dept. of Revenue; market financing terms as of Q1 2026"
};
