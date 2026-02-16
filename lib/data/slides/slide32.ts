import usageSeries from "@/lib/data/series/ai_usage_growth_2023_2025.json";
import type { Slide32AdoptionData } from "@/lib/data/types";

const rows = usageSeries as Array<{ period: string; weekly_users_millions: number }>;

export const slide32AdoptionData: Slide32AdoptionData = {
  sectionLabel: "AI INFRASTRUCTURE",
  title: "AI adoption is unprecedented - consumer and enterprise",
  subtitle:
    "~900M weekly consumer users and 1.3M+ business customers across leading labs. OpenAI leads customer count while Anthropic has material enterprise spend share.",
  enterpriseLabel: "Enterprise adoption",
  cards: [
    {
      metric: "1M+",
      label: "OpenAI business customers",
      detail: "Enterprise seats up sharply YoY"
    },
    {
      metric: "300K+",
      label: "Anthropic business customers",
      detail: "Scaled from under 1K two years prior"
    },
    {
      metric: "65%",
      label: "Google Cloud customers using AI",
      detail: "Cloud backlog doubled to roughly $240B"
    }
  ],
  usageLabel: "Consumer - ChatGPT weekly active users",
  usagePeriods: rows.map((row) => row.period),
  usageMillions: rows.map((row) => row.weekly_users_millions),
  sourceLine:
    "Source: OpenAI (Nov 2025); Anthropic (Sep 2025); Google (Q4 2025 earnings); The Information (Dec 2025); Menlo Ventures"
};
