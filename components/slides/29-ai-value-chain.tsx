import { SectionHeader, SourceLine } from "@/components/ui";
import { slide29ValueChainData } from "@/lib/data/slides";

const slideData = slide29ValueChainData;

export function Slide29AiValueChain() {
  return (
    <>
      <div className="section-label">{slideData.sectionLabel}</div>
      <div className="slide-title">{slideData.title}</div>
      <div className="slide-subtitle ai-value-chain-slide-subtitle">{slideData.subtitle}</div>

      <div className="ai-value-chain-layout">
        <div className="ai-value-chain-flow">
          {slideData.flowLabels.map((label) => (
            <div key={label} className="ai-value-chain-flow-pill">
              {label}
            </div>
          ))}
        </div>

        <div className="ai-value-chain-phases">
          {slideData.phases.map((phase) => (
            <section key={phase.phaseTitle} className="ai-value-chain-phase">
              <aside className="ai-value-chain-phase-meta">
                <h3 className="ai-value-chain-phase-title">{phase.phaseTitle}</h3>
                <p className="ai-value-chain-phase-description">{phase.phaseDescription}</p>
              </aside>

              <div className="ai-value-chain-node-row">
                {phase.nodes.map((node) => (
                  <article key={node.title} className="ai-value-chain-node">
                    <h4 className="ai-value-chain-node-title">{node.title}</h4>
                    <p className="ai-value-chain-node-subtitle">{node.subtitle}</p>
                    <p className="ai-value-chain-node-evidence">{node.evidence}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} tight />
    </>
  );
}
