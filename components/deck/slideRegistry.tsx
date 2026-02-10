import type { ComponentType } from "react";
import manifest from "@/migration/slide_manifest.json";
import { PendingMigrationSlide } from "@/components/deck/PendingMigrationSlide";
import { Slide01Title } from "@/components/slides/01-title";
import { Slide02Leadership } from "@/components/slides/02-leadership";
import { Slide03CapitalSplit } from "@/components/slides/03-capital-split";
import { Slide04CapitalWaterfall } from "@/components/slides/04-capital-waterfall";
import { Slide05NnnOpportunities } from "@/components/slides/05-nnn-opportunities";
import { Slide06NnnStructure } from "@/components/slides/06-nnn-structure";
import { Slide07ExecutiveSummary } from "@/components/slides/07-executive-summary";
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
  2: Slide02Leadership,
  3: Slide03CapitalSplit,
  4: Slide04CapitalWaterfall,
  5: Slide05NnnOpportunities,
  6: Slide06NnnStructure,
  7: Slide07ExecutiveSummary,
  8: Slide08MacroShiftDivider,
  9: Slide09FederalDebt,
  10: Slide10InterestExpense,
  11: Slide11InterestVsRevenue,
  12: Slide12TermPremium,
  13: Slide13GlobalRepricing,
  14: Slide14CoreInflation,
  15: Slide15PriceChanges,
  16: Slide16PolicyUncertainty,
  17: Slide17UsStructuralAdvantage,
  18: Slide18RealAssetsDivider,
  19: Slide19GoldVsTreasuries,
  20: Slide20CentralBankGold,
  21: Slide21Sp500GoldRatio,
  22: Slide22GoldVsRealYield,
  23: Slide23MineLeadTimes,
  24: Slide24MineralConcentration,
  25: Slide25MineralDemand,
  26: Slide26BeyondGold,
  27: Slide27AiBuildoutDivider,
  28: Slide28WhyAiMatters,
  29: Slide29AiValueChain,
  30: Slide30CapabilityBenchmarks,
  31: Slide31TaskHorizon,
  32: Slide32AiAdoption,
  33: Slide33AiRevenue,
  34: Slide34TrainingCompute,
  35: Slide35TrainingCost,
  36: Slide36HardwareShipments,
  37: Slide37HyperscalerCapex,
  38: Slide38DatacenterBuildout,
  39: Slide39DatacenterLoad,
  40: Slide40InferenceEconomics,
  41: Slide41ForcesCompoundDivider,
  42: Slide42IntersectionDemand,
  43: Slide43LaborExposure,
  44: Slide44FiscalPath,
  45: Slide45FinancialRepression,
  46: Slide46PortfolioConstructionDivider,
  47: Slide47ResearchInfrastructure,
  48: Slide48LeadingIndicators,
  49: Slide49FundTermsDivider,
  50: Slide50ScenarioAnalysis,
  51: Slide51TermsAtAGlance,
  52: Slide52RiskArchitecture,
  53: Slide53PortfolioRegimeShift,
  54: Slide54ClosingQuestion,
  55: Slide55AppendixDivider,
  56: Slide56GpuGenerationLadder,
  57: Slide57InterconnectionQueues,
  60: Slide60AiComputeSpend,
  61: Slide61CopperDeficit
};

export const deckSections: DeckSection[] = [
  { from: 1, to: 6, label: "Overview" },
  { from: 7, to: 7, label: "Thesis" },
  { from: 8, to: 17, label: "Macro Shift" },
  { from: 18, to: 27, label: "Real Assets" },
  { from: 28, to: 41, label: "AI Infra" },
  { from: 42, to: 47, label: "Compounding" },
  { from: 48, to: 48, label: "Portfolio" },
  { from: 49, to: 53, label: "Fund Terms" },
  { from: 54, to: 54, label: "Close" },
  { from: 55, to: 61, label: "Appendix" }
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

// Slides removed from the deck (skip during build)
const deletedSlides = new Set([58, 59, 62]);

// Build the full deck: slide 1 from manifest, insert new slide 2 (Leadership),
// then shift all remaining manifest slides up by 1.
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

    // Insert new Leadership slide at position 2 (not in manifest)
    slidesFromManifest.push({
      number: 2,
      title: "Leadership",
      sectionLabel: sectionLabelForSlide(2),
      migrationStatus: "migrated",
      content: <Slide02Leadership />
    });
    continue;
  }

  // All other legacy slides shift up by 1
  const deckNumber = legacyNumber + 1;
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

export const deckSlides = slidesFromManifest;
