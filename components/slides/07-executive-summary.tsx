import { SectionHeader, SourceLine } from "@/components/ui";
import { slide07ExecutiveSummaryData } from "@/lib/data/slides";

const slideData = slide07ExecutiveSummaryData;
const toneClassByTone: Record<string, string> = {
  primary: "exec-summary-primary-tone",
  secondary: "exec-summary-secondary-tone",
  intersection: "exec-summary-intersection-tone"
};

export function Slide07ExecutiveSummary() {
  return (
    <>
      <SectionHeader
        sectionLabel={slideData.sectionLabel}
        title={slideData.title}
        subtitle={slideData.subtitle || " "}
      />

      <div className="exec-summary-layout">
        <div className="exec-summary-thesis-stack">
          {slideData.thesisCards.map((card) => (
            <section key={card.title} className="exec-summary-thesis-block">
              <h3 className={`exec-summary-thesis-title ${toneClassByTone[card.tone] ?? ""}`}>{card.title}</h3>
              {card.bullets?.length ? (
                <ul className="exec-summary-bullet-list">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="exec-summary-bullet-item">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="exec-summary-thesis-body">{card.body}</p>
              )}
            </section>
          ))}
          <section className="exec-summary-thesis-block">
            <h3 className="exec-summary-thesis-title exec-summary-intersection-tone">{slideData.intersectionTitle}</h3>
            {slideData.intersectionBullets?.length ? (
              <ul className="exec-summary-bullet-list">
                {slideData.intersectionBullets.map((bullet) => (
                  <li key={bullet} className="exec-summary-bullet-item">
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="exec-summary-thesis-body">{slideData.intersectionBody}</p>
                {slideData.intersectionConclusion ? (
                  <p className="exec-summary-thesis-body">{slideData.intersectionConclusion}</p>
                ) : null}
              </>
            )}
          </section>
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
