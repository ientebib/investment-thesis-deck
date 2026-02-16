import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide57InterconnectionData } from "@/lib/data/slides";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide57InterconnectionData;

const chartData: ChartData<"bar"> = {
  labels: slideData.points.map((point) => point.year.toString()),
  datasets: [
    {
      label: "Active queue capacity (GW)",
      data: slideData.points.map((point) => point.activeQueueGw),
      backgroundColor: slideData.points.map((point) =>
        point.year === 2024 ? theme.negative : chartSeriesColor(theme, 0)
      ),
      borderRadius: 3,
      barPercentage: 0.76
    }
  ]
};

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      }
    },
    y: {
      min: 0,
      max: 3000,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${Number(value).toLocaleString()} GW`
      },
      grid: { color: theme.border }
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
        label: (item) => `${Number(item.parsed.y).toLocaleString()} GW`
      }
    },
    annotation: {
      annotations: {
        declineLabel: {
          type: "label",
          xValue: "2024",
          yValue: 2760,
          content: [slideData.annotationHeading, slideData.annotationDetail],
          color: theme.negative,
          backgroundColor: "transparent",
          font: { family: fonts.data, size: 8, weight: 400 },
          textAlign: "center"
        },
        declineArrow: {
          type: "line",
          xMin: "2024",
          xMax: "2024",
          yMin: 2600,
          yMax: 2360,
          borderColor: theme.negative,
          borderWidth: 1,
          borderDash: [4, 3]
        }
      }
    }
  }
};

export function Slide57InterconnectionQueues() {
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
