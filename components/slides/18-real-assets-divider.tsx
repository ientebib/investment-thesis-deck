import { slide18RealAssetsDividerData } from "@/lib/data/slides";

const slideData = slide18RealAssetsDividerData;

export function Slide18RealAssetsDivider() {
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
