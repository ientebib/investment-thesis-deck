import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide36HardwareData, slide38DatacenterBuildoutData } from "@/lib/data/slides";
import { calloutLabel, projectionDivider, referenceLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const chipsSlide = slide36HardwareData;
const powerSlide = slide38DatacenterBuildoutData;

const chipsIn2022Index = chipsSlide.years.findIndex((year) => year === "2022");
const chipsIn2025Index = chipsSlide.years.findIndex((year) => year === "2025");
const chipsIn2022 = chipsIn2022Index >= 0 ? chipsSlide.shipmentsMillionUnits[chipsIn2022Index] : 0;
const chipsIn2025 = chipsIn2025Index >= 0 ? chipsSlide.shipmentsMillionUnits[chipsIn2025Index] : 0;
const shipmentsMultiple = chipsIn2022 > 0 ? chipsIn2025 / chipsIn2022 : 0;

const chipsChartData: ChartData<"line"> = {
  labels: chipsSlide.years,
  datasets: [
    {
      label: "Shipments (M units, H100-eq)",
      data: chipsSlide.shipmentsMillionUnits,
      borderColor: chartSeriesColor(theme, 0),
      backgroundColor: "transparent",
      yAxisID: "y",
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28
    },
    {
      label: "Associated cost ($B)",
      data: chipsSlide.costUsdBillions,
      borderColor: chartSeriesColor(theme, 1),
      backgroundColor: "transparent",
      yAxisID: "y1",
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      borderDash: [5, 4],
      tension: 0.28
    }
  ]
};

const chipsChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  layout: { padding: { top: 8, right: 16, bottom: 4, left: 8 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 }
      }
    },
    y: {
      position: "left",
      min: 0,
      max: 40,
      ticks: {
        color: chartSeriesColor(theme, 0),
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value}M`
      },
      grid: { color: theme.border }
    },
    y1: {
      position: "right",
      min: 0,
      max: 400,
      ticks: {
        color: chartSeriesColor(theme, 1),
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `$${value}B`
      },
      grid: { display: false }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        runRateLine: referenceLine(theme, {
          axis: "x",
          value: "2025",
          label: "Run-rate step-change",
          dash: [4, 3]
        }),
        ...(shipmentsMultiple > 0
          ? {
              shipmentsCallout: {
                ...calloutLabel(theme, {
                  xValue: "2025",
                  yValue: Math.min(chipsIn2025 + 13, 34),
                  content: `${shipmentsMultiple.toFixed(0)}x vs 2022 shipments`,
                  color: chartSeriesColor(theme, 0),
                  fontSize: 9,
                  fontWeight: 500
                }),
                backgroundColor: hexToRgba(theme.surface2, 0.9),
                borderColor: hexToRgba(chartSeriesColor(theme, 0), 0.45),
                borderWidth: 1,
                padding: 4,
                borderRadius: 4
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
        padding: 12
      }
    },
    tooltip: {
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 10, weight: 400 },
      bodyFont: { family: fonts.data, size: 10, weight: 400 },
      callbacks: {
        label: (item) => {
          const value = Number(item.raw);
          if (item.datasetIndex === 0) {
            return `${item.dataset.label}: ${value.toFixed(2)}M`;
          }
          return `${item.dataset.label}: $${value.toFixed(0)}B`;
        }
      }
    }
  }
};

const actualColor = chartSeriesColor(theme, 0);
const projectedColor = chartSeriesColor(theme, 1);
const projection = projectionDivider(theme, {
  xValue: "2025",
  actualLabel: "ACTUAL",
  projectedLabel: "PROJECTED"
});

const powerChartData: ChartData<"line"> = {
  labels: powerSlide.years,
  datasets: [
    {
      label: "Actual",
      data: powerSlide.actualGw,
      borderColor: actualColor,
      backgroundColor: hexToRgba(actualColor, 0.14),
      fill: true,
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      tension: 0.28,
      spanGaps: false
    },
    {
      label: "Projected",
      data: powerSlide.projectedGw,
      borderColor: projectedColor,
      backgroundColor: hexToRgba(projectedColor, 0.14),
      fill: true,
      borderDash: [6, 4],
      borderWidth: 2.2,
      pointRadius: 3.5,
      pointHoverRadius: 5,
      pointStyle: "triangle",
      tension: 0.28,
      spanGaps: false
    }
  ]
};

const powerChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
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
      beginAtZero: true,
      max: 140,
      ticks: {
        stepSize: 20,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 9, weight: 300 },
        callback: (value) => `${value} GW`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        projectionLine: projection.line,
        actualLabel: projection.actualLabel,
        inflection: {
          ...calloutLabel(theme, {
            xValue: "2028",
            yValue: 118,
            content: "~120 GW by 2029",
            color: chartSeriesColor(theme, 1),
            fontSize: 9,
            fontWeight: 500
          }),
          backgroundColor: hexToRgba(theme.surface2, 0.9),
          borderColor: hexToRgba(chartSeriesColor(theme, 1), 0.45),
          borderWidth: 1,
          padding: 4,
          borderRadius: 4
        }
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
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(1)} GW`
      }
    }
  }
};

export function Slide36HardwareShipments() {
  const combinedSourceLine = `Source: ${chipsSlide.sourceLine.replace(/^Source:\s*/, "")}; ${powerSlide.sourceLine.replace(/^Source:\s*/, "")}`;

  return (
    <>
      <SectionHeader
        sectionLabel={chipsSlide.sectionLabel}
        title="Hardware shipments and datacenter power are compounding together"
        subtitle="Accelerator volumes, spend, and operational GW demand are now moving on a megaproject trajectory."
      />

      <div className="slide-combo-layout">
        <section className="slide-combo-panel">
          <div className="slide-combo-label">AI accelerator shipments and associated spend</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={chipsChartData} options={chipsChartOptions} />
          </div>
        </section>

        <section className="slide-combo-panel">
          <div className="slide-combo-label">Operational AI datacenter power</div>
          <div className="chart-area slide-combo-chart">
            <LineChart data={powerChartData} options={powerChartOptions} />
          </div>
        </section>
      </div>

      <SourceLine text={combinedSourceLine} tight />
    </>
  );
}
