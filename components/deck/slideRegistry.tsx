import type { ComponentType } from "react";
import manifest from "@/migration/slide_manifest.json";
import { PendingMigrationSlide } from "@/components/deck/PendingMigrationSlide";
import { Slide01Title } from "@/components/slides/01-title";
import { Slide02AgendaJourney } from "@/components/slides/02-agenda-journey";
import { Slide02Leadership } from "@/components/slides/02-leadership";
import { Slide03CapitalSplit } from "@/components/slides/03-capital-split";
import { Slide04CapitalWaterfall } from "@/components/slides/04-capital-waterfall";
import { Slide05NnnOpportunities } from "@/components/slides/05-nnn-opportunities";
import { Slide06NnnStructure } from "@/components/slides/06-nnn-structure";
import { Slide07ExecutiveSummary } from "@/components/slides/07-executive-summary";
import { Slide08ScenarioMatrix } from "@/components/slides/08-scenario-matrix";
import { Slide08MacroShiftDivider } from "@/components/slides/08-macro-shift-divider";
import { Slide09FederalDebt } from "@/components/slides/09-federal-debt";
import { Slide10InterestExpense } from "@/components/slides/10-interest-expense";
import { Slide11InterestVsRevenue } from "@/components/slides/11-interest-vs-revenue";
import { Slide12TermPremium } from "@/components/slides/12-term-premium";
import { Slide13GlobalRepricing } from "@/components/slides/13-global-repricing";
import { Slide14CoreInflation } from "@/components/slides/14-core-inflation";
import { Slide15PriceChanges } from "@/components/slides/15-price-changes";
import { Slide16PolicyUncertainty } from "@/components/slides/16-policy-uncertainty";
import { Slide17UsStructuralAdvantage } from "@/components/slides/17-us-structural-advantage";
import { Slide18RealAssetsDivider } from "@/components/slides/18-real-assets-divider";
import { Slide19GoldVsTreasuries } from "@/components/slides/19-gold-vs-treasuries";
import { Slide20CentralBankGold } from "@/components/slides/20-central-bank-gold";
import { Slide21Sp500GoldRatio } from "@/components/slides/21-sp500-gold-ratio";
import { Slide22GoldVsRealYield } from "@/components/slides/22-gold-vs-real-yield";
import { Slide23MineLeadTimes } from "@/components/slides/23-mine-lead-times";
import { Slide24MineralConcentration } from "@/components/slides/24-mineral-concentration";
import { Slide25MineralDemand } from "@/components/slides/25-mineral-demand";
import { Slide26BeyondGold } from "@/components/slides/26-beyond-gold";
import { Slide27AiBuildoutDivider } from "@/components/slides/27-ai-buildout-divider";
import { Slide28WhyAiMatters } from "@/components/slides/28-why-ai-matters";
import { Slide29AiValueChain } from "@/components/slides/29-ai-value-chain";
import { Slide30CapabilityBenchmarks } from "@/components/slides/30-capability-benchmarks";
import { Slide31TaskHorizon } from "@/components/slides/31-task-horizon";
import { Slide32AiAdoption } from "@/components/slides/32-ai-adoption";
import { Slide33AiRevenue } from "@/components/slides/33-ai-revenue";
import { Slide34TrainingCompute } from "@/components/slides/34-training-compute";
import { Slide35TrainingCost } from "@/components/slides/35-training-cost";
import { Slide36HardwareShipments } from "@/components/slides/36-hardware-shipments";
import { Slide37HyperscalerCapex } from "@/components/slides/37-hyperscaler-capex";
import { Slide38DatacenterBuildout } from "@/components/slides/38-datacenter-buildout";
import { Slide39DatacenterLoad } from "@/components/slides/39-datacenter-load";
import { Slide40InferenceEconomics } from "@/components/slides/40-inference-economics";
import { Slide41ForcesCompoundDivider } from "@/components/slides/41-forces-compound-divider";
import { Slide42IntersectionDemand } from "@/components/slides/42-intersection-demand";
import { Slide43LaborExposure } from "@/components/slides/43-labor-exposure";
import { Slide44FiscalPath } from "@/components/slides/44-fiscal-path";
import { Slide45FinancialRepression } from "@/components/slides/45-financial-repression";
import { Slide46PortfolioConstructionDivider } from "@/components/slides/46-portfolio-construction-divider";
import { Slide47ResearchInfrastructure } from "@/components/slides/47-research-infrastructure";
import { Slide48LeadingIndicators } from "@/components/slides/48-leading-indicators";
import { Slide49FundTermsDivider } from "@/components/slides/49-fund-terms-divider";
import { Slide50ScenarioAnalysis } from "@/components/slides/50-scenario-analysis";
import { Slide51TermsAtAGlance } from "@/components/slides/51-terms-at-a-glance";
import { Slide52RiskArchitecture } from "@/components/slides/52-risk-architecture";
import { Slide53PortfolioRegimeShift } from "@/components/slides/53-portfolio-regime-shift";
import { Slide54ClosingQuestion } from "@/components/slides/54-closing-question";
import { Slide55AppendixDivider } from "@/components/slides/55-appendix-divider";
import { Slide56GpuGenerationLadder } from "@/components/slides/56-gpu-generation-ladder";
import { Slide57InterconnectionQueues } from "@/components/slides/57-interconnection-queues";
import { Slide60AiComputeSpend } from "@/components/slides/60-ai-compute-spend";
import { Slide61CopperDeficit } from "@/components/slides/61-copper-deficit";
import type { DeckSection, DeckSlide } from "@/components/deck/types";

