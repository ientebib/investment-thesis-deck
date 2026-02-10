import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide23MineLeadTimesData, slide25MineralDemandData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const leadTimesSlide = slide23MineLeadTimesData;
const mineralDemandSlide = slide25MineralDemandData;

const barColors = leadTimesSlide.periods.map((period) => {
  if (period === leadTimesSlide.projectedPeriod) {
    return theme.caution;
  }
  return chartSeriesColor(theme, 1);
});

const leadTimesChartData: ChartData<"bar"> = {
  labels: leadTimesSlide.periods,
  datasets: [
    {
      label: "Avg. years from discovery to production",
      data: leadTimesSlide.yearsToProduction,
      backgroundColor: barColors.map((color, index) => hexToRgba(color, index < 3 ? 0.78 : 0.9)),
      borderColor: barColors,
      borderWidth: 1.5,
      borderRadius: 5,
      barPercentage: 0.65
    }
  ]
};

const leadTimesChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 16, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 400 },
        callback: (value, index) => {
          const label = leadTimesSlide.periods[index];
          if (!label) {
            return "";
          }
          if (label === leadTimesSlide.projectedPeriod) {
            return ["Non-Operating", "(Projected)"];
          }
          return label;
        }
      }
    },
    y: {
      beginAtZero: true,
      suggestedMax: 30,
      ticks: {
        stepSize: 5,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value} yrs`
      },
      grid: { color: theme.border },
      title: {
        display: true,
        text: "Years from discovery to production",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        trendLine: {
          type: "line",
          xMin: 0,
          xMax: 2,
          yMin: 7.5,
          yMax: 19.4,
          borderColor: hexToRgba(theme.caution, 0.45),
          borderWidth: 1.5,
          borderDash: [4, 3]
        },
        tripledLabel: {
          type: "label",
          xValue: 1,
          yValue: 20.5,
          content: ["3x increase"],
          color: theme.caution,
          backgroundColor: "transparent",
          font: { family: fonts.data, size: 9, weight: 400 },
          padding: 0
        }
      }
    },
    legend: { display: false },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (item) => `${Number(item.raw).toFixed(1)} years`
      }
    }
  }
};

const ktSeriesByDatasetIndex = [
  mineralDemandSlide.kt2024,
  mineralDemandSlide.kt2030,
  mineralDemandSlide.kt2035,
  mineralDemandSlide.kt2040
];

const mineralDemandChartData: ChartData<"bar"> = {
  labels: mineralDemandSlide.minerals,
  datasets: [
    {
      label: "2024 Actual",
      data: mineralDemandSlide.index2024,
      backgroundColor: hexToRgba(theme.textMuted, 0.85),
      borderColor: hexToRgba(theme.textMuted, 0.85),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    },
    {
      label: "2030 STEPS",
      data: mineralDemandSlide.index2030,
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.68),
      borderColor: hexToRgba(chartSeriesColor(theme, 1), 0.68),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    },
    {
      label: "2035 STEPS",
      data: mineralDemandSlide.index2035,
      backgroundColor: chartSeriesColor(theme, 1),
      borderColor: chartSeriesColor(theme, 1),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    },
    {
      label: "2040 STEPS",
      data: mineralDemandSlide.index2040,
      backgroundColor: chartSeriesColor(theme, 0),
      borderColor: chartSeriesColor(theme, 0),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    }
  ]
};

const mineralDemandChartOptions: ChartOptions<"bar"> = {
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

export function Slide23MineLeadTimes() {
  const combinedSourceLine = `Source: ${leadTimesSlide.sourceLine.replace(/^Source:\s*/, "")}; ${mineralDemandSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader sectionLabel={leadTimesSlide.sectionLabel} title={leadTimesSlide.title} subtitle={leadTimesSlide.subtitle} />
      <div className="slide-combo-layout">
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Mine development timelines</div>
          <div className="chart-area slide-combo-chart">
            <BarChart data={leadTimesChartData} options={leadTimesChartOptions} />
          </div>
        </section>
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Critical mineral demand acceleration</div>
          <div className="chart-area slide-combo-chart">
            <BarChart data={mineralDemandChartData} options={mineralDemandChartOptions} />
          </div>
        </section>
      </div>
      <SourceLine text={combinedSourceLine} />
    </>
  );
}
