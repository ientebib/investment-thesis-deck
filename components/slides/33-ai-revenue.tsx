import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide33RevenueTrajectoryData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const slideData = slide33RevenueTrajectoryData;

const openAiColor = chartSeriesColor(theme, 0);
const anthropicColor = chartSeriesColor(theme, 1);
const xAiColor = theme.ext1;

const chartData: ChartData<"line"> = {
  datasets: [
    {
      label: "OpenAI",
      data: slideData.openAi,
      borderColor: openAiColor,
      backgroundColor: hexToRgba(openAiColor, 0.12),
      showLine: true,
      fill: false,
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28
    },
    {
      label: "Anthropic",
      data: slideData.anthropic,
      borderColor: anthropicColor,
      backgroundColor: hexToRgba(anthropicColor, 0.12),
      showLine: true,
      fill: false,
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28
    },
    {
      label: "xAI",
      data: slideData.xAi,
      borderColor: xAiColor,
      backgroundColor: hexToRgba(xAiColor, 0.12),
      showLine: true,
      fill: false,
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28
    }
  ]
};

const chartOptions: ChartOptions<"line"> = {
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
        font: { family: fonts.data, size: 9, weight: 300 },
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
        color: (ctx: { tick: { value: number } }) => {
          const labeledTicks = [12, 24, 36, 48];
          return labeledTicks.includes(ctx.tick.value) ? theme.border : "transparent";
        }
      }
    },
    y: {
      type: "logarithmic",
      min: 0.01,
      max: 30,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => {
          const numberValue = Number(value);
          if (numberValue === 0.01) {
            return "$10M";
          }
          if (numberValue === 0.1) {
            return "$100M";
          }
          if (numberValue === 1) {
            return "$1B";
          }
          if (numberValue === 10) {
            return "$10B";
          }
          return "";
        }
      },
      title: {
        display: true,
        text: "Annualized revenue (USD)",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
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
        label: (item) => {
          const value = Number(item.raw);
          if (value >= 1) {
            return `${item.dataset.label}: $${value.toFixed(1)}B ARR`;
          }
          return `${item.dataset.label}: $${Math.round(value * 1000)}M ARR`;
        }
      }
    }
  }
};

export function Slide33AiRevenue() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <LineChart data={chartData} options={chartOptions} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
