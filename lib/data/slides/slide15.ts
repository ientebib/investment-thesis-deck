import priceChangesSeries from "@/lib/data/series/price_changes_2000_2025.json";
import type { Slide15PriceChangesData } from "@/lib/data/types";

type PriceChangeRow = {
  year: number;
  hospital_services: number;
  college_tuition: number;
  college_textbooks: number;
  childcare: number;
  medical_care: number;
  avg_hourly_wages: number;
  housing: number;
  food_beverages: number;
  overall_cpi: number;
  new_cars: number;
  household_furnishings: number;
  clothing: number;
  cellphone_services: number;
  computer_software: number;
  toys: number;
  tvs: number;
};

const rows = priceChangesSeries as PriceChangeRow[];
const latest = rows.find((row) => row.year === 2025) ?? rows[rows.length - 1];

const categories: Array<{ label: string; value: number }> = [
  { label: "Hospital Services", value: latest.hospital_services },
  { label: "College Tuition", value: latest.college_tuition },
  { label: "College Textbooks", value: latest.college_textbooks },
  { label: "Childcare", value: latest.childcare },
  { label: "Medical Care", value: latest.medical_care },
  { label: "Avg Hourly Wages", value: latest.avg_hourly_wages },
  { label: "Housing", value: latest.housing },
  { label: "Food & Beverages", value: latest.food_beverages },
  { label: "Overall CPI", value: latest.overall_cpi },
  { label: "New Cars", value: latest.new_cars },
  { label: "Home Furnishings", value: latest.household_furnishings },
  { label: "Clothing", value: latest.clothing },
  { label: "Cell Phone Services", value: latest.cellphone_services },
  { label: "Computer Software", value: latest.computer_software },
  { label: "Toys", value: latest.toys },
  { label: "TVs", value: latest.tvs }
];

export const slide15PriceChangesData: Slide15PriceChangesData = {
  sectionLabel: "THESIS A - INFLATION REGIME",
  title: "Inflation concentrates where supply can't scale",
  subtitle: "Cumulative price change by category, 2000-2025",
  categories: categories.map((item) => item.label),
  values: categories.map((item) => item.value),
  overallCpiValue: latest.overall_cpi,
  sourceLine: "Source: Bureau of Labor Statistics"
};
