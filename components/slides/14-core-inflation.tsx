import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide14CoreInflationData } from "@/lib/data/slides";
import { eventLine, referenceLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide14CoreInflationData;
const projectionIndex = slideData.dates.findIndex((date) => date === slideData.projectionStartDate);

const chartData: ChartData<"line"> = {
  labels: slideData.dates,
  datasets: [
    {
      label: "US",
      data: slideData.us,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "Euro Area",
      data: slideData.euroArea,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "UK",
      data: slideData.uk,
      borderColor: chartSeriesColor(theme, 2),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "Canada",
      data: slideData.canada,
      borderColor: chartSeriesColor(theme, 3),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "Australia",
      data: slideData.australia,
      borderColor: chartSeriesColor(theme, 4),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    }
  ]
};

const chartOptions: ChartOptions<"line"> = {
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
        maxRotation: 0,
        autoSkip: false,
        callback: (_, index) => {
          const date = slideData.dates[index];
          return date?.endsWith("-01") ? date.slice(0, 4) : "";
        }
      }
    },
    y: {
      min: 0,
      max: 8,
      ticks: {
        stepSize: 1,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}%`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        forecastDivider: eventLine(theme, { xValue: projectionIndex, label: "Forecast" }),
        targetLine: referenceLine(theme, { axis: "y", value: slideData.targetInflation, label: "2% Target" })
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
        font: { family: fonts.data, size: 8, weight: 400 },
        padding: 8,
        boxWidth: 16
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        title: (items) => items[0]?.label ?? "",
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}%`
      }
    }
  }
};

export function Slide14CoreInflation() {
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
