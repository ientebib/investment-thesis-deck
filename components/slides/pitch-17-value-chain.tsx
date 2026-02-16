import { SectionHeader, SourceLine } from "@/components/ui";
import { slide29ValueChainData } from "@/lib/data/slides";

const data = slide29ValueChainData;
const PHYSICAL_CUTOFF = 7; // layers 0-6 are physical

export function PitchSlide17ValueChain() {
  return (
    <>
      <SectionHeader
        sectionLabel="AI VALUE CHAIN"
        title="The fund maps the full AI infrastructure stack from raw materials to end-user access"
        subtitle="12 LAYERS · 75+ NODES · PHYSICAL BOTTLENECKS FIRST"
      />
      <div className="pitch-vc-table">
        <div className="pitch-vc-row pitch-vc-row--header">
          <span>Layer</span>
          <span>Name</span>
          <span>Nodes</span>
          <span>Key Insight</span>
        </div>
        {data.layers.map((layer) => (
          <div
            key={layer.id}
            className={`pitch-vc-row ${layer.id < PHYSICAL_CUTOFF ? "pitch-vc-row--physical" : ""}`}
          >
            <span className="pitch-vc-layer-num">{layer.id + 1}</span>
            <span className="pitch-vc-layer-name">{layer.shortName}</span>
            <span className="pitch-vc-node-count">{layer.nodes.length}</span>
            <span className="pitch-vc-insight">{layer.description}</span>
          </div>
        ))}
        <div className="pitch-vc-legend">
          <span><span className="pitch-vc-legend-dot pitch-vc-legend-dot--physical" />Physical (layers 1-7) — where we invest</span>
          <span><span className="pitch-vc-legend-dot pitch-vc-legend-dot--software" />Software (layers 8-12)</span>
        </div>
      </div>
      <SourceLine text={data.sourceLine} tight />
    </>
  );
}
