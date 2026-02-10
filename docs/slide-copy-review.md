# Slide Copy Review Packet

Generated: 2026-02-10T04:18:06.848Z
Source: `lib/data/slides/*.ts` + `components/slides/*.tsx`

Use this as an editable language sheet. Each slide includes a key-value map of extracted copy so you can rewrite titles, subtitles, and prose in one pass.

## Slide 01

- Status: active
- Data file: `lib/data/slides/slide01.ts`
- Component: `components/slides/01-title.tsx`
- Section: (none)
- Title: STACK HOLDINGS
- Subtitle: A long-term liquid portfolio collateralized with real estate
- Charts: none

### Slide Intent

- A long-term liquid portfolio collateralized with real estate

### Extracted Copy Map

- `confidentialityLine`: CONFIDENTIAL · FEBRUARY 2026

### Inline Component Copy (Hardcoded)

- — noun
- The global infrastructure through which the planet thinks. From earth to cloud.

## Slide 02

- Status: active
- Data file: `lib/data/slides/slide02.ts`
- Component: `components/slides/02-leadership.tsx`
- Section: OVERVIEW
- Title: Leadership
- Subtitle: Operators and allocators with direct experience building AI systems at scale and trading across global macro markets.
- Charts: none
- Source line: Source: Internal team bios, Feb 2026

### Slide Intent

- Operators and allocators with direct experience building AI systems at scale and trading across global macro markets.

### Extracted Copy Map

- `description`: 
- `partners[0].name`: Marcos
- `partners[0].role`: Managing Partner & CIO
- `partners[0].bio`: Traded global fixed income, FX, and commodities at Banco de Mexico, managing central bank international reserves. Worked at Seldon Capital, a macro quantitative hedge fund, on trading and research. Studied a Master’s in Finance at MIT Sloan and undergraduate Economics at ITAM.
- `partners[1].name`: Isaac
- `partners[1].role`: Managing Partner & CTO
- `partners[1].bio`: Oversaw AI automation and ML systems at Kavak, Latin America’s largest automotive marketplace, across pricing, operations, and product. Worked at Angel Ventures, one of the most active venture capital firms in Latin America, on deal evaluation and due diligence across early- and growth-stage companies. Studied Finance at Tecnologico de Monterrey.

## Slide 03

- Status: active
- Data file: `lib/data/slides/slide03.ts`
- Component: `components/slides/03-capital-split.tsx`
- Section: PORTFOLIO CONSTRUCTION
- Title: Anchored in real assets. Driven by structural conviction.
- Subtitle: Protected downside with uncapped upside
- Charts: DonutChart×1
- Source line: Source: Internal fund construction model (target allocation and constraints), Feb 2026

### What This Chart Shows

- Protected downside with uncapped upside
- Visuals: DonutChart×1
- Data source: Internal fund construction model (target allocation and constraints), Feb 2026

### Extracted Copy Map

- `centerValue`: $20M
- `centerCaption`: LP CAPITAL
- `pillars[0].concept`: real_estate
- `pillars[0].title`: REAL ESTATE (~45%)
- `pillars[0].description`: Triple-net commercial real estate with investment-grade tenants. Contractual USD cash flows with hard asset collateral.
- `pillars[0].rows[0].label`: Structure
- `pillars[0].rows[0].value`: 100% equity → 55% LTV refi
- `pillars[0].rows[1].label`: Tenants
- `pillars[0].rows[1].value`: AAA credit, NNN lease
- `pillars[0].rows[2].label`: Debt
- `pillars[0].rows[2].value`: 10yr term, 30yr amortization
- `pillars[0].rows[3].label`: NOI
- `pillars[0].rows[3].value`: Surplus → U.S. Treasuries
- `pillars[1].concept`: structural_long
- `pillars[1].title`: STRUCTURAL LONG PORTFOLIO (~55%)
- `pillars[1].description`: Long-duration positions in commodities, infrastructure, real assets, and technology across secular macro themes.
- `pillars[1].rows[0].label`: Permitted
- `pillars[1].rows[0].value`: Equities, ETFs, commodities, FX, futures, options, crypto
- `pillars[1].rows[1].label`: Max Position
- `pillars[1].rows[1].value`: 10% of portfolio NAV
- `pillars[1].rows[2].label`: Prohibited
- `pillars[1].rows[2].value`: Margin, borrowing, shorts
- `pillars[1].rows[3].label`: Benchmark
- `pillars[1].rows[3].value`: S&P 500 Total Return

## Slide 04

- Status: active
- Data file: `lib/data/slides/slide04.ts`
- Component: `components/slides/04-capital-waterfall.tsx`
- Section: PORTFOLIO CONSTRUCTION
- Title: How capital flows through the structure
- Subtitle: 100% equity acquisition → 55% LTV cash-out refinance → structural long portfolio
- Charts: BarChart×1
- Source line: Illustrative deployment · $20M LP capital · Upfront costs include formation, acquisition, and origination fees

### What This Chart Shows

- 100% equity acquisition → 55% LTV cash-out refinance → structural long portfolio
- Visuals: BarChart×1
- Data source: Illustrative deployment · $20M LP capital · Upfront costs include formation, acquisition, and origination fees

### Extracted Copy Map

- `yAxisTitle`: Capital ($M)
- `points[0].label`: LP Capital
- `points[0].tickLabel`: LP Capital
- `points[0].annotationText`: $20.0M
- `points[0].annotationDataset`: increase
- `points[1].label`: Property\nAcquisition
- `points[1].tickLabel[0]`: Property
- `points[1].tickLabel[1]`: Acquisition
- `points[1].annotationText`: ($20.0M)
- `points[1].annotationDataset`: decrease
- `points[2].label`: Cash-Out\nRefi (55%)
- `points[2].tickLabel[0]`: Cash-Out
- `points[2].tickLabel[1]`: Refi (55%)
- `points[2].annotationText`: +$11.0M
- `points[2].annotationDataset`: increase
- `points[3].label`: Upfront\nCosts
- `points[3].tickLabel[0]`: Upfront
- `points[3].tickLabel[1]`: Costs
- `points[3].annotationText`: ($0.82M)
- `points[3].annotationDataset`: decrease
- `points[4].label`: Structural\nLong Portfolio
- `points[4].tickLabel[0]`: Structural
- `points[4].tickLabel[1]`: Long Portfolio
- `points[4].annotationText`: $10.18M
- `points[4].annotationDataset`: total

## Slide 05

- Status: active
- Data file: `lib/data/slides/slide05.ts`
- Component: `components/slides/05-nnn-opportunities.tsx`
- Section: PORTFOLIO CONSTRUCTION
- Title: Illustrative NNN lease opportunities
- Subtitle: The types of properties we target — investment-grade tenants, absolute NNN structure, long-duration cash flows
- Charts: none
- Source line: Illustrative opportunities only — not indicative of current fund holdings · Specific terms subject to negotiation and due diligence

### Slide Intent

- The types of properties we target — investment-grade tenants, absolute NNN structure, long-duration cash flows

### Extracted Copy Map

- `cards[0].category`: RETAIL NNN
- `cards[0].title`: Chase Bank & Chipotle
- `cards[0].subtitle`: 821 Eau Gallie Blvd · Melbourne, FL 32935
- `cards[0].image`: /assets/triple-net/chase_chipotle.jpeg
- `cards[0].imageObjectPosition`: center 18%
- `cards[0].rows[0].label`: Tenant
- `cards[0].rows[0].value`: Chase Bank & Chipotle
- `cards[0].rows[1].label`: Location
- `cards[0].rows[1].value`: 821 Eau Gallie Blvd, Melbourne, FL 32935
- `cards[0].rows[2].label`: Acquisition Price
- `cards[0].rows[2].value`: $7,732,000
- `cards[0].rows[3].label`: Cap Rate
- `cards[0].rows[3].value`: 4.6%
- `cards[0].rows[4].label`: NOI
- `cards[0].rows[4].value`: $355,687
- `cards[0].rows[5].label`: Remaining Lease Term
- `cards[0].rows[5].value`: 15 Years
- `cards[1].category`: QSR NNN
- `cards[1].title`: Wendy's
- `cards[1].subtitle`: 12135 Lem Turner Rd · Jacksonville, FL 32218
- `cards[1].image`: /assets/triple-net/wendys.jpeg
- `cards[1].rows[0].label`: Tenant
- `cards[1].rows[0].value`: Wendy's
- `cards[1].rows[1].label`: Location
- `cards[1].rows[1].value`: 12135 Lem Turner Rd, Jacksonville, FL 32218
- `cards[1].rows[2].label`: Acquisition Price
- `cards[1].rows[2].value`: $2,352,500
- `cards[1].rows[3].label`: Cap Rate
- `cards[1].rows[3].value`: 5.1%
- `cards[1].rows[4].label`: NOI
- `cards[1].rows[4].value`: $120,000
- `cards[1].rows[5].label`: Remaining Lease Term
- `cards[1].rows[5].value`: 20.6 Years
- `cards[2].category`: SINGLE TENANT NNN
- `cards[2].title`: TD Bank
- `cards[2].subtitle`: Target Outparcel · 14995 SW 88TH STREET, MIAMI, FL
- `cards[2].image`: /assets/triple-net/td_bank.jpeg
- `cards[2].rows[0].label`: Tenant
- `cards[2].rows[0].value`: TD Bank
- `cards[2].rows[1].label`: Location
- `cards[2].rows[1].value`: 14995 SW 88TH STREET, MIAMI, FL
- `cards[2].rows[2].label`: Acquisition Price
- `cards[2].rows[2].value`: $6,509,803
- `cards[2].rows[3].label`: Cap Rate
- `cards[2].rows[3].value`: 5.11%
- `cards[2].rows[4].label`: NOI
- `cards[2].rows[4].value`: $332,750
- `cards[2].rows[5].label`: Remaining Lease Term
- `cards[2].rows[5].value`: 12.1 Years
- `processSteps[0].title`: 1. SOURCE
- `processSteps[0].description`: Off-market and broker relationships across Florida, Texas, and Southeast US
- `processSteps[1].title`: 2. UNDERWRITE
- `processSteps[1].description`: Tenant credit, lease structure, location demographics, replacement cost analysis
- `processSteps[2].title`: 3. FINANCE
- `processSteps[2].description`: 50-60% LTV, 3-5 yr fixed then adjustable, 25-30 yr amortization
- `processSteps[3].title`: 4. MANAGE & REFI
- `processSteps[3].description`: Collect rent, season the asset, optimize the debt profile whenever possible

## Slide 06

- Status: active
- Data file: `lib/data/slides/slide06.ts`
- Component: `components/slides/06-nnn-structure.tsx`
- Section: PORTFOLIO CONSTRUCTION
- Title: NNN leases in Florida: structure and financing
- Subtitle: The asset, location edge, and debt profile
- Charts: BarChart×2
- Source line: Source: U.S. Census Bureau; BEA; Florida Dept. of Revenue; market financing terms as of Q1 2026

### What This Chart Shows

- The asset, location edge, and debt profile
- Visuals: BarChart×2
- Data source: U.S. Census Bureau; BEA; Florida Dept. of Revenue; market financing terms as of Q1 2026

### Chart-Related Copy

- `migrationChartTitle`: FLORIDA NET DOMESTIC MIGRATION (THOUSANDS)
- `noiDebtChartTitle`: ILLUSTRATIVE: NOI SURPLUS ACCUMULATION vs. BALLOON ($20M PROPERTY, 6% CAP)

