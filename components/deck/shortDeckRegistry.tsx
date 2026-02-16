import type { DeckSection, DeckSlide } from "@/components/deck/types";
import { Slide01Title } from "@/components/slides/01-title";
import { PitchSlide02Leadership } from "@/components/slides/pitch-02-leadership";
import { PitchSlide03Thesis } from "@/components/slides/pitch-03-thesis";
import { PitchSlide04Fiscal } from "@/components/slides/pitch-04-fiscal";
import { PitchSlide05Scaling } from "@/components/slides/pitch-05-scaling";
import { PitchSlide06AiDemand } from "@/components/slides/pitch-06-ai-demand";
import { PitchSlide07Adoption } from "@/components/slides/pitch-07-adoption";
import { PitchSlide08Supply } from "@/components/slides/pitch-08-supply";
import { PitchSlide09Reserves } from "@/components/slides/pitch-09-reserves";
import { Slide26BeyondGold } from "@/components/slides/26-beyond-gold";
import { PitchSlide11Cape } from "@/components/slides/pitch-11-cape";
import { Slide08ScenarioMatrix } from "@/components/slides/08-scenario-matrix";
import { Slide47ResearchInfrastructure } from "@/components/slides/47-research-infrastructure";
import { Slide48LeadingIndicators } from "@/components/slides/48-leading-indicators";
import { Slide29AiValueChain } from "@/components/slides/29-ai-value-chain";
import { Slide50ScenarioAnalysis } from "@/components/slides/50-scenario-analysis";
import { Slide51TermsAtAGlance } from "@/components/slides/51-terms-at-a-glance";
import { PitchSlide19Legal } from "@/components/slides/pitch-19-legal";
import { Slide54ClosingQuestion } from "@/components/slides/54-closing-question";

export const shortDeckSections: DeckSection[] = [
  { from: 1, to: 2, label: "Overview" },
  { from: 3, to: 3, label: "Thesis" },
  { from: 4, to: 11, label: "Evidence" },
  { from: 12, to: 12, label: "Scenarios" },
  { from: 13, to: 16, label: "Fund" },
  { from: 17, to: 17, label: "Terms" },
  { from: 18, to: 18, label: "Legal" },
  { from: 19, to: 19, label: "Closing" }
];

export const shortDeckSlides: DeckSlide[] = [
  {
    number: 1,
    title: "Cover",
    sectionLabel: "OVERVIEW",
    migrationStatus: "migrated",
    content: <Slide01Title />
  },
  {
    number: 2,
    title: "Leadership & Fund",
    sectionLabel: "OVERVIEW",
    migrationStatus: "migrated",
    content: <PitchSlide02Leadership />
  },
  {
    number: 3,
    title: "Thesis Visual",
    sectionLabel: "THESIS",
    migrationStatus: "migrated",
    content: <PitchSlide03Thesis />
  },
  {
    number: 4,
    title: "Fiscal Dominance",
    sectionLabel: "EVIDENCE",
    migrationStatus: "migrated",
    content: <PitchSlide04Fiscal />
  },
  {
    number: 5,
    title: "Reserve Rotation",
    sectionLabel: "EVIDENCE",
    migrationStatus: "migrated",
    content: <PitchSlide09Reserves />
  },
  {
    number: 6,
    title: "Scaling Laws",
    sectionLabel: "EVIDENCE",
    migrationStatus: "migrated",
    content: <PitchSlide05Scaling />
  },
  {
    number: 7,
    title: "Adoption & Revenue",
    sectionLabel: "EVIDENCE",
    migrationStatus: "migrated",
    content: <PitchSlide07Adoption />
  },
  {
    number: 8,
    title: "AI Physical Demand",
    sectionLabel: "EVIDENCE",
    migrationStatus: "migrated",
    content: <PitchSlide06AiDemand />
  },
  {
    number: 9,
    title: "Supply Constraints",
    sectionLabel: "EVIDENCE",
    migrationStatus: "migrated",
    content: <PitchSlide08Supply />
  },
  {
    number: 10,
    title: "Beyond Gold",
    sectionLabel: "EVIDENCE",
    migrationStatus: "migrated",
    content: <Slide26BeyondGold />
  },
  {
    number: 11,
    title: "Valuation Risk",
    sectionLabel: "EVIDENCE",
    migrationStatus: "migrated",
    content: <PitchSlide11Cape />
  },
  {
    number: 12,
    title: "Portfolio wins in any scenario",
    sectionLabel: "SCENARIOS",
    migrationStatus: "migrated",
    content: <Slide08ScenarioMatrix />
  },
  {
    number: 13,
    title: "Research Process",
    sectionLabel: "FUND",
    migrationStatus: "migrated",
    content: <Slide47ResearchInfrastructure />
  },
  {
    number: 14,
    title: "Hypothesis Tracking",
    sectionLabel: "FUND",
    migrationStatus: "migrated",
    content: <Slide48LeadingIndicators />
  },
  {
    number: 15,
    title: "AI Value Chain",
    sectionLabel: "FUND",
    migrationStatus: "migrated",
    content: <Slide29AiValueChain />
  },
  {
    number: 16,
    title: "Return Modeling",
    sectionLabel: "FUND",
    migrationStatus: "migrated",
    content: <Slide50ScenarioAnalysis />
  },
  {
    number: 17,
    title: "Fund Terms",
    sectionLabel: "TERMS",
    migrationStatus: "migrated",
    content: <Slide51TermsAtAGlance />
  },
  {
    number: 18,
    title: "Legal Structure",
    sectionLabel: "LEGAL",
    migrationStatus: "migrated",
    content: <PitchSlide19Legal />
  },
  {
    number: 19,
    title: "Thank you",
    sectionLabel: "CLOSING",
    migrationStatus: "migrated",
    content: <Slide54ClosingQuestion />
  }
];
