(() => {
 'use strict';
 const content=window.SOFIA_CONTENT,root=document.querySelector('[data-sofia]');
 if(!content||!root)return;
 const find=s=>root.querySelector(s),log=find('#sf-log'),chips=find('#sf-chips'),input=find('#sf-question'),form=find('#sf-form');
 let brand='elarae',role='ambassador',step=0,answers=[],timer=null,generation=0,focusChoices=false;
 const normal=t=>t.toLocaleLowerCase('nl').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const contactText=t=>t.replaceAll('{email}',window.ELARAE_SETTINGS?.contactEmail||'contact@elaraestudio.be');
 const intake=()=>content.brandIntakes[brand]||content.intake;
 function element(tag,cls,text,parent){const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;if(parent)parent.append(el);return el;}
 function message(text,user=false){const el=element('div','sf-message'+(user?' sf-user':''),contactText(text),log);log.scrollTop=log.scrollHeight;return el;}
 function choices(labels,callback){chips.replaceChildren();labels.forEach((label,i)=>{const b=element('button','',label,chips);b.type='button';b.addEventListener('click',e=>{focusChoices=e.detail===0;callback(label,i);});});if(focusChoices){chips.querySelector('button')?.focus({preventScroll:true});focusChoices=false;}}
 function ready(){form.querySelector('button').disabled=false;input.disabled=false;find('#sf-status').textContent='Merkervaring · voorbeeld';log.setAttribute('aria-busy','false');}
 function respond(text,after,link){
  const token=++generation;clearTimeout(timer);chips.replaceChildren();form.querySelector('button').disabled=true;
  log.setAttribute('aria-busy','true');find('#sf-status').textContent='Sofia bereidt je antwoord voor';
  timer=setTimeout(()=>{if(token!==generation)return;const el=message(text);if(link){const a=element('a','sf-link',link.label,el);a.href=link.href;}ready();after?.();},180);
 }
 function menu(){choices(content.brands[brand].questions.map(q=>q.q),ask);}
 function question(){const list=intake(),q=list[step];respond(`Vraag ${step+1} van ${list.length}: ${q.q}`,()=>choices(q.options,answer));}
 function answer(text){message(text,true);answers.push(text);step++;step<intake().length?question():summary();}
 function summary(){
  ready();chips.replaceChildren();const el=message('');element('h3','','Je vraag, helder voorbereid.',el);
  const labels=intake().map(q=>q.q.replace(/\?$/,'')),dl=element('dl','',null,el);
  answers.forEach((v,i)=>{element('dt','',labels[i],dl);element('dd','',v,dl);});
  element('p','','Dit overzicht is nog niet verstuurd. Neem het mee naar Elarae Studio en voeg daar je contactgegevens toe.',el);
  const cta=element('a','sf-button','Neem mee naar je aanvraag ↗',el);
  const brief='Mijn vraag via Sofia'+(brand!=='elarae'?' (geïnspireerd door '+content.brands[brand].name+')':'')+'\n'+answers.map((v,i)=>labels[i]+': '+v).join('\n');
  cta.href='index.html?sofia='+encodeURIComponent(brief)+'&interesse='+encodeURIComponent(brand==='elarae'?answers[0]:'sofia')+'#contact';
  choices(['Opnieuw beginnen'],()=>reset());step=intake().length;log.scrollTop=log.scrollHeight;
 }
 function ask(raw){const text=raw.trim().slice(0,600);if(!text)return;
  if(role==='intake'&&step<intake().length){answer(text);return;}
  message(text,true);const s=normal(text),questions=content.brands[brand].questions;
  if(brand!=='elarae'&&/(contact|telefoon|bellen|mail|whatsapp)/.test(s)){
   respond('Dit merk is een portfolio-concept. Voor een vergelijkbare website of virtuele merkambassadeur kun je Elarae Studio bereiken via {email}, WhatsApp of het contactformulier.',menu,{href:'index.html#contact',label:'Neem contact op met Elarae Studio ↗'});return;
  }
  let match=questions.find(q=>normal(q.q)===s);
  if(!match){let score=0;questions.forEach(q=>{const n=q.keys.reduce((sum,k)=>sum+(new RegExp('(^|[^a-z])'+normal(k)+'[a-z]*').test(s)?(['kost','prijs','prijzen','welke','pakket','doen'].includes(k)?.1:Math.min(k.length,8)):0),0);if(n>score){score=n;match=q;}});}
  respond(match?match.a:'Die vraag vraagt om persoonlijke aandacht. Kies een onderwerp hieronder of bespreek je vraag rechtstreeks met Elarae Studio.',menu,match?.link);
 }
 function reset(){
  clearTimeout(timer);generation++;step=0;answers=[];log.replaceChildren();chips.replaceChildren();input.value='';ready();form.hidden=role==='intake';
  root.style.setProperty('--sf-accent',content.brands[brand].accent);find('#sf-brand-name').textContent=content.brands[brand].name;
  find('#sf-brand-type').textContent=content.brands[brand].type;find('#sf-role-note').textContent=content.roles[role].note;
  root.querySelectorAll('[data-brand]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.brand===brand)));
  root.querySelectorAll('[data-role]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.role===role)));
  if(role==='intake'){respond(brand==='elarae'?'Laten we beginnen bij jouw plannen. Met vijf korte vragen brengen we je wensen in kaart. Daarna kies je zelf of je het overzicht meeneemt naar je aanvraag.':'Laat je inspireren door '+content.brands[brand].name+'. Met vijf korte vragen ontdek je wat een vergelijkbare ervaring voor jouw onderneming kan betekenen. Je doet hiermee geen aanvraag bij dit conceptmerk.',question);}
  else {const intros={reception:'Welkom bij '+content.brands[brand].name+'. Fijn dat je er bent. Waar kan ik je wegwijs in maken?',service:'Heb je een vraag over '+content.brands[brand].name+'? Ik help je graag verder. Kies een onderwerp of stel je vraag.',sales:'Welke keuze past bij jou? Ontdek het aanbod van '+content.brands[brand].name+' en vertel me wat je aanspreekt.'};respond(intros[role]||content.brands[brand].intro,menu);}
 }
 root.querySelectorAll('[data-brand]').forEach(b=>b.addEventListener('click',()=>{brand=b.dataset.brand;reset();}));
 root.querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>{role=b.dataset.role;reset();}));
 find('#sf-reset').addEventListener('click',()=>reset());
 form.addEventListener('submit',e=>{e.preventDefault();const text=input.value;if(!text.trim())return;input.value='';ask(text);});
 reset();
})();
