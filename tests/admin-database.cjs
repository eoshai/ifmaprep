const fs=require('node:fs'),assert=require('node:assert/strict');
const {PGlite}=require('../.test-runtime/node_modules/@electric-sql/pglite');
(async()=>{const db=new PGlite();try{
 await db.exec(`create role anon;create role authenticated;create schema auth;grant usage on schema auth to anon,authenticated;
 create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz,created_at timestamptz not null default now(),last_sign_in_at timestamptz,raw_user_meta_data jsonb not null default '{}',deleted_at timestamptz);
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 insert into auth.users(id,email,email_confirmed_at,created_at,last_sign_in_at,raw_user_meta_data) values
 ('11111111-1111-1111-1111-111111111111','gabriel.shai@icloud.com',now(),now()-interval '30 days',now(),'{"name":"Administrador"}'),
 ('22222222-2222-2222-2222-222222222222','bob@example.test',null,now(),null,'{"name":"Bobby","admin":true}'),
 ('33333333-3333-3333-3333-333333333333','alice@example.test',now(),now()-interval '2 days',now()-interval '1 hour','{"full_name":"Alice"}');
 insert into auth.users(id,email,email_confirmed_at,deleted_at) values ('44444444-4444-4444-4444-444444444444','deleted@example.test',now(),now());`);
 const setup=fs.readFileSync('supabase/admin_setup.sql','utf8').replace(/^\uFEFF/,'');await db.exec(setup);await db.exec(setup);
 const as=async(uid,role='authenticated')=>{await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid]);await db.exec('set role '+role)};
 const list=async(q='',status='all',limit=25,offset=0)=>(await db.query('select public.ifma_admin_list_users($1,$2,$3,$4) as result',[q,status,limit,offset])).rows[0].result;
 const denied=async fn=>assert.rejects(fn,e=>e.code==='42501');
 await as('','anon');await denied(()=>list());await denied(()=>db.query('select public.ifma_is_admin()'));
 await as('22222222-2222-2222-2222-222222222222');assert.equal((await db.query('select public.ifma_is_admin() as yes')).rows[0].yes,false);await denied(()=>list());await denied(()=>db.query('select * from ifma_admin_private.administrators'));await denied(()=>db.exec("insert into ifma_admin_private.administrators(user_id) values('22222222-2222-2222-2222-222222222222')"));
 await db.query("select set_config('request.jwt.claim.email','gabriel.shai@icloud.com',false)");await denied(()=>list());
 await as('11111111-1111-1111-1111-111111111111');assert.equal((await db.query('select public.ifma_is_admin() as yes')).rows[0].yes,true);const data=await list();assert.deepEqual(data.metrics,{total:3,confirmed:2,pending:1,new_7d:2});assert.equal(data.users.length,3);assert.equal(data.users.find(u=>u.email==='alice@example.test').name,'Alice');assert.ok(data.users.every(u=>!('raw_user_meta_data' in u)&&!('encrypted_password' in u)&&!('id' in u)));
 assert.equal((await list('BOB')).users[0].name,'Bobby');assert.equal((await list('', 'pending')).filtered,1);assert.equal((await list('', 'confirmed')).filtered,2);assert.equal((await list("' OR 1=1 --")).filtered,0);const page=await list('','all',1,1);assert.equal(page.users.length,1);assert.equal(page.offset,1);assert.equal(page.has_more,true);assert.equal((await list('','all',10000,-1)).limit,100);assert.equal((await list('','all',25,999)).users.length,0);await assert.rejects(()=>list('','invalid'),e=>e.code==='22023');
 await db.exec('reset role');await db.exec("update auth.users set email_confirmed_at=null where id='11111111-1111-1111-1111-111111111111'");await as('11111111-1111-1111-1111-111111111111');await denied(()=>list());
 console.log('OK PostgreSQL: SQL idempotente, administrador por UUID verificado, anon/usuário comum negados, metadados/e-mail não elevam acesso, tabela privada, filtros/paginação e colunas mínimas.');
 }finally{await db.close()}})().catch(e=>{console.error(e);process.exitCode=1});
