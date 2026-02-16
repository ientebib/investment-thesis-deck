import { SectionHeader, SourceLine } from "@/components/ui";
import { slide59LlmWorkflowData } from "@/lib/data/slides";

const slideData = slide59LlmWorkflowData;

function toneClass(tone: "primary" | "secondary") {
  return tone === "primary" ? "llm-step-card--primary" : "llm-step-card--secondary";
}

function conceptToneClass(tone: "primary" | "negative") {
  return tone === "negative" ? "llm-concept-card--negative" : "llm-concept-card--primary";
}

export function Slide59LlmArchitecture() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="llm-layout">
        <section className="llm-pipeline-grid">
          {slideData.pipelineSteps.map((step) => (
            <article key={step.step} className={`llm-step-card ${toneClass(step.tone)}`}>
              <div className="llm-step-index">{step.step}</div>
              <h3 className="llm-step-title">{step.title}</h3>
              <p className="llm-step-body">{step.body}</p>
            </article>
          ))}
        </section>

        <section className="llm-concepts-grid">
          {slideData.conceptCards.map((card) => (
            <article key={card.title} className={`llm-concept-card ${conceptToneClass(card.tone)}`}>
              <h3 className="llm-concept-title">{card.title}</h3>
              <p className="llm-concept-body">{card.body}</p>
            </article>
          ))}
        </section>

        <article className="llm-takeaway">
          <h3 className="llm-takeaway-label">{slideData.takeawayLabel}</h3>
          <p className="llm-takeaway-body">{slideData.takeawayBody}</p>
        </article>
      </div>

      <SourceLine text={slideData.sourceLine} tight />
    </>
  );
}
