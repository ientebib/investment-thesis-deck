import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide23MineLeadTimesData,
  slide25MineralDemandData
} from "@/lib/data/slides";
import { chartSeriesColor, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";
import {
  pitchAxisFont,
  pitchTooltip,
  pitchLegend,
  pitchLegendFont
} from "@/lib/pitchChartDefaults";

/* ─── Left panel: Mining timelines horizontal bar ─── */

const mineData = slide23MineLeadTimesData;

const mineChartData: ChartData<"bar"> = {
  labels: mineData.periods,
  datasets: [
    {
      label: "Years to production",
      data: mineData.yearsToProduction,
      backgroundColor: mineData.periods.map((p) =>
        p === mineData.projectedPeriod
          ? hexToRgba(chartSeriesColor(theme, 1), 0.7)
          : chartSeriesColor(theme, 0)
      ),
      borderColor: mineData.periods.map((p) =>
        p === mineData.projectedPeriod
          ? chartSeriesColor(theme, 1)
          : chartSeriesColor(theme, 0)
      ),
      borderWidth: 1
    }
  ]
};

const mineMaxValue = Math.max(...mineData.yearsToProduction);

const mineOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 16, bottom: 2, left: 4 } },
  scales: {
    x: {
      beginAtZero: true,
      max: Math.ceil(mineMaxValue / 5) * 5 + 5,
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `${v} yr`
      },
      grid: { color: theme.border }
    },
    y: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${Number(item.raw).toFixed(1)} years to production`
      }
    }
  }
};

/* ─── Right panel: Critical mineral demand grouped bar ─── */

const mineralData = slide25MineralDemandData;

const mineralChartData: ChartData<"bar"> = {
  labels: mineralData.minerals,
  datasets: [
    {
      label: "2024",
      data: mineralData.index2024,
      backgroundColor: hexToRgba(theme.textMuted, 0.5)
    },
    {
      label: "2030",
      data: mineralData.index2030,
      backgroundColor: chartSeriesColor(theme, 1)
    },
    {
      label: "2040",
      data: mineralData.index2040,
      backgroundColor: chartSeriesColor(theme, 0)
    }
  ]
};

const mineralMax = Math.max(...mineralData.index2040) + 50;

const mineralOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    },
    y: {
      beginAtZero: true,
      max: mineralMax,
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `${v}`
      },
      title: {
        display: true,
        text: "Index (2024 = 100)",
        color: theme.textMuted,
        font: pitchAxisFont
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    legend: {
      ...pitchLegend,
    },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(0)} (index)`
      }
    }
  }
};

export function PitchSlide08Supply() {
  return (
    <>
      <SectionHeader
        sectionLabel="SUPPLY CONSTRAINTS"
        title="Mine development timelines have tripled while demand from electrification and AI accelerates"
        subtitle="~27% copper deficit by 2035 even if every announced project proceeds"
      />

      <div className="pitch-dual-panel">
        <div className="pitch-panel">
          <div className="pitch-panel-label">Mine development timelines (years to production)</div>
          <div className="pitch-panel-chart">
            <BarChart data={mineChartData} options={mineOptions} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">Critical mineral demand outlook (index, 2024 = 100)</div>
          <div className="pitch-panel-chart">
            <BarChart data={mineralChartData} options={mineralOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: S&P Global Market Intelligence; IEA Global Critical Minerals Outlook 2025." tight />
    </>
  );
}
