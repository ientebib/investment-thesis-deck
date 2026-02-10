import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide32AdoptionData, slide33RevenueTrajectoryData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const adoptionSlide = slide32AdoptionData;
const revenueSlide = slide33RevenueTrajectoryData;

const adoptionChartData: ChartData<"line"> = {
  labels: adoptionSlide.usagePeriods,
  datasets: [
    {
      label: "ChatGPT weekly active users",
      data: adoptionSlide.usageMillions,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.12),
      fill: true,
      tension: 0.28,
      borderWidth: 2.2,
      pointRadius: 3,
      pointHoverRadius: 4
    }
  ]
};

const adoptionChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { color: theme.border },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      }
    },
    y: {
      beginAtZero: true,
      max: 1000,
      ticks: {
        stepSize: 200,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}M`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (item) => `${Number(item.raw).toLocaleString()}M weekly active users`
      }
    }
  }
};

const openAiColor = chartSeriesColor(theme, 0);
const anthropicColor = chartSeriesColor(theme, 1);
const xAiColor = theme.ext1;

const revenueChartData: ChartData<"line"> = {
  datasets: [
    {
      label: "OpenAI",
      data: revenueSlide.openAi,
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
      data: revenueSlide.anthropic,
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
      data: revenueSlide.xAi,
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

const revenueChartOptions: ChartOptions<"line"> = {
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
          if (numberValue === 0.01) return "$10M";
          if (numberValue === 0.1) return "$100M";
          if (numberValue === 1) return "$1B";
          if (numberValue === 10) return "$10B";
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

export function Slide32AiAdoption() {
  const combinedSourceLine = `Source: ${adoptionSlide.sourceLine.replace(/^Source:\s*/, "")}; ${revenueSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader sectionLabel={adoptionSlide.sectionLabel} title={adoptionSlide.title} subtitle={adoptionSlide.subtitle} />

      <div className="adoption-layout">
        <h3 className="adoption-row-label">{adoptionSlide.enterpriseLabel}</h3>
        <div className="adoption-card-grid adoption-card-grid--3col">
          {adoptionSlide.cards.map((card) => (
            <article key={card.label} className="adoption-card">
              <div className="adoption-card-metric">{card.metric}</div>
              <div className="adoption-card-label">{card.label}</div>
              <div className="adoption-card-detail">{card.detail}</div>
            </article>
          ))}
        </div>

        <div className="adoption-dual-charts">
          <section className="adoption-chart-panel">
            <h3 className="adoption-row-label">{adoptionSlide.usageLabel}</h3>
            <div className="chart-area adoption-chart-area">
              <LineChart data={adoptionChartData} options={adoptionChartOptions} />
            </div>
          </section>
          <section className="adoption-chart-panel">
            <h3 className="adoption-row-label">Revenue trajectory (ARR)</h3>
            <div className="chart-area adoption-chart-area">
              <LineChart data={revenueChartData} options={revenueChartOptions} />
            </div>
          </section>
        </div>
      </div>

      <SourceLine text={combinedSourceLine} tight />
    </>
  );
}
