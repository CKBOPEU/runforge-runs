import { mockRuns } from './data';
import type { Run } from './types';
export function fetchRuns(options: { forceError?: boolean; delayMs?: number } = {}): Promise<Run[]> {
  const delay = options.delayMs ?? (import.meta.env.MODE === 'test' ? 10 : 650);
  return new Promise((resolve, reject) => setTimeout(() => options.forceError ? reject(new Error('The run service is temporarily unavailable.')) : resolve(mockRuns), delay));
}
