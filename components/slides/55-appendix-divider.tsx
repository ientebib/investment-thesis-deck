import { slide55AppendixDividerData } from "@/lib/data/slides";

const slideData = slide55AppendixDividerData;

export function Slide55AppendixDivider() {
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
