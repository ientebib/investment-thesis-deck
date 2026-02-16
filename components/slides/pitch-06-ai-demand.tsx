import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide37HyperscalerCapexData,
  slide38DatacenterBuildoutData
} from "@/lib/data/slides";
import { calloutLabel, projectionDivider } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";
import {
  pitchAxisFont,
  pitchTooltip,
  pitchLegend,
  pitchAnnotationFont
} from "@/lib/pitchChartDefaults";

/* ─── Left panel: Hyperscaler Capex stacked bar ─── */

const capexData = slide37HyperscalerCapexData;

const capexChartData: ChartData<"bar"> = {
  labels: capexData.years,
  datasets: [
    { label: "Amazon", data: capexData.amazonCapexUsdBillions, backgroundColor: chartSeriesColor(theme, 0) },
    { label: "Alphabet", data: capexData.alphabetCapexUsdBillions, backgroundColor: theme.textMuted },
    { label: "Meta", data: capexData.metaCapexUsdBillions, backgroundColor: chartSeriesColor(theme, 1) },
    { label: "Microsoft", data: capexData.microsoftCapexUsdBillions, backgroundColor: theme.secondaryLight }
  ]
};

const capexOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: pitchAxisFont
      }
    },
    y: {
      stacked: true,
      beginAtZero: true,
      max: 700,
      ticks: {
        stepSize: 200,
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `$${v}B`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        capexCallout: calloutLabel(theme, {
          xValue: "2026E",
          yValue: 640,
          content: "~$600B+",
          color: chartSeriesColor(theme, 1),
          fontSize: pitchAnnotationFont.size,
          fontWeight: 500,
          xAdjust: -54
        })
      }
    },
    legend: {
      ...pitchLegend,
    },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${item.dataset.label}: $${Number(item.raw).toFixed(0)}B`
      }
    }
  }
};

/* ─── Right panel: Datacenter power ─── */

const dcData = slide38DatacenterBuildoutData;
const dcProjection = projectionDivider(theme, {
  xValue: "2025",
  actualLabel: "ACTUAL",
  projectedLabel: "PROJECTED"
});

const dcChartData: ChartData<"line"> = {
  labels: dcData.years,
  datasets: [
    {
      label: "Actual",
      data: dcData.actualGw,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 0), 0.14),
      fill: true,
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 4,
      tension: 0.28,
      spanGaps: false
    },
    {
      label: "Projected",
      data: dcData.projectedGw,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.14),
      fill: true,
      borderDash: [5, 3],
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 4,
      pointStyle: "triangle",
      tension: 0.28,
      spanGaps: false
    }
  ]
};

const dcOptions: ChartOptions<"line"> = {
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
      max: 140,
      ticks: {
        stepSize: 40,
        color: theme.textTertiary,
        font: pitchAxisFont,
        callback: (v) => `${v} GW`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        dcProjectionLine: dcProjection.line,
        dcActualLabel: dcProjection.actualLabel,
        dcCallout: calloutLabel(theme, {
          xValue: "2029",
          yValue: 122,
          content: "120 GW ≈ Japan's entire electricity consumption",
          color: chartSeriesColor(theme, 1),
          fontSize: pitchAnnotationFont.size,
          fontWeight: 500,
          xAdjust: -100
        })
      }
    },
    legend: { display: false },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)} GW`
      }
    }
  }
};

export function PitchSlide06AiDemand() {
  return (
    <>
      <SectionHeader
        sectionLabel="AI INFRASTRUCTURE"
        title="The largest companies in history are building physical AI infrastructure at unprecedented scale"
        subtitle="Hyperscaler capex $36B (2016) → $600B+ (2026)"
      />

      <div className="pitch-dual-panel">
        <div className="pitch-panel">
          <div className="pitch-panel-label">Hyperscaler capex ($B, stacked)</div>
          <div className="pitch-panel-chart">
            <BarChart data={capexChartData} options={capexOptions} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">Operational AI datacenter power (GW)</div>
          <div className="pitch-panel-chart">
            <LineChart data={dcChartData} options={dcOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: Company filings; Bloomberg; SemiAnalysis; RAND (compiled Feb 2026)." tight />
    </>
  );
}
