"use client";

import { useEffect, useState } from "react";
import { NeuralStackLogo } from "@/components/ui/NeuralStackLogo";
import { MathewTerminal } from "@/components/ui/MathewTerminal";

/* ── Mathew Memory Feed ─────────────────────────────────── */

const MEMORY_ITEMS = [
  "NVDA filed 10-K yesterday — reviewing transcript",
  "Last risk analysis completed 1 day ago",
  "Earnings calendar — ORCL reports Feb 12",
  "Updating supply chain data from Semi Analysis",
  "No new risk flags since last portfolio scan",
  "Macro data refresh in 4h — Trading Economics",
];

function MathewMemory() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((prev) => (prev + 2) % MEMORY_ITEMS.length);
        setFading(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const line1 = MEMORY_ITEMS[idx];
  const line2 = MEMORY_ITEMS[(idx + 1) % MEMORY_ITEMS.length];

  return (
    <div className="mathew-memory">
      <div className={`mathew-memory-lines${fading ? " mathew-memory-lines--fade" : ""}`}>
        <div className="mathew-memory-item">
          <span className="mathew-memory-pulse" />
          <span className="mathew-memory-text">{line1}</span>
        </div>
        <div className="mathew-memory-item mathew-memory-item--dim">
          <span className="mathew-memory-tick" />
          <span className="mathew-memory-text">{line2}</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [showMathew, setShowMathew] = useState(false);

  return (
    <main className="deck-home">
      <div className="deck-home-glow deck-home-glow--left" />
      <div className="deck-home-glow deck-home-glow--right" />

      <section className="deck-home-hero">
        <div className="deck-home-logo-wrap">
          <NeuralStackLogo size={86} interactive animate density="high" />
        </div>
        <p className="deck-home-kicker">Stack Capital</p>
        <h1 className="deck-home-title">Investor Materials</h1>
        <p className="deck-home-subtitle">
          Confidential &middot; February 2026
        </p>
      </section>

      <section className="deck-home-grid">
        <article className="deck-home-card deck-home-card--accent">
          <p className="deck-home-card-tag">Executive Summary</p>
          <h2 className="deck-home-card-title">Pitch Deck</h2>
          <a className="deck-home-card-cta deck-home-card-cta--secondary" href="/deck-react-short">
            Open Pitch Deck
          </a>
        </article>

        <article className="deck-home-card">
          <p className="deck-home-card-tag">Investment Thesis</p>
          <h2 className="deck-home-card-title">Investment Thesis</h2>
          <a className="deck-home-card-cta" href="/deck-react">
            Open Investment Thesis
          </a>
        </article>

        <article className="deck-home-card deck-home-card--portal">
          <p className="deck-home-card-tag">Investor Portal</p>
          <h2 className="deck-home-card-title">LP Login</h2>
          <a className="deck-home-card-cta deck-home-card-cta--portal" href="/investor-login">
            Investor Login
          </a>
        </article>
      </section>

      <section className="deck-home-mathew">
        <button
          className="deck-home-mathew-card"
          onClick={() => setShowMathew(true)}
          type="button"
        >
          <div className="deck-home-mathew-info">
            <div className="deck-home-mathew-badge">
              <span className="deck-home-mathew-dot" />
              AI Research Infrastructure
            </div>
            <h2 className="deck-home-mathew-title">Meet Mathew</h2>
            <p className="deck-home-mathew-copy">
              Mathew is a proprietary research analyst with access to live market data, financial data, supply chain monitoring, and value chain mapping — used for portfolio risk analysis, stress testing, and signal generation.
            </p>
            <span className="deck-home-mathew-cta">
              Launch Demo &rarr;
            </span>
          </div>
          <MathewMemory />
        </button>
      </section>

      {showMathew && <MathewTerminal onClose={() => setShowMathew(false)} />}
    </main>
  );
}
