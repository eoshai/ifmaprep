const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const data=fs.readFileSync('questoes-autorais.js','utf8'),app=fs.readFileSync('app.js','utf8');
const stored=new Map([['ifma',JSON.stringify({resp:{'2026-1':{r:'D',ok:true}}})]]);
const c=vm.createContext({console,Date,Math,Map,Set,JSON,localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},IFMA_AUTH:{readSession:()=>({uid:'fixture'})}});
const between=(a,b)=>app.slice(app.indexOf(a),app.indexOf(b,app.indexOf(a)));
vm.runInContext(data+'\n'+app.slice(0,app.indexOf('const $='))+between('const MATS=','const escA=')+between('const STL=','const MK=')+between('const REVF=','function histBlock()'),c);
const run=s=>vm.runInContext(s,c),list=JSON.parse(run('JSON.stringify(Q_AUTORAIS)'));
assert.equal(list.length,48);assert.equal(run('Q.length'),198);assert.equal(run('Q_ALL.length'),238);
assert.equal(new Set(list.map(q=>q.id)).size,48);
assert.equal(run('new Set(Q_ALL.map(q=>q.id)).size'),238);
assert.equal(run("S.resp['2026-1'].r"),'D');
for(const q of list){
 assert.ok(q.autoral&&q.origem==='Autoral'&&q.ano===0);
 assert.equal(q.pags.length,0);assert.equal(q.alts.length,4);assert.equal(new Set(q.alts).size,4);
 assert.match(q.resposta,/^[ABCD]$/);assert.ok(q.explicacao.trim()&&q.enun.trim(),q.id);
 assert.equal(run(`G[${JSON.stringify(q.id)}]`),q.resposta);
 assert.equal(run(`qRef(Q_ALL.find(q=>q.id===${JSON.stringify(q.id)}))`),`Autoral · Q${q.num}`);
}
const topics=new Set(list.map(q=>q.topico));assert.equal(topics.size,16);
for(const t of topics)assert.deepEqual(list.filter(q=>q.topico===t).map(q=>q.dificuldade),['Fácil','Média','Difícil']);
for(const level of ['Fácil','Média','Difícil'])assert.equal(run(`filt({orig:'Autorais',dif:'${level}'}).length`),16);
assert.equal(run("filt({orig:'Provas anteriores'}).length"),150);
assert.equal(run("filt({orig:'Provas anteriores',dif:'Fácil'}).length"),0);
assert.equal(run("filt({dif:'Sem classificação'}).length"),150);
assert.equal(run("filt({ano:'2026'}).length"),30);
assert.equal(run("anos.includes(0)"),false);
// Frequência calculada apenas com as provas oficiais recentes.
const counts=run("Q.filter(q=>!q.autoral&&q.ano>=2022).reduce((a,q)=>(a[q.topico]=(a[q.topico]||0)+1,a),{})");
assert.equal(counts['Interpretação e inferência (informação explícita e implícita)'],10);
for(const t of topics)assert.ok(counts[t]>=4,t);
const unselected=Object.entries(counts).filter(([t])=>!topics.has(t));
assert.ok(unselected.every(([,n])=>n<=4));
// Gabaritos numéricos conferidos por cálculos independentes dos comentários.
const choice=n=>{const q=list.find(q=>q.num===n);return q.alts['ABCD'.indexOf(q.resposta)]};
const number=n=>Number(choice(n).match(/[\d.,]+/)[0].replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.').replace(/\.$/,''));
const expected=new Map([
 [7,(6+8+10+12)/4], [9,21*7.8-(12*7+8*9)],
 [16,180*.85],[17,(1.2*.9-1)*100],[18,(200*.5-200*.4)/.5],
 [19,36],[25,450/(180/6)],[26,6*10/15],[27,2400*(6*8*3)/(4*6*5)],
 [37,800*.02*5],[38,(1770-1500)/(1500*.015)],[39,2800/(1+.18*8/12)],
 [40,3.6*50000/100000],[41,2100*2/7],[42,120/(60/40+60/60)],
 [43,Math.hypot(6,8)],[44,Math.sqrt(13**2-5**2)],[45,((46/2)**2-17**2)/2],
]);
for(const [n,result] of expected)assert.ok(Math.abs(number(n)-result)<1e-9,`Questão ${n}: ${choice(n)} versus ${result}`);
const median=[18,12,15,12,20,14,16].sort((a,b)=>a-b)[3];assert.equal(choice(8),`${median} e 12.`);
assert.equal(choice(20),'2 lápis e 3 canetas.');assert.equal(choice(21),'13h.');
for(const [n,expected] of [[22,3/10],[23,4/7*3/6],[24,4*3/(7*6/2)]]){
 const [a,b]=choice(n).match(/(\d+)\/(\d+)/).slice(1).map(Number);assert.ok(Math.abs(a/b-expected)<1e-12);
}
run("S.resp['aut-001']={r:'ABCD'.split('').find(x=>x!==G['aut-001']),ok:false};regAtt(Q.find(q=>q.id==='aut-001'),S.resp['aut-001'],false)");
assert.equal(run("hInfo('aut-001').first"),false);
assert.equal(run("filt({orig:'Autorais',st:'Erradas'}).length"),1);
run("S.fav.push('aut-045')");assert.equal(run("filt({orig:'Autorais',st:'Favoritas'})[0].id"),'aut-045');
const gate=fs.readFileSync('auth-gate.js','utf8'),sw=fs.readFileSync('sw.js','utf8');
assert.ok(gate.indexOf('questoes-autorais.js?v=20261120-1')<gate.indexOf('app.js?v=20261120-5'));
assert.ok(sw.includes('questoes-autorais.js?v=20261120-1'));
console.log('OK: 48 autorais, 16 assuntos por frequência, 3 níveis, IDs únicos, filtros, gabaritos numéricos, histórico, favoritas, progresso anterior e cache offline.');
