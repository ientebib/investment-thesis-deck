"use client";

import { useEffect, useRef, useState } from "react";

/* ── Animation Script ─────────────────────────────────────── */

type AnimStep =
  | { action: "think"; text: string; speed?: number }
  | { action: "print"; text: string; delay?: number; cls?: string }
  | { action: "wait"; ms: number };

const ANIMATION: AnimStep[] = [
  // ── Memory / Context Loading ──
  { action: "print", text: "Loading workspace\u2026", cls: "dim" },
  { action: "wait", ms: 900 },
  { action: "print", text: "Last session: 18h ago \u00b7 Last risk analysis: 1 day ago", cls: "dim" },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "Restoring portfolio context\u2026", cls: "dim" },
  { action: "wait", ms: 650 },
  { action: "print", text: "  Stack Fund I \u2014 $20.0M NAV", cls: "header" },
  { action: "print", text: "  Equities             $14.2M    71%    NVDA AMD TSM AVGO VRT MRVL", delay: 180 },
  { action: "print", text: "  Commodities          $3.8M     19%    Copper, Uranium", delay: 180 },
  { action: "print", text: "  Treasury + Reserve   $2.0M     10%", delay: 180 },
  { action: "wait", ms: 550 },
  { action: "print", text: "\u2713 Portfolio loaded", delay: 250 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "Checking for updates since last scan\u2026", cls: "dim" },
  { action: "wait", ms: 900 },
  { action: "print", text: "  \u25cf NVDA filed 10-K \u2014 Feb 10, 2026", cls: "call", delay: 280 },
  { action: "print", text: "  \u25cf ORCL earnings scheduled \u2014 Feb 12", cls: "call", delay: 280 },
  { action: "print", text: "  \u25cf Trading Economics: CPI data revised +0.1%", cls: "call", delay: 280 },
  { action: "print", text: "  \u25cb No new Semi Analysis reports since last scan", delay: 280 },
  { action: "print", text: "  \u25cb No new PitchBook filings", delay: 280 },
  { action: "wait", ms: 550 },
  { action: "print", text: "\u2713 3 updates flagged", delay: 250 },
  { action: "wait", ms: 650 },
  { action: "print", text: "" },
  { action: "print", text: "Ready.", cls: "header" },
  { action: "wait", ms: 1000 },
  { action: "print", text: "" },
  { action: "print", text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls: "dim" },
  { action: "print", text: "" },

  // ── Query ──
  { action: "print", text: "isaac: @mathew check the portfolio and flag anything I should know about", cls: "user" },
  { action: "wait", ms: 1100 },
  { action: "print", text: "" },
  { action: "print", text: "mathew is thinking\u2026", cls: "pulse" },
  { action: "wait", ms: 2500 },
  { action: "print", text: "" },

  // ── Setup ──
  { action: "think", text: "Portfolio context loaded. NVDA filed new 10-K since last scan \u2014 need to review that first. Let me pull fresh data and run a full check.", speed: 28 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "Creating analysis tasks\u2026", cls: "dim" },
  { action: "wait", ms: 550 },
  { action: "print", text: "" },
  { action: "print", text: "\u25a1 Review NVDA 10-K filing (new since last scan)", delay: 200 },
  { action: "print", text: "\u25a1 Pull latest earnings for held names", delay: 200 },
  { action: "print", text: "\u25a1 Review supply chain dependencies", delay: 200 },
  { action: "print", text: "\u25a1 Scan macro indicators for risk signals", delay: 200 },
  { action: "print", text: "\u25a1 Check price action and institutional flows", delay: 200 },
  { action: "print", text: "\u25a1 Run portfolio stress test", delay: 200 },

  // ── Task 1: NVDA 10-K (triggered by memory) ──
  { action: "wait", ms: 1000 },
  { action: "print", text: "" },
  { action: "print", text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls: "dim" },
  { action: "print", text: "" },
  { action: "print", text: "\u25a0 Reviewing NVDA 10-K (flagged in memory)\u2026", cls: "task" },
  { action: "wait", ms: 900 },
  { action: "print", text: "" },
  { action: "print", text: "  Pulling filing from FMP\u2026", cls: "dim" },
  { action: "wait", ms: 1000 },
  { action: "print", text: "  \u2192 Revenue: $130.5B (+78% YoY)", delay: 260 },
  { action: "print", text: "  \u2192 Data center: $102.4B (78.4% of revenue)", delay: 260 },
  { action: "print", text: "  \u2192 Gross margin: 73.0% \u2014 expanding", delay: 260 },
  { action: "print", text: "  \u2192 Capex guidance: $60B+ for FY27", delay: 260 },
  { action: "print", text: "" },
  { action: "print", text: "  Key language: \"demand continues to exceed supply across all product lines\"", delay: 260 },
  { action: "print", text: "  Mentioned 14x in transcript: Blackwell, GB200, NVL72", delay: 260 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "think", text: "Blackwell GB200 rack uses ~2,400 lbs copper per unit. Capex $60B+ implies significant copper demand \u2014 we hold copper, let me check.", speed: 28 },
  { action: "wait", ms: 700 },
  { action: "print", text: "" },
  { action: "print", text: "  Cross-referencing copper position\u2026", cls: "dim" },
  { action: "wait", ms: 900 },
  { action: "print", text: "  \u2192 Copper (held): $4.21/lb \u2192 +18% YTD", delay: 260 },
  { action: "print", text: "  \u2192 LME inventory: \u221234% since Sep 2025", delay: 260 },
  { action: "print", text: "  \u2192 DC buildout demand est. +2.1M tonnes through 2028", delay: 260 },
  { action: "print", text: "  \u2713 Position up $420K since entry \u2014 demand thesis intact", delay: 260 },

  // ── Task 2: Earnings ──
  { action: "wait", ms: 1100 },
  { action: "print", text: "" },
  { action: "print", text: "\u25a0 Pulling latest earnings for portfolio-adjacent names\u2026", cls: "task" },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "  Loading transcripts for AMD, TSM, AVGO, VRT, MRVL\u2026", cls: "dim" },
  { action: "wait", ms: 1000 },
  { action: "print", text: "  \u2192 247 transcripts loaded (Q3\u2013Q4 2025)", delay: 260 },
  { action: "print", text: "" },
  { action: "print", text: "  Capex guidance revised up +34.2% on average", delay: 260 },
  { action: "print", text: "  AI revenue now 67.8% of mix for these names", delay: 260 },
  { action: "print", text: "  ORCL reports Feb 12 \u2014 consensus expects cloud +25% YoY", delay: 260 },

  // ── Task 3: Supply chain ──
  { action: "wait", ms: 1100 },
  { action: "print", text: "" },
  { action: "print", text: "\u25a0 Reviewing supply chain dependencies\u2026", cls: "task" },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "  Querying Semi Analysis for fab data\u2026", cls: "dim" },
  { action: "wait", ms: 900 },
  { action: "print", text: "  \u2192 TSMC N3 utilization at 97.8% \u2014 effectively full", delay: 260 },
  { action: "print", text: "  \u2192 HBM3e sold out through Q3 2026", delay: 260 },
  { action: "print", text: "  \u2192 CoWoS packaging: +340% demand vs supply", delay: 260 },
  { action: "wait", ms: 650 },
  { action: "print", text: "" },
  { action: "print", text: "  Mapping dependency graph from SEC filings\u2026", cls: "dim" },
  { action: "wait", ms: 900 },
  { action: "print", text: "  L0  Foundry        TSMC (93%) \u2192 Samsung (7%)", delay: 200 },
  { action: "print", text: "  L1  HBM            SK Hynix \u2192 Samsung \u2192 Micron", delay: 200 },
  { action: "print", text: "  L2  Packaging      TSMC CoWoS \u2192 ASE \u2192 Amkor", delay: 200 },
  { action: "print", text: "  L3  Interconnect   Broadcom \u2192 Marvell \u2192 Arista", delay: 200 },
  { action: "print", text: "  L4  Power          Vertiv \u2192 Eaton \u2192 Monolithic Power", delay: 200 },
  { action: "print", text: "  L5  DC Infra       Equinix \u2192 Digital Realty \u2192 QTS", delay: 200 },
  { action: "print", text: "" },
  { action: "print", text: "  \u26a0 4 single-source dependencies flagged", delay: 260 },

  // ── Task 4: Macro ──
  { action: "wait", ms: 1100 },
  { action: "print", text: "" },
  { action: "print", text: "\u25a0 Scanning macro indicators\u2026", cls: "task" },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "  Pulling from Trading Economics\u2026", cls: "dim" },
  { action: "wait", ms: 1000 },
  { action: "print", text: "  \u2192 Fed Funds: 5.25% \u2192 projected 4.50%", delay: 240 },
  { action: "print", text: "  \u2192 10Y yield: 4.38%", delay: 240 },
  { action: "print", text: "  \u2192 Debt/GDP: 124.3% \u2014 accelerating", delay: 240 },
  { action: "print", text: "  \u2192 IG spread: 112bps  |  HY spread: 342bps", delay: 240 },
  { action: "print", text: "  \u2192 CPI revised +0.1% (flagged in memory)", delay: 240 },
  { action: "print", text: "" },

  // ── Task 5: Price action ──
  { action: "wait", ms: 1100 },
  { action: "print", text: "" },
  { action: "print", text: "\u25a0 Checking price action and institutional flows\u2026", cls: "task" },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "  Querying Bloomberg for institutional positioning\u2026", cls: "dim" },
  { action: "wait", ms: 1000 },
  { action: "print", text: "" },
  { action: "print", text: "  Ticker   Inst. Gap    6M Price    Flag", delay: 160 },
  { action: "print", text: "  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", delay: 100 },
  { action: "print", text: "  VRT      \u22125.3%       +47%       \u26a0 underweight", delay: 240 },
  { action: "print", text: "  MRVL     \u22123.8%       +31%", delay: 240 },
  { action: "print", text: "  SMCI     \u22127.1%       +62%       \u26a0 underweight", delay: 240 },
  { action: "wait", ms: 650 },
  { action: "print", text: "" },
  { action: "print", text: "  Checking PitchBook for capital flows\u2026", cls: "dim" },
  { action: "wait", ms: 800 },
  { action: "print", text: "  \u2192 PE dry powder targeting AI infra: $47B", delay: 240 },
  { action: "print", text: "  \u2192 DC-related M&A: +89% YoY", delay: 240 },

  // ── Task 6: Stress test ──
  { action: "wait", ms: 1100 },
  { action: "print", text: "" },
  { action: "print", text: "\u25a0 Running portfolio stress test\u2026", cls: "task" },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "  Scenario: rates +100bps / AI demand \u221220% / copper \u221215%", cls: "dim" },
  { action: "wait", ms: 1100 },
  { action: "print", text: "  \u2192 Equities: \u221214.1% drawdown", delay: 260 },
  { action: "print", text: "  \u2192 Commodities: \u22128.3% drawdown", delay: 260 },
  { action: "print", text: "  \u2192 Total fund NAV: \u221211.2%", delay: 260 },
  { action: "print", text: "  \u2192 Recovery period: ~16 months", delay: 260 },
  { action: "wait", ms: 650 },
  { action: "print", text: "" },
  { action: "print", text: "  Scenario: rates \u221250bps / AI demand +30% / copper +20%", cls: "dim" },
  { action: "wait", ms: 900 },
  { action: "print", text: "  \u2192 Total fund NAV: +18.7%", delay: 260 },

  // ── Update trackers ──
  { action: "wait", ms: 1100 },
  { action: "print", text: "" },
  { action: "print", text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls: "dim" },
  { action: "print", text: "" },
  { action: "print", text: "\u2713 All 6 tasks complete", delay: 350 },
  { action: "wait", ms: 900 },
  { action: "print", text: "" },
  { action: "print", text: "Updating portfolio trackers\u2026", cls: "task" },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "  Metric                  Previous    Current     \u0394", cls: "header" },
  { action: "print", text: "  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", delay: 100 },
  { action: "print", text: "  NVDA Capex Guidance     $45B        $60B+       \u25b2 +33%", delay: 240 },
  { action: "print", text: "  TSMC N3 Utilization     94.2%       97.8%       \u25b2 +3.6pp", delay: 240 },
  { action: "print", text: "  HBM3e Supply Window     Q1 2026     Q3 2026     \u25b2 extended", delay: 240 },
  { action: "print", text: "  CoWoS Demand/Supply     +280%       +340%       \u25b2 widening", delay: 240 },
  { action: "print", text: "  Copper (LME)            $3.56       $4.21       \u25b2 +18.3%", delay: 240 },
  { action: "print", text: "  LME Inventory           482K t      318K t      \u25bc \u221234%", delay: 240 },
  { action: "print", text: "  Uranium (Spot)          $78.40      $82.10      \u25b2 +4.7%", delay: 240 },
  { action: "wait", ms: 550 },
  { action: "print", text: "\u2713 7 trackers updated", delay: 250 },
  { action: "wait", ms: 900 },
  { action: "print", text: "" },
  { action: "print", text: "Revising projections\u2026", cls: "task" },
  { action: "wait", ms: 800 },
  { action: "print", text: "  \u2192 DC capex cycle extended through 2028 (was 2027)", delay: 260 },
  { action: "print", text: "  \u2192 CoWoS bottleneck resolution pushed to Q2 2027", delay: 260 },
  { action: "print", text: "  \u2192 Copper demand from DC buildout: +2.1M tonnes through 2028", delay: 260 },
  { action: "print", text: "  \u2192 ORCL cloud growth tracking +25% \u2014 watching Feb 12 print", delay: 260 },
  { action: "wait", ms: 550 },
  { action: "print", text: "\u2713 4 projections revised", delay: 250 },

  // ── Flags ──
  { action: "wait", ms: 900 },
  { action: "print", text: "" },
  { action: "print", text: "Flags:", cls: "header" },
  { action: "print", text: "  \u26a0 NVDA capex $60B+ \u2192 copper demand thesis strengthening", delay: 260 },
  { action: "print", text: "  \u26a0 CoWoS packaging remains single biggest supply constraint", delay: 260 },
  { action: "print", text: "  \u26a0 VRT and SMCI institutional underweight vs price action", delay: 260 },
  { action: "print", text: "  \u26a0 LME copper inventory at 5-year low \u2014 watch for squeeze", delay: 260 },
  { action: "print", text: "  \u2713 Copper position +$420K \u2014 demand thesis intact", delay: 260 },
  { action: "print", text: "  \u2713 Portfolio risk composite: MODERATE", delay: 260 },

  // ── Save to memory ──
  { action: "wait", ms: 900 },
  { action: "print", text: "" },
  { action: "print", text: "Saving to memory\u2026", cls: "dim" },
  { action: "wait", ms: 650 },
  { action: "print", text: "\u2713 Risk analysis saved \u00b7 7 trackers updated \u00b7 Next scan: 18h", delay: 350 },
];

