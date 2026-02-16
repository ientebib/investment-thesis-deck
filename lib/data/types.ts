
export type TableRow = {
  label: string;
  value: string;
};

export type Slide01TitleData = {
  title: string;
  subtitle: string;
  confidentialityLine: string;
};

export type Slide02PartnerData = {
  name: string;
  role: string;
  bio: string;
};

export type Slide02LeadershipData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  description: string;
  partners: Slide02PartnerData[];
  sourceLine: string;
};

export type Slide07ThesisCardData = {
  title: string;
  body: string;
  bullets?: string[];
  tone: "primary" | "secondary";
};

export type Slide07ExecutiveSummaryData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  thesisCards: Slide07ThesisCardData[];
  intersectionTitle: string;
  intersectionBody: string;
  intersectionConclusion: string;
  intersectionBullets?: string[];
  sourceLine: string;
};

export type Slide08QuadrantTone = "primary" | "secondary" | "caution" | "negative";

export type Slide08QuadrantData = {
  title: string;
  narrative: string;
  assets?: string;
  tone: Slide08QuadrantTone;
  position: "tl" | "tr" | "bl" | "br";
};

export type Slide08ConvexityData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  xAxisLeft: string;
  xAxisRight: string;
  yAxisTop: string;
  yAxisBottom: string;
  quadrants: Slide08QuadrantData[];
  sourceLine: string;
};

export type Slide08SectionDividerData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
};

export type Slide09FederalDebtData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  years: number[];
  values: number[];
  projectionStartYear: number;
  sourceLine: string;
};

export type Slide10InterestExpenseData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  years: number[];
  programSpendingPct: number[];
  netInterestPct: number[];
  revenuePct: number[];
  projectionStartYear: number;
  sourceLine: string;
};

export type Slide11InterestRevenueData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  years: number[];
  values: number[];
  isRecession: number[];
  projectionStartYear: number;
  sourceLine: string;
};

export type Slide12RecessionPeriod = {
  start: string;
  end: string;
};

export type Slide12TermPremiumData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  dates: string[];
  values: number[];
  recessionPeriods: Slide12RecessionPeriod[];
  sourceLine: string;
};

export type Slide13GlobalRepricingData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  dates: string[];
  japan10y: number[];
  jpyusd: number[];
  uk10y: number[];
  gbpusd: number[];
  yccAdjustmentDate: string;
  brexitDate: string;
  trussDate: string;
  sourceLine: string;
};

export type Slide14CoreInflationData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  dates: string[];
  us: number[];
  euroArea: number[];
  uk: number[];
  canada: number[];
  australia: number[];
  projectionStartDate: string;
  targetInflation: number;
  sourceLine: string;
};

export type Slide15PriceChangesData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  categories: string[];
  values: number[];
  overallCpiValue: number;
  sourceLine: string;
};

export type Slide16PolicyPanelTone = "primary" | "secondary" | "negative" | "caution";

export type Slide16PolicyPanelData = {
  key: string;
  title: string;
  valueLabel: string;
  valueDate: string;
  baseline: number;
  baselineLabel: string;
  tone: Slide16PolicyPanelTone;
  series: number[];
};

export type Slide16PolicyUncertaintyData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  qLabels: string[];
  panels: Slide16PolicyPanelData[];
  sourceLine: string;
};

export type Slide17UsAdvantageCardData = {
  title: string;
  metric: string;
  metricDelta?: string;
  description: string;
  points: string[];
  tone: "primary" | "negative";
};

export type Slide17UsAdvantageData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  cards: Slide17UsAdvantageCardData[];
  tensionLabel: string;
  tensionBody: string;
  sourceLine: string;
};

export type Slide18GoldTreasuriesData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  dates: string[];
  goldHoldingsTrillions: number[];
  treasuryHoldingsTrillions: number[];
  sourceLine: string;
};

export type Slide19CentralBankGoldData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  years: number[];
  netPurchasesTonnes: number[];
  highlightYears: number[];
  sourceLine: string;
  note: string;
};

export type Slide20SpGoldRatioData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  dates: string[];
  ratio: number[];
  sourceLine: string;
};

