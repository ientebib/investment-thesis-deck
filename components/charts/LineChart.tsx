"use client";

import { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { applyChartDefaults } from "@/lib/chartDefaults";
import type { Plugin } from "chart.js";

type LineChartProps = {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
  plugins?: Plugin<"line">[];
};

export function LineChart({ data, options, plugins }: LineChartProps) {
  applyChartDefaults();
  return <Line data={data} options={options} plugins={plugins} />;
}
