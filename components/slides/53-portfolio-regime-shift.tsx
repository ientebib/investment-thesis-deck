import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide53RegimeShiftData } from "@/lib/data/slides";
import { calloutLabel } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide53RegimeShiftData;

const medianLabelPlugin: Plugin<"bar"> = {
  id: "slide53MedianLabels",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.font = `500 8px ${fonts.data}`;
    ctx.fillStyle = theme.textSecondary;
    ctx.textBaseline = "middle";

    slideData.buckets.forEach((bucket, index) => {
      const bar = meta.data[index];
      if (!bar) {
        return;
      }
      const text = `${bucket.medianPct > 0 ? "+" : ""}${bucket.medianPct.toFixed(1)}%`;
      const x = bucket.medianPct >= 0 ? bar.x + 6 : bar.x - 34;
      ctx.fillText(text, x, bar.y);
    });

    ctx.restore();
  }
};

const chartData: ChartData<"bar"> = {
  labels: slideData.buckets.map((bucket) => bucket.bucket),
  datasets: [
    {
      label: "Median next 10Y annualized real return",
      data: slideData.buckets.map((bucket) => bucket.medianPct),
      backgroundColor: slideData.buckets.map((bucket, index) => {
        if (bucket.medianPct < 0) {
          return theme.negative;
        }
        return index < 4 ? chartSeriesColor(theme, 0) : chartSeriesColor(theme, 1);
      })
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 14, bottom: 4, left: 4 } },
  scales: {
    x: {
      min: -6,
      max: 12,
      ticks: {
        stepSize: 2,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}%`
      },
      title: {
        display: true,
        text: "Next 10-year annualized real total return",
        color: theme.textMuted,
        font: { family: fonts.data, size: 9, weight: 400 }
      },
      grid: {
        color: (context) => (context.tick.value === 0 ? theme.textMuted : theme.border)
      }
    },
    y: {
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      },
      grid: { display: false }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        currentBucketLabel: {
          ...calloutLabel(theme, {
            xValue: 2.6,
            yValue: "40+",
            content: ["WE ARE HERE", `Current CAPE: ${slideData.currentCape.toFixed(2)}`],
            color: theme.textPrimary,
            fontSize: 8
          }),
          backgroundColor: theme.surface3,
          borderColor: theme.border,
          borderWidth: 1,
          padding: 4,
          yAdjust: -14
        },
        currentBucketArrow: {
          type: "line",
          xMin: 1.3,
          xMax: -2.7,
          yMin: "40+",
          yMax: "40+",
          borderColor: theme.textMuted,
          borderDash: [5, 3],
          borderWidth: 1
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
        label: (item) => {
          const bucket = slideData.buckets[item.dataIndex];
          if (!bucket) {
            return "";
          }
          return `Median: ${bucket.medianPct.toFixed(2)}%`;
        },
        afterLabel: (item) => {
          const bucket = slideData.buckets[item.dataIndex];
          if (!bucket) {
            return [];
          }
          return [
            `IQR: ${bucket.p25Pct.toFixed(2)}% to ${bucket.p75Pct.toFixed(2)}%`,
            `Observations: ${bucket.observations}`
          ];
        }
      }
    }
  }
};

export function Slide53PortfolioRegimeShift() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="valuation-layout">
        <section className="valuation-main-card">
          <h3 className="global-repricing-label">{slideData.chartLabel}</h3>
          <div className="chart-area valuation-chart-area">
            <BarChart data={chartData} options={chartOptions} plugins={[medianLabelPlugin]} />
          </div>
          <p className="adoption-card-detail">
            Bars show median next 10-year annualized real return by starting CAPE bucket. Tooltips include
            interquartile range and sample count.
          </p>
        </section>

        <section className="valuation-side-stack">
          <div className="fs-col fs-col--inline">
            <div className="fs-section">
              <div className="fs-section-header">{slideData.tableTitle}</div>
              <div className="fs-snapshot-header">
                <span className="fs-snapshot-metric-label">Metric</span>
                <span className="fs-snapshot-col-label">Current</span>
                <span className="fs-snapshot-col-label">Long-run Mean</span>
                <span className="fs-snapshot-col-label">Signal</span>
              </div>
              {slideData.snapshotRows.map((row) => (
                <div key={row.metric} className="fs-snapshot-row">
                  <span className="fs-term">{row.metric}</span>
                  <span className="fs-def">{row.current}</span>
                  <span className="fs-def">{row.longRunMean}</span>
                  <span className={`fs-def ${row.tone === "negative" ? "semantic-negative" : ""}`}>{row.signal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fs-col fs-col--inline">
            <div className="fs-section">
              <div className="fs-section-header">{slideData.whereWeAreTitle}</div>
              <div className="fs-callout-body">
                <span className="fs-callout-metric">{slideData.whereWeAreMetric}</span>
                <span className="fs-callout-text">{slideData.whereWeAreBody}</span>
              </div>
            </div>
          </div>

          <div className="fs-col fs-col--inline">
            <div className="fs-section">
              <div className="fs-section-header">{slideData.implicationTitle}</div>
              <div className="fs-callout-body">
                <span className="fs-callout-text">{slideData.implicationBody}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
