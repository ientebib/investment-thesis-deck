import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide28AiPortfolioImpactData } from "@/lib/data/slides";
import { eventLine } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide28AiPortfolioImpactData;
const crossoverIndex = slideData.years.findIndex((year) => year === 2011);

const chartData: ChartData<"line"> = {
  labels: slideData.years.map(String),
  datasets: [
    {
      label: "China",
      data: slideData.chinaTwh,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.08),
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.28
    },
    {
      label: "United States",
      data: slideData.usTwh,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.08),
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.28
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
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (_, index) => (index % 5 === 0 ? slideData.years[index] : "")
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${Number(value).toLocaleString()}`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        crossover: eventLine(theme, { xValue: crossoverIndex, label: "China overtakes US" })
      }
    },
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
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toLocaleString()} TWh`
      }
    }
  }
};

export function Slide28WhyAiMatters() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="ai-portfolio-layout">
        <div className="ai-portfolio-card-grid">
          {slideData.cards.map((card) => (
            <article key={card.label} className={`ai-portfolio-card ai-portfolio-card--${card.tone}`}>
              <h3 className="ai-portfolio-card-label">{card.label}</h3>
              <div className="ai-portfolio-card-metric">{card.metric}</div>
              <p className="ai-portfolio-card-description">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="chart-area ai-portfolio-chart-area">
          <LineChart data={chartData} options={chartOptions} />
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
