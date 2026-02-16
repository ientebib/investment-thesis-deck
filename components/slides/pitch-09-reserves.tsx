import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide19GoldTreasuriesData,
  slide20CentralBankGoldData
} from "@/lib/data/slides";
import { calloutLabel } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";
import {
  pitchAxisFont,
  pitchTooltip,
  pitchLegendLine,
  pitchAnnotationFont
} from "@/lib/pitchChartDefaults";

/* ─── Left panel: Gold vs Treasury holdings ─── */

const goldTData = slide19GoldTreasuriesData;

const goldTChartData: ChartData<"line"> = {
  labels: goldTData.dates,
  datasets: [
    {
      label: "Gold holdings ($T)",
      data: goldTData.goldHoldingsTrillions,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.1),
      fill: false,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.28
    },
    {
      label: "Treasury holdings ($T)",
      data: goldTData.treasuryHoldingsTrillions,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.1),
      fill: false,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.28
    }
  ]
};

const goldTOptions: ChartOptions<"line"> = {
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
        font: pitchAxisFont,
        callback: (_, idx) => {
          const d = goldTData.dates[idx];
          if (!d) return "";
          const year = d.slice(0, 4);
          return d.includes("-01") || d.includes("Q1") ? year : "";
        }
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `$${v}T`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    legend: {
      ...pitchLegendLine,
    },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${item.dataset.label}: $${Number(item.raw).toFixed(2)}T`
      }
    }
  }
};

/* ─── Right panel: Central bank gold purchases ─── */

const cbData = slide20CentralBankGoldData;
const highlightSet = new Set(cbData.highlightYears);

const cbChartData: ChartData<"bar"> = {
  labels: cbData.years.map(String),
  datasets: [
    {
      label: "Net purchases (tonnes)",
      data: cbData.netPurchasesTonnes,
      backgroundColor: cbData.years.map((y) =>
        highlightSet.has(y)
          ? chartSeriesColor(theme, 0)
          : hexToRgba(theme.textMuted, 0.45)
      ),
      borderColor: cbData.years.map((y) =>
        highlightSet.has(y)
          ? chartSeriesColor(theme, 0)
          : hexToRgba(theme.textMuted, 0.5)
      ),
      borderWidth: 1
    }
  ]
};

const cbMax = Math.max(...cbData.netPurchasesTonnes);

const cbOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 16, bottom: 2, left: 12 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 10,
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `${v}t`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        thousandLine: {
          type: "line" as const,
          yMin: 1000,
          yMax: 1000,
          borderColor: hexToRgba(theme.textMuted, 0.5),
          borderWidth: 1,
          borderDash: [5, 4],
          label: {
            display: true,
            content: "1,000t threshold",
            position: "start" as const,
            color: theme.textMuted,
            backgroundColor: theme.surface1,
            font: { family: fonts.data, size: pitchAnnotationFont.size, weight: 400 as const },
            padding: 4
          }
        }
      }
    },
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `Net purchases: ${Number(item.raw).toFixed(0)} tonnes`
      }
    }
  }
};

export function PitchSlide09Reserves() {
  return (
    <>
      <SectionHeader
        sectionLabel="RESERVE ROTATION"
        title="Central banks are actively rotating reserves from dollar debt into gold"
        subtitle="Net purchases exceeded 1,000 tonnes in three consecutive years"
      />

      <div className="pitch-dual-panel">
        <div className="pitch-panel">
          <div className="pitch-panel-label">Gold vs Treasury holdings in global reserves</div>
          <div className="pitch-panel-chart">
            <LineChart data={goldTChartData} options={goldTOptions} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">Central bank net gold purchases (tonnes/year)</div>
          <div className="pitch-panel-chart">
            <BarChart data={cbChartData} options={cbOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: IMF; World Gold Council; U.S. Department of Treasury (compiled Feb 2026)." tight />
    </>
  );
}