### Extracted Copy Map

- `assetLabel`: THE ASSET
- `assetDescription`: Triple-net (NNN): the tenant pays property taxes, insurance, and maintenance. The landlord collects rent with near-zero operating cost. Tenants are investment-grade corporates on 10-20 year leases with 1.5-2% annual escalators.
- `whyFloridaLabel`: WHY FLORIDA
- `whyFloridaRows[0].label`: Population growth
- `whyFloridaRows[0].value`: +2.1M since 2020
- `whyFloridaRows[1].label`: State income tax
- `whyFloridaRows[1].value`: None
- `whyFloridaRows[2].label`: Net domestic migration
- `whyFloridaRows[2].value`: #1 in US
- `whyFloridaRows[3].label`: Landlord legal framework
- `whyFloridaRows[3].value`: Strong protections
- `whyFloridaRows[4].label`: GDP growth (2020-24)
- `whyFloridaRows[4].value`: +32%
- `migrationChartTitle`: FLORIDA NET DOMESTIC MIGRATION (THOUSANDS)
- `migrationYears[0]`: 2015
- `migrationYears[1]`: 2016
- `migrationYears[2]`: 2017
- `migrationYears[3]`: 2018
- `migrationYears[4]`: 2019
- `migrationYears[5]`: 2020
- `migrationYears[6]`: 2021
- `migrationYears[7]`: 2022
- `migrationYears[8]`: 2023
- `migrationYears[9]`: 2024
- `debtProfileLabel`: EXPECTED DEBT PROFILE
- `debtProfileRows[0].label`: Structure
- `debtProfileRows[0].value`: Buy all-equity, cash-out refi
- `debtProfileRows[1].label`: LTV
- `debtProfileRows[1].value`: 55% (hard cap)
- `debtProfileRows[2].label`: Loan term
- `debtProfileRows[2].value`: 10 years
- `debtProfileRows[3].label`: Amortization
- `debtProfileRows[3].value`: 30 years (balloon at maturity)
- `debtProfileRows[4].label`: Rate assumption
- `debtProfileRows[4].value`: ~5.5% fixed
- `debtProfileRows[5].label`: NOI surplus
- `debtProfileRows[5].value`: Retained in Treasuries
- `noiDebtChartTitle`: ILLUSTRATIVE: NOI SURPLUS ACCUMULATION vs. BALLOON ($20M PROPERTY, 6% CAP)

### Inline Component Copy (Hardcoded)

- Cumulative Surplus (at 3.5%)
- Debt Service
- Net domestic migration (thousands)

## Slide 07

- Status: active
- Data file: `lib/data/slides/slide07.ts`
- Component: `components/slides/07-executive-summary.tsx`
- Section: EXECUTIVE SUMMARY
- Title: Two foundational macro views.
- Subtitle: (none)
- Charts: none
- Source line: Source: World Gold Council Gold Demand Trends FY2025; hyperscaler earnings/guidance (Q4 2025 to Q2 FY2026); S&P Global Market Intelligence (2024)

### Slide Intent

- Two foundational macro views.

### Extracted Copy Map

- `thesisCards[0].title`: THESIS A - MACRO CONSTRAINT
- `thesisCards[0].tone`: primary
- `thesisCards[0].body`: The post-1950s monetary and political order is entering a regime of tightening constraint. Public debt is high, interest burdens are rising, geopolitics are fragmenting, and institutional credibility is weakening. Policy flexibility narrows: sustaining restrictive real financial conditions becomes progressively more costly. The adjustment path is a structural repricing toward assets with direct claims on real resources and productive capacity, and away from purely nominal financial claims.
- `thesisCards[1].title`: THESIS B - AI INFRASTRUCTURE
- `thesisCards[1].tone`: secondary
- `thesisCards[1].body`: Frontier AI is shifting from incremental software gains to a general-purpose production technology that substitutes for economically productive cognitive labor. Productivity gains can be real while the buildout becomes capital- and energy-intensive, constrained by physical bottlenecks: power, chips, cooling, grid capacity, minerals, and land. The result is a mixed macro impulse: deflationary in cognition, inflationary in the physical layer that enables it.
- `intersectionTitle`: THE INTERSECTION
- `intersectionBody`: These forces are not offsetting - they compound. AI raises potential output, but it also increases capital intensity and strains scarce inputs (power, grid hardware, chips, and minerals) inside a macro regime with less policy room to absorb shocks. As AI displaces labor, the political response skews toward redistribution and industrial policy - further widening structural deficits and reinforcing the drift toward real-asset repricing.
- `intersectionConclusion`: Net: deflationary in cognition, inflationary in resources - creating convexity in hard assets and physical bottlenecks, while compressing returns in undifferentiated information and "model-only" layers.

### Inline Component Copy (Hardcoded)

- — further widening structural deficits and reinforcing the drift toward real-asset repricing.
- , constrained by physical bottlenecks: power, chips, cooling, grid capacity, minerals, and land. The result is a mixed macro impulse:
- : sustaining restrictive real financial conditions becomes progressively more costly. The adjustment path is a
- . AI raises potential output, but it also increases capital intensity and
- . Public debt is high, interest burdens are rising, geopolitics are fragmenting, and institutional credibility is weakening.
- (power, grid hardware, chips, and minerals) inside a macro regime with less policy room to absorb shocks. As AI displaces labor, the political response skews toward
- and productive capacity, and away from purely nominal financial claims.
- deflationary in cognition, inflationary in the physical layer
- Frontier AI is shifting from incremental software gains to a
- Policy flexibility narrows
- that enables it.
- that substitutes for economically productive cognitive labor. Productivity gains can be real while the buildout becomes
- THE INTERSECTION
- The post-1950s monetary and political order is entering a
- These forces are not offsetting —
- THESIS A — MACRO CONSTRAINT
- THESIS B — AI INFRASTRUCTURE

## Slide 08

- Status: active
- Data file: `lib/data/slides/slide08.ts`
- Component: `components/slides/08-macro-shift-divider.tsx`
- Section: SECTION DIVIDER
- Title: MACRO SHIFT
- Subtitle: The repricing of real assets
- Charts: none

### Slide Intent

- The repricing of real assets

### Extracted Copy Map

- (no additional copy extracted)

## Slide 09

- Status: active
- Data file: `lib/data/slides/slide09.ts`
- Component: `components/slides/09-federal-debt.tsx`
- Section: THESIS A - FISCAL CONSTRAINT
- Title: Federal debt is no longer cyclical. It's structural.
- Subtitle: Fiscal spending is politically driven and structurally uncontrolled, backstopped by a Federal Reserve balance sheet that has expanded 10x since 2008.
- Charts: LineChart×1
- Source line: Source: Congressional Budget Office data and GAO simulation

### What This Chart Shows

- Fiscal spending is politically driven and structurally uncontrolled, backstopped by a Federal Reserve balance sheet that has expanded 10x since 2008.
- Visuals: LineChart×1
- Data source: Congressional Budget Office data and GAO simulation

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- Financial Crisis
- QE begins (2009)
- World War II

## Slide 10

- Status: active
- Data file: `lib/data/slides/slide10.ts`
- Component: `components/slides/10-interest-expense.tsx`
- Section: THESIS A - FISCAL CONSTRAINT
- Title: Interest expense is now a major budget item
- Subtitle: Debt service crowds out fiscal flexibility and narrows the policy toolkit. Deficits persist even in expansions.
- Charts: LineChart×1
- Source line: Source: Congressional Budget Office data and GAO simulation

### What This Chart Shows

- Debt service crowds out fiscal flexibility and narrows the policy toolkit. Deficits persist even in expansions.
- Visuals: LineChart×1
- Data source: Congressional Budget Office data and GAO simulation

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- Program Spending
- Spending + Interest

## Slide 11

- Status: active
- Data file: `lib/data/slides/slide11.ts`
- Component: `components/slides/11-interest-vs-revenue.tsx`
- Section: THESIS A - FISCAL CONSTRAINT
- Title: For every $5 the government collects, $1 goes to interest
- Subtitle: The debt compounds itself. The increase in interest expense widens the deficit, which requires more borrowing, which keeps rates elevated. This is the fiscal spiral - already in motion.
- Charts: LineChart×1
- Source line: Source: U.S. Congressional Budget Office, Macrobond, Apollo Chief Economist

### What This Chart Shows

- The debt compounds itself. The increase in interest expense widens the deficit, which requires more borrowing, which keeps rates elevated. This is the fiscal spiral - already in motion.
- Visuals: LineChart×1
- Data source: U.S. Congressional Budget Office, Macrobond, Apollo Chief Economist

### Extracted Copy Map

- (no additional copy extracted)

## Slide 12

- Status: active
- Data file: `lib/data/slides/slide12.ts`
- Component: `components/slides/12-term-premium.tsx`
- Section: THESIS A - ASSET PRICING
- Title: The term premium is back
- Subtitle: After a decade of suppression, investors are again demanding compensation for holding long-duration government debt.
- Charts: LineChart×1
- Source line: Source: Board of Governors of the Federal Reserve System (US) via FRED. Shaded areas indicate U.S. recessions.

### What This Chart Shows

- After a decade of suppression, investors are again demanding compensation for holding long-duration government debt.
- Visuals: LineChart×1
- Data source: Board of Governors of the Federal Reserve System (US) via FRED. Shaded areas indicate U.S. recessions.

### Extracted Copy Map

- `recessionPeriods[0].start`: 2001-03-01
- `recessionPeriods[0].end`: 2001-11-01
- `recessionPeriods[1].start`: 2007-12-01
- `recessionPeriods[1].end`: 2009-06-01
- `recessionPeriods[2].start`: 2020-02-01
- `recessionPeriods[2].end`: 2020-04-01

### Inline Component Copy (Hardcoded)

- 10Y Term Premium

## Slide 13

- Status: active
- Data file: `lib/data/slides/slide13.ts`
- Component: `components/slides/13-global-repricing.tsx`
- Section: THESIS A - GLOBAL
- Title: This is not just the US
- Subtitle: Japan and the UK are repricing long-run constraints.
- Charts: LineChart×2
- Source line: Source: FRED, Bank of Japan, Bank of England

### What This Chart Shows

- Japan and the UK are repricing long-run constraints.
- Visuals: LineChart×2
- Data source: FRED, Bank of Japan, Bank of England

### Extracted Copy Map

- `yccAdjustmentDate`: 2022-12
- `brexitDate`: 2016-06
- `trussDate`: 2022-09

### Inline Component Copy (Hardcoded)

- 10Y Gilt (%)
- 10Y Yield (%)
- GBP/USD
- JPY/USD
- United Kingdom
- YCC adj.

## Slide 14

- Status: active
- Data file: `lib/data/slides/slide14.ts`
- Component: `components/slides/14-core-inflation.tsx`
- Section: THESIS A - INFLATION REGIME
- Title: Core inflation has settled higher than pre-2020 across every major DM economy
- Subtitle: Inflation has not returned to pre-COVID levels. We appear to be entering a structurally higher regime above the target rate of most major central banks.
- Charts: LineChart×1
- Source line: Source: Goldman Sachs. Dashed divider marks forecast horizon.

### What This Chart Shows

- Inflation has not returned to pre-COVID levels. We appear to be entering a structurally higher regime above the target rate of most major central banks.
- Visuals: LineChart×1
- Data source: Goldman Sachs. Dashed divider marks forecast horizon.

