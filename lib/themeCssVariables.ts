import type { CSSProperties } from "react";
import { fonts, spacing, theme, typographyScale, themeMode } from "@/lib/theme";

const cssVariables: Record<string, string> = {
  "--theme-mode": themeMode,

  "--bg": theme.bg,
  "--bg-alt": theme.bgAlt,
  "--surface-1": theme.surface1,
  "--surface-2": theme.surface2,
  "--surface-3": theme.surface3,
  "--border": theme.border,
  "--border-light": theme.borderLight,

  "--primary": theme.primary,
  "--primary-dark": theme.primaryDark,
  "--primary-darkest": theme.primaryDarkest,
  "--primary-light": theme.primaryLight,
  "--primary-lightest": theme.primaryLightest,
  "--primary-muted": theme.primaryMuted,

  "--secondary": theme.secondary,
  "--secondary-dark": theme.secondaryDark,
  "--secondary-light": theme.secondaryLight,
  "--secondary-lightest": theme.secondaryLightest,
  "--secondary-muted": theme.secondaryMuted,

  "--ext-1": theme.ext1,
  "--ext-2": theme.ext2,
  "--ext-3": theme.ext3,

  "--text-primary": theme.textPrimary,
  "--text-secondary": theme.textSecondary,
  "--text-tertiary": theme.textTertiary,
  "--text-muted": theme.textMuted,
  "--text-faint": theme.textFaint,

  "--positive": theme.positive,
  "--negative": theme.negative,
  "--caution": theme.caution,
  "--neutral": theme.neutral,

  "--font-display": fonts.display,
  "--font-body": fonts.body,
  "--font-data": fonts.data,

  "--slide-padding": spacing.slidePadding,
  "--card-padding": spacing.cardPadding,
  "--header-bar-height": spacing.headerBarHeight,
  "--footer-bar-height": spacing.footerBarHeight,
  "--separator-to-title-gap": spacing.separatorToTitleGap,
  "--title-to-subtitle-gap": spacing.titleToSubtitleGap,
  "--title-block-to-content-gap": spacing.titleBlockToContentGap,
  "--content-to-footer-gap": spacing.contentToFooterGap,
  "--chart-container-padding": spacing.chartContainerPadding,
  "--data-card-gap": spacing.dataCardGap,
  "--radius-sm": spacing.radiusSm,
  "--radius-md": spacing.radiusMd,
  "--radius-lg": spacing.radiusLg,

  "--type-display-size": `${typographyScale.display.size}px`,
  "--type-h1-size": `${typographyScale.h1.size}px`,
  "--type-h1-dense-size": `${typographyScale.h1Dense.size}px`,
  "--type-h2-accent-size": `${typographyScale.h2Accent.size}px`,
  "--type-h3-size": `${typographyScale.h3.size}px`,
  "--type-body-size": `${typographyScale.body.size}px`,
  "--type-caption-size": `${typographyScale.caption.size}px`,
  "--type-data-size": `${typographyScale.data.size}px`,
  "--type-axis-size": `${typographyScale.axis.size}px`,
  "--type-micro-size": `${typographyScale.micro.size}px`,

  "--type-h2-accent-letter-spacing": `${typographyScale.h2Accent.letterSpacing}px`,
  "--type-caption-letter-spacing": `${typographyScale.caption.letterSpacing}px`,
  "--type-micro-letter-spacing": `${typographyScale.micro.letterSpacing}px`,

  // Backward-compatible aliases used by earlier migrated components.
  "--navy": theme.textPrimary,
  "--teal": theme.primary,
  "--light-blue": theme.surface2,
  "--gray": theme.textSecondary,
  "--source-gray": theme.textTertiary,
  "--white": theme.bg,
  "--card-border": theme.border
};

export const themeCssVariables = cssVariables as CSSProperties;
