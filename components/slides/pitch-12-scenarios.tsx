import { SectionHeader, SourceLine } from "@/components/ui";
import { slide08ConvexityData } from "@/lib/data/slides";

const scenarioData = slide08ConvexityData;

const positionOrder = ["tl", "tr", "bl", "br"] as const;
const orderedQuadrants = positionOrder.map(
  (pos) => scenarioData.quadrants.find((q) => q.position === pos)!
);

export function PitchSlide12Scenarios() {
  return (
    <>
      <SectionHeader
        sectionLabel="SCENARIO ANALYSIS"
        title="The portfolio performs across all four plausible macro paths"
        subtitle="Every quadrant favors physical assets"
      />

      <div className="pitch-scenario-matrix">
        <span className="pitch-scenario-axis pitch-scenario-axis--top">
          {scenarioData.xAxisLeft} &larr;&rarr; {scenarioData.xAxisRight}
        </span>
        <span className="pitch-scenario-axis pitch-scenario-axis--left">
          {scenarioData.yAxisBottom}
        </span>
        <span className="pitch-scenario-axis pitch-scenario-axis--right">
          {scenarioData.yAxisTop}
        </span>

        {orderedQuadrants.map((q) => (
          <div key={q.position} className="pitch-scenario-cell">
            <div className="pitch-scenario-cell-title">{q.title}</div>
            <div className="pitch-scenario-cell-body">{q.narrative}</div>
          </div>
        ))}

        <span className="pitch-scenario-center-label">
          Hard assets outperform in every quadrant
        </span>
      </div>

      <SourceLine text={scenarioData.sourceLine} tight />
    </>
  );
}
