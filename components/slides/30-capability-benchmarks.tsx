import type { ChartData, ChartOptions, Plugin, ScatterDataPoint } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide30CapabilityBenchmarksData, slide31TaskHorizonData } from "@/lib/data/slides";
import { calloutLabel, referenceLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const benchmarkSlide = slide30CapabilityBenchmarksData;
const taskHorizonSlide = slide31TaskHorizonData;

const benchmarkChartData: ChartData<"line"> = {
  labels: benchmarkSlide.dates,
  datasets: [
    {
      label: "WeirdML",
      data: benchmarkSlide.weirdMl,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "SimpleBench",
      data: benchmarkSlide.simpleBench,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "FrontierMath",
      data: benchmarkSlide.frontierMath,
      borderColor: theme.caution,
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "SWE-Bench Verified",
      data: benchmarkSlide.sweBenchVerified,
      borderColor: theme.negative,
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.25
    }
  ]
};

const benchmarkChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        maxRotation: 40,
        autoSkip: true,
        maxTicksLimit: 12
      }
    },
    y: {
      min: 0,
      max: 0.9,
      ticks: {
        stepSize: 0.1,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${Math.round(Number(value) * 100)}%`
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
        boxWidth: 18
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (item) => `${item.dataset.label}: ${(Number(item.raw) * 100).toFixed(1)}%`
      }
    }
  }
};

function formatHorizon(hours: number) {
  if (hours >= 1) {
    return `${hours.toFixed(1)} hours`;
  }
  if (hours >= 1 / 60) {
    return `${(hours * 60).toFixed(1)} minutes`;
  }
  return `${Math.round(hours * 3600)} seconds`;
}

const sotaPoints = taskHorizonSlide.points.filter((point) => point.group === "sota");
const nonSotaPoints = taskHorizonSlide.points.filter((point) => point.group === "non_sota");

const ciErrorBarsPlugin: Plugin<"line"> = {
  id: "taskHorizonCiBarsCombo",
  afterDatasetsDraw: (chart) => {
    const yScale = chart.scales.y;
    if (!yScale) {
      return;
    }
    const meta = chart.getDatasetMeta(0);
    const ctx = chart.ctx;
    const area = chart.chartArea;

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
  }
};

const taskHorizonChartData: ChartData<"line"> = {
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

const taskHorizonChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "nearest", intersect: false },
  layout: { padding: { top: 20, right: 24, bottom: 8, left: 8 } },
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

export function Slide30CapabilityBenchmarks() {
  const combinedSourceLine = `Source: ${benchmarkSlide.sourceLine.replace(/^Source:\s*/, "")}; ${taskHorizonSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader
        sectionLabel={benchmarkSlide.sectionLabel}
        title={benchmarkSlide.title}
        subtitle={benchmarkSlide.subtitle}
      />
      <div className="slide-combo-layout">
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Capability benchmarks (including SWE-bench)</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={benchmarkChartData} options={benchmarkChartOptions} />
          </div>
        </section>
        <section className="slide-combo-panel">
          <div className="slide-combo-label">METR task horizon</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={taskHorizonChartData} options={taskHorizonChartOptions} plugins={[ciErrorBarsPlugin]} />
          </div>
        </section>
      </div>
      <SourceLine text={combinedSourceLine} />
    </>
  );
}
