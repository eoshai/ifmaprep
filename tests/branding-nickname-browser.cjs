const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const {localFiles,ready}=require('./browser-fixture.cjs');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});await localFiles(context);
 await context.addInitScript(()=>{localStorage.setItem('app_seen','2026-11-20-quadro-branco');localStorage.setItem('tur_ap','Apelido antigo no aparelho');localStorage.setItem('ifma_sim_publicacoes_v1',JSON.stringify(['simulaprova-shai-v1','simulado2-ifma-2027']))});
 const make=(group,id,name)=>({turma_id:group,user_id:id,apelido:name,stats:{},atualizado_em:new Date().toISOString(),turmas:{nome:group,codigo:group==='Turma A'?'AAAA':'BBBB',dono:'test-user'}});
 const rows=[make('Turma A','test-user','Apelido no servidor'),make('Turma A','friend','Amigo'),make('Turma B','test-user','Apelido no servidor')];let fail=false,noRows=false,nickCalls=0;
 await context.route('**/rest/v1/**',route=>{const u=new URL(route.request().url()),method=route.request().method();let body=[];
  if(u.pathname.endsWith('/turma_membros')){
   if(method==='GET')body=rows;
   else if(method==='PATCH'){
    const patch=route.request().postDataJSON();assert.equal(u.searchParams.get('user_id'),'eq.test-user');
    if('apelido' in patch){nickCalls++;assert.deepEqual(Object.keys(patch),['apelido']);assert.equal(route.request().headers().prefer,'return=representation');
     if(fail)return route.fulfill({status:403,contentType:'application/json',body:JSON.stringify({message:'denied'})});
     if(!noRows){rows.filter(r=>r.user_id==='test-user').forEach(r=>r.apelido=patch.apelido);body=rows.filter(r=>r.user_id==='test-user').map(({turma_id,user_id,apelido})=>({turma_id,user_id,apelido}))}
    }
   }
  }
  return route.fulfill({contentType:'application/json',body:JSON.stringify(body)});
 });
 const page=await context.newPage(),errors=[];page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));await page.clock.install();await page.goto('http://127.0.0.1:8765');await ready(page);
 assert.equal(await page.title(),'AprovaIFMA');assert.equal(await page.locator('#sd .brand .lb').innerText(),'AprovaIFMA');assert.equal(await page.locator('meta[name="apple-mobile-web-app-title"]').getAttribute('content'),'AprovaIFMA');
 const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));assert.equal(manifest.name,'AprovaIFMA');assert.equal(manifest.short_name,'AprovaIFMA');
 await page.evaluate(()=>{ST.autorais={f:{},cur:1};go('autorais')});
 for(const selector of ['.li[data-i="1"] .author-level','#qc .author-level'])assert.equal(await page.locator(selector).evaluate(e=>getComputedStyle(e).color),'rgb(245, 206, 92)');
 assert.notEqual(await page.locator('.li[data-i="2"] .author-level').evaluate(e=>getComputedStyle(e).color),'rgb(245, 206, 92)');
 await page.evaluate(()=>go('tur'));await page.locator('.trm.me').first().waitFor();assert.equal(await page.locator('#tap').inputValue(),'Apelido no servidor');
 await page.locator('#tap').fill('Novo apelido');await page.locator('#tur-nickname-save').click();await page.waitForFunction(()=>document.querySelector('#tur-nickname-status').textContent.includes('atualizado'));
 assert.equal(await page.evaluate(()=>localStorage.getItem('tur_ap')),'Novo apelido');assert.equal(await page.locator('.trm.me .trn>b').count(),2);assert.deepEqual(await page.locator('.trm.me .trn>b').allInnerTexts(),['Novo apelido','Novo apelido']);assert.equal(rows.find(r=>r.user_id==='friend').apelido,'Amigo');
 await page.reload();await ready(page);await page.evaluate(()=>go('tur'));await page.locator('.trm.me').first().waitFor();assert.equal(await page.locator('#tap').inputValue(),'Novo apelido');
 await page.locator('#tap').fill('Edição ainda não salva');await page.clock.fastForward(31000);assert.equal(await page.locator('#tap').inputValue(),'Edição ainda não salva');
 fail=true;await page.locator('#tap').fill('Não confirmado');await page.locator('#tur-nickname-save').click();await page.waitForFunction(()=>document.querySelector('#tur-nickname-status').classList.contains('er'));
 assert.equal(await page.evaluate(()=>localStorage.getItem('tur_ap')),'Novo apelido');assert.deepEqual(await page.locator('.trm.me .trn>b').allInnerTexts(),['Novo apelido','Novo apelido']);assert.equal(await page.locator('#tur-nickname-save').isEnabled(),true);
 fail=false;noRows=true;await page.locator('#tap').fill('Sem permissão de linha');await page.locator('#tur-nickname-save').click();await page.waitForFunction(()=>document.querySelector('#tur-nickname-status').textContent.includes('confirmar'));assert.equal(await page.evaluate(()=>localStorage.getItem('tur_ap')),'Novo apelido');
 const calls=nickCalls;await page.locator('#tap').fill('   ');await page.locator('#tur-nickname-save').click();assert.equal(nickCalls,calls);
 noRows=false;await page.setViewportSize({width:390,height:844});await page.locator('#tap').fill('Apelido no celular');await page.locator('#tap').press('Enter');await page.waitForFunction(()=>document.querySelector('#tur-nickname-status').textContent.includes('atualizado'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.evaluate(()=>document.querySelector('#sd').classList.add('c'));await page.locator('#tprofile').scrollIntoViewIfNeeded();await page.screenshot({path:'.test-runtime/nickname-mobile.png',animations:'disabled'});
 assert.deepEqual(errors,[]);console.log('OK navegador: marca no app/PWA, médias amarelas, apelido salvo em duas turmas, colega preservado, retorno do servidor, persistência, edição durante atualização, falhas, Enter e celular.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
