import { slide01TitleData } from "@/lib/data/slides";
import { NeuralStackLogo } from "@/components/ui/NeuralStackLogo";

export function Slide01Title() {
  return (
    <div className="title-slide">
      <div className="title-logo-wrap">
        <NeuralStackLogo size={164} interactive animate density="high" />
      </div>
      <div className="title-main">{slide01TitleData.title}</div>
      <div className="title-underline" />
      <div className="title-definition">
        <span className="title-definition-term">Stack</span>{" "}
        <span className="title-definition-phonetic">/stak/</span>{" "}
        <span className="title-definition-pos">— noun</span>
        <div className="title-definition-meaning">
          The global infrastructure through which the planet thinks. From earth to cloud.
        </div>
      </div>
      <div className="title-confidential">{slide01TitleData.confidentialityLine}</div>
    </div>
  );
}
