import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide24MineralConcentrationData } from "@/lib/data/slides";
import { referenceLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide24MineralConcentrationData;

const chartData: ChartData<"bar"> = {
  labels: slideData.minerals,
  datasets: [
    {
      data: slideData.refiningSharePct,
      backgroundColor: slideData.refiningSharePct.map((_, i) => chartSeriesColor(theme, i % 6)),
      borderWidth: 0,
      barThickness: 12
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      min: 0,
      max: 100,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}%`
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
        fullRelianceLine: referenceLine(theme, { axis: "x", value: 100, label: "100%", labelPosition: "start" })
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
        label: (item) => `${Number(item.raw).toFixed(0)}% refining share`
      }
    }
  }
};

export function Slide24MineralConcentration() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="chart-area">
        <BarChart data={chartData} options={chartOptions} />
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