/* ── Terminal Component ───────────────────────────────────── */

type DisplayLine = { text: string; cls?: string };

export function MathewTerminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<DisplayLine[]>([]);
  const [typingLine, setTypingLine] = useState("");
  const [typingCls, setTypingCls] = useState<string | undefined>();
  const [cursorOn, setCursorOn] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    function sleep(ms: number) {
      return new Promise<void>((resolve) => setTimeout(resolve, ms));
    }

    async function thinkText(text: string, speed = 26) {
      setTypingCls("think");
      const words = text.split(" ");
      let built = "";
      for (let i = 0; i < words.length; i += 1) {
        if (cancelled) return;
        built += (i === 0 ? "" : " ") + words[i];
        setTypingLine(built);
        await sleep(speed + Math.random() * 35);
      }
      if (cancelled) return;
      setLines((prev) => [...prev, { text, cls: "think" }]);
      setTypingLine("");
      setTypingCls(undefined);
    }

    async function printLine(text: string, delay = 60, cls?: string) {
      if (cancelled) return;
      await sleep(delay);
      setLines((prev) => [...prev, { text, cls }]);
    }

    async function run() {
      await sleep(500);
      for (const step of ANIMATION) {
        if (cancelled) return;
        if (step.action === "think") {
          await thinkText(step.text, step.speed);
        } else if (step.action === "print") {
          await printLine(step.text, step.delay, step.cls);
        } else {
          await sleep(step.ms);
        }
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((prev) => !prev), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, typingLine]);

  function lineClass(cls?: string) {
    if (!cls) return "mathew-ln";
    return `mathew-ln mathew-ln--${cls}`;
  }

  return (
    <div className="mathew-overlay" onClick={onClose}>
      <div className="mathew-terminal" onClick={(e) => e.stopPropagation()}>
        <div className="mathew-bar">
          <div className="mathew-dots">
            <span className="mathew-dot mathew-dot--red" />
            <span className="mathew-dot mathew-dot--yellow" />
            <span className="mathew-dot mathew-dot--green" />
          </div>
          <span className="mathew-bar-title">mathew &mdash; Stack Capital AI Research</span>
          <button className="mathew-bar-close" onClick={onClose}>&times;</button>
        </div>
        <div className="mathew-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <div key={i} className={lineClass(line.cls)}>
              {line.text || "\u00A0"}
            </div>
          ))}
          {typingLine ? (
            <div className={lineClass(typingCls)}>
              {typingLine}
              <span className={`mathew-cursor${cursorOn ? "" : " mathew-cursor--off"}`}>{"\u2588"}</span>
            </div>
          ) : (
            <div className="mathew-ln">
              <span className={`mathew-cursor${cursorOn ? "" : " mathew-cursor--off"}`}>{"\u2588"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