const migratedSlides: Record<number, ComponentType> = {
  1: Slide01Title,
  2: Slide02AgendaJourney,
  3: Slide02Leadership,
  4: Slide03CapitalSplit,
  5: Slide04CapitalWaterfall,
  6: Slide05NnnOpportunities,
  7: Slide06NnnStructure,
  8: Slide07ExecutiveSummary,
  9: Slide08ScenarioMatrix,
  10: Slide08MacroShiftDivider,
  11: Slide09FederalDebt,
  12: Slide10InterestExpense,
  13: Slide11InterestVsRevenue,
  14: Slide12TermPremium,
  15: Slide13GlobalRepricing,
  16: Slide14CoreInflation,
  17: Slide15PriceChanges,
  18: Slide16PolicyUncertainty,
  19: Slide17UsStructuralAdvantage,
  20: Slide18RealAssetsDivider,
  21: Slide19GoldVsTreasuries,
  22: Slide20CentralBankGold,
  23: Slide21Sp500GoldRatio,
  24: Slide22GoldVsRealYield,
  25: Slide23MineLeadTimes,
  26: Slide24MineralConcentration,
  27: Slide25MineralDemand,
  28: Slide26BeyondGold,
  29: Slide27AiBuildoutDivider,
  30: Slide28WhyAiMatters,
  31: Slide29AiValueChain,
  32: Slide30CapabilityBenchmarks,
  33: Slide31TaskHorizon,
  34: Slide32AiAdoption,
  35: Slide33AiRevenue,
  36: Slide34TrainingCompute,
  37: Slide35TrainingCost,
  38: Slide36HardwareShipments,
  39: Slide37HyperscalerCapex,
  40: Slide38DatacenterBuildout,
  41: Slide39DatacenterLoad,
  42: Slide40InferenceEconomics,
  43: Slide41ForcesCompoundDivider,
  44: Slide42IntersectionDemand,
  45: Slide43LaborExposure,
  46: Slide44FiscalPath,
  47: Slide45FinancialRepression,
  48: Slide46PortfolioConstructionDivider,
  49: Slide47ResearchInfrastructure,
  50: Slide48LeadingIndicators,
  51: Slide49FundTermsDivider,
  52: Slide50ScenarioAnalysis,
  53: Slide51TermsAtAGlance,
  54: Slide52RiskArchitecture,
  55: Slide53PortfolioRegimeShift,
  56: Slide54ClosingQuestion,
  57: Slide55AppendixDivider,
  58: Slide56GpuGenerationLadder,
  59: Slide57InterconnectionQueues,
  62: Slide60AiComputeSpend,
  63: Slide61CopperDeficit
};

export const deckSections: DeckSection[] = [
  { from: 1, to: 7, label: "Overview" },
  { from: 8, to: 9, label: "Thesis" },
  { from: 10, to: 19, label: "Macro Shift" },
  { from: 20, to: 29, label: "Real Assets" },
  { from: 30, to: 43, label: "AI Infra" },
  { from: 44, to: 49, label: "Compounding" },
  { from: 50, to: 50, label: "Portfolio" },
  { from: 51, to: 55, label: "Fund Terms" },
  { from: 56, to: 56, label: "Close" },
  { from: 57, to: 64, label: "Appendix" }
];

function sectionLabelForSlide(slideNumber: number) {
  const section = deckSections.find((item) => slideNumber >= item.from && slideNumber <= item.to);
  return section ? section.label.toUpperCase() : "UNASSIGNED";
}

function buildPendingSlide(slideNumber: number, slideTitle: string, manifestEntry: (typeof manifest.slides)[number]): DeckSlide {
  return {
    number: slideNumber,
    title: slideTitle,
    sectionLabel: sectionLabelForSlide(slideNumber),
    migrationStatus: "pending",
    content: (
      <>
        <div className="section-label">{sectionLabelForSlide(slideNumber)}</div>
        <div className="slide-title">{slideTitle}</div>
        <div className="slide-subtitle">This slide is queued for migration in the next batches.</div>
        <PendingMigrationSlide
          title={slideTitle}
          chartCount={manifestEntry.chartCount}
          hasSourceLine={manifestEntry.hasSourceLine}
          inlineStyleAttrCount={manifestEntry.inlineStyleAttrCount}
          lineStart={manifestEntry.startLine}
          lineEnd={manifestEntry.endLine}
        />
      </>
    )
  };
}