### Extracted Copy Map

- `projectionStartDate`: 2025-10

### Inline Component Copy (Hardcoded)

- 2% Target
- Euro Area

## Slide 15

- Status: active
- Data file: `lib/data/slides/slide15.ts`
- Component: `components/slides/15-price-changes.tsx`
- Section: THESIS A - INFLATION REGIME
- Title: Inflation concentrates where supply can't scale
- Subtitle: Cumulative price change by category, 2000-2025.
- Charts: BarChart×1
- Source line: Source: Bureau of Labor Statistics

### What This Chart Shows

- Cumulative price change by category, 2000-2025.
- Visuals: BarChart×1
- Data source: Bureau of Labor Statistics

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- Overall CPI

## Slide 16

- Status: active
- Data file: `lib/data/slides/slide16.ts`
- Component: `components/slides/16-policy-uncertainty.tsx`
- Section: THESIS A - POLICY
- Title: Policy uncertainty is structural, not episodic
- Subtitle: Tariffs, sanctions, and fiscal expansion create persistent repricing across asset classes.
- Charts: LineChart×1
- Source line: Source: Baker, Bloom & Davis (EPU, TPU, Fiscal); Caldara & Iacoviello (GPR); CBOE (VIX); policyuncertainty.com.

### What This Chart Shows

- Tariffs, sanctions, and fiscal expansion create persistent repricing across asset classes.
- Visuals: LineChart×1
- Data source: Baker, Bloom & Davis (EPU, TPU, Fiscal); Caldara & Iacoviello (GPR); CBOE (VIX); policyuncertainty.com.

### Extracted Copy Map

- `panels[0].key`: trade
- `panels[0].title`: Trade Policy Uncertainty
- `panels[0].valueLabel`: 2,205
- `panels[0].valueDate`: Jan 2026
- `panels[0].baselineLabel`: Avg (100)
- `panels[0].tone`: negative
- `panels[1].key`: geopolitical
- `panels[1].title`: Geopolitical Risk Index
- `panels[1].valueLabel`: 164
- `panels[1].valueDate`: Jan 2026
- `panels[1].baselineLabel`: Avg (100)
- `panels[1].tone`: secondary
- `panels[2].key`: fiscal
- `panels[2].title`: Fiscal Policy Uncertainty
- `panels[2].valueLabel`: 438
- `panels[2].valueDate`: Jan 2026
- `panels[2].baselineLabel`: Avg (100)
- `panels[2].tone`: primary
- `panels[3].key`: vix
- `panels[3].title`: CBOE VIX
- `panels[3].valueLabel`: 22
- `panels[3].valueDate`: Jan 2026
- `panels[3].baselineLabel`: Avg (20)
- `panels[3].tone`: caution

## Slide 17

- Status: active
- Data file: `lib/data/slides/slide17.ts`
- Component: `components/slides/17-us-structural-advantage.tsx`
- Section: THESIS A - STRUCTURAL ADVANTAGE
- Title: The US still grows. Most developed economies don't.
- Subtitle: AI and reindustrialization can drive US GDP growth, but growth alone does not protect the dollar or reverse the fiscal trajectory.
- Charts: none
- Source line: Source: IMF WEO Jan 2026; EIA; USGS MCS 2025; Census Bureau; PitchBook; Stanford HAI.

### Slide Intent

- AI and reindustrialization can drive US GDP growth, but growth alone does not protect the dollar or reverse the fiscal trajectory.

### Extracted Copy Map

- `cards[0].title`: GDP Growth & Demographics
- `cards[0].metric`: 2.4%
- `cards[0].description`: IMF 2026 forecast - roughly 2x the Eurozone and 3x Japan.
- `cards[0].points[0]`: Eurozone 1.2%, Japan 0.7%, UK 1.3%.
- `cards[0].points[1]`: US population +0.5%/yr while Japan, Germany, and China decline.
- `cards[0].points[2]`: $892B in R&D spending - 3.5% of GDP.
- `cards[0].tone`: primary
- `cards[1].title`: Energy & Industrial Reliance
- `cards[1].metric`: 13.5M bbl/d
- `cards[1].description`: Largest oil producer, net exporter since 2019. But dependency risk remains.
- `cards[1].points[0]`: 90% of advanced chips manufactured in Taiwan.
- `cards[1].points[1]`: 100% import-reliant for gallium and graphite.
- `cards[1].points[2]`: $918B goods-and-services trade deficit in 2024.
- `cards[1].tone`: negative
- `cards[2].title`: Innovation Ecosystem
- `cards[2].metric`: 7 of top 10
- `cards[2].description`: Most valuable companies globally are American.
- `cards[2].points[0]`: $21T combined market cap of the top 7 US companies.
- `cards[2].points[1]`: 54% of global unicorns are American (853 companies).
- `cards[2].points[2]`: 79% of global AI investment.
- `cards[2].tone`: primary
- `cards[3].title`: Reserve Currency
- `cards[3].metric`: 58%
- `cards[3].metricDelta`: from 72%
- `cards[3].description`: USD share of global reserves has declined over two decades.
- `cards[3].points[0]`: BRICS+ nations increasing local-currency settlement.
- `cards[3].points[1]`: Central-bank gold demand remains elevated.
- `cards[3].points[2]`: Fiscal expansion can accelerate reserve diversification.
- `cards[3].tone`: negative
- `tensionLabel`: The tension
- `tensionBody`: The US can grow its way forward, but the path runs through fiscal expansion, AI-driven labor disruption, and commodity-intensive reindustrialization. GDP rises, while deficits and inflation pressure can rise with it.

## Slide 18

- Status: active
- Data file: `lib/data/slides/slide18.ts`
- Component: `components/slides/18-real-assets-divider.tsx`
- Section: SECTION DIVIDER
- Title: THE CASE FOR REAL ASSETS
- Subtitle: Scarcity plus credibility
- Charts: none

### Slide Intent

- Scarcity plus credibility

### Extracted Copy Map

- (no additional copy extracted)

## Slide 19

- Status: active
- Data file: `lib/data/slides/slide19.ts`
- Component: `components/slides/19-gold-vs-treasuries.tsx`
- Section: REAL ASSETS - GOLD
- Title: Gold has overtaken Treasuries in central bank reserves
- Subtitle: Sovereign reserve managers are diversifying away from dollar-denominated debt.
- Charts: LineChart×1
- Source line: Source: IMF, Department of Treasury

### What This Chart Shows

- Sovereign reserve managers are diversifying away from dollar-denominated debt.
- Visuals: LineChart×1
- Data source: IMF, Department of Treasury

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- Gold Holdings
- Gold overtakes Treasuries
- Treasury Holdings

## Slide 20

- Status: active
- Data file: `lib/data/slides/slide20.ts`
- Component: `components/slides/20-central-bank-gold.tsx`
- Section: REAL ASSETS - GOLD
- Title: Central-bank buying stayed elevated in 2025 after three 1,000t+ years
- Subtitle: Annual net change in central-bank gold holdings (tonnes).
- Charts: BarChart×1
- Source line: Source: World Gold Council, Gold Demand Trends FY2025

### What This Chart Shows

- Annual net change in central-bank gold holdings (tonnes).
- Visuals: BarChart×1
- Data source: World Gold Council, Gold Demand Trends FY2025

### Extracted Copy Map

- `note`: 2025 figure reflects full-year data (863t). Net purchases include reported and estimated unreported activity.

### Inline Component Copy (Hardcoded)

- 1,000t

## Slide 21

- Status: active
- Data file: `lib/data/slides/slide21.ts`
- Component: `components/slides/21-sp500-gold-ratio.tsx`
- Section: REAL ASSETS - GOLD
- Title: Priced in gold, US equities have made no progress since the GFC
- Subtitle: Equities have kept pace with money supply growth, but not with real store-of-value assets.
- Charts: LineChart×1
- Source line: Source: S&P Global, LBMA, IndexMundi; ratio indexed to Q1 2006 = 100.

### What This Chart Shows

- Equities have kept pace with money supply growth, but not with real store-of-value assets.
- Visuals: LineChart×1
- Data source: S&P Global, LBMA, IndexMundi; ratio indexed to Q1 2006 = 100.

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- Liberation Day
- S&P 500 / Gold Ratio (Q1 2006 = 100)
- US Downgrade

## Slide 22

- Status: active
- Data file: `lib/data/slides/slide22.ts`
- Component: `components/slides/22-gold-vs-real-yield.tsx`
- Section: REAL ASSETS - GOLD
- Title: The gold-real yield relationship broke in 2022
- Subtitle: Gold is now priced as a hedge against institutional risk, not rates.
- Charts: LineChart×1
- Source line: Source: Federal Reserve, Bloomberg

### What This Chart Shows

- Gold is now priced as a hedge against institutional risk, not rates.
- Visuals: LineChart×1
- Data source: Federal Reserve, Bloomberg

### Extracted Copy Map

- `relationshipBreakDate`: 2022-01-01

### Inline Component Copy (Hardcoded)

- Gold Price (ln)
- US 10Y Real Yield

## Slide 23

- Status: active
- Data file: `lib/data/slides/slide23.ts`
- Component: `components/slides/23-mine-lead-times.tsx`
- Section: REAL ASSETS - SUPPLY INELASTICITY
- Title: Mine development timelines have tripled in three decades
- Subtitle: Even if demand signals are clear today, new supply cannot respond for 18-29 years.
- Charts: BarChart×1
- Source line: Source: S&P Global Market Intelligence - Study of 268 mines across 23 countries (2024)

### What This Chart Shows

- Even if demand signals are clear today, new supply cannot respond for 18-29 years.
- Visuals: BarChart×1
- Data source: S&P Global Market Intelligence - Study of 268 mines across 23 countries (2024)

### Extracted Copy Map

- `projectedPeriod`: Non-Operating (Projected)

### Inline Component Copy (Hardcoded)

- (Projected)
- Avg. years from discovery to production
- Years from discovery to production

## Slide 24

- Status: active
- Data file: `lib/data/slides/slide24.ts`
- Component: `components/slides/24-mineral-concentration.tsx`
- Section: REAL ASSETS - CONCENTRATION RISK
- Title: China refines 19 of the 20 strategic minerals the IEA tracks
- Subtitle: Average market share: ~70%. Gallium: 98.7%. Magnesium: 95%. Rare earths: ~90%.
- Charts: BarChart×1
- Source line: Source: Various. See IEA Critical Minerals report.

### What This Chart Shows

- Average market share: ~70%. Gallium: 98.7%. Magnesium: 95%. Rare earths: ~90%.
- Visuals: BarChart×1
- Data source: Various. See IEA Critical Minerals report.

### Extracted Copy Map

- (no additional copy extracted)

## Slide 25

- Status: active
- Data file: `lib/data/slides/slide25.ts`
- Component: `components/slides/25-mineral-demand.tsx`
- Section: REAL ASSETS - DEMAND
- Title: Critical mineral demand is accelerating across the board
- Subtitle: Under stated policies, lithium demand more than doubles by 2030 and quadruples by 2040. Every mineral on this chart faces a supply gap.
- Charts: BarChart×1
- Source line: Source: IEA Global Critical Minerals Outlook 2025 (STEPS scenario)

### What This Chart Shows

- Under stated policies, lithium demand more than doubles by 2030 and quadruples by 2040. Every mineral on this chart faces a supply gap.
- Visuals: BarChart×1
- Data source: IEA Global Critical Minerals Outlook 2025 (STEPS scenario)

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- 2024 Actual
- 2030 STEPS
- 2035 STEPS
- 2040 STEPS

