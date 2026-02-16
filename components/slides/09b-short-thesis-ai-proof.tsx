import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide30CapabilityBenchmarksData,
  slide33RevenueTrajectoryData,
  slide31TaskHorizonData,
  slide32AdoptionData
} from "@/lib/data/slides";
import { calloutLabel, referenceLine } from "@/lib/annotationStyles";
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

function latestNonNull(values: Array<number | null | undefined>) {
  for (let i = values.length - 1; i >= 0; i -= 1) {
    const v = values[i];
    if (v !== null && v !== undefined) return { index: i, value: Number(v) };
  }
  return { index: 0, value: 0 };
}

/* ─── Chart 1: Capability Benchmarks ─── */

const benchData = slide30CapabilityBenchmarksData;
const sweLatest = latestNonNull(benchData.sweBenchVerified);
const sweLatestDate = benchData.dates[sweLatest.index] ?? benchData.dates[benchData.dates.length - 1];

const benchChartData: ChartData<"line"> = {
  labels: benchData.dates,
  datasets: [
    {
      label: "WeirdML",
      data: benchData.weirdMl,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 1.6,
      pointRadius: 1.5,
      pointHoverRadius: 2.8,
      tension: 0.25
    },
    {
      label: "SimpleBench",
      data: benchData.simpleBench,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 1.6,
      pointRadius: 1.5,
      pointHoverRadius: 2.8,
      tension: 0.25
    },
    {
      label: "FrontierMath",
      data: benchData.frontierMath,
      borderColor: theme.caution,
      backgroundColor: "transparent",
      borderWidth: 1.6,
      pointRadius: 1.5,
      pointHoverRadius: 2.8,
      tension: 0.25
    },
    {
      label: "SWE-Bench",
      data: benchData.sweBenchVerified,
      borderColor: theme.negative,
      backgroundColor: "transparent",
      borderWidth: 1.6,
      pointRadius: 1.5,
      pointHoverRadius: 2.8,
      tension: 0.25
    }
  ]
};

