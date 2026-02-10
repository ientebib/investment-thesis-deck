import type { Slide05NnnOpportunitiesData } from "@/lib/data/types";

export const slide05NnnOpportunitiesData: Slide05NnnOpportunitiesData = {
  sectionLabel: "REAL ESTATE FOUNDATION",
  title: "Illustrative NNN lease opportunities",
  subtitle:
    "The types of properties we target — investment-grade tenants, absolute NNN structure, long-duration cash flows",
  cards: [
    {
      category: "RETAIL NNN",
      title: "Chase Bank & Chipotle",
      subtitle: "821 Eau Gallie Blvd · Melbourne, FL 32935",
      image: "/assets/triple-net/chase_chipotle.jpeg",
      imageObjectPosition: "center 18%",
      rows: [
        { label: "Tenant", value: "Chase Bank & Chipotle" },
        { label: "Location", value: "821 Eau Gallie Blvd, Melbourne, FL 32935" },
        { label: "Acquisition Price", value: "$7,732,000" },
        { label: "Cap Rate", value: "4.6%" },
        { label: "NOI", value: "$355,687" },
        { label: "Remaining Lease Term", value: "15 Years" }
      ]
    },
    {
      category: "QSR NNN",
      title: "Wendy's",
      subtitle: "12135 Lem Turner Rd · Jacksonville, FL 32218",
      image: "/assets/triple-net/wendys.jpeg",
      rows: [
        { label: "Tenant", value: "Wendy's" },
        { label: "Location", value: "12135 Lem Turner Rd, Jacksonville, FL 32218" },
        { label: "Acquisition Price", value: "$2,352,500" },
        { label: "Cap Rate", value: "5.1%" },
        { label: "NOI", value: "$120,000" },
        { label: "Remaining Lease Term", value: "20.6 Years" }
      ]
    },
    {
      category: "SINGLE TENANT NNN",
      title: "TD Bank",
      subtitle: "Target Outparcel · 14995 SW 88TH STREET, MIAMI, FL",
      image: "/assets/triple-net/td_bank.jpeg",
      rows: [
        { label: "Tenant", value: "TD Bank" },
        { label: "Location", value: "14995 SW 88TH STREET, MIAMI, FL" },
        { label: "Acquisition Price", value: "$6,509,803" },
        { label: "Cap Rate", value: "5.11%" },
        { label: "NOI", value: "$332,750" },
        { label: "Remaining Lease Term", value: "12.1 Years" }
      ]
    }
  ],
  processSteps: [
    {
      title: "1. SOURCE",
      description: "Off-market and broker relationships across Florida, Texas, and Southeast US"
    },
    {
      title: "2. UNDERWRITE",
      description: "Tenant credit, lease structure, location demographics, replacement cost analysis"
    },
    {
      title: "3. FINANCE",
      description: "50-60% LTV, 3-5 yr fixed then adjustable, 25-30 yr amortization"
    },
    {
      title: "4. MANAGE & REFI",
      description: "Collect rent, season the asset, optimize the debt profile whenever possible"
    }
  ],
  sourceLine:
    "Illustrative opportunities only — not indicative of current fund holdings · Specific terms subject to negotiation and due diligence"
};
