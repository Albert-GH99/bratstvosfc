create extension if not exists "pgcrypto";

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  subdomain text unique not null,
  custom_domain text unique,
  status text not null default 'active',
  plan text not null default 'starter',
  system_type text,
  branding jsonb not null default '{}'::jsonb,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.tenant_users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  must_change_password boolean not null default true,
  status text not null default 'approved',
  created_at timestamptz not null default now(),
  unique (tenant_id, user_id)
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  request_id text unique,
  business_name text not null,
  owner_name text,
  email text,
  whatsapp text,
  phone text,
  industry text,
  selected_system text,
  selected_package text,
  maintenance_plan text default 'none',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.client_systems (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  system_name text,
  package_name text,
  plan_name text,
  system_url text,
  dashboard_url text,
  username text,
  status text not null default 'active',
  renewal_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'owner',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  price numeric(12, 2) not null default 0,
  stock integer not null default 0,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  customer_name text,
  customer_phone text,
  items jsonb not null default '[]'::jsonb,
  total_amount numeric(12, 2) not null default 0,
  status text not null default 'new',
  source text not null default 'website',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  name text,
  email text,
  phone text,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.setup_requests (
  id uuid primary key default gen_random_uuid(),
  -- Public reference shown to the customer after submit.
  request_id text not null unique,
  -- Business and owner details from the setup form.
  business_name text not null,
  owner_name text,
  -- Contact details used by the internal sales/admin team.
  whatsapp text,
  email text not null,
  industry text,
  -- Selected setup options from the package/system step.
  system_name text,
  package_name text,
  plan_name text,
  -- Extra context from the customer.
  notes text,
  -- New requests stay pending until reviewed internally.
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by text
);

create table if not exists public.payment_invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_id text not null unique,
  request_id text not null references public.setup_requests(request_id) on delete cascade,
  client_name text,
  email text,
  whatsapp text,
  package_name text,
  plan_name text,
  amount numeric(12, 2) not null default 0,
  deposit_amount numeric(12, 2) not null default 0,
  balance_amount numeric(12, 2) not null default 0,
  payment_status text not null default 'awaiting_payment',
  reference_code text not null,
  receipt_path text,
  receipt_file_name text,
  receipt_uploaded_at timestamptz,
  verified_at timestamptz,
  reviewed_by text,
  created_at timestamptz not null default now()
);

