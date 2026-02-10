import hardwareSeries from "@/lib/data/series/ai_hardware_shipments_cost_2020_2028.json";
import type { Slide36HardwareData } from "@/lib/data/types";

const rows = hardwareSeries as Array<{
  year: string;
  shipments_million_h100_equiv: number;
  cost_usd_billions: number;
}>;

export const slide36HardwareData: Slide36HardwareData = {
  sectionLabel: "THESIS B - HARDWARE",
  title: "32x more chips shipped in three years",
  subtitle: "Accelerator shipments and associated spend have moved into a steep compounding phase",
  shipmentsStats: [
    { value: "310K", label: "2022" },
    { value: "1.4M", label: "2023" },
    { value: "5.5M", label: "2024" },
    { value: "10M+", label: "2025" }
  ],
  costStats: [
    { value: "$11B", label: "2022" },
    { value: "$37B", label: "2023" },
    { value: "$113B", label: "2024" },
    { value: "$143B", label: "2025" }
  ],
  note: "5.96 GW shipped chip power draw in 2025 (assuming ~600W per accelerator) - roughly six large nuclear plants.",
  years: rows.map((row) => row.year),
  shipmentsMillionUnits: rows.map((row) => row.shipments_million_h100_equiv),
  costUsdBillions: rows.map((row) => row.cost_usd_billions),
  sourceLine: "Source: Company filings and SemiAnalysis estimates"
};
