import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide43LaborExposureData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide43LaborExposureData;
const labels = slideData.signals.map((signal) => signal.metric);
const values = slideData.signals.map((signal) => signal.valuePct);

function barColor(index: number) {
  const signal = slideData.signals[index];
  if (!signal) {
    return theme.textMuted;
  }
  return signal.group === "employer"
    ? chartSeriesColor(theme, 1)
    : chartSeriesColor(theme, 0);
}

const chartData: ChartData<"bar"> = {
  labels,
  datasets: [
    {
      label: "Share (%)",
      data: values,
      backgroundColor: values.map((_, index) => barColor(index))
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 26, bottom: 4, left: 8 } },
  scales: {
    x: {
      min: 0,
      max: 80,
      ticks: {
        stepSize: 10,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}%`
      },
      grid: { color: theme.border }
    },
    y: {
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 8, weight: 300 }
      },
      grid: { display: false }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (item) => `Share: ${item.parsed.x}%`,
        afterLabel: (item) => slideData.signals[item.dataIndex]?.sourceNote ?? ""
      }
    }
  }
};

export function Slide43LaborExposure() {
  return (
    <>
      <SectionHeader
        sectionLabel={slideData.sectionLabel}
        title={slideData.title}
        subtitle={`${slideData.subtitle} ${slideData.body}`}
      />

      <div className="chart-area labor-exposure-chart-area">
        <BarChart data={chartData} options={chartOptions} />
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
