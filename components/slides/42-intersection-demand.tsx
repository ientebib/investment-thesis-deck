import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide42IntersectionDemandData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide42IntersectionDemandData;
const labels = slideData.inputs.map((input) => `${input.input} (${input.unit})`);
const growthValues = slideData.inputs.map((input) => input.growthPct);
const values2024 = slideData.inputs.map((input) => input.value2024);
const values2030 = slideData.inputs.map((input) => input.value2030);

const absoluteLabelsPlugin: Plugin<"bar"> = {
  id: "slide42AbsoluteLabels",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.font = `400 8px ${fonts.data}`;
    ctx.fillStyle = theme.textMuted;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    for (let index = 0; index < meta.data.length; index += 1) {
      const bar = meta.data[index];
      if (!bar) {
        continue;
      }
      const text = `${values2024[index]} -> ${values2030[index]}`;
      ctx.fillText(text, bar.x + 6, bar.y);
    }

    ctx.restore();
  }
};

const chartData: ChartData<"bar"> = {
  labels,
  datasets: [
    {
      label: "Growth 2024-2030 (%)",
      data: growthValues,
      backgroundColor: chartSeriesColor(theme, 0)
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 80, bottom: 4, left: 8 } },
  scales: {
    x: {
      min: 0,
      max: 200,
      ticks: {
        stepSize: 20,
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
        label: (item) => {
          const index = item.dataIndex;
          return [
            `Growth: ${growthValues[index]}%`,
            `2024: ${values2024[index]} ${slideData.inputs[index]?.unit ?? ""}`,
            `2030: ${values2030[index]} ${slideData.inputs[index]?.unit ?? ""}`
          ];
        }
      }
    }
  }
};

export function Slide42IntersectionDemand() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="chart-area">
        <BarChart data={chartData} options={chartOptions} plugins={[absoluteLabelsPlugin]} />
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
