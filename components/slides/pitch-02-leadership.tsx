import { SectionHeader, SourceLine } from "@/components/ui";
import { slide02LeadershipData } from "@/lib/data/slides";

const slideData = slide02LeadershipData;

const whyUs = [
  { point: "Active Management", detail: "High-conviction macro positions across equities, commodities, currencies, crypto, credit, and derivatives" },
  { point: "AI-Native Process", detail: "Proprietary research systems built on frontier models for signal extraction and portfolio monitoring" },
  { point: "Periodic Reporting & Platform Access", detail: "Quarterly performance and attribution reporting, with an annual letter from Stack Capital." },
  { point: "Long-Term View", detail: "Portfolio construction oriented around multi-year secular regime shifts" }
];

export function PitchSlide02Leadership() {
  return (
    <>
      <SectionHeader
        sectionLabel="OVERVIEW"
        title="Leadership & Fund Overview"
        subtitle="Operators and allocators with direct experience in AI systems and global macro"
      />
      <div className="pitch-lead-split">
        <div className="pitch-lead-fund">
          <div className="pitch-lead-fund-name">Stack Capital</div>
          <div className="pitch-lead-fund-desc">
            Macro fund focused on the physical layer where geopolitical transition
            and capital-intensive AI deployment create persistent supply
            constraints.
          </div>
          <div className="pitch-lead-why">
            <div className="pitch-lead-why-title">Why Stack</div>
            {whyUs.map((w) => (
              <div key={w.point} className="pitch-lead-why-item">
                <div className="pitch-lead-why-point">
                  <span className="pitch-lead-why-dash">-</span> {w.point}
                </div>
                <div className="pitch-lead-why-detail">{w.detail}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="pitch-lead-team">
          {slideData.partners.map((partner) => (
            <div key={partner.name} className="pitch-lead-card">
              <div className="pitch-lead-card-name">{partner.name}</div>
              <div className="pitch-lead-card-role">{partner.role}</div>
              <div className="pitch-lead-card-bio">{partner.bio}</div>
            </div>
          ))}
        </div>
      </div>
      <SourceLine text="" />
    </>
  );
}
