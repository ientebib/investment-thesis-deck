import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide14CoreInflationData, slide15PriceChangesData } from "@/lib/data/slides";
import { eventLine, referenceLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const priceChangeSlide = slide15PriceChangesData;
const coreInflationSlide = slide14CoreInflationData;

const barColors = priceChangeSlide.values.map((value, index) => {
  const category = priceChangeSlide.categories[index];
  if (category === "Overall CPI") {
    return chartSeriesColor(theme, 1);
  }
  if (value < 0) {
    return theme.negative;
  }
  if (value > priceChangeSlide.overallCpiValue) {
    return chartSeriesColor(theme, 0);
  }
  return theme.textTertiary;
});

const priceChangeChartData: ChartData<"bar"> = {
  labels: priceChangeSlide.categories,
  datasets: [
    {
      data: priceChangeSlide.values,
      backgroundColor: barColors,
      borderColor: barColors,
      borderWidth: 0,
      barThickness: 14
    }
  ]
};

const priceChangeChartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      min: -120,
      max: 300,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}%`
      },
      grid: { color: theme.border }
    },
    y: {
      grid: { display: false },
      ticks: {
        color: theme.textSecondary,
        font: { family: fonts.body, size: 11, weight: 400 }
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        cpiLine: {
          type: "line",
          xMin: priceChangeSlide.overallCpiValue,
          xMax: priceChangeSlide.overallCpiValue,
          borderColor: chartSeriesColor(theme, 1),
          borderWidth: 1.5,
          borderDash: [5, 4],
          label: {
            display: true,
            content: "Overall CPI",
            position: "start",
            color: chartSeriesColor(theme, 1),
            backgroundColor: "transparent",
            font: { family: fonts.data, size: 8, weight: 400 },
            padding: 0
          }
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
        label: (item) => `${Number(item.raw).toFixed(1)}%`
      }
    }
  }
};

const projectionIndex = coreInflationSlide.dates.findIndex((date) => date === coreInflationSlide.projectionStartDate);

const coreInflationChartData: ChartData<"line"> = {
  labels: coreInflationSlide.dates,
  datasets: [
    {
      label: "US",
      data: coreInflationSlide.us,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "Euro Area",
      data: coreInflationSlide.euroArea,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "UK",
      data: coreInflationSlide.uk,
      borderColor: chartSeriesColor(theme, 2),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "Canada",
      data: coreInflationSlide.canada,
      borderColor: chartSeriesColor(theme, 3),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    },
    {
      label: "Australia",
      data: coreInflationSlide.australia,
      borderColor: chartSeriesColor(theme, 4),
      backgroundColor: "transparent",
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25
    }
  ]
};

const coreInflationChartOptions: ChartOptions<"line"> = {
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
          const date = coreInflationSlide.dates[index];
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
        targetLine: referenceLine(theme, {
          axis: "y",
          value: coreInflationSlide.targetInflation,
          label: "2% Target"
        })
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

export function Slide15PriceChanges() {
  const combinedSourceLine = `Source: ${priceChangeSlide.sourceLine.replace(/^Source:\s*/, "")}; ${coreInflationSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader
        sectionLabel={priceChangeSlide.sectionLabel}
        title={priceChangeSlide.title}
        subtitle={priceChangeSlide.subtitle}
      />
      <div className="slide-combo-layout">
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Core inflation across major DM economies</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={coreInflationChartData} options={coreInflationChartOptions} />
          </div>
        </section>
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Cumulative price change by category</div>
          <div className="chart-area slide-combo-chart">
            <BarChart data={priceChangeChartData} options={priceChangeChartOptions} />
          </div>
        </section>
      </div>
      <SourceLine text={combinedSourceLine} />
    </>
  );
}
