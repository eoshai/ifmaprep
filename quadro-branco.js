/* Rascunhos locais por conta e questão/página. Não entram no progresso nem no gabarito. */
(()=>{
 const memory=new Map();let database=null,active=null;
 const escape=text=>String(text??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const owner=()=>window.IFMA_AUTH?.readSession()?.uid||null;
 function imageURL(src){try{const url=new URL(src,location.href);return url.origin===location.origin&&/\.(webp|png|jpe?g)$/i.test(url.pathname)?url.href:null}catch{return null}}
 function db(){
  if(!database)database=new Promise((resolve,reject)=>{if(!window.indexedDB){reject(Error('storage'));return}const req=indexedDB.open('aprovaifma-rascunhos',1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('boards'))req.result.createObjectStore('boards',{keyPath:'id'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('blocked'))});
  return database;
 }
 async function read(id){
  if(memory.has(id))return structuredClone(memory.get(id));
  try{const database=await db(),record=await new Promise((resolve,reject)=>{const tx=database.transaction('boards','readonly'),request=tx.objectStore('boards').get(id);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)});return {strokes:Array.isArray(record?.strokes)?record.strokes:[],persistent:true}}
  catch{return {strokes:[],persistent:false}}
 }
 async function write(id,strokes){
  const snapshot=structuredClone(strokes),entry={strokes:snapshot,persistent:false};memory.set(id,entry);
  try{const database=await db();await new Promise((resolve,reject)=>{const tx=database.transaction('boards','readwrite');tx.objectStore('boards').put({id,strokes:snapshot,updatedAt:Date.now()});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)});entry.persistent=true;return true}catch{return false}
 }
 function open(options={}){
  const uid=owner();if(!uid||typeof APP_ACCOUNT_UID!=='undefined'&&APP_ACCOUNT_UID!==uid)return;
  active?.close();
  const pages=(options.pages||[]).map((page,i)=>({src:imageURL(page.src),label:page.label||'Página '+(i+1)})).filter(page=>page.src);
  const dialog=document.createElement('dialog');dialog.id='study-board';dialog.className='study-board';dialog.setAttribute('aria-labelledby','board-title');
  const reference=options.question;
  dialog.innerHTML=`<header class="board-header"><div><h2 id="board-title">Quadro branco</h2><small>${escape(options.title||'Rascunho')}</small></div><button type="button" class="btn" data-board-action="close" aria-label="Fechar quadro branco">✕ Fechar</button></header><div class="board-tools"><label class="board-mode">Papel<select id="board-mode"><option value="blank">Folha em branco</option>${pages.map((page,i)=>`<option value="${i}">Anotar · ${escape(page.label)}</option>`).join('')}</select></label><div class="board-tool-group" role="group" aria-label="Ferramenta"><button type="button" class="btn p" data-board-tool="pen" aria-pressed="true">✎ Caneta</button><button type="button" class="btn" data-board-tool="eraser" aria-pressed="false">Borracha</button><button type="button" class="btn" data-board-tool="pan" aria-pressed="false">✥ Mover</button></div><label>Cor<input id="board-color" type="color" value="#162033" aria-label="Cor da caneta"></label><label>Traço<select id="board-size" aria-label="Espessura da caneta"><option value="2">Fino</option><option value="4" selected>Médio</option><option value="8">Grosso</option></select></label><div class="board-tool-group"><button type="button" class="btn" data-board-action="undo">↶ Desfazer</button><button type="button" class="btn" data-board-action="redo">↷ Refazer</button><button type="button" class="btn" data-board-action="clear">Limpar</button></div><div class="board-tool-group" role="group" aria-label="Zoom do papel"><button type="button" class="btn" data-board-action="out" aria-label="Diminuir zoom">−</button><button type="button" class="btn" data-board-action="fit">Ajustar</button><button type="button" class="btn" data-board-action="in" aria-label="Aumentar zoom">+</button></div></div>${reference?`<details class="board-reference"><summary>Consultar questão</summary><div>${escape(reference.enun||'Consulte a página da prova na seleção de papel acima.')}${reference.tabela?'\n\n'+escape(reference.tabela.titulo)+'\n'+reference.tabela.linhas.map(row=>escape(row.join(' · '))).join('\n'):''}${reference.alts?.length?'\n\n'+reference.alts.map((alt,i)=>escape('ABCDE'[i]+') '+alt)).join('\n'):''}</div></details>`:''}<p class="board-hint">Use a caneta para desenhar. Selecione Mover para rolar o papel com o dedo.</p><div class="board-viewport" id="board-viewport"><div class="board-sheet"><img class="board-page" alt="Página da prova para anotar" draggable="false" hidden><canvas id="board-canvas" aria-label="Área de rascunho: desenhe com mouse, dedo ou caneta"></canvas></div></div><footer class="board-footer"><span id="board-save-status" role="status" aria-live="polite">Abrindo rascunho…</span><span id="board-zoom-label">100%</span></footer>`;
  const opener=document.activeElement;document.body.appendChild(dialog);dialog.showModal();
  const canvas=dialog.querySelector('canvas'),context=canvas.getContext('2d'),viewport=dialog.querySelector('.board-viewport'),sheet=dialog.querySelector('.board-sheet'),image=dialog.querySelector('.board-page'),mode=dialog.querySelector('#board-mode'),status=dialog.querySelector('#board-save-status');
  let strokes=[],redo=[],current=null,pointer=null,tool='pen',zoom=1,aspect=1.25,ready=false,key='',generation=0,saveTimer=null,saveVersion=0,closed=false,closing=false;
  function prepareClose(){if(closing)return;closing=true;finish();persist()}
  const state={uid,close:()=>{prepareClose();dialog.close()}};active=state;
  const valid=()=>!closed&&!closing&&active===state&&owner()===uid;
  const controls=()=>{dialog.querySelector('[data-board-action=undo]').disabled=!ready||!strokes.length;dialog.querySelector('[data-board-action=redo]').disabled=!ready||!redo.length;dialog.querySelector('[data-board-action=clear]').disabled=!ready||!strokes.some(stroke=>stroke.tool!=='clear');canvas.style.pointerEvents=ready&&tool!=='pan'?'auto':'none'};
  function strokeDraw(stroke){
   if(stroke.tool==='clear'){context.save();context.setTransform(1,0,0,1,0,0);context.clearRect(0,0,canvas.width,canvas.height);context.restore();return}
   if(!Array.isArray(stroke.points)||!stroke.points.length)return;
   context.save();context.globalCompositeOperation=stroke.tool==='eraser'?'destination-out':'source-over';context.strokeStyle=stroke.color||'#162033';context.fillStyle=stroke.color||'#162033';context.lineWidth=stroke.width;context.lineCap='round';context.lineJoin='round';context.beginPath();
   const first=stroke.points[0];if(stroke.points.length===1){context.arc(first.x,first.y,stroke.width/2,0,Math.PI*2);context.fill()}else{context.moveTo(first.x,first.y);for(const point of stroke.points.slice(1))context.lineTo(point.x,point.y);context.stroke()}context.restore();
  }
  function render(){
   const width=Math.max(100,Math.round(Math.min(1000,Math.max(100,viewport.clientWidth-24))*zoom)),height=Math.round(width*aspect),ratio=Math.min(devicePixelRatio||1,2);
   sheet.style.width=width+'px';sheet.style.height=height+'px';canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);context.setTransform(width*ratio,0,0,width*ratio,0,0);
   strokes.forEach(strokeDraw);if(current)strokeDraw(current);dialog.querySelector('#board-zoom-label').textContent=Math.round(zoom*100)+'%';controls();
  }
  function queueSave(){clearTimeout(saveTimer);status.textContent='Salvando rascunho…';saveTimer=setTimeout(persist,300)}
  async function persist(){
   clearTimeout(saveTimer);if(!key||!ready)return;const target=key,version=++saveVersion,snapshot=structuredClone(strokes),ok=await write(target,snapshot);
   if(valid()&&target===key&&version===saveVersion)status.textContent=ok?'Rascunho salvo neste aparelho.':'Rascunho mantido nesta sessão; não foi possível salvar no aparelho.';
  }
  function finish(){if(!current)return;strokes.push(current);redo=[];current=null;pointer=null;queueSave();controls()}
  async function changeMode(){
   finish();await persist();if(!valid())return;const version=++generation;ready=false;controls();status.textContent='Abrindo rascunho…';
   const page=mode.value==='blank'?null:pages[Number(mode.value)],source=page?.src;
   key=JSON.stringify([uid,source?'page:'+new URL(source).pathname:'blank:'+(options.key||'geral')]);
   image.hidden=!page;image.removeAttribute('src');aspect=1.25;zoom=1;viewport.scrollTop=0;viewport.scrollLeft=0;strokes=[];redo=[];render();
   const stored=await read(key);if(!valid()||version!==generation)return;strokes=stored.strokes.filter(stroke=>stroke&&(stroke.tool==='clear'||['pen','eraser'].includes(stroke.tool)&&Number.isFinite(stroke.width)&&stroke.width>0&&Array.isArray(stroke.points)&&stroke.points.every(point=>Number.isFinite(point.x)&&Number.isFinite(point.y))));
   if(source){try{await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=source});if(!valid()||version!==generation)return;aspect=image.naturalHeight/image.naturalWidth;if(!Number.isFinite(aspect)||aspect<=0)throw Error('image')}catch{if(valid()&&version===generation){status.textContent='Não foi possível abrir essa imagem. Selecione Folha em branco ou tente novamente com conexão.';image.hidden=true}return}}
   if(!valid()||version!==generation)return;ready=true;status.textContent=stored.persistent?'Rascunho salvo automaticamente neste aparelho.':'Rascunho disponível somente nesta sessão.';render();
  }
  const point=e=>{const rect=canvas.getBoundingClientRect();return{x:(e.clientX-rect.left)/rect.width,y:(e.clientY-rect.top)/rect.width}};
  canvas.addEventListener('pointerdown',e=>{if(!ready||tool==='pan'||pointer!==null||e.button!==0)return;e.preventDefault();pointer=e.pointerId;try{canvas.setPointerCapture(pointer)}catch{}current={tool,color:dialog.querySelector('#board-color').value,width:(tool==='eraser'?Math.max(18,Number(dialog.querySelector('#board-size').value)*4):Number(dialog.querySelector('#board-size').value))/canvas.getBoundingClientRect().width,points:[point(e)]};strokeDraw(current)});
  canvas.addEventListener('pointermove',e=>{if(!current||pointer!==e.pointerId)return;e.preventDefault();const events=e.getCoalescedEvents?.()||[e];for(const event of events){const next=point(event),previous=current.points.at(-1);current.points.push(next);strokeDraw({...current,points:[previous,next]})}});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,e=>{if(pointer===e.pointerId)finish()});
  dialog.querySelectorAll('[data-board-tool]').forEach(button=>button.onclick=()=>{finish();tool=button.dataset.boardTool;dialog.querySelectorAll('[data-board-tool]').forEach(other=>{const on=other===button;other.classList.toggle('p',on);other.setAttribute('aria-pressed',String(on))});viewport.classList.toggle('board-pan',tool==='pan');controls()});
  mode.onchange=changeMode;
  dialog.querySelectorAll('[data-board-action]').forEach(button=>button.onclick=()=>{
   const action=button.dataset.boardAction;if(action==='close'){state.close();return}finish();
   if(action==='undo'&&strokes.length){redo.push(strokes.pop());queueSave()}else if(action==='redo'&&redo.length){strokes.push(redo.pop());queueSave()}else if(action==='clear'&&ready){strokes.push({tool:'clear'});redo=[];queueSave()}
   else if(action==='in')zoom=Math.min(3,zoom+.25);else if(action==='out')zoom=Math.max(.5,zoom-.25);else if(action==='fit')zoom=1;render();
  });
  dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'&&!e.target.matches('input,select,textarea')){e.preventDefault();dialog.querySelector('[data-board-action='+(e.shiftKey?'redo':'undo')+']').click()}});
  const observer=new ResizeObserver(()=>{if(valid())render()});observer.observe(viewport);
  dialog.addEventListener('cancel',prepareClose);
  dialog.addEventListener('close',()=>{prepareClose();closed=true;generation++;observer.disconnect();dialog.remove();if(active===state)active=null;if(opener?.isConnected)opener.focus()},{once:true});
  if(options.initialImage&&pages.length)mode.value=String(Math.max(0,pages.findIndex(page=>page.src===imageURL(options.initialImage))));
  changeMode();
 }
 function openQuestion(q){open({key:'question:'+q.id,title:q.reference||(q.autoral?'Autoral':q.ano)+' · Q'+q.num,question:q,pages:(q.pags||[]).map(page=>({src:'img/'+q.ano+'_'+page+'.webp',label:'Página '+page}))})}
 function openImage(src,label){const safe=imageURL(src);if(safe)open({key:'image:'+new URL(safe).pathname,title:label||'Anotar página da prova',pages:[{src:safe,label:label||'Página da prova'}],initialImage:safe})}
 window.IFMA_BOARD={open,openQuestion,openImage};
 document.addEventListener('click',e=>{
  const page=e.target.closest('[data-board-image]');if(page){e.preventDefault();openImage(page.dataset.boardImage,page.dataset.boardLabel);return}
  const sim=e.target.closest('[data-whiteboard-exam]');if(sim){const exam=sim.dataset.whiteboardExam,n=Number(sim.dataset.whiteboardNumber),meta=typeof SX_EXAMS!=='undefined'&&SX_EXAMS[exam];if(!meta||n<1||n>30)return;const page=meta.pages.findIndex(nums=>nums.includes(n))+1;open({key:'sim:'+exam+':'+n,title:meta.name+' · Q'+n,pages:[...new Set([page,...(meta.support||[])])].filter(v=>v>0).map(v=>({src:meta.base+'pagina-'+v+'.webp',label:'Página '+v}))})}
 });
 addEventListener('ifma:navigate',()=>active?.close());
 addEventListener('ifma:session',()=>{if(active&&owner()!==active.uid)active.close()});
})();
