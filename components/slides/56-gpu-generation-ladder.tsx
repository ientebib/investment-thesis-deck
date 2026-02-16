import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide56GpuGenerationData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide56GpuGenerationData;

function generationColor(generation: string) {
  if (generation === "A100") {
    return theme.textMuted;
  }
  if (generation === "H100") {
    return chartSeriesColor(theme, 0);
  }
  if (generation === "H100/GB200") {
    return theme.secondaryLight;
  }
  if (generation === "GB200") {
    return theme.primaryDark;
  }
  return chartSeriesColor(theme, 1);
}

const generationLabelsPlugin: Plugin<"bar"> = {
  id: "slide56GenerationLabels",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.font = `500 8px ${fonts.data}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    slideData.points.forEach((point, index) => {
      const bar = meta.data[index];
      if (!bar) {
        return;
      }
      ctx.fillStyle = generationColor(point.generation);
      ctx.fillText(point.generation, bar.x + 6, bar.y);
    });

    ctx.restore();
  }
};

const chartData: ChartData<"bar"> = {
  labels: slideData.points.map((point) => point.model),
  datasets: [
    {
      label: "Estimated GPU cluster size",
      data: slideData.points.map((point) => point.clusterSize),
      backgroundColor: slideData.points.map((point) => generationColor(point.generation))
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 56, bottom: 4, left: 8 } },
  scales: {
    x: {
      beginAtZero: true,
      max: 350000,
      ticks: {
        stepSize: 50000,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${Number(value) / 1000}k`
      },
      title: {
        display: true,
        text: "Estimated training cluster size (GPUs / equivalents)",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      },
      grid: { color: theme.border }
    },
    y: {
      ticks: {
        color: theme.textSecondary,
        font: { family: fonts.data, size: 8, weight: 400 }
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
        label: (item) => {
          const point = slideData.points[item.dataIndex];
          if (!point) {
            return "";
          }
          const size = Number(item.parsed.x);
          const sizeLabel = size >= 1000 ? `${Math.round(size / 1000)}k` : `${size}`;
          return `${point.generation} x ${sizeLabel}`;
        }
      }
    }
  }
};

export function Slide56GpuGenerationLadder() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <BarChart data={chartData} options={chartOptions} plugins={[generationLabelsPlugin]} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
