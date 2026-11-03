const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const store=new Map(),events={},els=new Map();let now=1000000,screen='',saved=0;
class Clock extends Date{static now(){return now}}
const context=vm.createContext({Date:Clock,Math,JSON,console,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},document:{getElementById:k=>els.get(k),querySelector:()=>null,addEventListener:(k,f)=>events[k]=f,visibilityState:'visible'},window:{},addEventListener:(k,f)=>events[k]=f,setInterval(){},alert(){},confirm:()=>true,S:{},save:()=>saved++,go:v=>screen=v,hms:v=>String(v)});
const src=fs.readFileSync('simulados.js','utf8');vm.runInContext(src,context);const run=s=>vm.runInContext(s,context);
function start(mode){run(`SX={exam:SX_META.id,id:'test-'+${now},start:Date.now(),end:Date.now()+SX_META.duration,mode:'${mode}',status:'running',answers:{},flags:{},exits:0};sxPersist()`)}
start('digital');assert.equal(run('sxBusy()'),true);run("sxAnswer(1,'B');sxFlag(1,'guess',true)");assert.equal(run('SX.answers[1]'),'B');assert.equal(run('SX.flags[1].guess'),true);const end=run('SX.end');now+=20000;run('SX=sxRead()');assert.equal(run('SX.end'),end);assert.equal(run('sxPresence().end'),end);
now=end;run('sxAnswer(2,"A")');assert.equal(run('SX.status'),'done');assert.equal(run('SX.answers[2]'),undefined);assert.equal(run('Object.keys(S.simResults).length'),1);assert.equal(run('sxPresence()'),null);assert.ok(saved);
now+=100;start('print');now+=5000;run('sxStop(false)');assert.equal(run('SX.status'),'transcribing');assert.equal(run('sxBusy()'),true);assert.equal(run('sxPresence()'),null);run('sxAnswer(1,"D")');assert.equal(run('SX.answers[1]'),'D');assert.equal(run('SX.stopped-SX.start'),5000);
start('print');now=run('SX.end')+86400000;run('sxTick()');assert.equal(run('SX.status'),'transcribing');assert.equal(run('SX.stopped'),run('SX.end'));assert.equal(run('SX.expired'),true);
now+=100;start('digital');context.document.visibilityState='hidden';events.visibilitychange();assert.equal(run('SX.exits'),1);const persisted=JSON.parse(store.get('ifma_simulados_v1'));assert.equal(persisted.exits,1);
assert.equal(run('SX_PAGES.length'),11);assert.equal(run('SX_PAGES[10].length'),30);assert.equal(run('SX_TOPICS.length'),30);
const correction=JSON.parse(fs.readFileSync('simulados/simulaprova-shai-v1/correcao.json'));assert.equal(Object.keys(correction).length,30);assert.equal(Object.values(correction).map(v=>v.answer).join(''),'BCADBCACDBADBDACADBCDABDACBDCA');
for(let i=1;i<=11;i++)assert.ok(fs.existsSync('simulados/simulaprova-shai-v1/pagina-'+i+'.webp'));
assert.ok(!fs.existsSync('simulados/simulaprova-shai-v1/pagina-12.webp'));
console.log('OK: prazo absoluto, retomada, expiração digital/impressa, transcrição, salvamento, marcações, presença, 30 respostas e 11 páginas permitidas.');
