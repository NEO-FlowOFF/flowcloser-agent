-- Tabela de leads com suporte a múltiplas contas Meta
create extension if not exists "uuid-ossp";

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null default 'Lead',
  company text not null default 'N/A',
  score integer not null default 0,
  budget text not null default 'unknown',
  qualified boolean default false,

  -- Identificação da conta/meta
  page_id text not null,
  platform text not null,
  account_name text not null,
  user_platform_id text not null,

  -- Dados do lead
  project_type text,
  urgency text,
  contact_preference text,

  -- Proposta
  proposal_url text,
  proposal_type text,

  -- Status
  status text default 'new',

  -- Timestamps
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now()),
  last_contact_at timestamp with time zone
);

create unique index if not exists leads_page_user_idx on leads(page_id, user_platform_id);
create index if not exists leads_created_at_idx on leads(created_at);

create or replace function set_leads_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_leads_updated_at on leads;
create trigger trg_set_leads_updated_at
before update on leads
for each row
execute procedure set_leads_updated_at();
