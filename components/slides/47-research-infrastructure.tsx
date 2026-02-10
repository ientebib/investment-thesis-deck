import { SectionHeader, SourceLine } from "@/components/ui";
import { slide47ResearchInfrastructureData } from "@/lib/data/slides";

const slideData = slide47ResearchInfrastructureData;

const dataSources = [
  { group: "Financial", items: ["FMP API", "SEC EDGAR", "FRED"], color: "var(--primary)" },
  { group: "AI & Compute", items: ["Epoch AI", "SemiAnalysis", "Company Filings"], color: "var(--secondary)" },
  { group: "Commodities", items: ["USGS", "IEA", "LME"], color: "var(--ext-1)" },
  { group: "Alternative", items: ["On-Chain Feeds", "Shipping / AIS", "Patent Data"], color: "var(--caution)" }
];

const toolCalls = [
  "web_search",
  "data_fetch",
  "file_read",
  "statistical_test",
  "chart_render",
  "sql_query"
];

const skills = [
  "Equity Research",
  "Stock Screener",
  "Risk Analysis",
  "Trend Analysis",
  "Quant Factors",
  "Portfolio Construction",
  "Moat Analysis",
  "Value-Chain Mapping"
];

const outputs = [
  "Research Memos",
  "Data Tables",
  "Correlations",
  "Risk Reports",
  "Market Pricing",
  "Supply-Chain Maps"
];

/** Simple centered dashed-line connector between tiers */
/** One-way down arrow */
function Connector() {
  return (
    <div className="ra-tier ra-tier--connector">
      <span className="ra-tier-label" aria-hidden="true" />
      <div className="ra-connector-area">
        <div className="ra-connector-line" />
      </div>
    </div>
  );
}

/** Bidirectional arrows (up + down side by side, centered) */
function BiConnector() {
  return (
    <div className="ra-tier ra-tier--connector">
      <span className="ra-tier-label" aria-hidden="true" />
      <div className="ra-connector-area">
        <div className="ra-connector-line" />
        <div className="ra-connector-line ra-connector-line--up" />
      </div>
    </div>
  );
}

export function Slide47ResearchInfrastructure() {
  return (
    <>
      <SectionHeader sectionLabel={slideData.sectionLabel} title={slideData.title} subtitle={slideData.subtitle} />

      <div className="ra-diagram">
        {/* Tier 1 — Data Sources */}
        <div className="ra-tier">
          <span className="ra-tier-label">Data Ingestion</span>
          <div className="ra-sources-grid">
            {dataSources.map((src) => (
              <div key={src.group} className="ra-source-card" style={{ borderTopColor: src.color }}>
                <div className="ra-source-group-name">{src.group}</div>
                <div className="ra-source-items">
                  {src.items.map((item) => (
                    <span key={item} className="ra-source-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <BiConnector />

        {/* Tier 2 — Central Agent */}
        <div className="ra-tier">
          <span className="ra-tier-label">Orchestration</span>
          <div className="ra-agent-box">
            <div className="ra-agent-header">
              <span className="ra-agent-icon">&#9670;</span>
              <span className="ra-agent-name">Long Horizon CLI Agent</span>
            </div>
            <div className="ra-agent-detail">
              Autonomous research scaffolding &middot; persistent memory across sessions &middot; every output reviewed by a human analyst
            </div>
            <div className="ra-tools-row">
              {toolCalls.map((tool) => (
                <span key={tool} className="ra-tool-chip">{tool}()</span>
              ))}
            </div>
          </div>
        </div>

        <BiConnector />

        {/* Tier 3 — Skills Library */}
        <div className="ra-tier">
          <span className="ra-tier-label">Skill Library</span>
          <div className="ra-skills-grid">
            {skills.map((skill) => (
              <div key={skill} className="ra-skill-chip">{skill}</div>
            ))}
          </div>
        </div>

        <Connector />

        {/* Tier 4 — Structured Output */}
        <div className="ra-tier">
          <span className="ra-tier-label">Structured Output</span>
          <div className="ra-outputs-grid">
            {outputs.map((output) => (
              <div key={output} className="ra-output-chip">{output}</div>
            ))}
          </div>
        </div>
      </div>

      <SourceLine text={slideData.sourceLine} />
    </>
  );
}
