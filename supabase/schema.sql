create extension if not exists "pgcrypto";

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  owner_name text,
  email text,
  phone text,
  industry text,
  selected_system text,
  selected_package text,
  maintenance_plan text default 'none',
  status text not null default 'onboarding',
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
  created_at timestamptz not null default now()
);

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
    business_name,
    owner_name,
    email,
    phone,
    industry,
    selected_system,
    selected_package,
    maintenance_plan,
    status
  )
  values (
    coalesce(new.raw_user_meta_data->>'business_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'industry',
    selected_system,
    new.raw_user_meta_data->>'selected_package',
    coalesce(new.raw_user_meta_data->>'maintenance_plan', 'none'),
    'onboarding'
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
