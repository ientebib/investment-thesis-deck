import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide34TrainingComputeData } from "@/lib/data/slides";
import { calloutLabel } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import {
  pitchAxisFont,
  pitchTooltip,
  pitchLegend,
  pitchAnnotationFont
} from "@/lib/pitchChartDefaults";

function formatScientific(value: number) {
  const exponent = Math.floor(Math.log10(value));
  const mantissa = value / 10 ** exponent;
  return `${mantissa.toFixed(1)} x 10^${exponent}`;
}

/* ─── Left panel: Training compute scatter ─── */

const computeData = slide34TrainingComputeData;
const computeHighlightLabels = new Set([
  "GPT-3", "GPT-4", "GPT-5", "Gemini Ultra", "Claude 3.7 Sonnet", "Grok 4"
]);

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
      pointRadius: frontierCompute.map((p) => (computeHighlightLabels.has(p.label) ? 4 : 2.5)),
      pointHoverRadius: 5
    },
    {
      label: "Other",
      data: otherCompute,
      borderColor: theme.textMuted,
      backgroundColor: theme.textMuted,
      showLine: false,
      pointRadius: otherCompute.map((p) => (computeHighlightLabels.has(p.label) ? 3.5 : 2)),
      pointHoverRadius: 4.5
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
        font: pitchAxisFont,
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
        font: pitchAxisFont,
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
          fontSize: pitchAnnotationFont.size,
          fontWeight: 500,
          xAdjust: -64
        })
      }
    },
    legend: {
      ...pitchLegend,
    },
    tooltip: {
      ...pitchTooltip,
      callbacks: {
        title: (items) => (items[0]?.raw as { label?: string })?.label ?? "",
        label: (item) => formatScientific(Number((item.raw as { y: number }).y))
      }
    }
  }
};

/* ─── Right panel: Browser windows with headlines ─── */

const headlines = [
  { source: "nbcnews.com", image: "/headlines/nbc-openai-cropped.png", size: "tall" as const },
  { source: "fortune.com", image: "/headlines/fortune-anthropic-cropped.png", size: "default" as const },
  { source: "scitechdaily.com", image: "/headlines/scitech-physics-cropped.jpeg", size: "compact" as const }
];

function BrowserWindow({ source, image, size = "default" }: { source: string; image: string; size?: "tall" | "default" | "compact" }) {
  return (
    <div className={`mac-browser ${size === "tall" ? "mac-browser--tall" : ""} ${size === "compact" ? "mac-browser--compact" : ""}`}>
      <div className="mac-browser-bar">
        <div className="mac-browser-dots">
          <span className="mac-dot mac-dot--red" />
          <span className="mac-dot mac-dot--yellow" />
          <span className="mac-dot mac-dot--green" />
        </div>
        <div className="mac-browser-url">{source}</div>
      </div>
      <div className="mac-browser-img-wrap">
        <img src={image} alt={source} className="mac-browser-img" />
      </div>
    </div>
  );
}

export function PitchSlide05Scaling() {
  return (
    <>
      <SectionHeader
        sectionLabel="AI INFRASTRUCTURE"
        title="AI capabilities improve predictably with compute — each generation requires orders of magnitude more"
        subtitle="Scaling laws connect physical investment to capability gains"
      />

      <div className="pitch-dual-panel">
        <div className="pitch-panel">
          <div className="pitch-panel-label">Training compute growth (FLOP, log scale)</div>
          <div className="pitch-panel-chart">
            <LineChart data={computeChartData} options={computeOptions} />
          </div>
        </div>
        <div className="pitch-panel">
          <div className="pitch-panel-label">The capabilities are real</div>
          <div className="mac-browser-stack">
            {headlines.map((h) => (
              <BrowserWindow key={h.source} source={h.source} image={h.image} size={h.size} />
            ))}
          </div>
        </div>
      </div>

      <SourceLine text="Source: Epoch AI Notable AI Models database (compiled Feb 2026)." tight />
    </>
  );
}
