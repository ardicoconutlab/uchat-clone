# ConvoFlow

WhatsApp-first conversation automation, built from the UChat research master plan.

## What is in this first foundation

- Workspace shell with WhatsApp health state
- Shared inbox and human/bot conversation timeline
- Contact panel with consent, tags, assignment and automation-pause state
- Visual flow builder draft/publish model
- Typed node catalogue for messages, questions, conditions, actions and routing
- First webhook and health endpoints

## Deliberate next implementation work

Persist the view model in PostgreSQL, add Meta webhook verification and outbound delivery, then replace the canvas prototype with a full graph editor and durable worker execution.

## Run

Use Node 20 or newer.

```bash
npm install
npm run dev
```

## Current API boundary

The prototype has runtime-seeded data and typed REST contracts. They make the interface reviewable while PostgreSQL and authentication are added in the next increment.

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Service health check |
| `GET /api/conversations` | Workspace conversations |
| `GET` / `POST /api/conversations/:id/messages` | Read or add a conversation message |
| `PATCH /api/conversations/:id/automation` | Pause or resume automation |
| `GET` / `POST /api/flows` | Read flows or publish a flow |

The messaging endpoint only changes prototype data. It never sends an external WhatsApp message. The later Meta adapter will consume the same domain contract after tenant controls, idempotency, consent checks, and durable outbox processing exist.

Flow publishing now checks for a single Start node, stable node IDs, valid edges, an executable Start path, and unreachable nodes. The validator is intentionally separate from the interface so the later graph editor, API, and worker enforce the same rules.

## Database foundation

[001_core_tenancy_inbox.sql](db/migrations/001_core_tenancy_inbox.sql) is the first PostgreSQL migration. It defines tenant-scoped workspace, channel, contact, inbox, immutable flow-version, webhook, and outbox records, together with row-level security policies keyed by `app.workspace_id`.

It is a migration artifact only; no database has been provisioned or changed. The application will switch from the runtime store after a PostgreSQL environment and a restricted application database role are configured.

For local persistence, copy `.env.example` to `.env`, start PostgreSQL with `docker compose up -d postgres`, then apply the migrations in order. The runtime database helper sets the workspace value inside each transaction so PostgreSQL row-level security can enforce tenant isolation.

`002_whatsapp_delivery.sql` adds approved-template records, outbound intents, campaigns, consent history, and audit history. It does not make any external Meta API call.

The WhatsApp webhook refuses verification and event delivery until its verification token and app secret are configured. It verifies Meta's SHA-256 signature before parsing an event body. Sending remains disabled until the WABA access token and phone-number ID are configured.
