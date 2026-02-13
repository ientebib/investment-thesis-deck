import type { DeckSection, DeckSlide } from "@/components/deck/types";
import { Slide01Title } from "@/components/slides/01-title";
import { Slide02Leadership } from "@/components/slides/02-leadership";
import { Slide02AgendaJourney } from "@/components/slides/02-agenda-journey";
import { Slide07ExecutiveSummary } from "@/components/slides/07-executive-summary";
import { Slide08bShortThesisMacroProof } from "@/components/slides/08b-short-thesis-macro-proof";
import { Slide08cShortThesisMacroProof2 } from "@/components/slides/08c-short-thesis-macro-proof-2";
import { Slide17UsStructuralAdvantage } from "@/components/slides/17-us-structural-advantage";
import { Slide09bShortThesisAiProof } from "@/components/slides/09b-short-thesis-ai-proof";
import { Slide09cShortThesisAiProof2 } from "@/components/slides/09c-short-thesis-ai-proof-2";
import { Slide51TermsAtAGlance } from "@/components/slides/51-terms-at-a-glance";
import { Slide50ScenarioAnalysis } from "@/components/slides/50-scenario-analysis";
import { Slide55ClosingThankYou } from "@/components/slides/55-closing-thank-you";

export const shortDeckSections: DeckSection[] = [
  { from: 1, to: 3, label: "Overview" },
  { from: 4, to: 4, label: "Investment Thesis" },
  { from: 5, to: 9, label: "Core Thesis" },
  { from: 10, to: 11, label: "Terms & Returns" },
  { from: 12, to: 12, label: "Closing" }
];

export const shortDeckSlides: DeckSlide[] = [
  {
    number: 1,
    title: "Portada",
    sectionLabel: "OVERVIEW",
    migrationStatus: "migrated",
    content: <Slide01Title />
  },
  {
    number: 2,
    title: "Bios",
    sectionLabel: "OVERVIEW",
    migrationStatus: "migrated",
    content: <Slide02Leadership />
  },
  {
    number: 3,
    title: "Agenda",
    sectionLabel: "OVERVIEW",
    migrationStatus: "migrated",
    content: <Slide02AgendaJourney />
  },
  {
    number: 4,
    title: "Investment Thesis",
    sectionLabel: "INVESTMENT THESIS",
    migrationStatus: "migrated",
    content: <Slide07ExecutiveSummary />
  },
  {
    number: 5,
    title: "Fiscal Constraint Regime",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide08bShortThesisMacroProof />
  },
  {
    number: 6,
    title: "Real-Asset Repricing",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide08cShortThesisMacroProof2 />
  },
  {
    number: 7,
    title: "Capability and Adoption",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide09bShortThesisAiProof />
  },
  {
    number: 8,
    title: "Physical Infrastructure Buildout",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide09cShortThesisAiProof2 />
  },
  {
    number: 9,
    title: "US Structural Advantage",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide17UsStructuralAdvantage />
  },
  {
    number: 10,
    title: "Fund Terms",
    sectionLabel: "TERMS & RETURNS",
    migrationStatus: "migrated",
    content: <Slide51TermsAtAGlance />
  },
  {
    number: 11,
    title: "Scenario Analysis",
    sectionLabel: "TERMS & RETURNS",
    migrationStatus: "migrated",
    content: <Slide50ScenarioAnalysis />
  },
  {
    number: 12,
    title: "Closing",
    sectionLabel: "CLOSING",
    migrationStatus: "migrated",
    content: <Slide55ClosingThankYou />
  }
];
