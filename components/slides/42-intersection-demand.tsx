import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide42IntersectionDemandData, slide43LaborExposureData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const demandSlide = slide42IntersectionDemandData;
const laborSlide = slide43LaborExposureData;
const labels = demandSlide.inputs.map((input) => `${input.input} (${input.unit})`);
const growthValues = demandSlide.inputs.map((input) => input.growthPct);
const values2024 = demandSlide.inputs.map((input) => input.value2024);
const values2030 = demandSlide.inputs.map((input) => input.value2030);

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

const demandChartData: ChartData<"bar"> = {
  labels,
  datasets: [
    {
      label: "Growth 2024-2030 (%)",
      data: growthValues,
      backgroundColor: chartSeriesColor(theme, 0)
    }
  ]
};

const demandChartOptions: ChartOptions<"bar"> = {
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
            `2024: ${values2024[index]} ${demandSlide.inputs[index]?.unit ?? ""}`,
            `2030: ${values2030[index]} ${demandSlide.inputs[index]?.unit ?? ""}`
          ];
        }
      }
    }
  }
};

const laborLabels = laborSlide.signals.map((signal) => signal.metric);
const laborValues = laborSlide.signals.map((signal) => signal.valuePct);

function laborBarColor(index: number) {
  const signal = laborSlide.signals[index];
  if (!signal) {
    return theme.textMuted;
  }
  return signal.group === "employer" ? chartSeriesColor(theme, 1) : chartSeriesColor(theme, 0);
}

const laborChartData: ChartData<"bar"> = {
  labels: laborLabels,
  datasets: [
    {
      label: "Share (%)",
      data: laborValues,
      backgroundColor: laborValues.map((_, index) => laborBarColor(index))
    }
  ]
};

const laborChartOptions: ChartOptions<"bar"> = {
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
        afterLabel: (item) => laborSlide.signals[item.dataIndex]?.sourceNote ?? ""
      }
    }
  }
};

export function Slide42IntersectionDemand() {
  const combinedSourceLine = `Source: ${demandSlide.sourceLine.replace(/^Source:\s*/, "")}; ${laborSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader
        sectionLabel={demandSlide.sectionLabel}
        title={demandSlide.title}
        subtitle={demandSlide.subtitle}
      />

      <div className="slide-combo-layout">
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Physical-layer input intensity</div>
          <div className="chart-area slide-combo-chart">
            <BarChart data={demandChartData} options={demandChartOptions} plugins={[absoluteLabelsPlugin]} />
          </div>
        </section>
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Labor exposure and automation adoption</div>
          <div className="chart-area slide-combo-chart">
            <BarChart data={laborChartData} options={laborChartOptions} />
          </div>
        </section>
      </div>

      <SourceLine text={combinedSourceLine} />
    </>
  );
}
