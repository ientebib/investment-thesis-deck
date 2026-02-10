import gpuSeries from "@/lib/data/series/gpu_generation_training_ladder_2023_2026.json";
import type { Slide56GpuGenerationData } from "@/lib/data/types";

const rows = gpuSeries as Array<{
  model: string;
  cluster_size: number;
  generation: string;
}>;

export const slide56GpuGenerationData: Slide56GpuGenerationData = {
  sectionLabel: "APPENDIX - AI INFRASTRUCTURE",
  title: "Each GPU generation unlocks a new frontier of training scale",
  subtitle: "GPT-5.3-Codex (Feb 2026) is the first frontier model fully trained on NVIDIA GB200 NVL72",
  points: rows.map((row) => ({
    model: row.model,
    clusterSize: row.cluster_size,
    generation: row.generation
  })),
  sourceLine: "Source: OpenAI, NVIDIA, SemiAnalysis, The Information. Cluster sizes are best public estimates."
};
