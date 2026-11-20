const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict');
const {localFiles,ready}=require('./browser-fixture.cjs');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},hasTouch:true,serviceWorkers:'block'});await localFiles(context);
 await context.addInitScript(()=>{localStorage.setItem('app_seen','2026-11-20-quadro-branco');localStorage.setItem('ifma_sim_publicacoes_v1',JSON.stringify(['simulaprova-shai-v1','simulado2-ifma-2027']))});
 await context.route('**/auth/v1/user',route=>route.fulfill({contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({id:route.request().headers().authorization?.includes('fixture-other')?'other-user':'test-user',email:'fixture@example.test'})}));
 const page=await context.newPage(),errors=[];page.setDefaultTimeout(12000);page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8765');await ready(page);
 const openAuthor=async(cur=0)=>{await page.evaluate(cur=>{ST.autorais={f:{},cur};go('autorais')},cur);await page.locator('#whiteboard-question').click();await page.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto')};
 const ink=()=>page.locator('#board-canvas').evaluate(canvas=>{const data=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;let count=0;for(let i=3;i<data.length;i+=4)if(data[i])count++;return count});
 const draw=async()=>{const r=await page.locator('#board-canvas').boundingBox();await page.mouse.move(r.x+r.width*.15,r.y+r.width*.12);await page.mouse.down();await page.mouse.move(r.x+r.width*.4,r.y+r.width*.12,{steps:12});await page.mouse.up()};
 const close=async()=>{await page.locator('[data-board-action=close]').click();await page.locator('#study-board').waitFor({state:'detached'})};
 await openAuthor();assert.equal(await ink(),0);const before=await page.evaluate(()=>JSON.stringify(S.resp));await draw();const first=await ink();assert.ok(first>100);
 await page.locator('[data-board-action=undo]').click();assert.equal(await ink(),0);await page.locator('[data-board-action=redo]').click();assert.ok(await ink()>100);
 await page.locator('[data-board-action=clear]').click();assert.equal(await ink(),0);await page.locator('[data-board-action=undo]').click();assert.ok(await ink()>100);
 await page.locator('[data-board-tool=eraser]').click();await draw();assert.ok(await ink()<first);await page.locator('[data-board-action=undo]').click();assert.ok(await ink()>100);
 await page.screenshot({path:'.test-runtime/board-blank-desktop.png',animations:'disabled'});await close();assert.equal(await page.evaluate(()=>JSON.stringify(S.resp)),before);
 await openAuthor(1);assert.equal(await ink(),0);await close();await openAuthor(0);assert.ok(await ink()>100);await close();await page.reload();await ready(page);await openAuthor();assert.ok(await ink()>100);await close();
 // Uma conta diferente no mesmo navegador não vê os desenhos anteriores.
 await page.evaluate(()=>localStorage.setItem('sb_sess',JSON.stringify({uid:'other-user',email:'fixture@example.test',access_token:'fixture-other',refresh_token:'fixture',exp:Math.floor(Date.now()/1000)+3600,verifiedAt:Date.now()})));
 await page.reload();await ready(page);await openAuthor();assert.equal(await ink(),0);await close();
 await page.evaluate(()=>localStorage.setItem('sb_sess',JSON.stringify({uid:'test-user',email:'fixture@example.test',access_token:'fixture-only',refresh_token:'fixture',exp:Math.floor(Date.now()/1000)+3600,verifiedAt:Date.now()})));
 await page.reload();await ready(page);await openAuthor();assert.ok(await ink()>100);await close();
 // Ver prova: o desenho é uma camada separada da imagem original.
 await page.evaluate(()=>{ST.banco={f:{ano:'2026',mat:'Português'},cur:0};go('banco')});await page.locator('#pg').click();await page.locator('[data-board-image]').first().click();
 await page.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto'&&document.querySelector('.board-page')?.naturalWidth>0);
 assert.equal(await ink(),0);const source=await page.locator('.board-page').getAttribute('src');await draw();assert.ok(await ink()>100);
 await page.locator('[data-board-action=clear]').click();assert.equal(await ink(),0);assert.equal(await page.locator('.board-page').getAttribute('src'),source);assert.equal(await page.locator('.board-page').isVisible(),true);
 await page.locator('[data-board-action=undo]').click();await page.locator('[data-board-action=in]').click();assert.equal(await page.locator('#board-zoom-label').innerText(),'125%');
 await page.locator('#board-mode').selectOption('blank');await page.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto'&&document.querySelector('.board-page').hidden);assert.equal(await ink(),0);
 await page.locator('#board-mode').selectOption('0');await page.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto'&&!document.querySelector('.board-page').hidden);assert.ok(await ink()>100);
 await page.locator('#board-mode').selectOption('blank');await page.locator('#board-mode').selectOption('0');await page.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto'&&!document.querySelector('.board-page').hidden);assert.ok(await ink()>100);
 await page.screenshot({path:'.test-runtime/board-overlay-desktop.png',animations:'disabled'});await close();
 await page.locator('#pgv img.pgi').first().click();await page.locator('#lbdraw').click();await page.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto');assert.ok(await ink()>100);await page.keyboard.press('Escape');await page.locator('#study-board').waitFor({state:'detached'});await page.locator('#lbc').click();
 await page.setViewportSize({width:390,height:844});await openAuthor(2);assert.equal(await ink(),0);
 const r=await page.locator('#board-canvas').boundingBox();await page.touchscreen.tap(r.x+r.width*.2,r.y+r.width*.15);assert.ok(await ink()>0);
 await page.locator('[data-board-tool=pan]').click();assert.equal(await page.locator('#board-canvas').evaluate(e=>getComputedStyle(e).pointerEvents),'none');await page.locator('[data-board-tool=pen]').click();assert.equal(await page.locator('#board-canvas').evaluate(e=>getComputedStyle(e).touchAction),'none');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:'.test-runtime/board-mobile.png',animations:'disabled'});await close();
 await page.evaluate(()=>IFMA_BOARD.openImage('img/nao-existe.webp'));await page.waitForFunction(()=>document.querySelector('#board-save-status')?.textContent.includes('Não foi possível abrir'));
 await page.locator('#board-mode').selectOption('blank');await page.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto');await close();
 // O botão também aparece nas questões dos simulados; abrir o quadro não pausa o prazo.
 await page.evaluate(()=>{sxSelected='simulaprova-shai-v1';sxPage=SX_EXAMS[sxSelected].pages.findIndex(nums=>nums.length>0);SX={id:'board-fixture',exam:sxSelected,status:'running',mode:'digital',start:Date.now(),end:Date.now()+10800000,answers:{},flags:{}};sxPersist();go('simulados')});
 const end=await page.evaluate(()=>SX.end);await page.locator('[data-whiteboard-exam]').first().click();await page.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto');assert.equal(await page.evaluate(()=>SX.end),end);await close();
 assert.deepEqual(errors,[]);
 const fallback=await browser.newContext({viewport:{width:1100,height:850},serviceWorkers:'block'});await localFiles(fallback);await fallback.addInitScript(()=>{Object.defineProperty(window,'indexedDB',{get:()=>undefined});localStorage.setItem('app_seen','2026-11-20-quadro-branco');localStorage.setItem('ifma_sim_publicacoes_v1',JSON.stringify(['simulaprova-shai-v1','simulado2-ifma-2027']))});
 const p2=await fallback.newPage();await p2.goto('http://127.0.0.1:8765');await ready(p2);await p2.evaluate(()=>go('autorais'));await p2.locator('#whiteboard-question').click();await p2.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto');
 const r2=await p2.locator('#board-canvas').boundingBox();await p2.mouse.click(r2.x+r2.width*.2,r2.y+r2.width*.12);await p2.waitForFunction(()=>document.querySelector('#board-save-status')?.textContent.includes('sessão'));
 await p2.locator('[data-board-action=close]').click();await p2.locator('#study-board').waitFor({state:'detached'});await p2.locator('#whiteboard-question').click();await p2.waitForFunction(()=>document.querySelector('#board-canvas')?.style.pointerEvents==='auto');assert.equal(await p2.locator('#board-canvas').evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((n,i)=>i%4===3&&n>0)),true);await fallback.close();
 console.log('OK: canvas real, caneta/borracha, desfazer/refazer/limpar, IndexedDB e fallback sem armazenamento, isolamento por conta/questão, imagem/zoom, troca rápida de papel, toque no celular e prazo do simulado preservado.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
