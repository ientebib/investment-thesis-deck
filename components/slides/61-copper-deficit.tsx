import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide61CopperDeficitData } from "@/lib/data/slides";
import { calloutLabel } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide61CopperDeficitData;

const demandColor = chartSeriesColor(theme, 0);
const supplyColor = chartSeriesColor(theme, 1);

const chartData: ChartData<"line"> = {
  labels: slideData.points.map((point) => point.year.toString()),
  datasets: [
    {
      label: "Demand",
      data: slideData.points.map((point) => point.demandMt),
      borderColor: demandColor,
      backgroundColor: hexToRgba(demandColor, 0.08),
      fill: true,
      borderWidth: 2,
      tension: 0.25,
      pointRadius: 0,
      pointHoverRadius: 3
    },
    {
      label: "Total supply",
      data: slideData.points.map((point) => point.supplyMt),
      borderColor: supplyColor,
      backgroundColor: hexToRgba(supplyColor, 0.12),
      fill: true,
      borderWidth: 2,
      tension: 0.25,
      pointRadius: 0,
      pointHoverRadius: 3
    }
  ]
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      },
      grid: { color: theme.border }
    },
    y: {
      min: 18,
      max: 40,
      ticks: {
        stepSize: 5,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value} Mt`
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
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 400 },
        usePointStyle: true,
        pointStyle: "line",
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
        label: (item) => `${item.dataset.label}: ${Number(item.parsed.y).toFixed(1)} Mt`
      }
    },
    annotation: {
      annotations: {
        deficitLabel: calloutLabel(theme, {
          xValue: slideData.deficitLabelYear,
          yValue: slideData.deficitLabelValueMt,
          content: "DEFICIT",
          color: theme.negative
        })
      }
    }
  }
};

export function Slide61CopperDeficit() {
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
