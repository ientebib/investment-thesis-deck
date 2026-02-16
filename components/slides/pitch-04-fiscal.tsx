import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide09FederalDebtData,
  slide11InterestRevenueData
} from "@/lib/data/slides";
import { calloutLabel } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";
import {
  pitchAxisFont,
  pitchTooltip,
  pitchLegend,
  pitchAnnotationFont
} from "@/lib/pitchChartDefaults";

/* ─── Left panel: Federal Debt / GDP ─── */

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
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.2,
      spanGaps: false
    },
    {
      label: "Projected",
      data: debtProjected,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.14),
      borderWidth: 2,
      borderDash: [5, 3],
      pointRadius: 0,
      pointHoverRadius: 3,
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
        font: pitchAxisFont,
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
        font: pitchAxisFont,
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
          fontSize: pitchAnnotationFont.size,
          fontWeight: 500,
          xAdjust: -62
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}%`
      }
    }
  }
};

/* ─── Right panel: Interest / Revenue ─── */

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
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.25,
      spanGaps: false
    },
    {
      label: "Projected",
      data: intProjected,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 2,
      borderDash: [5, 3],
      pointRadius: 0,
      pointHoverRadius: 3,
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
        font: pitchAxisFont,
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
        font: pitchAxisFont,
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
          fontSize: pitchAnnotationFont.size,
          fontWeight: 500,
          xAdjust: -64
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}%`
      }
    }
  }
};

export function PitchSlide04Fiscal() {
  return (
    <>
      <SectionHeader
        sectionLabel="FISCAL DOMINANCE"
        title="Federal debt compounds structurally with no path to reversal"
        subtitle="$1 of every $5 collected now goes to interest"
      />

      <div className="pitch-dual-panel">
        <div className="pitch-panel">
          <div className="pitch-panel-label">Federal debt / GDP</div>
          <div className="pitch-panel-chart">
            <LineChart data={debtChartData} options={debtOptions} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">Interest / Revenue</div>
          <div className="pitch-panel-chart">
            <LineChart data={intChartData} options={intOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: CBO; U.S. Treasury; Apollo Chief Economist (compiled Feb 2026)." tight />
    </>
  );
}
