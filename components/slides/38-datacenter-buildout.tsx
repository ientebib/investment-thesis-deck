import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide38DatacenterBuildoutData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const slideData = slide38DatacenterBuildoutData;

const actualColor = chartSeriesColor(theme, 0);
const projectedColor = chartSeriesColor(theme, 1);

const chartData: ChartData<"line"> = {
  labels: slideData.years,
  datasets: [
    {
      label: "Actual",
      data: slideData.actualGw,
      borderColor: actualColor,
      backgroundColor: hexToRgba(actualColor, 0.14),
      fill: true,
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28,
      spanGaps: false
    },
    {
      label: "Projected",
      data: slideData.projectedGw,
      borderColor: projectedColor,
      backgroundColor: hexToRgba(projectedColor, 0.14),
      fill: true,
      borderDash: [6, 4],
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      pointStyle: "triangle",
      tension: 0.28,
      spanGaps: false
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
      max: 140,
      ticks: {
        stepSize: 20,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value} GW`
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
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)} GW`
      }
    }
  }
};

export function Slide38DatacenterBuildout() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="ai-portfolio-layout">
        <div className="ai-portfolio-card-grid">
          {slideData.stats.map((stat, index) => (
            <article
              key={stat.label}
              className={`ai-portfolio-card ${index % 2 === 0 ? "ai-portfolio-card--primary" : "ai-portfolio-card--secondary"}`}
            >
              <h3 className="ai-portfolio-card-label">{stat.label}</h3>
              <div className="ai-portfolio-card-metric">{stat.value}</div>
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
