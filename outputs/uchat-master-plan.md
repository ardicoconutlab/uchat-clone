# UChat recreation master plan

**Priority:** WhatsApp Business Platform (WABA), followed by Omni-channel expansion  
**Research date:** 29 September 2026  
**Revision:** 7 — implementation foundation and API contracts  
**Reference:** authenticated UChat workspace, authorized test bot, and Uchat Tools Flow.pdf  
**Status:** implementation blueprint based on a broad UI inspection; not a claim of exhaustive or end-to-end feature verification.

## 1. Product direction

Build a multi-tenant platform where businesses connect WhatsApp, automate conversations with a visual editor, manage contacts, hand conversations to human agents, send approved campaigns, and measure results. Extend the same conversation and automation core to other channels.

Start with a working WhatsApp product. The full reference also includes AI agents, ecommerce, internal collaboration, reusable templates, a mini-app ecosystem, and agency capabilities. Those remain in the target scope but should follow the core messaging system.

Recreate the useful behavior and information architecture using your own implementation, branding, copy, and assets. The architecture below is a proposed design, not a description of UChat's private backend.

### First release outcome

A business can connect an eligible WABA, select a phone number, receive a customer message, run a published flow, transfer the conversation to an agent, reply from a shared inbox, and see delivery events. It can also manage templates and schedule a small, consent-aware campaign.

## 2. What was inspected and changed

The signed-in workspace initially had zero bots and no connected WhatsApp assets. I inspected workspace navigation, integration categories, analytics, ecommerce and its product editor, content libraries, template store, settings, and the tickets access gate.

