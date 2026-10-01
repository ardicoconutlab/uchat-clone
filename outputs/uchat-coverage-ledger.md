# UChat coverage ledger

Updated 30 September 2026. Companion to [master plan](uchat-master-plan.md) and [field-level specification](uchat-detailed-specification.md).

This tracks the known research scope. It does not establish that every UChat feature has been discovered. No clone implementation has been built or verified in this research task. “Inspected” means visible controls were reviewed; “saved” means a specific configuration result was observed. Runtime parity remains open unless explicitly stated.

| ID | Area / evidence | Current coverage | Next evidence needed |
|---|---|---|---|
| PDF-01–28 | Colleague PDF, master §14 | All28 pages visually reviewed and mapped | Reproduce populated workflows and unseen states |
| WABA-CONNECT | Workspace WhatsApp Cloud, master §13 | Connected assets and detailed health inspected | Eligible test number, inbound/outbound event tests |
| WABA-BIND | Omni linking dialog | Destructive contact warning inspected; canceled | Disposable channel or explicit confirmation of deletion |
| WABA-TEMPLATE | Template UI and PDF | Broad inventory; campaign Edit path inconclusive | Template types, variables, media, submission/review/status transitions |
| WABA-FLOW | SPEC-WAF | Creation name/category fields | Screen designer, data exchange, validation, publish/deprecate |
| WABA-CALL | Call settings/menu and PDF | Listed controls and health limitations | Permissions, inbound/outbound calls, session states and failures |
| WABA-COMMERCE | SPEC-MULTIPRODUCT | Multiple-product form fields | Single product/catalog/order details/status editors; delivery/cart events |
| FLOW-CANVAS | Master §6; test draft | Draft creation, palette and node selection | Edges, undo, copy/paste, versions, validation, publish/rollback |
| FLOW-QUESTION | SPEC-QUESTION | Text question, no-match/no-input, advanced fields | Other question types, pagination, answer editors and runtime |
| FLOW-CONDITION | Master/PDF | Palette and routing example | Full operators, nested groups, missing values and branch precedence |
| FLOW-ACTION | Master §15/PDF | Broad action catalog | Each action schema, success/failure outputs and execution |
| FLOW-SPLIT | Palette | Listed | Weight editor, distribution, persistence and branch tests |
| FLOW-GOTO | Palette | Listed | Subflow/step targeting, return behavior and recursion limits |
| FLOW-EMAIL | Palette/PDF | Listed | Composer, sender prerequisites and delivery lifecycle |
| AUTO-KEY | SPEC-KEY | Keyword operators/form | Hotword and pause precedence, matching semantics |
| AUTO-SEQ | SPEC-SEQ | Timing/windows/weekdays/form | Units, timezone, enrollment lifecycle and durable scheduling |
| AUTO-TRIGGER | Master §15 | Full visible trigger catalog | Each trigger's filters/payloads, retries and deduplication |
| FIELD-USER | SPEC-FIELD | Type catalog and create form | Edit/conversion/deletion, limits and filter execution |
| CONTENT | Master inventory/PDF | Libraries broadly inspected/listed | Every CRUD dialog and cross-reference behavior |
| CONTACT | SPEC-CONTACT | Create fields/consent, list | Import/export, duplicate resolution, segments, bulk operations |
| BOARD | SPEC-BOARD | One board/column saved | Card moves, filters, assignments, concurrency and triggers |
| INBOX | Master §15/PDF | Policies and populated screenshot | Controlled conversation, handoff, notes, snooze, visibility matrix |
| CAMPAIGN | SPEC-CAM | Type catalog and phone-template form | CSV mapping, scheduling, statuses, cancellation, retry and actual delivery |
| RATE | SPEC-RATE | Enable-dependent numeric fields | Scope, window algorithm, exceeded behavior and reset |
| AI-AGENT | Master §15 | Agent form and PDF | Model/tool invocation, streaming, guardrails and handoff behavior |
| AI-TASK | PDF/master | Task/output concept | Detailed schema editor and structured-output failures |
| AI-FUNCTION | PDF/master | Workflow binding concept | Parameter schema, execution and error contracts |
| AI-KB | SPEC-KB | KB/vector-store create forms | Files tab, ingestion, retrieval, expiry and deletion behavior |
| AI-MCP | PDF/master | Feature evidenced | Connection, tool discovery, permissions, invocation/reconnect |
| TOOLS | Master inventory | Broad catalog | Each tool's form, output, dependencies and failure states |
| ECOMMERCE | Master/PDF | Product editor and store overview | Discounts, variants, inventory, checkout, orders/refunds, provider tests |
| ANALYTICS | Master/PDF | Dashboard/report surfaces | Metric definitions, filters, exports and event reconciliation |
| TEAM-ROLES | Master/PDF | Member/seat and policy concepts | Role editor and action-by-role access tests |
| ACCOUNT | Master/PDF | Workspace/profile/settings inventory | Conditional settings, sessions, invitations, audit retention |
| BILLING | PDF/master | Seats/proration presentation | Plan entitlements, invoices, quotas and lifecycle in safe test context |
| MINIAPP | Master/PDF | Store/creator/package concepts | Installation, versioning, configuration and execution contracts |
| TEMPLATES | Master/PDF | Marketplace/cards | Install/copy/dependencies/version behavior |
| TICKETS | Master | Access gate | Entitled workspace and full lifecycle |
| AGENCY | Master | Scope identified | Entitled agency workspace and white-label/admin behavior |
| CHANNELS | Master integration catalog | Provider names and shared UI | Separate capability and event/action tests per provider |
| VISUAL | PDF and live desktop UI | Reference desktop states | Responsive layouts, loading/error/empty/populated comparison set |
| OPERATIONS | Master architecture | Proposed design | Tenant isolation, duplicates, outages, recovery, retention and load tests |

