"use client";

import { useMemo, useState } from "react";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide48LeadingIndicatorsData } from "@/lib/data/slides";
import type { Slide48Trend, Slide48Hypothesis, Slide48Dependency } from "@/lib/data/types";

const slideData = slide48LeadingIndicatorsData;

type ViewState =
  | { view: "overview" }
  | { view: "trend"; trendId: string }
  | { view: "hypothesis"; trendId: string; hypothesisId: string }
  | { view: "network" };

function toneColor(tone: "primary" | "secondary" | "tertiary") {
  if (tone === "primary") return "primary";
  if (tone === "secondary") return "secondary";
  return "tertiary";
}

function depTypeLabel(type: Slide48Dependency["type"]) {
  if (type === "requires") return "requires";
  if (type === "amplifies") return "amplifies";
  return "conditional";
}

function findHypothesisName(id: string): string {
  for (const t of slideData.trends) {
    for (const h of t.hypotheses) {
      if (h.id === id) return h.name;
    }
  }
  return id;
}

/* ── Stats bar ── */
function StatsBar() {
  const s = slideData.stats;
  const items = [
    { value: s.trends, label: "Trends" },
    { value: s.hypotheses, label: "Hypotheses" },
    { value: s.kpis, label: "KPIs" },
    { value: s.scenarioSets, label: "Scenario Sets" },
    { value: s.validationChecks, label: "Checks" },
  ];
  return (
    <div className="rmf-stats-bar">
      {items.map((i) => (
        <span key={i.label} className="rmf-stat">
          <span className="rmf-stat-value">{i.value}</span>
          <span className="rmf-stat-label">{i.label}</span>
        </span>
      ))}
    </div>
  );
}

