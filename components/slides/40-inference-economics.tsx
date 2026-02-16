import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide40InferenceEconomicsData } from "@/lib/data/slides";
import { projectionDivider } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide40InferenceEconomicsData;
const projectionStartYear = 2025;

const trainingColor = chartSeriesColor(theme, 1);
const inferenceColor = chartSeriesColor(theme, 0);

const chartData: ChartData<"line"> = {
  labels: slideData.years.map(String),
  datasets: [
    {
      label: "Training",
      data: slideData.trainingPct,
      borderColor: trainingColor,
      backgroundColor: hexToRgba(trainingColor, 0.2),
      fill: true,
      tension: 0.24,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3
    },
    {
      label: "Inference",
      data: slideData.inferencePct,
      borderColor: inferenceColor,
      backgroundColor: hexToRgba(inferenceColor, 0.2),
      fill: "-1",
      tension: 0.24,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3
    }
  ]
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { color: theme.border },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      }
    },
    y: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 10,
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
        ...(() => {
          const pd = projectionDivider(theme, { xValue: String(projectionStartYear) });
          return { projectedLine: pd.line, actualLabel: pd.actualLabel };
        })()
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
        boxWidth: 20
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(0)}%`
      }
    }
  }
};

export function Slide40InferenceEconomics() {
  return (
    <>
      <SectionHeader
        sectionLabel={slideData.sectionLabel}
        title={slideData.title}
        subtitle={`${slideData.subtitle} ${slideData.body}`}
      />

      <div className="chart-area">
        <LineChart data={chartData} options={chartOptions} />
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
