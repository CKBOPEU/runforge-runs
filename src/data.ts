import type { Run } from './types';
export const mockRuns: Run[] = [
  { id:'run-1042', name:'Release candidate', repository:'runforge/web', branch:'main', status:'running', createdAt:'2026-10-25T14:20:00Z', durationSeconds:74, logs:['Started agent workspace','Installing dependencies','Running browser checks…'] },
  { id:'run-1041', name:'Fix checkout tests', repository:'commerce/api', branch:'fix/checkout', status:'succeeded', createdAt:'2026-10-25T13:48:00Z', durationSeconds:186, logs:['Workspace ready','42 tests passed','Artifacts uploaded'], result:'All checks passed. Coverage 91%.' },
  { id:'run-1040', name:'Docs preview', repository:'runforge/docs', branch:'content/v2', status:'queued', createdAt:'2026-10-25T13:32:00Z', logs:['Waiting for an available worker'] },
  { id:'run-1039', name:'Mobile smoke suite', repository:'commerce/mobile', branch:'develop', status:'failed', createdAt:'2026-10-25T12:05:00Z', durationSeconds:241, logs:['Launching emulator','Smoke test: login','Process exited with code 1'], result:'Failed: login fixture was not available.' },
  { id:'run-1038', name:'API contract check', repository:'commerce/api', branch:'main', status:'succeeded', createdAt:'2026-10-25T11:10:00Z', durationSeconds:63, logs:['Fetching OpenAPI schema','No breaking changes found'], result:'Contract is compatible.' },
  { id:'run-1037', name:'Landing page audit', repository:'runforge/web', branch:'feat/landing', status:'queued', createdAt:'2026-10-25T10:22:00Z', durationSeconds:0, logs:['Queued by Dmitry'] },
  { id:'run-1036', name:'Nightly dependency scan', repository:'infra/monorepo', branch:'main', status:'failed', createdAt:'2026-10-25T03:00:00Z', durationSeconds:318, logs:['Scanning 284 packages','3 advisories require review'], result:'Scan completed with high-severity advisories.' },
  { id:'run-1035', name:'Worker health check', repository:'infra/runner', branch:'main', status:'running', createdAt:'2026-10-24T22:44:00Z', durationSeconds:28, logs:['Provisioning sandbox','Checking runner heartbeat'] }
];
