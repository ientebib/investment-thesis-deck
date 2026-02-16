import trainingCostSeries from "@/lib/data/series/training_cost_models_2016_2025.json";
import type { Slide35TrainingCostData } from "@/lib/data/types";

const rows = trainingCostSeries as Array<{
  publication_year: number;
  training_cost_2023_usd: number;
  label: string;
}>;

export const slide35TrainingCostData: Slide35TrainingCostData = {
  sectionLabel: "THESIS B - AI COMPUTE",
  title: "Training costs have crossed $500M - approaching $1B per run",
  subtitle:
    "More compute per model means more chips, power, and cooling. Frontier training is now megaproject-scale capex.",
  points: rows.map((row) => ({
    publicationYear: row.publication_year,
    trainingCost2023Usd: row.training_cost_2023_usd,
    label: row.label
  })),
  highlightLabels: [
    "GPT-2",
    "GPT-3",
    "GPT-3.5",
    "GPT-4",
    "GPT-4.5",
    "Grok 3",
    "Grok 4",
    "Grok-2",
    "Gemini Ultra",
    "PaLM",
    "Llama 3.1-405B",
    "Claude 2",
    "Claude 3.5 Sonnet",
    "DeepSeek-V3",
    "DeepSeek-R1",
    "BERT-Large",
    "OpenAI Five",
    "BLOOM-176B",
    "Gopher",
    "LLaMA-65B",
    "Llama 4 Behemoth"
  ],
  sourceLine: "Source: Epoch AI Notable AI Models database; costs in 2023 USD"
};
