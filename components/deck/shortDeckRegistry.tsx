import type { DeckSection, DeckSlide } from "@/components/deck/types";
import { Slide01Title } from "@/components/slides/01-title";
import { Slide02Leadership } from "@/components/slides/02-leadership";
import { Slide02AgendaJourney } from "@/components/slides/02-agenda-journey";
import { Slide03CapitalSplit } from "@/components/slides/03-capital-split";
import { Slide06NnnStructure } from "@/components/slides/06-nnn-structure";
import { Slide05NnnOpportunities } from "@/components/slides/05-nnn-opportunities";
import { Slide07ExecutiveSummary } from "@/components/slides/07-executive-summary";
import { Slide08bShortThesisMacroProof } from "@/components/slides/08b-short-thesis-macro-proof";
import { Slide08cShortThesisMacroProof2 } from "@/components/slides/08c-short-thesis-macro-proof-2";
import { Slide09bShortThesisAiProof } from "@/components/slides/09b-short-thesis-ai-proof";
import { Slide09cShortThesisAiProof2 } from "@/components/slides/09c-short-thesis-ai-proof-2";
import { Slide51TermsAtAGlance } from "@/components/slides/51-terms-at-a-glance";
import { Slide50ScenarioAnalysis } from "@/components/slides/50-scenario-analysis";

export const shortDeckSections: DeckSection[] = [
  { from: 1, to: 3, label: "Overview" },
  { from: 4, to: 7, label: "Fund Structure" },
  { from: 8, to: 11, label: "Core Thesis" },
  { from: 12, to: 13, label: "Terms & Returns" }
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
    title: "Estructura del Fondo",
    sectionLabel: "FUND STRUCTURE",
    migrationStatus: "migrated",
    content: <Slide03CapitalSplit />
  },
  {
    number: 5,
    title: "Real Estate",
    sectionLabel: "FUND STRUCTURE",
    migrationStatus: "migrated",
    content: <Slide06NnnStructure />
  },
  {
    number: 6,
    title: "Real Estate Illustrativo",
    sectionLabel: "FUND STRUCTURE",
    migrationStatus: "migrated",
    content: <Slide05NnnOpportunities />
  },
  {
    number: 7,
    title: "Long Structural Portfolio",
    sectionLabel: "FUND STRUCTURE",
    migrationStatus: "migrated",
    content: <Slide07ExecutiveSummary />
  },
  {
    number: 8,
    title: "Fiscal Constraint Regime",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide08bShortThesisMacroProof />
  },
  {
    number: 9,
    title: "Real-Asset Repricing",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide08cShortThesisMacroProof2 />
  },
  {
    number: 10,
    title: "Capability and Adoption",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide09bShortThesisAiProof />
  },
  {
    number: 11,
    title: "Physical Infrastructure Buildout",
    sectionLabel: "CORE THESIS",
    migrationStatus: "migrated",
    content: <Slide09cShortThesisAiProof2 />
  },
  {
    number: 12,
    title: "Fund Terms",
    sectionLabel: "TERMS & RETURNS",
    migrationStatus: "migrated",
    content: <Slide51TermsAtAGlance />
  },
  {
    number: 13,
    title: "Dashboard de Expected Returns",
    sectionLabel: "TERMS & RETURNS",
    migrationStatus: "migrated",
    content: <Slide50ScenarioAnalysis />
  }
];
