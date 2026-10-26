import type { RunStatus } from '../types';
const statuses: Array<'all' | RunStatus> = ['all','queued','running','succeeded','failed'];
export function FilterBar({ query, status, onQuery, onStatus }: { query:string; status:'all'|RunStatus; onQuery:(v:string)=>void; onStatus:(v:'all'|RunStatus)=>void }) {
  return <div className="filters"><label className="search"><span>Search runs</span><input aria-label="Search by run or repository" value={query} onChange={e=>onQuery(e.target.value)} placeholder="Search by run or repository" /></label><div className="status-filter" aria-label="Filter by status">{statuses.map(item=><button key={item} className={status===item?'active':''} aria-pressed={status===item} onClick={()=>onStatus(item)}>{item}</button>)}</div></div>;
}