export type Slide21GoldYieldData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  dates: string[];
  goldPriceLn: number[];
  real10yYield: number[];
  relationshipBreakDate: string;
  sourceLine: string;
};

export type Slide23MineLeadTimesData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  periods: string[];
  yearsToProduction: number[];
  projectedPeriod: string;
  sourceLine: string;
};

export type Slide24MineralConcentrationData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  minerals: string[];
  refiningSharePct: number[];
  sourceLine: string;
};

export type Slide25MineralDemandData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  minerals: string[];
  index2024: number[];
  index2030: number[];
  index2035: number[];
  index2040: number[];
  kt2024: number[];
  kt2030: number[];
  kt2035: number[];
  kt2040: number[];
  sourceLine: string;
};

export type Slide26CommodityCardData = {
  title: string;
  range: string;
  description: string;
  tone: "neutral" | "primary" | "secondary";
};

export type Slide26BeyondGoldData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  cards: Slide26CommodityCardData[];
  reshoringTitle: string;
  reshoringBody: string;
  dates: string[];
  silverIndex: Array<number | null>;
  copperIndex: Array<number | null>;
  uraniumIndex: Array<number | null>;
  sourceLine: string;
};

export type Slide28AiImpactCardData = {
  label: string;
  metric: string;
  description: string;
  tone: "primary" | "secondary";
};

export type Slide28AiPortfolioImpactData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  cards: Slide28AiImpactCardData[];
  years: number[];
  chinaTwh: number[];
  usTwh: number[];
  sourceLine: string;
};

export type Slide29InteractiveNodeData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPlayers?: string;
};

export type Slide29InteractiveLayerData = {
  id: number;
  name: string;
  shortName: string;
  description: string;
  nodes: Slide29InteractiveNodeData[];
};

export type Slide29InteractiveValueChainData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  layers: Slide29InteractiveLayerData[];
  sourceLine: string;
};

export type Slide30CapabilityBenchmarksData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  dates: string[];
  weirdMl: Array<number | null>;
  simpleBench: Array<number | null>;
  frontierMath: Array<number | null>;
  sweBenchVerified: Array<number | null>;
  sourceLine: string;
};

export type Slide31TaskHorizonPointData = {
  group: "sota" | "non_sota";
  xMonth: number;
  horizonHours: number;
  label: string | null;
  ciLowHours: number | null;
  ciHighHours: number | null;
};

export type Slide31TaskHorizonData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  points: Slide31TaskHorizonPointData[];
  sourceLine: string;
};

export type Slide32AdoptionCardData = {
  metric: string;
  label: string;
  detail: string;
};

export type Slide32AdoptionData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  enterpriseLabel: string;
  cards: Slide32AdoptionCardData[];
  usageLabel: string;
  usagePeriods: string[];
  usageMillions: number[];
  sourceLine: string;
};

export type XYPoint = {
  x: number;
  y: number;
  label?: string;
};

export type Slide33RevenueTrajectoryData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  openAi: XYPoint[];
  anthropic: XYPoint[];
  xAi: XYPoint[];
  sourceLine: string;
};

export type Slide34TrainingComputePoint = {
  group: "frontier" | "other";
  publicationYear: number;
  trainingFlop: number;
  label: string;
};

export type Slide34TrainingComputeData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  points: Slide34TrainingComputePoint[];
  highlightLabels: string[];
  sourceLine: string;
};

export type Slide35TrainingCostPoint = {
  publicationYear: number;
  trainingCost2023Usd: number;
  label: string;
};

export type Slide35TrainingCostData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  points: Slide35TrainingCostPoint[];
  highlightLabels: string[];
  sourceLine: string;
};

export type Slide36HardwareStatData = {
  value: string;
  label: string;
};

export type Slide36HardwareData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  shipmentsStats: Slide36HardwareStatData[];
  costStats: Slide36HardwareStatData[];
  note: string;
  years: string[];
  shipmentsMillionUnits: number[];
  costUsdBillions: number[];
  sourceLine: string;
};