## Slide 26

- Status: active
- Data file: `lib/data/slides/slide26.ts`
- Component: `components/slides/26-beyond-gold.tsx`
- Section: THESIS A - COMMODITIES
- Title: Beyond gold: silver, copper, and uranium are repricing on structural demand
- Subtitle: Electrification, AI infrastructure, and reshoring are converging on the same constrained supply chains.
- Charts: LineChart×1
- Source line: Source: Yahoo Finance futures monthly closes (SI=F, HG=F) through February 9, 2026; FRED PURANUSDM (IMF uranium price) through December 2025

### What This Chart Shows

- Electrification, AI infrastructure, and reshoring are converging on the same constrained supply chains.
- Visuals: LineChart×1
- Data source: Yahoo Finance futures monthly closes (SI=F, HG=F) through February 9, 2026; FRED PURANUSDM (IMF uranium price) through December 2025

### Extracted Copy Map

- `cards[0].title`: Silver
- `cards[0].range`: $26.4/oz -> $79.1/oz
- `cards[0].description`: Industrial demand exceeds mine supply for the fourth consecutive year. Solar consumes about 20% of annual production while monetary demand rises.
- `cards[0].tone`: neutral
- `cards[1].title`: Copper
- `cards[1].range`: $4.09/lb -> $5.88/lb
- `cards[1].description`: EVs, solar buildout, and AI data centers all push demand higher. Supply remains slow because major new mines take nearly two decades to scale.
- `cards[1].tone`: secondary
- `cards[2].title`: Uranium
- `cards[2].range`: $28.7/lb -> $63.5/lb
- `cards[2].description`: Nuclear capacity expansion and hyperscaler interest in baseload power increase long-cycle fuel demand after a decade of underinvestment.
- `cards[2].tone`: primary
- `reshoringTitle`: Reshoring & tariffs
- `reshoringBody`: US industrial policy is deploying $280B (CHIPS), $370B (IRA), and $1.2T (IIJA) into capex-heavy buildout. Trade policy and export controls amplify pressure on already tight commodity chains.

## Slide 27

- Status: active
- Data file: `lib/data/slides/slide27.ts`
- Component: `components/slides/27-ai-buildout-divider.tsx`
- Section: SECTION DIVIDER
- Title: THE AI BUILDOUT
- Subtitle: The largest infrastructure deployment since electrification - compounding fiscal, energy, and commodity pressures already in motion.
- Charts: none

### Slide Intent

- The largest infrastructure deployment since electrification - compounding fiscal, energy, and commodity pressures already in motion.

### Extracted Copy Map

- (no additional copy extracted)

## Slide 28

- Status: active
- Data file: `lib/data/slides/slide28.ts`
- Component: `components/slides/28-why-ai-matters.tsx`
- Section: THE AI BUILDOUT
- Title: Why AI matters for this portfolio
- Subtitle: Not a technology bet - a physical infrastructure bet. Every GPU cluster needs power, copper, and concrete.
- Charts: LineChart×1
- Source line: Source: IEA; Goldman Sachs; Ember; EIA; company earnings disclosures (2026)

### What This Chart Shows

- Not a technology bet - a physical infrastructure bet. Every GPU cluster needs power, copper, and concrete.
- Visuals: LineChart×1
- Data source: IEA; Goldman Sachs; Ember; EIA; company earnings disclosures (2026)

### Extracted Copy Map

- `cards[0].label`: Power demand
- `cards[0].metric`: 120 GW
- `cards[0].description`: Projected US data center load by 2029 (from 4.3 GW in 2023), driving power-generation and grid capex.
- `cards[0].tone`: primary
- `cards[1].label`: Copper intensity
- `cards[1].metric`: 5-10x
- `cards[1].description`: More copper per MW in data centers than traditional buildings, accelerating existing supply deficits.
- `cards[1].tone`: secondary
- `cards[2].label`: Capex cycle
- `cards[2].metric`: $600B
- `cards[2].description`: Large-platform 2026 capex guidance points to a multi-year physical infrastructure deployment phase.
- `cards[2].tone`: primary

### Inline Component Copy (Hardcoded)

- China overtakes US
- United States

## Slide 29

- Status: active
- Data file: `lib/data/slides/slide29.ts`
- Component: `components/slides/29-ai-value-chain.tsx`
- Section: THESIS B - VALUE CHAIN
- Title: AI Value Chain: Constraint to Cash-Flow Map
- Subtitle: Investment framing: physical bottlenecks first, capability conversion second, recurring monetization last.
- Charts: none
- Source line: Sources: TrendForce Q2 2025; IEA Global Critical Minerals Outlook 2025; Menlo Ventures State of GenAI in Enterprise (Jan 2026); public earnings (MSFT, AWS, GOOG, META, NVDA FY2025-26); Mordor Intelligence; S&P Global

### Slide Intent

- Investment framing: physical bottlenecks first, capability conversion second, recurring monetization last.

### Extracted Copy Map

- `flowLabels[0]`: 1. Physical constraints
- `flowLabels[1]`: 2. Model conversion
- `flowLabels[2]`: 3. Revenue capture
- `phases[0].phaseTitle`: Physical layer
- `phases[0].phaseDescription`: Hard assets and permitting cadence set the supply ceiling.
- `phases[0].nodes[0].title`: Mining
- `phases[0].nodes[0].subtitle`: Copper, lithium, rare earths
- `phases[0].nodes[0].evidence`: Codelco 12%, Freeport, BHP, Albemarle, SQM, Lynas, MP Materials
- `phases[0].nodes[1].title`: Refining
- `phases[0].nodes[1].subtitle`: Chemical processing and purification
- `phases[0].nodes[1].evidence`: China ~90% rare earths, ~70% lithium, ~40% copper; US refined lithium <3%
- `phases[0].nodes[2].title`: Semiconductors
- `phases[0].nodes[2].subtitle`: Fab capacity and advanced packaging
- `phases[0].nodes[2].evidence`: TSMC ~70% foundry; NVIDIA ~90% AI GPU workloads
- `phases[0].nodes[3].title`: Data centers
- `phases[0].nodes[3].subtitle`: Power, cooling, networking
- `phases[0].nodes[3].evidence`: AWS, Azure, Google, Meta capex expansion and power intensity
- `phases[1].phaseTitle`: Model layer
- `phases[1].phaseDescription`: Post-training turns raw capability into reliable production behavior.
- `phases[1].nodes[0].title`: Pre-training
- `phases[1].nodes[0].subtitle`: Foundation capability from compute and data
- `phases[1].nodes[0].evidence`: Frontier model training concentrated in a small set of labs
- `phases[1].nodes[1].title`: Post-training
- `phases[1].nodes[1].subtitle`: SFT + preference optimization + RLHF/RLAIF
- `phases[1].nodes[1].evidence`: Specialized data-labeling and evaluation ecosystems are scaling quickly
- `phases[1].nodes[2].title`: Deployment
- `phases[1].nodes[2].subtitle`: Latency, safety, routing, and reliability loops
- `phases[1].nodes[2].evidence`: Inference infrastructure and serving economics now drive product quality
- `phases[2].phaseTitle`: Revenue layer
- `phases[2].phaseDescription`: Monetization compounds when inference is embedded in workflows.
- `phases[2].nodes[0].title`: Inference
- `phases[2].nodes[0].subtitle`: Token consumption from agents, copilots, and APIs
- `phases[2].nodes[0].evidence`: Enterprise LLM spend mix continues shifting with rapid absolute growth
- `phases[2].nodes[1].title`: Applications
- `phases[2].nodes[1].subtitle`: Distribution and workflow ownership create pricing power
- `phases[2].nodes[1].evidence`: Copilot and enterprise automation products are producing meaningful ARR
- `phases[2].nodes[2].title`: Cash flow
- `phases[2].nodes[2].subtitle`: Recurring gross profit funds the next model cycle
- `phases[2].nodes[2].evidence`: Cloud/platform economics increasingly tied to AI workload growth

## Slide 30

- Status: active
- Data file: `lib/data/slides/slide30.ts`
- Component: `components/slides/30-capability-benchmarks.tsx`
- Section: THESIS B - CAPABILITY
- Title: Harder benchmarks show capabilities still climbing steeply
- Subtitle: Frontier running max on non-saturated benchmarks - SWE-bench moved above 80%, FrontierMath rose from ~1% to ~41%.
- Charts: LineChart×1
- Source line: Source: Epoch AI Capabilities Index (ECI); performance = best-ever score as of each month

### What This Chart Shows

- Frontier running max on non-saturated benchmarks - SWE-bench moved above 80%, FrontierMath rose from ~1% to ~41%.
- Visuals: LineChart×1
- Data source: Epoch AI Capabilities Index (ECI); performance = best-ever score as of each month

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- SWE-Bench Verified

## Slide 31

- Status: active
- Data file: `lib/data/slides/slide31.ts`
- Component: `components/slides/31-task-horizon.tsx`
- Section: THESIS B - SCALING
- Title: The task horizon is doubling every 4.3 months
- Subtitle: METR Horizon v1.1 - GPT-5.2 can complete tasks that take humans roughly 6.5 hours.
- Charts: LineChart×1
- Source line: Source: METR Horizon v1.1 benchmark; p50 = median task duration where AI succeeds 50% of the time

### What This Chart Shows

- METR Horizon v1.1 - GPT-5.2 can complete tasks that take humans roughly 6.5 hours.
- Visuals: LineChart×1
- Data source: METR Horizon v1.1 benchmark; p50 = median task duration where AI succeeds 50% of the time

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- 1 HOUR
- every ~4.3 months
- Median task horizon (p50), hours
- since GPT-4 (Mar 2023)
- SOTA frontier
- Task horizon doubled

## Slide 32

- Status: active
- Data file: `lib/data/slides/slide32.ts`
- Component: `components/slides/32-ai-adoption.tsx`
- Section: THE AI BUILDOUT - ADOPTION
- Title: AI adoption is unprecedented - consumer and enterprise
- Subtitle: ~900M weekly consumer users and 1.3M+ business customers across leading labs. OpenAI leads customer count while Anthropic has material enterprise spend share.
- Charts: LineChart×1
- Source line: Source: OpenAI (Nov 2025); Anthropic (Sep 2025); Google (Q4 2025 earnings); The Information (Dec 2025); Menlo Ventures

### What This Chart Shows

- ~900M weekly consumer users and 1.3M+ business customers across leading labs. OpenAI leads customer count while Anthropic has material enterprise spend share.
- Visuals: LineChart×1
- Data source: OpenAI (Nov 2025); Anthropic (Sep 2025); Google (Q4 2025 earnings); The Information (Dec 2025); Menlo Ventures

### Extracted Copy Map

- `enterpriseLabel`: Enterprise adoption
- `cards[0].metric`: 1M+
- `cards[0].label`: OpenAI business customers
- `cards[0].detail`: Enterprise seats up sharply YoY
- `cards[1].metric`: 300K+
- `cards[1].label`: Anthropic business customers
- `cards[1].detail`: Scaled from under 1K two years prior
- `cards[2].metric`: 65%
- `cards[2].label`: Google Cloud customers using AI
- `cards[2].detail`: Cloud backlog doubled to roughly $240B
- `usageLabel`: Consumer - ChatGPT weekly active users

### Inline Component Copy (Hardcoded)

