export type ThemeMode = "dark" | "light";

export const fonts = {
  display: "'EB Garamond', Georgia, 'Times New Roman', serif",
  body: "'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif",
  data: "'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, 'Courier New', monospace"
} as const;

export const themeByMode = {
  dark: {
    mode: "dark",
    bg: "#0A0A0A",
    bgAlt: "#070707",
    surface1: "#111111",
    surface2: "#181818",
    surface3: "#1E1E1E",
    border: "#1E1E1E",
    borderLight: "#282828",
    primary: "#5A8F6A",
    primaryDark: "#3D6E4A",
    primaryDarkest: "#2D5435",
    primaryLight: "#7BAF8B",
    primaryLightest: "#A3CBAF",
    primaryMuted: "#5A8F6A40",
    secondary: "#4A7DA8",
    secondaryDark: "#345E82",
    secondaryLight: "#6B9DC8",
    secondaryLightest: "#92BDE0",
    secondaryMuted: "#4A7DA840",
    ext1: "#8B7355",
    ext2: "#A0856B",
    ext3: "#7A7A9B",
    textPrimary: "#F0F0F0",
    textSecondary: "#C0C0C0",
    textTertiary: "#999999",
    textMuted: "#666666",
    textFaint: "#444444",
    positive: "#5A8F6A",
    negative: "#C45B5B",
    caution: "#C4A35B",
    neutral: "#999999"
  },
  light: {
    mode: "light",
    bg: "#F9FAFB",
    bgAlt: "#F3F4F6",
    surface1: "#FFFFFF",
    surface2: "#F6F7F8",
    surface3: "#EFF0F2",
    border: "#DDE0E4",
    borderLight: "#E6E8EB",
    primary: "#0D7A3E",
    primaryDark: "#065C2D",
    primaryDarkest: "#065C2D",
    primaryLight: "#18A055",
    primaryLightest: "#18A055",
    primaryMuted: "#0D7A3E18",
    secondary: "#0B5EA8",
    secondaryDark: "#084A8A",
    secondaryLight: "#1474C4",
    secondaryLightest: "#1474C4",
    secondaryMuted: "#0B5EA818",
    ext1: "#8B7355",
    ext2: "#A0856B",
    ext3: "#7A7A9B",
    textPrimary: "#111111",
    textSecondary: "#2A2A2A",
    textTertiary: "#585858",
    textMuted: "#8A8A8A",
    textFaint: "#A8A8A8",
    positive: "#0D7A3E",
    negative: "#C43030",
    caution: "#B08415",
    neutral: "#8A8A8A"
  }
} as const;

export type Theme = (typeof themeByMode)[ThemeMode];

export const typographyScale = {
  display: { size: 44, family: fonts.display, weight: 400, letterSpacing: 0.5 },
  h1: { size: 32, family: fonts.display, weight: 400, letterSpacing: 0.3 },
  h1Dense: { size: 22, family: fonts.display, weight: 400, letterSpacing: 0.2 },
  h2Accent: { size: 15, family: fonts.body, weight: 500, letterSpacing: 1.5 },
  h3: { size: 15, family: fonts.body, weight: 500, letterSpacing: 0.3 },
  body: { size: 15, family: fonts.body, weight: 400, letterSpacing: 0 },
  caption: { size: 13, family: fonts.body, weight: 400, letterSpacing: 1.5 },
  data: { size: 14, family: fonts.data, weight: 400, letterSpacing: 0 },
  axis: { size: 12, family: fonts.data, weight: 300, letterSpacing: 0 },
  micro: { size: 10, family: fonts.data, weight: 400, letterSpacing: 2 }
} as const;

export const spacing = {
  slidePadding: "12px 32px 24px 32px",
  cardPadding: "16px",
  headerBarHeight: "40px",
  footerBarHeight: "24px",
  separatorToTitleGap: "16px",
  titleToSubtitleGap: "4px",
  titleBlockToContentGap: "20px",
  contentToFooterGap: "16px",
  chartContainerPadding: "16px",
  dataCardGap: "8px",
  radiusSm: "4px",
  radiusMd: "8px",
  radiusLg: "10px"
} as const;

export const chartSeriesRules = {
  maxSeries: 6,
  colors: (theme: Theme) => [
    theme.primary,
    theme.secondary,
    theme.primaryLight,
    theme.secondaryLight,
    theme.ext1,
    theme.ext3
  ]
} as const;

export function chartSeriesColor(theme: Theme, index: number) {
  const palette = chartSeriesRules.colors(theme);
  return palette[index] ?? theme.ext3;
}

function resolveThemeModeFromEnv(): ThemeMode {
  const mode = (process.env.NEXT_PUBLIC_THEME_MODE ?? "light").toLowerCase();
  return mode === "dark" ? "dark" : "light";
}

export const themeMode = resolveThemeModeFromEnv();
export const theme = themeByMode[themeMode];

export const semanticUsageRules = {
  title: "Display font only (EB Garamond)",
  body: "Inter for all body text and UI labels",
  data: "JetBrains Mono for metrics, axes, table numbers",
  primary: "Physical layer and primary metrics",
  secondary: "Model/compute layer and secondary metrics",
  accents: "Use primary for key highlights; use semantic colors only for status"
} as const;
