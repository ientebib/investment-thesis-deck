import shareSeries from "@/lib/data/series/training_vs_inference_share_2018_2030.json";
import type { Slide40InferenceEconomicsData } from "@/lib/data/types";

const rows = shareSeries as Array<{
  year: number;
  training_pct: number;
  inference_pct: number;
}>;

export const slide40InferenceEconomicsData: Slide40InferenceEconomicsData = {
  sectionLabel: "THESIS B - ECONOMICS",
  title: "Inference is 45% of compute spend and growing",
  subtitle: "Agentic workloads turn single prompts into sustained reasoning sessions",
  body: "Models get cheaper per token, but usage grows faster. As workloads shift from single queries to autonomous multi-step agents, inference share compounds and keeps physical infrastructure demand elevated.",
  years: rows.map((row) => row.year),
  trainingPct: rows.map((row) => row.training_pct),
  inferencePct: rows.map((row) => row.inference_pct),
  sourceLine: "Source: SemiAnalysis, company disclosures, Epoch AI"
};
