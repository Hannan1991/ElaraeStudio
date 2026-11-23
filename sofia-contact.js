(() => {
 const params=new URLSearchParams(location.search),message=document.querySelector('#contactForm [name=message]'),interest=document.querySelector('#contactForm [name=interest]');
 if(!message||!interest)return;
 const brief=params.get('sofia');
 const interests={Branding:'Branding & logo',Website:'Website of webshop',Webshop:'Website of webshop','Virtuele merkambassadeur':'Digitale merkambassadeur','Digitale merkambassadeur':'Digitale merkambassadeur',sofia:'Digitale merkambassadeur'};
 if(brief&&brief.startsWith('Mijn vraag via Sofia')&&brief.length<=1800){
  if(!message.value)message.value=brief;
  interest.value=interests[params.get('interesse')]||'Digitale merkambassadeur';
  const note=document.querySelector('#formNote');if(note)note.textContent='Je antwoorden uit de merkervaring staan klaar. Vul je gegevens aan en controleer je bericht voordat je het verstuurt.';
 }else if(params.get('interesse')==='sofia'){interest.value='Digitale merkambassadeur';}
 if(brief||params.get('interesse')==='sofia')history.replaceState(null,'',location.pathname+location.hash);
})();
