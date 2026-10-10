# Sovereign Mirror Pipeline — frontend

Mobile-first React + TypeScript + Vite PWA frontend foundation for the local capture CLI.

## Included

- Dashboard, source selection, pipeline detail, approval gate, rollback, security scan, and artifacts screens.
- Mobile bottom navigation and status widget preview.
- Explicit `DEMO` / `NOT LIVE` indicators where data is illustrative.
- Approval stays disabled because scan/build/test/provenance evidence is not connected.
- Rollback action never switches a symlink or mutates a release; it explains the missing backend boundary.
- PWA manifest and mobile viewport setup.

## Run

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run type-check
npm run build
npm run preview
```

## Connect to `mirror.py`

This frontend intentionally does not claim to run a capture. Add a local API adapter only after the CLI exposes a defined, authenticated interface. Recommended API boundary:

- `GET /api/health`
- `GET /api/sources`
- `POST /api/captures` — accept a source ID or explicitly selected local path
- `GET /api/captures/:id`
- `GET /api/captures/:id/events` — SSE/WebSocket for progress
- `GET /api/captures/:id/security`
- `GET /api/artifacts`
- `GET /api/releases`
- `POST /api/releases/:id/rollback/verify`
- `POST /api/releases/:id/rollback/execute` — server-side re-verification, explicit confirmation, atomic pointer switch, audit record

The backend must enforce authorization, path allowlists, symlink/path traversal protections, immutable capture storage, digest verification, isolated builds, audit logging, and default-deny external writes. Never trust a client-side “PASS” status as release evidence.

## PWA note

The manifest is included. Installability also requires serving over HTTPS (or localhost) and adding valid icon assets. A service worker/offline cache is not included yet; do not advertise full offline support until it is implemented and tested.

## UI sample-data policy

Pipeline stages and release versions shown in the mock screens are illustrative UI fixtures. They are not actual CLI execution results, real hashes, security findings, or deployment status.