export type Slide37HyperscalerCapexData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  years: string[];
  amazonCapexUsdBillions: number[];
  alphabetCapexUsdBillions: number[];
  metaCapexUsdBillions: number[];
  microsoftCapexUsdBillions: number[];
  sourceLine: string;
};

export type Slide38DatacenterBuildoutData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  stats: Slide36HardwareStatData[];
  years: string[];
  actualGw: Array<number | null>;
  projectedGw: Array<number | null>;
  sourceLine: string;
};

export type Slide39DatacenterLoadData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  analysts: string[];
  currentGw: number[];
  projectedGw: number[];
  sourceLine: string;
};

export type Slide40InferenceEconomicsData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  body: string;
  years: number[];
  trainingPct: number[];
  inferencePct: number[];
  sourceLine: string;
};

export type Slide42DemandInputData = {
  input: string;
  unit: string;
  growthPct: number;
  value2024: number;
  value2030: number;
};

export type Slide42IntersectionDemandData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  body: string;
  inputs: Slide42DemandInputData[];
  sourceLine: string;
};

export type Slide43LaborSignalData = {
  metric: string;
  valuePct: number;
  sourceNote: string;
  group: "exposure" | "employer";
};

export type Slide43LaborExposureData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  body: string;
  signals: Slide43LaborSignalData[];
  sourceLine: string;
};

export type Slide44FiscalChartPointData = {
  country: string;
  pctGdp: number;
  isUs: boolean;
};

export type Slide44FiscalCardData = {
  title: string;
  metric: string;
  supportingLabel: string;
  body: string;
  source: string;
  tone: "primary" | "secondary";
};

export type Slide44FiscalPathData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  body: string;
  chartLabel: string;
  oecdAveragePct: number;
  almpSeries: Slide44FiscalChartPointData[];
  cards: Slide44FiscalCardData[];
  sourceLine: string;
};

export type Slide45RepressionReturnPointData = {
  asset: string;
  realReturnPct: number;
};

export type Slide45FinancialRepressionData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  body: string;
  chartLabel: string;
  returns: Slide45RepressionReturnPointData[];
  precedentTitle: string;
  precedentMetricFrom: string;
  precedentMetricTo: string;
  precedentBody: string;
  todayTitle: string;
  todayMetric: string;
  todayBody: string;
  sourceLine: string;
};

export type Slide47ResearchInfrastructureData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  imagePath: string;
  imageAlt: string;
  sourceLine: string;
};

export type KPIGrade = "A" | "B" | "C";

export type Slide48KPI = {
  id: string;
  name: string;
  source: string;
  frequency: string;
  grade: KPIGrade;
};

export type Slide48Scenario = {
  name: string;
};

export type Slide48ScenarioSet = {
  id: string;
  scenarios: Slide48Scenario[];
  persistence: string;
};

export type Slide48Dependency = {
  targetId: string;
  type: "requires" | "amplifies" | "conditional_on";
};

export type Slide48Hypothesis = {
  id: string;
  name: string;
  claim: string;
  tier: 1 | 2;
  cadence: string;
  dependencies: Slide48Dependency[];
  kpis: Slide48KPI[];
  scenarioSet: Slide48ScenarioSet;
};

export type Slide48Trend = {
  id: string;
  name: string;
  horizon: string;
  status: string;
  tone: "primary" | "secondary" | "tertiary";
  hypotheses: Slide48Hypothesis[];
};

export type Slide48LeadingIndicatorsData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  trends: Slide48Trend[];
  stats: {
    trends: number;
    hypotheses: number;
    kpis: number;
    scenarioSets: number;
    scenarios: number;
    validationChecks: number;
  };
  sourceLine: string;
};

export type Slide50ScenarioControlId = "annualReturnPct";

export type Slide50ScenarioControlData = {
  id: Slide50ScenarioControlId;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  format: "percent_1";
};

export type Slide50ScenarioMetricData = {
  key: "grossIrr" | "grossMoic" | "lpNetIrr" | "lpNetMoic" | "lpNetProfit" | "gpCarry";
  label: string;
  tone: "primary" | "secondary" | "caution";
};

export type Slide50ScenarioAnalysisData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  controls: Slide50ScenarioControlData[];
  metrics: Slide50ScenarioMetricData[];
  sourceLine: string;
};

