import { SectionHeader, SourceLine } from "@/components/ui";
import { slide52RiskArchitectureData } from "@/lib/data/slides";

const slideData = slide52RiskArchitectureData;

export function Slide52RiskArchitecture() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="risk-layout">
        <div className="risk-columns">
          <article className="risk-column-card risk-column-card--primary">
            <h3 className="terms-panel-title">{slideData.riskFactorsTitle}</h3>
            <ul className="risk-list">
              {slideData.riskFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="risk-column-card risk-column-card--secondary">
            <h3 className="terms-panel-title">{slideData.mitigantsTitle}</h3>
            <ul className="risk-list">
              {slideData.mitigants.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <section className="risk-stress-wrap">
          <h3 className="adoption-row-label">{slideData.stressTitle}</h3>
          <div className="risk-stress-grid">
            {slideData.stressCards.map((card) => (
              <article key={card.title} className="risk-stress-card">
                <div className="risk-stress-title">{card.title}</div>
                <div className="risk-stress-detail">{card.detail}</div>
              </article>
            ))}
          </div>
        </section>

        <p className="risk-conclusion">{slideData.conclusion}</p>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
