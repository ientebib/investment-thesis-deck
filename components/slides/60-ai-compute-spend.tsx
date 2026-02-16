import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide60ComputeSpendData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide60ComputeSpendData;

const valueLabelsPlugin: Plugin<"bar"> = {
  id: "slide60ValueLabels",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;

    ctx.save();
    ctx.font = `500 8px ${fonts.data}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((bar, dataIndex) => {
        const value = dataset.data[dataIndex];
        if (value === null || value === undefined || typeof value !== "number") {
          return;
        }
        ctx.fillStyle = Array.isArray(dataset.backgroundColor)
          ? String(dataset.backgroundColor[dataIndex] ?? theme.textPrimary)
          : String(dataset.backgroundColor ?? theme.textPrimary);
        ctx.fillText(`$${value.toFixed(1)}B`, bar.x, bar.y - 4);
      });
    });

    ctx.restore();
  }
};

const chartData: ChartData<"bar"> = {
  labels: slideData.points.map((point) => point.year),
  datasets: [
    {
      label: "OpenAI",
      data: slideData.points.map((point) => point.openAiUsdBillions),
      backgroundColor: chartSeriesColor(theme, 0),
      borderRadius: 3,
      barPercentage: 0.8,
      categoryPercentage: 0.7
    },
    {
      label: "Anthropic",
      data: slideData.points.map((point) => point.anthropicUsdBillions),
      backgroundColor: chartSeriesColor(theme, 1),
      borderRadius: 3,
      barPercentage: 0.8,
      categoryPercentage: 0.7
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 400 }
      }
    },
    y: {
      beginAtZero: true,
      max: 20,
      ticks: {
        stepSize: 4,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `$${value}B`
      },
      title: {
        display: true,
        text: "Total cloud compute spend ($B)",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
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
        pointStyle: "rectRounded",
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
        label: (item) => {
          if (item.parsed.y === null) {
            return undefined;
          }
          return `${item.dataset.label}: $${Number(item.parsed.y).toFixed(1)}B`;
        }
      }
    }
  }
};

export function Slide60AiComputeSpend() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <BarChart data={chartData} options={chartOptions} plugins={[valueLabelsPlugin]} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
