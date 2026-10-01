# UChat field-level specification — research supplement

Research date: 29 September 2026. Read with [master plan](uchat-master-plan.md). This document adds live observations to the broader inventory and PDF crosswalk. **Observed controls are not verified execution behavior.** Limits below are displayed UI counters, not tested server enforcement. Acceptance checks are proposed requirements for our implementation.

## Evidence and change log

Sources: authorized Coco Research Test bot, flow f306687, authenticated UChat workspace 337425, and the prior master-plan PDF crosswalk. No private backend contracts were inspected.

- Created board **Research — disposable board**, one column **New**; saved board and zero column count observed.
- Added an unconnected **Question #1** draft node with a blank Text question for editor inspection. No publication or execution.
- The existing Send Message #1 node visibly contains a blank **WhatsApp Multiple Products** block. This corrects the earlier description of an entirely empty message node; its original insertion time was not established in this pass.
- Campaign form was inspected without entering recipients or saving/scheduling. Its template Edit action briefly navigated to the flow canvas and returned to the campaign list; no template editor was verified through that path.
- Sequence, keyword, field, WhatsApp Flow, contact, knowledge-base and vector-store forms were canceled. Rate-limit Enable was inspected, then restored to Disabled without Save.
- No message sent, flow published, contact created/deleted, template submitted, knowledge file uploaded, or paid setting changed.

## SPEC-SEQ — Sequences

Source: bot → Automation → Sequences, `#/automation/sequence`. **Inspected; configuration not saved; execution untested.**

| Control | Observed definition |
|---|---|
| List | Name, Messages, Active, Completed; refresh and create |
| Name | Maximum 50 characters |
| Messages | Add, reorder and remove; each references a subflow |
| Delay | Default After 5 minutes; numeric duration and unit selector |
| Timing rule | At least the specified duration after subscription |
| Delivery time | Any time or Send between; latter reveals 08:00–22:00 defaults |
| Weekdays | Monday–Sunday selections |
| Commit | Save / Cancel |

Acceptance: store an ordered series of delay, weekday/window and subflow references; preserve order after reopen; show each enrollment's progress and completion. Test subscription, unsubscribe, duplicate enrollment, flow removal and durable execution after restart. Verify timezone, daylight-saving, later-step delay anchors, window boundaries, missed windows and unit enumeration against reference before claiming exact parity.

## SPEC-KEY — Keywords and resume automation

Source: `#/automation/keyword`. **Inspected; unsaved.** Name max100; keyword list; optional reply variations; subflow selection; Active initially on; Is Hotword initially off.

Observed match choices: message is; contains; contains word; starts with; Keyword to resume automation (when bot is paused, if message is); image; sticker; audio; video; file; location; Facebook thumb up.

Acceptance: persist operator separately from operand; expose channel-specific event types; support variation and hotword configuration. Test exact/partial/word-prefix matches, mixed case, whitespace, Unicode, multiple matching rules, paused-bot precedence and attachment-only messages. Case rules, matching precedence, hotword semantics and variation selection remain unknown.

## SPEC-FIELD — User fields

Source: `#/content/user`. **Inspected; unsaved.** Required name max50, type default Text, types Text/Number/Boolean/Date/Datetime/JSON/Long JSON; description max300; folder selector; sample values max10000, one per line, described as used in bot-user filters.

Acceptance: typed value editors; persistent metadata; filter suggestions sourced from sample values. Define conversion, null/empty distinctions, date timezone, malformed JSON handling and field-in-use deletion. Reference JSON versus Long JSON storage limits and conversion behavior remain unverified.

## SPEC-WAF — WhatsApp Flow creation

Source: `#/content/wa_flow`. **Creation form inspected; designer and Meta lifecycle unverified.** Required name max100; required category multi-selection: SIGN_UP, SIGN_IN, APPOINTMENT_BOOKING, LEAD_GENERATION, CONTACT_US, CUSTOMER_SUPPORT, SURVEY, OTHER.

Acceptance: preserve multiple categories; require name/category; subsequently define screen components, navigation, data exchange, validation, draft/publish/deprecate and provider errors from actual designer access. A category selector does not establish those later contracts.

## SPEC-BOARD — Boards

Source: `#/boards`. **Basic create/save observed.** Board name max50; add/reorder/remove columns, column names max50. Saved view exposes board management, All filter, search by name, assignment scope, another All dropdown whose meaning is unverified, Small checkbox, refresh, per-column count/overflow and New Column.

