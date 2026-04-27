create extension if not exists "pgcrypto";

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
alter table public.clients alter column status set default 'active';

alter table public.setup_requests add column if not exists notes text;
alter table public.setup_requests add column if not exists reviewed_at timestamptz;
alter table public.setup_requests add column if not exists reviewed_by text;

create unique index if not exists clients_request_id_unique
on public.clients (request_id);

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
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.setup_requests enable row level security;
alter table public.client_systems enable row level security;
alter table public.payment_invoices enable row level security;
alter table public.request_logs enable row level security;

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
