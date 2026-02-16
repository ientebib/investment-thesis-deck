import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide26BeyondGoldData } from "@/lib/data/slides";
import { chartSeriesColor, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";
import {
  pitchAxisFont,
  pitchTooltip,
  pitchLegendLine,
} from "@/lib/pitchChartDefaults";

const slideData = slide26BeyondGoldData;

const chartData: ChartData<"line"> = {
  labels: slideData.dates,
  datasets: [
    {
      label: "Silver",
      data: slideData.silverIndex,
      borderColor: theme.textMuted,
      backgroundColor: hexToRgba(theme.textMuted, 0.1),
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.28
    },
    {
      label: "Copper",
      data: slideData.copperIndex,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.08),
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.28
    },
    {
      label: "Uranium",
      data: slideData.uraniumIndex,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.08),
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
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
        font: pitchAxisFont,
        maxRotation: 0,
        autoSkip: false,
        callback: (_, index) => {
          const date = slideData.dates[index];
          return date?.endsWith("-02") ? date.slice(0, 4) : "";
        }
      }
    },
    y: {
      min: 60,
      max: 320,
      ticks: {
        stepSize: 40,
        color: theme.textTertiary,
        font: pitchAxisFont
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    legend: {
      ...pitchLegendLine,
      position: "top",
      align: "end",
      labels: {
        ...pitchLegendLine.labels,
        pointStyle: "line",
        padding: 10,
        boxWidth: 18
      }
    },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}`
      }
    }
  }
};

export function Slide26BeyondGold() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="commodities-layout">
        <div className="commodities-card-grid">
          {slideData.cards.map((card) => (
            <article key={card.title} className={`commodities-card commodities-card--${card.tone}`}>
              <div className="commodities-card-head">
                <h3 className="commodities-card-title">{card.title}</h3>
                <span className="commodities-card-range">{card.range}</span>
              </div>
              <p className="commodities-card-description">{card.description}</p>
            </article>
          ))}
        </div>

        <section className="commodities-reshoring">
          <h3 className="commodities-reshoring-title">{slideData.reshoringTitle}</h3>
          <p className="commodities-reshoring-body">{slideData.reshoringBody}</p>
        </section>

        <div className="chart-area commodities-chart-area">
          <LineChart data={chartData} options={chartOptions} />
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} tight />
    </>
  );
}