## Completion record required per feature

Use: source route/page; observed date; role/plan/channel; field schema; validation; states/transitions; side effects; dependencies; acceptance inputs/outputs; implementation reference; test evidence; open issues. Split each integration/action family into individual records before estimating completion.

## Next research order

1. Finish question subpanels and remaining core node editors.
2. Complete campaign scheduling/CSV and template editing using a safe test setup.
3. Inspect content/tools/ecommerce/role forms and remaining AI editors.
4. Obtain missing entitled screens and a safely populated test inbox.
5. Execute controlled WABA and flow scenarios with an explicitly designated test recipient, then other channels individually.
6. Capture visual states and reconcile all requirements with implementation tests.

Current contact-deleting WABA binding remains canceled. Broad authorization to explore does not resolve that irreversible warning. Most remaining form research can continue independently of it.

### 30 September health recheck

WABA payment gate cleared in the visible report: WABA AVAILABLE and no141006 payment error. Business verification/display-name limitations remain. User designated a test recipient distinct from the sender. WABA-CONNECT runtime tests remain open; WABA-BIND remains unresolved. No send performed.

### 30 September channel binding completed

WABA-BIND: explicitly authorized irreversible warning accepted; resulting Omni row shows linked phone number and Unlink. Configuration outcome verified; messaging runtime remains untested. Earlier binding-blocked notes are historical and superseded.

### First controlled conversation

WABA inbound text verified in live inbox; contact identity matches authorized test recipient. One agent reply submitted and rendered with cleared composer. Recipient delivery/read receipt not yet confirmed. Inbox exposed free-reply countdown and automatic30-minute automation pause after agent response. Full automation, template and campaign tests remain open.

### Guarded keyword test configured

User confirmed handset receipt of agent reply. Published three-node research workflow with phone guard and text acknowledgement; exact keyword rule saved active. Contact pause cleared. Publication/configuration verified; keyword runtime awaits incoming “uchat research test”.

### Keyword execution and template selector

Positive keyword test passed in UI: incoming keyword followed by Sent by Bot acknowledgement from published guarded workflow. Supersedes awaiting-keyword notes. Automated handset delivery remains unconfirmed separately. Template editor selector showed No data; template sync/catalog context remains to investigate. Blank template block added only to unpublished Main Flow draft; no template sent.

### Advanced WhatsApp forms

Catalog message and WhatsApp Flow launch forms inspected; Flow completion branch observed. Calling enable/callback/weekly-hours form inspected, including two intervals/day; canceled unsaved. Coexistence vendor guide reviewed; history/echo synchronization not tested. Live calls and purchases excluded by user. Details and proposed acceptance cases in SPEC-WA-ADVANCED. Full designer and provider runtime remain open.

### Scope and template synchronization update

Commerce deferred by user; retain as future backlog. WABA-TEMPLATE: Sync transformed empty catalog into one APPROVED en MARKETING template (broadcast); existing-template editor and default-settings dialog inspected, canceled unchanged. Named placeholder observed; actual per-send mapping and delivery remain open. WABA coexistence: provider-documented event families and proposed recovery/echo/history acceptance cases added; direct Meta docs429, live app echo/history not tested.


### User acceptance / research closure

User confirms messaging works from both WhatsApp Business App and UChat. Label coexistence messaging user-confirmed; history import, contact sync, deduplication and recovery remain unverified. User declines further testing as unnecessary for now. Remaining research items are deferred, not passed. Current research pass closed; commerce deferred and live calls/purchases excluded. Implementation has not started.
