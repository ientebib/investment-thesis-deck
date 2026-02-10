import type { Slide29ValueChainData } from "@/lib/data/types";

export const slide29ValueChainData: Slide29ValueChainData = {
  sectionLabel: "THESIS B - VALUE CHAIN",
  title: "AI Value Chain: Constraint to Cash-Flow Map",
  subtitle: "Investment framing: physical bottlenecks first, capability conversion second, recurring monetization last",
  flowLabels: ["1. Physical constraints", "2. Model conversion", "3. Revenue capture"],
  phases: [
    {
      phaseTitle: "Physical layer",
      phaseDescription: "Hard assets and permitting cadence set the supply ceiling.",
      nodes: [
        {
          title: "Mining",
          subtitle: "Copper, lithium, rare earths",
          evidence: "Codelco 12%, Freeport, BHP, Albemarle, SQM, Lynas, MP Materials"
        },
        {
          title: "Refining",
          subtitle: "Chemical processing and purification",
          evidence: "China ~90% rare earths, ~70% lithium, ~40% copper; US refined lithium <3%"
        },
        {
          title: "Semiconductors",
          subtitle: "Fab capacity and advanced packaging",
          evidence: "TSMC ~70% foundry; NVIDIA ~90% AI GPU workloads"
        },
        {
          title: "Data centers",
          subtitle: "Power, cooling, networking",
          evidence: "AWS, Azure, Google, Meta capex expansion and power intensity"
        }
      ]
    },
    {
      phaseTitle: "Model layer",
      phaseDescription: "Post-training turns raw capability into reliable production behavior.",
      nodes: [
        {
          title: "Pre-training",
          subtitle: "Foundation capability from compute and data",
          evidence: "Frontier model training concentrated in a small set of labs"
        },
        {
          title: "Post-training",
          subtitle: "SFT + preference optimization + RLHF/RLAIF",
          evidence: "Specialized data-labeling and evaluation ecosystems are scaling quickly"
        },
        {
          title: "Deployment",
          subtitle: "Latency, safety, routing, and reliability loops",
          evidence: "Inference infrastructure and serving economics now drive product quality"
        }
      ]
    },
    {
      phaseTitle: "Revenue layer",
      phaseDescription: "Monetization compounds when inference is embedded in workflows.",
      nodes: [
        {
          title: "Inference",
          subtitle: "Token consumption from agents, copilots, and APIs",
          evidence: "Enterprise LLM spend mix continues shifting with rapid absolute growth"
        },
        {
          title: "Applications",
          subtitle: "Distribution and workflow ownership create pricing power",
          evidence: "Copilot and enterprise automation products are producing meaningful ARR"
        },
        {
          title: "Cash flow",
          subtitle: "Recurring gross profit funds the next model cycle",
          evidence: "Cloud/platform economics increasingly tied to AI workload growth"
        }
      ]
    }
  ],
  sourceLine:
    "Sources: TrendForce Q2 2025; IEA Global Critical Minerals Outlook 2025; Menlo Ventures State of GenAI in Enterprise (Jan 2026); public earnings (MSFT, AWS, GOOG, META, NVDA FY2025-26); Mordor Intelligence; S&P Global"
};
