/**
 * Annotation factory functions for Chart.js annotation plugin.
 *
 * All annotations follow the canonical design system:
 * - Line color: textMuted @ 0.45 opacity, 1px width
 * - Dash patterns: reference [5,4], events [4,3]
 * - Label font: JetBrains Mono (fonts.data), 8px, weight 400
 * - Label color: textMuted
 * - Recession fill: secondary @ 0.08 opacity
 */
import type { Theme } from "@/lib/theme";
import { fonts } from "@/lib/theme";
import { hexToRgba } from "@/lib/chartUtils";

/* ─── Reference line ─── */
/** Horizontal or vertical reference line (target lines, zero lines, baselines). */
export function referenceLine(
  theme: Theme,
  opts: {
    axis: "x" | "y";
    value: number | string;
    label?: string;
    dash?: number[];
    color?: string;
    labelPosition?: "start" | "center" | "end";
  }
) {
  const isX = opts.axis === "x";
  return {
    type: "line" as const,
    ...(isX
      ? { xMin: opts.value, xMax: opts.value }
      : { yMin: opts.value, yMax: opts.value }),
    borderColor: opts.color ?? hexToRgba(theme.textMuted, 0.45),
    borderWidth: 1,
    borderDash: opts.dash ?? [5, 4],
    label: opts.label
      ? {
          display: true,
          content: opts.label,
          position: opts.labelPosition ?? "end",
          color: theme.textMuted,
          backgroundColor: "transparent",
          font: { family: fonts.data, size: 8, weight: 400 as const },
          padding: 2,
        }
      : undefined,
  };
}

/* ─── Event line ─── */
/** Vertical event marker (Brexit, COVID, etc.). */
export function eventLine(
  theme: Theme,
  opts: {
    xValue: number | string;
    label: string;
    labelPosition?: "start" | "center" | "end";
    color?: string;
  }
) {
  return {
    type: "line" as const,
    xMin: opts.xValue,
    xMax: opts.xValue,
    borderColor: opts.color ?? hexToRgba(theme.textTertiary, 0.45),
    borderWidth: 1,
    borderDash: [4, 3],
    label: {
      display: true,
      content: opts.label,
      position: opts.labelPosition ?? "start",
      color: theme.textMuted,
      backgroundColor: "transparent",
      font: { family: fonts.data, size: 8, weight: 400 as const },
      padding: 0,
    },
  };
}

/* ─── Callout label ─── */
/** Floating text label (DEFICIT, 3x increase, WE ARE HERE, etc.). */
export function calloutLabel(
  theme: Theme,
  opts: {
    xValue: number | string;
    yValue: number | string;
    content: string | string[];
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    xAdjust?: number;
    yAdjust?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
    clip?: boolean;
    drawTime?: "beforeDatasetsDraw" | "afterDatasetsDraw" | "afterDraw";
  }
) {
  return {
    type: "label" as const,
    xValue: opts.xValue,
    yValue: opts.yValue,
    content: Array.isArray(opts.content) ? opts.content : [opts.content],
    color: opts.color ?? theme.textMuted,
    backgroundColor: opts.backgroundColor ?? "transparent",
    borderColor: opts.borderColor ?? "transparent",
    borderWidth: opts.borderWidth ?? 0,
    borderRadius: opts.borderRadius ?? 0,
    padding: opts.padding ?? 0,
    xAdjust: opts.xAdjust ?? 0,
    yAdjust: opts.yAdjust ?? 0,
    clip: opts.clip ?? false,
    drawTime: opts.drawTime ?? "afterDraw",
    font: {
      family: fonts.data,
      size: opts.fontSize ?? 10,
      weight: (opts.fontWeight ?? 500) as 400 | 500,
    },
  };
}

/* ─── Recession box ─── */
/** Shaded recession band (vertical box). */
export function recessionBox(
  theme: Theme,
  opts: { xMin: number | string; xMax: number | string }
) {
  return {
    type: "box" as const,
    xMin: opts.xMin,
    xMax: opts.xMax,
    backgroundColor: hexToRgba(theme.secondary, 0.08),
    borderWidth: 0,
  };
}

/* ─── Projection divider ─── */
/** Actual / Projected vertical divider with dual labels. */
export function projectionDivider(
  theme: Theme,
  opts: {
    xValue: number | string;
    actualLabel?: string;
    projectedLabel?: string;
  }
) {
  const line = {
    type: "line" as const,
    xMin: opts.xValue,
    xMax: opts.xValue,
    borderColor: hexToRgba(theme.textMuted, 0.45),
    borderWidth: 1,
    borderDash: [5, 4],
    label: {
      display: true,
      content: opts.projectedLabel ?? "PROJECTED",
      position: "end" as const,
      color: theme.textMuted,
      backgroundColor: "transparent",
      font: { family: fonts.data, size: 7, weight: 400 as const },
      padding: 2,
    },
  };

  const actualLbl = {
    type: "label" as const,
    xValue: opts.xValue,
    yValue: "max" as const,
    position: { x: "start" as const, y: "start" as const },
    content: [opts.actualLabel ?? "ACTUAL"],
    color: theme.textMuted,
    backgroundColor: "transparent",
    font: { family: fonts.data, size: 7, weight: 400 as const },
    xAdjust: -6,
    yAdjust: 4,
  };

  return { line, actualLabel: actualLbl };
}
