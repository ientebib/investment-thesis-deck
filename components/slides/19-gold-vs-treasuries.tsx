import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide19GoldTreasuriesData, slide20CentralBankGoldData } from "@/lib/data/slides";
import { calloutLabel, referenceLine } from "@/lib/annotationStyles";
import { hexToRgba } from "@/lib/chartUtils";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";

const reservesSlide = slide19GoldTreasuriesData;
const centralBankSlide = slide20CentralBankGoldData;

/* Find the first index where gold overtakes treasuries */
const crossoverIndex = reservesSlide.goldHoldingsTrillions.findIndex(
  (gold, i) => gold >= reservesSlide.treasuryHoldingsTrillions[i]
);

const reservesChartData: ChartData<"line"> = {
  labels: reservesSlide.dates,
  datasets: [
    {
      label: "Gold Holdings",
      data: reservesSlide.goldHoldingsTrillions,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.25
    },
    {
      label: "Treasury Holdings",
      data: reservesSlide.treasuryHoldingsTrillions,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      fill: false,
      tension: 0.25
    }
  ]
};

const reservesChartOptions: ChartOptions<"line"> = {
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
          const date = reservesSlide.dates[index];
          return date?.endsWith("-01-01") ? date.slice(0, 4) : "";
        }
      }
    },
    y: {
      min: 1,
      max: 6,
      ticks: {
        stepSize: 0.5,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `$${value}T`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        ...(crossoverIndex >= 0
          ? {
              crossoverLine: {
                type: "line" as const,
                xMin: crossoverIndex,
                xMax: crossoverIndex,
                yMin: reservesSlide.goldHoldingsTrillions[crossoverIndex] - 0.4,
                yMax: reservesSlide.goldHoldingsTrillions[crossoverIndex] + 0.4,
                borderColor: theme.textPrimary,
                borderWidth: 1,
                borderDash: [3, 2]
              },
              crossover: {
                ...calloutLabel(theme, {
                  xValue: crossoverIndex,
                  yValue: reservesSlide.goldHoldingsTrillions[crossoverIndex] + 0.6,
                  content: ["Gold overtakes Treasuries"],
                  color: theme.textPrimary,
                  fontSize: 9,
                  fontWeight: 500
                }),
                backgroundColor: "rgba(255,255,255,0.8)",
                padding: 3
              }
            }
          : {})
      }
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "line",
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 400 },
        padding: 10,
        boxWidth: 20
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        title: (items) => items[0]?.label ?? "",
        label: (item) => `${item.dataset.label}: $${Number(item.raw).toFixed(2)}T`
      }
    }
  }
};

const centralBankBarColors = centralBankSlide.netPurchasesTonnes.map((value, index) => {
  const year = centralBankSlide.years[index];
  if (centralBankSlide.highlightYears.includes(year)) {
    return chartSeriesColor(theme, 0);
  }
  return value >= 0 ? hexToRgba(chartSeriesColor(theme, 0), 0.78) : hexToRgba(chartSeriesColor(theme, 1), 0.55);
});

const centralBankChartData: ChartData<"bar"> = {
  labels: centralBankSlide.years.map(String),
  datasets: [
    {
      data: centralBankSlide.netPurchasesTonnes,
      backgroundColor: centralBankBarColors,
      borderColor: centralBankBarColors,
      borderWidth: 1,
      borderRadius: 2,
      barThickness: 12
    }
  ]
};

const centralBankChartOptions: ChartOptions<"bar"> = {
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

export function Slide19GoldVsTreasuries() {
  const combinedSourceLine = `Source: ${reservesSlide.sourceLine.replace(/^Source:\s*/, "")}; ${centralBankSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader
        sectionLabel={reservesSlide.sectionLabel}
        title={reservesSlide.title}
        subtitle={reservesSlide.subtitle}
      />
      <div className="slide-combo-layout">
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Gold vs Treasuries in central-bank reserves</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={reservesChartData} options={reservesChartOptions} />
          </div>
        </section>
        <section className="slide-combo-panel">
          <div className="slide-combo-label">Central-bank net gold purchases (tonnes)</div>
          <div className="chart-area slide-combo-chart">
            <BarChart data={centralBankChartData} options={centralBankChartOptions} />
          </div>
          <p className="slide-small-note">{centralBankSlide.note}</p>
        </section>
      </div>
      <SourceLine text={combinedSourceLine} />
    </>
  );
}
