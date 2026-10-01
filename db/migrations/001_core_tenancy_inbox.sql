-- ConvoFlow core data model. Apply with a restricted migration role to PostgreSQL 15+.
-- The normal application role must not own these tables or hold BYPASSRLS.

create extension if not exists pgcrypto;

create schema if not exists app;

create function app.current_workspace_id()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('app.workspace_id', true), '')::uuid
$$;

create table workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,62}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table app_users (
  id uuid primary key default gen_random_uuid(),
  oidc_subject text not null unique,
  email text not null,
  display_name text not null,
  created_at timestamptz not null default now()
);

create type membership_role as enum ('owner', 'admin', 'manager', 'agent', 'analyst', 'viewer');
create type channel_kind as enum ('whatsapp_cloud', 'webchat', 'facebook', 'instagram', 'telegram', 'line', 'sms');
create type conversation_status as enum ('open', 'closed', 'snoozed');
create type message_direction as enum ('inbound', 'outbound', 'automation', 'system');
create type message_delivery_status as enum ('pending', 'accepted', 'sent', 'delivered', 'read', 'failed', 'unknown');
create type flow_status as enum ('draft', 'published', 'archived');
create type outbox_status as enum ('pending', 'processing', 'completed', 'failed');

create table workspace_memberships (
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references app_users(id) on delete cascade,
  role membership_role not null,
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table channel_connections (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  kind channel_kind not null,
  provider_account_id text not null,
  credential_reference text not null,
  capabilities jsonb not null default '{}'::jsonb,
  health jsonb not null default '{}'::jsonb,
  connected_at timestamptz,
  disconnected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, kind, provider_account_id),
  unique (workspace_id, id)
);

create table contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  display_name text,
  attributes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id)
);

create table channel_identities (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  contact_id uuid not null,
  connection_id uuid not null,
  provider_user_id text not null,
  normalized_address text,
  display_name text,
  created_at timestamptz not null default now(),
  unique (workspace_id, connection_id, provider_user_id),
  unique (workspace_id, id),
  foreign key (workspace_id, contact_id) references contacts(workspace_id, id) on delete cascade,
  foreign key (workspace_id, connection_id) references channel_connections(workspace_id, id) on delete cascade
);

create table conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  connection_id uuid not null,
  contact_id uuid not null,
  status conversation_status not null default 'open',
  automation_paused_until timestamptz,
  assigned_user_id uuid,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id),
  foreign key (workspace_id, connection_id) references channel_connections(workspace_id, id),
  foreign key (workspace_id, contact_id) references contacts(workspace_id, id),
  foreign key (workspace_id, assigned_user_id) references workspace_memberships(workspace_id, user_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  conversation_id uuid not null,
  connection_id uuid not null,
  direction message_direction not null,
  provider_message_id text,
  client_intent_id uuid,
  body jsonb not null,
  delivery_status message_delivery_status not null default 'pending',
  sent_at timestamptz,
  received_at timestamptz,
  created_at timestamptz not null default now(),
  unique (workspace_id, id),
  unique nulls not distinct (workspace_id, connection_id, provider_message_id),
  unique nulls not distinct (workspace_id, client_intent_id),
  foreign key (workspace_id, conversation_id) references conversations(workspace_id, id) on delete cascade,
  foreign key (workspace_id, connection_id) references channel_connections(workspace_id, id)
);

create table message_status_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  message_id uuid not null,
  status message_delivery_status not null,
  provider_event_id text,
  occurred_at timestamptz not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique nulls not distinct (workspace_id, provider_event_id),
  foreign key (workspace_id, message_id) references messages(workspace_id, id) on delete cascade
);

create table flows (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 160),
  status flow_status not null default 'draft',
  draft_revision integer not null default 1 check (draft_revision > 0),
  draft_graph jsonb not null default '{"nodes":[],"edges":[],"schemaVersion":1}'::jsonb,
  published_version integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id),
  unique nulls not distinct (workspace_id, id, published_version)
);

create table flow_versions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  flow_id uuid not null,
  version integer not null check (version > 0),
  graph jsonb not null,
  compiled_definition jsonb not null,
  published_by uuid not null,
  published_at timestamptz not null default now(),
  unique (workspace_id, id),
  unique (workspace_id, flow_id, version),
  foreign key (workspace_id, flow_id) references flows(workspace_id, id) on delete cascade,
  foreign key (workspace_id, published_by) references workspace_memberships(workspace_id, user_id)
);

create table webhook_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  connection_id uuid not null,
  provider_event_id text not null,
  payload jsonb not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_error text,
  unique (workspace_id, connection_id, provider_event_id),
  foreign key (workspace_id, connection_id) references channel_connections(workspace_id, id) on delete cascade
);

create table outbox_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  topic text not null,
  deduplication_key text not null,
  payload jsonb not null,
  status outbox_status not null default 'pending',
  attempts integer not null default 0 check (attempts >= 0),
  available_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (workspace_id, deduplication_key)
);

create index conversations_inbox_idx on conversations (workspace_id, status, last_message_at desc nulls last);
create index messages_timeline_idx on messages (workspace_id, conversation_id, created_at);
create index identities_contact_idx on channel_identities (workspace_id, contact_id);
create index webhook_events_pending_idx on webhook_events (workspace_id, received_at) where processed_at is null;
create index outbox_events_dispatch_idx on outbox_events (status, available_at) where status in ('pending', 'processing');

alter table workspace_memberships enable row level security;
alter table channel_connections enable row level security;
alter table contacts enable row level security;
alter table channel_identities enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table message_status_events enable row level security;
alter table flows enable row level security;
alter table flow_versions enable row level security;
alter table webhook_events enable row level security;
alter table outbox_events enable row level security;

create policy workspace_scope on workspace_memberships using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on channel_connections using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on contacts using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on channel_identities using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on conversations using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on messages using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on message_status_events using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on flows using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on flow_versions using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on webhook_events using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
create policy workspace_scope on outbox_events using (workspace_id = app.current_workspace_id()) with check (workspace_id = app.current_workspace_id());
