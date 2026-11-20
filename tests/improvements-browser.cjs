const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict');
const {localFiles,ready}=require('./browser-fixture.cjs');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await localFiles(context);
 await context.addInitScript(()=>{const now=Date.now();localStorage.setItem('app_seen','2026-11-20-treino-evolucao-relatos');localStorage.setItem('ifma_sim_publicacoes_v1',JSON.stringify(['simulaprova-shai-v1','simulado2-ifma-2027']));if(!localStorage.getItem('ifma'))localStorage.setItem('ifma',JSON.stringify({resp:{'2026-1':{r:'B',ok:true},'2026-2':{r:'D',ok:false},'aut-001':{r:'A',ok:true},'aut-002':{r:'A',ok:true}},hist:{'2026-1':{ev:[{t:now,k:'a',ok:1}]},'2026-2':{ev:[{t:now,k:'a',ok:0}]},'aut-001':{ev:[{t:now,k:'a',ok:1}]},'aut-002':{ev:[{t:now,k:'a',ok:1,aj:1}]}}}));});
 let available=false;const reports=new Map();let submissions=0;
 await context.route('**/rest/v1/rpc/**',async route=>{const name=new URL(route.request().url()).pathname.split('/').pop(),body=route.request().postDataJSON()||{};let data=null;
  if(name==='ifma_submit_question_report'){submissions++;if(!available)return route.fulfill({status:404,contentType:'application/json',body:JSON.stringify({code:'PGRST202'})});if(!reports.has(body.p_id))reports.set(body.p_id,{id:body.p_id,question_id:body.p_question,reference:body.p_reference,source:body.p_source,materia:body.p_materia,topic:body.p_topic,kind:body.p_kind,description:body.p_description,status:'open',created_at:new Date().toISOString()});data=body.p_id}
  else if(name==='ifma_admin_question_reports'){const rows=[...reports.values()].filter(r=>body.p_status==='all'||r.status===body.p_status);data={total:rows.length,reports:rows.slice(body.p_offset,body.p_offset+body.p_limit)}}
  else if(name==='ifma_admin_set_question_report_status'){reports.get(body.p_id).status=body.p_status;data=true}
  else if(name==='ifma_is_admin')data=true;
  else if(name==='ifma_admin_list_users')data={users:[],metrics:{total:0,confirmed:0,pending:0,new_7d:0},filtered:0,offset:0,limit:25,has_more:false};
  else data=[];
  return route.fulfill({contentType:'application/json',body:JSON.stringify(data)});
 });
 const page=await context.newPage(),errors=[];page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8765');await ready(page);
 assert.equal(await page.locator('[data-origin=ifma]>b').innerText(),'50%');assert.equal(await page.locator('[data-origin=autoral]>b').innerText(),'100%');
 await page.evaluate(()=>{ST.autorais={f:{mat:'Matemática'},cur:0};go('autorais')});
 assert.equal(await page.locator('.q-filters>.fbar').isVisible(),false);assert.equal(await page.locator('.q-list>.lst').isVisible(),false);assert.equal(await page.locator('#qc .en').isVisible(),true);
 await page.locator('.q-filters>.q-panel-toggle').click();await page.locator('select[data-k=ass]').selectOption({label:'Teorema de Pitágoras'});assert.equal(await page.locator('.q-filters>.fbar').isVisible(),true);
 await page.locator('[data-close-panel]').click();assert.equal(await page.locator('.q-filters>.fbar').isVisible(),false);
 await page.locator('.q-list>.q-panel-toggle').click();await page.locator('.li[data-i="1"]').click();assert.equal(await page.locator('.q-list>.lst').isVisible(),false);assert.equal(await page.locator('#question-list-position').innerText(),'2/3');
 assert.match(await page.locator('#qc .en').innerText(),/escada/);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:'.test-runtime/improvements-question-mobile.png',animations:'disabled'});
 await page.locator('#report-question').click();await page.locator('[name=kind]').selectOption('enunciado');
 const description='O enunciado precisa de revisão. <img src=x onerror="window.hacked=1">';await page.locator('textarea[name=description]').fill(description);await page.locator('#question-report-form [type=submit]').click();
 await page.waitForFunction(()=>document.querySelector('#question-report-status')?.textContent.includes('aguardando envio'));
 assert.equal(await page.evaluate(()=>Object.values(S.questionReports).length),1);assert.equal(await page.evaluate(()=>Object.values(S.questionReports)[0].deliveredAt),0);
 await page.locator('[data-close-report]').click();await page.reload();await ready(page);assert.equal(await page.evaluate(()=>Object.values(S.questionReports).length),1);
 available=true;await page.evaluate(()=>go('desp'));await page.locator('.report-history summary').click();await page.locator('#retry-question-reports').click();await page.waitForFunction(()=>Object.values(S.questionReports||{}).every(r=>r.deliveredAt>0));assert.equal(reports.size,1);await page.evaluate(()=>flushQuestionReports());assert.equal(reports.size,1);
 await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>{ST.autorais={f:{},cur:0};go('autorais')});assert.equal(await page.locator('.q-filters>.fbar').isVisible(),true);assert.equal(await page.locator('.q-list>.lst').isVisible(),true);
 await page.locator('#admin-nav').click();await page.locator('#admin-reports').click();await page.locator('#reports-filter').selectOption('all');await page.locator('.report-inbox-item').waitFor();assert.equal(await page.locator('.report-description img').count(),0);assert.equal(await page.evaluate(()=>window.hacked),undefined);
 await page.locator('[data-report-id]').selectOption('resolved');await page.waitForFunction(()=>document.querySelector('[data-report-id]')?.value==='resolved');assert.equal([...reports.values()][0].status,'resolved');
 await context.route('**/correcao.json',route=>route.fulfill({status:503,body:'offline'}));
 await page.evaluate(()=>{const exam='simulaprova-shai-v1',now=Date.now(),make=(id,day,count,minutes)=>({id,exam,status:'done',start:now-day*864e5,end:now-day*864e5+10800000,stopped:now-day*864e5+minutes*60000,mode:'digital',answers:{},flags:{},analysis:{version:1,items:Array.from({length:30},(_,i)=>({n:i+1,topic:SX_EXAMS[exam].topics[i],ok:i<count}))}});S.simResults={a:make('a',3,18,90),b:make('b',2,22,100),c:{...make('c',1,0,80),analysis:undefined}};save();sxSelected=exam;sxReview=null;sxStage='list';go('simulados')});
 await page.locator('#sx-evolution').waitFor();assert.equal(await page.locator('.evolution-dot').count(),2);assert.match(await page.locator('.evolution-summary').innerText(),/22\/30/);assert.match(await page.locator('.evolution-summary').innerText(),/\+4 acertos/);assert.match(await page.locator('.evolution-summary').innerText(),/00:10:00 a mais/);assert.match(await page.locator('.evolution-topics').innerText(),/Melhorou/);assert.match(await page.locator('#sx-evolution').innerText(),/Correção pendente/);
 await page.locator('#sx-evolution').scrollIntoViewIfNeeded();await page.screenshot({path:'.test-runtime/improvements-evolution.png',animations:'disabled'});
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.ok(submissions>=1);assert.deepEqual(errors,[]);
 console.log('OK navegador: painéis mobile/desktop, percentuais por origem, fila de relatos persistente, reenvio/idempotência, painel administrativo seguro, gráfico/tempo/assuntos e correção pendente.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
