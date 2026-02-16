import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide12TermPremiumData } from "@/lib/data/slides";
import { recessionBox } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const slideData = slide12TermPremiumData;

function monthYearLabel(date: string) {
  const [year, month] = date.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = Number.parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

function dateIndex(date: string) {
  return slideData.dates.findIndex((value) => value === date);
}

function buildRecessionAnnotations() {
  const result: Record<string, object> = {};
  slideData.recessionPeriods.forEach((period, i) => {
    const start = dateIndex(period.start);
    const end = dateIndex(period.end);
    if (start >= 0 && end >= 0) {
      result[`recession_${i}`] = recessionBox(theme, { xMin: start, xMax: end });
    }
  });
  return result;
}

const chartData: ChartData<"line"> = {
  labels: slideData.dates,
  datasets: [
    {
      label: "10Y Term Premium",
      data: slideData.values,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.18),
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.3,
      fill: {
        target: { value: 0 },
        above: hexToRgba(chartSeriesColor(theme, 0), 0.18),
        below: hexToRgba(theme.negative, 0.14)
      }
    }
  ]
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 12, right: 16, bottom: 4, left: 8 } },
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
          if (!date?.endsWith("-01-01")) {
            return "";
          }
          const year = Number.parseInt(date.slice(0, 4), 10);
          return year % 2 === 0 ? String(year) : "";
        }
      }
    },
    y: {
      min: -1,
      max: 2,
      ticks: {
        stepSize: 0.5,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${Number(value).toFixed(1)}%`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: buildRecessionAnnotations()
    },
    legend: { display: false },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        title: (items) => monthYearLabel(items[0]?.label ?? ""),
        label: (item) => `Term Premium: ${Number(item.raw).toFixed(4)}%`
      }
    }
  }
};

export function Slide12TermPremium() {
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
