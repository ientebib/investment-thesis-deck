import { SectionHeader, SourceLine } from "@/components/ui";

const stats = [
  { number: ">120%", label: "Debt to GDP" },
  { number: "$1 in $5", label: "Goes to interest" },
  { number: ">1,000t", label: "CB gold buying per year" }
];

const points = [
  "Hard-asset exposure over long-duration nominal claims",
  "Gold and commodities as policy-credibility hedges",
  "Supply-constrained underwriting, not CPI mean reversion"
];

export function Slide08ShortThesisMacro() {
  return (
    <>
      <SectionHeader
        sectionLabel="MACRO THESIS"
        title="Fiscal Constraint Is Repricing the Real-Asset Complex"
        subtitle="Debt dynamics, policy response, and supply rigidity point to a sustained real-asset regime"
      />

      <div className="thesis-punch-layout">
        <div className="thesis-punch-stats">
          {stats.map((s) => (
            <div key={s.label} className="thesis-punch-stat">
              <div className="thesis-punch-number">{s.number}</div>
              <div className="thesis-punch-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="thesis-punch-divider" />

        <p className="thesis-punch-statement">
          Sovereign debt is structurally non-reducible. Central banks are already
          rotating from Treasuries into gold — the real-asset regime has begun.
        </p>

        <div className="thesis-punch-translation">
          {points.map((p) => (
            <div key={p} className="thesis-punch-point">
              <span className="thesis-punch-point-marker" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>

      <SourceLine text="Source: CBO; IMF WEO; US Treasury; Federal Reserve; World Gold Council (compiled Feb 2026)." />
    </>
  );
}
