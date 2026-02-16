import type { DeckSection, DeckSlide } from "@/components/deck/types";
import { shortDeckSections, shortDeckSlides } from "@/components/deck/shortDeckRegistry";
import { Slide50ScenarioAnalysisInternal } from "@/components/slides/50-scenario-analysis";

const internalSlideNumber = shortDeckSlides.reduce((maxSlideNumber, slide) => {
  return Math.max(maxSlideNumber, slide.number);
}, 0) + 1;

export const shortDeckInternalSections: DeckSection[] = [
  ...shortDeckSections,
  { from: internalSlideNumber, to: internalSlideNumber, label: "Internal" }
];

export const shortDeckInternalSlides: DeckSlide[] = [
  ...shortDeckSlides,
  {
    number: internalSlideNumber,
    title: "Internal Decision Lens",
    sectionLabel: "INTERNAL",
    migrationStatus: "migrated",
    content: <Slide50ScenarioAnalysisInternal />
  }
];
