import { SectionHeader, SourceLine } from "@/components/ui";
import { slide51FundStructureData } from "@/lib/data/slides";
import type { FundStructureSection } from "@/lib/data/types";

function TermColumn({ sections }: { sections: FundStructureSection[] }) {
  return (
    <div className="fs-col">
      {sections.map((section) => (
        <div key={section.title} className="fs-section">
          <div className="fs-section-header">{section.title}</div>
          {section.rows.map((row) => (
            <div key={row.label} className="fs-row">
              <span className="fs-term">{row.label}</span>
              <span className="fs-def">{row.value}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Slide51TermsAtAGlance() {
  const data = slide51FundStructureData;
  return (
    <>
      <SectionHeader sectionLabel={data.sectionLabel} title={data.title} subtitle={data.subtitle} />
      <div className="fs-table">
        <TermColumn sections={data.leftSections} />
        <TermColumn sections={data.rightSections} />
      </div>
      <SourceLine text={data.sourceLine} />
    </>
  );
}
