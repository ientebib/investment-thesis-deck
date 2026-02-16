import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide10InterestExpenseData } from "@/lib/data/slides";
import { projectionDivider } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide10InterestExpenseData;
const projectionIndex = slideData.years.findIndex((year) => year === slideData.projectionStartYear);

const spendingPlusInterest = slideData.programSpendingPct.map((value, index) =>
  Number((value + slideData.netInterestPct[index]).toFixed(1))
);

const chartData: ChartData<"line"> = {
  labels: slideData.years.map(String),
  datasets: [
    {
      label: "Program Spending",
      data: slideData.programSpendingPct,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.22),
      borderWidth: 1.5,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.25,
      order: 2
    },
    {
      label: "Spending + Interest",
      data: spendingPlusInterest,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.22),
      borderWidth: 1.5,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: "-1",
      tension: 0.25,
      order: 1
    },
    {
      label: "Revenue",
      data: slideData.revenuePct,
      borderColor: chartSeriesColor(theme, 2),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.25,
      order: 0
    }
  ]
};

const pd = projectionDivider(theme, { xValue: projectionIndex });

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 18, right: 16, bottom: 4, left: 8 } },
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
          return year % 5 === 0 ? String(year) : "";
        }
      }
    },
    y: {
      min: 0,
      max: 35,
      ticks: {
        stepSize: 5,
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
        projectedLine: pd.line,
        actualLabel: pd.actualLabel
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
        padding: 12,
        boxWidth: 24
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
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)}% of GDP`
      }
    }
  }
};

export function Slide10InterestExpense() {
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
