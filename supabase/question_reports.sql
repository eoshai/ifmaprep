-- Ativação única: executar após supabase/admin_setup.sql no mesmo projeto.
begin;
create table if not exists ifma_admin_private.question_reports (
 id uuid primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 question_id text not null,
 reference text not null,
 source text not null check(source in ('IFMA','Autoral','Simulado')),
 materia text not null,
 topic text not null,
 kind text not null check(kind in ('enunciado','gabarito','resolucao','imagem','outro')),
 description text not null check(char_length(description) between 10 and 2000),
 status text not null default 'open' check(status in ('open','reviewing','resolved')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table ifma_admin_private.question_reports enable row level security;
revoke all on table ifma_admin_private.question_reports from public,anon,authenticated;
create index if not exists question_reports_status_created_idx on ifma_admin_private.question_reports(status,created_at desc,id);
create index if not exists question_reports_user_created_idx on ifma_admin_private.question_reports(user_id,created_at desc);

create or replace function public.ifma_submit_question_report(p_id uuid,p_question text,p_reference text,p_source text,p_materia text,p_topic text,p_kind text,p_description text)
returns uuid language plpgsql security definer set search_path='' as $$
declare v_uid uuid:=auth.uid(); v_owner uuid;
begin
 if v_uid is null then raise exception 'Autenticação necessária' using errcode='42501';end if;
 if p_id is null or p_question is null or p_question !~ '^(aut-[0-9]{3,}|20[0-9]{2}-[0-9]{1,2}|sim:[a-z0-9-]+:[0-9]{1,2})$'
 or p_source is null or p_source not in ('IFMA','Autoral','Simulado')
 or p_kind is null or p_kind not in ('enunciado','gabarito','resolucao','imagem','outro')
 or p_reference is null or char_length(btrim(p_reference)) not between 1 and 180
 or p_materia is null or char_length(p_materia)>80 or p_topic is null or char_length(p_topic)>300
 or p_description is null or char_length(btrim(p_description)) not between 10 and 2000
 then raise exception 'Relato inválido' using errcode='22023';end if;
 -- Serializa envios da mesma conta, inclusive reenvios concorrentes.
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_uid::text,0));
 select user_id into v_owner from ifma_admin_private.question_reports where id=p_id;
 if found then
  if v_owner<>v_uid then raise exception 'Relato indisponível' using errcode='42501';end if;
  return p_id;
 end if;
 if (select count(*) from ifma_admin_private.question_reports where user_id=v_uid and created_at>=now()-interval '1 day')>=30
 then raise exception 'Limite diário de relatos atingido' using errcode='P0001';end if;
 insert into ifma_admin_private.question_reports(id,user_id,question_id,reference,source,materia,topic,kind,description)
 values(p_id,v_uid,p_question,btrim(p_reference),p_source,p_materia,p_topic,p_kind,btrim(p_description));
 return p_id;
end;$$;

create or replace function public.ifma_admin_question_reports(p_status text default 'open',p_limit integer default 25,p_offset integer default 0)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_total bigint;v_rows jsonb;v_limit integer:=least(100,greatest(1,coalesce(p_limit,25)));v_offset integer:=greatest(0,coalesce(p_offset,0));
begin
 if not coalesce(public.ifma_is_admin(),false) then raise exception 'Acesso restrito' using errcode='42501';end if;
 if p_status is null or p_status not in ('all','open','reviewing','resolved') then raise exception 'Filtro inválido' using errcode='22023';end if;
 select count(*) into v_total from ifma_admin_private.question_reports where p_status='all' or status=p_status;
 select coalesce(jsonb_agg(to_jsonb(r) order by r.created_at desc,r.id),'[]'::jsonb) into v_rows from
 (select id,question_id,reference,source,materia,topic,kind,description,status,created_at,updated_at
 from ifma_admin_private.question_reports where p_status='all' or status=p_status order by created_at desc,id limit v_limit offset v_offset)r;
 return jsonb_build_object('total',v_total,'reports',v_rows,'limit',v_limit,'offset',v_offset);
end;$$;

create or replace function public.ifma_admin_set_question_report_status(p_id uuid,p_status text)
returns boolean language plpgsql security definer set search_path='' as $$
begin
 if not coalesce(public.ifma_is_admin(),false) then raise exception 'Acesso restrito' using errcode='42501';end if;
 if p_status is null or p_status not in ('open','reviewing','resolved') then raise exception 'Situação inválida' using errcode='22023';end if;
 update ifma_admin_private.question_reports set status=p_status,updated_at=now() where id=p_id;
 if not found then raise exception 'Relato não encontrado' using errcode='22023';end if;
 return true;
end;$$;
revoke all on function public.ifma_submit_question_report(uuid,text,text,text,text,text,text,text) from public,anon,authenticated;
revoke all on function public.ifma_admin_question_reports(text,integer,integer) from public,anon,authenticated;
revoke all on function public.ifma_admin_set_question_report_status(uuid,text) from public,anon,authenticated;
grant execute on function public.ifma_submit_question_report(uuid,text,text,text,text,text,text,text) to authenticated;
grant execute on function public.ifma_admin_question_reports(text,integer,integer) to authenticated;
grant execute on function public.ifma_admin_set_question_report_status(uuid,text) to authenticated;
notify pgrst,'reload schema';
commit;
