import { SectionHeader, SourceLine } from "@/components/ui";
import { slide48LeadingIndicatorsData } from "@/lib/data/slides";

const data = slide48LeadingIndicatorsData;

const trendTones: Record<string, string> = {
  primary: "pitch-kpi-flow-card--primary",
  secondary: "pitch-kpi-flow-card--secondary",
  tertiary: "pitch-kpi-flow-card--tertiary",
};

export function PitchSlide16Kpi() {
  return (
    <>
      <SectionHeader
        sectionLabel="RESEARCH PROCESS"
        title="Every hypothesis has a monitoring cadence, graded KPIs, and explicit failure conditions"
        subtitle="3 MACRO TRENDS &rarr; 13 HYPOTHESES &rarr; 39 KPIS &rarr; 40 SCENARIOS"
      />
      <div className="pitch-kpi-flow">
        {/* Row 1: Trends */}
        <div className="pitch-kpi-flow-row">
          <div className="pitch-kpi-flow-label">TRENDS</div>
          <div className="pitch-kpi-flow-cards">
            {data.trends.map((trend) => (
              <div
                key={trend.id}
                className={`pitch-kpi-flow-card ${trendTones[trend.tone] ?? ""}`}
              >
                <div className="pitch-kpi-flow-card-title">{trend.name}</div>
                <div className="pitch-kpi-flow-card-meta">
                  {trend.horizon} &middot; {trend.hypotheses.length} hypotheses
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sample hypotheses */}
        <div className="pitch-kpi-flow-row">
          <div className="pitch-kpi-flow-label">HYPOTHESES</div>
          <div className="pitch-kpi-flow-cards">
            {data.trends.map((trend) => (
              <div
                key={trend.id}
                className={`pitch-kpi-flow-card ${trendTones[trend.tone] ?? ""}`}
              >
                {trend.hypotheses.slice(0, 3).map((h) => (
                  <div key={h.id} className="pitch-kpi-flow-card-hyp">{h.name}</div>
                ))}
                {trend.hypotheses.length > 3 && (
                  <div className="pitch-kpi-flow-card-more">
                    +{trend.hypotheses.length - 3} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Summary stats */}
        <div className="pitch-kpi-flow-row">
          <div className="pitch-kpi-flow-label">KPIS</div>
          <div className="pitch-kpi-flow-cards">
            <div className="pitch-kpi-flow-stat">
              <div className="pitch-kpi-flow-stat-num">{data.stats.kpis}</div>
              <div className="pitch-kpi-flow-stat-label">KPIs tracked</div>
            </div>
            <div className="pitch-kpi-flow-stat">
              <div className="pitch-kpi-flow-stat-num">{data.stats.validationChecks}</div>
              <div className="pitch-kpi-flow-stat-label">Validation checks</div>
            </div>
            <div className="pitch-kpi-flow-stat">
              <div className="pitch-kpi-flow-stat-num">{data.stats.scenarios}</div>
              <div className="pitch-kpi-flow-stat-label">Scenario branches</div>
            </div>
          </div>
        </div>
      </div>
      <SourceLine text="Source: Stack Capital internal research framework (February 2026)" tight />
    </>
  );
}