With authorization, I created **Coco Research Test**, an Omni-channel bot. Its editor is [available here](https://www.uchat.com.au/flow/f306687#/edit). The draft contains the Start node and Send Message #1. Later inspection found a blank WhatsApp Multiple Products block in that message; revision 3 also adds an unconnected Question #1 with a blank Text question for inspection. This allowed inspection of bot-level menus and message types. The Omni-channel table shows Web Chat associated with the bot.

**Current state:** the user subsequently connected the Wira Mart WABA. Its number appears Active and its health report identifies Cloud API Coexistence as connected, alongside payment and verification restrictions (section 13). The number remains unlinked to the research bot. I canceled linking when UChat warned that it would permanently remove channel bot users. No flow was published, message sent, template submitted, credential changed, or existing contact deleted during research.

All 28 pages of the supplied screenshot PDF were visually reviewed. Sections 14–18 add the page crosswalk, detailed feature requirements, sample routing workflow, and parity verification criteria. Screenshots are evidence of visible functionality, not instructions to execute the depicted actions.

### Evidence labels

- **Inspected:** opened the screen or editor and read its visible controls; this does not mean its backend behavior was tested.
- **Listed:** a feature appears in a menu, but its detailed workflow was not inspected.
- **Screenshot:** visible in the supplied PDF; the depicted configuration or result was not reproduced live.
- **Documented:** described in public vendor documentation, without live validation.
- **Proposed:** a requirement or design choice for our implementation.
- **Blocked:** unavailable because the account lacks data, a connection, or an entitlement.

## 3. Feature inventory

| Area | Reference features and evidence | Build priority |
|---|---|---|
| Workspace dashboard | **Inspected:** plan and trial status, member/bot/contact usage, channel totals, error summary, changelog, tutorial/help links | P0 |
| Workspace administration | **Inspected:** logo, name, timezone, editor theme, inbox visibility controls, collaborators, conversation mode, analytics week start. **Listed:** members, agent groups, business hours, locations, audit logs | P0/P1 |
| Omni-channel | **Inspected:** create blank bot, convert existing bot entry, link channels, open bot, Web Chat association | P0 |
| Channel catalog | **Listed:** Facebook, Instagram, Telegram, WhatsApp Cloud, WhatsApp, TikTok, Slack, WeChat, SMS, RCS, Voice, Line, Viber, VK, Intercom, JivoChat, ChatWoot | WABA P0; others later |
| Visual editor | **Inspected:** draft state, Publish, Preview, canvas, Start node, notes, next-step selection, minimap, zoom controls, message editor | P0 |
| Step types | **Inspected picker:** Send Message, Question, Action, Condition, Split, Send Email, Goto. **Documented:** function output and reusable function flows | P0/P1 |
| Flow organization | **Inspected:** subflow list, folders, labels, type filter, node count, AI generation entry | P0/P2 |
| Message composition | **Inspected:** text, cards, media entry, loop/For Each, dynamic content, debug text, ecommerce entry, channel-specific options | P0/P1 |
| WhatsApp payloads | **Inspected menu:** template, list, contact, catalog, single/multiple products, order details/status, call permission, contact-info request, WhatsApp Flow | P0/P1/P2 |
| Live inbox | **Inspected empty state:** unreplied switch, Open status, All assignment scope, starred, search, sort/filter. **Blocked:** populated thread actions and actual agent handoff | P0 |
| Contacts | **Inspected:** creation/import entries, search, filters, configurable-column control, name/email/phone/last interaction/subscription columns | P0 |
| CRM boards | **Inspected:** board creation entry and description for organizing bot users. Detailed pipeline editor not inspected | P2 |
| Automation | **Inspected:** default reply rule and keyword table. **Listed:** sequences, triggers, intents/functions, comment keywords, Facebook lead forms | P0/P1/P2 |
| Content definitions | **Inspected:** user fields list and folder controls. **Listed:** bot fields, tags, labels, nodes, custom events, closing notes, menus, personas, feedback, notification topics, email templates | P0/P1 |
| WhatsApp templates | **Inspected:** language/name/title/category/status table, sync, editor, review submission entry, header/body/footer, buttons and interactive component choices | P0 |
| WhatsApp Flows | **Inspected:** search, sync/create entries, name/categories/screens/status table. Detailed builder and live submission not tested | P1 |
| Campaigns | **Inspected:** broadcast list and type chooser, counts, failures, scheduled time; WhatsApp template workflow and direct template-to-phone-list modes | P1 |
| AI Hub | **Inspected:** agent list with model and trigger workflow; usage log fields. **Listed:** functions, prompts, tasks, MCP servers, knowledge base, call settings | P2 |
| Operational tools | **Inspected:** error-log filters and export; two-week retention notice. **Listed:** testers, admins, widgets, languages, shortcuts, scheduled messages, smart delays, jobs, custom reports, inbound webhooks, Facebook ads tools | P0/P1/P2 |
| Bot settings | **Inspected:** automation pause behavior, start-flow selection. **Listed:** live chat, SSO, rate limits, Facebook/TikTok/Viber settings | P0/P1 |
| WebChat | **Inspected:** content/settings/channels/appearance/display/help sections, bubble/header/footer, welcome/out-of-office/greeting messages, pre-chat form, start flow, apply changes, preview | P1 |
| Analytics | **Inspected:** date range/timezone, total/new/active contacts, sent/received messages, sent emails/open rate, channel and demographic breakdowns, SVG/PNG/CSV export entries. **Listed:** agent performance, SMS delivery, AI usage, Facebook insights | P1 |
| Ecommerce | **Inspected:** product list and editor, price/compare-at price, tax, SKU/barcode, stock tracking, variants, availability, notes, type/vendor/tags/collections. **Listed:** carts, orders, discounts, settings | P2 |
| Template marketplace | **Inspected:** search/filter, install/show-more controls, installed/purchased tabs; 192 results displayed during inspection | P3 |
| Content creator tools | **Inspected:** mini-app builder entry. **Listed:** own mini-apps, bot/email templates, media library, sales and install reporting | P3 |
| Tickets | **Blocked:** add-on required; page describes lists for tracking bot users and teammate tasks | P3, validate first |
| Internal group chat | **Inspected:** enable entry; description says it creates an agent group-chat bot | P3 |
| Agency/white label | **Documented only:** partner plans and configurable product packaging; not available for inspection here | P3, separate specification |

### Integration catalog observed

These are catalog entries, not verified connections. Build an adapter interface first; each provider still requires its own credentials, API mapping, tests, and maintenance.

| Category | Entries visible in the reference |
|---|---|
| Messaging/voice | Twilio, SignalWire, Telnyx, Message Media, Vudu Mobile, Dialpad, ASMSC, phone numbers |
| AI | Dialogflow, OpenAI, Google Gemini, Claude AI, X AI, DeepSeek, Groq, Coze |
| Commerce/payments | Shopify, WooCommerce, Facebook Business, Stripe, PayPal |
| Scheduling | Calendly, Cal.com |
| Data/media | Google Sheet, MongoDB, MySQL, PostgreSQL, Cloudinary, S3 |
| Email | SMTP profiles, Gmail, SendGrid, MailChimp |
| Live support | GoHighLevel, Intercom, FreshChat, Front, JivoChat, ChatWoot, Drift, Slack Agent, Webhook |
| Automation platforms | Zapier, Make/Integromat, Pabbly, Integrately |
| Maps/CRM | Google Map, Mapbox, GoHighLevel V1/V2, HubSpot |
| Other | ElevenLabs, Facebook Ads, Meta Conversions API, Google Tag Manager, Google My Business, Slack Webhook, VideoSDK, Au Property Report |

## 4. Proposed application map

### Global shell

Workspace switcher → Dashboard / Inbox → profile and help. Persistent workspace navigation, breadcrumbs, search/filter patterns, empty states, dialogs, permissions, and plan gates.

### Workspace pages

1. Overview and usage.
2. Channels and connections: WABA first; connection health and linked bots.
3. Bots: create, duplicate, archive, ownership, channel assignment.
4. Inbox: queues, threads, contact detail, assignment, notes, automation controls.
5. Contacts: profile, fields, tags, segments, import/export.
6. Analytics and operational reports.
7. Integrations and connection health.
8. Commerce: products, collections, discounts, carts, orders.
9. Reusable content and marketplace.
10. Workspace settings, members, groups, business hours, audit log and billing.

### Bot pages

Editor → Subflows → Inbox → Contacts → Automation → Templates/Contents → Broadcasts → AI Hub → Boards → Tools → Settings → WebChat Widget.

The reference uses a compact top bar, collapsible left navigation, nested settings menus, dense tables, blue primary actions, neutral panels, and a dark flow canvas. Capture desktop and mobile states during implementation before fixing visual design tokens; the current inspection viewport was narrow and is insufficient for pixel-level parity.

## 5. WhatsApp-first specification

### A. Connection lifecycle

**Proposed states:** disconnected → authorization started → assets selected → credentials stored → webhooks subscribed → test verified → healthy. Also support expired authorization, insufficient permission, restricted number, degraded delivery, reconnect, and disconnect.

Store the business account ID and phone-number ID independently. Associate each number with a workspace and bot explicitly. Keep access tokens encrypted on the server. Display connection health without displaying secrets.

Provide a guided onboarding path using the current Meta-supported integration method. Validate app review, provider eligibility, permissions, phone registration, and any existing-number/coexistence requirements against current Meta documentation before coding that path. Do not assume an existing number must be deleted or migrated: the older UChat help article contains legacy instructions.

**Acceptance:** one eligible test number can connect, incoming events reach the correct workspace, reconnect is idempotent, and a disconnected number cannot continue sending.

### B. Messaging pipeline

Receive and authenticate webhooks; acknowledge promptly; queue processing. Deduplicate provider events and serialize conversation changes where necessary. Normalize inbound text, media, interactive replies, and supported status events into internal records.

Maintain an outbound outbox with idempotency keys, provider message IDs, timestamps, and error details. Track queued, accepted, sent, delivered, read, and failed states without incorrectly reversing a later status when an older event arrives. Separate retryable errors from permanent failures.

Use a configurable policy layer for messaging windows, template eligibility, opt-outs, channel capabilities, rate limits, and cost-related metadata. Verify current provider rules before release rather than hard-coding assumptions from an old help article.

**Acceptance:** duplicate webhooks create one message; delayed delivery receipts do not corrupt status; rate-limited sends retry safely; an opted-out contact is excluded from a campaign.

### C. Templates

List and synchronize provider templates. Support name, language, category, header, body variables, footer, supported buttons, examples, status and rejection details. Separate internal display title from provider name. Track submitted versions so a campaign cannot silently change when a template is edited.

The reference editor exposes phone, URL, reply, flow and call buttons, plus several interactive component types. Implement the subset supported by the chosen current API and account; do not promise every visible option is available to every WABA.

**Acceptance:** a valid template can be submitted and its status synchronized; invalid variables fail before scheduling; inactive or unavailable templates cannot be selected for sending.

### D. Shared inbox and handoff

Three-pane desktop layout: queues, conversation list, selected conversation/contact detail. Support unread/unreplied, open/closed states, agent/group assignment, search, tags, notes, saved replies, attachment uploads, template selection, and automation pause/resume.

Design a single ownership rule for bot versus human response so both do not answer the same event. Record who sent each message, assignment changes, and the reason automation resumed. Proposed permission levels: owner, admin, supervisor, agent, analyst; validate required granularity with actual use cases.

**Acceptance:** two agents cannot unknowingly claim exclusive ownership; a human handoff pauses the expected automation; an agent sees only permitted conversations; typing and thread updates arrive without a full refresh.

### E. Broadcasts

Draft → audience selection → content/template → validation → test preview → schedule → send → report. Freeze an audience snapshot for reporting while rechecking opt-out and eligibility at send time. Support canceling unsent recipients, rate limiting, per-recipient errors, timezone-aware scheduling and retry history.

Start with template-based WhatsApp campaigns. Add flow-based campaigns after the flow runtime supports durable background execution.

### F. Native WhatsApp Flows and commerce

Later add creation/import, screen and field definitions, validation, synchronization, lifecycle status, versioned response mappings and secure data-exchange endpoints where applicable. Keep WhatsApp native forms distinct from the chatbot's conversation graph.

Add catalog linking and product messages after catalog IDs, product retailer IDs, stock rules and order state handling are defined. Match products using stable identifiers, not product names.

## 6. Automation editor and execution engine

### Editor requirements

- Pan, zoom, minimap, node search, multi-select, copy/paste, keyboard actions, groups and notes.
- Node inspector with typed fields and branch labels.
- Start, message, question, action, condition, random split, delay, goto, subflow call and return.
- Variable picker, user fields, bot fields, tags, channel capability hints and validation errors.
- Draft autosave, version history, preview, publish and rollback.
- Subflow folders/labels and reusable functions with explicit inputs/outputs.

Draft/published separation is documented by UChat and the live editor displayed a draft state. Our implementation should pin each running execution to an immutable published version so publishing cannot alter a conversation halfway through a step. [Reference overview](https://docs.uchat.com.au/flow-builder/).

### Runtime requirements

Persist execution state: version, current node, variables, waiting input, scheduled wake time, retries and call stack. Use durable timers for delays and sequences. Recover after worker restarts. Detect runaway loops and cap execution effort. Make external actions idempotent where possible.

A background workflow can run data updates and external requests without blocking the conversation. A function flow can return to its caller with a defined output. These are documented concepts; the implementation must define transaction boundaries and failure semantics explicitly. [Workflow](https://docs.uchat.com.au/flow-builder/sub-flows/workflow.html), [function flow](https://docs.uchat.com.au/flow-builder/sub-flows/function-flow.html).

### First reference scenario

Customer says hello → welcome/options → collect name and request → save fields and tag → branch by request → answer or hand off → agent replies → close conversation → optional feedback. Add an out-of-hours branch and an API action only after the simple path passes end-to-end tests.

## 7. Proposed technical architecture

Use a modular backend with a separate asynchronous worker deployment. Avoid splitting every feature into a separate service before load and ownership justify it.

```text
Admin web app ── API/auth/RBAC ── PostgreSQL
      │                 │            │
      │                 ├── Flow version registry
      │                 ├── Contacts / inbox / campaigns
      │                 └── Provider credential vault
      │
      └── Realtime gateway ◄── Domain events

Meta/channel webhooks → verified ingress → durable queue
                                          │
                          contact + message normalization
                                          │
                         flow runtime / handoff decision
                                          │
                             outbound outbox + workers
                                          │
                             channel/provider adapters

Object storage: media and exports
Observability: logs, metrics, traces, dead-letter/replay tools
AI layer later: model adapters, retrieval, tool execution, usage accounting
```

Recommended stack: Next.js/React/TypeScript frontend with React Flow; Next.js Route Handlers with shared TypeScript services; PostgreSQL; Temporal for durable automation; Redis for cache/presence/rate limits; S3-compatible object storage; WebSockets for inbox updates. Section 24 defines responsibilities and deployment choices. Pin supported versions during implementation. This is our proposed implementation, not UChat’s internal stack.

Tenant context must come from verified membership and server-side authorization. Enforce it in database access, object storage, realtime subscriptions, exports and queued work—not only in UI filters.

### Core entities

| Domain | Proposed records |
|---|---|
| Tenancy | Workspace, User, Membership, Role, AgentGroup, GroupMembership, BusinessHours, AuditEvent |
| Channels | ChannelConnection, WhatsAppBusinessAccount, PhoneNumber, CredentialReference, WebhookEvent, ConnectionHealth |
| Automation | Bot, ChannelBinding, Subflow, FlowDraft, FlowVersion, NodeDefinition, Execution, ExecutionStep, ScheduledJob |
| CRM/inbox | Contact, ChannelIdentity, ContactFieldDefinition, FieldValue, Tag, ContactTag, Segment, Conversation, Assignment, Message, MessageStatus, Note |
| Campaigns | MessageTemplate, TemplateVersion, Campaign, AudienceSnapshot, CampaignRecipient, OutboundMessage, ConsentEvent |
| Content | MediaAsset, SavedReply, EmailTemplate, Menu, CustomEventDefinition, Feedback |
| AI | AgentDefinition, PromptVersion, ToolDefinition, KnowledgeSource, DocumentChunk, RetrievalRun, AIUsageEvent |
| Commerce | Product, Variant, Inventory, Collection, Discount, Cart, Order, OrderLine, PaymentReference |
| Commercial | Plan, Subscription, Entitlement, UsageCounter, InvoiceReference |

Give provider identifiers a namespace. One contact may have several channel identities; do not merge people solely because their display names match. Store immutable events where auditability matters and use derived tables for reports.

### Proposed API groups

Workspace/membership; connection/onboarding; webhook ingestion; bots/flows/versions; contacts/segments; conversations/messages/assignments; templates; campaigns; media; jobs/logs; analytics; integrations; AI; commerce; billing. Public APIs need scoped credentials, pagination, quotas, webhook signing and versioning. Do not reuse provider tokens as customer API keys.

## 8. Roadmap and release gates

These are planning ranges for an experienced team, not a quote or a guaranteed schedule. External approvals can extend elapsed time. A plausible initial team is a product/design lead, two backend engineers, two frontend engineers, and QA/operations support; a smaller team needs a longer schedule.

| Phase | Indicative duration | Deliverable and exit gate |
|---|---|---|
| 0. Validate and design | 1–2 weeks | Confirm own-account versus multi-tenant SaaS scope, WABA onboarding path, deployment constraints, design system and unresolved screens; complete a provider test spike |
| 1. Platform and WABA | 3–5 weeks | Tenancy, roles, connections, webhook ingestion, contacts, message store and basic inbox; one real test conversation with delivery events |
| 2. Automation core | 4–6 weeks | Editor, published versions, runtime, questions/conditions/actions, timers and handoff; restart-safe end-to-end scenario |
| 3. Commercial pilot | 3–5 weeks | Template lifecycle, campaigns, agent groups, reporting, quotas, audit and operational tools; controlled pilot with recovery tests |
| 4. Omni-channel and AI | 4–8 weeks | WebChat plus selected additional channels, knowledge-backed AI and approved tools; capability and tenant isolation tests |
| 5. Broad parity | 8–16+ weeks | Commerce, boards/tickets, advanced reports, remaining integrations, marketplace and agency features; module-specific parity checks |

A useful WABA pilot is substantially smaller than full UChat parity. Use roughly **11–18 weeks for the first three implementation phases**, following discovery, as a starting staffing assumption. Full breadth is a multi-quarter program and should be re-estimated after the pilot. Integration count, enterprise permissions, voice and marketplace operations can dominate the remaining effort.

### Initial backlog in dependency order

1. Define workspace roles and tenant isolation tests.
2. Build account/workspace shell and onboarding checklist.
3. Validate WABA connection using owned test assets.
4. Implement signed webhook intake, deduplication and replay tooling.
5. Implement messages, contacts and provider identity mapping.
6. Build basic inbox and outbound text/media with status updates.
7. Add assignment, internal notes and handoff state.
8. Define flow JSON schema and immutable versions.
9. Build editor and a small set of executable node types.
10. Add question capture, branching, variables and API actions.
11. Add durable delays, retries and execution inspection.
12. Add template sync, validation and lifecycle UI.
13. Add segmented, scheduled campaigns and recipient reports.
14. Add analytics, quotas, billing boundaries and support tools.
15. Run a controlled WABA pilot, then expand channel adapters.

## 9. Validation and operating requirements

### Release tests that matter

- Cross-workspace access is rejected through direct API calls, exports, media URLs and realtime subscriptions.
- Duplicate and out-of-order provider events are safe.
- Sending retries do not create duplicate customer messages.
- Draft edits cannot change published executions.
- Worker restarts preserve waiting questions and scheduled steps.
- Human handoff prevents unwanted bot replies.
- Campaign cancellation stops recipients not yet sent; reports reconcile with outbound records.
- Template changes, revoked credentials and provider failures produce actionable UI states.
- Consent/opt-out changes are respected at send time.
- Imports handle invalid rows and duplicates with a useful report.
- Keyboard and small-screen inbox use remain practical.
- Restore from backup is tested, including credential references and media metadata.

### Proposed operational targets

Set targets during the pilot: webhook acknowledgment latency, event processing lag, inbox update latency, outbound backlog age, flow error rate and availability. Load-test at expected peak traffic and an agreed safety margin. Avoid inventing an arbitrary message-per-second promise before the selected provider limits and customer volumes are known.

Monitor per-workspace usage, template errors, token expiry, channel health, queue depth, failed jobs and model spend. Provide support staff with redacted execution traces and audited replay controls. Use retention settings instead of assuming the reference's two-week logs are right for every customer.

## 10. Gaps to resolve before claiming full parity

1. **WABA:** connected and linked to the research bot; payment restriction cleared. A controlled inbound message and agent reply reaching the recipient are verified. Template approval, catalog sync, calling and coexistence synchronization remain untested; business-verification/display-name warnings remain.
2. **Populated inbox:** live test conversation inspected; agent reply delivered and user-confirmed. Attachments, assignment races, collaborator controls and agent performance require further tests.
3. **Flow runtime:** guarded three-node workflow published and exact keyword saved; inbound keyword execution is awaiting verification. Full questions, actions, delays, functions, retries and handoff tests remain open.
4. **AI:** the agent creation form was inspected live; the PDF adds function/task/prompt/MCP/knowledge-base screens. Retrieval, model invocation, tool execution and call behavior remain untested.
5. **Commerce:** editor inspected, but order/payment/stock lifecycle not exercised.
6. **Tickets:** blocked by add-on; do not estimate detailed parity from the landing page alone.
7. **Roles/billing:** invited-user permissions, subscription changes and quota enforcement not exercised.
8. **Other channels:** visible catalog does not prove current provider availability or identical behavior.
9. **Marketplace/agency:** purchase/install/publishing, revenue handling and white-label administration need dedicated discovery.
10. **Visual parity:** the PDF adds desktop and populated reference screens. Responsive, loading, validation and permission-denied states still need a structured capture pass. Pages 21–22 contain cropped trigger menus; unseen portions must not be inferred from those images.

For every remaining feature, record: reference screen, user role, prerequisites, input fields, validation, state transitions, side effects, errors, API dependency and acceptance test. This becomes the detailed implementation specification beneath this master plan.

## 11. Sources and freshness

Additional source: user-supplied **Uchat Tools Flow.pdf**, 28 pages, all visually inspected. Page-level attribution is recorded in section 14. Names, private contact details and identifiers in the screenshots are not needed in the implementation specification.

Primary evidence is the authenticated [workspace](https://www.uchat.com.au/settings/accounts/337425) and [research bot](https://www.uchat.com.au/flow/f306687#/subflow), inspected on the date above. Feature inventories in this document principally come from those live screens.

Supporting vendor sources:

- [UChat flow editor overview](https://docs.uchat.com.au/flow-builder/) — foundational concepts; older article, so live menus take precedence for current feature inventory.
- [UChat channel and Omni-channel setup](https://docs.uchat.com.au/guide/setup-create.html) — documented channel linking and channel-dependent behavior.
- [UChat workflows](https://docs.uchat.com.au/flow-builder/sub-flows/workflow.html) and [function flows](https://docs.uchat.com.au/flow-builder/sub-flows/function-flow.html).
- [UChat WhatsApp Cloud guide](https://docs.uchat.com.au/guide/cloudapi.html) — useful historical context; contains legacy pricing/setup statements and is not used as the authority for current Meta requirements.
- [UChat partner pricing configuration](https://docs.uchat.com.au/partner/pricing.html) — evidence of configurable partner packaging, not live-tested functionality.
- [Meta's official WhatsApp API collection](https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api) — implementation reference to validate during the technical spike.
- [Meta unified onboarding resource](https://developers.meta.com/resources/videos/unified-onboarding-whatsapp/) — current onboarding evolution; verify the exact supported path for our app before implementation.

Direct retrieval of Meta's coexistence documentation returned a rate limit during research, and the detailed Postman page timed out. Current permissions, eligibility, pricing, throughput and onboarding rules therefore remain explicit implementation verification tasks.

## 12. Recommended next execution milestone

Build the foundation and a single WABA conversation loop: **connect → receive → automate → hand off → reply → track delivery**. Approve its behavior with a real test number before expanding into the long integration catalog. Maintain the complete feature inventory above as the parity backlog, with every unverified item remaining visible until tested.

## 13. Connected WABA findings — revision 2

### Connection and health are separate states

The connected Wira Mart account shows an **Active** number in the channel table. Its Health Check reports **CLOUD_API / Coexistence / CONNECTED**. This does not mean every messaging and calling capability is operational.

| Health dimension | Live result observed | Product requirement |
|---|---|---|
| Phone | LIMITED; notice says display name is not yet approved | Show number-specific restrictions and recommended action |
| WABA | BLOCKED; error 141006 reports a payment-method problem blocking business-initiated conversations | Preserve connection while separately disabling or explaining affected sending operations |
| Business | LIMITED; error 141010 reports incomplete business verification | Business verification checklist and status refresh |
| App | AVAILABLE, with a SIP configuration issue reported | Do not collapse app availability and calling readiness into one badge |
| Calling | SIP-related errors 138024 and 138025 | Separate voice configuration, provider support and permission readiness |
| Code verification | NOT_VERIFIED | Keep verification state explicit |
| Name status | AVAILABLE_WITHOUT_REVIEW, alongside the display-name warning above | Preserve raw provider fields; surface inconsistent-looking signals without inventing a resolution |
| Quality | GREEN | Number-level quality indicator |
| Throughput | STANDARD | Provider-reported throughput class, separately from application limits |
| Messaging limit | TIER_250 | Store/report provider tier; validate its current semantics before calculating an allowance |

These are observations of this account at inspection time, not permanent diagnoses or universal Meta rules. No billing or verification settings were changed.

### Management controls observed

- Business account name and ID, number, WABA name/ID and bot association.
- Add Number, Sync Numbers, Disconnect, Create Bot, Link Existing Bot and WhatsApp Calls entries.
- Overflow: Configure Call Settings, Health Check, Check MM Lite Status, business verification, payment method, phone numbers, templates, catalog, two-factor authentication, verify number, register/de-register number and remove.
- PDF page 9 additionally shows multiple numbers, Active/Paused badges, MM Lite ONBOARDED status, and open/unlink controls for a linked bot.

**Binding discovery:** Link Existing Bot on the channel screen returned no matching bot. The Omni-channel page could select the connected number, but then displayed a typed-confirmation dialog warning that linking permanently removes all bot users from that channel, with no undo. The dialog was canceled. This is a distinct binding/migration workflow, not a harmless alias change.

Our proposed implementation should offer a migration preflight with affected counts, identity mapping, export/recovery strategy where available, and explicit confirmation for destructive behavior. Test relinking with disposable data. Do not copy the reference's destructive behavior without first defining the desired data-preservation contract.

**Coexistence workstream:** specify identity reconciliation, provider/app message echoes, deduplication, history synchronization where supported, and ownership rules when agents use both the mobile app and our inbox. These are proposed engineering requirements prompted by the observed connection type; their exact provider contracts remain to be verified.

## 14. Complete PDF page crosswalk

All 28 pages of **Uchat Tools Flow.pdf** were rendered and visually reviewed. Some contain two or three screenshots. The table accounts for each page, including repeated features. Screenshots contain another workspace's example data; replicate the behavior with synthetic fixtures.

| PDF page | Visible coverage | Requirements in this master plan |
|---|---|---|
| 1 | Registration and login | Workspace/name/email/password/confirmation, terms acceptance, trial messaging, remember-me and password recovery; section 15A |
| 2 | Personal profile/menu and dashboard help | Avatar, language, time format, sound preference, presence/away, workspace time, API keys/referral/support links; 15A |
| 3 | Populated analytics and template marketplace | Trends, counters, filters and template cards; sections 3 and 15F |
| 4 | Integration catalog and installed mini-apps | Adds visible 360 Dialog and WABA provider entries; installed/purchased mini-app views and store entry; 15G |
| 5 | Mini-app store and product list | Searchable/versioned app cards, free indicator, selection; catalog table; 15G and section 3 |
| 6 | Full product editor and own mini-apps | Product fields/variants/availability and content-creator toolkit; section 3 |
| 7 | Populated audit logs and member invitations | User/action/subject filters, export, subject IDs/names, notes, flow, time and IP; role/presence list, seat-charge notice; 15A |
| 8 | Omni-channel setup and dashboard | Initial setup, plan quotas, channel counters, active-user summary; sections 3–4 |
| 9 | Connected WABA and subflow gallery | Multiple numbers, Active/Paused, MM Lite, bot link/unlink; folders, labels, search, graph thumbnails and node counts; 13 and 15B |
| 10 | Support-routing graph, start triggers and basic actions | Time branches, agent notifications, trigger and field/tag/subscription actions; 15B–C and 16 |
| 11 | Conversation actions and advanced action menu | Handoff/resume, assignment, notes, deletion, HTTP/JavaScript/delay/workflow/API actions; 15B |
| 12 | Integration actions and notifications | Provider actions, multichannel notifications and failure routing; 15B |
| 13 | Ecommerce and AI action menus | Cart/order/checkout operations; AI Agent/Task/Intent Recognition actions; 15B |
| 14 | Bot analytics and populated inbox | Previous-period comparison, report families, queue/thread/profile panels, template-only sending state and pause control; 15D/F |
| 15 | Configured AI agent list and usage logs | Agent quota, search/model/workflow, paginated execution/token/latency/status logs; 15E |
| 16 | AI functions and AI task editor | Workflow binding for escalation functions; task prompt/model/parameters/output fields; 15E and 16 |
| 17 | Prompt editor and MCP server editor | Prompt status/order/samples; unique server name, URL, authentication and tool discovery; 15E |
| 18 | Knowledge base, AI defaults and keyword overview | Workspace-shared knowledge, vector stores/files, model defaults, default reply; 15C/E |
| 19 | Keyword editor and sequence list/editor | Matching rule, hotword, reply variations, target subflow; sequence messages and active/completed counts; 15C |
| 20 | Trigger list | Active/name/event/workflow columns and search/status filtering; 15C |
| 21 | Enlarged upper trigger menu | User/subscription/consent/conversation/assignment/field/board/error events; lower content is cropped; 15C |
| 22 | Enlarged lower trigger menu | Order lifecycle, WhatsApp, Stripe, WooCommerce and Calendly events; final portion is cropped; live menu fills identified gaps in 15C |
| 23 | Legacy intents and content fields | Auto Intent Detect marked Deprecated, parameters/success/otherwise branches, AI generation entry; field definitions/folders/unused filter; 15C |
| 24 | WhatsApp Flow list and populated error log | Flow sync/create/status; user/subflow/node/time/error context and export; sections 5F and 15F |
| 25 | Broadcast list and type selection | Default, WhatsApp template workflow, email, SMS and WhatsApp phone-list template modes; section 5E |
| 26 | Detailed live-chat settings | Visibility scopes, transcription, system events, behavior, agent restrictions, hidden tools and mandatory closing notes; 15D |
| 27 | More live-chat settings | Custom URL/variables/target, external inbox integration, auto-pause duration, SMS/email profiles and desktop notifications; 15D |
| 28 | Rate-limit settings entry | Enable/disable control only; detailed rule schema not shown and remains unverified; 15D |

## 15. Expanded feature specification

### A. Identity, workspaces and administration

Add these explicit requirements to phases 1 and 3:

- Registration with workspace name, user name, email, password confirmation and versioned terms acceptance; login, persistent-session option, recovery, logout and session management.
- Personal profile with avatar, language, time format, notification sound, presence/away and workspace-local time.
- Workspace switch/list; owner and member lifecycle; invitations with email/role, pending/accepted/expired states, resend/revoke and membership removal. Invitation-state details are proposed behavior, not all visible in the PDF.
- Model roles visible in the evidence: Owner, Member, Live Chat Agent and Live Chat Supervisor. Other roles must be verified instead of assuming the proposed role set is exact.
- Member invitation can affect paid seat usage: the PDF displays a prorated-charge notice. Pricing preview and entitlement enforcement belong in the commercial design.
- Account-level Security, API Keys and Referral Program are visible menu entries. Define separate specifications for credential lifecycle, scoped keys, attribution and rewards; their internals remain unverified.
- Audit records cover login, flow publish, creation, update and deletion, with actor, subject type/ID/name, note, flow, time and source context. PDF audit logs show two-month retention; bot error/system logs show two weeks. Keep these retention policies distinct and configurable.

### B. Flow action catalog

The PDF gives a much more detailed catalog than the first research pass. Every action needs a configuration schema, validation, output mapping, permission scope, error behavior and execution test. Catalog visibility does not prove provider execution.

| Family | Screenshot-observed actions | Required behavior to specify/test |
|---|---|---|
| Tags/labels | Add/remove tag, add/remove multiple tags, remove all tags; add/remove labels, remove all labels | Idempotent changes, event emission and distinction between labels and tags |
| Variables | Set/clear variable, clear multiple variables, clear all custom user fields, JSON Operation | Types, missing/null values, scope, bulk reset and JSON failure cases |
| Subscription/consent | Subscribe/unsubscribe sequence and bot; email/SMS opt-in and opt-out | Channel-specific consent history and cancellation of pending scheduled sends |
| Conversation | Mark Open/Pending/Spam/Done/Invalid, talk to human/pause, resume, assign agent/group, teammate note, delete bot user | State machine, assignment rules, durable timers and controlled deletion |
| Advanced execution | External Request, Smart Delay, Schedule Flow, JavaScript Function, Send SMS, Set Language/Timezone, Log Custom Event | Timeout/retry, response mapping, sandbox limits, timezone/DST and event schema |
| Workflow/control | Move To Board, Calendar File Generator, Goto Node Ns, Trigger Workflow, Loop Workflow, Rate Limit Attempt | Stable node identifiers, loop bounds, calendar/time fields, outcome branches |
| APIs | Bot User API, Store Location API, WhatsApp API | Scoped operations and explicit request/response schemas |
| Integration actions | AI provider, CRM V1/V2, Google Sheets, MailChimp, Cloudinary, S3, Zapier, Make, Pabbly, Stripe, Shopify, WooCommerce, maps, property report, VideoSDK | Provider-specific adapters, credential reference, pagination and failure handling |
| Notifications | Email, Slack, SMS, phone call, WhatsApp, WhatsApp template, Facebook utility template, Telegram, Viber, Facebook and live-agent notifications | Recipient selection, message formatting, provider constraints and failure branch |
| Ecommerce | Get Products, Ecommerce API, add/remove/empty cart, apply discount, mark cart paid, update order status, Stripe/PayPal checkout URL | Price/stock snapshots, discount validation and verified payment state |
| AI | AI Agent, AI Task, AI Intent Recognition | Structured outputs, tool policies, fallback and usage accounting |

The pictured notification action exposes a next-step path when notification fails. Treat failure branches as part of the graph model. An action node may contain an ordered list of actions followed by a normal next step; define whether failure stops or continues each list. Do not assume all actions share identical semantics.

For JavaScript execution and external requests, use bounded execution, restricted capabilities, secret isolation and controlled network access. For “mark cart paid,” distinguish an internal status update from evidence that a payment processor settled a charge.

### C. Triggers, keywords, sequences and legacy intents

**Live trigger catalog inspected in revision 2:**

- User created; subscribed/unsubscribed to bot; email and SMS opt-in/out.
- Conversation opened, pending, done, invalid, snoozed, unsnoozed and snooze ended.
- Assigned to agent, agent sent message, user-field changed, moved to board, error logged.
- Tag/label added or removed, sequence subscribed/unsubscribed, date/time trigger.
- Order paid, ordered, processing, shipped, completed, canceled and refunded.
- WhatsApp welcome, order received, product enquiry, ad referral, reaction, call-permission update and call ended.
- Facebook/Instagram ad referral and reaction; Messenger call-permission update/call ended; Facebook lead generation; TikTok ad referral/comment creation.
- Stripe invoice payment success/failure; CRM V2, Shopify and WooCommerce webhooks.
- User ended WebChat; Guest Chat Ended explicitly marked Deprecated.
- Calendly booked/rescheduled/canceled, Cal.com webhook, story mention/reply and media-post shared.

Implement a trigger registry with typed payloads, predicates, active status, workflow target and deduplication key. Specify event origin and recursion handling: a tag-change action should not accidentally cause an infinite trigger loop. Scheduled triggers need timezone rules; snooze expiration must survive worker restarts.

Keyword editor requirements from page 19: name, matcher selection, keyword list, active switch, hotword switch, optional reply-text variations and subflow selection. Enumerate available matchers during a later test; only the displayed “message contains” rule is established by the PDF. Define precedence among hotwords, waiting questions, default replies and AI intent routing.

Sequences have a name and ordered message entries; overview counts messages, active users and completed users. Detailed delays, stop rules and scheduling remain a test task. Legacy Intents expose parameter completeness and “otherwise” paths, and Auto Intent Detect is marked Deprecated. Preserve import/migration compatibility if required; do not make a deprecated mechanism the new default.

### D. Inbox and agent policy specification

**PDF page 14** establishes the populated layout: queue navigation, contact list with channel/avatar/preview/time, conversation transcript, Reply/Note composer, status control, contact profile, channel identity, subscription indicators, board and automation pause controls. Outside-window UI prevents an ordinary message and offers template messaging. Treat that as a required UI state and validate exact current provider eligibility separately.

**Live settings inspected:**

1. Conversation visibility: all; only mine; mine plus unassigned; mine plus my groups; mine plus my groups plus unassigned; mine plus unassigned in my groups.
2. Call visibility has the same scopes and affects online recipients, incoming calls and AI-to-human transfer requests.
3. System event logging and audio transcription provider selection.
4. General behavior: Enter-to-send, reopen Done/Pending on inbound messages, preserve the viewed thread after status changes, and append messages to existing AI context while paused.
5. Agent controls: restrict reassignment; mark read only for assigned agent; opt out of automatic assignment on reply; prefix agent name; mask phone number to last four digits for agent/supervisor; default new WhatsApp templates to unavailable in live chat.
6. Visibility of profile fields, notes, starred, attachments, tags, labels, sequences, orders, calendar generator, send-subflow, agent assist and custom URL; system-message visibility by role; display-name fallback rule.
7. Closing notes and mandatory category.
8. Custom URL with workspace/user/contact/flow variables and a target; external live-chat integration selection.
9. Auto-pause duration after agent reply (30 minutes displayed), SMS sender, email profile and assigned/unassigned desktop notification preferences plus mute.
10. Rate-limit settings entry is visible; exact configurable limits and enforcement behavior still need inspection.

Enforce visibility and masking on APIs, exports and realtime events as well as the screen. URL interpolation must encode values and avoid exposing contact data to unapproved third parties. Distinguish a hidden UI tool from permission to perform its underlying action.

### E. AI Hub requirements

The live Add AI Agent form adds: name, description, generate-prompt entry, provider/model, parameters, advanced mode, persona/role, skills, selected functions, product/service information, constraints and platform-instruction toggle. No model request was executed. The displayed default model is merely a UI observation, not a model recommendation for our product.

PDF-derived requirements:

- **AI Functions:** name/description, workflow binding, editing; example functions route emergency and human-support requests. Define typed arguments, required fields, tool results and failure behavior.
- **AI Tasks:** prompt, provider/model parameters, output fields; sample tasks include summarization, extracting email, success evaluation and follow-up messages. Validate outputs against a schema before updating customer fields.
- **AI Prompts:** reusable prompt text, active status, display order and samples for tone, translation, grammar, expansion, simplification, rephrasing and summarization.
- **MCP Servers:** unique English name, URL, authentication choice and List Tools. Separate discovery from granting an agent permission to execute tools; record schema versions and execution results.
- **Knowledge base:** workspace-shared knowledge bases, linked vector stores and files. Design ingestion status, replacement/deletion, retrieval scope and versioning; the PDF does not show ingestion internals.
- **Defaults/logging:** default provider/model, agent quota, search/filter, model, node, input/output tokens, process duration, success/failure, start time, export and pagination.

Agent responses should support a deterministic handoff path when uncertain or when a selected function requires human support. Build test fixtures for unsupported questions, missing knowledge, malformed function arguments, unavailable providers and tool errors. AI cannot silently turn a knowledge answer into a business action without the configured tool policy.

### F. Analytics and operational tools

Add bot-level report families visible on page 14: messages, contacts, agent performance, AI usage/agents/tasks/prompts, closing notes, inbound webhooks, errors, WhatsApp conversations, custom events and custom reports. Support previous-period comparisons with explicit date range and timezone.

Page 24 supplies an example failure where an AI message was not sent because the user was unsubscribed. Such suppression must be an explainable result with contact, flow/node and time context, not just a generic provider failure. Keep business events, execution traces, usage accounting and audit history separate even if the UI links them.

### G. Mini-app and commercial ecosystem

The PDF adds provider cards for **360 Dialog** and **WABA** and a searchable mini-app installation catalog with name, description, icon, version, price/free indicator and select action. Installed and purchased tabs are separate. These extend the catalog backlog; they are not proof that every listed third-party app is currently maintained.

Define a mini-app manifest with configuration/auth fields, action schemas and version compatibility. Add publishing, review, install/update/uninstall, dependency checks and rollback as proposed lifecycle requirements. Bot-template install counts and sales reporting remain separate from mini-app sales. Referral, paid marketplace and agency billing rules still need detailed discovery.

## 16. Colleague's support-routing workflow

The screenshots depict a practical support flow, not just a palette of unrelated nodes:

```text
Start
  → time-based condition
      → assigned agent A + notification ─┐
      → assigned agent B + notification ─┼→ shared continuation
      → assigned agent C + notification ─┘
      → otherwise path

AI conversation
  → emergency function → emergency-support workflow
  → human-support function → support-routing workflow
```

The graph visibly includes current-time predicates, several agent-notification branches, a shared downstream action with a smart delay and AI-agent action, and a fallback node. Not all node text, times or connection details are legible enough to reproduce exactly. Do not infer precise branch windows or fallback copy from the small graph.

For our product, reproduce the behavior using synthetic agents and an explicit routing schedule. Test:

- Every time boundary and the no-agent/otherwise path.
- Workspace versus contact timezone, overnight hours and daylight-saving transitions.
- Notification success/failure and fallback assignment.
- Agent offline/unavailable and reassignment during an active conversation.
- AI requests for human support and emergency routing without repeated notifications.
- Pause/resume semantics around agent assignment and the shared AI continuation.
- Delayed steps firing only once after restart and respecting unsubscribe or closed-state policy.

This scenario should become a core acceptance fixture before adding more channels.

## 17. Data model and roadmap additions

Extend section 7 with: Invitation, Session, UserPreference, Presence, RolePolicy, ConversationSnooze, ClosingNoteCategory, TranscriptionJob, TriggerDefinition, TriggerRun, SequenceEnrollment, ConsentHistory, ActionSchemaVersion, NotificationAttempt, AIContext, AIFunction, AITaskSchema, MCPConnection/ToolSnapshot, VectorStore, KnowledgeFile, ChannelHealthSnapshot, ChannelMigration, CallSession and CallPermission.

Add commercial records only when needed: SeatChangeQuote, ReferralAttribution, MiniAppPackageVersion, Installation, TemplateInstall and MarketplaceTransaction. Sensitive provider credentials remain references to encrypted storage.

Update delivery scope:

- **Phase 1:** explicit connection-versus-health model, coexistence spike, roles, identity/preferences, safe binding design.
- **Phase 2:** ordered action execution, failure branches, triggers/sequences, typed fields, support-routing fixture and durable snooze/timers.
- **Phase 3:** detailed inbox visibility, closing notes, audit retention, notification routing, seat-impact previews and suppression reporting.
- **Phase 4:** AI functions/tasks/prompts, knowledge assets, MCP policies, optional calling and coexistence synchronization once provider contracts are validated.
- **Phase 5:** mini-app lifecycle, remaining integrations, referrals/agency/commercial ecosystem.

The earlier duration ranges are provisional and do not imply this expanded catalog fits unchanged. Re-estimate by action family and integration after an implementation spike; do not count a generic Action node as completing every provider action.

## 18. Definition of complete parity

**All 28 supplied PDF pages are accounted for in the plan. This is source coverage, not 100% platform or implementation verification.** No meaningful whole-platform percentage can be calculated until a finite target inventory and acceptance criteria are agreed.

Maintain one record per feature and per provider-specific action:

`ID | source/page/route | role/plan/channel | fields | states | side effects | dependencies | acceptance cases | observed | implemented | verified | open questions`

Use independent states for source inspection, implementation and verification. A menu item is observed; a saved configuration is configured; a successful controlled execution is tested. A screenshot is never sufficient to mark runtime behavior verified.

### Required parity dimensions

| Dimension | Completion criterion |
|---|---|
| Screen coverage | Every agreed route, dialog and conditional panel has a mapped requirement and implementation |
| Behavior | Create/read/update/delete, validation, failures, retries and state transitions pass controlled tests |
| Role/plan/channel coverage | Every supported combination has tested permissions, entitlement and capability behavior |
| Integrations | Each promised adapter passes its own authentication, event, action, failure and reconnect tests |
| Visual fidelity | Agreed desktop/mobile layouts and empty/loading/populated/error states pass visual review |
| Data lifecycle | Import/export, migration, retention, deletion, audit and restore behavior are defined and tested |
| Operations | Duplicate events, rate limits, outages, delayed jobs, rollback and tenant isolation are tested |

### Remaining concrete research gates

1. Resolve or work around WABA payment/verification restrictions using an eligible test setup; do not change billing solely for research.
2. Decide whether to allow UChat's destructive channel-to-Omni linking with disposable contacts, or use a separate research number/bot. Current number was left unlinked.
3. Inspect a safely populated inbox and run an explicitly addressed test conversation before claiming send/handoff parity.
4. Execute the support-routing fixture with test agents and exercise each node family, not only its editor.
5. Inspect full calling, rate-limit, knowledge ingestion, template review and WhatsApp Flow editors with suitable prerequisites.
6. Obtain tickets/agency/paid marketplace access if those are required in the target release.
7. Inspect other providers and channels individually; their menu entries do not establish API support.
8. Capture missing responsive and failure states. The PDF provides desktop examples but cannot establish unseen states or private backend design.

The implementation target remains full agreed functional and visual parity, with WABA first. These gates prevent a broad UI inventory from being mistaken for a fully tested clone specification.


## 19. Field-level specification and coverage tracking

The [detailed specification](uchat-detailed-specification.md) records observed fields, limits, defaults, draft mutations, proposed acceptance checks and unresolved behavior for sequences, keywords, user fields, WhatsApp Flow creation, boards, contacts, bot rate limits, knowledge assets, campaigns, WhatsApp multiple-products messages and question nodes.

The [coverage ledger](uchat-coverage-ledger.md) separates inspected forms from saved configuration and runtime verification. It is a research backlog, not an exhaustive denominator for a platform-completion percentage.

Research created **Research — disposable board** with one **New** column and added an unconnected Question draft step. No flow was published, campaign saved/scheduled, or message sent. The earlier message-node description is corrected above based on the current canvas.

## 20. WABA health update — 30 September 2026

After the user reported adding a payment card, a fresh UChat Health Check showed **WABA AVAILABLE**. The previous payment error141006 was absent. This supersedes the earlier WABA BLOCKED payment observation in section13; historical evidence remains for comparison.

Other dimensions remain separate: CLOUD_API Coexistence CONNECTED; PHONE_NUMBER LIMITED with display-name warning and SIP error138024; BUSINESS LIMITED with verification error141010; APP AVAILABLE with SIP configuration error138025; CODE_VERIFICATION_STATUS NOT_VERIFIED; NAME_STATUS AVAILABLE_WITHOUT_REVIEW; QUALITY_SCORE GREEN; THROUGHPUT STANDARD; MESSAGING_LIMIT TIER_250. Clearing payment does not demonstrate a successful send or remove these other warnings.

The user authorized WhatsApp research messages to a designated test recipient in the conversation. It is distinct from the connected business sender (their full numbers differ despite sharing the last four digits). No message was sent in this recheck. The sender remains without a linked bot; the previously observed destructive Omni-link warning still requires resolution before that operation.

## 21. WhatsApp channel linked — 30 September 2026

The user explicitly confirmed proceeding after being told that linking would permanently remove existing channel bot users. In Omni-Channel → WhatsApp Cloud → Link, selected the connected Wira Mart number, entered LINK in the irreversible warning, and confirmed. The resulting Omni table showed the business phone number with **Unlink**, verifying the channel is now linked to Coco Research Test. This supersedes earlier unresolved/canceled binding notes. No count of removed users was exposed, so no deletion count is asserted. No flow was published or message sent during linking.

## 22. First controlled WhatsApp exchange — 30 September research session

Verified inbound text **Test uchat message** from the authorized test recipient in Coco Research Test's live inbox. Contact was Open and Unassigned; direct opt-in source; email/SMS opt-ins separately absent. The UI displayed Reply freely with approximately24 hours remaining. UI timestamps showed29 September despite the local research date being30 September; timezone mapping is not yet established.

Submitted one acknowledgement: **UChat test reply: your test message was received successfully.** The outgoing message appeared in the conversation with agent attribution and the composer cleared. This verifies application-level outgoing submission/display, not independently confirmed handset receipt or read status. Agent reply also showed an automation pause countdown near30 minutes. No flow publication was involved.

## 23. Guarded keyword automation ready

User confirmed receipt of the earlier agent reply, establishing controlled two-way WhatsApp messaging. Created and published Workflow **Research WhatsApp Automation**, subflow f306687s4786519. Verified publish success and wiring: Start → Condition #1 (Phone IS 628556551544) → Research acknowledgement; unmatched branch ends. Text: “UChat automation test: the recipient condition passed. This is an automated research message.” Created active keyword **Research guarded WhatsApp test**, exact message **uchat research test**, bound to this workflow, Hotword off and no direct keyword reply. Cleared the test contact's existing automation pause; UI returned to Automatically. Awaiting an inbound keyword from the user's phone to verify execution. No automated delivery claimed yet.

Observed distinction: Workflow palette offers Send Message, Action, Condition, Split, Send Email and Comment; Question/Goto absent. Condition groups expose all-conditions selector, individual typed field conditions, destination per group and Otherwise. Phone comparison defaults IS and offers Case Sensitive checkbox. Full question/handoff test deferred in favor of the user's requested smaller test.


## 24. Recommended implementation architecture — revision 5

### Coverage status

**Research/specification coverage remains roughly 60–65%, an informal estimate rather than a measured completion percentage.** Publishing the test workflow improves configuration evidence but does not establish execution until the keyword produces the expected reply. No clone code has been implemented: implementation is 0%. All 28 supplied PDF pages have been reviewed; that is 100% coverage of that source alone.

Verified: channel linking, incoming WhatsApp text, agent reply and user-confirmed handset receipt. Configured: published Start → recipient condition → text workflow and exact keyword. Still open: keyword runtime, rich node behavior, templates/campaigns, integration failures, permissions, restricted modules and visual edge states. Architecture decisions do not themselves increase reference-feature coverage.

To replace estimates, freeze a release-specific list of atomic requirements. Count a specification item complete only when fields, validation, states, permissions, side effects, dependencies and acceptance cases are defined, with remaining assumptions explicit. Report completed items/total separately for specification, implementation and passing tests. The current area-level ledger is not yet that denominator.

### Stack decision

Assumption: a multi-tenant SaaS with WABA first, a small engineering team and managed infrastructure where practical. Choose a modular backend and separate workers; split services later when load or ownership requires it.

| Layer | Recommendation | Responsibility |
|---|---|---|
| Frontend | Next.js App Router, React, TypeScript | Workspace UI, inbox, forms, reporting; interactive editor as client components |
| Design system | Tailwind CSS and shared accessible React components | Consistent controls, themes, keyboard support and responsive states |
| Flow canvas | React Flow | Node/edge interaction and viewport; our schemas and backend implement execution |
| Backend | Next.js Route Handlers, Node.js runtime, TypeScript | REST APIs, authorization and webhook ingress; shared service modules hold business logic |
| Database | Managed PostgreSQL | Authoritative transactional records, flow versions, contacts, conversations, audit, campaigns |
| Flexible data | PostgreSQL JSONB | Versioned graph definitions, provider payloads, validated custom fields; core relations remain normalized |
| Automation engine | Temporal with TypeScript workers | Durable waits, inbound signals, retries, sequence scheduling and flow execution |
| Redis | Managed Redis | Short-lived cache, presence, throttling and realtime fan-out; durable messages stay in PostgreSQL |
| Files | Private S3-compatible object storage | Media, knowledge files, exports; signed access and lifecycle policies |
| Realtime | Separate lightweight Node.js WebSocket gateway | Inbox message/status/assignment updates; authorized subscriptions and reconnect recovery |
| AI search | PostgreSQL full-text search plus pgvector | Tenant-scoped knowledge chunks and embeddings, added in AI phase |
| Authentication | Managed OIDC identity provider | Login/MFA/session identity; backend owns workspace memberships and roles |
| Operations | Container deployments, OpenTelemetry, centralized logs/metrics | Separate API and worker scaling, error tracing, backups and recovery |

This is a design recommendation. Current primary documentation supports [Next.js App Router](https://nextjs.org/docs/app), [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers), [React Flow custom nodes](https://reactflow.dev/learn/customization/custom-nodes) and [graph save/restore](https://reactflow.dev/examples/interaction/save-and-restore). React Flow supplies editor primitives; node validation, publishing and execution are application work.

[Temporal](https://docs.temporal.io/) and its [TypeScript SDK](https://github.com/temporalio/sdk-typescript) support durable orchestration. It adds cost and operational/learning overhead, but long waits, question timeouts, retries and human handoff justify it for the full target. Use one durable orchestration engine rather than independently scheduling the same jobs in Redis and Temporal. Retryable external activities still require idempotency and reconciliation; Temporal does not make a WhatsApp send exactly-once.

### Database structure and isolation

Use one application PostgreSQL database initially with domain modules and explicit workspace_id on tenant-owned records. Key groups:

- Identity: users, workspaces, memberships, roles, agent_groups.
- Channels: connections, phone_numbers, channel_bindings, credential_references, health_snapshots.
- CRM: contacts, channel_identities, field_definitions, field_values, tags, contact_tags, consent_events.
- Inbox: conversations, assignments, messages, message_status_events, notes, attachments.
- Automation: flows, drafts, immutable flow_versions, execution_summaries, step_results, keywords, triggers, sequence_enrollments.
- Delivery: webhook_events, outbox, send_attempts, templates, campaigns, audience_snapshots, campaign_recipients.
- Platform: audit_events, entitlements, usage_events; later commerce, knowledge and mini-app tables.

Use UUID application IDs, UTC timestamptz, scoped foreign keys and indexes beginning with workspace_id on common tenant queries. Unique provider IDs include connection/provider namespace. Deduplicate messages independently from status events, since a single message has multiple delivery transitions. Store media bytes in object storage and metadata in PostgreSQL. Keep encrypted credentials in a secrets service.

Use application authorization plus PostgreSQL row-level security as defense in depth. Establish tenant context per transaction using a restricted runtime role; database owners/bypass roles must not serve ordinary requests. Test cross-tenant REST, worker and WebSocket access. [PostgreSQL row-security documentation](https://www.postgresql.org/docs/17/ddl-rowsecurity.html).

Start reporting with indexed tables and aggregate jobs. Add partitioning, replicas or a dedicated analytics store only after measured needs. Add pgvector for knowledge retrieval when AI work starts; embeddings and chunks retain tenant/source permissions. [pgvector project documentation](https://github.com/pgvector/pgvector/blob/master/README.md).

### Message and execution path

```text
WhatsApp webhook
  → verify signature and connection
  → persist event with deduplication key
  → acknowledge after durable acceptance
  → worker normalizes contact/message/status
  → PostgreSQL transaction + transactional outbox
  → signal Temporal execution for this conversation
  → immutable flow version + typed node interpreter
  → create outbound intent
  → sender checks consent, pause, window, capability and limits
  → Meta API → delivery callbacks → inbox WebSocket update
```

The outbox bridges database commits to external orchestration and notifications with retryable dispatch. Assign a stable outbound intent ID per execution/step/action. On an ambiguous provider timeout, reconcile status before blind resend where provider capabilities permit; expose unresolved outcomes. Do not promise exactly-once delivery.

Temporal owns execution scheduling/history; PostgreSQL owns product records and queryable execution summaries. Keep large payloads/media out of workflow histories. Each run pins an immutable flow version; code upgrades must preserve replay compatibility. Serialize conversation decisions and define pause/agent takeover precedence so question replies, keywords and handoff do not race.

### Flow representation

Persist graph nodes, edges, positions, schema version and editor metadata. A node has stable ID, type, validated configuration and explicit output ports. Publishing compiles the graph into an immutable runtime definition and checks required fields, references, channel capability, unreachable paths and runaway-loop bounds. The runtime interprets typed nodes; it never evaluates arbitrary graph content as privileged code. Isolate any future custom JavaScript action from credentials and the application process.

Draft autosave uses revision numbers for conflict detection. Published versions stay separate from drafts. Custom field definitions are versioned/referenced and incompatible deletion is prevented or migrated explicitly. The frontend canvas is a view over this model, not the execution engine.

### Backend modules and repository

Modules: tenancy/auth, channels, contacts, inbox, automation, campaigns, content, analytics, billing/entitlements, AI, commerce, integrations. Provider adapters expose normalized inbound events, supported capabilities, send operations and health/error mapping.

```text
apps/web                 Next.js UI, Route Handlers and Server Actions
apps/realtime            Lightweight Node.js WebSocket gateway
apps/worker              Temporal workers and outbox dispatch
packages/services        Shared server-side business logic and authorization
packages/contracts       API/event schemas and shared types
packages/flow-schema     Node definitions and validators
packages/channel-adapters WhatsApp first, other channels later
packages/ui              Shared interface components
infra/                   Deployment and observability configuration
```

Use REST/OpenAPI contracts for frontend and public APIs. Enforce permissions in backend services, including direct calls and worker actions. Next.js Route Handlers serve REST APIs and WhatsApp webhooks; Server Actions handle UI mutations where convenient. Both call shared server-side services, also used by workers. Authenticate and authorize each entry point. Server Components call services directly rather than making HTTP calls to their own API. Keep database access and secrets out of client bundles.

### Deployment and first implementation milestone

Start with Docker-based local development, managed PostgreSQL/Redis/object storage and Temporal Cloud or a managed Temporal service for production. Deploy the combined Next.js web/API app, realtime gateway and workers independently on a container platform. Choose cloud/region after traffic, budget and data-location requirements are specified; no provider purchase is authorized by this recommendation. Defer Kubernetes until operational needs justify it.

Build in order: tenant/auth foundation → WABA webhook and inbox → outbound tracking → graph editor/publishing → durable question/condition/handoff runtime → templates/campaigns → AI and other channels. Validate database restore, restart recovery, duplicate webhooks, ambiguous sends and tenant isolation before pilot release. Versions, operating costs and capacity targets require an implementation spike and load tests; this plan makes no unmeasured scale promise.


## 25. Next.js backend decision

User prefers Next.js because they are unfamiliar with NestJS. Adopt Next.js for the frontend and request-based backend; NestJS is no longer part of the recommended stack. PostgreSQL, Temporal workers, Redis, React Flow and object storage remain as specified above.

Keep route files thin: parse/validate → authenticate/authorize → call shared service → return response. Webhook handlers verify signatures and durably persist events before acknowledging; workers perform automation and delivery. Server Actions are UI mutation endpoints, not a replacement for external webhook/public API routes.

Long-running automation, delays, campaigns and ingestion run in a separate TypeScript worker. Realtime WebSockets run in a separate small Node.js gateway. This avoids tying persistent connections and jobs to the lifetime of a Next.js request, especially on function-based hosting. Next.js documentation describes deployment-dependent timeout and WebSocket limitations in its [backend guide](https://nextjs.org/docs/app/guides/backend-for-frontend).

No new backend framework is required for this split. The application and workers share TypeScript modules, schemas and database services. A production deployment still needs the worker and realtime processes; a single Next.js request process alone is not the proposed automation architecture.

## 26. Keyword runtime verified; template availability checked

30 September research session: after the user sent the keyword, live inbox showed **Uchat research test** followed by **UChat automation test: the recipient condition passed. This is an automated research message.**, attributed **Sent by Bot**. This verifies the positive keyword → published workflow → phone condition → automated message path in UChat. Capitalized incoming Uchat matched lowercase configured uchat in this test; broader case/normalization behavior is not established. Recipient handset receipt of this automated message was not separately confirmed. Negative recipient branch, duplicates and restart recovery remain untested.

Added one blank WhatsApp Message Template block to Send Message #1 in the unpublished Main Flow draft. Its canvas exposes **If send WhatsApp failed** output. Edit opens a template selector (dialog titled Edit Button); dropdown returned **No data**. Canceled without saving template selection. This establishes no selectable template in this editor context, not that Meta has no templates. Template synchronization/management must be inspected before template-variable or delivery testing. Main Flow was not published; the separate research workflow remains active.

## 27. Advanced WhatsApp inspection

Added catalog-message fields, WhatsApp Flow launch/completion controls, and weekly call-settings schema to [detailed specification](uchat-detailed-specification.md#spec-wa-advanced--catalogs-flows-calling-and-coexistence). Call schedule supports timezone, closed/all-day/one-period/two-period choices. Inspected changes were canceled without saving. Added vendor-documented coexistence onboarding/history considerations, clearly separated from observed runtime behavior. User excludes live calls and purchases; neither was performed. Blank Catalog and WhatsApp Flow blocks were added to unpublished Main Flow for inspection. Full Flow designer, commerce execution and coexistence synchronization remain open.

## 28. Current scope and template/coexistence update

**Commerce is deferred from current implementation/discovery scope at the user's request.** Existing commerce research is retained for later; no purchases or live calls are in scope. Current focus is coexistence and templates. Earlier full-platform scope describes the longer-term backlog, not the current release commitment.

Contents → Message Templates → Sync populated the previously empty catalog with one approved English marketing template, broadcast. Inspected component/header/button choices and named placeholder; canceled editing/settings without submission. Full field details and sync acceptance cases are in SPEC-TEMPLATE-SYNC in the detailed specification. No template sent or submitted for review.

SPEC-COEX-SYNC adds a proposed history/contact/app-echo synchronization contract, backed by provider documentation but not live-tested UChat payloads. Direct Meta documentation was rate-limited. The remaining concrete verification is app-originated echo/history behavior and per-send template variable mapping. Commerce deferral does not justify increasing the earlier rough whole-platform coverage percentage.


## 29. Research closure and accepted verification limits

The user confirms that chatting from both the WhatsApp Business App and UChat works. Record this as **user-confirmed coexistence messaging**, separate from assistant-observed UI tests. It does not independently verify history import, contact synchronization, duplicate suppression or reconnect recovery.

The user states that further tests are not needed. Close the current research pass; do not request additional template, question, timeout, handoff or coexistence tests unless the user reopens that work. Retain unverified behavior and proposed acceptance criteria for implementation validation. Commerce remains deferred; live calls and purchases remain excluded.

Coverage remains an informal approximately65% estimate of the original full-platform specification, not a measured percentage. Accepted limits complete this research pass to the user's requested stopping point; they do not establish100% UChat parity. No clone implementation has begun. The next possible phase is implementation using the Next.js architecture in sections24–25, with unresolved details treated as explicit implementation decisions rather than verified reference behavior.

## 30. Implementation started — 30 September 2026

The user authorized implementation following this plan. A new local **ConvoFlow** Next.js application now provides the first WhatsApp-first product shell: workspace navigation; a shared inbox with a contact profile and agent reply state; CRM contacts; WhatsApp template inventory; channel-health and call-settings views; and a draft/publish flow-builder prototype containing Start, Message, Question, Condition, Action, Delay and Split node families.

The initial app provides health and WhatsApp-webhook route stubs. It deliberately has no database, credential storage, real Meta API calls, Temporal worker, or production realtime gateway yet. The UI is a reviewable foundation with local client state, not a claim that external messages or automation are now implemented.

**Next implementation increment:** PostgreSQL schema/migrations and tenant/auth foundation; then persist contacts, conversations, messages and immutable flow versions. Only after that should Meta webhook verification and outbound delivery be enabled. This follows the priority sequence in section 24 and preserves the user's exclusions: commerce deferred, no live calling purchase/workflow.

## 31. Initial build validation

The local ConvoFlow app builds successfully with `npm run build`. Browser checks confirmed that the flow condition inspector opens, the inbox can compose a prototype message, and composing a reply changes the automation state to paused. The health endpoint returns an `ok` response.

The initial backend boundary now exposes typed conversation, message, automation-state, and flow endpoints. It uses runtime seed data only, so it can be reviewed without a database or Meta credentials. These routes are the intended seams for the PostgreSQL repository, transactional outbox, tenant authorization, and WhatsApp Cloud adapter described in sections 14–19.

## 32. PostgreSQL foundation added

`db/migrations/001_core_tenancy_inbox.sql` now defines the first implementation migration for tenant-scoped workspaces, memberships, channel connections, contacts/identities, conversations, messages/status events, flow drafts and immutable versions, webhook intake, and transactional outbox records. It applies row-level security to tenant-owned tables through an `app.workspace_id` transaction setting. The normal application role must be restricted and must not own these tables or bypass RLS.

No database has been provisioned, migrated, or connected. The prototype continues to use runtime seed data until an environment, restricted database role, migrations runner, workspace authentication, and a PostgreSQL repository are configured. This preserves the planned prerequisite ordering and does not enable Meta messaging.

## 33. Flow publishing validation added

The prototype flow publish endpoint now validates a single Start node, stable node IDs, supported node types, valid edge references, a Start path, and reachability before it accepts a publish operation. Validation is a shared server module rather than UI-only logic, so the planned graph editor, API and worker can enforce the same constraints. The current runtime store still has no immutable persisted flow-version record; the migration provides that target table for the PostgreSQL repository increment.

## 34. Persistent and delivery foundation added

The implementation now includes a local PostgreSQL compose configuration, database transaction helper that establishes `app.workspace_id` for RLS, and a second migration for WhatsApp template records, outbound intents, campaigns, recipients, consent events, and audit events. The interactive flow canvas now supports moving graph nodes, adding nodes, creating edges, and selecting nodes for inspection. No database has been started and no Meta credential, webhook or send API has been enabled.

## 35. Workspace-aware repository boundary added

Inbox and flow reads now use a repository boundary that selects prototype data until PostgreSQL is configured, then runs workspace-scoped queries inside an RLS transaction. Agent messages persist an outbound message and transactional outbox event together, while manual replies pause automation for 30 minutes. Database-backed routes require workspace context; the current header bridge is explicitly temporary and must be replaced with OIDC session and membership middleware before production use.

## 36. WhatsApp webhook safety boundary added

The Cloud API webhook endpoint now requires Meta verification-token matching and SHA-256 HMAC validation before it parses or accepts an event. It returns unavailable until its secret configuration exists. The health endpoint reports configuration readiness separately for webhook receipt and outbound sending. Event normalization, deduplicated persistence, and sender delivery remain the next implementation steps; no external WhatsApp operation is enabled by this code.

## 37. WhatsApp adapter foundation added

The implementation now normalizes supported inbound message and status payloads into provider-independent events and provides a text-sender adapter that requires an explicit Graph API version, phone-number ID, and access token. No route invokes the sender yet. The remaining work is the outbox dispatcher: load an intent, enforce consent/window/capability checks, call the adapter, and persist the provider result without duplicate sends.

## 38. Template and campaign API foundation added

The prototype now exposes typed template inventory/sync and campaign creation endpoints. Campaign creation accepts only an approved template. PostgreSQL-backed persistence, audience snapshots, send scheduling, consent checks, and provider template synchronization remain required before the campaign feature can operate externally.

## 39. Workflow interpreter foundation added

The supported prototype graph now has a deterministic simulation endpoint that follows Start, Condition, and Message paths, returns step outcomes, and has loop protection. The current condition fixture checks the verified test recipient. This is a developer-safe simulator only; the production worker still needs persisted execution state, durable timers, inbound signals, concurrency handling, permissions, and outbox delivery.

The interpreter now also defines simulation outcomes for Question (wait for response), Delay (schedule continuation), Action (queue an action), and Split (choose a branch). Durable resumption and provider-connected execution remain worker work rather than client behavior.

## 40. SaaS access and delivery policy foundations added

The code now has a central workspace-role permission map and a shared outbound-delivery guard. The guard prevents dispatch while automation is paused, without consent, outside the free-reply window without a template, or with an unapproved template. The session route is a prototype fixture; OIDC authentication and database membership enforcement must replace it before production use.

## 41. CRM contact API foundation added

The prototype now supports typed contact inventory and creation with identity, tags, and consent state. The PostgreSQL schema remains the durable target for contact/identity records; API-level CRUD permission enforcement and merge/import/history features remain planned work.

## 42. Outbound dispatch boundary added

The implementation now has a worker-facing outbound text dispatcher and a protected internal dispatch endpoint. It runs consent, service-window, automation-pause, and approved-template guards before it can call the WhatsApp adapter. The endpoint is disabled unless its internal secret is configured. A durable PostgreSQL outbox worker still needs to claim intents, persist state transitions, and retry/reconcile provider failures.
