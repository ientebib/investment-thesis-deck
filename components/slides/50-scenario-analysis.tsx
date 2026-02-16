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
const MANAGEMENT_FEE_RATE = 0.02;

type ScenarioValues = Record<Slide50ScenarioControlId, number>;

type HorizonReturn = {
  years: number;
  label: string;
  annualizedReturn: number;
  cumulativeReturn: number;
  endingValue: number;
};

type ScenarioResult = {
  navSeries: number[];
  grossIrr: number;
  grossMoic: number;
  lpNetIrr: number;
  lpNetMoic: number;
  lpNetProfit: number;
  gpCarry: number;
  horizons: HorizonReturn[];
};

function defaultControls(): ScenarioValues {
  return slideData.controls.reduce((accumulator, control) => {
    accumulator[control.id] = control.defaultValue;
    return accumulator;
  }, {} as ScenarioValues);
}

function controlBounds(control: Slide50ScenarioControlData) {
  return {
    min: control.min,
    max: control.max,
    step: control.step
  };
}

function calculateScenario(values: ScenarioValues): ScenarioResult {
  const annualReturn = values.annualReturnPct / 100;

  const navSeries: number[] = [];
  let portfolioValue = LP_CAPITAL_M;

  navSeries.push(portfolioValue);

  for (let year = 1; year <= 10; year += 1) {
    // 1. Grow portfolio
    portfolioValue = portfolioValue * (1 + annualReturn);

    // 2. Subtract management fee
    const managementFee = Math.max(0, portfolioValue) * MANAGEMENT_FEE_RATE;
    portfolioValue = Math.max(0, portfolioValue - managementFee);

    navSeries.push(portfolioValue);
  }

  const totalValue = Math.max(0, portfolioValue);
  const grossProfit = totalValue - LP_CAPITAL_M;

  const preferredHurdle = LP_CAPITAL_M * (1.05 ** 10 - 1);
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

  // Compute horizon returns (after fees) at key intervals
  const horizonYears = [1, 2, 3, 5, 7, 10];
  const horizons: HorizonReturn[] = horizonYears
    .filter((yr) => yr <= navSeries.length - 1)
    .map((yr) => {
      const endVal = navSeries[yr];
      const cumReturn = (endVal - LP_CAPITAL_M) / LP_CAPITAL_M;
      const annReturn = (Math.max(0.01, endVal) / LP_CAPITAL_M) ** (1 / yr) - 1;
      return {
        years: yr,
        label: yr === 1 ? "1 Year" : `${yr} Years`,
        annualizedReturn: annReturn,
        cumulativeReturn: cumReturn,
        endingValue: endVal
      };
    });

  return {
    navSeries,
    grossIrr,
    grossMoic,
    lpNetIrr,
    lpNetMoic,
    lpNetProfit,
    gpCarry,
    horizons
  };
}

