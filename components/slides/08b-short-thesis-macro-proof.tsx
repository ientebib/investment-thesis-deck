import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide09FederalDebtData,
  slide11InterestRevenueData,
  slide12TermPremiumData,
  slide14CoreInflationData
} from "@/lib/data/slides";
import { calloutLabel } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const tooltipBase = {
  enabled: true,
  backgroundColor: theme.surface3,
  titleColor: theme.textPrimary,
  bodyColor: theme.textSecondary,
  titleFont: { family: fonts.data, size: 9, weight: 400 as const },
  bodyFont: { family: fonts.data, size: 9, weight: 400 as const }
};

/* ─── Chart 1: Federal Debt / GDP ─── */

const debtData = slide09FederalDebtData;
const debtProjIdx = debtData.years.findIndex((y) => y === debtData.projectionStartYear);
const debtActual = debtData.values.map((v, i) => (i < debtProjIdx ? v : null));
const debtProjected = debtData.values.map((v, i) => (i >= debtProjIdx - 1 ? v : null));
const debtLastYear = String(debtData.years[debtData.years.length - 1]);
const debtLastValue = debtData.values[debtData.values.length - 1] ?? 0;

const debtChartData: ChartData<"line"> = {
  labels: debtData.years.map(String),
  datasets: [
    {
      label: "Actual",
      data: debtActual,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.16),
      borderWidth: 1.8,
      pointRadius: 1.4,
      pointHoverRadius: 2.8,
      fill: true,
      tension: 0.2,
      spanGaps: false
    },
    {
      label: "Projected",
      data: debtProjected,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.14),
      borderWidth: 1.8,
      borderDash: [4, 2],
      pointRadius: 1.4,
      pointHoverRadius: 2.8,
      fill: true,
      tension: 0.2,
      spanGaps: false
    }
  ]
};

const debtOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: false,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (_, idx) => {
          const year = debtData.years[idx];
          return year % 20 === 0 ? String(year) : "";
        }
      }
    },
    y: {
      min: 0,
      max: 180,
      ticks: {
        stepSize: 60,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `${v}%`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        debtCallout: calloutLabel(theme, {
          xValue: debtLastYear,
          yValue: Math.min(178, debtLastValue + 8),
          content: `${debtLastValue.toFixed(0)}% by ${debtLastYear}`,
          color: chartSeriesColor(theme, 1),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -54
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}%`
      }
    }
  }
};

/* ─── Chart 2: Interest / Revenue ─── */

const intData = slide11InterestRevenueData;
const intProjIdx = intData.years.findIndex((y) => y === intData.projectionStartYear);
const intActual = intData.values.map((v, i) => (i <= intProjIdx - 1 ? v : null));
const intProjected = intData.values.map((v, i) => (i >= intProjIdx - 1 ? v : null));
const intLastYear = String(intData.years[intData.years.length - 1]);
const intLastValue = intData.values[intData.values.length - 1] ?? 0;

const intChartData: ChartData<"line"> = {
  labels: intData.years.map(String),
  datasets: [
    {
      label: "Actual",
      data: intActual,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 1.4,
      pointHoverRadius: 2.8,
      fill: false,
      tension: 0.25,
      spanGaps: false
    },
    {
      label: "Projected",
      data: intProjected,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      borderDash: [4, 2],
      pointRadius: 1.4,
      pointHoverRadius: 2.8,
      fill: false,
      tension: 0.25,
      spanGaps: false
    }
  ]
};

const intOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: false,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (_, idx) => {
          const yr = intData.years[idx];
          return yr % 10 === 0 ? String(yr) : "";
        }
      }
    },
    y: {
      min: 5,
      max: 24,
      ticks: {
        stepSize: 5,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `${v}%`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        interestCallout: calloutLabel(theme, {
          xValue: intLastYear,
          yValue: Math.min(23.5, intLastValue + 1.2),
          content: `${intLastValue.toFixed(1)}% by ${intLastYear}`,
          color: chartSeriesColor(theme, 0),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -56
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}%`
      }
    }
  }
};

/* ─── Chart 3: Term Premium ─── */

const termData = slide12TermPremiumData;
const termLastDate = termData.dates[termData.dates.length - 1];
const termLastValue = termData.values[termData.values.length - 1] ?? 0;

