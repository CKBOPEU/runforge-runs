import { useCallback, useEffect, useMemo, useState } from "react";
import type { Run, RunStatus } from "./types";
import { fetchRuns } from "./mockService";
import { FilterBar } from "./components/FilterBar";
import { RunList } from "./components/RunList";
import { RunDetails } from "./components/RunDetails";

type StatusFilter = "all" | RunStatus;

export default function App() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<Run | null>(null);
  const simulateError = new URLSearchParams(window.location.search).get("error") === "1";

  function loadRuns(forceError = false) {
    setLoading(true);
    setError("");
    fetchRuns({ forceError })
      .then(setRuns)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load runs"))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadRuns(simulateError); }, []);

  const closeDetails = useCallback(() => setSelected(null), []);

  const filteredRuns = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return runs.filter((run) => {
      const matchesStatus = status === "all" || run.status === status;
      const searchableText = `${run.name} ${run.repository}`.toLowerCase();
      return matchesStatus && searchableText.includes(normalizedQuery);
    });
  }, [runs, status, query]);

  return <>
    <header className="topbar">
      <a className="brand" href="/" aria-label="Runforge home"><span className="mark">R</span>Runforge</a>
      <nav aria-label="Main navigation"><a className="nav-active" href="#runs">Runs</a></nav>
      <span className="avatar" aria-label="Demo workspace">DK</span>
    </header>
    <main id="runs">
      <section className="intro"><div><p className="eyebrow">Workspace / Runs</p><h1>Runs</h1><p className="subtitle">Monitor agent workspaces and inspect their results.</p></div><button className="refresh" onClick={() => loadRuns()} disabled={loading}>{loading ? "Refreshing…" : "↻ Refresh"}</button></section>
      {error && <div className="error" role="alert"><div><strong>Runs are unavailable</strong><p>{error}</p></div><button onClick={() => loadRuns()}>Try again</button></div>}
      {loading && !error && <div className="loading" aria-label="Loading runs"><span /><span /><span /></div>}
      {!loading && !error && <><FilterBar query={query} status={status} onQuery={setQuery} onStatus={setStatus} /><p className="count">Showing <strong>{filteredRuns.length}</strong> of {runs.length} runs</p><RunList runs={filteredRuns} onSelect={setSelected} onReset={() => { setQuery(""); setStatus("all"); }} /></>}
      {selected && <RunDetails run={selected} onClose={closeDetails} />}
    </main>
  </>;
}



