import { SectionHeader, SourceLine } from "@/components/ui";

const gates = [
  { num: 1, title: "Trend Validation", desc: "Macro trend confirmed by 3+ independent data sources" },
  { num: 2, title: "Hypothesis Formation", desc: "Testable claim with defined KPIs and failure conditions" },
  { num: 3, title: "Position Sizing", desc: "Conviction score maps to position weight within structural limits" },
  { num: 4, title: "Monitoring", desc: "Graded KPIs on cadence, scenario sets trigger rebalancing" },
];

const infraCards = [
  { title: "Data", items: ["FMP API", "SEC EDGAR", "FRED", "Epoch AI"] },
  { title: "Agent", items: ["Long Horizon CLI", "Persistent memory", "Human review"] },
  { title: "Skills", items: ["Equity Research", "Risk Analysis", "Quant Factors"] },
  { title: "Output", items: ["Research Memos", "Data Tables", "Risk Reports"] },
];

export function PitchSlide15Research() {
  return (
    <>
      <SectionHeader
        sectionLabel="RESEARCH PROCESS"
        title="Systematic conviction — every position passes through four institutional gates"
        subtitle="13 HYPOTHESES &middot; 39 KPIS &middot; 188 VALIDATION CHECKS"
      />
      <div className="pitch-research-layout">
        <div className="pitch-research-gates">
          {gates.map((g) => (
            <div key={g.num} className="pitch-research-gate">
              <div className="pitch-research-gate-num">{g.num}</div>
              <div className="pitch-research-gate-title">{g.title}</div>
              <div className="pitch-research-gate-desc">{g.desc}</div>
            </div>
          ))}
        </div>
        <div className="pitch-research-infra">
          {infraCards.map((card) => (
            <div key={card.title} className="pitch-research-infra-card">
              <div className="pitch-research-infra-title">{card.title}</div>
              <div className="pitch-research-infra-items">
                {card.items.map((item) => (
                  <span key={item} className="pitch-research-infra-chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SourceLine text="Source: Stack Capital internal research framework (February 2026)" tight />
    </>
  );
}
