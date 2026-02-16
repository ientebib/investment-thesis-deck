import { slide41ForcesCompoundDividerData } from "@/lib/data/slides";

const slideData = slide41ForcesCompoundDividerData;

export function Slide41ForcesCompoundDivider() {
  return (
    <>
      <div className="section-divider-wrap">
        <div className="section-divider-block">
          <div className="section-divider-kicker">{slideData.title}</div>
          <div className="section-divider-headline section-divider-headline--compact">{slideData.subtitle}</div>
        </div>
      </div>
    </>
  );
}
