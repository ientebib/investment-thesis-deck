import eciSeries from "@/lib/data/series/eci_frontier_benchmarks_2023_2026.json";
import type { Slide30CapabilityBenchmarksData } from "@/lib/data/types";

const rows = eciSeries as Array<{
  date: string;
  weirdml: number | null;
  simplebench: number | null;
  frontiermath: number | null;
  swe_bench_verified: number | null;
}>;

export const slide30CapabilityBenchmarksData: Slide30CapabilityBenchmarksData = {
  sectionLabel: "AI INFRASTRUCTURE",
  title: "Harder benchmarks show capabilities still climbing steeply",
  subtitle:
    "Capability progress continues to open harder commercially relevant tasks and extend the monetization runway",
  dates: rows.map((row) => row.date),
  weirdMl: rows.map((row) => row.weirdml),
  simpleBench: rows.map((row) => row.simplebench),
  frontierMath: rows.map((row) => row.frontiermath),
  sweBenchVerified: rows.map((row) => row.swe_bench_verified),
  sourceLine: "Source: Epoch AI Capabilities Index (ECI); performance = best-ever score as of each month"
};