const termChartData: ChartData<"line"> = {
  labels: termData.dates,
  datasets: [
    {
      label: "10Y term premium",
      data: termData.values,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.16),
      borderWidth: 1.8,
      pointRadius: 1.2,
      pointHoverRadius: 2.6,
      tension: 0.24,
      fill: {
        target: { value: 0 },
        above: hexToRgba(chartSeriesColor(theme, 1), 0.16),
        below: hexToRgba(theme.negative, 0.12)
      }
    }
  ]
};

const termOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 8,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (_, idx) => {
          const d = termData.dates[idx];
          return d?.endsWith("-01-01") ? d.slice(0, 4) : "";
        }
      }
    },
    y: {
      min: -1,
      max: 2,
      ticks: {
        stepSize: 0.5,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `${Number(v).toFixed(1)}%`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        termCallout: calloutLabel(theme, {
          xValue: termLastDate,
          yValue: Math.min(1.9, termLastValue + 0.15),
          content: `Latest: ${termLastValue.toFixed(2)}%`,
          color: chartSeriesColor(theme, 1),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -36
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => `10Y term premium: ${Number(item.raw).toFixed(3)}%`
      }
    }
  }
};

/* ─── Chart 4: Core Inflation ─── */

const inflationData = slide14CoreInflationData;
const inflLastDate = inflationData.dates[inflationData.dates.length - 1];
const usLast = inflationData.us[inflationData.us.length - 1] ?? 0;

const inflationChartData: ChartData<"line"> = {
  labels: inflationData.dates,
  datasets: [
    {
      label: "US",
      data: inflationData.us,
      borderColor: chartSeriesColor(theme, 0),
      borderWidth: 1.6,
      pointRadius: 1.2,
      pointHoverRadius: 2.6,
      tension: 0.24
    },
    {
      label: "Euro Area",
      data: inflationData.euroArea,
      borderColor: chartSeriesColor(theme, 1),
      borderWidth: 1.6,
      pointRadius: 1.2,
      pointHoverRadius: 2.6,
      tension: 0.24
    },
    {
      label: "UK",
      data: inflationData.uk,
      borderColor: theme.caution,
      borderWidth: 1.6,
      pointRadius: 1.2,
      pointHoverRadius: 2.6,
      tension: 0.24
    },
    {
      label: "2% target",
      data: inflationData.dates.map(() => inflationData.targetInflation),
      borderColor: hexToRgba(theme.textMuted, 0.7),
      borderDash: [4, 3],
      borderWidth: 1,
      pointRadius: 0,
      tension: 0
    }
  ]
};

const inflationOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 7,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (_, idx) => {
          const d = inflationData.dates[idx];
          return d?.endsWith("-01") ? d.slice(0, 4) : "";
        }
      }
    },
    y: {
      min: 0,
      max: 8,
      ticks: {
        stepSize: 2,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `${v}%`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        inflCallout: calloutLabel(theme, {
          xValue: inflLastDate,
          yValue: Math.min(7.8, usLast + 0.4),
          content: `US latest: ${usLast.toFixed(1)}%`,
          color: chartSeriesColor(theme, 0),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -48
        })
      }
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "line",
        color: theme.textPrimary,
        font: { family: fonts.data, size: 8, weight: 400 },
        boxWidth: 12,
        padding: 6
      }
    },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}%`
      }
    }
  }
};

export function Slide08bShortThesisMacroProof() {
  return (
    <>
      <SectionHeader
        sectionLabel="MACRO THESIS"
        title="Debt servicing has become a structural driver of fiscal expansion"
        subtitle="Debt trajectory, interest absorption, term premium, and sticky inflation indicate a persistent macro constraint regime"
      />

      <div className="thesis-proof-grid">
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Federal debt / GDP</div>
          <div className="thesis-proof-chart">
            <LineChart data={debtChartData} options={debtOptions} />
          </div>
        </div>

        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Interest / Revenue</div>
          <div className="thesis-proof-chart">
            <LineChart data={intChartData} options={intOptions} />
          </div>
        </div>

        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">US 10Y term premium</div>
          <div className="thesis-proof-chart">
            <LineChart data={termChartData} options={termOptions} />
          </div>
        </div>

        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Core inflation regime (US / Euro Area / UK)</div>
          <div className="thesis-proof-chart">
            <LineChart data={inflationChartData} options={inflationOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: CBO; U.S. Treasury; Federal Reserve; Goldman Sachs (compiled Feb 2026)." tight />
    </>
  );
}
