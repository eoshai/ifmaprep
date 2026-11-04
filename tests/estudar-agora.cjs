const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('app.js','utf8');new vm.Script(html);
for(const m of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
const between=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b,html.indexOf(a)));
const storage=new Map(),elements=new Map();let mounted;
const ctx=vm.createContext({console,Date,Map,Set,JSON,Math,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{addEventListener(){}},addEventListener(){},setInterval(){},motTmp(){},save(){},credit(){},tel:()=>0,cadDue:()=>({due:[]}),go(){},$:s=>{if(!elements.has(s))elements.set(s,{});return elements.get(s)},mountQ:(el,q,c)=>{mounted={q,c}},esc:s=>s,hms:s=>String(Math.floor(s))});
vm.runInContext(between('const Q_ALL=','const INC20=')+`\nconst Q=Q_ALL.filter(q=>q.ano!==2020),MATS=['Português','Matemática'];let S={resp:{},hist:{},tempo:{}};const stat=q=>S.resp[q.id];const T={run:false};`+between('function hInfo(id)','function hStats()')+between('const PROVA=','function planoInit(b)')+between('/* ===== sessão guiada:','function home(b)'),ctx);
const run=s=>vm.runInContext(s,ctx);
assert.equal(run('Q.length'),150);
assert.match(run('eaCandidates(new Date(2026,9,5))[0].reason'),/semana atual/);
assert.match(run('eaCandidates(new Date(2026,10,1))[0].reason'),/Pendente/);
assert.equal(run('eaCandidates(new Date(2026,10,1)).every(g=>g.qs.length>0&&Number.isFinite(g.score))'),true);
// Three errors trigger remediation; a single error does not.
run(`var testQ=Q.find(q=>!eaCandidates(new Date(2026,9,5)).find(g=>g.topic===q.topico&&g.mat===q.materia).weeks.includes(0));S.hist[testQ.id]={ev:[1,2,3].map(t=>({t,k:'a',ok:0}))};`);
assert.match(run('eaCandidates(new Date(2026,9,5)).find(g=>g.topic===testQ.topico&&g.mat===testQ.materia).reason'),/3 de 3/);
run('S.hist[testQ.id].ev.length=1');
assert.doesNotMatch(run('eaCandidates(new Date(2026,9,5)).find(g=>g.topic===testQ.topico&&g.mat===testQ.materia).reason'),/Você errou/);
run('eaStart(eaCandidates(new Date(2026,10,1))[0])');
assert.equal(run('EA.run'),true);assert.ok(run('EA.ids.length')<=5);
run('EA.last=Date.now()-2000;eaTick()');assert.ok(run('EA.elapsed')>=2);assert.ok(run('S.tempo[EA.mat]')>=2);
run('eaPause()');const paused=run('EA.elapsed');run('eaTick()');assert.equal(run('EA.elapsed'),paused);
run('EA.elapsed=1499;EA.run=true;EA.last=Date.now()-10000;eaTick()');assert.equal(run('EA.elapsed'),1500);assert.equal(run('EA.run'),false);assert.equal(run('EA.expired'),true);
const b={innerHTML:''};ctx.testContainer=b;run('viewEstudar(testContainer)');assert.ok(mounted.q);assert.equal(mounted.c.R,run('S.resp'));assert.equal(elements.get('#eap').disabled,true);
elements.get('#eaf').onclick();assert.equal(run('EA.done'),true);run('viewEstudar(testContainer)');assert.match(b.innerHTML,/Sessão concluída/);
run('EA=null;viewEstudar(testContainer)');assert.match(b.innerHTML,/Começar sessão/);
// Reload restores the saved session paused.
run('eaStart(eaCandidates()[0])');const code=between('/* ===== sessão guiada:','function home(b)');vm.runInContext(code.replace('let EA=null,eaPick=0,eaCheckpoint=0;','EA=null;eaPick=0;eaCheckpoint=0;').replace("const eaKey='ifma_sessao';",''),ctx);assert.equal(run('EA.run'),false);
run(`EA=null;S.hist={};Q.forEach(q=>S.resp[q.id]={ok:true});`);assert.equal(run('eaCandidates().length'),0);
console.log('OK: sintaxe, plano atual/atrasado, erros, sessão, tempo, pausa, limite, resumo e retomada.');
