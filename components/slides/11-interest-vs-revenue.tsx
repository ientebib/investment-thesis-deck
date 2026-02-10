import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide10InterestExpenseData, slide11InterestRevenueData } from "@/lib/data/slides";
import { projectionDivider, recessionBox } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const interestSlide = slide11InterestRevenueData;
const expenseSlide = slide10InterestExpenseData;

const interestProjectionIndex = interestSlide.years.findIndex((year) => year === interestSlide.projectionStartYear);
const interestActualData = interestSlide.values.map((value, index) => (index <= interestProjectionIndex - 1 ? value : null));
const interestProjectedData = interestSlide.values.map((value, index) =>
  index >= interestProjectionIndex - 1 ? value : null
);

const expenseProjectionIndex = expenseSlide.years.findIndex((year) => year === expenseSlide.projectionStartYear);
const spendingPlusInterest = expenseSlide.programSpendingPct.map((value, index) =>
  Number((value + expenseSlide.netInterestPct[index]).toFixed(1))
);

const interestChartData: ChartData<"line"> = {
  labels: interestSlide.years.map(String),
  datasets: [
    {
      label: "Actual",
      data: interestActualData,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.25,
      spanGaps: false
    },
    {
      label: "Projected",
      data: interestProjectedData,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 2,
      borderDash: [5, 3],
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.25,
      spanGaps: false
    }
  ]
};

const expenseChartData: ChartData<"line"> = {
  labels: expenseSlide.years.map(String),
  datasets: [
    {
      label: "Program Spending",
      data: expenseSlide.programSpendingPct,
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
      data: expenseSlide.revenuePct,
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

function buildRecessionAnnotations() {
  const spans: Array<{ start: number; end: number }> = [];
  let start: number | null = null;
  interestSlide.isRecession.forEach((flag, index) => {
    if (flag === 1 && start === null) start = index;
    if ((flag === 0 || index === interestSlide.isRecession.length - 1) && start !== null) {
      spans.push({ start, end: flag === 1 ? index : index - 1 });
      start = null;
    }
  });
  const result: Record<string, object> = {};
  spans.forEach((span, i) => {
    result[`recession_${i}`] = recessionBox(theme, { xMin: span.start, xMax: span.end });
  });
  return result;
}

const interestProjectionDivider = projectionDivider(theme, { xValue: interestProjectionIndex });
const expenseProjectionDivider = projectionDivider(theme, { xValue: expenseProjectionIndex });

const interestChartOptions: ChartOptions<"line"> = {
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
          const year = interestSlide.years[index];
          return year % 5 === 0 ? String(year) : "";
        }
      }
    },
    y: {
      min: 5,
      max: 24,
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
        ...buildRecessionAnnotations(),
        projectedLine: interestProjectionDivider.line,
        actualLabel: interestProjectionDivider.actualLabel
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
        label: (item) => (item.raw === null ? undefined : `Interest / Revenue: ${Number(item.raw).toFixed(1)}%`)
      }
    }
  }
};

const expenseChartOptions: ChartOptions<"line"> = {
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
          const year = expenseSlide.years[index];
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
        projectedLine: expenseProjectionDivider.line,
        actualLabel: expenseProjectionDivider.actualLabel
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

export function Slide11InterestVsRevenue() {
  const combinedSourceLine = `Source: ${interestSlide.sourceLine.replace(/^Source:\s*/, "")}; ${expenseSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader sectionLabel={interestSlide.sectionLabel} title={interestSlide.title} subtitle={interestSlide.subtitle} />
      <div className="slide-combo-layout">
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Interest / Revenue ratio</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={interestChartData} options={interestChartOptions} />
          </div>
        </section>
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Interest expense as major budget item</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={expenseChartData} options={expenseChartOptions} />
          </div>
        </section>
      </div>
      <SourceLine text={combinedSourceLine} />
    </>
  );
}
