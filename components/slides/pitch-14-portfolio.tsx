import { SectionHeader } from "@/components/ui";

export function PitchSlide14Portfolio() {
  return (
    <>
      <SectionHeader
        sectionLabel="PORTFOLIO CONSTRUCTION"
        title="Liquid, global, and positioned at the intersection of scarce resources and structural demand"
        subtitle="Multi-asset · No leverage · 10% position limit"
      />
      <div className="pitch-two-col">
        <div className="pitch-col">
          <div className="pitch-col-header">Investment Universe</div>
          <div className="pitch-col-item">Global liquid equities (commodity producers, infrastructure, semis)</div>
          <div className="pitch-col-item">Physical commodities (gold, copper, uranium via ETFs)</div>
          <div className="pitch-col-item">Fixed income (TIPS, short-duration Treasuries)</div>
          <div className="pitch-col-item">Digital assets (Bitcoin, selected Layer 1)</div>
          <div className="pitch-col-item">Currencies (select EM and commodity FX)</div>
        </div>
        <div className="pitch-col">
          <div className="pitch-col-header">Structural Limits</div>
          <div className="pitch-col-item">No leverage — no margin, no futures-based leverage</div>
          <div className="pitch-col-item">No short selling — long-only conviction positions</div>
          <div className="pitch-col-item">10% single-position limit — enforced at cost basis</div>
          <div className="pitch-col-item">Quarterly NAV reporting with LP access</div>
          <div className="pitch-col-item">10-year lock-up with annual liquidity windows after year 3</div>
        </div>
      </div>
      <div className="pitch-callout-box">
        Liquid, global, and positioned at the intersection of scarce resources and structural demand
      </div>
    </>
  );
}
