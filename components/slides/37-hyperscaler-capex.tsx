import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide37HyperscalerCapexData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide37HyperscalerCapexData;

const chartData: ChartData<"bar"> = {
  labels: slideData.years,
  datasets: [
    {
      label: "Amazon",
      data: slideData.amazonCapexUsdBillions,
      backgroundColor: chartSeriesColor(theme, 0)
    },
    {
      label: "Alphabet",
      data: slideData.alphabetCapexUsdBillions,
      backgroundColor: theme.textMuted
    },
    {
      label: "Meta",
      data: slideData.metaCapexUsdBillions,
      backgroundColor: chartSeriesColor(theme, 1)
    },
    {
      label: "Microsoft",
      data: slideData.microsoftCapexUsdBillions,
      backgroundColor: theme.secondaryLight
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      }
    },
    y: {
      stacked: true,
      beginAtZero: true,
      max: 700,
      ticks: {
        stepSize: 100,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `$${value}B`
      },
      title: {
        display: true,
        text: "Capital expenditure ($B)",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        capexLabel: {
          type: "label",
          xValue: "2026E",
          yValue: 640,
          content: ["~$600B+"],
          color: theme.textPrimary,
          backgroundColor: "transparent",
          font: { family: fonts.data, size: 11, weight: 500 },
          padding: 0
        }
      }
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "rectRounded",
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 400 },
        padding: 12
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (item) => `${item.dataset.label}: $${Number(item.raw).toFixed(1)}B`,
        footer: (items) => {
          const total = items.reduce((sum, item) => sum + Number(item.raw), 0);
          return `Total: $${Math.round(total)}B`;
        }
      }
    }
  }
};

export function Slide37HyperscalerCapex() {
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
