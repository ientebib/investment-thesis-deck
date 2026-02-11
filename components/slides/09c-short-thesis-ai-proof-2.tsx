import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide34TrainingComputeData,
  slide36HardwareData,
  slide37HyperscalerCapexData,
  slide38DatacenterBuildoutData
} from "@/lib/data/slides";
import { calloutLabel, projectionDivider } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const tooltipBase = {
  enabled: true,
  backgroundColor: theme.surface3,
  titleColor: theme.textPrimary,
  bodyColor: theme.textSecondary,
  titleFont: { family: fonts.data, size: 9, weight: 400 as const },
  bodyFont: { family: fonts.data, size: 9, weight: 400 as const }
};

function formatScientific(value: number) {
  const exponent = Math.floor(Math.log10(value));
  const mantissa = value / 10 ** exponent;
  return `${mantissa.toFixed(1)} x 10^${exponent}`;
}

/* ─── Chart 1: Training compute (scatter style) ─── */

const computeData = slide34TrainingComputeData;
const computeHighlightLabels = new Set(["GPT-3", "GPT-4", "GPT-5", "Gemini Ultra", "Claude 3.7 Sonnet", "Grok 4"]);

const frontierCompute = computeData.points
  .filter((p) => p.group === "frontier")
  .map((p) => ({ x: p.publicationYear, y: p.trainingFlop, label: p.label }))
  .sort((a, b) => a.x - b.x);
const otherCompute = computeData.points
  .filter((p) => p.group === "other")
  .map((p) => ({ x: p.publicationYear, y: p.trainingFlop, label: p.label }))
  .sort((a, b) => a.x - b.x);

const computeChartData: ChartData<"line"> = {
  datasets: [
    {
      label: "Frontier",
      data: frontierCompute,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: chartSeriesColor(theme, 0),
      showLine: false,
      pointRadius: frontierCompute.map((p) => (computeHighlightLabels.has(p.label) ? 3.2 : 2.0)),
      pointHoverRadius: 4.2
    },
    {
      label: "Other",
      data: otherCompute,
      borderColor: theme.textMuted,
      backgroundColor: theme.textMuted,
      showLine: false,
      pointRadius: otherCompute.map((p) => (computeHighlightLabels.has(p.label) ? 2.8 : 1.8)),
      pointHoverRadius: 3.8
    }
  ]
};

const computeOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "nearest", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      type: "linear",
      min: 2019,
      max: 2026,
      ticks: {
        stepSize: 1,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => String(Math.round(Number(v)))
      },
      grid: { color: theme.border }
    },
    y: {
      type: "logarithmic",
      min: 1e21,
      max: 1e27,
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (value) => {
          const numeric = Number(value);
          const exponent = Math.log10(numeric);
          if (!Number.isFinite(exponent) || Math.abs(exponent - Math.round(exponent)) > 0.0001) return "";
          return `10^${Math.round(exponent)}`;
        }
      },
      grid: {
        color: (ctx: { tick: { value: number } }) => {
          const exponent = Math.log10(ctx.tick.value);
          return Number.isFinite(exponent) && Math.abs(exponent - Math.round(exponent)) < 0.0001
            ? theme.border
            : "transparent";
        }
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        computeCallout: calloutLabel(theme, {
          xValue: 2025.6,
          yValue: 6.6e25,
          content: "GPT-5 scale",
          color: chartSeriesColor(theme, 0),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -58
        })
      }
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: theme.textPrimary,
        font: { family: fonts.data, size: 8, weight: 400 },
        boxWidth: 6,
        padding: 6
      }
    },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        title: (items) => (items[0]?.raw as { label?: string })?.label ?? "",
        label: (item) => formatScientific(Number((item.raw as { y: number }).y))
      }
    }
  }
};

/* ─── Chart 2: Hyperscaler Capex ─── */

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
        font: { family: fonts.data, size: 7, weight: 300 }
      }
    },
    y: {
      stacked: true,
      beginAtZero: true,
      max: 700,
      ticks: {
        stepSize: 200,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
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
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -48
        })
      }
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: theme.textPrimary,
        font: { family: fonts.data, size: 8, weight: 400 },
        boxWidth: 6,
        padding: 6
      }
    },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => `${item.dataset.label}: $${Number(item.raw).toFixed(0)}B`
      }
    }
  }
};

/* ─── Chart 3: Shipments and spend (actual/projected) ─── */

const hwData = slide36HardwareData;
const hwProjectionStartYear = "2026";
const hwProjectionStartIndex = hwData.years.findIndex((year) => year === hwProjectionStartYear);