Acceptance: persist board and ordered columns, count cards, search and filter. Test card movement, bot-user linkage, ordering, permissions, concurrent moves and automation triggers. Those behaviors were not exercised because no test contact exists.

## SPEC-CONTACT — New contact

Source: `#/botusers`. **Creation form inspected; no submission.** Channel selector offered WhatsApp and Web. First/last name max50 each; country-code selector initially +1 US; phone; email max200; gender initially Other; unchecked consent attestation for SMS/email/other messaging. Create initially disabled. Same visible identity fields after selecting Web.

Acceptance: explicit channel identity and consent provenance, phone normalization, email validation, duplicates and conflict handling. Test requiredness by channel and gender choices. Contact import, mapping and merge rules remain uninspected; campaign CSV is a separate feature.

## SPEC-RATE — Bot rate limits

Source: Settings → Rate Limit Settings. **Conditional form inspected only.** Disabled initially selected. Enable reveals maximum attempts default10 and time range default60 minutes. Restored Disabled without saving.

Acceptance: persist enable flag, attempts and interval; provide a deterministic limit outcome and audit trail. Scope (contact/bot/workspace), window algorithm, action on exceed, minimum/maximum values and reset behavior remain unresolved. Do not confuse this with campaign delivery throughput.

## SPEC-KB — Knowledge assets

Source: `#/ai_hub/ai_knowledgebase`. **Forms inspected; ingestion/retrieval untested.** Notice describes workspace sharing. Three tabs: Knowledge Base, Vector Stores, Files.

| Entity | Observed fields |
|---|---|
| Knowledge Base | Required name max50; description max2000; vector-store multi-selector |
| Vector Store | Required name max250; expires-after-days numeric default0; files selector; Upload file |
| Vector-store list | Name, Status, Size, Last active at, Expires at |

Acceptance: keep knowledge bases, stores and files as distinct related records; show ingestion status/errors and expiration. Test upload authorization, supported types/limits, asynchronous processing, failed/retried ingestion, removal, retrieval references and workspace permissions. Meaning of zero expiration, expiration anchor, provider costs and file lifecycle are unverified. No inference that zero means never expires.

## SPEC-CAM — Campaigns

Source: `#/broadcast`. **Type chooser and phone-template form inspected; send behavior untested.** List: Name, Message to send, Status, Receivers, Sent, Failed, Scheduled Time, Created at; search, refresh, create.

Observed campaign types:

1. Default — flow within allowed messaging window.
2. WhatsApp Template Workflow — first flow message must be a template.
3. Facebook Notification — message tag.
4. Facebook Utility Message Template.
5. Facebook Marketing Message — beta, opt-in.
6. Email — opt-in.
7. SMS — opt-in.
8. WhatsApp Template Message — phone-number list.

### Phone-template form

| Control | Observed definition |
|---|---|
| Name | Default New broadcast; max50 |
| Audience source | Phone Numbers or Import from CSV |
| Phone input | E164 examples; comma separated; max50000 characters |
| Unknown contacts | Text says create bot user if not exist; exact toggle/state not established |
| CSV | Import button and row count initially0; mapping dialog uninspected |
| Content | WhatsApp Message Template with Edit action |
| Throughput | Max bot users per minute; min1/max200; numeric input default60 |
| Scheduling | When to send, selector initially Now; other choices uninspected |
| Commit | Save / Cancel |

Acceptance: draft/review/send separation in our implementation; resolve recipient identities, deduplicate, validate consent and channel eligibility, snapshot content and audience, enforce throughput, track per-recipient outcomes. These are proposed behavior requirements, not a claim about UChat's Save semantics. Test invalid E164, CSV columns and variables, duplicate numbers, partial import, provider throttling, scheduling/timezone, cancellations, retries and reconciliation. Do not derive rate from AX slider midpoint: the visible numeric input is60.

## SPEC-MULTIPRODUCT — WhatsApp multiple-products message

Source: draft Send Message #1 → WhatsApp Multiple Products → Edit. **Form inspected; blank existing block; no send.**

| Field | Observed rule |
|---|---|
| Catalog Id | Required; Facebook catalog linked to WABA; Commerce Manager link |
| Header | Required, max60 |
| Body | Required, max1024 |
| Footer | Optional, max60 |
| Number of sections | Selector default1; full choice range not inspected |
| Section title | max24 |
| Product Retailer Ids | Required; comma-separated; help says up to30 products across all sections |
| Dynamic input | Field insertion controls visible |
| Commit | Save / Cancel |

