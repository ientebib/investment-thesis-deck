import { SectionHeader, SourceLine } from "@/components/ui";
import { slide58PackagingChokepointData } from "@/lib/data/slides";

const slideData = slide58PackagingChokepointData;

function hbmToneClass(tone: "primary" | "secondary" | "negative") {
  if (tone === "primary") {
    return "gpu-packaging-step--primary";
  }
  if (tone === "negative") {
    return "gpu-packaging-step--negative";
  }
  return "gpu-packaging-step--secondary";
}

export function Slide58GpuPackaging() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="gpu-packaging-layout">
        <article className="gpu-packaging-anatomy-card">
          <div className="gpu-packaging-anatomy-head">
            <h3 className="global-repricing-label">{slideData.anatomyTitle}</h3>
            <p className="gpu-packaging-anatomy-note">{slideData.anatomySubtitle}</p>
          </div>

          <div className="gpu-packaging-chip-stack">
            <div className="gpu-packaging-chip">HBM3e</div>
            <div className="gpu-packaging-chip">HBM3e</div>
            <div className="gpu-packaging-core-chip">GPU DIE</div>
            <div className="gpu-packaging-chip">HBM3e</div>
            <div className="gpu-packaging-chip">HBM3e</div>
          </div>

          <div className="gpu-packaging-layer gpu-packaging-layer--interposer">Silicon interposer (CoWoS)</div>
          <div className="gpu-packaging-layer gpu-packaging-layer--substrate">Organic substrate</div>
        </article>

        <div className="gpu-packaging-detail-row">
          <article className="gpu-packaging-memory-card">
            <h3 className="global-repricing-label">{slideData.hbmTitle}</h3>
            <div className="gpu-packaging-memory-steps">
              {slideData.hbmProgression.map((step, index) => (
                <div key={step.model} className={`gpu-packaging-step ${hbmToneClass(step.tone)}`}>
                  <div className="gpu-packaging-step-metric">{step.memoryGb}</div>
                  <div className="gpu-packaging-step-model">{step.model}</div>
                  <div className="gpu-packaging-step-stack">{step.stackConfig}</div>
                  {index < slideData.hbmProgression.length - 1 ? (
                    <div className="gpu-packaging-step-arrow">-&gt;</div>
                  ) : null}
                </div>
              ))}
            </div>
          </article>

          <div className="gpu-packaging-metric-stack">
            {slideData.metrics.map((metric) => (
              <article key={metric.label} className="gpu-packaging-metric-card">
                <div className="gpu-packaging-metric-value">{metric.value}</div>
                <div className="gpu-packaging-metric-label">{metric.label}</div>
              </article>
            ))}
          </div>
        </div>

        <article className="gpu-packaging-takeaway">
          <h3 className="global-repricing-label">{slideData.takeawayTitle}</h3>
          <p className="commodities-reshoring-body">{slideData.takeawayBody}</p>
        </article>
      </div>

      <SourceLine text={slideData.sourceLine} tight />
    </>
  );
}