const hwActualShipments = hwData.shipmentsMillionUnits.map((v, i) => (i < hwProjectionStartIndex ? v : null));
const hwProjectedShipments = hwData.shipmentsMillionUnits.map((v, i) => (i >= hwProjectionStartIndex - 1 ? v : null));
const hwActualCost = hwData.costUsdBillions.map((v, i) => (i < hwProjectionStartIndex ? v : null));
const hwProjectedCost = hwData.costUsdBillions.map((v, i) => (i >= hwProjectionStartIndex - 1 ? v : null));

const hwProjection = projectionDivider(theme, {
  xValue: "2025",
  actualLabel: "ACTUAL",
  projectedLabel: "PROJECTED"
});

const hwChartData: ChartData<"line"> = {
  labels: hwData.years,
  datasets: [
    {
      label: "Shipments actual",
      data: hwActualShipments,
      borderColor: chartSeriesColor(theme, 0),
      yAxisID: "y",
      borderWidth: 1.8,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.24,
      spanGaps: false
    },
    {
      label: "Shipments projected",
      data: hwProjectedShipments,
      borderColor: chartSeriesColor(theme, 0),
      yAxisID: "y",
      borderWidth: 1.8,
      borderDash: [5, 3],
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.24,
      spanGaps: false
    },
    {
      label: "Cost actual",
      data: hwActualCost,
      borderColor: chartSeriesColor(theme, 1),
      yAxisID: "y1",
      borderWidth: 1.8,
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.24,
      spanGaps: false
    },
    {
      label: "Cost projected",
      data: hwProjectedCost,
      borderColor: chartSeriesColor(theme, 1),
      yAxisID: "y1",
      borderWidth: 1.8,
      borderDash: [5, 3],
      pointRadius: 2,
      pointHoverRadius: 3,
      tension: 0.24,
      spanGaps: false
    }
  ]
};

const hwOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: theme.textTertiary, font: { family: fonts.data, size: 7, weight: 300 } }
    },
    y: {
      position: "left",
      beginAtZero: true,
      max: 40,
      ticks: {
        stepSize: 10,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `${v}M`
      },
      grid: { color: theme.border }
    },
    y1: {
      position: "right",
      beginAtZero: true,
      max: 400,
      ticks: {
        stepSize: 100,
        color: theme.textMuted,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `$${v}B`
      },
      grid: { drawOnChartArea: false }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        hwProjectionLine: hwProjection.line,
        hwActualLabel: hwProjection.actualLabel,
        hwCallout: calloutLabel(theme, {
          xValue: "2028",
          yValue: 34,
          content: "35M units / $350B",
          color: chartSeriesColor(theme, 0),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -84
        })
      }
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "line",
        color: theme.textPrimary,
        font: { family: fonts.data, size: 8, weight: 400 },
        boxWidth: 12,
        padding: 6,
        filter: (item) => item.text.includes("actual") || item.text.includes("projected")
      }
    },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => {
          const value = Number(item.raw);
          if (item.datasetIndex <= 1) return `${item.dataset.label}: ${value.toFixed(2)}M`;
          return `${item.dataset.label}: $${value.toFixed(0)}B`;
        }
      }
    }
  }
};

/* ─── Chart 4: Datacenter power (actual/projected) ─── */

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
      pointRadius: 2.4,
      pointHoverRadius: 3.4,
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
      pointRadius: 2.4,
      pointHoverRadius: 3.4,
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
        font: { family: fonts.data, size: 7, weight: 300 }
      }
    },
    y: {
      beginAtZero: true,
      max: 140,
      ticks: {
        stepSize: 40,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
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
          content: "~120 GW by 2029",
          color: chartSeriesColor(theme, 1),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -74
        })
      }
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "line",
        color: theme.textPrimary,
        font: { family: fonts.data, size: 8, weight: 400 },
        boxWidth: 12,
        padding: 6
      }
    },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)} GW`
      }
    }
  }
};

export function Slide09cShortThesisAiProof2() {
  return (
    <>
      <SectionHeader
        sectionLabel="AI INFRASTRUCTURE"
        title="Physical AI infrastructure is entering a multi-year capex and power cycle"
        subtitle="Training intensity, hyperscaler spend, accelerator throughput, and datacenter load indicate durable physical bottlenecks"
      />

      <div className="thesis-proof-grid">
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Training compute growth (FLOP, log scale)</div>
          <div className="thesis-proof-chart">
            <LineChart data={computeChartData} options={computeOptions} />
          </div>
        </div>
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Hyperscaler capex ($B)</div>
          <div className="thesis-proof-chart">
            <BarChart data={capexChartData} options={capexOptions} />
          </div>
        </div>
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Accelerator shipments and spend</div>
          <div className="thesis-proof-chart">
            <LineChart data={hwChartData} options={hwOptions} />
          </div>
        </div>
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Operational AI datacenter power</div>
          <div className="thesis-proof-chart">
            <LineChart data={dcChartData} options={dcOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: Epoch AI; company filings; Bloomberg; SemiAnalysis; RAND (compiled Feb 2026)." tight />
    </>
  );
}