- ChatGPT weekly active users

## Slide 33

- Status: active
- Data file: `lib/data/slides/slide33.ts`
- Component: `components/slides/33-ai-revenue.tsx`
- Section: THE AI BUILDOUT - BUSINESS
- Title: Revenue is already materializing - faster than any prior technology wave
- Subtitle: The market is already paying for model output. OpenAI moved from ~$28M to ~$20B ARR in about three years; Anthropic from ~$100M to ~$9B in about two years.
- Charts: LineChart×1
- Source line: Source: Epoch AI; company disclosures; The Information; Bloomberg; CNBC

### What This Chart Shows

- The market is already paying for model output. OpenAI moved from ~$28M to ~$20B ARR in about three years; Anthropic from ~$100M to ~$9B in about two years.
- Visuals: LineChart×1
- Data source: Epoch AI; company disclosures; The Information; Bloomberg; CNBC

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- $100M
- $10B
- $10M
- Annualized revenue (USD)
- Jan 2023
- Jan 2024
- Jan 2025
- Jan 2026

## Slide 34

- Status: active
- Data file: `lib/data/slides/slide34.ts`
- Component: `components/slides/34-training-compute.tsx`
- Section: THESIS B - COMPUTE
- Title: Training compute has grown 5 orders of magnitude since 2017
- Subtitle: Each generation requires substantially more hardware - from roughly 10^21 to around 5x10^26 FLOP in less than a decade.
- Charts: LineChart×1
- Source line: Source: Epoch AI Notable AI Models database

### What This Chart Shows

- Each generation requires substantially more hardware - from roughly 10^21 to around 5x10^26 FLOP in less than a decade.
- Visuals: LineChart×1
- Data source: Epoch AI Notable AI Models database

### Extracted Copy Map

- `highlightLabels[0]`: GPT-3
- `highlightLabels[1]`: GPT-3.5
- `highlightLabels[2]`: GPT-4
- `highlightLabels[3]`: GPT-4.5
- `highlightLabels[4]`: GPT-5
- `highlightLabels[5]`: Grok 3
- `highlightLabels[6]`: Grok 4
- `highlightLabels[7]`: Grok-2
- `highlightLabels[8]`: Gemini Ultra
- `highlightLabels[9]`: PaLM
- `highlightLabels[10]`: PaLM 2
- `highlightLabels[11]`: Llama 3.1-405B
- `highlightLabels[12]`: Llama 4 Behemoth
- `highlightLabels[13]`: Claude 2
- `highlightLabels[14]`: Claude 3.5 Sonnet
- `highlightLabels[15]`: Claude 3.7 Sonnet
- `highlightLabels[16]`: DeepSeek-V3
- `highlightLabels[17]`: DeepSeek-R1
- `highlightLabels[18]`: Gopher

### Inline Component Copy (Hardcoded)

- Frontier models
- Other notable
- Publication year
- Training compute (FLOP)

## Slide 35

- Status: active
- Data file: `lib/data/slides/slide35.ts`
- Component: `components/slides/35-training-cost.tsx`
- Section: THESIS B - AI COMPUTE
- Title: Training costs have crossed $500M - approaching $1B per run
- Subtitle: More compute per model means more chips, power, and cooling. Frontier training is now megaproject-scale capex.
- Charts: LineChart×1
- Source line: Source: Epoch AI Notable AI Models database; costs in 2023 USD

### What This Chart Shows

- More compute per model means more chips, power, and cooling. Frontier training is now megaproject-scale capex.
- Visuals: LineChart×1
- Data source: Epoch AI Notable AI Models database; costs in 2023 USD

### Extracted Copy Map

- `highlightLabels[0]`: GPT-2
- `highlightLabels[1]`: GPT-3
- `highlightLabels[2]`: GPT-3.5
- `highlightLabels[3]`: GPT-4
- `highlightLabels[4]`: GPT-4.5
- `highlightLabels[5]`: Grok 3
- `highlightLabels[6]`: Grok 4
- `highlightLabels[7]`: Grok-2
- `highlightLabels[8]`: Gemini Ultra
- `highlightLabels[9]`: PaLM
- `highlightLabels[10]`: Llama 3.1-405B
- `highlightLabels[11]`: Claude 2
- `highlightLabels[12]`: Claude 3.5 Sonnet
- `highlightLabels[13]`: DeepSeek-V3
- `highlightLabels[14]`: DeepSeek-R1
- `highlightLabels[15]`: BERT-Large
- `highlightLabels[16]`: OpenAI Five
- `highlightLabels[17]`: BLOOM-176B
- `highlightLabels[18]`: Gopher
- `highlightLabels[19]`: LLaMA-65B
- `highlightLabels[20]`: Llama 4 Behemoth

### Inline Component Copy (Hardcoded)

- Publication year
- Training cost (2023 USD)

## Slide 36

- Status: active
- Data file: `lib/data/slides/slide36.ts`
- Component: `components/slides/36-hardware-shipments.tsx`
- Section: THESIS B - HARDWARE
- Title: 32x more chips shipped in three years
- Subtitle: Accelerator shipments and associated spend have moved into a steep compounding phase.
- Charts: LineChart×1
- Source line: Source: Company filings and SemiAnalysis estimates

### What This Chart Shows

- Accelerator shipments and associated spend have moved into a steep compounding phase.
- Visuals: LineChart×1
- Data source: Company filings and SemiAnalysis estimates

### Extracted Copy Map

- `shipmentsStats[0].value`: 310K
- `shipmentsStats[0].label`: 2022
- `shipmentsStats[1].value`: 1.4M
- `shipmentsStats[1].label`: 2023
- `shipmentsStats[2].value`: 5.5M
- `shipmentsStats[2].label`: 2024
- `shipmentsStats[3].value`: 10M+
- `shipmentsStats[3].label`: 2025
- `costStats[0].value`: $11B
- `costStats[0].label`: 2022
- `costStats[1].value`: $37B
- `costStats[1].label`: 2023
- `costStats[2].value`: $113B
- `costStats[2].label`: 2024
- `costStats[3].value`: $143B
- `costStats[3].label`: 2025
- `note`: 5.96 GW shipped chip power draw in 2025 (assuming ~600W per accelerator) - roughly six large nuclear plants.

### Inline Component Copy (Hardcoded)

- AI accelerators shipped (H100 equivalent)
- Associated chip cost
- Associated cost ($B)
- Shipments (M units, H100-eq)

## Slide 37

- Status: active
- Data file: `lib/data/slides/slide37.ts`
- Component: `components/slides/37-hyperscaler-capex.tsx`
- Section: THESIS B - AI INFRASTRUCTURE
- Title: Hyperscaler capex is entering escape velocity
- Subtitle: Microsoft, Meta, Alphabet, and Amazon are expected to spend above $600B this year, up materially from 2025 levels.
- Charts: BarChart×1
- Source line: Source: Company earnings (Q4 2025 / Q2 FY2026); 2026E = company guidance (META, GOOGL, AMZN) and Bloomberg consensus (MSFT)

### What This Chart Shows

- Microsoft, Meta, Alphabet, and Amazon are expected to spend above $600B this year, up materially from 2025 levels.
- Visuals: BarChart×1
- Data source: Company earnings (Q4 2025 / Q2 FY2026); 2026E = company guidance (META, GOOGL, AMZN) and Bloomberg consensus (MSFT)

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- ~$600B+
- Capital expenditure ($B)

## Slide 38

- Status: active
- Data file: `lib/data/slides/slide38.ts`
- Component: `components/slides/38-datacenter-buildout.tsx`
- Section: THESIS B - INFRASTRUCTURE
- Title: The datacenter buildout is at megaproject scale
- Subtitle: Operational AI datacenter power moves from low single digits to triple digits in GW terms.
- Charts: LineChart×1
- Source line: Source: RAND / SemiAnalysis / Epoch AI

### What This Chart Shows

- Operational AI datacenter power moves from low single digits to triple digits in GW terms.
- Visuals: LineChart×1
- Data source: RAND / SemiAnalysis / Epoch AI

### Extracted Copy Map

- `stats[0].value`: 4.3
- `stats[0].label`: 2023 GW
- `stats[1].value`: 21
- `stats[1].label`: 2025 GW
- `stats[2].value`: 120
- `stats[2].label`: 2029 GW (proj.)

## Slide 39

- Status: active
- Data file: `lib/data/slides/slide39.ts`
- Component: `components/slides/39-datacenter-load.tsx`
- Section: THESIS B - POWER
- Title: US datacenter load doubles to 130 GW by 2030
- Subtitle: 62 GW consumed in 2025, while capacity market pricing and queue dynamics indicate sustained power scarcity.
- Charts: BarChart×1
- Source line: Source: Energy Institute, JPMAM, PJM Interconnection

### What This Chart Shows

- 62 GW consumed in 2025, while capacity market pricing and queue dynamics indicate sustained power scarcity.
- Visuals: BarChart×1
- Data source: Energy Institute, JPMAM, PJM Interconnection

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- Current (2024-25)
- Projected (2030-35)

## Slide 40

- Status: active
- Data file: `lib/data/slides/slide40.ts`
- Component: `components/slides/40-inference-economics.tsx`
- Section: THESIS B - ECONOMICS
- Title: Inference is 45% of compute spend and growing
- Subtitle: Agentic workloads turn single prompts into sustained reasoning sessions.
- Charts: LineChart×1
- Source line: Source: SemiAnalysis, company disclosures, Epoch AI

### What This Chart Shows

- Agentic workloads turn single prompts into sustained reasoning sessions.
- Visuals: LineChart×1
- Data source: SemiAnalysis, company disclosures, Epoch AI

### Extracted Copy Map

- `body`: Models get cheaper per token, but usage grows faster. As workloads shift from single queries to autonomous multi-step agents, inference share compounds and keeps physical infrastructure demand elevated.

## Slide 41

- Status: active
- Data file: `lib/data/slides/slide41.ts`
- Component: `components/slides/41-forces-compound-divider.tsx`
- Section: SECTION DIVIDER
- Title: WHY THESE FORCES COMPOUND
- Subtitle: The intersection of macro shift and AI infrastructure
- Charts: none

### Slide Intent

- The intersection of macro shift and AI infrastructure

### Extracted Copy Map

- (no additional copy extracted)

## Slide 42

- Status: active
- Data file: `lib/data/slides/slide42.ts`
- Component: `components/slides/42-intersection-demand.tsx`
- Section: INTERSECTION
- Title: AI is deflationary in cognition. Inflationary in everything it needs to run.
- Subtitle: Physical bottlenecks are now the real constraint layer.
- Charts: BarChart×1
- Source line: Source: IEA, McKinsey, Goldman Sachs commodity research

### What This Chart Shows

- Physical bottlenecks are now the real constraint layer.
- Visuals: BarChart×1
- Data source: IEA, McKinsey, Goldman Sachs commodity research

### Extracted Copy Map

- `body`: Electricity, copper, grid hardware, aluminum, advanced packaging, and specialized memory all face permitting, geopolitical, and supply-chain bottlenecks.

### Inline Component Copy (Hardcoded)

- Growth 2024-2030 (%)

## Slide 43

- Status: active
- Data file: `lib/data/slides/slide43.ts`
- Component: `components/slides/43-labor-exposure.tsx`
- Section: INTERSECTION - LABOR
- Title: Labor exposure is broad and automation plans are accelerating
- Subtitle: Sourced values only: 2025 labor exposure and 2030 employer planning signals.
- Charts: BarChart×1
- Source line: Source: ILO-NASK Generative AI and Jobs Index (2025); World Economic Forum Future of Jobs Report 2025

