const packages=[
{title:'Elarae Start',sub:'Een verfijnde eerste stap naar online.',img:'assets/Brand identity/Pakket-Elarae-Start.png',items:['Professionele website op één pagina','WhatsApp-integratie','QR-code naar je website of contactpagina','Basis branding','Contactmogelijkheden'],note:'Een complete en professionele basis voor jouw onderneming.',price:'Vanaf €99'},
{title:'Elarae Branding',sub:'Een herkenbare signatuur, tot in detail.',img:'assets/Brand identity/Pakket-Elarae-Branding.png',items:['Logo-ontwerp','Kleurpalet','Typografie','Huisstijl','Ontwerp van visitekaartjes','Ontwerp van afspraakkaarten','Ontwerp van cadeaukaarten'],note:'Ontworpen als samenhangend geheel.',price:'Prijs op aanvraag'},
{title:'Elarae Social',sub:'Een feed die voelt als jouw merk.',img:'assets/Brand identity/Pakket-Elarae-Social.png',items:['Instagram feed ontwerp','Story templates','Highlight covers','Social media visuals'],note:'Consistente beelden met een eigen karakter.',price:'Prijs op aanvraag'},
{title:'Elarae Web',sub:'Een complete digitale merkbeleving.',img:'assets/Brand identity/Pakket-Elarae-Web.png',items:['Professionele website','Homepagina','Dienstenpagina','Over-ons-pagina','Portfoliopagina','Contactpagina','Contactformulier','WhatsApp-integratie'],note:'Opgebouwd rond jouw verhaal en aanbod.',price:'Prijs op aanvraag'},
{title:'Elarae Shop',sub:'Een elegante plek voor jouw collectie.',img:'assets/Brand identity/Pakket-Elarae-Shop.png',items:['Webshop op Shopify of Wix','Productcategorieën','Productpagina’s','Webshopontwerp','Basis configuratie'],note:'Platform en inrichting afgestemd op jouw wensen.',price:'Prijs op aanvraag'},
{title:'Elarae Visuals',sub:'Beelden met een eigen sfeer.',img:'assets/Brand identity/Pakket-Elarae-Visuals.png',items:['Productfotografie','Professionele nabewerking','Achtergrond verwijderen','AI-visuals','Websitebeelden','Socialmediabeelden'],note:'Fotografie beschikbaar binnen beperkte afstand. Grotere afstanden mogelijk in overleg.',price:'Prijs op aanvraag'},
{title:'Elarae Content',sub:'Jouw merk, verteld met een gezicht.',img:'assets/Brand identity/Pakket-Elarae-Content.png',items:['Welkomstvideo’s','Uitlegvideo’s','FAQ-video’s','Social media reels','Virtuele merkambassadeurs','AI-presentatievideo’s'],note:'Sofia is exclusief verbonden aan Elarae Studio. Voor klanten ontwikkelen we een eigen virtuele merkambassadeur die aansluit bij hun merkidentiteit.',price:'Prijs op aanvraag'}];
const grid=document.querySelector('#packageGrid');
grid.innerHTML=packages.map((p,i)=>`<article class="package-card"><div class="package-visual"><img src="${p.img}" alt="${p.title} — sfeerbeeld" loading="lazy"><span class="package-num">0${i+1}</span></div><div class="package-body"><h3>${p.title}</h3><div class="package-sub">${p.sub}</div><button class="package-toggle" aria-expanded="false" aria-controls="pkg-${i}">Ontdek pakket <span>＋</span></button><div class="package-details" id="pkg-${i}"><div class="package-inner"><ul>${p.items.map(item=>`<li>${item}</li>`).join('')}</ul><p class="package-note">${p.note}</p><div class="package-price">${p.price}</div></div></div></div></article>`).join('');
grid.addEventListener('click',e=>{const button=e.target.closest('.package-toggle');if(!button)return;const card=button.closest('.package-card'),details=card.querySelector('.package-details'),open=button.getAttribute('aria-expanded')==='true';document.querySelectorAll('.package-toggle').forEach(b=>{b.setAttribute('aria-expanded','false');b.closest('.package-card').querySelector('.package-details').classList.remove('open')});if(!open){button.setAttribute('aria-expanded','true');details.classList.add('open')}});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.header nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const FORMSPREE_ID='mljjzwoo';
const form=document.querySelector('#contactForm'),note=document.querySelector('#formNote');
form.addEventListener('submit',async e=>{e.preventDefault();if(!FORMSPREE_ID){const data=new FormData(form);const subject=encodeURIComponent('Kennismaking — Elarae Studio');const body=encodeURIComponent(`Naam: ${data.get('name')}\nE-mail: ${data.get('email')}\nInteresse: ${data.get('interest')}\n\n${data.get('message')}`);window.location.href=`mailto:elarae.studio@hotmail.com?subject=${subject}&body=${body}`;note.textContent='Je e-mailapp wordt geopend met je ingevulde bericht.';return}const button=form.querySelector('button');button.disabled=true;try{const response=await fetch(`https://formspree.io/f/${FORMSPREE_ID}`,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!response.ok)throw Error();form.reset();note.textContent='Bedankt — je bericht is verstuurd.'}catch{note.textContent='Versturen lukte niet. Mail ons rechtstreeks via elarae.studio@hotmail.com.'}finally{button.disabled=false}});

