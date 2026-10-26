import type { RunStatus } from '../types';
export function StatusBadge({ status }: { status: RunStatus }) { return <span className={`status status-${status}`}><i aria-hidden="true" />{status}</span>; }
