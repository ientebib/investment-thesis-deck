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
    desc: "How the fund deploys equity across NNN real estate and a long structural portfolio, using cash-out refinancing to recycle capital into conviction positions.",
  },
  {
    num: "02",
    title: "Real Estate Foundation",
    desc: "Stabilized NNN properties generate predictable, inflation-protected income while building equity for redeployment into the long portfolio.",
  },
];

const rowTwo: JourneyStop[] = [
  {
    num: "03",
    title: "Long Structural Portfolio Sleeve",
    desc: "This is the growth engine of the fund, organized into two linked pillars: macro regime and AI infrastructure.",
  },
  {
    num: "3.1",
    title: "Macro Thesis",
    desc: "Past policy choices, fiscal, industrial, and monetary, have created structural imbalances now surfacing as geopolitical strain, supply-chain fragmentation, and persistent resource scarcity.",
  },
  {
    num: "3.2",
    title: "AI Infrastructure",
    desc: "The convergence of exponential AI growth and finite physical supply chains creates a structural mismatch that favors holders of power, mineral, infrastructure, and platform assets.",
  },
];

const rowThree: JourneyStop[] = [
  {
    num: "04",
    title: "How We Underwrite",
    desc: "How we source, diligence, structure, size, and monitor positions across both the real-estate and long structural sleeves.",
  },
  {
    num: "05",
    title: "What We Expect & Fund Terms",
    desc: "Target outcomes, portfolio profile, alignment, and core investment terms.",
  },
];

const rows = [
  { key: "row-1", className: "journey-row journey-row--two", stops: rowOne },
  { key: "row-2", className: "journey-row journey-row--three", stops: rowTwo },
  { key: "row-3", className: "journey-row journey-row--two journey-row--bottom", stops: rowThree },
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
