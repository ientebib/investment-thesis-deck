import type { ChartData, ChartOptions, Plugin, ScatterDataPoint } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide34TrainingComputeData, slide35TrainingCostData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const computeSlide = slide34TrainingComputeData;
const costSlide = slide35TrainingCostData;
const frontierPoints = computeSlide.points.filter((point) => point.group === "frontier");
const otherPoints = computeSlide.points.filter((point) => point.group === "other");
const computeHighlightLabels = new Set(computeSlide.highlightLabels);
const costHighlightLabels = new Set(costSlide.highlightLabels);

function formatScientific(value: number) {
  const exponent = Math.floor(Math.log10(value));
  const mantissa = value / 10 ** exponent;
  return `${mantissa.toFixed(1)} x 10^${exponent}`;
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
  id: "slide34ComputeLabels",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const drawn: Array<{ x: number; y: number; width: number; height: number }> = [];
    const series = [
      { datasetIndex: 0, points: frontierPoints, color: chartSeriesColor(theme, 0) },
      { datasetIndex: 1, points: otherPoints, color: theme.textMuted }
    ];

    ctx.save();
    ctx.font = `400 8px ${fonts.data}`;
    ctx.textBaseline = "bottom";

    for (const { datasetIndex, points, color } of series) {
      const meta = chart.getDatasetMeta(datasetIndex);
      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
          if (!computeHighlightLabels.has(point.label)) {
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
        ctx.fillStyle = color;
        ctx.fillText(point.label, labelX, labelY);
      }
    }

    ctx.restore();
  }
};

const chartData: ChartData<"line"> = {
  datasets: [
    {
      label: "Frontier models",
      data: frontierPoints.map((point): ScatterDataPoint => ({ x: point.publicationYear, y: point.trainingFlop })),
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: chartSeriesColor(theme, 0),
      showLine: false,
      pointRadius: frontierPoints.map((point) => (computeHighlightLabels.has(point.label) ? 4.6 : 2.8)),
      pointHoverRadius: 6
    },
    {
      label: "Other notable",
      data: otherPoints.map((point): ScatterDataPoint => ({ x: point.publicationYear, y: point.trainingFlop })),
      borderColor: theme.textMuted,
      backgroundColor: theme.textMuted,
      showLine: false,
      pointRadius: otherPoints.map((point) => (computeHighlightLabels.has(point.label) ? 4 : 2.6)),
      pointHoverRadius: 5
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
      min: 2019,
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
      min: 1e21,
      max: 1e27,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => {
          const numeric = Number(value);
          const exponent = Math.log10(numeric);
          if (!Number.isFinite(exponent) || Math.abs(exponent - Math.round(exponent)) > 0.0001) {
            return "";
          }
          return `10^${Math.round(exponent)}`;
        }
      },
      title: {
        display: true,
        text: "Training compute (FLOP)",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      },
      grid: {
        color: (ctx: { tick: { value: number } }) => {
          const exponent = Math.log10(ctx.tick.value);
          return Number.isFinite(exponent) && Math.abs(exponent - Math.round(exponent)) < 0.0001
            ? theme.border
            : "transparent";
        }
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 400 },
        padding: 12
      }
    },
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
          const point = first.datasetIndex === 0 ? frontierPoints[first.dataIndex] : otherPoints[first.dataIndex];
          return point?.label ?? "";
        },
        label: (item) => {
          const point = item.datasetIndex === 0 ? frontierPoints[item.dataIndex] : otherPoints[item.dataIndex];
          if (!point) {
            return "";
          }
          return `${formatScientific(point.trainingFlop)} FLOP`;
        }
      }
    }
  }
};

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

const costLabelPlugin: Plugin<"line"> = {
  id: "slide35CostLabelsCombo",
  afterDatasetsDraw: (chart) => {
    const meta = chart.getDatasetMeta(0);
    const ctx = chart.ctx;
    const drawn: Array<{ x: number; y: number; width: number; height: number }> = [];

    ctx.save();
    ctx.font = `400 8px ${fonts.data}`;
    ctx.textBaseline = "bottom";
    ctx.fillStyle = chartSeriesColor(theme, 1);

    for (let index = 0; index < costSlide.points.length; index += 1) {
      const point = costSlide.points[index];
      if (!costHighlightLabels.has(point.label)) {
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

const costChartData: ChartData<"line"> = {
  datasets: [
    {
      label: "Training cost (2023 USD)",
      data: costSlide.points.map((point): ScatterDataPoint => ({ x: point.publicationYear, y: point.trainingCost2023Usd })),
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: chartSeriesColor(theme, 1),
      showLine: false,
      pointRadius: costSlide.points.map((point) => (costHighlightLabels.has(point.label) ? 5 : 3)),
      pointHoverRadius: 7
    }
  ]
};

const costChartOptions: ChartOptions<"line"> = {
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
          return costSlide.points[first.dataIndex]?.label ?? "";
        },
        label: (item) => {
          const point = costSlide.points[item.dataIndex];
          if (!point) {
            return "";
          }
          return formatCost(point.trainingCost2023Usd);
        }
      }
    }
  }
};

export function Slide34TrainingCompute() {
  const combinedSourceLine = `Source: ${computeSlide.sourceLine.replace(/^Source:\s*/, "")}; ${costSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader sectionLabel={computeSlide.sectionLabel} title={computeSlide.title} subtitle={computeSlide.subtitle} />
      <div className="slide-combo-layout">
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Training compute growth (FLOP)</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={chartData} options={chartOptions} plugins={[labelPlugin]} />
          </div>
        </section>
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Training cost growth (USD)</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={costChartData} options={costChartOptions} plugins={[costLabelPlugin]} />
          </div>
        </section>
      </div>
      <SourceLine text={combinedSourceLine} />
    </>
  );
}