Acceptance: structured catalog/sections/products model, required checks, total30 product ceiling, dynamic-variable resolution, provider rejection reporting and incoming order correlation. Test catalog mismatch, missing retailer IDs, duplicate IDs, empty sections, dynamic overlength text and user cart/order events. Visible UI rules must be rechecked against the provider before implementation release.

## SPEC-QUESTION — Question nodes

Source: draft editor new-step palette → Question. **Draft node and Text question added; no execution.** Node has name, note, ordered question items, continuation and Button Click Handler (default Default), plus Telegram Parse Mode.

Question types: Text, Number, Email, URL, Phone, Date, DateTime, Choice, Location, Rich Media, Silent Input. Most beyond Text/Number bear PRO labels. Entitlement enforcement was not tested.

Text question controls:

- Prompt with variable insertion.
- Select button text, initially Select, max20.
- Save Response to field selector.
- Add Answer, Dynamic Answer, Skip Button.
- No Match: retry message and occurrence selector initially second time, then next-step selector.
- No Input: next-step selector; user input expiration default1 hours.
- Pagination expandable panel (contents not yet inspected).
- Advanced Settings: Input complete timeout initially None; header/footer max60 each; Quick Answer Style and Quick Answer Button Style initially Default.

Acceptance: store response before continuation; distinguish invalid answer, no input, skip and button interaction; isolate pending question per conversation; cancel stale timeout after a valid answer; retain state across restarts. Test exact timeout boundary, duplicate inbound events, two simultaneous replies, pause/resume, answer-list matching and field type mismatch. Reference match rules, timeout choices, pagination, button-handler choices, number/date validation and media limits remain open.

## Common implementation contracts (proposed)

Each form needs explicit loading, empty, populated, validation, permission-denied, provider-failed and retry states. Keep draft data separate from active execution. Validate client and server; scope all records to tenant/workspace/bot; audit mutations with actor, time, before/after and correlation IDs. Preserve provider identifiers without exposing credentials. Version node configuration so saved flows survive new action schemas.

For every test, record feature ID, role/plan/channel, configuration, trigger/input, expected output/state, actual result and evidence. Inspection and implementation completion are separate flags. No feature in this supplement is marked end-to-end verified.

## SPEC-TEMPLATE — Message template block, follow-up

Observed: blank template block exposes an If send WhatsApp failed port on canvas. Edit opens a dialog titled Edit Button with Select WhatsApp Template, Save and Cancel. Dropdown returned No data in the research bot. No template selected or sent; dynamic parameter schema remains unobserved. Implementation must distinguish empty local template catalog, synchronization failure, provider approval state and unsupported connection. These are proposed states requiring further reference verification.

## SPEC-WA-ADVANCED — Catalogs, Flows, calling and coexistence

Inspected 30 September2026. User excludes live calls and purchases. These exclusions do not remove the features from specification scope; their runtime tests remain unverified.

### Catalog message — live form

Required Product Retailer Id; helper identifies it as Commerce Manager's Content ID. Required Body max1024; optional Footer max60; dynamic field insertion; Save/Cancel. Unlike the previously inspected multiple-products form, this dialog did not expose Catalog Id or a section list. Do not collapse these into one identical schema. Proposed tests: missing/invalid retailer ID, unavailable product, catalog access failure, variable expansion and provider rejection. No catalog message sent or purchase made.

### WhatsApp Flow launch — live form

Header optional max60; Body required max1024; Footer optional max60; Button Text required max20; WhatsApp Flow selector required. Node exposes **If flow completed** destination as well as normal continuation. Exact completion payload, correlation token, expiry and duplicate-submission behavior remain unverified. Distinguish Meta WhatsApp Flow form from UChat automation subflow.

UChat's [Flows guide](https://uchat.au/blog/whatsapp-flows-guide) documents native form inputs, multiple screens, structured results and optional endpoint data exchange. Proposed clone contract: versioned screen definitions, field validation, launch-to-completion correlation, field mapping and a completion event. Detailed designer compatibility still requires inspection; these are not claimed as live-tested.

### Call settings — live form

Number-specific settings: Allow voice calls; Allow callbacks (description says request callback permission after user calls); Set up available call hours. All initially off. Enabling hours in the unsaved form reveals timezone and Monday–Sunday settings, each initially Closed. Day choices: Open all day, Closed, Open hours, Two open hours. Two open hours exposes two start/end pairs. Canceled without Save; no settings persisted or calls made.

