import { SectionHeader, SourceLine } from "@/components/ui";
import { slide02LeadershipData } from "@/lib/data/slides";

const slideData = slide02LeadershipData;

const whyUs = [
  { point: "Active management", detail: "Concentrated, high-conviction macro positions across equity, commodity, and currency markets" },
  { point: "Structural edge", detail: "Focused on the physical infrastructure layer where capital intensity creates durable asymmetries" },
  { point: "AI-native process", detail: "Proprietary research systems built on frontier models for signal extraction and portfolio monitoring" },
  { point: "Full transparency", detail: "Quarterly performance reports with attribution and an annual letter from the managing partners" },
  { point: "Long-term view", detail: "Portfolio construction oriented around multi-year secular regime shifts" }
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
            Global macro hedge fund with exposure to technology-critical supply
            chains, hard assets, and the infrastructure underpinning the next
            era of compute.
          </div>
          <div className="pitch-lead-why">
            <div className="pitch-lead-why-title">Why Stack</div>
            {whyUs.map((w) => (
              <div key={w.point} className="pitch-lead-why-item">
                <span className="pitch-lead-why-point">{w.point}</span>
                <span className="pitch-lead-why-detail">{w.detail}</span>
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
