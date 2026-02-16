import { SectionHeader } from "@/components/ui";

export function PitchSlide03Thesis() {
  return (
    <>
      <SectionHeader
        sectionLabel="INVESTMENT THESIS"
        title="Two structural forces are converging at the same physical layer"
        subtitle="Fiscal constraint + AI infrastructure buildout"
      />
      <div className="pitch-cv">
        <div className="pitch-cv-side pitch-cv-side--fiscal">
          <div className="pitch-cv-side-label">Fiscal Dominance</div>
          <div className="pitch-cv-side-items">
            <div className="pitch-cv-side-item">
              <div className="pitch-cv-side-stat">120%+</div>
              <div className="pitch-cv-side-desc">
                Debt/GDP with no consolidation path
              </div>
            </div>
            <div className="pitch-cv-side-item">
              <div className="pitch-cv-side-stat">$1 in $5</div>
              <div className="pitch-cv-side-desc">
                Federal revenue consumed by interest
              </div>
            </div>
            <div className="pitch-cv-side-item">
              <div className="pitch-cv-side-stat">1,000+ t</div>
              <div className="pitch-cv-side-desc">
                Central bank gold purchases per year
              </div>
            </div>
          </div>
        </div>

        <div className="pitch-cv-center">
          <div className="pitch-cv-center-label">The Physical Layer</div>
          <div className="pitch-cv-center-items">
            <div className="pitch-cv-center-item">Power</div>
            <div className="pitch-cv-center-item">Copper</div>
            <div className="pitch-cv-center-item">Critical Minerals</div>
            <div className="pitch-cv-center-item">Semiconductors</div>
            <div className="pitch-cv-center-item">Land</div>
            <div className="pitch-cv-center-item">Water</div>
          </div>
          <div className="pitch-cv-center-tagline">
            Durable, asymmetric returns
          </div>
        </div>

        <div className="pitch-cv-side pitch-cv-side--ai">
          <div className="pitch-cv-side-label">AI Infrastructure</div>
          <div className="pitch-cv-side-items">
            <div className="pitch-cv-side-item">
              <div className="pitch-cv-side-stat">$600B+</div>
              <div className="pitch-cv-side-desc">
                Hyperscaler capex committed for 2026
              </div>
            </div>
            <div className="pitch-cv-side-item">
              <div className="pitch-cv-side-stat">120 GW</div>
              <div className="pitch-cv-side-desc">
                Datacenter power projected by 2029
              </div>
            </div>
            <div className="pitch-cv-side-item">
              <div className="pitch-cv-side-stat">4x</div>
              <div className="pitch-cv-side-desc">
                Critical mineral demand growth by 2040
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
