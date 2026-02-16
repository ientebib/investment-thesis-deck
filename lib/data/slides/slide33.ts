import revenueSeries from "@/lib/data/series/ai_revenue_trajectories_2022_2026.json";
import type { Slide33RevenueTrajectoryData } from "@/lib/data/types";

const rows = revenueSeries as Array<{
  company: "OpenAI" | "Anthropic" | "xAI";
  x_month: number;
  arr_usd_billions: number;
}>;

function pointsFor(company: "OpenAI" | "Anthropic" | "xAI") {
  return rows
    .filter((row) => row.company === company)
    .map((row) => ({ x: row.x_month, y: row.arr_usd_billions }));
}

export const slide33RevenueTrajectoryData: Slide33RevenueTrajectoryData = {
  sectionLabel: "THE AI BUILDOUT - BUSINESS",
  title: "Revenue is already materializing - faster than any prior technology wave",
  subtitle:
    "The market is already paying for model output. OpenAI moved from ~$28M to ~$20B ARR in about three years; Anthropic from ~$100M to ~$9B in about two years.",
  openAi: pointsFor("OpenAI"),
  anthropic: pointsFor("Anthropic"),
  xAi: pointsFor("xAI"),
  sourceLine: "Source: Epoch AI; company disclosures; The Information; Bloomberg; CNBC"
};