create table if not exists public.request_logs (
  id uuid primary key default gen_random_uuid(),
  request_id text not null,
  action text not null,
  actor_email text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'client',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists assigned_role text;
alter table public.profiles add column if not exists last_active_at timestamptz;
alter table public.profiles add column if not exists must_change_password boolean not null default false;

alter table public.payment_invoices add column if not exists client_name text;
alter table public.payment_invoices add column if not exists email text;
alter table public.payment_invoices add column if not exists whatsapp text;
alter table public.payment_invoices add column if not exists package_name text;
alter table public.payment_invoices add column if not exists plan_name text;
alter table public.payment_invoices add column if not exists amount numeric(12, 2) not null default 0;
alter table public.payment_invoices add column if not exists deposit_amount numeric(12, 2) not null default 0;
alter table public.payment_invoices add column if not exists balance_amount numeric(12, 2) not null default 0;
alter table public.payment_invoices add column if not exists payment_status text not null default 'awaiting_payment';
alter table public.payment_invoices add column if not exists reference_code text;
alter table public.payment_invoices add column if not exists receipt_path text;
alter table public.payment_invoices add column if not exists receipt_file_name text;
alter table public.payment_invoices add column if not exists receipt_uploaded_at timestamptz;
alter table public.payment_invoices add column if not exists verified_at timestamptz;
alter table public.payment_invoices add column if not exists reviewed_by text;

alter table public.clients add column if not exists request_id text;
alter table public.clients add column if not exists whatsapp text;
alter table public.clients add column if not exists tenant_id uuid references public.tenants(id) on delete set null;
alter table public.clients alter column status set default 'active';

alter table public.products add column if not exists tenant_id uuid references public.tenants(id) on delete cascade;
alter table public.products alter column client_id drop not null;
alter table public.products add column if not exists image_url text;
alter table public.products add column if not exists image_path text;
alter table public.products add column if not exists gallery jsonb not null default '[]'::jsonb;
alter table public.orders add column if not exists tenant_id uuid references public.tenants(id) on delete cascade;
alter table public.orders alter column client_id drop not null;
alter table public.tenants add column if not exists logo_url text;
alter table public.tenants add column if not exists logo_path text;
alter table public.tenants add column if not exists banner_url text;
alter table public.tenants add column if not exists banner_path text;
alter table public.tenants add column if not exists favicon_url text;
alter table public.tenants add column if not exists favicon_path text;

create table if not exists public.tenant_media (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  category text not null default 'misc',
  file_name text,
  file_path text not null,
  file_url text not null,
  mime_type text,
  size integer,
  metadata jsonb not null default '{}'::jsonb,
  uploaded_by uuid,
  created_at timestamptz not null default now()
);

alter table public.setup_requests add column if not exists notes text;
alter table public.setup_requests add column if not exists reviewed_at timestamptz;
alter table public.setup_requests add column if not exists reviewed_by text;
alter table public.setup_requests add column if not exists approved_at timestamptz;
alter table public.setup_requests add column if not exists temp_password text;
alter table public.setup_requests add column if not exists must_change_password boolean not null default true;

create unique index if not exists clients_request_id_unique
on public.clients (request_id);

create unique index if not exists tenants_subdomain_unique
on public.tenants (subdomain);

create unique index if not exists tenants_custom_domain_unique
on public.tenants (custom_domain)
where custom_domain is not null and custom_domain <> '';

create index if not exists products_tenant_id_idx
on public.products (tenant_id);

create index if not exists tenant_media_tenant_id_idx
on public.tenant_media (tenant_id);

create index if not exists tenant_media_category_idx
on public.tenant_media (category);

create index if not exists orders_tenant_id_idx
on public.orders (tenant_id);

create index if not exists customers_tenant_id_idx
on public.customers (tenant_id);

create unique index if not exists client_systems_client_id_unique
on public.client_systems (client_id);

create unique index if not exists payment_invoices_request_id_unique
on public.payment_invoices (request_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'payment-receipts',
  'payment-receipts',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tenant-assets',
  'tenant-assets',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.provision_client_from_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_client_id uuid;
  selected_system text;
begin
  selected_system := coalesce(new.raw_user_meta_data->>'selected_system', 'Custom System');

  insert into public.clients (
    request_id,
    business_name,
    owner_name,
    email,
    whatsapp,
    phone,
    industry,
    selected_system,
    selected_package,
    maintenance_plan,
    status
  )
  values (
    new.raw_user_meta_data->>'request_id',
    coalesce(new.raw_user_meta_data->>'business_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'full_name',
    new.email,
    coalesce(new.raw_user_meta_data->>'whatsapp', new.raw_user_meta_data->>'phone'),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'industry',
    selected_system,
    new.raw_user_meta_data->>'selected_package',
    coalesce(new.raw_user_meta_data->>'maintenance_plan', 'none'),
    coalesce(new.raw_user_meta_data->>'status', 'onboarding')
  )
  returning id into new_client_id;

  insert into public.users (id, client_id, email, full_name, role, status)
  values (
    new.id,
    new_client_id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    'owner',
    'active'
  );

  insert into public.products (client_id, name, price, stock, status)
  values
    (new_client_id, 'Starter Item', 49.00, 20, 'active'),
    (new_client_id, 'Priority Add-on', 99.00, 10, 'active'),
    (new_client_id, selected_system || ' Setup', 150.00, 1, 'active');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_provision_client on auth.users;

create trigger on_auth_user_created_provision_client
after insert on auth.users
for each row execute function public.provision_client_from_auth();

alter table public.clients enable row level security;
alter table public.tenants enable row level security;
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.customers enable row level security;
alter table public.tenant_media enable row level security;
alter table public.setup_requests enable row level security;
alter table public.client_systems enable row level security;
alter table public.payment_invoices enable row level security;
alter table public.request_logs enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile"
on public.profiles for select
using (
  lower(email) = lower(auth.jwt() ->> 'email')
  or lower(auth.jwt() ->> 'email') = 'admin@bratstvosfc.com'
);

drop policy if exists "public can read active tenants" on public.tenants;
create policy "public can read active tenants"
on public.tenants for select
to anon, authenticated
using (status = 'active');

drop policy if exists "public can read active tenant products" on public.products;
create policy "public can read active tenant products"
on public.products for select
to anon, authenticated
using (
  tenant_id is not null
  and coalesce(status, 'active') <> 'inactive'
  and exists (
    select 1 from public.tenants t
    where t.id = products.tenant_id
      and t.status = 'active'
  )
);

drop policy if exists "public can read active tenant media" on public.tenant_media;
create policy "public can read active tenant media"
on public.tenant_media for select
to anon, authenticated
using (
  exists (
    select 1 from public.tenants t
    where t.id = tenant_media.tenant_id
      and t.status = 'active'
  )
);

create policy "owners can read own client"
on public.clients for select
using (
  exists (
    select 1 from public.users u
    where u.client_id = clients.id
      and u.id = auth.uid()
  )
);

create policy "authenticated can create client during onboarding"
on public.clients for insert
to authenticated
with check (true);

create policy "owners can read own profile"
on public.users for select
using (id = auth.uid());

create policy "authenticated can create own profile link"
on public.users for insert
to authenticated
with check (id = auth.uid());

create policy "owners can manage own products"
on public.products for all
using (
  exists (
    select 1 from public.users u
    where u.client_id = products.client_id
      and u.id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.client_id = products.client_id
      and u.id = auth.uid()
  )
);

create policy "owners can manage own orders"
on public.orders for all
using (
  exists (
    select 1 from public.users u
    where u.client_id = orders.client_id
      and u.id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.client_id = orders.client_id
      and u.id = auth.uid()
  )
);

create policy "anyone can create setup requests"
on public.setup_requests for insert
to anon, authenticated
with check (true);

drop policy if exists "owners can read own systems" on public.client_systems;
create policy "owners can read own systems"
on public.client_systems for select
using (
  exists (
    select 1 from public.users u
    where u.client_id = client_systems.client_id
      and u.id = auth.uid()
  )
);

drop policy if exists "public can upload payment receipts" on storage.objects;
create policy "public can upload payment receipts"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'payment-receipts');

create table if not exists public.client_users (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  auth_user_id uuid,
  tenant_id uuid references public.tenants(id) on delete cascade,
  email text,
  full_name text,
  business_name text,
  owner_name text,
  client_website text,
  role text not null default 'owner',
  status text not null default 'active',
  must_change_password boolean not null default true,
  created_at timestamptz not null default now()
);

drop policy if exists "public can read tenant assets" on storage.objects;
create policy "public can read tenant assets"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'tenant-assets');

drop policy if exists "tenant users can upload own tenant assets" on storage.objects;
create policy "tenant users can upload own tenant assets"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'tenant-assets'
  and exists (
    select 1 from public.client_users cu
    where cu.client_id::text = split_part(storage.objects.name, '/', 1)
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

drop policy if exists "tenant users can update own tenant assets" on storage.objects;
create policy "tenant users can update own tenant assets"
on storage.objects for update
to authenticated
using (
  bucket_id = 'tenant-assets'
  and exists (
    select 1 from public.client_users cu
    where cu.client_id::text = split_part(storage.objects.name, '/', 1)
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
)
with check (
  bucket_id = 'tenant-assets'
  and exists (
    select 1 from public.client_users cu
    where cu.client_id::text = split_part(storage.objects.name, '/', 1)
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

drop policy if exists "tenant users can delete own tenant assets" on storage.objects;
create policy "tenant users can delete own tenant assets"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'tenant-assets'
  and exists (
    select 1 from public.client_users cu
    where cu.client_id::text = split_part(storage.objects.name, '/', 1)
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

-- Current admin approval flow tables.
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.client_users (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'owner',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.client_projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  setup_request_id uuid references public.setup_requests(id) on delete set null,
  system_id text,
  system_name text,
  package_name text,
  plan_name text,
  live_url text not null default '',
  dashboard_url text not null default '/dashboard',
  access_status text not null default 'active',
  created_at timestamptz not null default now()
);

alter table public.setup_requests add column if not exists client_id uuid references public.clients(id) on delete set null;
alter table public.setup_requests add column if not exists tenant_id uuid references public.tenants(id) on delete set null;
alter table public.setup_requests add column if not exists phone text;
alter table public.setup_requests add column if not exists system_id text;
alter table public.setup_requests add column if not exists selected_system text;
alter table public.setup_requests add column if not exists selected_package text;
alter table public.setup_requests add column if not exists admin_notes text;
alter table public.setup_requests add column if not exists admin_note text;
alter table public.setup_requests add column if not exists payment_status text not null default 'unpaid';
alter table public.setup_requests alter column payment_status set default 'pending_review';
alter table public.setup_requests add column if not exists invoice_status text not null default 'not_sent';
alter table public.setup_requests add column if not exists client_website text;
alter table public.setup_requests add column if not exists client_website_status text not null default 'pending_setup';
alter table public.setup_requests add column if not exists client_email_sent boolean not null default false;
alter table public.setup_requests add column if not exists client_user_id uuid;
alter table public.setup_requests add column if not exists domain_type text not null default 'bratstvo_domain';
alter table public.setup_requests alter column domain_type set default 'bratstvo_domain';
alter table public.setup_requests add column if not exists custom_domain text;
alter table public.setup_requests add column if not exists requested_domain_name text;
alter table public.setup_requests add column if not exists requested_domain_extension text;
alter table public.setup_requests add column if not exists requested_full_domain text;
alter table public.setup_requests add column if not exists domain_status text not null default 'not_requested';
alter table public.setup_requests add column if not exists selected_domain text;
alter table public.setup_requests add column if not exists selected_domain_extension text;
alter table public.setup_requests add column if not exists domain_yearly_price numeric(12, 2) not null default 0;
alter table public.setup_requests add column if not exists domain_check_status text not null default 'not_requested';
alter table public.setup_requests add column if not exists domain_provider_preference text;
alter table public.setup_requests add column if not exists domain_requires_manual_confirmation boolean not null default false;
alter table public.setup_requests add column if not exists setup_price numeric(12, 2) not null default 0;
alter table public.setup_requests add column if not exists plan_price numeric(12, 2) not null default 0;
alter table public.setup_requests add column if not exists billing_plan text not null default 'monthly';
alter table public.setup_requests add column if not exists domain_price numeric(12, 2) not null default 0;
alter table public.setup_requests add column if not exists total_amount numeric(12, 2) not null default 0;
alter table public.setup_requests add column if not exists amount_paid numeric(12, 2) not null default 0;
alter table public.setup_requests add column if not exists balance_amount numeric(12, 2) not null default 0;
alter table public.setup_requests add column if not exists payment_instruction_status text not null default 'pending_review';
alter table public.setup_requests add column if not exists payment_method text not null default 'manual_bank';
alter table public.setup_requests add column if not exists payment_instruction_sent_at timestamptz;
alter table public.setup_requests add column if not exists receipt_url text;
alter table public.setup_requests add column if not exists payment_notes text;
alter table public.client_users alter column user_id drop not null;
alter table public.client_users alter column client_id drop not null;
alter table public.client_users alter column status set default 'active';
alter table public.client_users alter column role set default 'owner';
alter table public.client_users add column if not exists auth_user_id uuid;
alter table public.client_users add column if not exists tenant_id uuid references public.tenants(id) on delete cascade;
alter table public.client_users add column if not exists business_name text;
alter table public.client_users add column if not exists owner_name text;
alter table public.client_users add column if not exists client_website text;
alter table public.client_users add column if not exists must_change_password boolean not null default true;

create unique index if not exists client_users_user_id_unique
on public.client_users (user_id);

create unique index if not exists client_users_auth_user_id_unique
on public.client_users (auth_user_id);

create unique index if not exists client_users_email_unique
on public.client_users (email);

create unique index if not exists client_projects_setup_request_id_unique
on public.client_projects (setup_request_id);

create index if not exists setup_requests_tenant_id_idx
on public.setup_requests (tenant_id);

create index if not exists tenant_users_tenant_id_idx
on public.tenant_users (tenant_id);

create index if not exists tenant_users_user_id_idx
on public.tenant_users (user_id);

create index if not exists client_users_tenant_id_idx
on public.client_users (tenant_id);

create index if not exists client_users_client_id_idx
on public.client_users (client_id);

alter table public.client_projects add column if not exists tenant_id uuid references public.tenants(id) on delete cascade;

create index if not exists client_projects_tenant_id_idx
on public.client_projects (tenant_id);

drop trigger if exists on_auth_user_created_provision_client on auth.users;
drop function if exists public.provision_client_from_auth();

alter table public.admin_users enable row level security;
alter table public.tenant_users enable row level security;
alter table public.client_users enable row level security;
alter table public.client_projects enable row level security;

drop policy if exists "tenant users can read own membership" on public.tenant_users;
create policy "tenant users can read own membership"
on public.tenant_users for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "tenant users can update own password flag" on public.tenant_users;
create policy "tenant users can update own password flag"
on public.tenant_users for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "tenant users can read own tenant" on public.tenants;
create policy "tenant users can read own tenant"
on public.tenants for select
to authenticated
using (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = tenants.id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

drop policy if exists "tenant users can update own tenant branding" on public.tenants;
create policy "tenant users can update own tenant branding"
on public.tenants for update
to authenticated
using (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = tenants.id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
)
with check (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = tenants.id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

drop policy if exists "tenant users can manage own products" on public.products;
create policy "tenant users can manage own products"
on public.products for all
using (
  tenant_id is not null
  and exists (
    select 1 from public.client_users cu
    where cu.client_id = products.tenant_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
)
with check (
  tenant_id is not null
  and exists (
    select 1 from public.client_users cu
    where cu.client_id = products.tenant_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

drop policy if exists "tenant users can manage own orders" on public.orders;
create policy "tenant users can manage own orders"
on public.orders for all
using (
  tenant_id is not null
  and exists (
    select 1 from public.client_users cu
    where cu.client_id = orders.tenant_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
)
with check (
  tenant_id is not null
  and exists (
    select 1 from public.client_users cu
    where cu.client_id = orders.tenant_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

drop policy if exists "tenant users can manage own customers" on public.customers;
create policy "tenant users can manage own customers"
on public.customers for all
using (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = customers.tenant_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
)
with check (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = customers.tenant_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

drop policy if exists "tenant users can manage own media" on public.tenant_media;
create policy "tenant users can manage own media"
on public.tenant_media for all
using (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = tenant_media.tenant_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
)
with check (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = tenant_media.tenant_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
  )
);

drop policy if exists "admin users can read own row" on public.admin_users;
create policy "admin users can read own row"
on public.admin_users for select
using (id = auth.uid());

drop policy if exists "admins can read setup requests" on public.setup_requests;
create policy "admins can read setup requests"
on public.setup_requests for select
using (
  lower(auth.jwt() ->> 'email') = 'admin@bratstvosfc.com'
  or
  exists (
    select 1 from public.profiles p
    where lower(p.email) = lower(auth.jwt() ->> 'email')
      and p.role in ('owner', 'admin', 'staff', 'sales')
      and p.status = 'approved'
  )
);

drop policy if exists "admins can update setup requests" on public.setup_requests;
create policy "admins can update setup requests"
on public.setup_requests for update
using (
  lower(auth.jwt() ->> 'email') = 'admin@bratstvosfc.com'
  or
  exists (
    select 1 from public.profiles p
    where lower(p.email) = lower(auth.jwt() ->> 'email')
      and p.role in ('owner', 'admin', 'staff', 'sales')
      and p.status = 'approved'
  )
)
with check (
  lower(auth.jwt() ->> 'email') = 'admin@bratstvosfc.com'
  or
  exists (
    select 1 from public.profiles p
    where lower(p.email) = lower(auth.jwt() ->> 'email')
      and p.role in ('owner', 'admin', 'staff', 'sales')
      and p.status = 'approved'
  )
);

drop policy if exists "clients can read own setup requests" on public.setup_requests;
create policy "clients can read own setup requests"
on public.setup_requests for select
using (
  client_user_id = auth.uid()
  or lower(email) = lower(auth.jwt() ->> 'email')
);

drop policy if exists "clients can clear own temporary password" on public.setup_requests;
create policy "clients can clear own temporary password"
on public.setup_requests for update
using (client_user_id = auth.uid())
with check (client_user_id = auth.uid());

drop policy if exists "admins can create clients" on public.clients;
create policy "admins can create clients"
on public.clients for insert
with check (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
);

drop policy if exists "admins can read clients" on public.clients;
create policy "admins can read clients"
on public.clients for select
using (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
);

drop policy if exists "admins can update clients" on public.clients;
create policy "admins can update clients"
on public.clients for update
using (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
);

drop policy if exists "owners can read own client via client_users" on public.clients;
create policy "owners can read own client via client_users"
on public.clients for select
using (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = clients.id
      and (
        cu.user_id = auth.uid()
        or lower(cu.email) = lower(auth.jwt() ->> 'email')
      )
  )
);

drop policy if exists "owners can read own client user" on public.client_users;
create policy "owners can read own client user"
on public.client_users for select
using (
  user_id = auth.uid()
  or auth_user_id = auth.uid()
  or lower(email) = lower(auth.jwt() ->> 'email')
);

drop policy if exists "authenticated can create own client user link" on public.client_users;
create policy "authenticated can create own client user link"
on public.client_users for insert
to authenticated
with check (
  user_id = auth.uid()
  or auth_user_id = auth.uid()
  or lower(email) = lower(auth.jwt() ->> 'email')
);

drop policy if exists "authenticated can update own client user link" on public.client_users;
create policy "authenticated can update own client user link"
on public.client_users for update
to authenticated
using (
  user_id = auth.uid()
  or auth_user_id = auth.uid()
  or lower(email) = lower(auth.jwt() ->> 'email')
)
with check (
  user_id = auth.uid()
  or auth_user_id = auth.uid()
  or lower(email) = lower(auth.jwt() ->> 'email')
);

drop policy if exists "admins can read client users" on public.client_users;
create policy "admins can read client users"
on public.client_users for select
using (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
);

drop policy if exists "admins can create client projects" on public.client_projects;
create policy "admins can create client projects"
on public.client_projects for insert
with check (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
);

drop policy if exists "admins can read client projects" on public.client_projects;
create policy "admins can read client projects"
on public.client_projects for select
using (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
);

drop policy if exists "admins can update client projects" on public.client_projects;
create policy "admins can update client projects"
on public.client_projects for update
using (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users a
    where a.id = auth.uid()
  )
);

drop policy if exists "owners can read own client projects" on public.client_projects;
create policy "owners can read own client projects"
on public.client_projects for select
using (
  exists (
    select 1 from public.client_users cu
    where cu.client_id = client_projects.client_id
      and (
        cu.user_id = auth.uid()
        or lower(cu.email) = lower(auth.jwt() ->> 'email')
      )
  )
);
