import type { TableRow } from "@/lib/data/types";
import type { SemanticConcept } from "@/lib/semanticChannels";
import { semanticPanelClass } from "@/lib/semanticChannels";

type ThesisPanelCardProps = {
  concept: SemanticConcept;
  title: string;
  description: string;
  rows: TableRow[];
};

export function ThesisPanelCard({ concept, title, description, rows }: ThesisPanelCardProps) {
  return (
    <article className={`thesis-panel ${semanticPanelClass(concept)}`}>
      <div className="thesis-panel-title">{title}</div>
      <p className="thesis-panel-description">{description}</p>
      <table className="thesis-table">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th>{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