const benchOptions: ChartOptions<"line"> = {
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
        font: { family: fonts.data, size: 7, weight: 300 }
      }
    },
    y: {
      min: 0,
      max: 0.9,
      ticks: {
        stepSize: 0.3,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `${Math.round(Number(v) * 100)}%`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        benchCallout: calloutLabel(theme, {
          xValue: sweLatestDate,
          yValue: Math.min(0.88, sweLatest.value + 0.07),
          content: `SWE-Bench ~${Math.round(sweLatest.value * 100)}%`,
          color: theme.negative,
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -54
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
        font: { family: fonts.data, size: 7, weight: 400 },
        padding: 3,
        boxWidth: 12
      }
    },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${(Number(item.raw) * 100).toFixed(1)}%`
      }
    }
  }
};

/* ─── Chart 2: Revenue Trajectories ─── */

const revData = slide33RevenueTrajectoryData;
const openAiLast = revData.openAi[revData.openAi.length - 1];

const revChartData: ChartData<"line"> = {
  datasets: [
    {
      label: "OpenAI",
      data: revData.openAi,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      showLine: true,
      fill: false,
      borderWidth: 1.9,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.28
    },
    {
      label: "Anthropic",
      data: revData.anthropic,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      showLine: true,
      fill: false,
      borderWidth: 1.9,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.28
    },
    {
      label: "xAI",
      data: revData.xAi,
      borderColor: theme.ext1,
      backgroundColor: "transparent",
      showLine: true,
      fill: false,
      borderWidth: 1.9,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.28
    }
  ]
};

const revOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "nearest", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      type: "linear",
      min: 10,
      max: 48,
      ticks: {
        stepSize: 12,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => {
          const labels: Record<number, string> = { 12: "2023", 24: "2024", 36: "2025", 48: "2026" };
          return labels[Number(v)] ?? "";
        }
      },
      grid: { display: false }
    },
    y: {
      type: "logarithmic",
      min: 0.01,
      max: 30,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => {
          const n = Number(v);
          if (n === 0.01) return "$10M";
          if (n === 0.1) return "$100M";
          if (n === 1) return "$1B";
          if (n === 10) return "$10B";
          return "";
        }
      },
      grid: {
        color: (ctx: { tick: { value: number } }) => {
          const labeled = [0.01, 0.1, 1, 10];
          return labeled.includes(ctx.tick.value) ? theme.border : "transparent";
        }
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        revenueCallout: calloutLabel(theme, {
          xValue: 48,
          yValue: openAiLast?.y ?? 20,
          content: "OpenAI ~ $20B ARR",
          color: chartSeriesColor(theme, 0),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -74
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
        padding: 4,
        boxWidth: 12
      }
    },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        title: (items) => items[0]?.dataset?.label ?? "",
        label: (item) => `$${Number(item.raw && typeof item.raw === 'object' ? (item.raw as { y: number }).y : item.raw).toFixed(2)}B ARR`
      }
    }
  }
};

/* ─── Chart 3: Task Horizon ─── */

const taskData = slide31TaskHorizonData;
const taskFrontier = taskData.points
  .filter((p) => p.group === "sota")
  .map((p) => ({ x: p.xMonth, y: p.horizonHours, label: p.label }))
  .sort((a, b) => a.x - b.x);
const taskOther = taskData.points
  .filter((p) => p.group === "non_sota")
  .map((p) => ({ x: p.xMonth, y: p.horizonHours, label: p.label }))
  .sort((a, b) => a.x - b.x);

const taskChartData: ChartData<"line"> = {
  datasets: [
    {
      label: "Frontier",
      data: taskFrontier,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 1.6,
      pointRadius: 1.8,
      pointHoverRadius: 2.8,
      showLine: true,
      tension: 0.2
    },
    {
      label: "Other",
      data: taskOther,
      borderColor: hexToRgba(theme.textMuted, 0.75),
      backgroundColor: "transparent",
      borderWidth: 1.2,
      pointRadius: 1.6,
      pointHoverRadius: 2.4,
      showLine: true,
      tension: 0.2
    }
  ]
};

const taskOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "nearest", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      type: "linear",
      min: 0,
      max: 84,
      ticks: {
        stepSize: 12,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `M${v}`
      },
      grid: { display: false }
    },
    y: {
      type: "logarithmic",
      min: 0.001,
      max: 20,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => {
          const n = Number(v);
          if (n === 0.001) return "0.001h";
          if (n === 0.01) return "0.01h";
          if (n === 0.1) return "0.1h";
          if (n === 1) return "1h";
          if (n === 10) return "10h";
          return "";
        }
      },
      grid: {
        color: (ctx: { tick: { value: number } }) => {
          const labeled = [0.001, 0.01, 0.1, 1, 10];
          return labeled.includes(ctx.tick.value) ? theme.border : "transparent";
        }
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        oneHour: referenceLine(theme, { axis: "y", value: 1, label: "1h", dash: [4, 3], labelPosition: "start" }),
        taskCallout: calloutLabel(theme, {
          xValue: 48,
          yValue: 4.2,
          content: "~2x every 4.3 months",
          color: chartSeriesColor(theme, 0),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -56
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
        title: (items) => {
          const first = items[0];
          if (!first) return "";
          const raw = first.raw as { label?: string };
          return raw.label ?? first.dataset.label ?? "";
        },
        label: (item) => `${item.dataset.label}: ${Number((item.raw as { y: number }).y).toFixed(3)}h`
      }
    }
  }
};

/* ─── Chart 4: Consumer Adoption ─── */

const adoptionData = slide32AdoptionData;
const adoptionLastPeriod = adoptionData.usagePeriods[adoptionData.usagePeriods.length - 1];
const adoptionLastValue = adoptionData.usageMillions[adoptionData.usageMillions.length - 1] ?? 0;

const adoptionChartData: ChartData<"line"> = {
  labels: adoptionData.usagePeriods,
  datasets: [
    {
      label: "Weekly users (millions)",
      data: adoptionData.usageMillions,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.14),
      fill: true,
      borderWidth: 1.8,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.24
    }
  ]
};

const adoptionOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 7
      }
    },
    y: {
      beginAtZero: true,
      max: 1000,
      ticks: {
        stepSize: 250,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `${v}M`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        adoptionCallout: calloutLabel(theme, {
          xValue: adoptionLastPeriod,
          yValue: Math.min(980, adoptionLastValue + 60),
          content: `${Math.round(adoptionLastValue)}M weekly users`,
          color: chartSeriesColor(theme, 1),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -74
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => `${Number(item.raw).toFixed(0)}M`
      }
    }
  }
};

export function Slide09bShortThesisAiProof() {
  return (
    <>
      <SectionHeader
        sectionLabel="AI INFRASTRUCTURE"
        title="AI capability and adoption are compounding faster than prior technology cycles"
        subtitle="Benchmark gains, longer autonomous task horizons, user scale, and ARR growth point to persistent utilization expansion"
      />

      <div className="thesis-proof-grid">
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Capability benchmarks</div>
          <div className="thesis-proof-chart">
            <LineChart data={benchChartData} options={benchOptions} />
          </div>
        </div>

        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Revenue trajectories (ARR, log scale)</div>
          <div className="thesis-proof-chart">
            <LineChart data={revChartData} options={revOptions} />
          </div>
        </div>

        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Task horizon growth (frontier vs other models)</div>
          <div className="thesis-proof-chart">
            <LineChart data={taskChartData} options={taskOptions} />
          </div>
        </div>

        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Consumer AI adoption (weekly users)</div>
          <div className="thesis-proof-chart">
            <LineChart data={adoptionChartData} options={adoptionOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: METR; Epoch AI; OpenAI; Anthropic; Menlo Ventures; company disclosures (compiled Feb 2026)." tight />
    </>
  );
}
