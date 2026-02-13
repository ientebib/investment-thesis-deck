import { SectionHeader } from "@/components/ui";

type JourneyStop = {
  num: string;
  title: string;
  desc: string;
};

const rowOne: JourneyStop[] = [
  {
    num: "01",
    title: "Fund Structure",
    desc: "Legal structure, fund vehicles, key service providers, and organizational overview.",
  },
  {
    num: "02",
    title: "Investment Thesis",
    desc: "Two foundational macro views: fiscal constraint driving real-asset repricing, and AI buildout consuming scarce physical resources.",
  },
  {
    num: "03",
    title: "Macro Thesis",
    desc: "Past policy choices, fiscal, industrial, and monetary, have created structural imbalances now surfacing as geopolitical strain, supply-chain fragmentation, and persistent resource scarcity.",
  },
];

const rowTwo: JourneyStop[] = [
  {
    num: "04",
    title: "AI Thesis",
    desc: "The convergence of exponential AI growth and finite physical supply chains creates a structural mismatch that favors holders of power, mineral, infrastructure, and platform assets.",
  },
  {
    num: "05",
    title: "How We Underwrite",
    desc: "How we source, diligence, structure, size, and monitor positions across the structural long portfolio.",
  },
  {
    num: "06",
    title: "What We Expect & Fund Terms",
    desc: "Target outcomes, portfolio profile, alignment, and core investment terms.",
  },
];

const rows = [
  { key: "row-1", className: "journey-row journey-row--three", stops: rowOne },
  { key: "row-2", className: "journey-row journey-row--three journey-row--bottom", stops: rowTwo },
];

export function Slide02AgendaJourney() {
  return (
    <>
      <SectionHeader
        sectionLabel="ROADMAP"
        title="Today's agenda"
        subtitle="What we'll walk through"
      />

      <div className="journey-track">
        {rows.map((row) => (
          <div key={row.key} className={row.className}>
            <div className="journey-line" />
            {row.stops.map((s) => {
              const isSubpoint = s.num.includes(".");
              return (
                <div key={s.num} className={`journey-stop ${isSubpoint ? "journey-stop--subpoint" : ""}`}>
                  <span className="journey-num">{s.num}</span>
                  <span className="journey-stop-title">{s.title}</span>
                  <span className="journey-stop-desc">{s.desc}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
