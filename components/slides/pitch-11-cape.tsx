import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide53RegimeShiftData,
  slide21SpGoldRatioData
} from "@/lib/data/slides";
import { calloutLabel } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import {
  pitchAxisFont,
  pitchTooltip,
  pitchAnnotationFont
} from "@/lib/pitchChartDefaults";

/* ─── Left panel: CAPE bucket horizontal bar ─── */

const capeData = slide53RegimeShiftData;

const medianLabelPlugin: Plugin<"bar"> = {
  id: "pitch11MedianLabels",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.font = `500 9px ${fonts.data}`;
    ctx.fillStyle = theme.textSecondary;
    ctx.textBaseline = "middle";

    capeData.buckets.forEach((bucket, index) => {
      const bar = meta.data[index];
      if (!bar) return;
      const text = `${bucket.medianPct > 0 ? "+" : ""}${bucket.medianPct.toFixed(1)}%`;
      const x = bucket.medianPct >= 0 ? bar.x + 6 : bar.x - 38;
      ctx.fillText(text, x, bar.y);
    });

    ctx.restore();
  }
};

const capeChartData: ChartData<"bar"> = {
  labels: capeData.buckets.map((b) => b.bucket),
  datasets: [
    {
      label: "Median next 10Y annualized real return",
      data: capeData.buckets.map((b) => b.medianPct),
      backgroundColor: capeData.buckets.map((b, i) => {
        if (b.medianPct < 0) return theme.negative;
        return i < 4 ? chartSeriesColor(theme, 0) : chartSeriesColor(theme, 1);
      })
    }
  ]
};

const capeOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 14, bottom: 4, left: 4 } },
  scales: {
    x: {
      min: -6,
      max: 12,
      ticks: {
        stepSize: 2,
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `${v}%`
      },
      title: {
        display: true,
        text: "Next 10-year annualized real total return",
        color: theme.textMuted,
        font: { family: fonts.data, size: 10, weight: 400 }
      },
      grid: {
        color: (ctx) => (ctx.tick.value === 0 ? theme.textMuted : theme.border)
      }
    },
    y: {
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont
      },
      grid: { display: false }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        weAreHere: {
          ...calloutLabel(theme, {
            xValue: 2.6,
            yValue: "40+",
            content: ["WE ARE HERE", `Current CAPE: ${capeData.currentCape.toFixed(2)}`],
            color: theme.textPrimary,
            fontSize: pitchAnnotationFont.size
          }),
          backgroundColor: theme.surface3,
          borderColor: theme.border,
          borderWidth: 1,
          padding: 4,
          yAdjust: -16
        },
        arrowLine: {
          type: "line",
          xMin: 1.3,
          xMax: -2.7,
          yMin: "40+",
          yMax: "40+",
          borderColor: theme.textMuted,
          borderDash: [5, 3],
          borderWidth: 1
        }
      }
    },
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => {
          const bucket = capeData.buckets[item.dataIndex];
          if (!bucket) return "";
          return `Median: ${bucket.medianPct.toFixed(2)}%`;
        },
        afterLabel: (item) => {
          const bucket = capeData.buckets[item.dataIndex];
          if (!bucket) return [];
          return [
            `IQR: ${bucket.p25Pct.toFixed(2)}% to ${bucket.p75Pct.toFixed(2)}%`,
            `Observations: ${bucket.observations}`
          ];
        }
      }
    }
  }
};

/* ─── Right panel: S&P 500 / Gold ratio ─── */

const ratioData = slide21SpGoldRatioData;

const ratioChartData: ChartData<"line"> = {
  labels: ratioData.dates,
  datasets: [
    {
      label: "S&P 500 / Gold",
      data: ratioData.ratio,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.2
    }
  ]
};

const ratioOptions: ChartOptions<"line"> = {
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
        maxTicksLimit: 6,
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    },
    y: {
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `S&P/Gold: ${Number(item.raw).toFixed(2)}`
      }
    }
  }
};

export function PitchSlide11Cape() {
  return (
    <>
      <SectionHeader
        sectionLabel="VALUATION RISK"
        title="At current valuations, passive equity base rates are negative for the next decade"
        subtitle="Shiller CAPE at 40.38 — 98.8th percentile"
      />

      <div className="pitch-dual-panel">
        <div className="pitch-panel">
          <div className="pitch-panel-label">Historical base rates by starting CAPE (S&P 500)</div>
          <div className="pitch-panel-chart">
            <BarChart data={capeChartData} options={capeOptions} plugins={[medianLabelPlugin]} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">S&P 500 / Gold ratio</div>
          <div className="pitch-panel-chart">
            <LineChart data={ratioChartData} options={ratioOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: Robert Shiller (Yale); S&P Global; LBMA; multpl.com (Feb 2026)" tight />
    </>
  );
}
