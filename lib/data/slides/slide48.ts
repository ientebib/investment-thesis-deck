import type { Slide48LeadingIndicatorsData } from "@/lib/data/types";

export const slide48LeadingIndicatorsData: Slide48LeadingIndicatorsData = {
  sectionLabel: "HOW WE UNDERWRITE",
  title: "Research Monitoring Framework",
  subtitle: "Three macro trends, thirteen hypotheses, thirty-nine KPIs, and structured scenario sets",
  stats: {
    trends: 3,
    hypotheses: 13,
    kpis: 39,
    scenarioSets: 13,
    scenarios: 40,
    validationChecks: 188,
  },
  trends: [
    {
      id: "T-001",
      name: "Fiscal Dominance and Real-Asset Repricing",
      horizon: "2025-2035",
      status: "Active",
      tone: "primary",
      hypotheses: [
        {
          id: "H-001",
          name: "Structural Deficit Lock-In",
          claim: "U.S. federal deficits will remain above 5% of GDP through FY 2030, eliminating fiscal space for counter-cyclical spending.",
          tier: 1,
          cadence: "Monthly",
          dependencies: [],
          kpis: [
            { id: "K-001", name: "CBO deficit/GDP forecast", source: "CBO", frequency: "Semi-annual", grade: "A" },
            { id: "K-002", name: "Net interest / revenue ratio", source: "Treasury", frequency: "Monthly", grade: "A" },
            { id: "K-003", name: "Primary balance trend", source: "FRED", frequency: "Quarterly", grade: "B" },
          ],
          scenarioSet: {
            id: "S-001",
            scenarios: [
              { name: "Deficit widens >7% GDP" },
              { name: "Deficit holds 5-7% GDP" },
              { name: "Consolidation below 5% GDP" },
            ],
            persistence: "Hold long real-assets unless consolidation confirmed for 2 consecutive quarters",
          },
        },
        {
          id: "H-002",
          name: "Term Premium Regime Shift",
          claim: "The 10-year term premium will sustain above +50 bps, repricing duration assets and favoring short-duration real exposures.",
          tier: 1,
          cadence: "Weekly",
          dependencies: [
            { targetId: "H-001", type: "requires" },
          ],
          kpis: [
            { id: "K-004", name: "ACM term premium (10Y)", source: "NY Fed", frequency: "Daily", grade: "A" },
            { id: "K-005", name: "Treasury auction tail spread", source: "Treasury", frequency: "Per auction", grade: "B" },
            { id: "K-006", name: "Foreign official holdings trend", source: "TIC", frequency: "Monthly", grade: "B" },
          ],
          scenarioSet: {
            id: "S-002",
            scenarios: [
              { name: "Premium >100 bps (fiscal alarm)" },
              { name: "Premium 50-100 bps (new normal)" },
              { name: "Premium reverts <50 bps" },
            ],
            persistence: "Re-underwrite gold and TIPS weighting if premium falls below 50 bps for 4 weeks",
          },
        },
        {
          id: "H-003",
          name: "Inflation Persistence Above Target",
          claim: "Core PCE will remain above 2.5% through 2026 due to fiscal impulse and supply-chain restructuring.",
          tier: 1,
          cadence: "Monthly",
          dependencies: [
            { targetId: "H-001", type: "amplifies" },
          ],
          kpis: [
            { id: "K-007", name: "Core PCE YoY", source: "BEA", frequency: "Monthly", grade: "A" },
            { id: "K-008", name: "Sticky CPI (Atlanta Fed)", source: "Atlanta Fed", frequency: "Monthly", grade: "A" },
            { id: "K-009", name: "5Y breakeven rate", source: "FRED", frequency: "Daily", grade: "B" },
          ],
          scenarioSet: {
            id: "S-003",
            scenarios: [
              { name: "Core PCE >3% (re-acceleration)" },
              { name: "Core PCE 2.5-3% (sticky above)" },
              { name: "Core PCE <2.5% (disinflation)" },
            ],
            persistence: "Reduce real-asset overweight only if disinflation sustained 3+ months",
          },
        },
        {
          id: "H-004",
          name: "Central Bank Gold Accumulation",
          claim: "Central bank net gold purchases will exceed 800 tonnes/year through 2027 as reserve diversification accelerates.",
          tier: 2,
          cadence: "Quarterly",
          dependencies: [
            { targetId: "H-001", type: "conditional_on" },
            { targetId: "H-002", type: "amplifies" },
          ],
          kpis: [
            { id: "K-010", name: "CB net purchases (tonnes/qtr)", source: "World Gold Council", frequency: "Quarterly", grade: "A" },
            { id: "K-011", name: "China PBOC gold holdings", source: "PBOC", frequency: "Monthly", grade: "B" },
            { id: "K-012", name: "Gold ETF flows", source: "Bloomberg", frequency: "Weekly", grade: "C" },
          ],
          scenarioSet: {
            id: "S-004",
            scenarios: [
              { name: "Purchases >1000t (acceleration)" },
              { name: "Purchases 500-1000t (trend)" },
              { name: "Purchases <500t (reversion)" },
            ],
            persistence: "Trim gold allocation if CB purchases fall below 500t for 2 quarters",
          },
        },
        {
          id: "H-005",
          name: "Commodity Supply Constraint",
          claim: "Critical mineral supply deficits (copper, uranium) will persist due to 15+ year mine development cycles meeting electrification demand.",
          tier: 2,
          cadence: "Quarterly",
          dependencies: [
            { targetId: "H-008", type: "amplifies" },
          ],
          kpis: [
            { id: "K-013", name: "Copper market balance (kt)", source: "ICSG", frequency: "Monthly", grade: "B" },
            { id: "K-014", name: "Uranium spot vs. contract premium", source: "UxC", frequency: "Weekly", grade: "B" },
            { id: "K-015", name: "Mine permitting pipeline (count)", source: "S&P Global", frequency: "Quarterly", grade: "C" },
          ],
          scenarioSet: {
            id: "S-005",
            scenarios: [
              { name: "Deficit widens (demand surge)" },
              { name: "Deficit steady (structural)" },
              { name: "Surplus emerges (demand slowdown)" },
            ],
            persistence: "Exit commodity longs if surplus sustained 2+ quarters",
          },
        },
      ],
    },
    {
      id: "T-002",
      name: "AI Infrastructure Buildout",
      horizon: "2024-2030",
      status: "Active",
      tone: "secondary",
      hypotheses: [
        {
          id: "H-006",
          name: "Hyperscaler Capex Supercycle",
          claim: "Aggregate Big-4 hyperscaler capex will exceed $250B/year by 2026 and sustain through 2028.",
          tier: 1,
          cadence: "Quarterly",
          dependencies: [],
          kpis: [
            { id: "K-016", name: "Big-4 aggregate capex ($B/qtr)", source: "10-Q filings", frequency: "Quarterly", grade: "A" },
            { id: "K-017", name: "Capex guidance revision breadth", source: "Earnings calls", frequency: "Quarterly", grade: "A" },
            { id: "K-018", name: "Cloud revenue growth rate", source: "10-Q filings", frequency: "Quarterly", grade: "B" },
          ],
          scenarioSet: {
            id: "S-006",
            scenarios: [
              { name: "Capex >$300B (overshoot)" },
              { name: "Capex $200-300B (base)" },
              { name: "Capex guidance cut >15%" },
            ],
            persistence: "Reduce AI infra weight on 2 consecutive quarters of guidance cuts",
          },
        },
        {
          id: "H-007",
          name: "Power Grid Bottleneck",
          claim: "Data center power demand will outpace grid interconnection capacity, creating a 2-4 year structural lag.",
          tier: 1,
          cadence: "Monthly",
          dependencies: [
            { targetId: "H-006", type: "requires" },
          ],
          kpis: [
            { id: "K-019", name: "Interconnection queue (GW)", source: "LBNL", frequency: "Annual", grade: "B" },
            { id: "K-020", name: "Avg queue-to-commercial (years)", source: "LBNL", frequency: "Annual", grade: "B" },
            { id: "K-021", name: "Datacenter power demand (GW)", source: "IEA", frequency: "Semi-annual", grade: "B" },
          ],
          scenarioSet: {
            id: "S-007",
            scenarios: [
              { name: "Bottleneck worsens (queue >3TW)" },
              { name: "Bottleneck persists (structural)" },
              { name: "Fast-track policy resolves lag" },
            ],
            persistence: "Maintain utility/power overweight unless queue clears by >30%",
          },
        },
        {
          id: "H-008",
          name: "Electrification Demand Inflection",
          claim: "Combined AI + EV + reshoring electricity demand will add 200+ TWh/year by 2028 in the U.S. alone.",
          tier: 1,
          cadence: "Monthly",
          dependencies: [
            { targetId: "H-007", type: "amplifies" },
            { targetId: "H-005", type: "requires" },
          ],
          kpis: [
            { id: "K-022", name: "U.S. electricity consumption (TWh)", source: "EIA", frequency: "Monthly", grade: "A" },
            { id: "K-023", name: "Industrial load growth (%)", source: "EIA", frequency: "Monthly", grade: "B" },
            { id: "K-024", name: "EV sales penetration (%)", source: "IEA", frequency: "Quarterly", grade: "B" },
          ],
          scenarioSet: {
            id: "S-008",
            scenarios: [
              { name: "Demand surge >250 TWh" },
              { name: "Demand growth 100-250 TWh" },
              { name: "Demand growth <100 TWh" },
            ],
            persistence: "Re-evaluate electrification thesis if growth falls below 100 TWh for 2 readings",
          },
        },
        {
          id: "H-009",
          name: "Packaging and HBM Chokepoint",
          claim: "Advanced packaging (CoWoS) and HBM supply will remain the binding constraint on GPU shipments through 2026.",
          tier: 2,
          cadence: "Monthly",
          dependencies: [
            { targetId: "H-006", type: "conditional_on" },
          ],
          kpis: [
            { id: "K-025", name: "CoWoS capacity utilization (%)", source: "Industry checks", frequency: "Monthly", grade: "C" },
            { id: "K-026", name: "HBM lead-time (weeks)", source: "Industry checks", frequency: "Monthly", grade: "C" },
            { id: "K-027", name: "NVIDIA datacenter revenue ($B)", source: "10-Q filings", frequency: "Quarterly", grade: "A" },
          ],
          scenarioSet: {
            id: "S-009",
            scenarios: [
              { name: "Bottleneck tightens further" },
              { name: "Gradual capacity ramp" },
              { name: "Constraint resolves (new entrants)" },
            ],
            persistence: "Reduce semiconductor overweight if constraint resolves for 2 quarters",
          },
        },
      ],
    },
    {
      id: "T-003",
      name: "Sociopolitical Feedback Loops",
      horizon: "2025-2030",
      status: "Monitoring",
      tone: "tertiary",
      hypotheses: [
        {
          id: "H-010",
          name: "Trade Fragmentation Persistence",
          claim: "U.S.-China trade decoupling will deepen, raising reshoring costs and sustaining input-price inflation.",
          tier: 1,
          cadence: "Monthly",
          dependencies: [
            { targetId: "H-003", type: "amplifies" },
          ],
          kpis: [
            { id: "K-028", name: "Effective tariff rate (%)", source: "USITC", frequency: "Monthly", grade: "A" },
            { id: "K-029", name: "U.S. import share from China (%)", source: "Census", frequency: "Monthly", grade: "A" },
            { id: "K-030", name: "Nearshoring capex announcements ($B)", source: "fDi Markets", frequency: "Quarterly", grade: "C" },
          ],
          scenarioSet: {
            id: "S-010",
            scenarios: [
              { name: "Full decoupling (tech + commodities)" },
              { name: "Selective decoupling (tech only)" },
              { name: "Detente / tariff rollback" },
            ],
            persistence: "Reduce reshoring beneficiaries if tariff rollback confirmed by executive order",
          },
        },
        {
          id: "H-011",
          name: "Policy Uncertainty Regime",
          claim: "Economic policy uncertainty will stay elevated (EPU >150) through 2026, compressing equity multiples for policy-sensitive sectors.",
          tier: 2,
          cadence: "Monthly",
          dependencies: [
            { targetId: "H-010", type: "amplifies" },
            { targetId: "H-001", type: "conditional_on" },
          ],
          kpis: [
            { id: "K-031", name: "Baker-Bloom EPU Index", source: "PolicyUncertainty.com", frequency: "Monthly", grade: "A" },
            { id: "K-032", name: "VIX term structure slope", source: "CBOE", frequency: "Daily", grade: "B" },
            { id: "K-033", name: "Fed funds futures implied vol", source: "CME", frequency: "Daily", grade: "B" },
          ],
          scenarioSet: {
            id: "S-011",
            scenarios: [
              { name: "EPU >200 (crisis mode)" },
              { name: "EPU 100-200 (elevated)" },
              { name: "EPU <100 (calm)" },
            ],
            persistence: "Increase hedging allocation if EPU >200 sustained for 2 months",
          },
        },
        {
          id: "H-012",
          name: "Labor Market Structural Shift",
          claim: "AI-driven automation will accelerate white-collar job displacement while blue-collar labor remains tight, widening wage divergence.",
          tier: 2,
          cadence: "Quarterly",
          dependencies: [
            { targetId: "H-006", type: "conditional_on" },
            { targetId: "H-010", type: "amplifies" },
          ],
          kpis: [
            { id: "K-034", name: "White-collar job openings (JOLTS)", source: "BLS", frequency: "Monthly", grade: "A" },
            { id: "K-035", name: "AI automation exposure index", source: "Brookings", frequency: "Annual", grade: "C" },
            { id: "K-036", name: "Wage growth: services vs. goods (%)", source: "BLS", frequency: "Monthly", grade: "B" },
          ],
          scenarioSet: {
            id: "S-012",
            scenarios: [
              { name: "Rapid displacement (>5% YoY)" },
              { name: "Gradual transition" },
              { name: "Absorption (new roles emerge)" },
            ],
            persistence: "Review thesis if white-collar openings recover for 3 consecutive months",
          },
        },
        {
          id: "H-013",
          name: "Equity Valuation Compression",
          claim: "S&P 500 CAPE >30 combined with rising real rates will compress forward returns to <5% annualized over 5 years.",
          tier: 1,
          cadence: "Monthly",
          dependencies: [
            { targetId: "H-002", type: "requires" },
            { targetId: "H-003", type: "amplifies" },
          ],
          kpis: [
            { id: "K-037", name: "Shiller CAPE ratio", source: "Shiller data", frequency: "Monthly", grade: "A" },
            { id: "K-038", name: "Equity risk premium (earnings yield - 10Y)", source: "Calculated", frequency: "Daily", grade: "B" },
            { id: "K-039", name: "S&P 500 forward P/E", source: "FactSet", frequency: "Weekly", grade: "A" },
          ],
          scenarioSet: {
            id: "S-013",
            scenarios: [
              { name: "CAPE >35 (bubble risk)" },
              { name: "CAPE 25-35 (expensive)" },
              { name: "CAPE <25 (mean reversion)" },
            ],
            persistence: "Increase equity hedges if CAPE >35 sustained for 1 quarter",
          },
        },
      ],
    },
  ],
  sourceLine: "Source: Internal research framework — Stack Holdings Investment Committee",
};
