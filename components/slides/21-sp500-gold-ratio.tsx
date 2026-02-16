import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide21SpGoldRatioData } from "@/lib/data/slides";
import { calloutLabel } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide21SpGoldRatioData;

const chartData: ChartData<"line"> = {
  labels: slideData.dates,
  datasets: [
    {
      label: "S&P 500 / Gold Ratio (Q1 2006 = 100)",
      data: slideData.ratio,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.18),
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: true,
      tension: 0.25
    }
  ]
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        maxRotation: 0,
        autoSkip: false,
        callback: (_, index) => {
          const date = slideData.dates[index];
          return date?.endsWith("-01-01") ? date.slice(0, 4) : "";
        }
      }
    },
    y: {
      min: 30,
      max: 110,
      ticks: {
        stepSize: 10,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        lehman: {
          ...calloutLabel(theme, {
            xValue: slideData.dates.findIndex((d) => d.startsWith("2008-10")),
            yValue: 66,
            content: ["Lehman"],
            color: theme.textPrimary,
            fontSize: 9,
            fontWeight: 500
          }),
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: 3
        },
        downgrade: {
          ...calloutLabel(theme, {
            xValue: slideData.dates.findIndex((d) => d.startsWith("2011-07")),
            yValue: 50,
            content: ["US Downgrade"],
            color: theme.textPrimary,
            fontSize: 9,
            fontWeight: 500
          }),
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: 3
        },
        covid: {
          ...calloutLabel(theme, {
            xValue: slideData.dates.findIndex((d) => d.startsWith("2020-04")),
            yValue: 70,
            content: ["Covid-19"],
            color: theme.textPrimary,
            fontSize: 9,
            fontWeight: 500
          }),
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: 3
        },
        liberation: {
          ...calloutLabel(theme, {
            xValue: slideData.dates.findIndex((d) => d.startsWith("2025-04")),
            yValue: 67,
            content: ["Liberation Day"],
            color: theme.textPrimary,
            fontSize: 9,
            fontWeight: 500
          }),
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: 3
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
        label: (item) => `Ratio: ${Number(item.raw).toFixed(1)}`
      }
    }
  }
};

export function Slide21Sp500GoldRatio() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <LineChart data={chartData} options={chartOptions} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