// Swipeable package carousel: package photography, descriptions and details remain unchanged.
const packageCarousel=document.querySelector('#packageCarousel');
const packageGrid=document.querySelector('#packageGrid');
packageCarousel.querySelector('.carousel-prev').addEventListener('click',()=>packageGrid.scrollBy({left:-packageGrid.clientWidth*.72,behavior:'smooth'}));
packageCarousel.querySelector('.carousel-next').addEventListener('click',()=>packageGrid.scrollBy({left:packageGrid.clientWidth*.72,behavior:'smooth'}));
const allPackagesButton=document.querySelector('.packages-all');
allPackagesButton.addEventListener('click',()=>{const expanded=packageCarousel.classList.toggle('expanded');allPackagesButton.setAttribute('aria-expanded',String(expanded));allPackagesButton.innerHTML=expanded?'Terug naar swipe <span>↑</span>':'Bekijk alle pakketten <span>↓</span>';if(!expanded)packageGrid.scrollTo({left:0,behavior:'smooth'})});

const galleryItems={
  elan:[
    ['assets/Portfolio/Élan Nail Studio/Mockups/Desktop Website.png','De volledige website'],
    ['assets/Portfolio/Élan Nail Studio/Mockups/Mobiele Website.png','De mobiele website'],
    ['assets/Portfolio/Élan Nail Studio/Mockups/Instagrampagina.png','Instagram in de merksignatuur'],
    ['assets/Portfolio/Élan Nail Studio/Mockups/Afsprakenkaart.png','De afsprakenkaart'],
    ['assets/Portfolio/Élan Nail Studio/Mockups/Cadeaubon.png','De cadeaubon'],
    ['assets/Portfolio/Élan Nail Studio/Mockups/Visitekaart.png','Het visitekaartje']
  ],
  urban:[
    ['assets/Portfolio/Urban Bites/Mockups/Website Desktop.png','De desktopwebsite'],
    ['assets/Portfolio/Urban Bites/Mockups/Website Mobiel.png','De mobiele website'],
    ['assets/Portfolio/Urban Bites/Mockups/Instagram Feed.png','De Instagram feed'],
    ['assets/Portfolio/Urban Bites/Mockups/Digitaal menu met QR-code.png','Het digitale menu'],
    ['assets/Portfolio/Urban Bites/Mockups/Take-away verpakking met branding.png','Take-away met branding'],
    ['assets/Portfolio/Urban Bites/Mockups/Logo op verpakking.png','Het logo op de verpakking']
  ],
  lumora:[
    ['assets/Portfolio/Lumora Coaching/Mockups/desktopwebsite.png','De desktopwebsite'],
    ['assets/Portfolio/Lumora Coaching/Mockups/mobiele website met afspraakformulier.png','De mobiele website'],
    ['assets/Portfolio/Lumora Coaching/Mockups/Instagram Feed.png','De Instagram feed'],
    ['assets/Portfolio/Lumora Coaching/Mockups/E-Book.png','Het e-book'],
    ['assets/Portfolio/Lumora Coaching/Mockups/Werkboek.png','Het werkboek'],
    ['assets/Portfolio/Lumora Coaching/Mockups/Visitekaartje.png','Het visitekaartje']
  ]
};
document.querySelectorAll('.project-gallery').forEach(gallery=>{
  const items=galleryItems[gallery.dataset.gallery];let current=0;
  gallery.innerHTML=`<div class="gallery-stage"><img class="gallery-image" src="${items[0][0]}" alt="${items[0][1]}" loading="lazy"><button class="gallery-arrow gallery-prev" type="button" aria-label="Vorige projectfoto">←</button><button class="gallery-arrow gallery-next" type="button" aria-label="Volgende projectfoto">→</button><span class="gallery-count" aria-live="polite">01 / 06</span></div><div class="gallery-footer"><span class="gallery-caption">${items[0][1]}</span><div class="gallery-thumbs">${items.map((item,index)=>`<button class="gallery-thumb${index===0?' active':''}" type="button" aria-label="Toon ${item[1]}" aria-pressed="${index===0}"><img src="${item[0]}" alt="" loading="lazy"></button>`).join('')}</div></div>`;
  const image=gallery.querySelector('.gallery-image'),caption=gallery.querySelector('.gallery-caption'),count=gallery.querySelector('.gallery-count'),thumbs=[...gallery.querySelectorAll('.gallery-thumb')];
  const show=index=>{current=(index+items.length)%items.length;image.src=items[current][0];image.alt=items[current][1];caption.textContent=items[current][1];count.textContent=`${String(current+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;thumbs.forEach((thumb,i)=>{thumb.classList.toggle('active',i===current);thumb.setAttribute('aria-pressed',String(i===current))})};
  gallery.querySelector('.gallery-prev').addEventListener('click',()=>show(current-1));gallery.querySelector('.gallery-next').addEventListener('click',()=>show(current+1));thumbs.forEach((thumb,index)=>thumb.addEventListener('click',()=>show(index)));
  let touchStart=0;gallery.querySelector('.gallery-stage').addEventListener('touchstart',event=>touchStart=event.changedTouches[0].clientX,{passive:true});gallery.querySelector('.gallery-stage').addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>45)show(current+(delta<0?1:-1))},{passive:true});
});
