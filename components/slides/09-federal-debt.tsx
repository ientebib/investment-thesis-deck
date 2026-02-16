import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide09FederalDebtData } from "@/lib/data/slides";
import { calloutLabel, eventLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide09FederalDebtData;

const projectionIndex = slideData.years.findIndex((year) => year === slideData.projectionStartYear);
const actualValues = slideData.values.map((value, index) => (index < projectionIndex ? value : null));
const projectedValues = slideData.values.map((value, index) => (index >= projectionIndex - 1 ? value : null));

const debtData: ChartData<"line"> = {
  labels: slideData.years.map(String),
  datasets: [
    {
      label: "Actual",
      data: actualValues,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: theme.primaryMuted,
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.2,
      spanGaps: false
    },
    {
      label: "Projected",
      data: projectedValues,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: theme.secondaryMuted,
      borderWidth: 1.8,
      borderDash: [5, 3],
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.2,
      spanGaps: false
    }
  ]
};

const debtOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 20, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxRotation: 0,
        autoSkip: false,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (_, index) => {
          const year = slideData.years[index];
          return year % 10 === 0 ? String(year) : "";
        }
      }
    },
    y: {
      min: 0,
      max: 180,
      ticks: {
        stepSize: 20,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}%`
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
        padding: 12,
        boxWidth: 24
      }
    },
    annotation: {
      annotations: {
        wwii: {
          ...calloutLabel(theme, {
            xValue: slideData.years.indexOf(1945),
            yValue: 118,
            content: ["World War II"],
            color: theme.textPrimary,
            fontSize: 9,
            fontWeight: 500
          }),
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: 3
        },
        gfcLine: {
          type: "line" as const,
          xMin: slideData.years.indexOf(2008),
          xMax: slideData.years.indexOf(2008),
          yMin: 55,
          yMax: 78,
          borderColor: theme.textPrimary,
          borderWidth: 1,
          borderDash: [3, 2]
        },
        gfc: {
          ...calloutLabel(theme, {
            xValue: slideData.years.indexOf(2009),
            yValue: 86,
            content: ["Financial Crisis", "QE begins (2009)"],
            color: theme.textPrimary,
            fontSize: 9,
            fontWeight: 500
          }),
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: 4
        },
        covid: {
          ...calloutLabel(theme, {
            xValue: slideData.years.indexOf(2020),
            yValue: 118,
            content: ["COVID-19"],
            color: theme.textPrimary,
            fontSize: 9,
            fontWeight: 500
          }),
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: 3
        }
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
        label: (item) => (item.raw === null ? undefined : `${item.dataset.label}: ${item.raw}% of GDP`)
      }
    }
  }
};

export function Slide09FederalDebt() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <LineChart data={debtData} options={debtOptions} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
