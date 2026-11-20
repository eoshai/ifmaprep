const {chromium}=require('playwright'),fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {localFiles,ready}=require('./browser-fixture.cjs');
const source=fs.readFileSync('app.js','utf8'),ctx=vm.createContext({Date});
vm.runInContext("const dkey=t=>new Date(t).toLocaleDateString('sv');"+source.slice(source.indexOf('function turCurrentStats('),source.indexOf("let tpJ=")),ctx);
const now=new Date(2026,10,15,12).getTime(),day=n=>new Date(now+n*864e5).toLocaleDateString('sv');
ctx.now=now;ctx.stats={h7:{[day(-15)]:2,[day(-7)]:8,[day(-6)]:3,[day(0)]:4,[day(1)]:20},seq:5,melhor:12,acc:85};
assert.equal(vm.runInContext('Object.values(turCurrentStats(stats,now).h7).reduce((a,b)=>a+b,0)',ctx),7);
ctx.stats={h7:{[day(-15)]:2},seq:1,melhor:12,acc:100};
assert.equal(vm.runInContext('turCurrentStats(stats,now).seq',ctx),0);
assert.equal(vm.runInContext('turCurrentStats(stats,now).melhor',ctx),12);
assert.equal(vm.runInContext('turCurrentStats(stats,now).acc',ctx),100);
assert.equal(ctx.stats.seq,1); // The saved history remains intact.
for(const extra of [{h7:{[day(-1)]:2}},{ult:now-864e5},{diasEstudados:[day(-1)]}]){ctx.stats={seq:3,...extra};assert.equal(vm.runInContext('turCurrentStats(stats,now).seq',ctx),3)}
ctx.stats={seq:3,h7:{[day(-2)]:2}};assert.equal(vm.runInContext('turCurrentStats(stats,now).seq',ctx),0);
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 for(const include2020 of [false,true]){
 const context=await browser.newContext({viewport:{width:390,height:844}});await localFiles(context);
 await context.route('**/rest/v1/**',route=>{const u=new URL(route.request().url()),today=new Date(),key=n=>{const d=new Date(today);d.setDate(d.getDate()+n);return d.toLocaleDateString('sv')},row=(id,name,stats)=>({turma_id:'group',user_id:id,apelido:name,stats,atualizado_em:new Date(today-15*864e5).toISOString(),turmas:{nome:'Teste',codigo:'TEST',dono:'test-user'}});
 const rows=[row('old','Inativa',{h7:{[key(-15)]:2},seq:1,acc:100,melhor:10}),row('recent','Recente',{h7:{[key(-7)]:8,[key(-6)]:3,[key(-1)]:2},seq:2}),row('test-user','Você',{})];
 return route.fulfill({contentType:'application/json',body:JSON.stringify(u.pathname.endsWith('/turma_membros')&&route.request().method()==='GET'?rows:[])})});
 await context.addInitScript(include=>{localStorage.setItem('ifma_inc2020',include?'1':'0');localStorage.setItem('ifma',JSON.stringify({resp:{'2020-1':{r:'B',ok:true},'2022-1':{r:'D',ok:true},'unknown':{r:'A',ok:true}}}));},include2020);
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8765');await ready(page);
 assert.equal(await page.locator('.card').filter({has:page.locator('small', {hasText:/^Respondidas$/})}).locator('b').innerText(),include2020?'2/240':'1/200');
 assert.match(await page.locator('#ft').innerText(),include2020?/2 questões/:/1 questões/);
 assert.equal(await page.evaluate(()=>!!S.resp['2020-1']),true);
 await page.evaluate(()=>go('tur'));await page.locator('.trm').filter({hasText:'Inativa'}).waitFor();
 const inactive=page.locator('.trm').filter({hasText:'Inativa'}),recent=page.locator('.trm').filter({hasText:'Recente'});
 assert.match(await inactive.innerText(),/🔥 0 · 0 questões em 7 dias · hoje 0 · 100% acerto/);
 assert.equal(await inactive.locator('.trbar i').evaluate(e=>e.style.width),'0%');
 assert.match(await recent.innerText(),/🔥 2 · 5 questões em 7 dias/);
 assert.equal(await page.locator('.trm').first().locator('.trn b').innerText(),'Recente');
 await page.locator('[data-o="s"]').click();assert.equal(await inactive.locator('.trv').innerText(),'0🔥');
 assert.deepEqual(errors,[]);await context.close();
 }
 console.log('OK: contagem com 2020 oculto/visível, dados preservados, janela de 7 dias, inatividade, sequência, barras e ordenação no navegador.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
