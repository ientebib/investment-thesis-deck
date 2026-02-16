import { SectionHeader, SourceLine } from "@/components/ui";
import { slide52RiskArchitectureData } from "@/lib/data/slides";

const data = slide52RiskArchitectureData;

export function PitchSlide18Risk() {
  return (
    <>
      <SectionHeader
        sectionLabel="RISK ARCHITECTURE"
        title="Structure is the first line of defense — the fund survives every stress scenario by design"
        subtitle="NO LEVERAGE &middot; NO SHORTS &middot; 10% LIMIT &middot; QUARTERLY LIQUIDITY"
      />
      <div className="pitch-risk-layout">
        <div className="pitch-risk-mitigants">
          {data.mitigants.map((m, i) => (
            <div key={i} className="pitch-risk-mitigant">
              <div className="pitch-risk-mitigant-num">{i + 1}</div>
              <div className="pitch-risk-mitigant-text">{m}</div>
            </div>
          ))}
        </div>
        <div className="pitch-stress-table">
          <div className="pitch-stress-title">{data.stressTitle}</div>
          {data.stressCards.map((card, i) => (
            <div key={i} className="pitch-stress-row">
              <div className="pitch-stress-row-title">{card.title}</div>
              <div className="pitch-stress-row-detail">{card.detail}</div>
            </div>
          ))}
        </div>
      </div>
      <SourceLine text="" tight />
    </>
  );
}
