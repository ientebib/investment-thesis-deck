import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide25MineralDemandData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const slideData = slide25MineralDemandData;

const ktSeriesByDatasetIndex = [slideData.kt2024, slideData.kt2030, slideData.kt2035, slideData.kt2040];

const chartData: ChartData<"bar"> = {
  labels: slideData.minerals,
  datasets: [
    {
      label: "2024 Actual",
      data: slideData.index2024,
      backgroundColor: hexToRgba(theme.textMuted, 0.85),
      borderColor: hexToRgba(theme.textMuted, 0.85),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    },
    {
      label: "2030 STEPS",
      data: slideData.index2030,
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.68),
      borderColor: hexToRgba(chartSeriesColor(theme, 1), 0.68),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    },
    {
      label: "2035 STEPS",
      data: slideData.index2035,
      backgroundColor: chartSeriesColor(theme, 1),
      borderColor: chartSeriesColor(theme, 1),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    },
    {
      label: "2040 STEPS",
      data: slideData.index2040,
      backgroundColor: chartSeriesColor(theme, 0),
      borderColor: chartSeriesColor(theme, 0),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      },
      grid: { display: false }
    },
    y: {
      min: 0,
      max: 500,
      ticks: {
        stepSize: 50,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        baselineLine: {
          type: "line",
          yMin: 100,
          yMax: 100,
          borderColor: hexToRgba(theme.textMuted, 0.72),
          borderWidth: 1.5,
          borderDash: [5, 4],
          label: {
            display: true,
            content: "2024 baseline",
            position: "start",
            color: theme.textMuted,
            backgroundColor: "transparent",
            font: { family: fonts.data, size: 8, weight: 400 },
            padding: 0
          }
        }
      }
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 400 },
        boxWidth: 8,
        padding: 10
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (context) => {
          const mineralIndex = context.dataIndex;
          const datasetIndex = context.datasetIndex;
          const ktSeries = ktSeriesByDatasetIndex[datasetIndex] ?? [];
          const ktValue = ktSeries[mineralIndex];
          const indexValue = Number(context.raw);
          return `${context.dataset.label}: ${indexValue.toFixed(0)} index / ${Number(ktValue).toLocaleString()} kt`;
        }
      }
    }
  }
};

export function Slide25MineralDemand() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <BarChart data={chartData} options={chartOptions} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
