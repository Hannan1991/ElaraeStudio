/* Curated local content. No external AI calls or booking integrations. */
window.SOFIA_CONTENT = Object.freeze({
 brands: {
  elarae:{name:'Elarae Studio',accent:'#493b32',type:'Branding & digitale ervaringen',intro:'Welkom bij Elarae Studio. Ik ben Sofia. Vertel me wat je voor jouw merk voor ogen hebt, of kies een onderwerp dat je wilt verkennen.',questions:[
   {q:'Waarmee helpen jullie?',keys:['diensten','aanbod','doen'],a:'Elarae Studio brengt branding, websites, webshops en content samen in één herkenbare merkwereld. We stemmen het ontwerp en de inrichting af op jouw onderneming.'},
   {q:'Hoe verloopt een project?',keys:['proces','werkwijze','verloopt','stappen'],a:'We beginnen met een kennismaking en bespreken jouw doelen en de omvang van je project. Daarna stemmen we ontwerp, inhoud en uitvoering af. Je kunt de werkwijze ook bekijken in Sofia’s video op de homepage.'},
   {q:'Wat kost een website?',keys:['website','site','prijzen','prijs','kost','pakket'],a:'Elarae Start begint vanaf €99 voor een eerste digitale basis. Voor een uitgebreidere website, branding of webshop bespreken we de omvang en ontvang je een voorstel op maat. De actuele diensten vind je op de homepage; dit gesprek is geen offerte.'},
   {q:'Krijgt mijn bedrijf een eigen merkambassadeur?',keys:['sofia','virtueel','medewerker','ambassadeur','white-label','naam','stem','persoonlijkheid'],a:'Ja. Je krijgt een eigen digitale merkambassadeur die bezoekers op jouw website verwelkomt, vragen beantwoordt en aanvragen helpt voorbereiden. Naam, uiterlijk, stem, persoonlijkheid, tone of voice en kennis stemmen we af op jouw merk. De ervaring is volledig white-label. Sofia is de demo-ambassadeur van Elarae Studio. De dienstverlening en de aansluiting op jouw onderneming stemmen we vooraf af.'},
   {q:'Ik zoek een webshop',keys:['webshop','winkel','shop','ecommerce'],a:'Elarae Shop is onze dienst voor een webshop op Shopify of Wix. We bespreken je collectie, categorieën, productpagina’s en de inrichting die daarbij past. De prijs is op aanvraag.'},
   {q:'Ik zoek branding',keys:['branding','logo','huisstijl'],a:'Elarae Branding omvat logo-ontwerp, een kleurpalet, typografie en huisstijltoepassingen. We stemmen de invulling af op jouw merk. De prijs is op aanvraag.'},
   {q:'Hoe neem ik contact op?',keys:['contact','mail','offerte','bellen','telefoon','whatsapp'],a:'Contact verloopt via e-mail, WhatsApp of het contactformulier. Mail naar {email} of stuur een bericht via de WhatsApp-knop op de homepage.',link:{href:'index.html#contact',label:'Naar het contactformulier ↗︎'}}
  ]},
  gloss:{name:'Elyra Gloss',accent:'#602d3c',type:'Beauty · portfolio-concept',intro:'Welkom in de wereld van Elyra Gloss. Zoek je een zachte tint of juist een warme glans? Ik help je de collectie te ontdekken.',questions:[
   {q:'Welke tinten zijn er?',keys:['tint','kleur','welke'],a:'In dit portfolio-concept zie je Nude Bloom, Golden Veil en Rose Silk. Je kunt de drie tinten vergelijken in de Elyra Gloss-case study.'},
   {q:'Welke tint past bij mij?',keys:['past','advies','kiezen'],a:'Voor een zachte, natuurlijke uitstraling kun je Nude Bloom verkennen. Golden Veil laat een warmere glans zien; Rose Silk een roze tint. Dit is voorbeeldadvies bij een conceptcollectie.'},
   {q:'Wat kost een gloss?',keys:['kost','prijs','euro'],a:'De conceptcollectie toont €15,95 per gloss en €47,85 voor drie. Dit is een portfolio-ervaring: je kunt hier niet bestellen.'},
   {q:'Bekijk het merkverhaal',keys:['merk','verhaal','case','project'],a:'De Elyra Gloss-case study laat zien hoe productbeweging, merkidentiteit en winkelinteractie één ervaring vormen.',link:{href:'elyra-gloss.html',label:'Ontdek de case study ↗︎'}}
  ]},
  shop:{name:'Elyra Shop',accent:'#685140',type:'Fashion · portfolio-concept',intro:'Welkom bij Elyra Shop. Een kleur, een stof, een uitstraling die bij je past. Waar wil je beginnen?',questions:[
   {q:'Hoe werkt personalisatie?',keys:['personalisatie','model','werkt','kiezen'],a:'Op de homepage kun je Nora of Aaliyah kiezen en de hijabkleur veranderen. Modelbeeld, kleurlabel en stofdetail volgen je keuze. Zo kun je de selectie visueel vergelijken.'},
   {q:'Welke kleuren kan ik bekijken?',keys:['kleur','tint','welke'],a:'In de interactieve homepagepresentatie kun je Nude Beige, Mocha Brown en Stone vergelijken. De Elyra Shop-case study toont de bredere winkelervaring.'},
   {q:'Kan ik hier bestellen?',keys:['bestel','kopen','betalen','prijs','kost'],a:'Nee. Elyra Shop is een zelfstandig portfolio-concept. Er worden in deze ervaring geen bestellingen geplaatst of betalingen verwerkt. Getoonde producten en bedragen behoren tot die conceptpresentatie.'},
   {q:'Bekijk de winkelervaring',keys:['winkel','case','project','webshop'],a:'Bekijk hoe beeld, productinformatie en selectie samenkomen in de Elyra Shop-case study.',link:{href:'elyra-shop.html',label:'Ontdek de case study ↗︎'}}
  ]},
  aureon:{name:'Aureon Construct',accent:'#30372e',type:'Architectuur · portfolio-concept',intro:'Welkom bij Aureon Construct. Van de eerste afwerking tot het karakter van een hele ruimte: ik neem je mee in het werk en de keuzes erachter. Wat wil je ontdekken?',questions:[
   {q:'Welke werkzaamheden zie ik?',keys:['doen','werk','diensten','aanbod'],a:'De case study toont renovatie en afwerking: onder meer pleisterwerk, schilderwerk en vloerplaatsing. De nadruk ligt op uitvoering, materiaal en het uiteindelijke resultaat.'},
   {q:'Kan ik een transformatie zien?',keys:['transformatie','voorbeeld','voor','na'],a:'In de case study kun je dezelfde woonkamer voor en na vergelijken: van een kale wand naar een afgewerkte boognis. De beelden zijn conceptvisualisaties.',link:{href:'aureon-construct.html#ervaring',label:'Bekijk de transformatie ↗︎'}},
   {q:'Hoe bereid ik een aanvraag voor?',keys:['aanvraag','offerte','prijs','kost','contact','mail','telefoon','bellen'],a:'Bij een renovatieaanvraag zijn de ruimte, gewenste werkzaamheden en planning een goed vertrekpunt. Aureon Construct is hier een portfolio-concept, geen renovatiebedrijf dat opdrachten aanneemt. Wil je een vergelijkbare website of merkambassadeur? Dan kun je Elarae Studio bereiken via e-mail, WhatsApp of het contactformulier.'},
   {q:'Bekijk de case study',keys:['case','project','bekijk'],a:'Ontdek de architecturale merkwereld en de digitale uitwerking van Aureon Construct.',link:{href:'aureon-construct.html',label:'Ontdek de case study ↗︎'}}
  ]}
 },
 roles:{
  ambassador:{name:'Merkambassadeur',note:'Een persoonlijk welkom, helemaal in de taal van jouw merk.'},
  reception:{name:'Ontvangst',note:'Geeft bezoekers een warm welkom en een duidelijke volgende stap.'},
  service:{name:'Klantenservice',note:'Helpt klanten verder met antwoorden die bij jouw dienstverlening passen.'},
  sales:{name:'Advies',note:'Helpt bezoekers een keuze te maken die bij hun wensen past.'},
  intake:{name:'Projectintake',note:'Brengt je wensen in vijf stappen in kaart, als voorbereiding op een persoonlijke kennismaking.'}
 },
 intake:[
  {q:'Waar ben je naar op zoek?',options:['Branding','Website','Webshop','Digitale merkambassadeur']},
  {q:'Heb je al een bestaand merk?',options:['Ja, ik wil het versterken','Nee, ik start iets nieuws']},
  {q:'Wanneer wil je starten?',options:['Zo snel mogelijk','Binnen een maand','Over een paar maanden','Ik oriënteer me']},
  {q:'Wat wil je vooral bereiken?',options:['Meer aanvragen','Een herkenbaar merk','Online verkopen','Minder terugkerende vragen']},
  {q:'Hoe ontvang je graag een reactie?',options:['E-mail','WhatsApp']}
 ],
 brandIntakes:{
  gloss:[
   {q:'Wat wil je ontdekken?',options:['Een natuurlijke tint','Een warme glans','Een roze tint','De hele collectie']},
   {q:'Hoe kies je het liefst?',options:['Op uitstraling','Door tinten te vergelijken']},
   {q:'Wat wil je nu doen?',options:['Tinten verkennen','Het merkverhaal bekijken']},
   {q:'Wat spreekt je aan in deze ervaring?',options:['Productpresentatie','Persoonlijke begeleiding','De visuele merkwereld']},
   {q:'Hoe bespreek je een vergelijkbaar project met Elarae Studio?',options:['E-mail','WhatsApp']}
  ],
  shop:[
   {q:'Wat wil je verkennen?',options:['Kleuren vergelijken','De modelkeuze','De webshopervaring']},
   {q:'Wat helpt jou bij een productkeuze?',options:['Een passend modelbeeld','Een duidelijk stofdetail']},
   {q:'Waar wil je meer over weten?',options:['Personalisatie','De collectiepresentatie','De gebruikservaring']},
   {q:'Wat is voor jouw eigen webshop belangrijk?',options:['Duidelijker kiezen','Een sterker merkgevoel','Betere productinformatie']},
   {q:'Hoe bespreek je een vergelijkbaar project met Elarae Studio?',options:['E-mail','WhatsApp']}
  ],
  aureon:[
   {q:'Welk onderdeel wil je verkennen?',options:['Pleister- en wandafwerking','Schilderwerk','Vloerplaatsing','De totale presentatie']},
   {q:'Welk vertrekpunt herken je?',options:['Een onafgewerkte ruimte','Een bestaande ruimte vernieuwen']},
   {q:'Wat wil je beter begrijpen?',options:['De uitvoering','Het voor-en-na-verschil','Het eindresultaat']},
   {q:'Wat zou je eigen bedrijf willen laten zien?',options:['Meer vakmanschap','Duidelijkere diensten','Sterkere projectverhalen']},
   {q:'Hoe bespreek je een vergelijkbaar project met Elarae Studio?',options:['E-mail','WhatsApp']}
  ]
 }
});
