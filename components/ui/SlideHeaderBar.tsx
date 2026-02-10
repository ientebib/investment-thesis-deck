import { NeuralStackLogo } from "./NeuralStackLogo";

type SlideHeaderBarProps = {
  slideNumber: number;
  totalSlides: number;
};

export function SlideHeaderBar({ slideNumber, totalSlides }: SlideHeaderBarProps) {
  return (
    <div className="slide-header-bar">
      <div className="slide-header-left">
        <div className="slide-header-logo">
          <NeuralStackLogo size={18} interactive={false} animate={false} density="low" />
        </div>
        <span className="slide-header-wordmark">Stack Capital</span>
      </div>
      <span className="slide-header-meta">
        Confidential &middot; {slideNumber} / {totalSlides}
      </span>
    </div>
  );
}