function formatControlValue(control: Slide50ScenarioControlData, value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatMoic(value: number) {
  return `${value.toFixed(2)}x`;
}

function formatMoneyMillions(value: number) {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(value).toFixed(2)}M`;
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
  idPrefix
}: {
  controls: Slide50ScenarioControlData[];
  values: ScenarioValues;
  setValues: Dispatch<SetStateAction<ScenarioValues>>;
  idPrefix: string;
}) {
  return (
    <div className="scenario-controls-grid">
      {controls.map((control) => {
        const bounds = controlBounds(control);

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
        label: "Portfolio NAV",
        data: scenarioResult.navSeries,
        borderColor: chartSeriesColor(theme, 0),
        backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.12),
        borderWidth: 2,
        pointRadius: 3,
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
        <ScenarioControls controls={slideData.controls} values={controls} setValues={setControls} idPrefix="scenario-investor" />

        <div className="chart-area scenario-chart-area">
          <LineChart data={chartData} options={chartOptions} />
        </div>

        <div className="scenario-horizons">
          <div className="scenario-horizons-header">
            <span className="scenario-horizons-col">Horizon</span>
            <span className="scenario-horizons-col">Annual Return (net)</span>
            <span className="scenario-horizons-col">Cumulative Return</span>
            <span className="scenario-horizons-col">Ending Value</span>
          </div>
          {scenarioResult.horizons.map((h) => (
            <div key={h.years} className="scenario-horizons-row">
              <span className="scenario-horizons-col scenario-horizons-label">{h.label}</span>
              <span className="scenario-horizons-col scenario-horizons-val">{formatPercent(h.annualizedReturn)}</span>
              <span className="scenario-horizons-col scenario-horizons-val">{formatPercent(h.cumulativeReturn)}</span>
              <span className="scenario-horizons-col scenario-horizons-val">{formatMoneyMillions(h.endingValue)}</span>
            </div>
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

function signedMoneyClass(value: number) {
  if (value > 0) return "is-positive";
  if (value < 0) return "is-negative";
  return "";
}

type InternalSensitivityRow = {
  annualReturn: number;
  result: ScenarioResult;
};

function buildInternalSensitivityRows(values: ScenarioValues): InternalSensitivityRow[] {
  const rows: InternalSensitivityRow[] = [];
  for (let ret = -20; ret <= 50; ret += 5) {
    rows.push({
      annualReturn: ret,
      result: calculateScenario({ ...values, annualReturnPct: ret })
    });
  }
  return rows;
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

  const scenarioResult = useMemo(() => calculateScenario(controls), [controls]);
  const internalRows = useMemo(() => buildInternalSensitivityRows(controls), [controls]);

  const navChartData: ChartData<"line"> = {
    labels: xLabels,
    datasets: [
      {
        label: "Portfolio NAV",
        data: scenarioResult.navSeries,
        borderColor: chartSeriesColor(theme, 0),
        backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.1),
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
      <SectionHeader
        sectionLabel="INTERNAL WORKING MODEL"
        title="Scenario decision lens"
        subtitle="GP-only view. Adjust return assumption to evaluate fund economics."
      />

      <div className="scenario-dl-layout">
        <div className="scenario-dl-sliders">
          {slideData.controls.map((control) => {
            const bounds = controlBounds(control);
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
        </div>

        <div className="scenario-dl-body">
          <div className="scenario-dl-chart-wrap">
            <LineChart data={navChartData} options={internalChartOptions} />
          </div>

          <div className="scenario-dl-kpis">
            <DlKpiGroupHeader title="Fund Structure" />
            <DlKpiRow label="LP Capital" value={formatMoneyMillions(LP_CAPITAL_M)} />
            <DlKpiRow label="Annual Return" value={`${controls.annualReturnPct > 0 ? "+" : ""}${controls.annualReturnPct.toFixed(1)}%`} />
            <DlKpiRow label="Management Fee" value={`${(MANAGEMENT_FEE_RATE * 100).toFixed(1)}%`} />

            <DlKpiGroupHeader title="10-Year Returns" />
            <DlKpiRow label="Gross IRR" value={formatPercent(scenarioResult.grossIrr)} />
            <DlKpiRow label="Gross MOIC" value={formatMoic(scenarioResult.grossMoic)} />
            <DlKpiRow label="LP Net IRR" value={formatPercent(scenarioResult.lpNetIrr)} />
            <DlKpiRow label="LP Net MOIC" value={formatMoic(scenarioResult.lpNetMoic)} />
            <DlKpiRow
              label="LP Net Profit"
              value={formatMoneyMillions(scenarioResult.lpNetProfit)}
              className={signedMoneyClass(scenarioResult.lpNetProfit)}
            />
            <DlKpiRow label="GP Carry" value={formatMoneyMillions(scenarioResult.gpCarry)} />
          </div>
        </div>

        <div className="scenario-allocation-table-wrap">
          <table className="scenario-allocation-table">
            <thead>
              <tr>
                <th>Annual Return</th>
                <th>Yr-10 NAV</th>
                <th>Gross IRR</th>
                <th>LP Net IRR</th>
                <th>LP MOIC</th>
                <th>LP Net Profit</th>
                <th>GP Carry</th>
              </tr>
            </thead>
            <tbody>
              {internalRows.map((row) => {
                const isSelected = row.annualReturn === controls.annualReturnPct;
                return (
                  <tr key={row.annualReturn} className={isSelected ? "is-selected" : ""}>
                    <td>{row.annualReturn > 0 ? "+" : ""}{row.annualReturn}%</td>
                    <td>{formatMoneyMillions(row.result.navSeries[10])}</td>
                    <td>{formatPercent(row.result.grossIrr)}</td>
                    <td>{formatPercent(row.result.lpNetIrr)}</td>
                    <td>{formatMoic(row.result.lpNetMoic)}</td>
                    <td className={signedMoneyClass(row.result.lpNetProfit)}>
                      {formatMoneyMillions(row.result.lpNetProfit)}
                    </td>
                    <td>{formatMoneyMillions(row.result.gpCarry)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SourceLine
        text="Internal model. 2% management fee on NAV. 20% performance fee above 5% hurdle with catch-up."
        tight
      />
    </>
  );
}
