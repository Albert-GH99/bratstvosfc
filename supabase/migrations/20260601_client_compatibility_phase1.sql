-- SUPABASE PHASE 1 - CLIENT COMPATIBILITY MIGRATION ONLY
--
-- What this does:
-- 1. Ensures public.clients can carry the same client-facing runtime data
--    currently stored in public.tenants.
-- 2. Backfills public.clients from public.tenants using the same UUID id.
-- 3. Adds future client_id compatibility columns to products, orders,
--    customers and tenant_media.
-- 4. Backfills client_id from tenant_id where client_id is missing.
-- 5. Adds indexes for future client_id lookups.
--
-- What this intentionally does NOT do:
-- - Does not delete tables.
-- - Does not rename tables.
-- - Does not drop tenant_id.
-- - Does not remove public.tenants.
-- - Does not remove public.tenant_media.
-- - Does not rename the tenant-assets storage bucket.

begin;

create extension if not exists "pgcrypto";

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default '',
  owner_name text,
  email text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

alter table public.clients add column if not exists subdomain text;
alter table public.clients add column if not exists custom_domain text;
alter table public.clients add column if not exists plan text;
alter table public.clients add column if not exists system_type text;
alter table public.clients add column if not exists branding jsonb default '{}'::jsonb;
alter table public.clients add column if not exists settings jsonb default '{}'::jsonb;
alter table public.clients add column if not exists logo_url text;
alter table public.clients add column if not exists logo_path text;
alter table public.clients add column if not exists banner_url text;
alter table public.clients add column if not exists banner_path text;

update public.clients
set
  branding = coalesce(branding, '{}'::jsonb),
  settings = coalesce(settings, '{}'::jsonb);

alter table public.clients alter column branding set default '{}'::jsonb;
alter table public.clients alter column settings set default '{}'::jsonb;

insert into public.clients (
  id,
  business_name,
  subdomain,
  custom_domain,
  status,
  plan,
  system_type,
  branding,
  settings,
  logo_url,
  logo_path,
  banner_url,
  banner_path,
  created_at
)
select
  t.id,
  coalesce(nullif(t.business_name, ''), 'Client'),
  t.subdomain,
  t.custom_domain,
  coalesce(nullif(t.status, ''), 'active'),
  t.plan,
  t.system_type,
  coalesce(t.branding, '{}'::jsonb),
  coalesce(t.settings, '{}'::jsonb),
  t.logo_url,
  t.logo_path,
  t.banner_url,
  t.banner_path,
  coalesce(t.created_at, now())
from public.tenants t
on conflict (id) do update
set
  business_name = coalesce(nullif(public.clients.business_name, ''), excluded.business_name),
  subdomain = coalesce(public.clients.subdomain, excluded.subdomain),
  custom_domain = coalesce(public.clients.custom_domain, excluded.custom_domain),
  status = coalesce(nullif(public.clients.status, ''), excluded.status),
  plan = coalesce(nullif(public.clients.plan, ''), excluded.plan),
  system_type = coalesce(nullif(public.clients.system_type, ''), excluded.system_type),
  branding = case
    when public.clients.branding is null or public.clients.branding = '{}'::jsonb then excluded.branding
    else public.clients.branding
  end,
  settings = case
    when public.clients.settings is null or public.clients.settings = '{}'::jsonb then excluded.settings
    else public.clients.settings
  end,
  logo_url = coalesce(public.clients.logo_url, excluded.logo_url),
  logo_path = coalesce(public.clients.logo_path, excluded.logo_path),
  banner_url = coalesce(public.clients.banner_url, excluded.banner_url),
  banner_path = coalesce(public.clients.banner_path, excluded.banner_path);

alter table public.products add column if not exists client_id uuid;
alter table public.orders add column if not exists client_id uuid;
alter table public.customers add column if not exists client_id uuid;
alter table public.tenant_media add column if not exists client_id uuid;

update public.products
set client_id = tenant_id
where client_id is null
  and tenant_id is not null;

update public.orders
set client_id = tenant_id
where client_id is null
  and tenant_id is not null;

update public.customers
set client_id = tenant_id
where client_id is null
  and tenant_id is not null;

update public.tenant_media
set client_id = tenant_id
where client_id is null
  and tenant_id is not null;

create index if not exists clients_subdomain_idx on public.clients (subdomain);
create index if not exists clients_custom_domain_idx on public.clients (custom_domain);
create index if not exists products_client_id_idx on public.products (client_id);
create index if not exists orders_client_id_idx on public.orders (client_id);
create index if not exists customers_client_id_idx on public.customers (client_id);
create index if not exists tenant_media_client_id_idx on public.tenant_media (client_id);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_client_id_fkey'
      and conrelid = 'public.products'::regclass
  ) then
    alter table public.products
      add constraint products_client_id_fkey
      foreign key (client_id) references public.clients(id)
      on delete cascade
      not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_client_id_fkey'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders
      add constraint orders_client_id_fkey
      foreign key (client_id) references public.clients(id)
      on delete cascade
      not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'customers_client_id_fkey'
      and conrelid = 'public.customers'::regclass
  ) then
    alter table public.customers
      add constraint customers_client_id_fkey
      foreign key (client_id) references public.clients(id)
      on delete cascade
      not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'tenant_media_client_id_fkey'
      and conrelid = 'public.tenant_media'::regclass
  ) then
    alter table public.tenant_media
      add constraint tenant_media_client_id_fkey
      foreign key (client_id) references public.clients(id)
      on delete cascade
      not valid;
  end if;
end $$;

commit;

-- Rollback notes:
-- This migration is intentionally additive and compatibility-safe.
-- If rollback is required before any application code depends on client_id,
-- the optional rollback would be:
--
-- begin;
-- alter table public.tenant_media drop constraint if exists tenant_media_client_id_fkey;
-- alter table public.customers drop constraint if exists customers_client_id_fkey;
-- alter table public.orders drop constraint if exists orders_client_id_fkey;
-- alter table public.products drop constraint if exists products_client_id_fkey;
-- drop index if exists public.tenant_media_client_id_idx;
-- drop index if exists public.customers_client_id_idx;
-- drop index if exists public.orders_client_id_idx;
-- drop index if exists public.products_client_id_idx;
-- drop index if exists public.clients_custom_domain_idx;
-- drop index if exists public.clients_subdomain_idx;
-- alter table public.tenant_media drop column if exists client_id;
-- alter table public.customers drop column if exists client_id;
-- alter table public.orders drop column if exists client_id;
-- alter table public.products drop column if exists client_id;
-- alter table public.clients drop column if exists banner_path;
-- alter table public.clients drop column if exists banner_url;
-- alter table public.clients drop column if exists logo_path;
-- alter table public.clients drop column if exists logo_url;
-- alter table public.clients drop column if exists settings;
-- alter table public.clients drop column if exists branding;
-- alter table public.clients drop column if exists system_type;
-- alter table public.clients drop column if exists plan;
-- alter table public.clients drop column if exists custom_domain;
-- alter table public.clients drop column if exists subdomain;
-- commit;
