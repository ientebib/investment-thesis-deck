"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide50ScenarioAnalysisData } from "@/lib/data/slides";
import type { Slide50ScenarioControlData, Slide50ScenarioControlId } from "@/lib/data/types";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const slideData = slide50ScenarioAnalysisData;

const LP_CAPITAL_M = 20;
const PROPERTY_BASE_M = 20;
const MAX_LTV = 0.55;
const UPFRONT_COSTS_M = 0.82;
const MANAGEMENT_FEE_RATE = 0.02;
const TREASURY_RATE = 0.04;
const RESERVE_RATE = 0.035;
const NOI_GROWTH_RATE = 0.02;
const DEBT_SERVICE_RESERVE_MONTHS = 6;

const INTERNAL_PROPERTY_MIN_M = 0;
const INTERNAL_PROPERTY_MAX_M = 20;
const INTERNAL_PROPERTY_STEP_M = 0.5;
const INTERNAL_TABLE_STEP_M = 2;

type ScenarioValues = Record<Slide50ScenarioControlId, number>;

type ScenarioResult = {
  propertyValue: number;
  loanPrincipal: number;
  annualDebtService: number;
  year1Noi: number;
  year1NoiAfterDebt: number;
  managementFeeYear1: number;
  surplusAfterFeeYear1: number;
  year1Dscr: number | null;
  year1FeeCoverage: number;
  day1ReEquity: number;
  day1StructuralLong: number;
  day1ReWeightPct: number;
  day1LongWeightPct: number;
  reDeclineToBreachPct: number;
  capitalLeftLongMinus100Value: number;
  capitalLeftLongMinus100Pct: number;
  capitalLeftLongMinus100ReMinus30Value: number;
  capitalLeftLongMinus100ReMinus30Pct: number;
  navSeries: number[];
  reEquitySeries: number[];
  structuralLongSeries: number[];
  grossIrr: number;
  grossMoic: number;
  lpNetIrr: number;
  lpNetMoic: number;
  lpNetProfit: number;
  gpCarry: number;
  loanBalanceYear10: number;
  exitReValue: number;
  totalNavYear10: number;
  debtServiceReserve: number;
};

type InternalSensitivityRow = {
  propertyValue: number;
  result: ScenarioResult;
};

function defaultControls(): ScenarioValues {
  return slideData.controls.reduce((accumulator, control) => {
    accumulator[control.id] = control.defaultValue;
    return accumulator;
  }, {} as ScenarioValues);
}

function controlBounds(control: Slide50ScenarioControlData, mode: "investor" | "internal") {
  if (mode === "internal" && control.id === "structuralLongReturnPct") {
    return { min: -100, max: 100, step: 1 };
  }

  return {
    min: control.min,
    max: control.max,
    step: control.step
  };
}

