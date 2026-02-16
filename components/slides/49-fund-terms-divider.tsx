import { slide49FundTermsDividerData } from "@/lib/data/slides";

const slideData = slide49FundTermsDividerData;

export function Slide49FundTermsDivider() {
  return (
    <>
      <div className="section-divider-wrap">
        <div className="section-divider-block">
          <div className="section-divider-kicker">{slideData.title}</div>
          <div className="section-divider-headline">{slideData.subtitle}</div>
        </div>
      </div>
    </>
  );
}
