import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide13GlobalRepricingData } from "@/lib/data/slides";
import { eventLine } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide13GlobalRepricingData;

function dateIndex(date: string) {
  return slideData.dates.findIndex((value) => value === date);
}

function dateTickLabel(date: string) {
  if (!date.endsWith("-01")) {
    return "";
  }
  const year = Number.parseInt(date.slice(0, 4), 10);
  return year % 2 === 0 ? String(year) : "";
}

function sharedOptions(
  leftMax: number,
  rightMin: number,
  rightMax: number,
  leftSuffix: string,
  rightPrefix: string,
  annotationLines: Array<{ index: number; label: string }>
): ChartOptions<"line"> {
  const annotations = annotationLines.reduce<Record<string, object>>((acc, line, idx) => {
    if (line.index < 0) {
      return acc;
    }
    acc[`line_${idx}`] = eventLine(theme, { xValue: line.index, label: line.label });
    return acc;
  }, {});

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    layout: { padding: { top: 10, right: 10, bottom: 2, left: 8 } },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: theme.textTertiary,
          font: { family: fonts.data, size: 8, weight: 300 },
          maxRotation: 0,
          autoSkip: false,
          callback: (_, index) => dateTickLabel(slideData.dates[index])
        }
      },
      y: {
        position: "left",
        min: 0,
        max: leftMax,
        grid: { color: theme.border },
        ticks: {
          color: theme.textTertiary,
          font: { family: fonts.data, size: 8, weight: 300 },
          callback: (value) => `${value}${leftSuffix}`
        }
      },
      y1: {
        position: "right",
        min: rightMin,
        max: rightMax,
        grid: { display: false },
        ticks: {
          color: theme.textMuted,
          font: { family: fonts.data, size: 8, weight: 300 },
          callback: (value) => `${rightPrefix}${value}`
        }
      }
    },
    plugins: {
      annotation: { annotations },
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "line",
          color: theme.textTertiary,
          font: { family: fonts.data, size: 8, weight: 400 },
          padding: 8,
          boxWidth: 16
        }
      },
      tooltip: {
        backgroundColor: theme.surface3,
        titleColor: theme.textPrimary,
        bodyColor: theme.textSecondary,
        titleFont: { family: fonts.data, size: 10, weight: 400 },
        bodyFont: { family: fonts.data, size: 10, weight: 400 }
      }
    }
  };
}

const japanData: ChartData<"line"> = {
  labels: slideData.dates,
  datasets: [
    {
      label: "10Y Yield (%)",
      data: slideData.japan10y,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.16),
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25,
      fill: true,
      yAxisID: "y"
    },
    {
      label: "JPY/USD",
      data: slideData.jpyusd,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 1.4,
      borderDash: [5, 3],
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25,
      yAxisID: "y1"
    }
  ]
};

const ukData: ChartData<"line"> = {
  labels: slideData.dates,
  datasets: [
    {
      label: "10Y Gilt (%)",
      data: slideData.uk10y,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.16),
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25,
      fill: true,
      yAxisID: "y"
    },
    {
      label: "GBP/USD",
      data: slideData.gbpusd,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 1.4,
      borderDash: [5, 3],
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.25,
      yAxisID: "y1"
    }
  ]
};

const japanOptions = sharedOptions(2.5, 70, 165, "%", "¥", [
  { index: dateIndex(slideData.yccAdjustmentDate), label: "YCC adj." }
]);

const ukOptions = sharedOptions(5, 1, 1.8, "%", "$", [
  { index: dateIndex(slideData.brexitDate), label: "Brexit" },
  { index: dateIndex(slideData.trussDate), label: "Truss" }
]);

export function Slide13GlobalRepricing() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="global-repricing-layout">
        <section className="global-repricing-panel">
          <div className="global-repricing-label">Japan</div>
          <div className="chart-area global-repricing-chart">
            <LineChart data={japanData} options={japanOptions} />
          </div>
        </section>
        <section className="global-repricing-panel">
          <div className="global-repricing-label">United Kingdom</div>
          <div className="chart-area global-repricing-chart">
            <LineChart data={ukData} options={ukOptions} />
          </div>
        </section>
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
