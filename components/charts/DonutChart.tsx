"use client";

import { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { applyChartDefaults } from "@/lib/chartDefaults";
import type { Plugin } from "chart.js";

type DonutChartProps = {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
  plugins?: Plugin<"doughnut">[];
};

export function DonutChart({ data, options, plugins }: DonutChartProps) {
  applyChartDefaults();
  return <Doughnut data={data} options={options} plugins={plugins} />;
}
