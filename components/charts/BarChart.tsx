"use client";

import { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import { applyChartDefaults } from "@/lib/chartDefaults";
import type { Plugin } from "chart.js";

type BarChartProps = {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
  plugins?: Plugin<"bar">[];
};

export function BarChart({ data, options, plugins }: BarChartProps) {
  applyChartDefaults();
  return <Bar data={data} options={options} plugins={plugins} />;
}
