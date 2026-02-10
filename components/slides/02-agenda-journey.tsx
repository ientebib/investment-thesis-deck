import { SectionHeader } from "@/components/ui";

const topRow = [
  {
    num: "01",
    title: "Capital Structure",
    desc: "How we deploy $20M across hard-asset classes with built-in downside protection.",
  },
  {
    num: "02",
    title: "Income Engine",
    desc: "Triple-net leases in high-growth Florida markets generating stable, inflation-linked cash flow.",
  },
  {
    num: "03",
    title: "Macro Thesis",
    desc: "Why fiscal pressure, debt dynamics, and real rates all converge on hard assets.",
  },
];

const bottomRow = [
  {
    num: "04",
    title: "AI Infrastructure",
    desc: "Physical bottlenecks — power, copper, cooling — that the AI buildout cannot bypass.",
  },
  {
    num: "05",
    title: "Portfolio",
    desc: "How income, convexity, and growth compound into a resilient whole.",
  },
];

export function Slide02AgendaJourney() {
  return (
    <>
      <SectionHeader
        sectionLabel="ROADMAP"
        title="Today's agenda."
        subtitle="What we'll walk through"
      />

      <div className="journey-track">
        <div className="journey-row">
          <div className="journey-line" />
          {topRow.map((s) => (
            <div key={s.num} className="journey-stop">
              <span className="journey-num">{s.num}</span>
              <span className="journey-stop-title">{s.title}</span>
              <span className="journey-stop-desc">{s.desc}</span>
            </div>
          ))}
        </div>

        <div className="journey-row journey-row--bottom">
          <div className="journey-line" />
          {bottomRow.map((s) => (
            <div key={s.num} className="journey-stop">
              <span className="journey-num">{s.num}</span>
              <span className="journey-stop-title">{s.title}</span>
              <span className="journey-stop-desc">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
