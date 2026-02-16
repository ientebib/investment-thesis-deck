/**
 * Pitch deck chart defaults — larger fonts for LP legibility.
 *
 * Import `pitchTooltip`, `pitchAxisFont`, `pitchAnnotationFont` etc.
 * into individual pitch slide components to override the 7px defaults.
 */
import { fonts, theme } from "@/lib/theme";

/* ─── Font presets ─── */

export const pitchAxisFont = {
  family: fonts.data,
  size: 14,
  weight: 400 as const,
};

export const pitchAnnotationFont = {
  family: fonts.data,
  size: 14,
  weight: 500 as const,
};

export const pitchLegendFont = {
  family: fonts.data,
  size: 13,
  weight: 400 as const,
};

/* ─── Tooltip preset ─── */

export const pitchTooltip = {
  enabled: true,
  backgroundColor: theme.surface3,
  titleColor: theme.textPrimary,
  bodyColor: theme.textSecondary,
  titleFont: { family: fonts.data, size: 14, weight: 400 as const },
  bodyFont: { family: fonts.data, size: 13, weight: 400 as const },
};

/* ─── Legend preset ─── */

export const pitchLegend = {
  display: true,
  position: "top" as const,
  align: "end" as const,
  labels: {
    usePointStyle: true,
    pointStyle: "circle" as const,
    color: theme.textPrimary,
    font: pitchLegendFont,
    boxWidth: 7,
    padding: 8,
  },
};

export const pitchLegendLine = {
  ...pitchLegend,
  labels: {
    ...pitchLegend.labels,
    pointStyle: "line" as const,
    boxWidth: 14,
  },
};
