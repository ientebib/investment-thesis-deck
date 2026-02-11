import type { DeckSection, DeckSlide } from "@/components/deck/types";
import { shortDeckSections, shortDeckSlides } from "@/components/deck/shortDeckRegistry";
import { Slide50ScenarioAnalysisInternal } from "@/components/slides/50-scenario-analysis";

export const shortDeckInternalSections: DeckSection[] = [
  ...shortDeckSections,
  { from: 14, to: 14, label: "Internal" }
];

export const shortDeckInternalSlides: DeckSlide[] = [
  ...shortDeckSlides,
  {
    number: 14,
    title: "Internal Decision Lens",
    sectionLabel: "INTERNAL",
    migrationStatus: "migrated",
    content: <Slide50ScenarioAnalysisInternal />
  }
];
