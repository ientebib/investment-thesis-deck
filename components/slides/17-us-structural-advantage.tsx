import { SectionHeader, SourceLine } from "@/components/ui";
import { slide17UsAdvantageData } from "@/lib/data/slides";

const slideData = slide17UsAdvantageData;

export function Slide17UsStructuralAdvantage() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="us-advantage-grid">
        {slideData.cards.map((card) => (
          <article key={card.title} className={`us-advantage-card us-advantage-card--${card.tone}`}>
            <header className="us-advantage-card-head">
              <h3 className="us-advantage-card-title">{card.title}</h3>
              {card.metric.trim() || card.metricDelta ? (
                <div className="us-advantage-card-metric-wrap">
                  {card.metric.trim() ? <span className="us-advantage-card-metric">{card.metric}</span> : null}
                  {card.metricDelta ? <span className="us-advantage-card-metric-delta">{card.metricDelta}</span> : null}
                </div>
              ) : null}
            </header>

            <p className="us-advantage-card-description">{card.description}</p>

            <ul className="us-advantage-card-points">
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="us-advantage-tension">
        <h3 className="us-advantage-tension-label">{slideData.tensionLabel}</h3>
        <p className="us-advantage-tension-body">{slideData.tensionBody}</p>
      </section>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
