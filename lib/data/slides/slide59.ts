import type { Slide59LlmWorkflowData } from "@/lib/data/types";

export const slide59LlmWorkflowData: Slide59LlmWorkflowData = {
  sectionLabel: "APPENDIX",
  title: "How large language models work",
  subtitle: "A simplified view of the architecture behind frontier AI systems",
  pipelineSteps: [
    {
      step: "1",
      title: "Training data",
      body: "Trillions of tokens from internet, code, books, and licensed datasets establish statistical priors.",
      tone: "primary"
    },
    {
      step: "2",
      title: "Transformer",
      body: "Self-attention layers process tokens in parallel and learn long-range relationships at scale.",
      tone: "primary"
    },
    {
      step: "3",
      title: "Pre-training",
      body: "Massive GPU clusters run for weeks to months to optimize next-token prediction across all layers.",
      tone: "primary"
    },
    {
      step: "4",
      title: "Fine-tuning",
      body: "Instruction tuning and RLHF align model behavior for reliability, safety, and usability.",
      tone: "secondary"
    },
    {
      step: "5",
      title: "Inference",
      body: "Each production request runs a forward pass token-by-token, creating compounding ongoing compute demand.",
      tone: "secondary"
    }
  ],
  conceptCards: [
    {
      title: "Scaling laws",
      body: "Performance improves predictably with more data, parameters, and compute. This drives recurring model scale-ups.",
      tone: "primary"
    },
    {
      title: "Training vs. inference",
      body: "Training is bursty and episodic. Inference is persistent and growing, making long-horizon infrastructure demand sticky.",
      tone: "primary"
    },
    {
      title: "Physical footprint",
      body: "Frontier runs and inference fleets require semiconductors, power delivery, and cooling at utility scale.",
      tone: "negative"
    }
  ],
  takeawayLabel: "For this portfolio",
  takeawayBody:
    "You do not need to predict which model wins. Every serious model requires the same physical inputs: chips, copper, power, and cooling.",
  sourceLine: "Source: Vaswani et al. (2017), Kaplan et al. (2020), Epoch AI"
};
