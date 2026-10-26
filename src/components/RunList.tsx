import type { Run } from "../types";
import { StatusBadge } from "./StatusBadge";

const dateFormatter = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

export function formatDuration(seconds?: number) {
  if (seconds === undefined) return "—";
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes ? `${minutes}m ${remainder}s` : `${remainder}s`;
}

export function RunList({ runs, onSelect, onReset }: { runs: Run[]; onSelect: (run: Run) => void; onReset?: () => void }) {
  return <div className="run-list" role="region" aria-label="Runs">
    <table><thead><tr><th>Run</th><th>Status</th><th>Created</th><th>Duration</th></tr></thead><tbody>
      {runs.map((run) => <tr key={run.id} onClick={() => onSelect(run)}>
        <td><button className="run-link"><strong>{run.name}</strong><small>{run.repository} · {run.branch}</small></button></td>
        <td><StatusBadge status={run.status} /></td><td>{dateFormatter.format(new Date(run.createdAt))}</td><td>{formatDuration(run.durationSeconds)}</td>
      </tr>)}
    </tbody></table>
    {runs.length === 0 && <div className="empty"><p>No runs match these filters.</p>{onReset && <button onClick={onReset}>Reset filters</button>}</div>}
  </div>;
}

