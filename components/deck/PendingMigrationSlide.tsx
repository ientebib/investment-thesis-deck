type PendingMigrationSlideProps = {
  chartCount: number;
  hasSourceLine: boolean;
  inlineStyleAttrCount: number;
  lineStart: number;
  lineEnd: number;
  title: string;
};

export function PendingMigrationSlide({
  chartCount,
  hasSourceLine,
  inlineStyleAttrCount,
  lineStart,
  lineEnd,
  title
}: PendingMigrationSlideProps) {
  return (
    <div className="migration-pending-wrap">
      <div className="migration-pending-card">
        <div className="migration-pill">Migration Pending</div>
        <h3>{title || "Untitled slide"}</h3>
        <p>
          This slide is still pending React migration. The legacy HTML deck is no longer exposed publicly.
        </p>

        <div className="migration-metadata-grid">
          <div>
            <span>Charts</span>
            <strong>{chartCount}</strong>
          </div>
          <div>
            <span>Source Line</span>
            <strong>{hasSourceLine ? "Yes" : "No"}</strong>
          </div>
          <div>
            <span>Inline Styles</span>
            <strong>{inlineStyleAttrCount}</strong>
          </div>
          <div>
            <span>Legacy Range</span>
            <strong>
              {lineStart}-{lineEnd}
            </strong>
          </div>
        </div>

        <a className="migration-link" href="/deck-react">
          Return to React Deck
        </a>
      </div>
    </div>
  );
}
