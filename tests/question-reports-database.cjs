const fs=require('node:fs'),assert=require('node:assert/strict');
const {PGlite}=require('../.test-runtime/node_modules/@electric-sql/pglite');
(async()=>{const db=new PGlite();try{
 await db.exec(`create role anon;create role authenticated;create schema auth;grant usage on schema auth to anon,authenticated;
 create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz,created_at timestamptz not null default now(),last_sign_in_at timestamptz,raw_user_meta_data jsonb not null default '{}',deleted_at timestamptz);
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 insert into auth.users(id,email,email_confirmed_at) values('11111111-1111-1111-1111-111111111111','gabriel.shai@icloud.com',now()),('22222222-2222-2222-2222-222222222222','student@example.test',now()),('33333333-3333-3333-3333-333333333333','other@example.test',now());`);
 await db.exec(fs.readFileSync('supabase/admin_setup.sql','utf8'));
 const sql=fs.readFileSync('supabase/question_reports.sql','utf8');await db.exec(sql);await db.exec(sql);
 const as=async(uid,role='authenticated')=>{await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid]);await db.exec('set role '+role)};
 const id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',uid='22222222-2222-2222-2222-222222222222',admin='11111111-1111-1111-1111-111111111111';
 const submit=(key=id,description='O enunciado precisa de uma revisão.',kind='enunciado')=>db.query('select public.ifma_submit_question_report($1,$2,$3,$4,$5,$6,$7,$8) as id',[key,'aut-001','Autoral · Q1','Autoral','Português','Interpretação',kind,description]);
 const list=(status='all')=>db.query('select public.ifma_admin_question_reports($1,25,0) as data',[status]);
 await as('','anon');await assert.rejects(()=>submit(),e=>e.code==='42501');await assert.rejects(()=>list(),e=>e.code==='42501');
 await as(uid);assert.equal((await submit()).rows[0].id,id);assert.equal((await submit()).rows[0].id,id);
 await assert.rejects(()=>list(),e=>e.code==='42501');await assert.rejects(()=>db.query('select * from ifma_admin_private.question_reports'),e=>e.code==='42501');
 await assert.rejects(()=>db.query("select public.ifma_admin_set_question_report_status($1,'resolved')",[id]),e=>e.code==='42501');
 await assert.rejects(()=>submit('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','curto'),e=>e.code==='22023');
 await assert.rejects(()=>submit('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','x'.repeat(2001)),e=>e.code==='22023');
 await as('33333333-3333-3333-3333-333333333333');await assert.rejects(()=>submit(),e=>e.code==='42501');
 await as(admin);let data=(await list()).rows[0].data;assert.equal(data.total,1);assert.equal(data.reports[0].question_id,'aut-001');assert.equal('user_id' in data.reports[0],false);
 assert.equal((await db.query("select public.ifma_admin_set_question_report_status($1,'resolved') as ok",[id])).rows[0].ok,true);
 assert.equal((await list('open')).rows[0].data.total,0);assert.equal((await list('resolved')).rows[0].data.total,1);
 await assert.rejects(()=>list('invalido'),e=>e.code==='22023');
 await as(uid);for(let i=1;i<30;i++)await submit('00000000-0000-4000-8000-'+String(i).padStart(12,'0'));
 await assert.rejects(()=>submit('00000000-0000-4000-8000-000000000031'),e=>e.code==='P0001');
 assert.equal((await submit()).rows[0].id,id); // retry works even when the rate limit is reached
 console.log('OK PostgreSQL: SQL idempotente, autenticação, administrador, isolamento, validação, recebimento sem duplicação, status e limite diário.');
}finally{await db.close()}})().catch(e=>{console.error(e);process.exitCode=1});
