import type { ChartData, ChartOptions, Plugin, ScatterDataPoint } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide35TrainingCostData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide35TrainingCostData;
const highlightLabels = new Set(slideData.highlightLabels);

function formatCost(value: number) {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `$${Math.round(value / 1e6)}M`;
  }
  if (value >= 1e3) {
    return `$${Math.round(value / 1e3)}K`;
  }
  return `$${Math.round(value)}`;
}

function overlaps(
  rectangles: Array<{ x: number; y: number; width: number; height: number }>,
  x: number,
  y: number,
  width: number,
  height: number
) {
  return rectangles.some(
    (rectangle) =>
      x < rectangle.x + rectangle.width &&
      x + width > rectangle.x &&
      y < rectangle.y + rectangle.height &&
      y + height > rectangle.y
  );
}

const labelPlugin: Plugin<"line"> = {
  id: "slide35CostLabels",
  afterDatasetsDraw: (chart) => {
    const meta = chart.getDatasetMeta(0);
    const ctx = chart.ctx;
    const drawn: Array<{ x: number; y: number; width: number; height: number }> = [];

    ctx.save();
    ctx.font = `400 8px ${fonts.data}`;
    ctx.textBaseline = "bottom";
    ctx.fillStyle = chartSeriesColor(theme, 1);

    for (let index = 0; index < slideData.points.length; index += 1) {
      const point = slideData.points[index];
      if (!highlightLabels.has(point.label)) {
        continue;
      }
      const element = meta.data[index];
      if (!element) {
        continue;
      }

      const textWidth = ctx.measureText(point.label).width;
      const textHeight = 10;
      let labelX = element.x + 6;
      let labelY = element.y - 4;

      if (overlaps(drawn, labelX, labelY - textHeight, textWidth, textHeight)) {
        labelY = element.y + 12;
      }
      if (overlaps(drawn, labelX, labelY - textHeight, textWidth, textHeight)) {
        labelX = element.x - textWidth - 6;
        labelY = element.y - 4;
      }

      drawn.push({ x: labelX, y: labelY - textHeight, width: textWidth, height: textHeight });
      ctx.fillText(point.label, labelX, labelY);
    }

    ctx.restore();
  }
};

const chartData: ChartData<"line"> = {
  datasets: [
    {
      label: "Training cost (2023 USD)",
      data: slideData.points.map((point): ScatterDataPoint => ({ x: point.publicationYear, y: point.trainingCost2023Usd })),
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: chartSeriesColor(theme, 1),
      showLine: false,
      pointRadius: slideData.points.map((point) => (highlightLabels.has(point.label) ? 5 : 3)),
      pointHoverRadius: 7
    }
  ]
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "nearest", intersect: false },
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      type: "linear",
      min: 2016,
      max: 2026,
      ticks: {
        stepSize: 1,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => String(Math.round(Number(value)))
      },
      title: {
        display: true,
        text: "Publication year",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      },
      grid: {
        color: (ctx: { tick: { value: number } }) => {
          return Number.isInteger(ctx.tick.value) ? theme.border : "transparent";
        }
      }
    },
    y: {
      type: "logarithmic",
      min: 1e3,
      max: 1e9,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => {
          const numeric = Number(value);
          const included = [1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 5e8, 1e9];
          return included.includes(numeric) ? formatCost(numeric) : "";
        }
      },
      title: {
        display: true,
        text: "Training cost (2023 USD)",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      },
      grid: {
        color: (ctx: { tick: { value: number } }) => {
          const included = [1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 5e8, 1e9];
          return included.includes(ctx.tick.value) ? theme.border : "transparent";
        }
      }
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
        title: (items) => {
          const first = items[0];
          if (!first) {
            return "";
          }
          return slideData.points[first.dataIndex]?.label ?? "";
        },
        label: (item) => {
          const point = slideData.points[item.dataIndex];
          if (!point) {
            return "";
          }
          return formatCost(point.trainingCost2023Usd);
        }
      }
    }
  }
};

export function Slide35TrainingCost() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <LineChart data={chartData} options={chartOptions} plugins={[labelPlugin]} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