### What This Chart Shows

- Sourced values only: 2025 labor exposure and 2030 employer planning signals.
- Visuals: BarChart×1
- Data source: ILO-NASK Generative AI and Jobs Index (2025); World Economic Forum Future of Jobs Report 2025

### Extracted Copy Map

- `body`: ILO's 2025 index puts exposure at 25% globally (34% in high-income economies; 11% in low-income). WEF reports 73% of employers plan task automation and 41% expect workforce reductions by 2030.

### Inline Component Copy (Hardcoded)

- Share (%)

## Slide 44

- Status: active
- Data file: `lib/data/slides/slide44.ts`
- Component: `components/slides/44-fiscal-path.tsx`
- Section: INTERSECTION - FISCAL
- Title: There is no fiscally neutral path through AI displacement
- Subtitle: Labor-heavy tax systems face rising automation pressure.
- Charts: BarChart×1
- Source line: Source: OECD SOCX (2019 baseline); US Treasury; RAND; CRS; CBO; Brookings

### What This Chart Shows

- Labor-heavy tax systems face rising automation pressure.
- Visuals: BarChart×1
- Data source: OECD SOCX (2019 baseline); US Treasury; RAND; CRS; CBO; Brookings

### Chart-Related Copy

- `chartLabel`: Public spending on active labor market policies (% of GDP, 2019)

### Extracted Copy Map

- `body`: 60% of advanced-economy jobs are exposed to AI. UBI-style responses are possible in theory, but the US still relies on labor-heavy taxes and has not enacted a replacement tax base at comparable scale.
- `chartLabel`: Public spending on active labor market policies (% of GDP, 2019)
- `cards[0].title`: Revenue Concentration
- `cards[0].metric`: 84%
- `cards[0].supportingLabel`: of FY2024 receipts tied to labor taxes
- `cards[0].body`: Individual income plus social insurance receipts were $4.136T of $4.919T. VAT, AI-rent, and automation-tax proposals remain exploratory in current US federal policy.
- `cards[0].source`: US Treasury FY2024 Table 2; RAND (Federal Revenue When AI Replaces Labor, 2025)
- `cards[0].tone`: primary
- `cards[1].title`: Safety Net Is Policy-Sensitive
- `cards[1].metric`: $187B
- `cards[1].supportingLabel`: SNAP cuts (2025-2034 estimate)
- `cards[1].body`: P.L. 119-21 tightened eligibility and work rules while shifting costs to states. CBO estimated 2.4M fewer SNAP participants in an average month.
- `cards[1].source`: CRS R48552 (Aug 15, 2025), summarizing CBO estimates (Jul 21 and Aug 11, 2025)
- `cards[1].tone`: primary
- `cards[2].title`: Workforce Adjustment Underfunded
- `cards[2].metric`: ~$20B
- `cards[2].supportingLabel`: federal workforce programs today
- `cards[2].body`: Down from roughly $60B inflation-adjusted in 1979 while the labor force grew about 50%. Core WIOA Titles I and II are about $6B.
- `cards[2].source`: Brookings (May 23, 2023), citing GAO-19-200
- `cards[2].tone`: secondary

### Inline Component Copy (Hardcoded)

- % of GDP

## Slide 45

- Status: active
- Data file: `lib/data/slides/slide45.ts`
- Component: `components/slides/45-financial-repression.tsx`
- Section: INTERSECTION - ENDGAME
- Title: Financial repression is the proven playbook for sovereign deleveraging
- Subtitle: Real rates below nominal growth transfer wealth from nominal claims to the sovereign.
- Charts: BarChart×1
- Source line: Source: Federal Reserve, BLS, Ibbotson SBBI, Dimson-Marsh-Staunton Global Returns; Dalio (Principles for Navigating Big Debt Crises, 2018)

### What This Chart Shows

- Real rates below nominal growth transfer wealth from nominal claims to the sovereign.
- Visuals: BarChart×1
- Data source: Federal Reserve, BLS, Ibbotson SBBI, Dimson-Marsh-Staunton Global Returns; Dalio (Principles for Navigating Big Debt Crises, 2018)

### Chart-Related Copy

- `chartLabel`: Real annualized returns during financial repression (1946-1980)

### Extracted Copy Map

- `body`: Real rates held below nominal growth for decades, silently transferring wealth from holders of nominal claims to the government. The same real assets that capture value from the AI buildout are the natural hedge.
- `chartLabel`: Real annualized returns during financial repression (1946-1980)
- `precedentTitle`: The Precedent
- `precedentMetricFrom`: 119%
- `precedentMetricTo`: 32%
- `precedentBody`: Debt-to-GDP fell 87 percentage points over 35 years of negative real rates, without default or hyperinflation.
- `todayTitle`: Today
- `todayMetric`: 123%
- `todayBody`: US federal debt-to-GDP has surpassed the 1946 wartime peak for the first time in history.

### Inline Component Copy (Hardcoded)

- Real annualized return (%)

## Slide 46

- Status: active
- Data file: `lib/data/slides/slide46.ts`
- Component: `components/slides/46-portfolio-construction-divider.tsx`
- Section: SECTION DIVIDER
- Title: PORTFOLIO CONSTRUCTION
- Subtitle: Built to compound through volatility
- Charts: none

### Slide Intent

- Built to compound through volatility

### Extracted Copy Map

- (no additional copy extracted)

## Slide 47

- Status: active
- Data file: `lib/data/slides/slide47.ts`
- Component: `components/slides/47-research-infrastructure.tsx`
- Section: PORTFOLIO - RESEARCH INFRASTRUCTURE
- Title: Proprietary research system powered by a long-horizon AI agent
- Subtitle: A CLI-based autonomous agent ingests live data from financial APIs, semiconductor supply-chain trackers, on-chain feeds, and independent research, then executes structured analytical skills for investment workflows. Every output is reviewed by a human expert before informing portfolio decisions.
- Charts: none
- Source line: Source: Internal research system architecture and workflow design

### Slide Intent

- A CLI-based autonomous agent ingests live data from financial APIs, semiconductor supply-chain trackers, on-chain feeds, and independent research, then executes structured analytical skills for investment workflows. Every output is reviewed by a human expert before informing portfolio decisions.

### Extracted Copy Map

- `imagePath`: /research_system_diagram.png
- `imageAlt`: Research System Architecture

### Inline Component Copy (Hardcoded)

- AI & Compute
- Autonomous research scaffolding &middot; persistent memory across sessions &middot; every output reviewed by a human analyst
- Company Filings
- Data Ingestion
- Data Tables
- Epoch AI
- Equity Research
- FMP API
- Long Horizon CLI Agent
- Market Pricing
- Moat Analysis
- On-Chain Feeds
- Patent Data
- Portfolio Construction
- Quant Factors
- Research Memos
- Risk Analysis
- Risk Reports
- SEC EDGAR
- Shipping / AIS
- Skill Library
- Stock Screener
- Structured Output
- Supply-Chain Maps
- Trend Analysis
- Value-Chain Mapping
- var(--caution)
- var(--ext-1)
- var(--primary)
- var(--secondary)

## Slide 48

- Status: active
- Data file: `lib/data/slides/slide48.ts`
- Component: `components/slides/48-leading-indicators.tsx`
- Section: PORTFOLIO - LEADING INDICATORS
- Title: What we track
- Subtitle: Three signal towers feed one decision engine: buildout velocity, macro constraints, and market regime.
- Charts: none
- Source line: Source: Internal investment committee dashboard schema and linked public data feeds

### Slide Intent

- Three signal towers feed one decision engine: buildout velocity, macro constraints, and market regime.

### Extracted Copy Map

- `towers[0].title`: AI Buildout
- `towers[0].tone`: primary
- `towers[0].points[0]`: Capex revision breadth: hyperscaler guidance revision momentum.
- `towers[0].points[1]`: Power conversion pace: queue conversion and energization delay trend.
- `towers[0].points[2]`: Packaging and HBM tightness: CoWoS and HBM lead-time slope.
- `towers[0].points[3]`: Training-to-inference mix: deployment intensity and monetization quality.
- `towers[1].title`: Macro Regime
- `towers[1].tone`: secondary
- `towers[1].points[0]`: Term premium and curve structure: discount-rate repricing pressure.
- `towers[1].points[1]`: Real-rate and breakeven split: growth shock versus inflation shock.
- `towers[1].points[2]`: Debt-service and fiscal impulse: policy room to absorb shocks.
- `towers[1].points[3]`: Commodity supply response lag: constraints feeding inflation persistence.
- `towers[2].title`: Market Regime and Positioning
- `towers[2].tone`: negative
- `towers[2].points[0]`: Index valuation state: CAPE, trailing and forward P/E, earnings-yield spread.
- `towers[2].points[1]`: Volatility and policy uncertainty composites across markets.
- `towers[2].points[2]`: Cross-asset stress transmission: rates, FX, metals, credit, and equities.
- `towers[2].points[3]`: Crowding and breadth deterioration checks.
- `coverageTitle`: Monitoring coverage map
- `coverageRows[0].cadence`: Daily
- `coverageRows[0].aiBuildout`: Primary
- `coverageRows[0].macro`: Primary
- `coverageRows[0].market`: Primary
- `coverageRows[0].action`: Size risk and update gross/net exposure.
- `coverageRows[1].cadence`: Weekly
- `coverageRows[1].aiBuildout`: Primary
- `coverageRows[1].macro`: Secondary
- `coverageRows[1].market`: Primary
- `coverageRows[1].action`: Rotate conviction weights and tighten stops.
- `coverageRows[2].cadence`: Monthly + Event
- `coverageRows[2].aiBuildout`: Secondary
- `coverageRows[2].macro`: Primary
- `coverageRows[2].market`: Secondary
- `coverageRows[2].action`: Re-underwrite, re-rank, and approve adds/exits.

### Inline Component Copy (Hardcoded)

- AI Buildout
- Portfolio Action

## Slide 49

- Status: active
- Data file: `lib/data/slides/slide49.ts`
- Component: `components/slides/49-fund-terms-divider.tsx`
- Section: SECTION DIVIDER
- Title: FUND TERMS
- Subtitle: Structure, governance, and alignment
- Charts: none

### Slide Intent

- Structure, governance, and alignment

### Extracted Copy Map

- (no additional copy extracted)

## Slide 50

- Status: active
- Data file: `lib/data/slides/slide50.ts`
- Component: `components/slides/50-scenario-analysis.tsx`
- Section: PORTFOLIO CONSTRUCTION
- Title: Scenario analysis
- Subtitle: Adjust assumptions to model projected returns. NOI escalates 2% annually. 10-year fund life.
- Charts: LineChart×1
- Source line: Source: Internal scenario model. Projections are illustrative. 2% management fee (years 1-5 on committed capital, years 6-10 on NAV) and 20% carry above 9% preferred return.

### What This Chart Shows

- Adjust assumptions to model projected returns. NOI escalates 2% annually. 10-year fund life.
- Visuals: LineChart×1
- Data source: Internal scenario model. Projections are illustrative. 2% management fee (years 1-5 on committed capital, years 6-10 on NAV) and 20% carry above 9% preferred return.

### Extracted Copy Map

