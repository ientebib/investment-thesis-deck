import trainingComputeSeries from "@/lib/data/series/training_compute_models_2019_2026.json";
import type { Slide34TrainingComputeData } from "@/lib/data/types";

const rows = trainingComputeSeries as Array<{
  group: "frontier" | "other";
  publication_year: number;
  training_flop: number;
  label: string;
}>;

export const slide34TrainingComputeData: Slide34TrainingComputeData = {
  sectionLabel: "AI INFRASTRUCTURE",
  title: "Training compute has grown 5 orders of magnitude since 2017",
  subtitle:
    "Each generation requires substantially more compute - from roughly 10^21 to around 5x10^26 FLOP in less than a decade",
  points: rows.map((row) => ({
    group: row.group,
    publicationYear: row.publication_year,
    trainingFlop: row.training_flop,
    label: row.label
  })),
  highlightLabels: [
    "GPT-3",
    "GPT-3.5",
    "GPT-4",
    "GPT-4.5",
    "GPT-5",
    "Grok 3",
    "Grok 4",
    "Grok-2",
    "Gemini Ultra",
    "PaLM",
    "PaLM 2",
    "Llama 3.1-405B",
    "Llama 4 Behemoth",
    "Claude 2",
    "Claude 3.5 Sonnet",
    "Claude 3.7 Sonnet",
    "DeepSeek-V3",
    "DeepSeek-R1",
    "Gopher"
  ],
  sourceLine: "Source: Epoch AI Notable AI Models database"
};
