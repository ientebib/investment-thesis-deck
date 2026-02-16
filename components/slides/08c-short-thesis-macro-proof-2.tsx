import type { ChartData, ChartOptions } from "chart.js";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { SectionHeader, SourceLine } from "@/components/ui";
import {
  slide19GoldTreasuriesData,
  slide20CentralBankGoldData,
  slide22GoldYieldData,
  slide25MineralDemandData
} from "@/lib/data/slides";
import { calloutLabel, eventLine } from "@/lib/annotationStyles";
import { chartSeriesColor, fonts, theme } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

const goldData = slide19GoldTreasuriesData;
const goldLastIndex = goldData.dates.length - 1;
const goldLastDate = goldData.dates[goldLastIndex];
const goldLastValue = goldData.goldHoldingsTrillions[goldLastIndex] ?? 0;
const treasuryLastValue = goldData.treasuryHoldingsTrillions[goldLastIndex] ?? 0;
const goldChartData: ChartData<"line"> = {
  labels: goldData.dates,
  datasets: [
    {
      label: "Gold",
      data: goldData.goldHoldingsTrillions,
      borderColor: chartSeriesColor(theme, 0),
      borderWidth: 1.8,
      pointRadius: 1.4,
      pointHoverRadius: 2.8,
      tension: 0.24
    },
    {
      label: "Treasuries",
      data: goldData.treasuryHoldingsTrillions,
      borderColor: chartSeriesColor(theme, 1),
      borderWidth: 1.8,
      pointRadius: 1.4,
      pointHoverRadius: 2.8,
      tension: 0.24
    }
  ]
};

const goldOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        maxRotation: 0,
        autoSkip: true,
        callback: (_, i) => {
          const d = goldData.dates[i];
          return d?.endsWith("-01-01") ? d.slice(0, 4) : "";
        }
      }
    },
    y: {
      min: 1,
      max: 6,
      ticks: {
        stepSize: 1,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        callback: (v) => `$${v}T`
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        reserveShift: calloutLabel(theme, {
          xValue: goldLastDate,
          yValue: goldLastValue + 0.2,
          content: [`Gold lead: +$${(goldLastValue - treasuryLastValue).toFixed(1)}T`],
          color: chartSeriesColor(theme, 0),
          fontSize: 7,
          fontWeight: 500,
          xAdjust: -86
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
      enabled: true,
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 9, weight: 400 },
      bodyFont: { family: fonts.data, size: 9, weight: 400 },
      callbacks: {
        label: (item) => `${item.dataset.label}: $${Number(item.raw).toFixed(2)}T`
      }
    }
  }
};

const cbGoldData = slide20CentralBankGoldData;
const cbGoldChartData: ChartData<"bar"> = {
  labels: cbGoldData.years.map(String),
  datasets: [
    {
      label: "Net purchases (t)",
      data: cbGoldData.netPurchasesTonnes,
      backgroundColor: cbGoldData.years.map((y) =>
        cbGoldData.highlightYears.includes(y) ? chartSeriesColor(theme, 0) : hexToRgba(theme.textMuted, 0.65)
      ),
      borderWidth: 0,
      barPercentage: 0.82,
      categoryPercentage: 0.84
    }
  ]
};

const cbGoldOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: theme.textTertiary, font: { family: fonts.data, size: 7, weight: 300 } }
    },
    y: {
      beginAtZero: true,
      max: 1300,
      ticks: {
        stepSize: 250,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 }
      },
      grid: { color: theme.border }
    }
  },
  plugins: { legend: { display: false }, tooltip: { enabled: false } }
};
cbGoldOptions.plugins = {
  ...cbGoldOptions.plugins,
  annotation: {
    annotations: {
      peakLabel: calloutLabel(theme, {
        xValue: "2022",
        yValue: 1180,
        content: "2022: 1,136t",
        color: chartSeriesColor(theme, 0),
        fontSize: 7,
        fontWeight: 500
      })
    }
  },
  tooltip: {
    enabled: true,
    backgroundColor: theme.surface3,
    titleColor: theme.textPrimary,
    bodyColor: theme.textSecondary,
    titleFont: { family: fonts.data, size: 9, weight: 400 },
    bodyFont: { family: fonts.data, size: 9, weight: 400 },
    callbacks: {
      label: (item) => `${Number(item.raw).toFixed(0)} tonnes`
    }
  }
};

