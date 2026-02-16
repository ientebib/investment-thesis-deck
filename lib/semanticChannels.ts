import { theme, type Theme } from "@/lib/theme";

export type SemanticTone = "primary" | "secondary";

export type SemanticConcept =
  | "real_estate"
  | "structural_long"
  | "ai_compute"
  | "physical_inputs"
  | "macro_constraint"
  | "policy_risk";

const semanticToneByConcept: Record<SemanticConcept, SemanticTone> = {
  real_estate: "primary",
  structural_long: "secondary",
  ai_compute: "secondary",
  physical_inputs: "primary",
  macro_constraint: "primary",
  policy_risk: "secondary"
};

export function semanticTone(concept: SemanticConcept): SemanticTone {
  return semanticToneByConcept[concept];
}

export function semanticColor(concept: SemanticConcept, currentTheme: Theme = theme): string {
  const tone = semanticTone(concept);
  return tone === "primary" ? currentTheme.primary : currentTheme.secondary;
}

export function semanticPanelClass(concept: SemanticConcept): string {
  return `thesis-panel--${semanticTone(concept)}`;
}

export const persistentSemanticMappings = semanticToneByConcept;