- `controls[0].id`: entryCapRatePct
- `controls[0].label`: Entry Cap Rate
- `controls[0].format`: percent_1
- `controls[1].id`: exitCapRatePct
- `controls[1].label`: Exit Cap Rate (Yr 10)
- `controls[1].format`: percent_1
- `controls[2].id`: loanRatePct
- `controls[2].label`: Loan Rate
- `controls[2].format`: percent_1
- `controls[3].id`: structuralLongReturnPct
- `controls[3].label`: Structural Long Portfolio Return
- `controls[3].format`: percent_1
- `metrics[0].key`: grossIrr
- `metrics[0].label`: Gross IRR
- `metrics[0].tone`: primary
- `metrics[1].key`: grossMoic
- `metrics[1].label`: Gross MOIC
- `metrics[1].tone`: primary
- `metrics[2].key`: lpNetIrr
- `metrics[2].label`: LP Net IRR
- `metrics[2].tone`: secondary
- `metrics[3].key`: lpNetMoic
- `metrics[3].label`: LP Net MOIC
- `metrics[3].tone`: secondary
- `metrics[4].key`: lpNetProfit
- `metrics[4].label`: LP Net Profit
- `metrics[4].tone`: secondary
- `metrics[5].key`: gpCarry
- `metrics[5].label`: GP Carry
- `metrics[5].tone`: caution

### Inline Component Copy (Hardcoded)

- RE Equity
- Structural Long + Cash
- Total NAV
- Value ($M)
- Yr 0
- Yr 1
- Yr 10
- Yr 2
- Yr 3
- Yr 4
- Yr 5
- Yr 6
- Yr 7
- Yr 8
- Yr 9

## Slide 51

- Status: active
- Data file: `lib/data/slides/slide51.ts`
- Component: `components/slides/51-terms-at-a-glance.tsx`
- Section: FUND TERMS
- Title: Terms at a glance
- Subtitle: Key economics, governance, and liquidity mechanics.
- Charts: none
- Source line: Source: Draft fund term sheet and LPA framework (internal working draft, Feb 2026)

### Slide Intent

- Key economics, governance, and liquidity mechanics.

### Extracted Copy Map

- `panels[0].title`: Fee Structure
- `panels[0].rows[0].label`: Management Fee
- `panels[0].rows[0].value`: 2.0% committed capital (years 1-5), 2.0% NAV (years 6-10)
- `panels[0].rows[1].label`: Carried Interest
- `panels[0].rows[1].value`: 20% above 9% preferred
- `panels[0].rows[2].label`: Preferred Return
- `panels[0].rows[2].value`: 9.0% cumulative
- `panels[0].rows[3].label`: GP Catch-Up
- `panels[0].rows[3].value`: 100% until 20% of profits
- `panels[0].rows[4].label`: Formation Fee
- `panels[0].rows[4].value`: 1.0% of LP capital
- `panels[1].title`: Investment Guidelines
- `panels[1].rows[0].label`: Permitted
- `panels[1].rows[0].value`: Equities, ETFs, bonds, commodities, FX, futures, options, crypto, Treasuries
- `panels[1].rows[1].label`: Max Single Position
- `panels[1].rows[1].value`: 10% of portfolio NAV
- `panels[1].rows[2].label`: Margin
- `panels[1].rows[2].value`: Prohibited
- `panels[1].rows[3].label`: Outright Shorts
- `panels[1].rows[3].value`: Prohibited
- `panels[1].rows[4].label`: Derivatives Leverage
- `panels[1].rows[4].value`: Permitted
- `panels[2].title`: Liquidity
- `panels[2].rows[0].label`: Years 1-5
- `panels[2].rows[0].value`: Full lock-up, no redemptions
- `panels[2].rows[1].label`: Years 6-10
- `panels[2].rows[1].value`: GP discretionary liquidation window
- `panels[2].rows[2].label`: Secondary Transfers
- `panels[2].rows[2].value`: 90% NAV seller / 95% NAV buyer; 5% spread accrues to fund
- `panels[2].rows[3].label`: ROFR
- `panels[2].rows[3].value`: Existing LPs have first right of refusal
- `panels[2].rows[4].label`: GP Capital
- `panels[2].rows[4].value`: Locked until full dissolution
- `panels[3].title`: Reporting and Benchmarks
- `panels[3].rows[0].label`: Real Estate (~45%)
- `panels[3].rows[0].value`: NCREIF Property Index
- `panels[3].rows[1].label`: Structural Long (~55%)
- `panels[3].rows[1].value`: S&P 500 Total Return
- `panels[3].rows[2].label`: Fund Level
- `panels[3].rows[2].value`: Weighted composite
- `panels[3].rows[3].label`: Reporting
- `panels[3].rows[3].value`: Quarterly NAV and annual letter
- `panels[3].rows[4].label`: Access
- `panels[3].rows[4].value`: Direct LP-to-GP communication
- `lifecycleTitle`: Fund lifecycle
- `lifecycleSegments[0].label`: Yr 1
- `lifecycleSegments[0].tone`: secondary
- `lifecycleSegments[1].label`: Yr 2
- `lifecycleSegments[1].tone`: secondary
- `lifecycleSegments[2].label`: Yr 3
- `lifecycleSegments[2].tone`: secondary
- `lifecycleSegments[3].label`: Yr 4
- `lifecycleSegments[3].tone`: secondary
- `lifecycleSegments[4].label`: Yr 5
- `lifecycleSegments[4].tone`: secondary
- `lifecycleSegments[5].label`: Yr 6
- `lifecycleSegments[5].tone`: primary
- `lifecycleSegments[6].label`: Yr 7
- `lifecycleSegments[6].tone`: primary
- `lifecycleSegments[7].label`: Yr 8
- `lifecycleSegments[7].tone`: primary
- `lifecycleSegments[8].label`: Yr 9
- `lifecycleSegments[8].tone`: primary
- `lifecycleSegments[9].label`: Yr 10
- `lifecycleSegments[9].tone`: primary
- `lifecycleNotes[0]`: Full Lock-Up - 2% fee on committed capital
- `lifecycleNotes[1]`: GP Discretionary Window - 2% fee on NAV

## Slide 52

- Status: active
- Data file: `lib/data/slides/slide52.ts`
- Component: `components/slides/52-risk-architecture.tsx`
- Section: RISK MANAGEMENT
- Title: Risk architecture
- Subtitle: Every risk has a structural mitigation built into the fund design.
- Charts: none
- Source line: Source: Internal underwriting policy and portfolio risk limits (v2026.02)

### Slide Intent

- Every risk has a structural mitigation built into the fund design.

### Extracted Copy Map

- `riskFactorsTitle`: Risk Factors
- `riskFactors[0]`: Property value decline affecting refinancing ability
- `riskFactors[1]`: Tenant default and loss of contractual cash flow
- `riskFactors[2]`: Interest-rate risk at balloon refinancing in year 10
- `riskFactors[3]`: Market risk across structural long portfolio positions
- `riskFactors[4]`: Crypto and FX volatility at the position level
- `riskFactors[5]`: Structural leverage through real estate debt
- `mitigantsTitle`: Structural Mitigants
- `mitigants[0]`: 55% LTV hard cap preserves a 45% equity cushion
- `mitigants[1]`: AAA NNN tenants with contractual investment-grade cash flows
- `mitigants[2]`: Full NOI surplus accumulated in US Treasuries
- `mitigants[3]`: 10% position limit enforces diversification
- `mitigants[4]`: No margin and no outright shorts
- `mitigants[5]`: 30-year amortization for manageable debt service
- `stressTitle`: Stress scenario - what if everything goes wrong?
- `stressCards[0].title`: -30% Real Estate
- `stressCards[0].detail`: 45% equity cushion absorbs decline before LTV breach
- `stressCards[1].title`: -50% Portfolio
- `stressCards[1].detail`: No margin means no forced liquidation; RE collar preserves capital
- `stressCards[2].title`: Tenant Default
- `stressCards[2].detail`: AAA NNN lease plus T-bill reserve covers 2+ years debt service
- `stressCards[3].title`: Rate Spike
- `stressCards[3].detail`: 10-year fixed term insulates from interim rate movements
- `conclusion`: The real estate collar creates a structural floor. The structural long portfolio creates the upside.

## Slide 53

- Status: active
- Data file: `lib/data/slides/slide53.ts`
- Component: `components/slides/53-portfolio-regime-shift.tsx`
- Section: PORTFOLIO CONSTRUCTION
- Title: Traditional portfolio construction was designed for a regime that no longer exists.
- Subtitle: At current starting valuations, historical forward real return base rates for broad equity beta are materially compressed.
- Charts: BarChart×1
- Source line: Source: Robert Shiller online data (Yale) and multpl.com valuation series (captured Monday, February 9, 2026; latest close Friday, February 6, 2026).

### What This Chart Shows

- At current starting valuations, historical forward real return base rates for broad equity beta are materially compressed.
- Visuals: BarChart×1
- Data source: Robert Shiller online data (Yale) and multpl.com valuation series (captured Monday, February 9, 2026; latest close Friday, February 6, 2026).

### Chart-Related Copy

- `chartLabel`: Historical base rates by starting CAPE

### Extracted Copy Map

- `chartLabel`: Historical base rates by starting CAPE
- `tableTitle`: S&P 500 valuation snapshot
- `snapshotRows[0].metric`: Shiller CAPE
- `snapshotRows[0].current`: 40.38
- `snapshotRows[0].longRunMean`: 17.33
- `snapshotRows[0].signal`: 98.8th percentile
- `snapshotRows[0].tone`: negative
- `snapshotRows[1].metric`: Trailing P/E
- `snapshotRows[1].current`: 29.75
- `snapshotRows[1].longRunMean`: 16.19
- `snapshotRows[1].signal`: +84%
- `snapshotRows[1].tone`: negative
- `snapshotRows[2].metric`: Earnings Yield
- `snapshotRows[2].current`: 3.36%
- `snapshotRows[2].longRunMean`: 7.21%
- `snapshotRows[2].signal`: -53%
- `snapshotRows[2].tone`: negative
- `snapshotRows[3].metric`: Dividend Yield
- `snapshotRows[3].current`: 1.13%
- `snapshotRows[3].longRunMean`: 4.22%
- `snapshotRows[3].signal`: -73%
- `snapshotRows[3].tone`: negative
- `whereWeAreTitle`: Where we are now
- `whereWeAreMetric`: CAPE 40.38
- `whereWeAreBody`: The 40+ bucket historically mapped to a -3.45% median next-10Y annualized real return, around the 98.8th percentile of historical CAPE readings.
- `implicationTitle`: Portfolio construction implication
- `implicationBody`: In high-starting-valuation regimes, index beta carries weaker long-horizon base rates. Allocation edge shifts to manager selection, dispersion capture, and non-index exposures that do not rely on multiple expansion.

### Inline Component Copy (Hardcoded)

- Bars show median next 10-year annualized real return by starting CAPE bucket. Tooltips include interquartile range and sample count.
- Long-run Mean
- Median next 10Y annualized real return
- Next 10-year annualized real total return
- WE ARE HERE

## Slide 54

- Status: active
- Data file: `lib/data/slides/slide54.ts`
- Component: `components/slides/54-closing-question.tsx`
- Section: CLOSING
- Title: What if we are right?
- Subtitle: Closing frame for investment-committee discussion.
- Charts: none
- Source line: Source: Internal investment committee framing prompt (Feb 2026)

### Slide Intent

