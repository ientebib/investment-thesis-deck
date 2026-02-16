import { SectionHeader, SourceLine } from "@/components/ui";

const assetData = {
  sectionLabel: "SCENARIO ANALYSIS",
  title: "Each macro path maps to specific asset classes with structural tailwinds",
  subtitle: "Portfolio positioning across scenarios",
  xAxisLeft: "ADOPTION STALLS",
  xAxisRight: "BROAD AUTOMATION",
  yAxisTop: "US HEGEMONY HOLDS",
  yAxisBottom: "US FRAGMENTS",
  quadrants: [
    {
      title: "Fiscal Repression",
      narrative:
        "Gold, TIPS, farmland, energy infrastructure, Bitcoin. Yield-curve control and negative real rates drive capital into stores of value that cannot be debased.",
      tone: "secondary",
      position: "tl"
    },
    {
      title: "Orderly Buildout",
      narrative:
        "Copper miners, uranium, grid utilities, datacenter REITs, semiconductors. Physical bottlenecks tighten as hyperscaler capex floods into infrastructure.",
      tone: "primary",
      position: "tr"
    },
    {
      title: "Maximum Repression",
      narrative:
        "Physical gold, Bitcoin, commodity producers, real assets ex-equities. Capital controls and financial repression make hard assets the only credible store of value.",
      tone: "caution",
      position: "bl"
    },
    {
      title: "Accelerated Fragmentation",
      narrative:
        "Onshoring beneficiaries, defense, rare earths, energy independence plays. Supply chains duplicate across blocs, multiplying demand for physical capacity.",
      tone: "negative",
      position: "br"
    }
  ],
  sourceLine: "Source: Stack Capital internal scenario analysis (February 2026)"
};

export function PitchSlide13AssetClasses() {
  return (
    <>
      <SectionHeader
        sectionLabel={assetData.sectionLabel}
        title={assetData.title}
        subtitle={assetData.subtitle}
      />

      <div className="convex-layout">
        <div className="convex-field">
          <div className="convex-crosshair-h" />
          <div className="convex-crosshair-v" />

          <span className="convex-ax convex-ax--xl">{assetData.xAxisLeft}</span>
          <span className="convex-ax convex-ax--xr">{assetData.xAxisRight}</span>
          <span className="convex-ax convex-ax--yt">{assetData.yAxisTop}</span>
          <span className="convex-ax convex-ax--yb">{assetData.yAxisBottom}</span>

          <span className="convex-arrow convex-arrow--l" />
          <span className="convex-arrow convex-arrow--r" />
          <span className="convex-arrow convex-arrow--t" />
          <span className="convex-arrow convex-arrow--b" />

          {assetData.quadrants.map((q) => (
            <div key={q.position} className={`convex-region convex-region--${q.position}`}>
              <span className={`convex-region-title convex-region-title--${q.tone}`}>
                {q.title}
              </span>
              <span className="convex-region-narrative">{q.narrative}</span>
            </div>
          ))}

          <div className="convex-wash" />
        </div>
      </div>

      <SourceLine text={assetData.sourceLine} />
    </>
  );
}
