import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide32AdoptionData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const slideData = slide32AdoptionData;

const chartData: ChartData<"line"> = {
  labels: slideData.usagePeriods,
  datasets: [
    {
      label: "ChatGPT weekly active users",
      data: slideData.usageMillions,
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

const chartOptions: ChartOptions<"line"> = {
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

export function Slide32AiAdoption() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="adoption-layout">
        <h3 className="adoption-row-label">{slideData.enterpriseLabel}</h3>
        <div className="adoption-card-grid adoption-card-grid--3col">
          {slideData.cards.map((card) => (
            <article key={card.label} className="adoption-card">
              <div className="adoption-card-metric">{card.metric}</div>
              <div className="adoption-card-label">{card.label}</div>
              <div className="adoption-card-detail">{card.detail}</div>
            </article>
          ))}
        </div>

        <h3 className="adoption-row-label">{slideData.usageLabel}</h3>
        <div className="chart-area adoption-chart-area">
          <LineChart data={chartData} options={chartOptions} />
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} tight />
    </>
  );
}
