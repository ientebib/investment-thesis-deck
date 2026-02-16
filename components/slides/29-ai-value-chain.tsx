"use client";

import { useMemo, useState } from "react";
import { SectionHeader, SourceLine } from "@/components/ui";
import { slide29ValueChainData } from "@/lib/data/slides";

const slideData = slide29ValueChainData;

export function Slide29AiValueChain() {
  const [activeLayerId, setActiveLayerId] = useState(0);

  const activeLayer = useMemo(
    () => slideData.layers[activeLayerId],
    [activeLayerId]
  );

  return (
    <>
      <SectionHeader
        sectionLabel={slideData.sectionLabel}
        title={slideData.title}
        subtitle={slideData.subtitle}
      />

      <div className="ai-vc-container">
        <nav className="ai-vc-sidebar">
          {slideData.layers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              className={`ai-vc-sidebar-item${layer.id === activeLayerId ? " is-active" : ""}`}
              onClick={() => setActiveLayerId(layer.id)}
            >
              <span className="ai-vc-sidebar-num">{layer.id + 1}</span>
              <span className="ai-vc-sidebar-label">{layer.shortName}</span>
              <span className="ai-vc-sidebar-badge">{layer.nodes.length}</span>
            </button>
          ))}
        </nav>

        <div className="ai-vc-main">
          <header className="ai-vc-layer-header">
            <h3 className="ai-vc-layer-title">{activeLayer.name}</h3>
            <p className="ai-vc-layer-desc">{activeLayer.description}</p>
          </header>

          <div className="ai-vc-node-grid">
            {activeLayer.nodes.map((node) => (
              <div key={node.id} className="ai-vc-node-card">
                <span className="ai-vc-node-id">{node.id}</span>
                <span className="ai-vc-node-title">{node.title}</span>
                <span className="ai-vc-node-subtitle">{node.subtitle}</span>
                {node.keyPlayers && (
                  <span className="ai-vc-node-players">{node.keyPlayers}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} tight />
    </>
  );
}
