import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide32AdoptionData,
  slide33RevenueTrajectoryData
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

/* ─── Left panel: Consumer adoption (weekly users) ─── */

const adoptionData = slide32AdoptionData;
const lastUsage = adoptionData.usageMillions[adoptionData.usageMillions.length - 1] ?? 0;

const adoptionChartData: ChartData<"line"> = {
  labels: adoptionData.usagePeriods,
  datasets: [
    {
      label: "ChatGPT weekly users (M)",
      data: adoptionData.usageMillions,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.14),
      fill: true,
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 4,
      tension: 0.3
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
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 6,
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `${v}M`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        usersCallout: calloutLabel(theme, {
          xValue: adoptionData.usagePeriods[adoptionData.usagePeriods.length - 1],
          yValue: lastUsage + 40,
          content: `${lastUsage}M weekly`,
          color: chartSeriesColor(theme, 0),
          fontSize: pitchAnnotationFont.size,
          fontWeight: 500,
          xAdjust: -58
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${Number(item.raw).toFixed(0)}M weekly users`
      }
    }
  }
};

/* ─── Right panel: Revenue trajectories (log scale scatter+line) ─── */

const revData = slide33RevenueTrajectoryData;

const revChartData: ChartData<"line"> = {
  datasets: [
    {
      label: "OpenAI",
      data: revData.openAi,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.12),
      showLine: true,
      fill: false,
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28
    },
    {
      label: "Anthropic",
      data: revData.anthropic,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.12),
      showLine: true,
      fill: false,
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28
    },
    {
      label: "xAI",
      data: revData.xAi,
      borderColor: theme.ext1,
      backgroundColor: hexToRgba(theme.ext1, 0.12),
      showLine: true,
      fill: false,
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28
    }
  ]
};

const revOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "nearest", intersect: false },
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      type: "linear",
      min: 10,
      max: 48,
      ticks: {
        stepSize: 12,
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (value) => {
          const labels: Record<number, string> = {
            12: "Jan 2023",
            24: "Jan 2024",
            36: "Jan 2025",
            48: "Jan 2026"
          };
          return labels[Number(value)] ?? "";
        }
      },
      grid: {
        color: ((ctx: { tick: { value: number } }) => {
          const labeledTicks = [12, 24, 36, 48];
          return labeledTicks.includes(ctx.tick.value) ? theme.border : "transparent";
        }) as unknown as string
      }
    },
    y: {
      type: "logarithmic",
      min: 0.01,
      max: 30,
      title: {
        display: true,
        text: "Annualized revenue (USD)",
        color: theme.textMuted,
        font: pitchAxisFont
      },
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (value) => {
          const n = Number(value);
          if (n === 0.01) return "$10M";
          if (n === 0.1) return "$100M";
          if (n === 1) return "$1B";
          if (n === 10) return "$10B";
          return "";
        }
      },
      grid: {
        color: ((ctx: { tick: { value: number } }) => {
          const labeled = [0.01, 0.1, 1, 10];
          return labeled.includes(ctx.tick.value) ? theme.border : "transparent";
        }) as unknown as string
      }
    }
  },
  plugins: {
    legend: {
      ...pitchLegendLine,
    },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => {
          const y = Number((item.raw as { y: number }).y);
          return `${item.dataset.label}: $${y >= 1 ? y.toFixed(1) + "B" : Math.round(y * 1000) + "M"} ARR`;
        }
      }
    }
  }
};

export function PitchSlide07Adoption() {
  return (
    <>
      <SectionHeader
        sectionLabel="AI INFRASTRUCTURE"
        title="AI adoption and revenue are materializing faster than any prior technology wave"
        subtitle="900M weekly users · $20B ARR in ~3 years · $240B cloud backlog"
      />

      <div className="pitch-dual-panel">
        <div className="pitch-panel">
          <div className="pitch-panel-label">Consumer adoption (ChatGPT weekly active users)</div>
          <div className="pitch-panel-chart">
            <LineChart data={adoptionChartData} options={adoptionOptions} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">Revenue trajectories (ARR, log scale)</div>
          <div className="pitch-panel-chart">
            <LineChart data={revChartData} options={revOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: OpenAI; Anthropic; The Information; Bloomberg; Epoch AI (compiled Feb 2026)." tight />
    </>
  );
}
