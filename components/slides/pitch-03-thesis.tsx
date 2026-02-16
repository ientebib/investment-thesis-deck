import { SectionHeader } from "@/components/ui";

export function PitchSlide03Thesis() {
  return (
    <>
      <SectionHeader
        sectionLabel="INVESTMENT THESIS"
        title="Convexity Across a Regime Shift"
        subtitle="WHERE WE INVEST AND WHY"
      />
      <div className="pitch-cv">
        <div className="pitch-cv-side pitch-cv-side--fiscal">
          <div className="pitch-cv-side-label">Constrained Institutions</div>
          <div className="pitch-cv-side-prose">
            <p>
              <span className="pitch-cv-emph">Public debt</span>,{" "}
              <span className="pitch-cv-emph">interest burdens</span>, and{" "}
              <span className="pitch-cv-emph">geopolitical fragmentation</span> have
              narrowed policy flexibility across advanced economies.
            </p>
            <p>
              Maintaining <span className="pitch-cv-emph">restrictive real financial conditions</span>{" "}
              becomes increasingly costly, biasing policy toward{" "}
              <span className="pitch-cv-emph">accommodation</span> and{" "}
              <span className="pitch-cv-emph">financial repression</span>.
            </p>
            <p>
              <span className="pitch-cv-emph">Supply-chain fragmentation</span> and{" "}
              <span className="pitch-cv-emph">reindustrialization</span> accelerate
              capital rotation from nominal claims toward assets with direct linkage
              to <span className="pitch-cv-emph">real resources</span> and{" "}
              <span className="pitch-cv-emph">productive capacity</span>.
            </p>
          </div>
        </div>

        <div className="pitch-cv-arrow" aria-hidden="true">→</div>

        <div className="pitch-cv-center">
          <div className="pitch-cv-center-label">Scarce Assets & Durable Moats</div>
          <div className="pitch-cv-center-items">
            <div className="pitch-cv-center-item">
              <span className="pitch-cv-emph">Real resources</span> over nominal claims
            </div>
            <div className="pitch-cv-center-item">
              <span className="pitch-cv-emph">Physical bottlenecks</span> with structural scarcity
            </div>
            <div className="pitch-cv-center-item">
              <span className="pitch-cv-emph">Supply</span> reacts slowly to demand, capacity lags by years
            </div>
            <div className="pitch-cv-center-item">
              Enterprises that <span className="pitch-cv-emph">control access</span> and pricing
            </div>
            <div className="pitch-cv-center-item">
              <span className="pitch-cv-emph">Convex</span> to constraint, not dependent on a single outcome
            </div>
          </div>
        </div>

        <div className="pitch-cv-arrow" aria-hidden="true">←</div>

        <div className="pitch-cv-side pitch-cv-side--ai">
          <div className="pitch-cv-side-label">Frontier AI at Scale</div>
          <div className="pitch-cv-side-prose">
            <p>
              <span className="pitch-cv-emph">AI capability</span> is compounding rapidly,
              enabling <span className="pitch-cv-emph">substitution</span> across{" "}
              <span className="pitch-cv-emph">cognitively intensive workflows</span>{" "}
              economy-wide.
            </p>
            <p>
              These gains are increasingly <span className="pitch-cv-emph">capital-intensive</span>,
              translating into sustained demand for{" "}
              <span className="pitch-cv-emph">compute</span>,{" "}
              <span className="pitch-cv-emph">power</span>, and{" "}
              <span className="pitch-cv-emph">physical infrastructure</span>.
            </p>
            <p>
              As AI <span className="pitch-cv-emph">commoditizes cognition</span>, competitive
              advantage shifts to whoever controls{" "}
              <span className="pitch-cv-emph">distribution</span>,{" "}
              <span className="pitch-cv-emph">integration</span>, and{" "}
              <span className="pitch-cv-emph">access</span> to{" "}
              <span className="pitch-cv-emph">scarce capacity</span>.
            </p>
            <p>
              <span className="pitch-cv-emph">Labor displacement</span> at scale amplifies{" "}
              <span className="pitch-cv-emph">fiscal pressure</span>, widening{" "}
              <span className="pitch-cv-emph">deficits</span>, increasing{" "}
              <span className="pitch-cv-emph">transfer demands</span>, and reinforcing
              already existing <span className="pitch-cv-emph">sociopolitical pressures</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
