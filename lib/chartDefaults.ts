import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { fonts, theme } from "@/lib/theme";

let initialized = false;

export function applyChartDefaults() {
  if (initialized) {
    return;
  }

  Chart.register(...registerables, annotationPlugin);

  Chart.defaults.color = theme.textTertiary;
  Chart.defaults.font.family = fonts.body;
  Chart.defaults.borderColor = theme.border;
  Chart.defaults.plugins.legend.labels.color = theme.textSecondary;
  Chart.defaults.plugins.legend.labels.font = {
    family: fonts.data,
    size: 9
  };
  Chart.defaults.plugins.tooltip.backgroundColor = theme.surface3;
  Chart.defaults.plugins.tooltip.titleColor = theme.textPrimary;
  Chart.defaults.plugins.tooltip.bodyColor = theme.textSecondary;
  Chart.defaults.plugins.tooltip.borderColor = theme.borderLight;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.titleFont = {
    family: fonts.data,
    size: 10,
    weight: 400
  };
  Chart.defaults.plugins.tooltip.bodyFont = {
    family: fonts.data,
    size: 10,
    weight: 400
  };

  initialized = true;
}