Proposed records: CallSettings(number, enabled, callbacks, timezone, weeklyIntervals), CallPermission(contact, status, expiry), CallSession(providerId, direction, state, timestamps, error). Validate interval ordering/overlap and timezone/DST; define authorization and separate unavailable/SIP/provider errors. UI bounds and provider enforcement remain untested. Prior health reported SIP configuration limitations; the switches alone do not establish working calling.

### Coexistence — documented plus prior live connection evidence

Live health previously identified CLOUD_API Coexistence CONNECTED. [UChat's coexistence guide](https://uchat.atlassian.net/wiki/spaces/UKB/pages/1322188806/Connect+Your+Existing+WhatsApp+Business+app+Coexistence+Mode) describes using the Business App and Cloud API on the same number, app-based verification/QR onboarding, an option to share chat history, and keeping the Business App active. It describes a single-number restriction for coexistence-created WABAs; validate that constraint against current Meta requirements before implementing it.

Proposed requirements: connection mode and lifecycle, mobile-app message source/echo handling, deduplication, history-import consent/status, synchronization cursor, reconnect recovery, and agent/bot ownership. No app/API synchronization or history import was tested. Existing inbound/outbound API tests do not prove these behaviors.

### Mutation log

Added blank Catalog Message and WhatsApp Flow blocks only to the existing unpublished Main Flow message node. Canceled their configuration dialogs. No Main Flow publication, call, catalog purchase, message send or connection change in this pass. Separate guarded keyword workflow remains published.

## SPEC-TEMPLATE-SYNC — Catalog synchronization and approved template

30 September2026: Contents → Message Templates initially empty. Clicking Sync populated one row: language en, name broadcast, category MARKETING, status APPROVED; Live chat status switch checked; editable custom title. This resolves the empty local catalog after synchronization; exact original cause and background sync policy are unknown. No template message sent.

Edit form: name/category/language disabled for this existing template. Interactive components: Buttons, Call permission request, Contact info request, Order details. Header choices: None, Text, Image, Video, Document, Location. Body displays a1000-character counter; Footer max60. Buttons: Phone, URL, Reply Button, Flow Button, Call Button. Actions: Delete, Cancel, Send to review. Do not equate the observed1000-character UI counter with a universal Meta limit. No edit submitted.

Settings dialog: fixed template selection en-broadcast; Auto update initially on, described as updating default values when reinstalling a subflow template. Body shows named placeholder {{name}}. The edit preview showed undefined for the unset variable. Mapping/default-value fields were not exposed in this settings view; per-send mapping remains to inspect. Canceled settings unchanged.

Proposed schema: provider template ID, WABA scope, name, language, category, provider status, component schema, local title, inbox visibility, sync timestamp and schema revision. Preserve named versus positional variable definitions. Sending must resolve every required variable, verify current approval/capability and report errors. Acceptance: empty→sync→populated, denied sync, category/status changes, pagination, duplicate names across languages/WABAs, missing defaults and media-header requirements. Only successful empty→populated synchronization was tested.

## SPEC-COEX-SYNC — Proposed synchronization contract

[360dialog's provider documentation](https://docs.360dialog.com/partner/onboarding/whatsapp-coexistence/coexistence-webhooks) distinguishes history events, contact updates through smb_app_state_sync, and new Business App outbound messages through smb_message_echoes. Its history example includes phase, chunk ordering and progress; declined sharing has an error path. These are provider-documented concepts, not live UChat payload observations. Direct Meta documentation returned429 during this pass; confirm direct-Cloud envelopes/subscriptions before implementation.

Proposed implementation acceptance cases:

- Normalize customer inbound, API outbound, Business App outbound and historical messages as distinct sources.
- Deduplicate by scoped provider message identity; preserve original timestamp and import time.
- Import history without sending automated replies or treating old messages as new customer activity.
- Display app-originated replies once in the shared conversation; never echo them back as new outbound sends.
- Apply explicit bot-pause/human-ownership policy when staff reply from the app; prevent response races.
- Track consent, sync state, chunks, progress, errors and resumable cursor; do not label a quiet stream complete without a defined completion contract.
- Merge contacts by channel identity, with a documented conflict policy for agent-edited names.
- Test duplicate/out-of-order events, interrupted imports, revoked history sharing and disconnection.

No reconnect, history-sharing change, history import or mobile-app echo test performed. A controlled message from the business handset is still needed to verify actual UChat echo behavior.
