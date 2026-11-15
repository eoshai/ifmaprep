const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const {localFiles,ready}=require('./browser-fixture.cjs');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const oldID='simulaprova-shai-v1',newID='simulado2-ifma-2027',key=id=>JSON.parse(fs.readFileSync(`simulados/${id}/correcao.json`,'utf8')),answers=id=>Object.fromEntries(Object.entries(key(id)).map(([n,v])=>[n,v.answer]));
 for(const mobile of [false,true]){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1365,height:1000},isMobile:mobile,hasTouch:mobile});await localFiles(context);
 await context.addInitScript(({oldID,newID,answers})=>{const now=Date.now();localStorage.setItem('ifma_sim_publicacoes_v1',JSON.stringify([oldID,newID]));if(!localStorage.getItem('ifma')){const legacy={id:'legacy',exam:oldID,start:now-7200000,end:now+3600000,stopped:now,status:'done',mode:'digital',answers,flags:{}};localStorage.setItem('ifma',JSON.stringify({simResults:{legacy}}));localStorage.setItem('ifma_simulados_v1',JSON.stringify(legacy));}},{oldID,newID,answers:answers(oldID)});
 const page=await context.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));page.on('dialog',d=>d.accept());await page.goto('http://127.0.0.1:8765');await ready(page);await page.evaluate(()=>go('simulados'));
 await page.locator('[data-sx-select="simulado2-ifma-2027"]').click();assert.equal(await page.locator('[data-result]').count(),0);
 await page.locator('#sx-open').click();assert.equal(await page.locator('#sx-mode').count(),1,'A tentativa concluída do primeiro simulado não deve substituir as orientações do segundo');assert.match(await page.locator('#bd h2').innerText(),/Simulado 2/);await page.locator('#sx-mode').click();assert.match(await page.locator('a[href$="caderno-sem-gabarito.pdf"]').getAttribute('href'),/simulado2-ifma-2027/);assert.match(await page.locator('#bd').innerText(),/10 páginas/);
 if(!mobile)await page.locator('[name="sx-mode"][value="digital"]').check();
 await page.locator('#sx-agree').check();await page.locator('#sx-start').click();await page.locator('#sx-clock').waitFor();assert.equal(await page.evaluate(()=>SX.exam),newID);assert.equal(await page.evaluate(()=>SX.end-SX.start),10800000);
 assert.ok(!requests.some(url=>url.includes(newID+'/correcao.json')));
 const deadline=await page.evaluate(()=>SX.end);
 if(!mobile){
 assert.equal(await page.locator('#sx-page option').count(),10);await page.locator('#sx-page').selectOption({value:'5'});assert.equal(await page.locator('[data-answer][data-n="16"]').count(),5);assert.match(await page.locator('.sx-layout img').first().getAttribute('src'),/simulado2-ifma-2027\/pagina-6.webp/);
 await page.locator('[data-n="16"][data-answer="B"]').click();
 }else{await page.locator('#sx-end').click();assert.equal(await page.evaluate(()=>SX.status),'transcribing')}
 await page.reload();await ready(page);assert.equal(await page.evaluate(()=>SX.exam),newID);assert.equal(await page.evaluate(()=>SX.end),deadline);
 await page.evaluate(({correct,mobile})=>{go('simulados');for(let n=1;n<=30;n++)sxAnswer(n,correct[n]);sxFlag(1,'review',true);if(!mobile)sxStop(false)},{correct:answers(newID),mobile});
 if(mobile)await page.locator('#sx-end').click();await page.getByRole('heading',{name:'Gabarito comentado'}).waitFor();
 assert.equal(await page.locator('.card').filter({has:page.locator('small',{hasText:'Total de acertos'})}).locator('b').innerText(),'30/30');
 assert.match(await page.locator('[data-sx-question="1"]').innerText(),/correta: A/);assert.match(await page.locator('[data-sx-question="2"]').innerText(),/correta: D/);
 assert.equal(await page.evaluate(()=>Object.keys(S.simResults).length),2);
 await page.locator('#sx-list').click();assert.equal(await page.locator('[data-result]').count(),1);assert.equal(await page.locator('#sx-evolution tbody tr').count(),1);
 await page.locator('#sx-practice-start').click();assert.match(await page.locator('.sx-layout img').first().getAttribute('src'),/simulado2-ifma-2027\/pagina-2.webp/);await page.locator('[data-practice-answer="A"]').click();await page.locator('#sx-practice-check').click();await page.locator('#sx-practice-done').waitFor();await page.locator('#sx-practice-close').click();
 await page.locator('[data-sx-select="simulaprova-shai-v1"]').click();assert.equal(await page.locator('[data-result]').count(),1);await page.locator('#sx-open').click();assert.equal(await page.locator('#sx-mode').count(),1);assert.match(await page.locator('#bd h2').innerText(),/SimulAprova/);await page.locator('#sx-mode').click();assert.match(await page.locator('a[href$="caderno-sem-gabarito.pdf"]').getAttribute('href'),/simulaprova-shai-v1/);await page.locator('#sx-back').click();assert.equal(await page.locator('#sx-mode').count(),1);await page.locator('#sx-back').click();await page.locator('[data-result="0"]').click();await page.getByRole('heading',{name:'Gabarito comentado'}).waitFor();assert.match(await page.locator('[data-sx-question="1"]').innerText(),/correta: B/);
 assert.equal(await page.evaluate(()=>sxScores(S.simResults.legacy).total),30);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);await context.close();
 }
 console.log('OK browser: dois simulados, novo digital/impresso, 10 páginas, retomada, correção própria após entrega, histórico separado, revisão, legado e layout mobile.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