function calculateScenario(
  values: ScenarioValues,
  overrides?: {
    propertyValue?: number;
    exitCapRatePct?: number;
  }
): ScenarioResult {
  const entryCap = values.entryCapRatePct / 100;
  const exitCapRatePct = overrides?.exitCapRatePct ?? values.exitCapRatePct;
  const exitCap = exitCapRatePct / 100;
  const loanRate = values.loanRatePct / 100;
  const structuralLongReturn = values.structuralLongReturnPct / 100;

  const propertyValue = overrides?.propertyValue ?? PROPERTY_BASE_M;
  const loanPrincipal = propertyValue * MAX_LTV;

  const year1Noi = propertyValue * entryCap;
  const monthlyRate = loanRate / 12;
  const totalPayments = 360;
  const monthlyPayment =
    loanPrincipal > 0
      ? (loanPrincipal * monthlyRate * (1 + monthlyRate) ** totalPayments) /
        ((1 + monthlyRate) ** totalPayments - 1)
      : 0;
  const annualDebtService = monthlyPayment * 12;
  const debtServiceReserve = annualDebtService * (DEBT_SERVICE_RESERVE_MONTHS / 12);

  const day1ReEquity = Math.max(0, propertyValue - loanPrincipal);
  const day1StructuralLong = Math.max(0, LP_CAPITAL_M - propertyValue + loanPrincipal - UPFRONT_COSTS_M - debtServiceReserve);
  const day1Base = Math.max(0.01, day1ReEquity + day1StructuralLong);

  const reDeclineToBreachPct = (1 - MAX_LTV) * 100;
  const capitalLeftLongMinus100Value = day1ReEquity;
  const capitalLeftLongMinus100Pct = capitalLeftLongMinus100Value / LP_CAPITAL_M;
  const stressedReEquityAt30Down = Math.max(0, propertyValue * 0.7 - loanPrincipal);
  const capitalLeftLongMinus100ReMinus30Value = stressedReEquityAt30Down;
  const capitalLeftLongMinus100ReMinus30Pct = capitalLeftLongMinus100ReMinus30Value / LP_CAPITAL_M;

  const year1NoiAfterDebt = year1Noi - annualDebtService;
  const managementFeeYear1 = LP_CAPITAL_M * MANAGEMENT_FEE_RATE;
  const surplusAfterFeeYear1 = year1NoiAfterDebt - managementFeeYear1;
  const year1Dscr = annualDebtService > 0 ? year1Noi / annualDebtService : null;
  const year1FeeCoverage = managementFeeYear1 > 0 ? year1NoiAfterDebt / managementFeeYear1 : 0;

  const navSeries: number[] = [];
  const reEquitySeries: number[] = [];
  const structuralLongSeries: number[] = [];

  let structuralLongValue = day1StructuralLong;
  let reserveCash = debtServiceReserve;
  let treasuryCash = 0;
  let loanBalance = loanPrincipal;

  navSeries.push(propertyValue + structuralLongValue + reserveCash + treasuryCash - loanBalance);
  reEquitySeries.push(propertyValue - loanBalance);
  structuralLongSeries.push(structuralLongValue + reserveCash + treasuryCash);

  for (let year = 1; year <= 10; year += 1) {
    const noi = year1Noi * (1 + NOI_GROWTH_RATE) ** year;

    // 1. Grow assets
    structuralLongValue = structuralLongValue * (1 + structuralLongReturn);
    treasuryCash = treasuryCash * (1 + TREASURY_RATE);
    reserveCash = reserveCash * (1 + RESERVE_RATE);

    // 2. Net property cash flow (NOI minus debt service)
    const netPropertyCash = noi - annualDebtService;
    if (netPropertyCash >= 0) {
      treasuryCash += netPropertyCash;
    } else {
      // NOI shortfall: draw from reserve first, then treasury, then structural long
      let gap = -netPropertyCash;
      if (reserveCash >= gap) {
        reserveCash -= gap;
        gap = 0;
      } else {
        gap -= reserveCash;
        reserveCash = 0;
      }
      if (gap > 0) {
        if (treasuryCash >= gap) {
          treasuryCash -= gap;
        } else {
          const cashGap = gap - treasuryCash;
          treasuryCash = 0;
          structuralLongValue = Math.max(0, structuralLongValue - cashGap);
        }
      }
    }

    // 3. Loan amortization schedule
    const paymentsMade = year * 12;
    loanBalance =
      loanPrincipal > 0
        ? (loanPrincipal * ((1 + monthlyRate) ** totalPayments - (1 + monthlyRate) ** paymentsMade)) /
          ((1 + monthlyRate) ** totalPayments - 1)
        : 0;

    // 4. Management fee
    const interimReValue = noi / entryCap;
    const beforeFeeNav = interimReValue + structuralLongValue + reserveCash + treasuryCash - loanBalance;
    const managementFee =
      year <= 5 ? LP_CAPITAL_M * MANAGEMENT_FEE_RATE : Math.max(0, beforeFeeNav) * MANAGEMENT_FEE_RATE;

    // Fee waterfall: treasury cash first, then structural long
    if (treasuryCash >= managementFee) {
      treasuryCash -= managementFee;
    } else {
      const feeShortfall = managementFee - treasuryCash;
      treasuryCash = 0;
      structuralLongValue = Math.max(0, structuralLongValue - feeShortfall);
    }

    // 5. Maintain debt service reserve — replenish from treasury, else from structural long
    if (reserveCash < debtServiceReserve) {
      const reserveGap = debtServiceReserve - reserveCash;
      if (treasuryCash >= reserveGap) {
        treasuryCash -= reserveGap;
        reserveCash = debtServiceReserve;
      } else {
        reserveCash += treasuryCash;
        const stillNeeded = debtServiceReserve - reserveCash;
        treasuryCash = 0;
        const drawFromLong = Math.min(stillNeeded, structuralLongValue);
        structuralLongValue -= drawFromLong;
        reserveCash += drawFromLong;
      }
    }

    // 6. Chart values
    const chartReValue = year === 10 ? noi / exitCap : interimReValue;
    const totalCash = reserveCash + treasuryCash;

    navSeries.push(chartReValue + structuralLongValue + totalCash - loanBalance);
    reEquitySeries.push(chartReValue - loanBalance);
    structuralLongSeries.push(structuralLongValue + totalCash);
  }

  const noiYear10 = year1Noi * (1 + NOI_GROWTH_RATE) ** 10;
  const exitReValue = noiYear10 / exitCap;
  const totalCashAtExit = reserveCash + treasuryCash;
  const totalValue = Math.max(0, exitReValue + structuralLongValue + totalCashAtExit - loanBalance);
  const grossProfit = totalValue - LP_CAPITAL_M;

  const preferredHurdle = LP_CAPITAL_M * (1.09 ** 10 - 1);
  let gpCarry = 0;
  if (grossProfit > preferredHurdle) {
    const excessProfit = grossProfit - preferredHurdle;
    const catchupBand = Math.min(excessProfit, preferredHurdle * 0.25);
    gpCarry = catchupBand + Math.max(0, excessProfit - catchupBand) * 0.2;
  }

  const grossMoic = totalValue / LP_CAPITAL_M;
  const grossIrr = (Math.max(0.01, totalValue) / LP_CAPITAL_M) ** 0.1 - 1;

  const lpDistribution = totalValue - gpCarry;
  const lpNetProfit = lpDistribution - LP_CAPITAL_M;
  const lpNetMoic = lpDistribution / LP_CAPITAL_M;
  const lpNetIrr = (Math.max(0.01, lpDistribution) / LP_CAPITAL_M) ** 0.1 - 1;

  return {
    propertyValue,
    loanPrincipal,
    annualDebtService,
    year1Noi,
    year1NoiAfterDebt,
    managementFeeYear1,
    surplusAfterFeeYear1,
    year1Dscr,
    year1FeeCoverage,
    day1ReEquity,
    day1StructuralLong,
    day1ReWeightPct: (day1ReEquity / day1Base) * 100,
    day1LongWeightPct: (day1StructuralLong / day1Base) * 100,
    reDeclineToBreachPct,
    capitalLeftLongMinus100Value,
    capitalLeftLongMinus100Pct,
    capitalLeftLongMinus100ReMinus30Value,
    capitalLeftLongMinus100ReMinus30Pct,
    navSeries,
    reEquitySeries,
    structuralLongSeries,
    grossIrr,
    grossMoic,
    lpNetIrr,
    lpNetMoic,
    lpNetProfit,
    gpCarry,
    loanBalanceYear10: loanBalance,
    exitReValue,
    totalNavYear10: totalValue,
    debtServiceReserve
  };
}

