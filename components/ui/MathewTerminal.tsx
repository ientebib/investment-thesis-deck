"use client";

import { useEffect, useRef, useState } from "react";

/* ── Animation Script ─────────────────────────────────────── */

type AnimStep =
  | { action: "think"; text: string; speed?: number }
  | { action: "reason"; text: string; speed?: number }
  | { action: "print"; text: string; delay?: number; cls?: string }
  | { action: "wait"; ms: number };

const ANIMATION: AnimStep[] = [
  // ── Workspace Loading ──
  { action: "print", text: "Loading workspace\u2026", cls: "dim" },
  { action: "wait", ms: 900 },
  { action: "print", text: "> cat .mathew/thesis_policy.md", cls: "cmd" },
  { action: "wait", ms: 600 },
  { action: "print", text: "Thesis v2.1 \u2014 Structural AI infrastructure buildout \u00b7 0/6 invalidation triggers active", delay: 200 },
  { action: "wait", ms: 500 },
  { action: "print", text: "> cat .mathew/portfolio_state.toon", cls: "cmd" },
  { action: "wait", ms: 600 },
  { action: "print", text: "Stack Fund I \u2014 $20.0M NAV", cls: "header", delay: 200 },
  { action: "print", text: "Equities $14.2M 71% \u00b7 Commodities $3.8M 19% \u00b7 Treasury $2.0M 10%", delay: 180 },
  { action: "print", text: "\u2713 Portfolio loaded", cls: "success", delay: 250 },
  { action: "wait", ms: 700 },
  { action: "print", text: "" },

  // ── Memory Context ──
  { action: "print", text: "> cat .mathew/memory/NVDA.md", cls: "cmd" },
  { action: "wait", ms: 600 },
  { action: "print", text: "Last review: Oct 14, 2025", cls: "memory", delay: 200 },
  { action: "print", text: "Prior base fair value: $168 \u00b7 Position: 22.4% of equity sleeve", cls: "memory", delay: 200 },
  { action: "print", text: "Open questions:", cls: "memory", delay: 180 },
  { action: "print", text: "\u2014 Blackwell ramp trajectory: GB200 vs GB300 mix and margin impact?", cls: "memory", delay: 160 },
  { action: "print", text: "\u2014 Q3 guide was $54B \u00b12%. Consensus crept to $55.2B. Buyside whisper higher.", cls: "memory", delay: 160 },
  { action: "print", text: "\u2014 CoWoS still the binding constraint. TSMC expanding but demand is outrunning capacity.", cls: "memory", delay: 160 },
  { action: "print", text: "\u2014 HBM repricing not yet quantified. Need to update margin assumptions when data firms up.", cls: "memory", delay: 160 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },
  { action: "print", text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls: "dim" },
  { action: "print", text: "" },

  // ── User Query ──
  { action: "print", text: "isaac: @mathew Q3 just printed. Walk me through it \u2014 what\u2019s incremental and what does it change?", cls: "user" },
  { action: "wait", ms: 1100 },
  { action: "print", text: "" },
  { action: "print", text: "mathew is thinking\u2026", cls: "pulse" },
  { action: "wait", ms: 2200 },
  { action: "print", text: "" },

  // ── Skill Loading ──
  { action: "print", text: "> cat skills/equity-research/SKILL.md", cls: "cmd" },
  { action: "wait", ms: 600 },
  { action: "print", text: "\u2713 Loading workflow", cls: "success", delay: 200 },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },
  { action: "print", text: "Ingesting the print\u2026", cls: "dim" },
  { action: "wait", ms: 900 },

  // ── Data Sync ──
  { action: "print", text: "> python tools/fmp_sync.py --ticker NVDA --period Q3-FY2026", cls: "cmd" },
  { action: "wait", ms: 1000 },
  { action: "print", text: "\u2713 4 .toon files synced", cls: "success", delay: 250 },
  { action: "wait", ms: 400 },
  { action: "print", text: "" },

  // ── Revenue ──
  { action: "print", text: "> cat financials/NVDA/income_Q3_FY2026.toon", cls: "cmd" },
  { action: "wait", ms: 700 },
  { action: "print", text: "Revenue: $57.0B vs $55.2B consensus \u2014 beat by 3.3%", delay: 220 },
  { action: "print", text: "YoY: +62% \u00b7 QoQ: +22%", delay: 180 },
  { action: "print", text: "FY26 YTD through Q3: $147.8B \u2014 already exceeds FY2025 full year ($130.5B)", delay: 220, cls: "header" },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },

  // ── Segments ──
  { action: "print", text: "> grep segments financials/NVDA/segments_Q3_FY2026.toon", cls: "cmd" },
  { action: "wait", ms: 700 },
  { action: "print", text: "Data center: $51.2B \u2014 89.8% of revenue \u2014 +66% YoY, +25% QoQ", delay: 220 },
  { action: "print", text: "Gaming: $4.3B +30% \u00b7 Auto: $592M +32% \u00b7 Pro Viz: $760M +56%", delay: 220 },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },

  // ── Margins ──
  { action: "print", text: "> grep margins financials/NVDA/income_Q3_FY2026.toon", cls: "cmd" },
  { action: "wait", ms: 700 },
  { action: "print", text: "Gross margin: 73.6% non-GAAP \u2014 up 90bps QoQ, in line with recovery trajectory", delay: 220 },
  { action: "print", text: "Operating margin: 63.2% \u2014 highest sustained in semiconductor history", delay: 220 },
  { action: "print", text: "Q4 guidance: 75.0% gross margin \u00b150bps", delay: 220 },
  { action: "wait", ms: 600 },
  { action: "print", text: "" },

  // ── Reasoning: Revenue + Margins ──
  { action: "print", text: "\u25b8 reasoning", cls: "reason-label" },
  { action: "reason", text: "The revenue beat is clean \u2014 $1.8B above consensus, entirely driven by data center. The sequential acceleration from $46.7B to $57.0B is a $10.3B QoQ add, which is larger than most semiconductor companies\u2019 entire quarterly revenue. But the number I\u2019m focused on is the Q4 guide: $65B \u00b12%. That implies roughly $213B for full FY2026. Against my October base case of $204B, that\u2019s a meaningful upward revision.", speed: 20 },
  { action: "wait", ms: 400 },
  { action: "reason", text: "Margin recovery is tracking. Q1 was distorted by the $4.5B H20 charge. The path from 72.7% in Q2 \u2192 73.6% in Q3 \u2192 guided 75.0% in Q4 confirms Blackwell ramp costs are being absorbed. But I had an open question on HBM repricing. Let me check if the call gave us anything.", speed: 20 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },

  // ── HBM Transcript ──
  { action: "print", text: "> grep -i \"hbm|input price|cost\" financials/NVDA/transcript_Q3_FY2026.toon", cls: "cmd" },
  { action: "wait", ms: 700 },
  { action: "print", text: "CFO: \u201cNext year, there are input prices that are well known in the industries that we need to work through.\u201d", delay: 240 },
  { action: "print", text: "CFO: \u201cWe do believe\u2026 we will work to try and hold at our gross margins in the mid-70s.\u201d", delay: 240 },
  { action: "print", text: "Language: \u201ctry and hold\u201d \u2014 not \u201cwill maintain\u201d or \u201cexpect to deliver.\u201d", cls: "warn", delay: 240 },
  { action: "wait", ms: 600 },
  { action: "print", text: "" },

  // ── Reasoning: HBM Risk ──
  { action: "print", text: "\u25b8 reasoning", cls: "reason-label" },
  { action: "reason", text: "That\u2019s softer language than I\u2019d like. \u201cTry and hold\u201d with acknowledged input cost headwinds is a downgrade from the Q2 tone. HBM contract repricing is running high-teens to low-20s percent according to SK Hynix and Samsung commentary on their own calls. At NVDA\u2019s scale, if HBM is 20-25% of COGS and costs rise 18%, that\u2019s roughly 200-250bps of gross margin pressure they need to offset through mix, yield improvements, and pricing. Achievable, but not trivial. This stays as the primary risk to monitor into FY2027.", speed: 20 },
  { action: "wait", ms: 400 },
  { action: "reason", text: "Now \u2014 the call mentioned Blackwell mix. Let me check what shifted.", speed: 22 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },

  // ── Blackwell Transcript ──
  { action: "print", text: "> grep -i \"blackwell|GB300|GB200\" financials/NVDA/transcript_Q3_FY2026.toon", cls: "cmd" },
  { action: "wait", ms: 700 },
  { action: "print", text: "GB300 crossed over GB200 \u2014 now ~2/3 of total Blackwell revenue", delay: 220 },
  { action: "print", text: "Networking more than doubled YoY \u2014 NVLink scale-up + Spectrum-X + InfiniBand", delay: 220 },
  { action: "print", text: "Management reaffirmed $500B Blackwell-Rubin pipeline through 2026", delay: 220 },
  { action: "print", text: "Rubin on track for H2 FY2027 ramp", delay: 220 },
  { action: "wait", ms: 600 },
  { action: "print", text: "" },

  // ── Reasoning: Blackwell + ASICs ──
  { action: "print", text: "\u25b8 reasoning", cls: "reason-label" },
  { action: "reason", text: "The GB300 crossover is significant. GB300 is higher-ASP and higher-margin than GB200 \u2014 this is the mix improvement that helps offset input cost pressure. And the Rubin timeline reaffirmation matters because it extends the product cycle visibility. If Rubin enters production in H2 FY2027, that\u2019s another upgrade cycle that keeps customers on NVDA\u2019s roadmap rather than migrating to custom ASICs.", speed: 20 },
  { action: "wait", ms: 400 },
  { action: "reason", text: "But I don\u2019t want to take management\u2019s demand narrative at face value. Let me check third-party data on whether AI infrastructure demand is actually accelerating or if we\u2019re seeing narrative inflation.", speed: 22 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },

  // ── Alternative Data: SemiAnalysis ──
  { action: "print", text: "Pulling alternative data\u2026", cls: "dim" },
  { action: "wait", ms: 600 },
  { action: "print", text: "> python tools/api_pull.py --source semi_analysis --endpoint inferencemax", cls: "cmd" },
  { action: "print", text: "Querying semi_analysis/inferencemax\u2026", cls: "query", delay: 200 },
  { action: "wait", ms: 1200 },
  { action: "print", text: "\u2713 Response received", cls: "success", delay: 200 },
  { action: "print", text: "SemiAnalysis InferenceMAX v1 benchmarks (Dec 2025):", cls: "header", delay: 180 },
  { action: "print", text: "Blackwell swept all categories \u2014 highest performance, best efficiency", delay: 180 },
  { action: "print", text: "B200: 60,000 tokens/sec/GPU at practical interactivity levels", delay: 160 },
  { action: "print", text: "GB200 NVL72: $5M investment generates ~$75M in inference token revenue \u2192 15x ROI", delay: 180 },
  { action: "print", text: "Cost per million tokens: $0.02 on B200 \u2014 5x lower than Hopper", delay: 160 },
  { action: "print", text: "Throughput per megawatt: 10x improvement over prior gen for MoE models", delay: 160 },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },

  // ── Alternative Data: Artificial Analysis ──
  { action: "print", text: "> python tools/api_pull.py --source artificial_analysis --endpoint hardware_benchmarks", cls: "cmd" },
  { action: "print", text: "Querying artificial_analysis/hardware_benchmarks\u2026", cls: "query", delay: 200 },
  { action: "wait", ms: 1100 },
  { action: "print", text: "\u2713 Response received", cls: "success", delay: 200 },
  { action: "print", text: "Artificial Analysis hardware benchmarks (Q4 2025):", cls: "header", delay: 180 },
  { action: "print", text: "8\u00d7B200 outperforms 8\u00d7H200 by 3-4x on inference throughput across model sizes", delay: 180 },
  { action: "print", text: "H100 still deployed at scale \u2014 Hopper installed base recorded ~$2B revenue in Q3 alone", delay: 180 },
  { action: "print", text: "Inference workloads shifting from H100 \u2192 H200 \u2192 B200 \u2014 three generations active simultaneously", delay: 180 },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },

  // ── Reasoning: Demand Thesis ──
  { action: "print", text: "\u25b8 reasoning", cls: "reason-label" },
  { action: "reason", text: "This is the data point that matters for the demand thesis. A 15x ROI on a $5M GB200 NVL72 system at current token pricing makes the purchase decision almost irrational NOT to make. The inference economics are so favorable that even if token pricing compresses 50%, the ROI is still 7-8x. That\u2019s what\u2019s driving the $500B pipeline \u2014 it\u2019s not speculative, it\u2019s economically rational at current unit economics.", speed: 20 },
  { action: "wait", ms: 400 },
  { action: "reason", text: "And the fact that three GPU generations are active simultaneously (Ampere still in service, Hopper at $2B/quarter, Blackwell ramping) means total installed base is expanding, not just cycling. That\u2019s incremental to our thesis \u2014 it means inference demand is growing fast enough to absorb new supply without cannibalizing prior generations.", speed: 20 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },

  // ── Alternative Data: Epoch AI ──
  { action: "print", text: "> python tools/api_pull.py --source epoch_ai --endpoint compute_trends", cls: "cmd" },
  { action: "print", text: "Querying epoch_ai/compute_trends\u2026", cls: "query", delay: 200 },
  { action: "wait", ms: 1100 },
  { action: "print", text: "\u2713 Response received", cls: "success", delay: 200 },
  { action: "print", text: "Training compute (Epoch AI, Nov 2025):", cls: "header", delay: 180 },
  { action: "print", text: "Frontier model training compute still doubling roughly every 6-9 months", delay: 180 },
  { action: "print", text: "Inference compute now estimated at 3-5x training compute in aggregate", delay: 180 },
  { action: "print", text: "Shift toward inference-heavy workloads accelerating \u2014 drives Blackwell\u2019s advantage", delay: 180 },
  { action: "print", text: "No plateau in scaling laws observed through current generation", delay: 180 },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },

  // ── Reasoning: Structural Demand ──
  { action: "print", text: "\u25b8 reasoning", cls: "reason-label" },
  { action: "reason", text: "Epoch data confirms the structural demand story. Training demand compounds, and inference is layering on top at 3-5x the volume. NVDA\u2019s Blackwell architecture is specifically optimized for inference economics \u2014 that\u2019s not coincidental, it\u2019s strategic positioning for where the volume is going.", speed: 20 },
  { action: "wait", ms: 400 },
  { action: "reason", text: "Now let me reconcile all of this with valuation.", speed: 22 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },

  // ── Valuation: Multiples ──
  { action: "print", text: "Valuation update\u2026", cls: "dim" },
  { action: "wait", ms: 600 },
  { action: "print", text: "> grep forward_pe financials/NVDA/valuation.toon", cls: "cmd" },
  { action: "wait", ms: 700 },
  { action: "print", text: "Forward PE (NTM consensus): ~38x", delay: 200 },
  { action: "print", text: "Forward PE (FY2027E): ~32x", delay: 200 },
  { action: "print", text: "5Y avg forward PE: ~45x", delay: 200 },
  { action: "print", text: "Sector median forward PE: ~24x", delay: 200 },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },

  // ── Valuation: Implied Growth ──
  { action: "print", text: "> python tools/implied_growth.py --ticker NVDA", cls: "cmd" },
  { action: "print", text: "Querying implied growth model\u2026", cls: "query", delay: 200 },
  { action: "wait", ms: 1000 },
  { action: "print", text: "\u2713 Response received", cls: "success", delay: 200 },
  { action: "print", text: "Implied 5Y revenue CAGR: ~21%", delay: 200 },
  { action: "print", text: "Consensus 5Y revenue CAGR: ~18%", delay: 200 },
  { action: "print", text: "Gap: +3pp \u2014 market pricing a beat premium, but narrower than last quarter", delay: 200 },
  { action: "wait", ms: 600 },
  { action: "print", text: "" },

  // ── Reasoning: Valuation ──
  { action: "print", text: "\u25b8 reasoning", cls: "reason-label" },
  { action: "reason", text: "The forward PE at 32x on FY2027 earnings looks optically reasonable against NVDA\u2019s historical range, but the comparison is misleading. The 5Y average of 45x was set during a period of triple-digit growth. At 32x with growth decelerating toward 20s, you\u2019re paying a lower multiple but for a fundamentally different growth profile. The right comparison isn\u2019t NVDA\u2019s own history \u2014 it\u2019s what 32x forward earnings buys you in terms of expected return. At 32x with 25% earnings growth, you get an earnings yield of roughly 3.1%. That\u2019s thin relative to a 10Y Treasury still above 4%. The equity risk premium on this name is compressed.", speed: 18 },
  { action: "wait", ms: 400 },
  { action: "reason", text: "The implied growth gap at +3pp is tighter than it was in my October review (+4.2pp), partly because the beat raised estimates. That\u2019s marginally better \u2014 less priced in than before. But the fundamental asymmetry hasn\u2019t changed: the stock works if everything goes right (margins hold, beats continue, cycle extends). It reprices violently if any one of those breaks.", speed: 18 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },

  // ── DCF Model ──
  { action: "print", text: "> python tools/dcf_model.py --update --config runs/research/nvda/dcf_inputs.json", cls: "cmd" },
  { action: "print", text: "Running DCF model\u2026", cls: "query", delay: 200 },
  { action: "wait", ms: 1200 },
  { action: "print", text: "Revising October assumptions with Q3 actuals:", cls: "dim", delay: 200 },
  { action: "print", text: "" },
  { action: "print", text: "                    Bull      Base      Bear", cls: "tbl-head", delay: 160 },
  { action: "print", text: "  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls: "dim", delay: 100 },
  { action: "print", text: "  FY27 Rev          $275B     $258B     $228B", delay: 200 },
  { action: "print", text: "  Gross margin      76%       73%       70%", delay: 200 },
  { action: "print", text: "  Fair value/sh     ~$220     ~$185     ~$108", delay: 200 },
  { action: "print", text: "  vs prior          +$15      +$17      +$6", delay: 200 },
  { action: "print", text: "" },
  { action: "print", text: "Base case moved up from $168 to $185 on higher revenue run-rate and margin recovery confirmation. But the stock has moved more than the fair value \u2014 the gap between price and base case has compressed, not widened.", delay: 280 },
  { action: "wait", ms: 800 },
  { action: "print", text: "" },

  // ── Synthesis ──
  { action: "print", text: "\u2713 Brief updated \u2192 runs/research/nvda/brief.md", cls: "success", delay: 300 },
  { action: "print", text: "\u2713 Memory updated \u2192 .mathew/memory/NVDA.md", cls: "success", delay: 300 },
  { action: "wait", ms: 600 },
  { action: "print", text: "" },
  { action: "print", text: "What\u2019s incremental from Q3:", cls: "header" },
  { action: "print", text: "Revenue beat and Q4 guide raise the FY2026 run-rate to ~$213B. GB300 crossover improves the margin mix outlook. But CFO language on FY2027 margins softened \u2014 \u201ctry and hold\u201d mid-70s against confirmed HBM cost headwinds. Third-party data (SemiAnalysis InferenceMAX, Epoch AI) confirms demand is structurally sound \u2014 15x inference ROI on Blackwell makes the capital expenditure economically rational. Three GPU generations active simultaneously means installed base is expanding, not just cycling.", delay: 260 },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },
  { action: "print", text: "Base fair value revised to ~$185. Forward PE at 32x FY2027E compresses equity risk premium to ~3.1% against a 4%+ 10Y yield. Not expensive by NVDA\u2019s historical standards, but limited margin of safety at current levels.", delay: 260 },
  { action: "wait", ms: 500 },
  { action: "print", text: "" },
  { action: "print", text: "Position: HOLD. Thesis confirmed. Valuation leaves no room for execution error.", cls: "synth-hold", delay: 280 },
  { action: "wait", ms: 600 },
  { action: "print", text: "" },
  { action: "print", text: "Open questions for next review:", cls: "header" },
  { action: "print", text: "\u2014 Q4 print: does the $65B guide translate to a beat? Revenue matters less than FY2027 margin guidance.", delay: 240 },
  { action: "print", text: "\u2014 HBM4 contract terms: when do FY2027 input costs become visible?", delay: 240 },
  { action: "print", text: "\u2014 Rubin timeline: any acceleration or delay signals from TSMC?", delay: 240 },
  { action: "wait", ms: 600 },
  { action: "print", text: "" },

  // ── Save ──
  { action: "print", text: "\u2713 Saved \u00b7 next scan: 18h", cls: "success", delay: 350 },
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

    async function thinkText(text: string, speed = 26, cls = "think") {
      setTypingCls(cls);
      const words = text.split(" ");
      let built = "";
      for (let i = 0; i < words.length; i += 1) {
        if (cancelled) return;
        built += (i === 0 ? "" : " ") + words[i];
        setTypingLine(built);
        await sleep(speed + Math.random() * 35);
      }
      if (cancelled) return;
      setLines((prev) => [...prev, { text, cls }]);
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
        } else if (step.action === "reason") {
          await thinkText(step.text, step.speed, "reason");
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
