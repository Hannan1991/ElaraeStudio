/* Shared, progressively enhanced image/video galleries. No automatic slide rotation. */
(() => {
 'use strict';
 const projects = new Map((window.ELARAE_PROJECTS || []).map(p => [p.id, p]));
 const states = [];
 const supportsDialog = typeof HTMLDialogElement !== 'undefined';
 let active = null, opener = null, modalToken = 0, locked = null, modalMedia = null;
 const dialog = document.createElement('dialog');
 dialog.className = 'pf-dialog'; dialog.setAttribute('aria-labelledby', 'pf-dialog-title');
 dialog.innerHTML = '<header class="pf-dialog-head"><h2 id="pf-dialog-title"></h2><div class="pf-dialog-actions"><button type="button" data-pf-zoom aria-pressed="false">1:1</button><button type="button" data-pf-close autofocus aria-label="Galerij sluiten">Sluiten ×</button></div></header><div class="pf-viewer"></div><footer class="pf-dialog-foot"><button type="button" data-pf-prev aria-label="Vorig galerijbeeld">← Vorige</button><div class="pf-dialog-description"><span class="pf-dialog-caption"></span><span class="pf-dialog-count" role="status" aria-live="polite" aria-atomic="true"></span></div><button type="button" data-pf-next aria-label="Volgend galerijbeeld">Volgende →</button></footer>';
 if (supportsDialog) document.body.append(dialog);
 const viewer = dialog.querySelector('.pf-viewer'), zoom = dialog.querySelector('[data-pf-zoom]');
 const escapeSelector = 'video,input,textarea,select,[role="slider"],[contenteditable="true"]';
 function image(src, alt, cls) {
  const img = new Image(); img.className = cls; img.alt = alt; img.decoding = 'async'; window.ElaraeMedia.image(img, src, { full: cls === 'pf-full-media', thumb: cls === '', eager: cls !== '' });
  return img;
 }
 async function loaded(img) { if (img.decode) await img.decode(); else if (!img.complete) await new Promise((ok,no) => { img.onload=ok; img.onerror=no; }); if (!img.naturalWidth) throw Error('Image unavailable'); }
 function saveVideo(state, element, index = state.index) { if (element?.tagName === 'VIDEO') { state.positions.set(index, element.currentTime || 0); element.pause(); } }
 function video(state, item, cls) {
  const v = document.createElement('video'); v.className=cls; v.controls=true; v.playsInline=true; v.preload='none'; v.poster=window.ElaraeMedia.lookup(item.poster)?.src || item.poster; v.setAttribute('aria-label',item.alt || item.caption);
  v.src=item.src;
  const saved=state.positions.get(state.index) || 0;
  if(saved>0){v.preload='metadata';v.addEventListener('loadedmetadata',()=>{if(Number.isFinite(v.duration))v.currentTime=Math.min(saved,Math.max(0,v.duration-.05));},{once:true});}
  return v;
 }
 function failure(item) { const box=document.createElement('div');box.className='pf-error';const p=document.createElement('p');p.textContent='Dit bestand kon niet worden geladen.';const a=document.createElement('a');a.href=item.src;a.target='_blank';a.rel='noopener';a.textContent='Open het originele bestand ↗';box.append(p,a);return box; }
 async function preview(state) {
  const ticket=++state.token,item=state.project.media[state.index];state.surface.setAttribute('aria-busy','true');
  let content;
  try {
   if(item.type==='video')content=video(state,item,'pf-item');
   else if(false){
    content=document.createElement('div');content.className='pf-composition';const full=image(item.src,item.alt,'pf-original');const detail=document.createElement('div');detail.className='pf-context';const related=image(item.pair,'','');related.setAttribute('aria-hidden','true');const label=document.createElement('span');label.className='pf-detail-tag';label.textContent='Detail';label.setAttribute('aria-hidden','true');detail.append(related,label);content.append(full,detail);await Promise.all([loaded(full),loaded(related)]);
   } else {content=image(item.src,item.alt,'pf-item');await loaded(content);}
  }catch{content=failure(item);}
  if(ticket!==state.token){if(content.tagName==='VIDEO')content.pause();return;}
  state.host.replaceChildren(content);state.currentMedia=content;state.renderedIndex=state.index;state.surface.removeAttribute('aria-busy');
  state.root.querySelector('.pf-position').textContent=`${String(state.index+1).padStart(2,'0')} / ${String(state.project.media.length).padStart(2,'0')}`;
  state.root.querySelector('.pf-status').textContent=`${item.type==='video'?'Video':'Afbeelding'} ${state.index+1} van ${state.project.media.length}: ${item.caption}`;
  state.expand.href=item.src;
  state.root.querySelectorAll('.pf-thumb').forEach((button,i)=>{button.classList.toggle('active',i===state.index);button.setAttribute('aria-pressed',String(i===state.index));});
  const caption=state.root.querySelector('.pf-caption');if(caption)caption.textContent=item.caption;

 }
 async function modal() {
  if(!active || !dialog.open)return;
  const ticket=++modalToken,item=active.project.media[active.index];saveVideo(active,modalMedia,active.modalIndex);active.modalIndex=active.index;
  viewer.removeAttribute('data-zoomed');viewer.scrollTo(0,0);viewer.setAttribute('aria-busy','true');zoom.setAttribute('aria-pressed','false');zoom.textContent='1:1';zoom.hidden=item.type==='video';if(zoom.hidden&&document.activeElement===zoom)dialog.querySelector('[data-pf-close]').focus({preventScroll:true});
  dialog.querySelector('#pf-dialog-title').textContent=active.project.name;
  let content;
  try{content=item.type==='video'?video(active,item,'pf-full-media'):image(item.src,item.alt,'pf-full-media');if(item.type==='image')await loaded(content);}catch{content=failure(item);}
  if(ticket!==modalToken || !dialog.open)return;
  viewer.replaceChildren(content);modalMedia=content;viewer.removeAttribute('aria-busy');
  dialog.querySelector('.pf-dialog-caption').textContent=item.caption;
  dialog.querySelector('.pf-dialog-count').textContent=`${active.index+1} / ${active.project.media.length} · ${item.type==='video'?'Video':'Afbeelding'}`;
 }
 function advance(state,delta) {
  if(dialog.open && active===state){saveVideo(state,modalMedia,state.modalIndex);modalMedia=null;}else saveVideo(state,state.currentMedia,state.renderedIndex);
  state.index=(state.index+delta+state.project.media.length)%state.project.media.length;
  if(dialog.open && active===state)modal();else preview(state);
 }
 function open(state,trigger){
  saveVideo(state,state.currentMedia,state.renderedIndex);active=state;opener=trigger;modalMedia=null;state.modalIndex=state.index;
  locked={y:window.scrollY,x:window.scrollX,overflow:document.documentElement.style.overflow,padding:document.body.style.paddingRight};
  const gutter=window.innerWidth-document.documentElement.clientWidth;if(gutter>0)document.body.style.paddingRight=`${parseFloat(getComputedStyle(document.body).paddingRight)+gutter}px`;
  document.documentElement.style.overflow='hidden';dialog.style.setProperty('--project-tone',state.project.tone);dialog.showModal();dialog.querySelector('[data-pf-close]').focus();modal();
 }
 function swipe(element,getState,blocked) {
  let start=null;
  element.addEventListener('pointerdown',e=>{if(e.isPrimary===false || e.button>0 || blocked?.() || e.target.closest('button,a,input,[role="slider"]'))return;const v=e.target.closest('video');if(v&&e.clientY>=v.getBoundingClientRect().bottom-60)return;start={x:e.clientX,y:e.clientY,id:e.pointerId};});
  element.addEventListener('pointercancel',()=>{start=null;});
  element.addEventListener('pointerup',e=>{if(!start || start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>=50 && Math.abs(dx)>Math.abs(dy)*1.5){const state=getState();if(state)advance(state,dx<0?1:-1);}});
 }
 // Future projects added to the data file receive the same component automatically.
 const listing=document.querySelector('#portfolio .project-list');
 if(listing)projects.forEach(project=>{
  if(!Array.isArray(project.media)||!project.media.length||[...listing.children].some(c=>c.dataset.project===project.id))return;
  const root=document.createElement('article');root.className='portfolio-project';root.id=project.id;root.dataset.project=project.id;root.style.setProperty('--project-tone',project.tone || '#e9ded4');
  root.innerHTML='<div class="pf-surface" role="group" aria-roledescription="galerij"><div class="pf-media"></div><button class="pf-arrow pf-prev" type="button">←</button><button class="pf-arrow pf-next" type="button">→</button><a class="pf-expand" target="_blank" rel="noopener" aria-haspopup="dialog">+</a></div><div class="pf-info"><div class="pf-meta"><span></span><span class="pf-position" aria-hidden="true"></span></div><h3></h3><p class="pf-counts"></p><p class="pf-description"></p><a class="pf-case-link">Ontdek de case study <span aria-hidden="true">↗</span></a><p class="pf-status sr-only" role="status" aria-live="polite" aria-atomic="true"></p></div>';
  const title=root.querySelector('h3');title.id='pf-title-'+project.id;title.textContent=project.name;root.querySelector('.pf-surface').setAttribute('aria-labelledby',title.id);
  root.querySelector('.pf-meta>span').textContent=project.number+' / '+project.sector;root.querySelector('.pf-description').textContent=project.description;root.querySelector('.pf-case-link').href=project.caseUrl;
  root.querySelector('.pf-prev').setAttribute('aria-label','Vorig beeld van '+project.name);root.querySelector('.pf-next').setAttribute('aria-label','Volgend beeld van '+project.name);
  const first=project.media[0];const initial=first.type==='video'?video({index:0,positions:new Map()},first,'pf-item'):image(first.src,first.alt,'pf-item');if(first.type==='image')initial.loading='lazy';root.querySelector('.pf-media').append(initial);
  const plus=root.querySelector('.pf-expand');plus.href=first.src;plus.setAttribute('aria-label','Open de volledige galerij van '+project.name);listing.append(root);
 });
 document.querySelectorAll('.portfolio-project[data-project]').forEach(root=>{
  const project=projects.get(root.dataset.project);if(!project || !project.media.length)return;
  const state={root,project,index:0,renderedIndex:0,modalIndex:0,positions:new Map(),token:0,surface:root.querySelector('.pf-surface'),host:root.querySelector('.pf-media'),expand:root.querySelector('.pf-expand'),currentMedia:root.querySelector('.pf-item')};states.push(state);root.addEventListener('pf:open',e=>{state.index=e.detail.index;open(state,e.detail.trigger);});
  if(root.closest('#portfolio')){
   const info=root.querySelector('.pf-info'), surface=state.surface;
   const gallery=document.createElement('div');gallery.className='pf-gallery';
   surface.before(gallery);gallery.append(surface);
   const footer=document.createElement('div');footer.className='pf-gallery-footer';
   const caption=document.createElement('span');caption.className='pf-caption';caption.textContent=project.media[0].caption;
   const thumbs=document.createElement('div');thumbs.className='pf-thumbs';thumbs.setAttribute('aria-label','Projectbeelden kiezen');
   project.media.forEach((item,i)=>{
    const button=document.createElement('button');button.type='button';button.className='pf-thumb'+(i===0?' active':'');button.setAttribute('aria-label','Toon '+item.caption);button.setAttribute('aria-pressed',String(i===0));
    const img=image(item.type==='video'?item.poster:item.src,'','');img.loading='lazy';button.append(img);
    if(item.type==='video'){const play=document.createElement('span');play.textContent='▶';button.append(play);}
    button.addEventListener('click',()=>{if(i!==state.index)advance(state,i-state.index);});thumbs.append(button);
   });
   footer.append(caption,thumbs);gallery.append(footer);gallery.append(root.querySelector('.pf-counts'));gallery.append(root.querySelector('.pf-case-link'));root.prepend(info);
  }

  root.querySelector('h3').textContent=project.name;root.querySelector('.pf-meta>span').textContent=project.number+' / '+project.sector;root.querySelector('.pf-description').textContent=project.description;if(root.dataset.caseView!=='true')root.querySelector('.pf-case-link').href=project.caseUrl;
  const photos=project.media.filter(m=>m.type==='image').length,videos=project.media.length-photos;root.querySelector('.pf-counts').textContent=[photos?photos+' beelden':'',videos?videos+' '+(videos===1?'video':'video’s'):''].filter(Boolean).join(' · ');root.querySelector('.pf-position').textContent=`01 / ${String(project.media.length).padStart(2,'0')}`;
  root.querySelectorAll('.pf-arrow').forEach(b=>{b.disabled=project.media.length<2;});
  root.querySelector('.pf-prev').addEventListener('click',()=>advance(state,-1));root.querySelector('.pf-next').addEventListener('click',()=>advance(state,1));
  state.expand.addEventListener('click',e=>{if(!supportsDialog || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)return;e.preventDefault();open(state,state.expand);});
  root.addEventListener('keydown',e=>{if(!state.surface.contains(e.target)||dialog.open || e.target.closest(escapeSelector))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();advance(state,e.key==='ArrowRight'?1:-1);}});
  const initialSource=state.currentMedia?.dataset.originalSrc||state.currentMedia?.getAttribute('src')||state.currentMedia?.querySelector('source')?.getAttribute('data-src')||state.currentMedia?.querySelector('source')?.getAttribute('src');
  swipe(state.surface,()=>state);if(!initialSource||new URL(initialSource,document.baseURI).href!==new URL(project.media[0].src,document.baseURI).href)preview(state);
 });
 if(!supportsDialog)return;
 dialog.querySelector('[data-pf-close]').addEventListener('click',()=>dialog.close());dialog.querySelector('[data-pf-prev]').addEventListener('click',()=>active&&advance(active,-1));dialog.querySelector('[data-pf-next]').addEventListener('click',()=>active&&advance(active,1));
 zoom.addEventListener('click',()=>{const on=viewer.toggleAttribute('data-zoomed');zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'Passend':'1:1';});
 dialog.addEventListener('keydown',e=>{
  if(e.key==='Tab'){
   const stops=[...dialog.querySelectorAll('button:not([disabled]),a[href],video[controls],[tabindex]:not([tabindex="-1"])')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]'));
   const first=stops[0],last=stops[stops.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
   return;
  }
  if(e.target.closest(escapeSelector) || viewer.hasAttribute('data-zoomed'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();advance(active,e.key==='ArrowRight'?1:-1);}
 });
 document.addEventListener('focusin',e=>{if(dialog.open&&!dialog.contains(e.target))dialog.querySelector('[data-pf-close]').focus({preventScroll:true});});
 swipe(viewer,()=>active,()=>viewer.hasAttribute('data-zoomed'));
 dialog.addEventListener('close',()=>{
  ++modalToken;if(active){saveVideo(active,modalMedia,active.modalIndex);preview(active);}modalMedia=null;viewer.replaceChildren();
  if(locked){document.documentElement.style.overflow=locked.overflow;document.body.style.paddingRight=locked.padding;window.scrollTo({left:locked.x,top:locked.y,behavior:'instant'});}
  opener?.focus({preventScroll:true});active=null;locked=null;
 });
})();