const mineralData = slide25MineralDemandData;
const mineralChartData: ChartData<"bar"> = {
  labels: mineralData.minerals,
  datasets: [
    {
      label: "2024",
      data: mineralData.index2024,
      backgroundColor: hexToRgba(theme.textMuted, 0.85),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    },
    {
      label: "2030",
      data: mineralData.index2030,
      backgroundColor: hexToRgba(chartSeriesColor(theme, 1), 0.68),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    },
    {
      label: "2040",
      data: mineralData.index2040,
      backgroundColor: chartSeriesColor(theme, 0),
      borderWidth: 0,
      barPercentage: 0.85,
      categoryPercentage: 0.8
    }
  ]
};

const mineralOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
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
      min: 0,
      max: 500,
      ticks: {
        stepSize: 100,
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 }
      },
      grid: { color: theme.border }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        lithiumCallout: calloutLabel(theme, {
          xValue: "Lithium",
          yValue: 470,
          content: "Lithium ~4.5x by 2040",
          color: chartSeriesColor(theme, 0),
          fontSize: 7,
          fontWeight: 500
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
      enabled: true,
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 9, weight: 400 },
      bodyFont: { family: fonts.data, size: 9, weight: 400 },
      callbacks: {
        label: (item) => `${item.dataset.label}: ${Number(item.raw).toFixed(0)}`
      }
    }
  }
};

const goldYieldData = slide22GoldYieldData;
const breakIndex = goldYieldData.dates.findIndex((date) => date === goldYieldData.relationshipBreakDate);
const goldYieldChartData: ChartData<"line"> = {
  labels: goldYieldData.dates,
  datasets: [
    {
      label: "Gold price (ln)",
      data: goldYieldData.goldPriceLn,
      borderColor: chartSeriesColor(theme, 0),
      yAxisID: "y",
      borderWidth: 1.6,
      pointRadius: 1.2,
      pointHoverRadius: 2.5,
      tension: 0.22
    },
    {
      label: "US 10Y real yield",
      data: goldYieldData.real10yYield,
      borderColor: chartSeriesColor(theme, 1),
      yAxisID: "y1",
      borderWidth: 1.6,
      pointRadius: 1.2,
      pointHoverRadius: 2.5,
      tension: 0.22
    }
  ]
};

const goldYieldOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 8, bottom: 2, left: 4 } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 },
        maxRotation: 0,
        autoSkip: false,
        callback: (_, i) => {
          const d = goldYieldData.dates[i];
          return d?.endsWith("-01-01") ? d.slice(0, 4) : "";
        }
      }
    },
    y: {
      position: "left",
      ticks: {
        color: theme.textTertiary,
        font: { family: fonts.data, size: 7, weight: 300 }
      },
      grid: { color: theme.border }
    },
    y1: {
      position: "right",
      reverse: true,
      ticks: {
        color: theme.textMuted,
        font: { family: fonts.data, size: 7, weight: 300 }
      },
      grid: { drawOnChartArea: false }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        breakLine: eventLine(theme, { xValue: breakIndex, label: "2022 regime break" })
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
      enabled: true,
      backgroundColor: theme.surface3,
      titleColor: theme.textPrimary,
      bodyColor: theme.textSecondary,
      titleFont: { family: fonts.data, size: 9, weight: 400 },
      bodyFont: { family: fonts.data, size: 9, weight: 400 },
      callbacks: {
        label: (item) => {
          const suffix = item.dataset.yAxisID === "y1" ? "%" : "";
          return `${item.dataset.label}: ${Number(item.raw).toFixed(2)}${suffix}`;
        }
      }
    }
  }
};

export function Slide08cShortThesisMacroProof2() {
  return (
    <>
      <SectionHeader
        sectionLabel="MACRO THESIS"
        title="Reserve behavior and supply bottlenecks are repricing hard assets"
        subtitle="Central-bank allocation shifts, the gold-yield decoupling, and mineral scarcity reinforce sustained real-asset premiums"
      />

      <div className="thesis-proof-grid">
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Gold vs Treasuries in central-bank reserves</div>
          <div className="thesis-proof-chart">
            <LineChart data={goldChartData} options={goldOptions} />
          </div>
        </div>
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Central-bank gold purchases (tonnes)</div>
          <div className="thesis-proof-chart">
            <BarChart data={cbGoldChartData} options={cbGoldOptions} />
          </div>
        </div>
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Critical mineral demand (index, 2024 = 100)</div>
          <div className="thesis-proof-chart">
            <BarChart data={mineralChartData} options={mineralOptions} />
          </div>
        </div>
        <div className="thesis-proof-cell">
          <div className="thesis-proof-label">Gold vs U.S. 10Y real yield</div>
          <div className="thesis-proof-chart">
            <LineChart data={goldYieldChartData} options={goldYieldOptions} />
          </div>
        </div>
      </div>

      <SourceLine text="Source: World Gold Council; Federal Reserve; Bloomberg; IEA Global Critical Minerals Outlook 2025." tight />
    </>
  );
}