// Slides removed from the deck by original deck IDs (stable even after reordering).
const deletedSlides = new Set([12, 16, 22, 27, 33, 35, 37, 40, 45, 47, 60, 61, 64]);

// Build the full deck: slide 1 from manifest, insert Agenda (2),
// Leadership (3), Scenario Matrix (9), then shift remaining manifest slides.
// Legacy slides 2-6 shift +2, legacy slides >= 7 shift +3.
const slidesFromManifest: DeckSlide[] = [];

for (const entry of manifest.slides) {
  const legacyNumber = entry.slide;

  // Slide 1 stays as slide 1
  if (legacyNumber === 1) {
    slidesFromManifest.push({
      number: 1,
      title: entry.title || "Slide 1",
      sectionLabel: sectionLabelForSlide(1),
      migrationStatus: "migrated",
      content: <Slide01Title />
    });

    // Insert Agenda slide at position 2
    slidesFromManifest.push({
      number: 2,
      title: "Agenda",
      sectionLabel: sectionLabelForSlide(2),
      migrationStatus: "migrated",
      content: <Slide02AgendaJourney />
    });

    // Insert Leadership slide at position 3
    slidesFromManifest.push({
      number: 3,
      title: "Leadership",
      sectionLabel: sectionLabelForSlide(3),
      migrationStatus: "migrated",
      content: <Slide02Leadership />
    });
    continue;
  }

  // Legacy slide 6 (Executive Summary) is deck 8; after it, inject Scenario Matrix at 9
  if (legacyNumber === 6) {
    const deckNumber = legacyNumber + 2; // deck 8
    const slideTitle = entry.title || `Slide ${deckNumber}`;
    const MigratedSlide = migratedSlides[deckNumber];

    if (MigratedSlide) {
      slidesFromManifest.push({
        number: deckNumber,
        title: slideTitle,
        sectionLabel: sectionLabelForSlide(deckNumber),
        migrationStatus: "migrated",
        content: <MigratedSlide />
      });
    } else {
      slidesFromManifest.push(buildPendingSlide(deckNumber, slideTitle, entry));
    }

    // Insert new Scenario Matrix slide at position 9 (not in manifest)
    slidesFromManifest.push({
      number: 9,
      title: "Scenario Matrix",
      sectionLabel: sectionLabelForSlide(9),
      migrationStatus: "migrated",
      content: <Slide08ScenarioMatrix />
    });
    continue;
  }

  // Legacy slides 2-5 shift +2; legacy slides >= 7 shift +3
  const deckNumber = legacyNumber < 7 ? legacyNumber + 2 : legacyNumber + 3;
  if (deletedSlides.has(deckNumber)) continue;
  const slideTitle = entry.title || `Slide ${deckNumber}`;
  const MigratedSlide = migratedSlides[deckNumber];

  if (MigratedSlide) {
    slidesFromManifest.push({
      number: deckNumber,
      title: slideTitle,
      sectionLabel: sectionLabelForSlide(deckNumber),
      migrationStatus: "migrated",
      content: <MigratedSlide />
    });
  } else {
    slidesFromManifest.push(buildPendingSlide(deckNumber, slideTitle, entry));
  }
}

function applyManualOrdering(slides: DeckSlide[]): DeckSlide[] {
  const moveSlideNumber = (deckSlides: DeckSlide[], from: number, to: number) => {
    if (from === to) {
      return deckSlides;
    }

    return deckSlides.map((slide) => {
      let nextNumber = slide.number;

      if (slide.number === from) {
        nextNumber = to;
      } else if (from > to && slide.number >= to && slide.number < from) {
        nextNumber = slide.number + 1;
      } else if (from < to && slide.number > from && slide.number <= to) {
        nextNumber = slide.number - 1;
      }

      if (nextNumber === slide.number) {
        return slide;
      }

      return {
        ...slide,
        number: nextNumber,
        sectionLabel: sectionLabelForSlide(nextNumber)
      };
    });
  };

  // Move "Beyond gold..." from 28 to 25 (after Gold vs Real Yield).
  const remapped = moveSlideNumber(slides, 28, 25);

  // Move selected slides into appendix ordering.
  const annexRelocations = new Map<number, number>([
    [41, 60], // US datacenter load doubles...
    [42, 61], // Inference is 45% of compute spend...
    [46, 64] // There is no fiscally neutral path...
  ]);

  const annexRemapped = remapped.map((slide) => {
    const nextNumber = annexRelocations.get(slide.number);
    if (!nextNumber) {
      return slide;
    }

    return {
      ...slide,
      number: nextNumber,
      sectionLabel: sectionLabelForSlide(nextNumber)
    };
  });

  // Reorder opening narrative:
  // - Move current slide 8 ("Two foundational macro views") to position 4.
  // - Move current slide 55 ("Traditional portfolio construction...") to position 5.
  const introRemapped = moveSlideNumber(moveSlideNumber(annexRemapped, 8, 4), 55, 5);

  introRemapped.sort((a, b) => a.number - b.number);
  return introRemapped;
}

export const deckSlides = applyManualOrdering(slidesFromManifest);
