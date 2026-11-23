/* Progressive enhancement: the seven original examples remain the source of truth. */
(() => {
 'use strict';
 const grid=document.querySelector('.sf-sector-grid');
 if(!grid)return;
 const panels=[...grid.querySelectorAll('.sf-sector')];
 if(panels.length<2)return;
 const section=grid.closest('section'),intro=document.createElement('div');intro.className='sf-world-intro';section.prepend(intro);intro.append(section.querySelector(':scope > .eyebrow'),section.querySelector('h2'),section.querySelector('.sf-sector-subtitle'),section.querySelector('.sf-sector-intro'));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(min-width:651px) and (hover:hover) and (pointer:fine)');
 const palettes=[['#76505e','#f0e5e8'],['#875c46','#f0e4dc'],['#536046','#e8ebe2'],['#6d5c7e','#ede8f1'],['#35393c','#e7e7e5'],['#633440','#eee3e6'],['#80603c','#f0e7db']];
 const shell=document.createElement('div');shell.className='sf-sector-showcase';grid.before(shell);
 const nav=document.createElement('div');nav.className='sf-sector-nav';nav.setAttribute('role','group');nav.setAttribute('aria-label','Kies een sector');shell.append(nav);
 const presentation=document.createElement('div');presentation.className='sf-sector-presentation';shell.append(presentation);
 const stage=document.createElement('div');stage.className='sf-sector-stage';stage.tabIndex=0;stage.setAttribute('role','group');stage.setAttribute('aria-label','Sectorvoorbeeld: Schoonheidssalon');presentation.append(stage);stage.append(grid);
 const controls=document.createElement('div');controls.className='sf-sector-controls';
 const previous=document.createElement('button');previous.type='button';previous.className='sf-sector-previous';previous.setAttribute('aria-label','Vorig sectorvoorbeeld');previous.textContent='←';
 const progress=document.createElement('div');progress.className='sf-sector-progress';
 const count=document.createElement('span');count.className='sf-sector-count';
 const hint=document.createElement('span');hint.className='sf-sector-hint';hint.textContent='Veeg om te verkennen';progress.append(count,hint);
 const next=document.createElement('button');next.type='button';next.className='sf-sector-next';next.setAttribute('aria-label','Volgend sectorvoorbeeld');next.textContent='→';controls.append(previous,progress,next);presentation.append(controls);
 const live=document.createElement('span');live.className='sr-only';live.setAttribute('role','status');live.setAttribute('aria-live','polite');presentation.append(live);
 let active=0,hoverTimer=null,ticket=0,start=null,frame=null,animations=[];
 const buttons=panels.map((panel,i)=>{
  const title=panel.querySelector('h3').textContent;
  panel.id='sf-sector-example-'+i;panel.hidden=i!==0;panel.classList.toggle('is-active',i===0);
  const speaker=document.createElement('div');speaker.className='sf-sector-speaker';speaker.textContent='Digitale merkambassadeur';panel.querySelector('.sf-sector-answer').before(speaker);
  const media=document.createElement('div');media.className='sf-sector-world-frame';const image=document.createElement('img');image.className='sf-sector-world';image.src='sofia-worlds.png';image.alt='';image.width=2172;image.height=724;image.loading='lazy';image.decoding='async';image.style.left=(-i*100)+'%';media.append(image);panel.prepend(media);
  const dialogue=document.createElement('div');dialogue.className='sf-sector-dialogue';dialogue.append(panel.querySelector('.sf-sector-question'),speaker,panel.querySelector('.sf-sector-answer'));panel.append(dialogue);
  const caption=document.createElement('span');caption.className='sf-sector-concept-label';caption.textContent='Een mogelijke merkwereld';panel.append(caption);
  const promise=document.createElement('p');promise.className='sf-sector-promise';promise.textContent=['De eerste indruk. Al persoonlijk.','De juiste keuze. Al vóór de spiegel.','Gastvrijheid begint vóór de deur.','Een eerste stap. Met vertrouwen.','Van eerste vraag naar een helder plan.','Rust in een belangrijke vraag.','Een winkelervaring die je begrijpt.'][i];panel.append(promise);
  const button=document.createElement('button');button.type='button';button.className='sf-sector-choice';button.setAttribute('aria-pressed',String(i===0));button.setAttribute('aria-controls',panel.id);
  const number=document.createElement('span');number.className='sf-sector-number';number.textContent=String(i+1).padStart(2,'0');number.setAttribute('aria-hidden','true');
  const label=document.createElement('span');label.textContent=title;
  const arrow=document.createElement('span');arrow.className='sf-sector-choice-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');button.append(number,label,arrow);nav.append(button);
  button.addEventListener('pointerenter',()=>{if(fine.matches){clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>select(i,false),100);}});
  button.addEventListener('pointerleave',()=>clearTimeout(hoverTimer));
  button.addEventListener('focus',()=>{clearTimeout(hoverTimer);if(button.matches(':focus-visible'))select(i,false);});
  button.addEventListener('click',()=>{clearTimeout(hoverTimer);select(i,true);});
  button.addEventListener('keydown',e=>{
   clearTimeout(hoverTimer);
   let target=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')target=Math.min(i+1,panels.length-1);
   if(e.key==='ArrowUp'||e.key==='ArrowLeft')target=Math.max(i-1,0);
   if(e.key==='Home')target=0;if(e.key==='End')target=panels.length-1;
   if(target!==null){e.preventDefault();buttons[target].focus();select(target,true);}
  });return button;
 });
 function paint(i,announce){
  panels.forEach((p,j)=>{p.hidden=j!==i;p.classList.toggle('is-active',j===i);});
  buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));
  shell.style.setProperty('--sector-accent',palettes[i][0]);shell.style.setProperty('--sector-tint',palettes[i][1]);
  count.textContent=String(i+1).padStart(2,'0')+' / '+String(panels.length).padStart(2,'0');
  previous.disabled=i===0;next.disabled=i===panels.length-1;
  stage.setAttribute('aria-label','Sectorvoorbeeld: '+panels[i].querySelector('h3').textContent);
  if(nav.scrollWidth>nav.clientWidth){const r=nav.getBoundingClientRect(),b=buttons[i].getBoundingClientRect();const delta=b.left<r.left?b.left-r.left:b.right>r.right?b.right-r.right:0;if(delta)nav.scrollBy({left:delta,behavior:reduced.matches?'auto':'smooth'});}
  if(announce)live.textContent=panels[i].querySelector('h3').textContent+', voorbeeld '+(i+1)+' van '+panels.length;
  active=i;stage.classList.remove('is-changing');
 }
 async function select(i,announce=true){
  i=Math.max(0,Math.min(i,panels.length-1));
  const token=++ticket;animations.forEach(a=>a.cancel());animations=[];
  if(i===active){if(announce)live.textContent=panels[i].querySelector('h3').textContent+', voorbeeld '+(i+1)+' van '+panels.length;return;}
  if(reduced.matches){paint(i,announce);return;}
  if(typeof panels[active].animate!=='function'){paint(i,announce);return;}
  const outgoing=panels[active].animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-5px)'}],{duration:150,easing:'cubic-bezier(.4,0,.6,1)',fill:'forwards'});
  animations=[outgoing];try{await outgoing.finished;}catch(_){return;}
  if(token!==ticket)return;
  paint(i,announce);outgoing.cancel();
  const incoming=panels[i].animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:210,easing:'cubic-bezier(.22,1,.36,1)'});
  animations=[incoming];try{await incoming.finished;}catch(_){}if(token===ticket)animations=[];
 }
 previous.addEventListener('click',()=>{clearTimeout(hoverTimer);select(active-1);});next.addEventListener('click',()=>{clearTimeout(hoverTimer);select(active+1);});
 stage.addEventListener('keydown',e=>{if(e.target!==stage)return;if(e.key==='ArrowLeft'){e.preventDefault();select(active-1);}if(e.key==='ArrowRight'){e.preventDefault();select(active+1);}});
 stage.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('button,a,input'))return;start={x:e.clientX,y:e.clientY,id:e.pointerId};});
 stage.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.35)select(active+(dx<0?1:-1));});
 stage.addEventListener('pointercancel',()=>{start=null;});
 stage.addEventListener('pointermove',e=>{
  if(!fine.matches||reduced.matches||e.pointerType==='touch')return;
  if(frame!==null)cancelAnimationFrame(frame);
  const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  frame=requestAnimationFrame(()=>{stage.style.setProperty('--sector-tilt-x',(-y*.9)+'deg');stage.style.setProperty('--sector-tilt-y',(x*1.25)+'deg');frame=null;});
 });
 stage.addEventListener('pointerleave',()=>{if(frame!==null)cancelAnimationFrame(frame);frame=null;stage.style.setProperty('--sector-tilt-x','0deg');stage.style.setProperty('--sector-tilt-y','0deg');});
 paint(0,false);
})();
