import { SectionHeader, SourceLine } from "@/components/ui";
import { slide02LeadershipData } from "@/lib/data/slides";

const slideData = slide02LeadershipData;

function BioText({ text }: { text: string }) {
  const sentences = text.split(". ").map((s, i, arr) => (i < arr.length - 1 ? s + "." : s));
  return (
    <div className="leadership-card-bio">
      {sentences.map((sentence, i) => (
        <p key={i}>{sentence}</p>
      ))}
    </div>
  );
}

export function Slide02Leadership() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="leadership-grid">
        {slideData.partners.map((partner) => (
          <div key={partner.name} className="leadership-card">
            <div className="leadership-card-name">{partner.name}</div>
            <div className="leadership-card-role">{partner.role}</div>
            <BioText text={partner.bio} />
          </div>
        ))}
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
