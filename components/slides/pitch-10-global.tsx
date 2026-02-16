import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide13GlobalRepricingData,
  slide14CoreInflationData
} from "@/lib/data/slides";
import { eventLine, referenceLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";
import {
  pitchAxisFont,
  pitchTooltip,
  pitchLegendLine
} from "@/lib/pitchChartDefaults";

/* ─── Panel 1: Japan 10Y Yield ─── */

const globalData = slide13GlobalRepricingData;

const japanChartData: ChartData<"line"> = {
  labels: globalData.dates,
  datasets: [
    {
      label: "Japan 10Y",
      data: globalData.japan10y,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.12),
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.2
    }
  ]
};

const yccIdx = globalData.dates.indexOf(globalData.yccAdjustmentDate);

const japanOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 6, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 5,
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    },
    y: {
      ticks: {
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
        yccLine: eventLine(theme, {
          xValue: yccIdx >= 0 ? yccIdx : globalData.yccAdjustmentDate,
          label: "YCC Adjustment"
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `Japan 10Y: ${Number(item.raw).toFixed(2)}%`
      }
    }
  }
};

/* ─── Panel 2: UK 10Y Gilt ─── */

const brexitIdx = globalData.dates.indexOf(globalData.brexitDate);
const trussIdx = globalData.dates.indexOf(globalData.trussDate);

const ukChartData: ChartData<"line"> = {
  labels: globalData.dates,
  datasets: [
    {
      label: "UK 10Y",
      data: globalData.uk10y,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.12),
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.2
    }
  ]
};

const ukOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 6, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 5,
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    },
    y: {
      ticks: {
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
        brexitLine: eventLine(theme, {
          xValue: brexitIdx >= 0 ? brexitIdx : globalData.brexitDate,
          label: "Brexit"
        }),
        trussLine: eventLine(theme, {
          xValue: trussIdx >= 0 ? trussIdx : globalData.trussDate,
          label: "Truss Crisis"
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `UK 10Y: ${Number(item.raw).toFixed(2)}%`
      }
    }
  }
};

/* ─── Panel 3: Core Inflation (US, Euro Area, UK + 2% target) ─── */

const inflData = slide14CoreInflationData;

const inflChartData: ChartData<"line"> = {
  labels: inflData.dates,
  datasets: [
    {
      label: "US",
      data: inflData.us,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.2
    },
    {
      label: "Euro Area",
      data: inflData.euroArea,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.2
    },
    {
      label: "UK",
      data: inflData.uk,
      borderColor: theme.ext1,
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.2
    },
    {
      label: "2% Target",
      data: inflData.dates.map(() => inflData.targetInflation),
      borderColor: theme.textMuted,
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderDash: [5, 3],
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: false,
      tension: 0
    }
  ]
};

const inflOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 6, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 5,
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    },
    y: {
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `${v}%`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    legend: pitchLegendLine,
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}%`
      }
    }
  }
};

export function PitchSlide10Global() {
  return (
    <>
      <SectionHeader
        sectionLabel="GLOBAL REPRICING"
        title="The repricing is global — Japan, the UK, and every major economy are surfacing the same constraints"
        subtitle="Core inflation above target in all major developed economies"
      />

      <div className="pitch-triple-panel">
        <div className="pitch-panel">
          <div className="pitch-panel-label">Japan 10Y yield</div>
          <div className="pitch-panel-chart">
            <LineChart data={japanChartData} options={japanOptions} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">UK 10Y gilt</div>
          <div className="pitch-panel-chart">
            <LineChart data={ukChartData} options={ukOptions} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">Core inflation (YoY %)</div>
          <div className="pitch-panel-chart">
            <LineChart data={inflChartData} options={inflOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: FRED, Bank of Japan, Bank of England, Goldman Sachs" tight />
    </>
  );
}