/* ── Breadcrumb ── */
function Breadcrumb({ parts, onNavigate }: { parts: { label: string; onClick?: () => void }[]; onNavigate: (v: ViewState) => void }) {
  return (
    <div className="rmf-breadcrumb">
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="rmf-breadcrumb-sep">/</span>}
          {p.onClick ? (
            <button type="button" className="rmf-breadcrumb-link" onClick={p.onClick}>
              {p.label}
            </button>
          ) : (
            <span className="rmf-breadcrumb-current">{p.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ── View 1: Overview ── */
function OverviewView({ onSelectTrend }: { onSelectTrend: (id: string) => void }) {
  return (
    <div className="rmf-trend-grid">
      {slideData.trends.map((t) => (
        <article
          key={t.id}
          className={`rmf-trend-card rmf-trend-card--${toneColor(t.tone)}`}
          onClick={() => onSelectTrend(t.id)}
        >
          <div className="rmf-trend-card-header">
            <span className="rmf-trend-card-id">{t.id}</span>
            <h3 className="rmf-trend-card-name">{t.name}</h3>
          </div>
          <div className="rmf-trend-card-body">
            <div className="rmf-trend-card-meta">
              <span>{t.horizon}</span>
              <span>{t.status}</span>
            </div>
            <span className="rmf-trend-card-count">
              {t.hypotheses.length} hypotheses · {t.hypotheses.reduce((n, h) => n + h.kpis.length, 0)} KPIs
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ── View 2: Trend Detail ── */
function TrendDetailView({ trend, onSelectHypothesis }: { trend: Slide48Trend; onSelectHypothesis: (hId: string) => void }) {
  const tc = toneColor(trend.tone);
  return (
    <>
      <div className={`rmf-trend-header rmf-trend-header--${tc}`}>
        <h3 className="rmf-trend-header-name">{trend.name}</h3>
        <p className="rmf-trend-header-meta">{trend.horizon} · {trend.status} · {trend.hypotheses.length} hypotheses</p>
      </div>
      <div className="rmf-hypothesis-stack">
        {trend.hypotheses.map((h) => (
          <article
            key={h.id}
            className="rmf-hypothesis-card"
            onClick={() => onSelectHypothesis(h.id)}
          >
            <div className="rmf-hypothesis-card-left">
              <div className="rmf-hypothesis-card-top">
                <span className="rmf-badge rmf-badge--id">{h.id}</span>
                <span className={`rmf-badge rmf-badge--t${h.tier}`}>T{h.tier}</span>
                <span className="rmf-badge rmf-badge--cadence">{h.cadence}</span>
              </div>
              <span className="rmf-hypothesis-card-name">{h.name}</span>
              <span className="rmf-hypothesis-card-claim">{h.claim}</span>
              {h.dependencies.length > 0 && (
                <div className="rmf-hypothesis-card-tags">
                  {h.dependencies.map((d) => (
                    <span key={d.targetId} className="rmf-badge rmf-badge--dep">
                      {depTypeLabel(d.type)} {d.targetId}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* ── View 3: Hypothesis Deep Dive ── */
function HypothesisDetailView({ hypothesis, trend }: { hypothesis: Slide48Hypothesis; trend: Slide48Trend }) {
  return (
    <div className="rmf-detail-grid">
      {/* Left: Claim & meta */}
      <div className="rmf-detail-panel">
        <div className="rmf-detail-panel-header">Hypothesis</div>
        <div className="rmf-detail-panel-body">
          <p className="rmf-detail-claim">{hypothesis.claim}</p>
          <div className="rmf-detail-row">
            <span className="rmf-detail-row-label">Tier</span>
            <span className={`rmf-badge rmf-badge--t${hypothesis.tier}`}>T{hypothesis.tier}</span>
          </div>
          <div className="rmf-detail-row">
            <span className="rmf-detail-row-label">Cadence</span>
            <span className="rmf-detail-row-value">{hypothesis.cadence}</span>
          </div>
          <div className="rmf-detail-row">
            <span className="rmf-detail-row-label">Trend</span>
            <span className="rmf-detail-row-value">{trend.id}</span>
          </div>
          {hypothesis.dependencies.length > 0 && (
            <>
              <div className="rmf-detail-row">
                <span className="rmf-detail-row-label">Dependencies</span>
                <span className="rmf-detail-row-value">{hypothesis.dependencies.length}</span>
              </div>
              <div className="rmf-detail-dep-list">
                {hypothesis.dependencies.map((d) => (
                  <span key={d.targetId} className="rmf-detail-dep-item">
                    <span className="rmf-badge rmf-badge--dep">{depTypeLabel(d.type)}</span>
                    {d.targetId} — {findHypothesisName(d.targetId)}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Center: KPIs */}
      <div className="rmf-detail-panel">
        <div className="rmf-detail-panel-header">KPIs ({hypothesis.kpis.length})</div>
        <div className="rmf-detail-panel-body">
          <div className="rmf-kpi-list">
            {hypothesis.kpis.map((k) => (
              <div key={k.id} className="rmf-kpi-card">
                <div className="rmf-kpi-card-top">
                  <span className="rmf-kpi-card-name">{k.name}</span>
                  <span className={`rmf-badge rmf-badge--grade-${k.grade.toLowerCase()}`}>{k.grade}</span>
                </div>
                <span className="rmf-kpi-card-meta">{k.source} · {k.frequency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Scenario set */}
      <div className="rmf-detail-panel">
        <div className="rmf-detail-panel-header">Scenario Set {hypothesis.scenarioSet.id}</div>
        <div className="rmf-detail-panel-body">
          <div className="rmf-scenario-list">
            {hypothesis.scenarioSet.scenarios.map((s, i) => (
              <div key={i} className="rmf-scenario-item">{s.name}</div>
            ))}
          </div>
          <div className="rmf-scenario-persistence">
            <div className="rmf-scenario-persistence-label">Persistence Rule</div>
            {hypothesis.scenarioSet.persistence}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── View 4: Dependency Network ── */
function NetworkView() {
  const allDeps: { source: string; sourceName: string; sourceTrend: string; sourceTone: string; target: string; targetName: string; type: string }[] = [];
  for (const t of slideData.trends) {
    for (const h of t.hypotheses) {
      for (const d of h.dependencies) {
        allDeps.push({
          source: h.id,
          sourceName: h.name,
          sourceTrend: t.id,
          sourceTone: toneColor(t.tone),
          target: d.targetId,
          targetName: findHypothesisName(d.targetId),
          type: depTypeLabel(d.type),
        });
      }
    }
  }

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
      <table className="rmf-network-table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Trend</th>
            <th>Relation</th>
            <th>Target</th>
            <th>Target Name</th>
          </tr>
        </thead>
        <tbody>
          {allDeps.map((d, i) => (
            <tr key={i}>
              <td>
                <span className="rmf-badge rmf-badge--id">{d.source}</span>{" "}
                {d.sourceName}
              </td>
              <td>
                <span className={`rmf-network-trend-label rmf-network-trend-label--${d.sourceTone}`}>
                  {d.sourceTrend}
                </span>
              </td>
              <td>
                <span className="rmf-badge rmf-badge--dep">{d.type}</span>
              </td>
              <td>
                <span className="rmf-badge rmf-badge--id">{d.target}</span>
              </td>
              <td>{d.targetName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Main slide component ── */
export function Slide48LeadingIndicators() {
  const [viewState, setViewState] = useState<ViewState>({ view: "overview" });

  const activeTrend = useMemo(() => {
    if (viewState.view === "trend" || viewState.view === "hypothesis") {
      return slideData.trends.find((t) => t.id === viewState.trendId) ?? null;
    }
    return null;
  }, [viewState]);

  const activeHypothesis = useMemo(() => {
    if (viewState.view === "hypothesis" && activeTrend) {
      return activeTrend.hypotheses.find((h) => h.id === viewState.hypothesisId) ?? null;
    }
    return null;
  }, [viewState, activeTrend]);

  const goOverview = () => setViewState({ view: "overview" });
  const goTrend = (trendId: string) => setViewState({ view: "trend", trendId });
  const goHypothesis = (trendId: string, hypothesisId: string) =>
    setViewState({ view: "hypothesis", trendId, hypothesisId });
  const goNetwork = () => setViewState({ view: "network" });

  const isNetwork = viewState.view === "network";

  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="rmf-container">
        <StatsBar />

        <div className="rmf-view-toggle">
          <button
            type="button"
            className={`rmf-toggle-btn${!isNetwork ? " is-active" : ""}`}
            onClick={goOverview}
          >
            Explorer
          </button>
          <button
            type="button"
            className={`rmf-toggle-btn${isNetwork ? " is-active" : ""}`}
            onClick={goNetwork}
          >
            Dependency Network
          </button>
        </div>

        {/* Breadcrumb */}
        {viewState.view === "trend" && activeTrend && (
          <Breadcrumb
            parts={[
              { label: "Overview", onClick: goOverview },
              { label: `${activeTrend.id} ${activeTrend.name}` },
            ]}
            onNavigate={setViewState}
          />
        )}
        {viewState.view === "hypothesis" && activeTrend && activeHypothesis && (
          <Breadcrumb
            parts={[
              { label: "Overview", onClick: goOverview },
              { label: activeTrend.id, onClick: () => goTrend(activeTrend.id) },
              { label: `${activeHypothesis.id} ${activeHypothesis.name}` },
            ]}
            onNavigate={setViewState}
          />
        )}

        <div className="rmf-content">
          {viewState.view === "overview" && (
            <OverviewView onSelectTrend={goTrend} />
          )}

          {viewState.view === "trend" && activeTrend && (
            <TrendDetailView
              trend={activeTrend}
              onSelectHypothesis={(hId) => goHypothesis(activeTrend.id, hId)}
            />
          )}

          {viewState.view === "hypothesis" && activeTrend && activeHypothesis && (
            <HypothesisDetailView hypothesis={activeHypothesis} trend={activeTrend} />
          )}

          {viewState.view === "network" && <NetworkView />}
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} tight />
    </>
  );
}