- Closing frame for investment-committee discussion.

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- — Benjamin Bratton, Long Now Foundation (2025)
- &ldquo;We, the fire apes, by folding bits of metal and rock and running electric currents through it, figured out how to make the rocks think. This is news.&rdquo;
- Author of
- The Stack: On Software and Sovereignty

## Slide 55

- Status: active
- Data file: `lib/data/slides/slide55.ts`
- Component: `components/slides/55-appendix-divider.tsx`
- Section: SECTION DIVIDER
- Title: APPENDIX
- Subtitle: Supporting detail and technical reference
- Charts: none

### Slide Intent

- Supporting detail and technical reference

### Extracted Copy Map

- (no additional copy extracted)

## Slide 56

- Status: active
- Data file: `lib/data/slides/slide56.ts`
- Component: `components/slides/56-gpu-generation-ladder.tsx`
- Section: APPENDIX - AI INFRASTRUCTURE
- Title: Each GPU generation unlocks a new frontier of training scale
- Subtitle: GPT-5.3-Codex (Feb 2026) is the first frontier model fully trained on NVIDIA GB200 NVL72.
- Charts: BarChart×1
- Source line: Source: OpenAI, NVIDIA, SemiAnalysis, The Information. Cluster sizes are best public estimates.

### What This Chart Shows

- GPT-5.3-Codex (Feb 2026) is the first frontier model fully trained on NVIDIA GB200 NVL72.
- Visuals: BarChart×1
- Data source: OpenAI, NVIDIA, SemiAnalysis, The Information. Cluster sizes are best public estimates.

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- Estimated GPU cluster size
- Estimated training cluster size (GPUs / equivalents)
- H100/GB200

## Slide 57

- Status: active
- Data file: `lib/data/slides/slide57.ts`
- Component: `components/slides/57-interconnection-queues.tsx`
- Section: APPENDIX - POWER
- Title: Interconnection queues stretch 5-7 years
- Subtitle: The grid cannot accommodate projected demand without large new transmission investment.
- Charts: BarChart×1
- Source line: Source: Lawrence Berkeley National Lab, PJM, EIA

### What This Chart Shows

- The grid cannot accommodate projected demand without large new transmission investment.
- Visuals: BarChart×1
- Data source: Lawrence Berkeley National Lab, PJM, EIA

### Extracted Copy Map

- `annotationHeading`: First decline
- `annotationDetail`: Gas projects +72%

### Inline Component Copy (Hardcoded)

- Active queue capacity (GW)

## Slide 58

- Status: excluded from runtime deck
- Data file: `lib/data/slides/slide58.ts`
- Component: `components/slides/58-gpu-packaging.tsx`
- Section: APPENDIX - SUPPLY CHAIN
- Title: GPU supply is a packaging story, not just a wafer story
- Subtitle: CoWoS + HBM is the second chokepoint after leading-edge silicon.
- Charts: none
- Source line: Source: TSMC earnings, SK Hynix disclosures, SemiAnalysis

### Slide Intent

- CoWoS + HBM is the second chokepoint after leading-edge silicon.

### Extracted Copy Map

- `anatomyTitle`: GPU package anatomy
- `anatomySubtitle`: TSMC CoWoS-S and HBM integration determine shipped accelerator volume.
- `hbmTitle`: HBM capacity per GPU - each generation requires more
- `hbmProgression[0].model`: H100 (Hopper)
- `hbmProgression[0].memoryGb`: 80 GB
- `hbmProgression[0].stackConfig`: 5 x HBM3
- `hbmProgression[0].tone`: secondary
- `hbmProgression[1].model`: B200 (Blackwell)
- `hbmProgression[1].memoryGb`: 192 GB
- `hbmProgression[1].stackConfig`: 8 x HBM3e
- `hbmProgression[1].tone`: primary
- `hbmProgression[2].model`: R100 (Rubin)
- `hbmProgression[2].memoryGb`: 288 GB
- `hbmProgression[2].stackConfig`: 12 x HBM4
- `hbmProgression[2].tone`: negative
- `metrics[0].value`: ~90%
- `metrics[0].label`: SK Hynix HBM3e share
- `metrics[1].value`: 12-18 mo
- `metrics[1].label`: HBM allocation lead time
- `takeawayTitle`: Portfolio implication
- `takeawayBody`: Packaging and memory bottlenecks cap delivered compute, even when wafer starts expand. Capacity pricing power accrues to upstream physical suppliers.

### Inline Component Copy (Hardcoded)

- -&gt;
- GPU DIE
- Organic substrate
- Silicon interposer (CoWoS)

## Slide 59

- Status: excluded from runtime deck
- Data file: `lib/data/slides/slide59.ts`
- Component: `components/slides/59-llm-architecture.tsx`
- Section: APPENDIX
- Title: How large language models work
- Subtitle: A simplified view of the architecture behind frontier AI systems.
- Charts: none
- Source line: Source: Vaswani et al. (2017), Kaplan et al. (2020), Epoch AI

### Slide Intent

- A simplified view of the architecture behind frontier AI systems.

### Extracted Copy Map

- `pipelineSteps[0].step`: 1
- `pipelineSteps[0].title`: Training data
- `pipelineSteps[0].body`: Trillions of tokens from internet, code, books, and licensed datasets establish statistical priors.
- `pipelineSteps[0].tone`: primary
- `pipelineSteps[1].step`: 2
- `pipelineSteps[1].title`: Transformer
- `pipelineSteps[1].body`: Self-attention layers process tokens in parallel and learn long-range relationships at scale.
- `pipelineSteps[1].tone`: primary
- `pipelineSteps[2].step`: 3
- `pipelineSteps[2].title`: Pre-training
- `pipelineSteps[2].body`: Massive GPU clusters run for weeks to months to optimize next-token prediction across all layers.
- `pipelineSteps[2].tone`: primary
- `pipelineSteps[3].step`: 4
- `pipelineSteps[3].title`: Fine-tuning
- `pipelineSteps[3].body`: Instruction tuning and RLHF align model behavior for reliability, safety, and usability.
- `pipelineSteps[3].tone`: secondary
- `pipelineSteps[4].step`: 5
- `pipelineSteps[4].title`: Inference
- `pipelineSteps[4].body`: Each production request runs a forward pass token-by-token, creating compounding ongoing compute demand.
- `pipelineSteps[4].tone`: secondary
- `conceptCards[0].title`: Scaling laws
- `conceptCards[0].body`: Performance improves predictably with more data, parameters, and compute. This drives recurring model scale-ups.
- `conceptCards[0].tone`: primary
- `conceptCards[1].title`: Training vs. inference
- `conceptCards[1].body`: Training is bursty and episodic. Inference is persistent and growing, making long-horizon infrastructure demand sticky.
- `conceptCards[1].tone`: primary
- `conceptCards[2].title`: Physical footprint
- `conceptCards[2].body`: Frontier runs and inference fleets require semiconductors, power delivery, and cooling at utility scale.
- `conceptCards[2].tone`: negative
- `takeawayLabel`: For this portfolio
- `takeawayBody`: You do not need to predict which model wins. Every serious model requires the same physical inputs: chips, copper, power, and cooling.

## Slide 60

- Status: active
- Data file: `lib/data/slides/slide60.ts`
- Component: `components/slides/60-ai-compute-spend.tsx`
- Section: APPENDIX - COMPUTE SPEND
- Title: AI lab compute spend is doubling every year
- Subtitle: Every dollar here flows into chips, power, and cooling - the physical layer of the AI stack.
- Charts: BarChart×1
- Source line: Source: Epoch AI, The Information, company disclosures

### What This Chart Shows

- Every dollar here flows into chips, power, and cooling - the physical layer of the AI stack.
- Visuals: BarChart×1
- Data source: Epoch AI, The Information, company disclosures

### Extracted Copy Map

- (no additional copy extracted)

### Inline Component Copy (Hardcoded)

- Total cloud compute spend ($B)

## Slide 61

- Status: active
- Data file: `lib/data/slides/slide61.ts`
- Component: `components/slides/61-copper-deficit.tsx`
- Section: APPENDIX - COPPER
- Title: Even if every announced project proceeds, copper faces a ~27% supply deficit by 2035
- Subtitle: Demand from electrification and AI infrastructure outpaces credible supply additions.
- Charts: LineChart×1
- Source line: Source: IEA Global Critical Minerals Outlook 2025 (STEPS), BloombergNEF

### What This Chart Shows

- Demand from electrification and AI infrastructure outpaces credible supply additions.
- Visuals: LineChart×1
- Data source: IEA Global Critical Minerals Outlook 2025 (STEPS), BloombergNEF

### Extracted Copy Map

- `deficitLabelYear`: 2037

### Inline Component Copy (Hardcoded)

- Total supply

## Slide 62

- Status: excluded from runtime deck
- Data file: `lib/data/slides/slide62.ts`
- Component: `components/slides/62-underwriting-framework.tsx`
- Section: APPENDIX - UNDERWRITING
- Title: How we underwrite
- Subtitle: Institutional gate-based underwriting with explicit failure conditions, kill-switches, and hard risk rails.
- Charts: none
- Source line: Source: Internal IC underwriting playbook (v2026.02)

### Slide Intent

- Institutional gate-based underwriting with explicit failure conditions, kill-switches, and hard risk rails.

### Extracted Copy Map

- `gates[0].step`: 1
- `gates[0].title`: Structural demand quality
- `gates[0].body`: End-market growth must remain durable through an entire cycle.
- `gates[0].failCondition`: Fail if demand depends on one-off policy, subsidy, or single-buyer concentration.
- `gates[1].step`: 2
- `gates[1].title`: Supply-constraint persistence
- `gates[1].body`: Scarcity duration must exceed what current valuation already discounts.
- `gates[1].failCondition`: Fail if supply response can normalize before demand compounding peaks.
- `gates[2].step`: 3
- `gates[2].title`: Balance-sheet and liquidity integrity
- `gates[2].body`: No plausible forced-seller path under adverse rates, spreads, or volumes.
- `gates[2].failCondition`: Fail if covenant stress, refinancing fragility, or liquidity mismatch is material.
- `gates[3].step`: 4
- `gates[3].title`: Entry multiple and exit optionality
- `gates[3].body`: Return profile must clear hurdle rates without multiple-expansion heroics.
- `gates[3].failCondition`: Fail if the thesis requires precise timing to crystallize value.
- `sidePanels[0].title`: IC decision states
- `sidePanels[0].tone`: primary
- `sidePanels[0].bullets[0]`: Go: all gates pass and no trigger is active.
- `sidePanels[0].bullets[1]`: Watch: thesis intact, but one gate is degrading.
- `sidePanels[0].bullets[2]`: Pass / Exit: gate break persists beyond tolerance.
- `sidePanels[1].title`: Kill-switch protocol
- `sidePanels[1].tone`: negative
- `sidePanels[1].bullets[0]`: Structural demand downgrade.
- `sidePanels[1].bullets[1]`: Scarcity unwind faster than underwriting case.
- `sidePanels[1].bullets[2]`: Balance-sheet stress above approved limits.
- `sidePanels[2].title`: Non-negotiable risk rails
- `sidePanels[2].tone`: neutral
- `sidePanels[2].bullets[0]`: Max single position: 10% NAV.
- `sidePanels[2].bullets[1]`: Margin / borrowing: prohibited.
- `sidePanels[2].bullets[2]`: Outright shorts: prohibited.
- `sidePanels[2].bullets[3]`: Mandatory re-underwrite on material signal break.

