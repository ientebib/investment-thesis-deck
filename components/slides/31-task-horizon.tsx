import type { ChartData, ChartOptions, Plugin, ScatterDataPoint } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide31TaskHorizonData } from "@/lib/data/slides";
import { calloutLabel, referenceLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide31TaskHorizonData;

function formatHorizon(hours: number) {
  if (hours >= 1) {
    return `${hours.toFixed(1)} hours`;
  }
  if (hours >= 1 / 60) {
    return `${(hours * 60).toFixed(1)} minutes`;
  }
  return `${Math.round(hours * 3600)} seconds`;
}

const sotaPoints = slideData.points.filter((point) => point.group === "sota");
const nonSotaPoints = slideData.points.filter((point) => point.group === "non_sota");

const ciErrorBarsPlugin: Plugin<"line"> = {
  id: "taskHorizonCiBars",
  afterDatasetsDraw: (chart) => {
    const yScale = chart.scales.y;
    if (!yScale) {
      return;
    }
    const meta = chart.getDatasetMeta(0);
    const ctx = chart.ctx;
    const area = chart.chartArea;

    /* CI error bars */
    ctx.save();
    ctx.strokeStyle = chartSeriesColor(theme, 0);
    ctx.globalAlpha = 0.12;
    ctx.lineWidth = 1.5;
    sotaPoints.forEach((point, index) => {
      if (point.ciLowHours === null || point.ciHighHours === null) {
        return;
      }
      const element = meta.data[index];
      if (!element) {
        return;
      }
      const yLow = Math.min(yScale.getPixelForValue(point.ciLowHours), area.bottom);
      const yHigh = Math.max(yScale.getPixelForValue(point.ciHighHours), area.top);
      ctx.beginPath();
      ctx.moveTo(element.x, yLow);
      ctx.lineTo(element.x, yHigh);
      ctx.stroke();
    });
    ctx.restore();

    /* Model name labels for SOTA points */
    ctx.save();
    ctx.font = `400 7px ${fonts.data}`;
    ctx.fillStyle = chartSeriesColor(theme, 0);
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    const drawn: Array<{ x: number; y: number; w: number; h: number }> = [];
    sotaPoints.forEach((point, index) => {
      const element = meta.data[index];
      if (!element || !point.label) return;
      const text = point.label;
      const tw = ctx.measureText(text).width;
      const th = 9;
      const lx = element.x - tw / 2;
      const ly = element.y - 8;
      const collides = drawn.some(
        (r) => lx < r.x + r.w && lx + tw > r.x && ly < r.y + r.h && ly + th > r.y
      );
      if (!collides) {
        ctx.fillText(text, element.x, element.y - 5);
        drawn.push({ x: lx, y: ly, w: tw, h: th });
      }
    });
    ctx.restore();
  }
};

const chartData: ChartData<"line"> = {
  datasets: [
    {
      label: "SOTA frontier",
      data: sotaPoints.map((point): ScatterDataPoint => ({ x: point.xMonth, y: point.horizonHours })),
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: chartSeriesColor(theme, 0),
      showLine: true,
      borderDash: [6, 4],
      borderWidth: 1.4,
      pointRadius: 4,
      pointHoverRadius: 5
    },
    {
      label: "Non-SOTA",
      data: nonSotaPoints.map((point): ScatterDataPoint => ({ x: point.xMonth, y: point.horizonHours })),
      borderColor: theme.textMuted,
      backgroundColor: theme.textMuted,
      pointRadius: 3,
      pointHoverRadius: 4
    }
  ]
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "nearest", intersect: false },
  layout: { padding: { top: 20, right: 36, bottom: 8, left: 8 } },
  scales: {
    x: {
      type: "linear",
      min: -2,
      max: 88,
      ticks: {
        stepSize: 12,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => {
          const map: Record<number, string> = {
            0: "2019",
            12: "2020",
            24: "2021",
            36: "2022",
            48: "2023",
            60: "2024",
            72: "2025",
            84: "2026"
          };
          return map[Number(value)] ?? "";
        }
      },
      grid: { color: theme.border }
    },
    y: {
      min: 0,
      max: 7,
      ticks: {
        stepSize: 1,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => (Number(value) === 0 ? "0" : `${value}h`)
      },
      grid: { color: theme.border },
      title: {
        display: true,
        text: "Median task horizon (p50), hours",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        oneHourLine: referenceLine(theme, { axis: "y", value: 1, label: "1 HOUR", dash: [4, 4], labelPosition: "start" }),
        callout: calloutLabel(theme, {
          xValue: 25,
          yValue: 5.5,
          content: ["Task horizon doubled", "every ~4.3 months", "since GPT-4 (Mar 2023)"],
          color: chartSeriesColor(theme, 0),
          fontSize: 8,
          fontWeight: 400
        })
      }
    },
    legend: { display: false },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        title: (items) => {
          const item = items[0];
          if (!item) {
            return "";
          }
          if (item.datasetIndex === 0) {
            return sotaPoints[item.dataIndex]?.label ?? "SOTA frontier";
          }
          return nonSotaPoints[item.dataIndex]?.label ?? "Non-SOTA";
        },
        label: (item) => {
          const point = item.raw as ScatterDataPoint;
          return formatHorizon(Number(point.y));
        }
      }
    }
  }
};

export function Slide31TaskHorizon() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <LineChart data={chartData} options={chartOptions} plugins={[ciErrorBarsPlugin]} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
