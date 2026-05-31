create extension if not exists "pgcrypto";

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default '',
  owner_name text,
  email text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.client_users (
  id uuid primary key default gen_random_uuid(),
  client_id uuid,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'owner',
  must_change_password boolean not null default true,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

alter table public.client_users add column if not exists client_id uuid;
alter table public.client_users add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.client_users add column if not exists role text not null default 'owner';
alter table public.client_users add column if not exists must_change_password boolean not null default true;
alter table public.client_users add column if not exists status text not null default 'active';
alter table public.client_users add column if not exists created_at timestamptz not null default now();

alter table public.client_users alter column role set default 'owner';
alter table public.client_users alter column status set default 'active';

create index if not exists client_users_client_id_idx on public.client_users (client_id);
create index if not exists client_users_user_id_idx on public.client_users (user_id);
create unique index if not exists client_users_user_id_unique on public.client_users (user_id);

do $$
begin
  if to_regclass('public.tenant_users') is not null and to_regclass('public.tenants') is not null then
    execute $sql$
      insert into public.clients (
        id,
        business_name,
        owner_name,
        email,
        status,
        created_at
      )
      select
        t.id,
        t.business_name,
        '',
        '',
        'active',
        coalesce(t.created_at, now())
      from public.tenants t
      where exists (
        select 1
        from public.tenant_users tu
        where tu.tenant_id = t.id
      )
      on conflict (id) do update
      set
        business_name = excluded.business_name,
        status = 'active'
    $sql$;

    execute $sql$
      insert into public.client_users (
        client_id,
        user_id,
        role,
        must_change_password,
        status,
        created_at
      )
      select
        tu.tenant_id,
        tu.user_id,
        coalesce(nullif(tu.role, ''), 'owner'),
        coalesce(tu.must_change_password, true),
        case
          when lower(coalesce(tu.status, 'active')) in ('approved', 'active') then 'active'
          else lower(coalesce(tu.status, 'inactive'))
        end,
        coalesce(tu.created_at, now())
      from public.tenant_users tu
      where tu.user_id is not null
      on conflict (user_id) do update
      set
        client_id = excluded.client_id,
        role = excluded.role,
        must_change_password = excluded.must_change_password,
        status = excluded.status
    $sql$;
  end if;
end $$;

alter table public.client_users enable row level security;

drop policy if exists "client users can read own membership" on public.client_users;
create policy "client users can read own membership"
on public.client_users for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "client users can update own password flag" on public.client_users;
create policy "client users can update own password flag"
on public.client_users for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
