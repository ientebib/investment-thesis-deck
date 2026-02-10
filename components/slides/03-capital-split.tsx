import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { DonutChart } from "@/components/charts/DonutChart";
import { SectionHeader, SourceLine, ThesisPanelCard } from "@/components/ui";
import { slide03CapitalSplitData } from "@/lib/data/slides";
import { fonts, theme } from "@/lib/theme";
import {
  semanticColor
} from "@/lib/semanticChannels";

const slideData = slide03CapitalSplitData;

const donutData: ChartData<"doughnut"> = {
  labels: slideData.pillars.map((pillar) => pillar.title),
  datasets: [
    {
      data: slideData.pillars.map((pillar) => pillar.allocationPct),
      backgroundColor: slideData.pillars.map((pillar) => semanticColor(pillar.concept)),
      borderColor: theme.surface1,
      borderWidth: 2,
      hoverOffset: 6
    }
  ]
};

const donutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: "55%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: { family: fonts.data, size: 9, weight: 400 },
        color: theme.textTertiary,
        padding: 16,
        usePointStyle: true,
        pointStyle: "circle",
        sort: (a, b) => (b.index ?? 0) - (a.index ?? 0)
      }
    },
    tooltip: {
      backgroundColor: theme.textPrimary,
      titleColor: theme.bg,
      bodyColor: theme.bg,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (ctx) => `${ctx.label}: ${ctx.parsed}%`
      }
    }
  }
};

const donutCenterPlugin: Plugin<"doughnut"> = {
  id: "donutCenter",
  beforeDraw: (chart) => {
    const w = chart.width;
    const ctx = chart.ctx;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    ctx.save();
    ctx.font = `400 28px ${fonts.display}`;
    ctx.fillStyle = theme.textPrimary;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(slideData.centerValue, w / 2, centerY - 8);
    ctx.font = `400 8px ${fonts.data}`;
    ctx.fillStyle = theme.textTertiary;
    ctx.letterSpacing = "2px";
    ctx.fillText(slideData.centerCaption, w / 2, centerY + 14);
    ctx.restore();
  }
};

export function Slide03CapitalSplit() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="split-overview-layout">
        <div className="split-overview-panels">
          {slideData.pillars.map((pillar) => (
            <ThesisPanelCard
              key={pillar.title}
              concept={pillar.concept}
              title={pillar.title}
              description={pillar.description}
              rows={pillar.rows}
            />
          ))}
        </div>

        <div className="split-overview-chart-wrap">
          <div className="split-overview-chart">
            <DonutChart data={donutData} options={donutOptions} plugins={[donutCenterPlugin]} />
          </div>
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
