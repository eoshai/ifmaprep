-- Execute o arquivo inteiro no SQL Editor do projeto Supabase (como postgres).
-- Só a conta já existente e com e-mail confirmado indicada abaixo recebe acesso.
-- Não coloque service_role no navegador. Este script não muda tabelas do app.
begin;

create schema if not exists ifma_admin_private;
revoke all on schema ifma_admin_private from public, anon, authenticated;
create table if not exists ifma_admin_private.administrators (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now()
);
alter table ifma_admin_private.administrators enable row level security;
revoke all on table ifma_admin_private.administrators from public, anon, authenticated;

-- Concede pelo UUID da conta, não por um campo editável do perfil.
do $$
declare owner_id uuid;
begin
  select u.id into owner_id
  from auth.users u
  where lower(btrim(u.email)) = 'gabriel.shai@icloud.com'
    and u.email_confirmed_at is not null
    and u.deleted_at is null;
  if owner_id is null then
    raise exception 'A conta administradora não foi encontrada ou o e-mail ainda não foi confirmado. Confirme a conta gabriel.shai@icloud.com e execute novamente.';
  end if;
  insert into ifma_admin_private.administrators(user_id)
  values (owner_id) on conflict (user_id) do nothing;
end;
$$;

create or replace function public.ifma_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from ifma_admin_private.administrators a
    join auth.users u on u.id = a.user_id
    where a.user_id = auth.uid()
      and u.email_confirmed_at is not null
      and u.deleted_at is null
  );
$$;

create or replace function public.ifma_admin_list_users(
  p_query text default '',
  p_status text default 'all',
  p_limit integer default 25,
  p_offset integer default 0
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_query text := lower(left(btrim(coalesce(p_query, '')), 100));
  v_status text := coalesce(p_status, 'all');
  v_limit integer := greatest(1, least(coalesce(p_limit, 25), 100));
  v_offset integer := greatest(0, least(coalesce(p_offset, 0), 1000000));
  v_metrics jsonb;
  v_filtered bigint;
  v_users jsonb;
begin
  if not public.ifma_is_admin() then
    raise exception using errcode = '42501', message = 'Acesso restrito ao administrador.';
  end if;
  if v_status not in ('all', 'confirmed', 'pending') then
    raise exception using errcode = '22023', message = 'Filtro inválido.';
  end if;

  select jsonb_build_object(
    'total', count(*),
    'confirmed', count(*) filter (where u.email_confirmed_at is not null),
    'pending', count(*) filter (where u.email_confirmed_at is null),
    'new_7d', count(*) filter (where u.created_at >= now() - interval '7 days')
  ) into v_metrics
  from auth.users u where u.email is not null and u.deleted_at is null;

  with accounts as (
    select u.email,
      coalesce(nullif(btrim(u.raw_user_meta_data ->> 'name'), ''),
               nullif(btrim(u.raw_user_meta_data ->> 'full_name'), '')) as name,
      u.created_at, u.email_confirmed_at, u.last_sign_in_at, u.id
    from auth.users u where u.email is not null and u.deleted_at is null
  )
  select count(*) into v_filtered from accounts a
  where (v_query = '' or strpos(lower(a.email), v_query) > 0 or strpos(lower(coalesce(a.name, '')), v_query) > 0)
    and (v_status = 'all' or (v_status = 'confirmed' and a.email_confirmed_at is not null)
         or (v_status = 'pending' and a.email_confirmed_at is null));

  with accounts as (
    select u.email,
      coalesce(nullif(btrim(u.raw_user_meta_data ->> 'name'), ''),
               nullif(btrim(u.raw_user_meta_data ->> 'full_name'), '')) as name,
      u.created_at, u.email_confirmed_at, u.last_sign_in_at, u.id
    from auth.users u where u.email is not null and u.deleted_at is null
  ), page as (
    select a.email, a.name, a.created_at, a.email_confirmed_at, a.last_sign_in_at, a.id
    from accounts a
    where (v_query = '' or strpos(lower(a.email), v_query) > 0 or strpos(lower(coalesce(a.name, '')), v_query) > 0)
      and (v_status = 'all' or (v_status = 'confirmed' and a.email_confirmed_at is not null)
           or (v_status = 'pending' and a.email_confirmed_at is null))
    order by a.created_at desc, a.id desc
    limit v_limit offset v_offset
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'email', p.email, 'name', p.name, 'created_at', p.created_at,
    'email_confirmed_at', p.email_confirmed_at, 'last_sign_in_at', p.last_sign_in_at
  ) order by p.created_at desc, p.id desc), '[]'::jsonb) into v_users from page p;

  return jsonb_build_object('metrics', v_metrics, 'filtered', v_filtered,
    'limit', v_limit, 'offset', v_offset, 'has_more', v_offset + v_limit < v_filtered,
    'users', v_users, 'generated_at', now());
end;
$$;

revoke all on function public.ifma_is_admin() from public, anon, authenticated;
revoke all on function public.ifma_admin_list_users(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.ifma_is_admin() to authenticated;
grant execute on function public.ifma_admin_list_users(text, text, integer, integer) to authenticated;

notify pgrst, 'reload schema';
commit;