function buildInternalSensitivityRows(values: ScenarioValues): InternalSensitivityRow[] {
  const rows: InternalSensitivityRow[] = [];

  for (let propertyValue = INTERNAL_PROPERTY_MIN_M; propertyValue <= INTERNAL_PROPERTY_MAX_M; propertyValue += INTERNAL_TABLE_STEP_M) {
    const roundedProperty = Number(propertyValue.toFixed(1));

    rows.push({
      propertyValue: roundedProperty,
      result: calculateScenario(values, {
        propertyValue: roundedProperty
      })
    });
  }

  return rows;
}

function formatControlValue(control: Slide50ScenarioControlData, value: number) {
  if (control.id === "structuralLongReturnPct") {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  }

  return `${value.toFixed(1)}%`;
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatPercentRaw(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatPercent0(value: number) {
  return `${value.toFixed(0)}%`;
}

function formatMoic(value: number) {
  return `${value.toFixed(2)}x`;
}

function formatMoneyMillions(value: number) {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(value).toFixed(2)}M`;
}

function formatDscr(value: number | null) {
  if (value === null) {
    return "N/A";
  }
  return `${value.toFixed(2)}x`;
}

function signedMoneyClass(value: number) {
  if (value > 0) {
    return "is-positive";
  }
  if (value < 0) {
    return "is-negative";
  }
  return "";
}

function metricValue(result: ScenarioResult, key: (typeof slideData.metrics)[number]["key"]) {
  switch (key) {
    case "grossIrr":
      return formatPercent(result.grossIrr);
    case "grossMoic":
      return formatMoic(result.grossMoic);
    case "lpNetIrr":
      return formatPercent(result.lpNetIrr);
    case "lpNetMoic":
      return formatMoic(result.lpNetMoic);
    case "lpNetProfit":
      return formatMoneyMillions(result.lpNetProfit);
    case "gpCarry":
      return formatMoneyMillions(result.gpCarry);
    default:
      return "";
  }
}

function ScenarioControls({
  controls,
  values,
  setValues,
  mode,
  idPrefix
}: {
  controls: Slide50ScenarioControlData[];
  values: ScenarioValues;
  setValues: Dispatch<SetStateAction<ScenarioValues>>;
  mode: "investor" | "internal";
  idPrefix: string;
}) {
  return (
    <div className="scenario-controls-grid">
      {controls.map((control) => {
        const bounds = controlBounds(control, mode);

        return (
          <article key={`${idPrefix}-${control.id}`} className="scenario-control-card">
            <label className="scenario-control-label" htmlFor={`${idPrefix}-${control.id}`}>
              {control.label}
            </label>
            <div className="scenario-control-value">{formatControlValue(control, values[control.id])}</div>
            <input
              id={`${idPrefix}-${control.id}`}
              className="scenario-control-range"
              type="range"
              min={bounds.min}
              max={bounds.max}
              step={bounds.step}
              value={values[control.id]}
              onChange={(event) => {
                const nextValue = Number(event.currentTarget.value);
                setValues((previous) => ({ ...previous, [control.id]: nextValue }));
              }}
            />
          </article>
        );
      })}
    </div>
  );
}

const xLabels = ["Yr 0", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5", "Yr 6", "Yr 7", "Yr 8", "Yr 9", "Yr 10"];

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `$${Number(value).toFixed(0)}M`
      },
      title: {
        display: true,
        text: "Value ($M)",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "line",
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 400 },
        padding: 10,
        boxWidth: 20
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (item) => `${item.dataset.label}: $${Number(item.raw).toFixed(1)}M`
      }
    }
  }
};

export function Slide50ScenarioAnalysis() {
  const [controls, setControls] = useState<ScenarioValues>(() => defaultControls());

  const scenarioResult = useMemo(() => calculateScenario(controls), [controls]);

  const chartData: ChartData<"line"> = {
    labels: xLabels,
    datasets: [
      {
        label: "Total NAV",
        data: scenarioResult.navSeries,
        borderColor: chartSeriesColor(theme, 1),
        backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.12),
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 4,
        tension: 0.28,
        fill: true
      },
      {
        label: "RE Equity",
        data: scenarioResult.reEquitySeries,
        borderColor: chartSeriesColor(theme, 0),
        backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.08),
        borderWidth: 2,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        tension: 0.28,
        fill: true
      },
      {
        label: "Structural Long + Cash",
        data: scenarioResult.structuralLongSeries,
        borderColor: theme.caution,
        backgroundColor: hexToRgba(theme.caution, 0.08),
        borderWidth: 2,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        tension: 0.28,
        fill: true
      }
    ]
  };

  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="scenario-layout">
        <ScenarioControls controls={slideData.controls} values={controls} setValues={setControls} mode="investor" idPrefix="scenario-investor" />

        <div className="chart-area scenario-chart-area">
          <LineChart data={chartData} options={chartOptions} />
        </div>

        <div className="scenario-metrics-grid">
          {slideData.metrics.map((metric) => (
            <article key={metric.key} className={`scenario-metric-card scenario-metric-card--${metric.tone}`}>
              <div className="scenario-metric-value">{metricValue(scenarioResult, metric.key)}</div>
              <div className="scenario-metric-label">{metric.label}</div>
            </article>
          ))}
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} tight />
    </>
  );
}

function DlKpiGroupHeader({ title }: { title: string }) {
  return <div className="scenario-dl-group-header">{title}</div>;
}

function DlKpiRow({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`scenario-dl-kpi-row ${className ?? ""}`}>
      <span className="scenario-dl-kpi-label">{label}</span>
      <span className="scenario-dl-kpi-value">{value}</span>
    </div>
  );
}

const internalChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 6, right: 12, bottom: 0, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 8, weight: 300 }
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 8, weight: 300 },
        callback: (v) => `$${Number(v).toFixed(0)}M`
      },
      title: {
        display: true,
        text: "Value ($M)",
        color: theme.textMuted,
        font: { family: fonts.data, size: 8, weight: 400 }
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "line",
        color: theme.textTertiary,
        font: { family: fonts.data, size: 8, weight: 400 },
        padding: 8,
        boxWidth: 16
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 9, weight: 400 },
      bodyFont: { family: fonts.data, size: 9, weight: 400 },
      callbacks: {
        label: (item) => `${item.dataset.label}: $${Number(item.raw).toFixed(1)}M`
      }
    }
  }
};

export function Slide50ScenarioAnalysisInternal() {
  const [controls, setControls] = useState<ScenarioValues>(() => defaultControls());
  const [internalPropertyAcquisition, setInternalPropertyAcquisition] = useState(10);

  const internalSelected = useMemo(
    () => calculateScenario(controls, { propertyValue: internalPropertyAcquisition }),
    [controls, internalPropertyAcquisition]
  );

  const internalRows = useMemo(() => buildInternalSensitivityRows(controls), [controls]);
  const nearestRowProperty = useMemo(() => {
    return internalRows.reduce((nearest, row) => {
      if (!nearest) return row.propertyValue;
      return Math.abs(row.propertyValue - internalPropertyAcquisition) < Math.abs(nearest - internalPropertyAcquisition)
        ? row.propertyValue
        : nearest;
    }, 0);
  }, [internalRows, internalPropertyAcquisition]);

  const navChartData: ChartData<"line"> = {
    labels: xLabels,
    datasets: [
      {
        label: "Total NAV",
        data: internalSelected.navSeries,
        borderColor: chartSeriesColor(theme, 1),
        backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.1),
        borderWidth: 2,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        tension: 0.28,
        fill: true
      },
      {
        label: "RE Equity",
        data: internalSelected.reEquitySeries,
        borderColor: chartSeriesColor(theme, 0),
        backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.08),
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
        tension: 0.28,
        fill: true
      },
      {
        label: "Structural Long + Cash",
        data: internalSelected.structuralLongSeries,
        borderColor: theme.caution,
        backgroundColor: hexToRgba(theme.caution, 0.08),
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
        tension: 0.28,
        fill: true
      }
    ]
  };

  return (
    <>
      <SectionHeader
        sectionLabel="INTERNAL WORKING MODEL"
        title="Scenario decision lens"
        subtitle="GP-only view. Adjust assumptions and property size to evaluate fund structure."
      />

      <div className="scenario-dl-layout">
        <div className="scenario-dl-sliders">
          {slideData.controls.map((control) => {
            const bounds = controlBounds(control, "internal");
            return (
              <article key={control.id} className="scenario-control-card">
                <label className="scenario-control-label" htmlFor={`dl-${control.id}`}>
                  {control.label}
                </label>
                <div className="scenario-control-value">
                  {formatControlValue(control, controls[control.id])}
                </div>
                <input
                  id={`dl-${control.id}`}
                  className="scenario-control-range"
                  type="range"
                  min={bounds.min}
                  max={bounds.max}
                  step={bounds.step}
                  value={controls[control.id]}
                  onChange={(e) => {
                    const nextValue = Number(e.currentTarget.value);
                    setControls((prev) => ({ ...prev, [control.id]: nextValue }));
                  }}
                />
              </article>
            );
          })}
          <article className="scenario-control-card scenario-control-card--accent">
            <label className="scenario-control-label" htmlFor="dl-property-acq">
              Property Acquisition
            </label>
            <div className="scenario-control-value">{formatMoneyMillions(internalPropertyAcquisition)}</div>
            <input
              id="dl-property-acq"
              className="scenario-control-range"
              type="range"
              min={INTERNAL_PROPERTY_MIN_M}
              max={INTERNAL_PROPERTY_MAX_M}
              step={INTERNAL_PROPERTY_STEP_M}
              value={internalPropertyAcquisition}
              onChange={(e) => {
                const v = Number(e.currentTarget.value);
                setInternalPropertyAcquisition(v);
              }}
            />
          </article>
        </div>

        <div className="scenario-dl-body">
          <div className="scenario-dl-chart-wrap">
            <LineChart data={navChartData} options={internalChartOptions} />
          </div>

          <div className="scenario-dl-kpis">
            <DlKpiGroupHeader title="Day-1 Structure" />
            <DlKpiRow label="RE Equity" value={formatMoneyMillions(internalSelected.day1ReEquity)} />
            <DlKpiRow label="Structural Long" value={formatMoneyMillions(internalSelected.day1StructuralLong)} />
            <DlKpiRow label={`Loan (${formatPercentRaw(MAX_LTV * 100)} LTV)`} value={formatMoneyMillions(internalSelected.loanPrincipal)} />
            <DlKpiRow label="Debt Svc Reserve (6mo, 3.5%)" value={formatMoneyMillions(internalSelected.debtServiceReserve)} />

            <DlKpiGroupHeader title="Year-1 Cash Flow" />
            <DlKpiRow label="NOI" value={formatMoneyMillions(internalSelected.year1Noi)} />
            <DlKpiRow label="Debt Service" value={formatMoneyMillions(internalSelected.annualDebtService)} />
            <DlKpiRow label="DSCR" value={formatDscr(internalSelected.year1Dscr)} />
            <DlKpiRow label="Management Fee" value={formatMoneyMillions(internalSelected.managementFeeYear1)} />
            <DlKpiRow
              label="Net Surplus (NOI − Debt − Fee)"
              value={formatMoneyMillions(internalSelected.surplusAfterFeeYear1)}
              className={signedMoneyClass(internalSelected.surplusAfterFeeYear1)}
            />

            <DlKpiGroupHeader title="10-Year Returns" />
            <DlKpiRow label="Gross IRR" value={formatPercent(internalSelected.grossIrr)} />
            <DlKpiRow label="Gross MOIC" value={formatMoic(internalSelected.grossMoic)} />
            <DlKpiRow label="LP Net IRR" value={formatPercent(internalSelected.lpNetIrr)} />
            <DlKpiRow label="LP Net MOIC" value={formatMoic(internalSelected.lpNetMoic)} />
            <DlKpiRow
              label="LP Net Profit"
              value={formatMoneyMillions(internalSelected.lpNetProfit)}
              className={signedMoneyClass(internalSelected.lpNetProfit)}
            />
            <DlKpiRow label="GP Carry" value={formatMoneyMillions(internalSelected.gpCarry)} />

            <DlKpiGroupHeader title="Exit & Stress" />
            <DlKpiRow label="Yr-10 Balloon (Loan Bal.)" value={formatMoneyMillions(internalSelected.loanBalanceYear10)} />
            <DlKpiRow label="RE Decline to Equity Breach" value={formatPercentRaw(internalSelected.reDeclineToBreachPct)} />
            <DlKpiRow
              label="Capital Left if Long = −100%"
              value={`${formatPercent(internalSelected.capitalLeftLongMinus100Pct)} (${formatMoneyMillions(internalSelected.capitalLeftLongMinus100Value)})`}
            />
            <DlKpiRow
              label="Capital Left if Both"
              value={`${formatPercent(internalSelected.capitalLeftLongMinus100ReMinus30Pct)} (${formatMoneyMillions(internalSelected.capitalLeftLongMinus100ReMinus30Value)})`}
            />
          </div>
        </div>

        <div className="scenario-allocation-table-wrap">
          <table className="scenario-allocation-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>RE / Long</th>
                <th>Yr-1 NOI</th>
                <th>Yr-1 Debt</th>
                <th>After Fee</th>
                <th>DSCR</th>
                <th>Balloon</th>
                <th>Gross IRR</th>
                <th>LP Net IRR</th>
                <th>LP MOIC</th>
                <th>GP Carry</th>
              </tr>
            </thead>
            <tbody>
              {internalRows.map((row) => {
                const isSelected = row.propertyValue === nearestRowProperty;
                return (
                  <tr key={row.propertyValue} className={isSelected ? "is-selected" : ""}>
                    <td>{formatMoneyMillions(row.propertyValue)}</td>
                    <td>
                      {formatPercent0(row.result.day1ReWeightPct)} / {formatPercent0(row.result.day1LongWeightPct)}
                    </td>
                    <td>{formatMoneyMillions(row.result.year1Noi)}</td>
                    <td>{formatMoneyMillions(row.result.annualDebtService)}</td>
                    <td className={signedMoneyClass(row.result.surplusAfterFeeYear1)}>
                      {formatMoneyMillions(row.result.surplusAfterFeeYear1)}
                    </td>
                    <td>{formatDscr(row.result.year1Dscr)}</td>
                    <td>{formatMoneyMillions(row.result.loanBalanceYear10)}</td>
                    <td>{formatPercent(row.result.grossIrr)}</td>
                    <td>{formatPercent(row.result.lpNetIrr)}</td>
                    <td>{formatMoic(row.result.lpNetMoic)}</td>
                    <td>{formatMoneyMillions(row.result.gpCarry)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SourceLine
        text="Internal model. Fee: Yr 1–5 on committed ($20M × 2%), Yr 6–10 on NAV. 6-mo debt svc reserve (T-bills @ 3.5%). NOI covers debt first; surplus covers fee; shortfall draws from long. 9% pref, 20% carry w/ catch-up. 30yr amort; balloon at exit."
        tight
      />
    </>
  );
}
