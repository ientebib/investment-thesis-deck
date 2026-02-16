type SourceLineProps = {
  text: string;
  tight?: boolean;
};

export function SourceLine({ text, tight = false }: SourceLineProps) {
  return (
    <div className={`slide-footer${tight ? " slide-footer--tight" : ""}`}>
      <span className="slide-footer-source">{text}</span>
      <span className="slide-footer-date">February 2026</span>
    </div>
  );
}
