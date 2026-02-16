import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide44FiscalPathData } from "@/lib/data/slides";
import { referenceLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide44FiscalPathData;

const chartData: ChartData<"bar"> = {
  labels: slideData.almpSeries.map((point) => point.country),
  datasets: [
    {
      label: "% of GDP",
      data: slideData.almpSeries.map((point) => point.pctGdp),
      backgroundColor: slideData.almpSeries.map((point) => (point.isUs ? theme.negative : chartSeriesColor(theme, 0)))
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 36, bottom: 4, left: 4 } },
  scales: {
    x: {
      min: 0,
      max: 2.2,
      ticks: {
        stepSize: 0.5,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${Number(value).toFixed(1)}%`
      },
      title: {
        display: true,
        text: "% of GDP",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
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
        oecdAverage: referenceLine(theme, {
          axis: "x",
          value: slideData.oecdAveragePct,
          label: `OECD avg: ${slideData.oecdAveragePct}%`,
          dash: [6, 4]
        })
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
        label: (item) => `${Number(item.raw).toFixed(2)}% of GDP`
      }
    }
  }
};

function toneClass(tone: "primary" | "secondary") {
  return tone === "primary" ? "exec-summary-primary-tone" : "exec-summary-secondary-tone";
}

export function Slide44FiscalPath() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <p className="thesis-panel-description">{slideData.body}</p>

      <div className="global-repricing-layout">
        <section className="global-repricing-panel">
          <h3 className="global-repricing-label">{slideData.chartLabel}</h3>
          <div className="chart-area global-repricing-chart">
            <BarChart data={chartData} options={chartOptions} />
          </div>
        </section>

        <section className="global-repricing-panel">
          <div className="exec-summary-thesis-stack exec-summary-thesis-stack--spread">
            {slideData.cards.map((card) => (
              <article key={card.title} className="exec-summary-intersection-card">
                <h3 className={`exec-summary-intersection-title ${toneClass(card.tone)}`}>{card.title}</h3>
                <p className="exec-summary-intersection-body">
                  {card.metric} <span className="exec-summary-intersection-conclusion">{card.supportingLabel}</span>
                </p>
                <p className="commodities-reshoring-body">{card.body}</p>
                <p className="adoption-card-detail">{card.source}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
