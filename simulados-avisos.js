/* Uma publicação é identificada por um id estável em simulados/catalogo.json.
   A checagem ocorre no acesso/retorno ao site; não há envio com o site fechado. */
(()=>{
 const KEY='ifma_sim_publicacoes_v1',PREF='ifma_sim_notificacoes';
 const get=(k)=>{try{return localStorage.getItem(k)}catch(e){return null}},put=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
 const read=()=>{try{const a=JSON.parse(get(KEY)||'null');return Array.isArray(a)?a.filter(x=>typeof x==='string'):null}catch(e){return null}};
 const seen=new Set(read()||[]);let initialized=read()!==null||!!get('ifma')||!!(get('app_seen')&&typeof APP_VER!=='undefined'&&get('app_seen')!==APP_VER),busy=false,catalog=[],queued=[],lastCheck=0;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const supported=()=>window.isSecureContext&&'Notification'in window&&'serviceWorker'in navigator;
 const paused=()=>(typeof sxBusy==='function'&&sxBusy())||(typeof sxPractice!=='undefined'&&sxPractice!==null);
 const remember=items=>{for(const id of read()||[])seen.add(id);items.forEach(x=>seen.add(x.id));put(KEY,JSON.stringify([...seen]));initialized=true};
 const enabled=()=>get(PREF)!=='off';
 async function notify(items){if(!items.length||!supported()||!enabled()||Notification.permission!=='granted')return false;
  try{const reg=await Promise.race([navigator.serviceWorker.ready,new Promise(resolve=>setTimeout(()=>resolve(null),2500))]);if(!reg)return false;
   await reg.showNotification(items.length===1?'📋 Novo simulado disponível!':'📋 Novos simulados disponíveis!',{body:items.length===1?items[0].titulo:items.length+' simulados novos esperam por você. Toque para conferir.',icon:'icons/icon-192.png',badge:'icons/icon-192.png',tag:'ifma-sim-'+items.map(x=>x.id).sort().join('-'),data:{type:'simulado',url:'./#simulados=1'}});return true
  }catch(e){return false}}
 async function enable(status){if(!supported()){status.textContent='Este navegador não oferece notificações aqui. No iPhone, adicione o site à Tela de Início e abra pelo ícone. Os avisos dentro do site continuam disponíveis.';return}
  try{const permission=Notification.permission==='granted'?'granted':await Notification.requestPermission();if(permission!=='granted'){status.textContent='O aviso no site continua ativo. Para receber no celular, permita notificações nas configurações do navegador.';return}put(PREF,'on');status.textContent='Avisos ativados neste aparelho. Você será avisado ao voltar ao site quando houver simulado novo.';await notify(catalog.slice(0,1));}catch(e){status.textContent='Não foi possível ativar agora. Os avisos dentro do site continuam disponíveis.'}}
 function removeBanner(){document.getElementById('sim-news-banner')?.remove()}
 function show(items,returning){if(!items.length||paused()||document.visibilityState==='hidden')return;
  // Opening the Simulados section already exposes the release, without an overlay.
  if(typeof V!=='undefined'&&V==='simulados'){remember(items);queued=[];return}
  removeBanner();document.getElementById('nvb')?.remove();const box=document.createElement('div');box.id='sim-news-banner';box.className='nvb';box.setAttribute('role','status');
  box.innerHTML=`<div class="nvt"><b>📋 ${items.length===1?'Novo simulado disponível!':items.length+' novos simulados disponíveis!'}</b><p style="margin:6px 0">${esc(items[0].titulo)}${items.length>1?' e mais '+(items.length-1):''}</p><small class="mu">${items[0].questoes} questões · ${items[0].minutos/60} horas · impresso ou digital</small></div><div class="row"><button class="btn p" data-sim-open>Ver simulados</button><button class="btn" data-sim-close aria-label="Fechar aviso de simulado">✕</button></div>${(!supported()||Notification.permission!=='granted'||!enabled())?'<p style="margin:10px 0 0"><button class="btn" data-sim-enable>🔔 Ativar avisos no celular</button></p><small class="mu" data-sim-status>Você também pode configurar esses avisos em Novidades.</small>':''}`;
  document.body.appendChild(box);remember(items);queued=[];box.querySelector('[data-sim-open]').onclick=()=>{removeBanner();go('simulados')};box.querySelector('[data-sim-close]').onclick=removeBanner;
  const button=box.querySelector('[data-sim-enable]');if(button)button.onclick=()=>enable(box.querySelector('[data-sim-status]'));
  if(returning)notify(items)
 }
 async function check(force=false){if(busy||document.visibilityState==='hidden'||(!force&&Date.now()-lastCheck<10000))return;busy=true;
  try{const res=await fetch('simulados/catalogo.json',{cache:'no-store'});if(!res.ok)throw Error();const data=await res.json();if(!Array.isArray(data))throw Error();
   catalog=data.filter(x=>x&&typeof x.id==='string'&&typeof x.titulo==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x.publicadoEm)&&Number.isFinite(x.questoes)&&Number.isFinite(x.minutos)).sort((a,b)=>b.publicadoEm.localeCompare(a.publicadoEm));
   for(const id of read()||[])seen.add(id);const fresh=catalog.filter(x=>!seen.has(x.id));queued=fresh;show(fresh,initialized);lastCheck=Date.now();
   if(!initialized&&!fresh.length&&catalog.length)remember([])
  }catch(e){/* Offline/erro: não consumir publicações, para tentar de novo no retorno. */}finally{busy=false}}
 window.__simNewsSettings=container=>{if(!container)return;const on=supported()&&Notification.permission==='granted'&&enabled();container.innerHTML=`<h4>🔔 Avisos de novos simulados</h4><p class="mu">Ao voltar ao site, você vê um aviso se houver simulado novo. Com sua permissão, ele também aparece nas notificações do celular. Não precisa de login.</p><button class="btn" data-sim-toggle>${on?'Desativar avisos no celular':'Ativar avisos no celular'}</button><p class="mu" data-sim-status>${on?'Ativados neste aparelho.':'O aviso dentro do site permanece disponível.'}</p>`;container.querySelector('[data-sim-toggle]').onclick=async()=>{const status=container.querySelector('[data-sim-status]');if(on){put(PREF,'off');window.__simNewsSettings(container)}else{await enable(status);if(supported()&&Notification.permission==='granted'&&enabled())window.__simNewsSettings(container)}}};
 addEventListener('ifma:navigate',()=>{if(paused()){removeBanner();return}if(typeof V!=='undefined'&&V==='simulados'){remember(queued);queued=[];removeBanner()}else if(queued.length)show(queued,initialized)});
 addEventListener('pageshow',()=>check(true));addEventListener('online',()=>check(true));
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check(true)});
 if('serviceWorker'in navigator){navigator.serviceWorker.addEventListener('controllerchange',()=>check(true));navigator.serviceWorker.addEventListener('message',e=>{if(e.data?.type==='OPEN_SIMULADOS'){removeBanner();go('simulados')}})}
 addEventListener('storage',e=>{if(e.key===KEY){for(const id of read()||[])seen.add(id);queued=queued.filter(x=>!seen.has(x.id));if(!queued.length)removeBanner()}});
 check(true);
})();
