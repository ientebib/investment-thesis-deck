import { SectionHeader, SourceLine } from "@/components/ui";
import { slide51TermsAtGlanceData } from "@/lib/data/slides";

const slideData = slide51TermsAtGlanceData;

export function Slide51TermsAtAGlance() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="terms-layout terms-layout--at-glance">
        <div className="terms-panel-grid">
          {slideData.panels.map((panel) => (
            <article key={panel.title} className="terms-panel-card">
              <h3 className="terms-panel-title">{panel.title}</h3>
              <table className="thesis-table">
                <tbody>
                  {panel.rows.map((row) => (
                    <tr key={row.label}>
                      <th>{row.label}</th>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ))}
        </div>

        <section className="terms-lifecycle-wrap">
          <h3 className="adoption-row-label">{slideData.lifecycleTitle}</h3>
          <div className="terms-lifecycle-bar">
            {slideData.lifecycleSegments.map((segment) => (
              <div
                key={segment.label}
                className={`terms-lifecycle-segment terms-lifecycle-segment--${segment.tone}`}
              >
                {segment.label}
              </div>
            ))}
          </div>
          <div className="terms-lifecycle-notes">
            <span>{slideData.lifecycleNotes[0]}</span>
            <span>{slideData.lifecycleNotes[1]}</span>
          </div>
        </section>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
