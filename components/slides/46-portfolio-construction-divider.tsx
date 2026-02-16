import { slide46PortfolioConstructionDividerData } from "@/lib/data/slides";

const slideData = slide46PortfolioConstructionDividerData;

export function Slide46PortfolioConstructionDivider() {
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
