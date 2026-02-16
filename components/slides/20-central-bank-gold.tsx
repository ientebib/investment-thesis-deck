import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide20CentralBankGoldData } from "@/lib/data/slides";
import { referenceLine } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide20CentralBankGoldData;

const barColors = slideData.netPurchasesTonnes.map((value, index) => {
  const year = slideData.years[index];
  if (slideData.highlightYears.includes(year)) {
    return chartSeriesColor(theme, 0);
  }
  return value >= 0 ? hexToRgba(chartSeriesColor(theme, 0), 0.78) : hexToRgba(chartSeriesColor(theme, 1), 0.55);
});

const chartData: ChartData<"bar"> = {
  labels: slideData.years.map(String),
  datasets: [
    {
      data: slideData.netPurchasesTonnes,
      backgroundColor: barColors,
      borderColor: barColors,
      borderWidth: 1,
      borderRadius: 2,
      barThickness: 12
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 26, bottom: 4, left: 8 } },
  scales: {
    x: {
      min: -800,
      max: 1200,
      ticks: {
        stepSize: 200,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      },
      grid: { color: theme.border }
    },
    y: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 8, weight: 300 }
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        zeroLine: referenceLine(theme, { axis: "x", value: 0, dash: [], color: chartSeriesColor(theme, 1) }),
        thresholdLine: referenceLine(theme, {
          axis: "x",
          value: 1000,
          label: "1,000t",
          dash: [6, 4],
          color: chartSeriesColor(theme, 0),
          labelPosition: "start"
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
        label: (item) => `${Number(item.raw).toFixed(0)} tonnes`
      }
    }
  }
};

export function Slide20CentralBankGold() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <BarChart data={chartData} options={chartOptions} />
      </div>
      <p className="slide-small-note">{slideData.note}</p>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
