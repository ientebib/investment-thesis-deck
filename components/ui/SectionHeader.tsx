type SectionHeaderProps = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  subtitleClassName?: string;
};

const TITLE_SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
  "via",
  "with"
]);

const TITLE_ACRONYMS = new Set([
  "AI",
  "API",
  "ARR",
  "BRICS",
  "CBOE",
  "CPU",
  "DM",
  "ETF",
  "ETFs",
  "FX",
  "GDP",
  "GFC",
  "GPU",
  "GW",
  "HBM",
  "IEA",
  "LTV",
  "NAV",
  "NNN",
  "NOI",
  "PPP",
  "R&D",
  "RLHF",
  "SFT",
  "US"
]);

function stripTerminalPeriod(text: string): string {
  return text.trim().replace(/\.+$/, "").trim();
}

function titleCaseToken(token: string, isFirst: boolean, isLast: boolean): string {
  const parts = token.split("-");
  const cased = parts.map((part, idx) => {
    if (!part) return part;
    if (/^[0-9]+$/.test(part)) return part;
    if (TITLE_ACRONYMS.has(part.toUpperCase())) return part.toUpperCase();

    const lower = part.toLowerCase();
    const isSmall = TITLE_SMALL_WORDS.has(lower);
    const shouldLower = isSmall && !(isFirst && idx === 0) && !isLast;
    if (shouldLower) return lower;

    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
  return cased.join("-");
}

function normalizeTitle(title: string): string {
  const cleaned = stripTerminalPeriod(title);
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words
    .map((word, idx) => titleCaseToken(word, idx === 0, idx === words.length - 1))
    .join(" ");
}

function normalizeSubtitle(subtitle: string): string {
  return stripTerminalPeriod(subtitle);
}

export function SectionHeader({ sectionLabel, title, subtitle, subtitleClassName }: SectionHeaderProps) {
  const normalizedTitle = normalizeTitle(title);
  const normalizedSubtitle = normalizeSubtitle(subtitle);
  const subtitleClasses = subtitleClassName ? `slide-subtitle ${subtitleClassName}` : "slide-subtitle";

  return (
    <>
      <div className="section-label">{sectionLabel}</div>
      <div className="slide-title">{normalizedTitle}</div>
      <div className={subtitleClasses}>{normalizedSubtitle}</div>
    </>
  );
}
