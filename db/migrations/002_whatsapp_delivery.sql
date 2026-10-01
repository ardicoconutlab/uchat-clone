create type template_category as enum ('authentication', 'marketing', 'utility');
create type template_status as enum ('draft', 'pending', 'approved', 'rejected', 'paused', 'disabled');
create type campaign_status as enum ('draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled', 'failed');
create type outbound_intent_status as enum ('queued', 'sending', 'accepted', 'failed', 'unknown', 'cancelled');

create table message_templates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  connection_id uuid not null,
  provider_template_id text,
  name text not null,
  language text not null,
  category template_category not null,
  status template_status not null,
  components jsonb not null,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id),
  unique nulls not distinct (workspace_id, connection_id, provider_template_id),
  unique (workspace_id, connection_id, name, language),
  foreign key (workspace_id, connection_id) references channel_connections(workspace_id, id) on delete cascade
);

create table outbound_intents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  conversation_id uuid not null,
  connection_id uuid not null,
  idempotency_key text not null,
  source text not null check (source in ('agent', 'flow', 'campaign', 'api')),
  payload jsonb not null,
  status outbound_intent_status not null default 'queued',
  provider_message_id text,
  failure_code text,
  failure_detail text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id),
  unique (workspace_id, connection_id, idempotency_key),
  foreign key (workspace_id, conversation_id) references conversations(workspace_id, id) on delete cascade,
  foreign key (workspace_id, connection_id) references channel_connections(workspace_id, id)
);

create table campaigns (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 160),
  template_id uuid not null,
  status campaign_status not null default 'draft',
  audience_definition jsonb not null,
  scheduled_at timestamptz,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id),
  foreign key (workspace_id, template_id) references message_templates(workspace_id, id),
  foreign key (workspace_id, created_by) references workspace_memberships(workspace_id, user_id)
);

create table campaign_recipients (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  campaign_id uuid not null,
  contact_id uuid not null,
  template_parameters jsonb not null default '{}'::jsonb,
  status outbound_intent_status not null default 'queued',
  outbound_intent_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, campaign_id, contact_id),
  foreign key (workspace_id, campaign_id) references campaigns(workspace_id, id) on delete cascade,
  foreign key (workspace_id, contact_id) references contacts(workspace_id, id),
  foreign key (workspace_id, outbound_intent_id) references outbound_intents(workspace_id, id)
);

create table consent_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  contact_id uuid not null,
  channel channel_kind not null,
  consent_type text not null,
  granted boolean not null,
  source text not null,
  occurred_at timestamptz not null,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  foreign key (workspace_id, contact_id) references contacts(workspace_id, id) on delete cascade
);

create table audit_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  actor_user_id uuid,
  action text not null,
  target_type text not null,
  target_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  foreign key (workspace_id, actor_user_id) references workspace_memberships(workspace_id, user_id)
);

create index templates_list_idx on message_templates (workspace_id, status, name);
create index outbound_intents_dispatch_idx on outbound_intents (workspace_id, status, created_at) where status in ('queued', 'sending');
create index campaign_recipients_dispatch_idx on campaign_recipients (workspace_id, campaign_id, status);
create index consent_lookup_idx on consent_events (workspace_id, contact_id, channel, consent_type, occurred_at desc);
create index audit_events_history_idx on audit_events (workspace_id, created_at desc);

alter table message_templates enable row level security;
alter table outbound_intents enable row level security;
alter table campaigns enable row level security;
alter table campaign_recipients enable row level security;
alter table consent_events enable row level security;
alter table audit_events enable row level security;

create policy workspace_scope on message_templates using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on outbound_intents using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on campaigns using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on campaign_recipients using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on consent_events using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on audit_events using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
