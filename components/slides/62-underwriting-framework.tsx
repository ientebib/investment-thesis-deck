import { SectionHeader, SourceLine } from "@/components/ui";
import { slide62UnderwriteData } from "@/lib/data/slides";
import type { Slide62UnderwriteSidePanelData } from "@/lib/data/types";

const slideData = slide62UnderwriteData;

function panelToneClass(tone: Slide62UnderwriteSidePanelData["tone"]) {
  if (tone === "primary") {
    return "underwrite-side-card--primary";
  }
  if (tone === "negative") {
    return "underwrite-side-card--negative";
  }
  return "underwrite-side-card--neutral";
}

export function Slide62UnderwritingFramework() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="underwrite-layout">
        <div className="underwrite-gates">
          {slideData.gates.map((gate) => (
            <article key={gate.step} className="underwrite-gate-card">
              <div className="underwrite-gate-step">{gate.step}</div>
              <div className="underwrite-gate-copy">
                <h3 className="underwrite-gate-title">{gate.title}</h3>
                <p className="underwrite-gate-body">{gate.body}</p>
                <p className="underwrite-gate-fail">{gate.failCondition}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="underwrite-side-stack">
          {slideData.sidePanels.map((panel) => (
            <article key={panel.title} className={`underwrite-side-card ${panelToneClass(panel.tone)}`}>
              <h3 className="underwrite-side-title">{panel.title}</h3>
              <ul className="underwrite-side-list">
                {panel.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
