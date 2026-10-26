import { useEffect, useRef } from "react";
import type { Run } from "../types";
import { StatusBadge } from "./StatusBadge";
import { formatDuration } from "./RunList";

export function RunDetails({ run, onClose }: { run: Run; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    panel.current?.focus();
    const handleTab = (event: KeyboardEvent) => {
      if (event.key === "Tab") { event.preventDefault(); panel.current?.querySelector<HTMLButtonElement>(".close")?.focus(); }
    };
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("keydown", handleTab);
    return () => { document.removeEventListener("keydown", handleKey);
      document.removeEventListener("keydown", handleTab); previousFocus.current?.focus(); };
  }, [onClose]);
  return <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="drawer" role="dialog" aria-modal="true" aria-labelledby="run-title" tabIndex={-1} ref={panel}>
      <button className="close" onClick={onClose} aria-label="Close details">×</button>
      <p className="eyebrow">Run details</p><h2 id="run-title">{run.name}</h2><StatusBadge status={run.status} />
      <dl><div><dt>Repository</dt><dd>{run.repository}</dd></div><div><dt>Branch</dt><dd>{run.branch}</dd></div><div><dt>Duration</dt><dd>{formatDuration(run.durationSeconds)}</dd></div></dl>
      <h3>Logs</h3><ol className="logs">{run.logs.map((line, index) => <li key={index}>{line}</li>)}</ol>
      {run.result && <><h3>Result</h3><p className="result">{run.result}</p></>}
    </div>
  </div>;
}


