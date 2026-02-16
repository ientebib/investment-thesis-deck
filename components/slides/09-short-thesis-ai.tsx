import { SectionHeader, SourceLine } from "@/components/ui";

const stats = [
  { number: "800M+", label: "Weekly active users" },
  { number: "$600B+", label: "Hyperscaler capex 2026" },
  { number: "~120 GW", label: "Datacenter power by 2029" }
];

const points = [
  "Own bottleneck layers: power, packaging, minerals",
  "Replacement-cost assets with hard permitting constraints",
  "Training and inference demand as dual revenue vectors"
];

export function Slide09ShortThesisAi() {
  return (
    <>
      <SectionHeader
        sectionLabel="AI INFRASTRUCTURE"
        title="AI Buildout Economics Clear Through Physical Infrastructure"
        subtitle="Software progress is exponential, but value capture concentrates in constrained hard-asset layers"
      />

      <div className="thesis-punch-layout">
        <div className="thesis-punch-stats">
          {stats.map((s) => (
            <div key={s.label} className="thesis-punch-stat thesis-punch-stat--secondary">
              <div className="thesis-punch-number">{s.number}</div>
              <div className="thesis-punch-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="thesis-punch-divider thesis-punch-divider--secondary" />

        <p className="thesis-punch-statement">
          AI capability is compounding exponentially, but value capture
          concentrates where supply can&apos;t keep up — in physical infrastructure,
          power, and minerals.
        </p>

        <div className="thesis-punch-translation">
          {points.map((p) => (
            <div key={p} className="thesis-punch-point">
              <span className="thesis-punch-point-marker thesis-punch-point-marker--secondary" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>

      <SourceLine text="Source: METR; Epoch AI; public hyperscaler filings; SemiAnalysis (compiled Feb 2026)." />
    </>
  );
}
