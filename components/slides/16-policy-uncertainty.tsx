import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide16PolicyUncertaintyData } from "@/lib/data/slides";
import type { Slide16PolicyPanelTone } from "@/lib/data/types";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const slideData = slide16PolicyUncertaintyData;

function panelColor(tone: Slide16PolicyPanelTone) {
  if (tone === "primary") {
    return chartSeriesColor(theme, 0);
  }
  if (tone === "secondary") {
    return chartSeriesColor(theme, 1);
  }
  if (tone === "negative") {
    return theme.negative;
  }
  return theme.caution;
}

function chartDataForPanel(series: number[], tone: Slide16PolicyPanelTone): ChartData<"line"> {
  const color = panelColor(tone);
  return {
    labels: slideData.qLabels,
    datasets: [
      {
        data: series,
        borderColor: color,
        backgroundColor: hexToRgba(color, 0.16),
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3,
        tension: 0.3,
        fill: true
      }
    ]
  };
}

function chartOptionsForPanel(
  baseline: number,
  baselineLabel: string,
  tone: Slide16PolicyPanelTone
): ChartOptions<"line"> {
  const color = panelColor(tone);
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    layout: { padding: { top: 2, right: 4, bottom: 0, left: 0 } },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: theme.textMuted,
          font: { family: fonts.data, size: 8, weight: 300 },
          maxRotation: 0,
          autoSkip: false,
          callback: (_, index) => {
            const label = slideData.qLabels[index];
            const [year, quarter] = label.split("-");
            return quarter === "Q1" && Number.parseInt(year, 10) % 4 === 0 ? year : "";
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: { color: theme.border },
        ticks: {
          color: theme.textMuted,
          font: { family: fonts.data, size: 8, weight: 300 },
          maxTicksLimit: 5
        }
      }
    },
    plugins: {
      annotation: {
        annotations: {
          baseline: {
            type: "line",
            yMin: baseline,
            yMax: baseline,
            borderColor: hexToRgba(theme.textMuted, 0.45),
            borderWidth: 1,
            borderDash: [4, 3],
            label: {
              display: true,
              content: baselineLabel,
              position: "start",
              color: theme.textMuted,
              backgroundColor: "transparent",
              font: { family: fonts.data, size: 8, weight: 400 },
              padding: 0
            }
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
          title: (items) => items[0]?.label ?? "",
          label: (item) => Number(item.raw).toLocaleString()
        }
      }
    },
    elements: {
      line: { borderColor: color }
    }
  };
}

export function Slide16PolicyUncertainty() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />
      <div className="policy-uncertainty-grid">
        {slideData.panels.map((panel) => (
          <section key={panel.key} className={`policy-uncertainty-card policy-uncertainty-card--${panel.tone}`}>
            <div className="policy-uncertainty-head">
              <h3 className="policy-uncertainty-title">{panel.title}</h3>
              <div className="policy-uncertainty-value-wrap">
                <span className="policy-uncertainty-value">{panel.valueLabel}</span>
                <span className="policy-uncertainty-date">{panel.valueDate}</span>
              </div>
            </div>
            <div className="policy-uncertainty-mini-chart">
              <LineChart
                data={chartDataForPanel(panel.series, panel.tone)}
                options={chartOptionsForPanel(panel.baseline, panel.baselineLabel, panel.tone)}
              />
            </div>
          </section>
        ))}
      </div>
      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
