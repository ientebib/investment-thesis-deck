import { SectionHeader, SourceLine } from "@/components/ui";
import { slide08ConvexityData } from "@/lib/data/slides";

const d = slide08ConvexityData;

export function Slide08ScenarioMatrix() {
  return (
    <>
      <SectionHeader
        sectionLabel={d.sectionLabel}
        title={d.title}
        subtitle={d.subtitle}
      />

      <div className="convex-layout">
        {/* The continuous 2D field */}
        <div className="convex-field">
          {/* Subtle crosshair */}
          <div className="convex-crosshair-h" />
          <div className="convex-crosshair-v" />

          {/* X-axis labels */}
          <span className="convex-ax convex-ax--xl">{d.xAxisLeft}</span>
          <span className="convex-ax convex-ax--xr">{d.xAxisRight}</span>
          {/* Y-axis labels */}
          <span className="convex-ax convex-ax--yt">{d.yAxisTop}</span>
          <span className="convex-ax convex-ax--yb">{d.yAxisBottom}</span>

          {/* Arrow hints on axes */}
          <span className="convex-arrow convex-arrow--l" />
          <span className="convex-arrow convex-arrow--r" />
          <span className="convex-arrow convex-arrow--t" />
          <span className="convex-arrow convex-arrow--b" />

          {/* Four floating scenario regions */}
          {d.quadrants.map((q) => (
            <div key={q.position} className={`convex-region convex-region--${q.position}`}>
              <span className={`convex-region-title convex-region-title--${q.tone}`}>
                {q.title}
              </span>
              <span className="convex-region-narrative">{q.narrative}</span>
              {q.assets && (
                <span className="convex-region-assets">{q.assets}</span>
              )}
            </div>
          ))}

          {/* Green wash overlay — hard assets win everywhere */}
          <div className="convex-wash" />
        </div>

      </div>

      <SourceLine text={d.sourceLine} />
    </>
  );
}
