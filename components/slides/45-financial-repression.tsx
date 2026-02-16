import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide45FinancialRepressionData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide45FinancialRepressionData;
const values = slideData.returns.map((point) => point.realReturnPct);

const valueLabelsPlugin: Plugin<"bar"> = {
  id: "slide45ValueLabels",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.textBaseline = "middle";
    ctx.font = `500 10px ${fonts.data}`;

    for (let index = 0; index < meta.data.length; index += 1) {
      const bar = meta.data[index];
      const value = values[index];
      if (!bar || value === undefined) {
        continue;
      }

      const text = `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
      const textAlign = value >= 0 ? "left" : "right";
      const x = value >= 0 ? bar.x + 8 : bar.x - 8;

      ctx.textAlign = textAlign;
      ctx.fillStyle = value < 0 ? theme.negative : theme.primaryDark;
      ctx.fillText(text, x, bar.y);
    }

    ctx.restore();
  }
};

const chartData: ChartData<"bar"> = {
  labels: slideData.returns.map((point) => point.asset),
  datasets: [
    {
      label: "Real annualized return (%)",
      data: values,
      backgroundColor: values.map((value) => (value < 0 ? theme.negative : chartSeriesColor(theme, 0)))
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 28, bottom: 4, left: 4 } },
  scales: {
    x: {
      min: -4,
      max: 9,
      ticks: {
        stepSize: 2,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${Number(value) > 0 ? "+" : ""}${value}%`
      },
      grid: { color: theme.border }
    },
    y: {
      ticks: {
        color: theme.textSecondary,
        font: { family: fonts.data, size: 9, weight: 400 }
      },
      grid: { display: false }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        zeroLine: {
          type: "line",
          xMin: 0,
          xMax: 0,
          borderColor: theme.textMuted,
          borderDash: [5, 4],
          borderWidth: 1.2
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
        label: (item) => `Real return: ${Number(item.raw) > 0 ? "+" : ""}${Number(item.raw).toFixed(1)}% per year`
      }
    }
  }
};

export function Slide45FinancialRepression() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <p className="thesis-panel-description">{slideData.body}</p>

      <div className="global-repricing-layout">
        <section className="global-repricing-panel">
          <h3 className="global-repricing-label">{slideData.chartLabel}</h3>
          <div className="chart-area global-repricing-chart">
            <BarChart data={chartData} options={chartOptions} plugins={[valueLabelsPlugin]} />
          </div>
        </section>

        <section className="global-repricing-panel">
          <div className="exec-summary-thesis-stack">
            <article className="exec-summary-intersection-card">
              <h3 className="exec-summary-intersection-title exec-summary-primary-tone">{slideData.precedentTitle}</h3>
              <p className="exec-summary-intersection-body">
                {slideData.precedentMetricFrom} to {slideData.precedentMetricTo}
              </p>
              <p className="commodities-reshoring-body">{slideData.precedentBody}</p>
            </article>

            <article className="exec-summary-intersection-card">
              <h3 className="exec-summary-intersection-title exec-summary-secondary-tone">{slideData.todayTitle}</h3>
              <p className="exec-summary-intersection-body">{slideData.todayMetric}</p>
              <p className="commodities-reshoring-body">{slideData.todayBody}</p>
            </article>
          </div>
        </section>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