export type FundStructureRow = {
  label: string;
  value: string;
};

export type FundStructureSection = {
  title: string;
  rows: FundStructureRow[];
};

export type Slide51FundStructureData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  leftSections: FundStructureSection[];
  rightSections: FundStructureSection[];
  sourceLine: string;
};

export type Slide52RiskStressCardData = {
  title: string;
  detail: string;
};

export type Slide52RiskArchitectureData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  riskFactorsTitle: string;
  riskFactors: string[];
  mitigantsTitle: string;
  mitigants: string[];
  stressTitle: string;
  stressCards: Slide52RiskStressCardData[];
  conclusion: string;
  sourceLine: string;
};

export type Slide53ValuationBucketData = {
  bucket: string;
  medianPct: number;
  p25Pct: number;
  p75Pct: number;
  observations: number;
};

export type Slide53ValuationSnapshotRowData = {
  metric: string;
  current: string;
  longRunMean: string;
  signal: string;
  tone: "negative" | "neutral";
};

export type Slide53RegimeShiftData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  chartLabel: string;
  buckets: Slide53ValuationBucketData[];
  currentCape: number;
  tableTitle: string;
  snapshotRows: Slide53ValuationSnapshotRowData[];
  whereWeAreTitle: string;
  whereWeAreMetric: string;
  whereWeAreBody: string;
  implicationTitle: string;
  implicationBody: string;
  sourceLine: string;
};

export type Slide54ClosingData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  sourceLine: string;
};

export type Slide56GpuGenerationPointData = {
  model: string;
  clusterSize: number;
  generation: string;
};

export type Slide56GpuGenerationData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  points: Slide56GpuGenerationPointData[];
  sourceLine: string;
};

export type Slide57InterconnectionPointData = {
  year: number;
  activeQueueGw: number;
};

export type Slide57InterconnectionData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  points: Slide57InterconnectionPointData[];
  annotationHeading: string;
  annotationDetail: string;
  sourceLine: string;
};

export type Slide58PackagingProgressionData = {
  model: string;
  memoryGb: string;
  stackConfig: string;
  tone: "primary" | "secondary" | "negative";
};

export type Slide58PackagingMetricData = {
  value: string;
  label: string;
};

export type Slide58PackagingChokepointData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  anatomyTitle: string;
  anatomySubtitle: string;
  hbmTitle: string;
  hbmProgression: Slide58PackagingProgressionData[];
  metrics: Slide58PackagingMetricData[];
  takeawayTitle: string;
  takeawayBody: string;
  sourceLine: string;
};

export type Slide59PipelineStepData = {
  step: string;
  title: string;
  body: string;
  tone: "primary" | "secondary";
};

export type Slide59ConceptCardData = {
  title: string;
  body: string;
  tone: "primary" | "negative";
};

export type Slide59LlmWorkflowData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  pipelineSteps: Slide59PipelineStepData[];
  conceptCards: Slide59ConceptCardData[];
  takeawayLabel: string;
  takeawayBody: string;
  sourceLine: string;
};

export type Slide60ComputeSpendPointData = {
  year: string;
  openAiUsdBillions: number | null;
  anthropicUsdBillions: number | null;
};

export type Slide60ComputeSpendData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  points: Slide60ComputeSpendPointData[];
  sourceLine: string;
};

export type Slide61CopperPointData = {
  year: number;
  supplyMt: number;
  demandMt: number;
};

export type Slide61CopperDeficitData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  points: Slide61CopperPointData[];
  deficitLabelYear: string;
  deficitLabelValueMt: number;
  sourceLine: string;
};

export type Slide62UnderwriteGateData = {
  step: string;
  title: string;
  body: string;
  failCondition: string;
};

export type Slide62UnderwriteSidePanelData = {
  title: string;
  tone: "primary" | "negative" | "neutral";
  bullets: string[];
};

export type Slide62UnderwriteData = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  gates: Slide62UnderwriteGateData[];
  sidePanels: Slide62UnderwriteSidePanelData[];
  sourceLine: string;
};
