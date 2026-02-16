import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide22GoldYieldData } from "@/lib/data/slides";
import { eventLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide22GoldYieldData;
const breakIndex = slideData.dates.findIndex((date) => date === slideData.relationshipBreakDate);

const chartData: ChartData<"line"> = {
  labels: slideData.dates,
  datasets: [
    {
      label: "Gold Price (ln)",
      data: slideData.goldPriceLn,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.25,
      yAxisID: "y"
    },
    {
      label: "US 10Y Real Yield",
      data: slideData.real10yYield,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.25,
      yAxisID: "y1"
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
          return date?.endsWith("-01-01") ? date.slice(0, 4) : "";
        }
      }
    },
    y: {
      position: "left",
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      },
      grid: { color: theme.border }
    },
    y1: {
      position: "right",
      reverse: true,
      grid: { display: false },
      ticks: {
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}%`
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        breakLine: eventLine(theme, { xValue: breakIndex, label: "2022 regime break" })
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
        boxWidth: 18
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 }
    }
  }
};

export function Slide22GoldVsRealYield() {
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
