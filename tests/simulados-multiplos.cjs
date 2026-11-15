const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
(async()=>{const keys=Object.fromEntries(['simulaprova-shai-v1','simulado2-ifma-2027'].map(id=>[id,JSON.parse(fs.readFileSync(`simulados/${id}/correcao.json`,'utf8'))])),store=new Map(),requests=[];
const ctx=vm.createContext({console,Date,Math,JSON,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},document:{visibilityState:'visible',addEventListener(){}},window:{},addEventListener(){},setInterval(){},S:{simResults:{}},save(){},go(){},fetch:async url=>{requests.push(url);return{ok:true,json:async()=>keys[url.split('/')[1]]}}});
const run=s=>vm.runInContext(s,ctx);run(fs.readFileSync('simulados.js','utf8'));run(fs.readFileSync('simulados-progresso.js','utf8'));
assert.equal(run('Object.keys(SX_EXAMS).length'),2);
for(const id of Object.keys(keys)){
 ctx.id=id;ctx.answers=Object.fromEntries(Object.entries(keys[id]).map(([n,v])=>[n,v.answer]));
 run(`S.simResults[id]={id,exam:id,status:'done',mode:'digital',start:Date.now()-1000,end:Date.now()+10799000,stopped:Date.now(),answers,flags:{1:{review:true}}}`);
 const pages=run('sxExam(id).pages');assert.equal(pages.flat().filter(n=>n===30).length,2);
 assert.deepEqual(Array.from(pages.slice(0,-1).flat()).sort((a,b)=>a-b),Array.from({length:30},(_,i)=>i+1));
 for(let i=1;i<=pages.length;i++)assert.ok(fs.existsSync(`simulados/${id}/pagina-${i}.webp`));
 assert.equal(run('sxExam(id).topics.length'),30);
}
await run('sxEnrichResults()');assert.equal(requests.length,2);
assert.equal(run('sxScores(S.simResults["simulaprova-shai-v1"]).total'),30);
assert.equal(run('sxScores(S.simResults["simulado2-ifma-2027"]).total'),30);
assert.notEqual(run('S.simResults["simulaprova-shai-v1"].analysis.items[1].topic'),run('S.simResults["simulado2-ifma-2027"].analysis.items[1].topic'));
assert.equal(run('sxReviewItems().length'),2);
await run('sxStartPractice(false,"simulado2-ifma-2027")');assert.equal(run('sxPractice.queue.length'),1);assert.equal(run('sxPractice.queue[0].attempt.exam'),'simulado2-ifma-2027');
assert.equal(run('sxTurStats().total'),60);
for(const id of Object.keys(keys)){ctx.id=id;run('SX=S.simResults[id];sxPersist();SX=sxRead()');assert.equal(run('SX.exam'),id)}
const catalogue=JSON.parse(fs.readFileSync('simulados/catalogo.json','utf8'));assert.deepEqual(catalogue.map(x=>x.id).sort(),Object.keys(keys).sort());
console.log('OK: duas provas, páginas completas, correções separadas, notas, assuntos, revisão por prova, atividade conjunta, retomada e catálogo.');
})().catch(e=>{console.error(e);process.exitCode=1});
