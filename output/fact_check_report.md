# Investment Thesis Deck: Fact-Check & Data Consistency Report

Audit date: 2026-02-09
File audited: `output/InvestmentThesis.html`

## Corrections Applied

- Central-bank gold purchases narrative corrected across slides:
- Replaced "1,000+ tonnes for three years running" with:
  - "1,000+ tonnes in 2022-2024"
  - "2025 still elevated at 863 tonnes"
- Updated slide 19 title to avoid contradiction with 2025 data.

- Policy-uncertainty timestamp labels corrected:
- Changed panel labels from `Q1 2026` to `Jan 2026` where latest points are single-month readings.

- Trade-deficit wording corrected:
- Changed "$918B goods trade deficit" to "$918B goods-and-services trade deficit in 2024".

- Copper deficit headline aligned to chart data:
- Changed "30% deficit by 2035" to "~27% deficit by 2035".

- Hyperscaler capex consistency fixed:
- Changed comparison text from "~$350B in 2025" to "roughly $360B in 2025" to match chart totals.
- Updated summary stat on slide 55 from `$325B` to `$360B`.

- Hardware power-draw caveat added:
- Added explicit assumption (`~600W per accelerator`) for the 5.96 GW estimate.

## Data-Quality Improvements

- Added source lines to numeric-heavy slides lacking explicit citations (`2`, `6`, `36`, `45`, `53`, `54`, `55`).
- Ran slide-level parser checks to ensure high-numeric slides include source lines.
- Verified slide count integrity after edits (`62` slides).

## External Validation Spot-Checks

- U.S. 2024 goods-and-services deficit (`$918.4B`) confirmed via BEA release.
- IMF COFER reserve-currency tables reviewed for USD reserve-share context.
- World Gold Council FY2025 central-bank demand checked: `863t` in 2025, below `1,000t+` seen in the prior three years.

## Remaining High-Uncertainty Areas (Marked as Estimate/Scenario in deck)

- AI adoption/customer counts and AI revenue run-rates (vendor disclosures + media synthesis).
- AI hardware shipment trajectories beyond observed anchor years.
- Long-horizon fiscal displacement scenarios and implied policy costs.
- Any 2026E/2027+ values derived from guidance, extrapolation, or internal scenarios.

## Primary Source Links Used in Spot-Checks

- BEA (U.S. international trade deficit): https://www.bea.gov/news/2025/us-international-trade-goods-and-services-december-and-annual-2024
- IMF COFER (currency composition of reserves): https://data.imf.org/en/Datasets/COFER/COFER-DATASET
- World Gold Council FY2025 central-banks section: https://www.gold.org/goldhub/research/gold-demand-trends/gold-demand-trends-full-year-2025/central-banks
