
(function boot() {
  'use strict';
  var container = document.getElementById('page-home-inner');
  if (container) {
    fetch('/data/content-page-home.html').then(function(r) { return r.text(); }).then(function(homeHTML) {
      container.innerHTML = homeHTML;
      if (typeof initApp === 'function') initApp();
      if (typeof renderProducts === 'function') setTimeout(renderProducts, 50);
      if (typeof initB2BGate === 'function') initB2BGate();
      if (typeof initNav === 'function') initNav();
      if (typeof initLangSwitch === 'function') initLangSwitch();
    }).catch(console.error);
  } else {
    if (typeof initApp === 'function') initApp();
  }
})();


// ============ IMAGE URIS (replaced) ============
// ============ IMAGE URIS (injected) ============
const IMG = {"goldSeal": "/images/img_062.png", "hero": "/images/img_002.png", "shop": "/images/img_063.png", "logo": "/images/img_064.png", "tree": "/images/img_065.jpg"};

function renderGallery(){
  const sources={hero:IMG.hero,shop:IMG.shop,tree:IMG.tree,logo:IMG.logo};
  document.querySelectorAll("[data-gallery-img]").forEach(img=>{
    const key=img.dataset.galleryImg;
    if(sources[key]) img.src=sources[key];
  });
}

const AWARD_IMG = {"us_miami": "/images/img_066.jpg", "eu_geneva": "/images/img_067.jpg", "afro_abudhabi": "/images/img_068.jpg", "uae_alain": "/images/img_069.jpg", "biol_novello24": "/images/img_070.jpg", "athens23": "/images/img_071.jpg", "biol25": "/images/img_072.jpg", "biol26": "/images/img_073.jpg",
  "alain26_cert": "/images/img_074.png",
  "biol26_cert": "/images/img_075.png",
  "geneva26_cert": "/images/img_076.png"
};
const IMG_TIN5 = "/images/img_077.png";
const IMG_GLASS250 = "/images/img_003.png";
const IMG_GLASS500 = "/images/img_004.png";
const IMG_GLASS750 = "/images/img_005.png";
const IMG_GLASS1000 = "/images/img_078.png";
const IMG_GLASS500Q = "/images/img_079.png";
const IMG_GLASS750Q = "/images/img_080.png";
const IMG_TIN3 = "/images/img_081.png";

const IMG_TIN1 = "/images/img_082.png";

// ============ DATA ============
// ============ DATA ============
const PRODUCTS = [
  {id:"p3",cat:"glass",flag:"",name:"Vestige 250 ml",vol:"250 ml · Runde Glasflasche",notes:"Kompaktes Format — perfekt zum Probieren oder Mitnehmen.",price:15,img:IMG_GLASS250},
  {id:"p2",cat:"glass",flag:"",name:"Vestige 500 ml",vol:"500 ml · Runde Glasflasche",notes:"Der ideale Einstieg in die Prestige-Linie für die tägliche Tafel.",price:25,img:IMG_GLASS500},
  {id:"p1",cat:"glass",flag:"Best in the World · Genf",name:"Vestige 750 ml",vol:"750 ml · Runde Glasflasche",notes:"Das Flaggschiff der Édition Prestige. Grüner Apfel, süße Mandel, seidiger Abgang.",price:30,img:IMG_GLASS750},
  {id:"p10",cat:"glass",flag:"",name:"Vestige Carré 500 ml",vol:"500 ml · Eckige Glasflasche",notes:"Die Édition Prestige in der eleganten eckigen Flasche — markant im Regal, edel auf der Tafel.",price:25,img:IMG_GLASS500Q},
  {id:"p11",cat:"glass",flag:"",name:"Vestige Carré 750 ml",vol:"750 ml · Eckige Glasflasche",notes:"Das 750-ml-Format in der eckigen Prestige-Flasche — ein Statement für anspruchsvolle Genießer.",price:30,img:IMG_GLASS750Q},
  {id:"p9",cat:"glass",flag:"Magnum",name:"Vestige 1 L",vol:"1 L · Eckige Glasflasche",notes:"Großzügig, prestigeträchtig — der Klassiker im Magnum-Format.",price:35,img:IMG_GLASS1000},
  {id:"p4",cat:"tin",flag:"Zurzeit nicht verfügbar",name:"Heritage Kanister 1 L",vol:"1 L · Metallkanister",notes:"Lichtdicht versiegelt — schützt Polyphenole über Monate.",price:35,available:false,img:IMG_TIN1},
  {id:"p5",cat:"tin",flag:"",badge:"Mehrfach goldprämiert 2026",name:"Heritage Kanister 3 L",vol:"3 L · Metallkanister",notes:"Für Genießer und Familien, die Laperla großzügig schätzen.",trust:"Mit internationalen Goldmedaillen ausgezeichnet — ein sichtbares Qualitätsversprechen für anspruchsvolle Käufer.",price:65,img:IMG_TIN3},
  {id:"p8",cat:"tin",flag:"",badge:"Mehrfach goldprämiert 2026",name:"Heritage Kanister 5 L",vol:"5 L · Metallkanister",notes:"Das Großformat für die anspruchsvolle Küche.",trust:"Mit internationalen Goldmedaillen ausgezeichnet — ein sichtbares Qualitätsversprechen für anspruchsvolle Käufer.",price:99.90,img:IMG_TIN5},
  {id:"p6",cat:"gift",flag:"Wieder verfügbar",name:"Coffret Prestige",vol:"3 × 250 ml · Geschenkbox",notes:"Drei 250-ml-Flaschen der Édition Prestige — das elegante Trio-Geschenkset für besondere Anlässe.",price:35,img:IMG_GLASS250,images:[IMG_GLASS250,IMG_GLASS250,IMG_GLASS250]},
  {id:"p7",cat:"gift",flag:"Édition Or",name:"Coffret Or Suprême",vol:"3 × 750 ml · Prestige-Set",notes:"Drei 750-ml-Flaschen der Édition Prestige — das ultimative Geschenk für höchste Ansprüche.",price:90,img:IMG_GLASS750,images:[IMG_GLASS750,IMG_GLASS750,IMG_GLASS750]},
  {id:"pgb",cat:"gift",hidden:true,flag:"La Pièce Maîtresse",name:"Vestige 500 ml · Geschenkbox-Edition",vol:"500 ml · Geschenkbox mit Goldprägung",notes:"Das Flaggschiff der Édition Prestige — überreicht in der schwarzen Geschenkbox. Limitierte Charge.",price:50,img:IMG_GLASS500},
  {id:"p4x5",cat:"gift",flag:"Maison Edition",name:"Coffret Kanister Maison",vol:"4 × 5 L · Großformat-Set",notes:"Vier 5-Liter-Metallkanister der Édition Prestige — für die ambitionierte Küche und exklusive Gastgeschenke.",price:350,img:IMG_TIN5,images:[IMG_TIN5,IMG_TIN5,IMG_TIN5,IMG_TIN5]}
];

const OFFERS = {
  o1:{name:"Édition Prestige 250 ml",vol:"250 ml · Édition Prestige",price:15},
  o2:{name:"Édition Prestige 500 ml",vol:"500 ml · Édition Prestige · Bestseller",price:25},
  o3:{name:"Édition Prestige 750 ml",vol:"750 ml · Édition Prestige",price:30}
};

// B2B configurator items (price per unit, litres per unit)
const B2B = [
  {id:"b1",name:"Glasflasche 750 ml",fmt:"Karton à 12 Flaschen",litres:9,price:78,tier:"Retail"},
  {id:"b2",name:"Glasflasche 500 ml",fmt:"Karton à 15 Flaschen",litres:7.5,price:69,tier:"Retail"},
  {id:"b3",name:"Metalldose 5 L",fmt:"Karton à 4 Dosen",litres:20,price:128,tier:"Food-Service",img:IMG_TIN5},
  {id:"b5",name:"Fass 20 L",fmt:"Einzelfass",litres:20,price:112,tier:"Bulk"},
  {id:"b6",name:"Fass 200 L",fmt:"Einzelfass",litres:200,price:990,tier:"Bulk"},
  {id:"b7",name:"IBC-Container 1000 L",fmt:"Einzelcontainer",litres:1000,price:4650,tier:"Bulk"}
];

const AWARDS_DATA = [
  {key:"alain26_cert",flag:"Gold 2026",name:"Al Ain Early Harvest Competition",place:"Al Ain, Abu Dhabi · VAE · 2026",desc:"Offizielles Gold-Medal-Zertifikat · La Perla Chetoui · Al Ain Heritage Festival"},
  {key:"biol26_cert",flag:"Gold 2026",name:"BIOL International Prize",place:"Bari, Italien · 2026",desc:"Offizielles BIOL-Goldmedaillen-Zertifikat · Best Organic Extra Virgin Olive Oil"},
  {key:"geneva26_cert",flag:"Gold 2026",name:"European International Olive Oil Competition",place:"Genf, Schweiz · 2026",desc:"Offizielles Teilnahme- und Gold-Zertifikat · Geneva 2026 · La Perla"},
  {key:"uae_alain",flag:"Gold",name:"Al Ain Early Harvest Competition",place:"Al Ain, Abu Dhabi · 2026",desc:"Gold Medal · La Perla Chetoui · Al Ain Heritage Festival"},
  {key:"biol26",flag:"Gold",name:"BIOL International Prize",place:"Bari, Italien · 2026",desc:"Gold Medal · 31. Internationaler Preis · Bestes Bio-EVOO"},
  {key:"eu_geneva",flag:"★ Best in World",name:"European International Competition",place:"Genf, Schweiz · 2024",desc:"Best Olive Oil in the World — Gold, 3. Edition EIOOC"},
  {key:"us_miami",flag:"Gold",name:"US International Competition",place:"Miami, USA · 2024",desc:"Goldmedaille für Qualitäts-Exzellenz · USIOOC"},
  {key:"afro_abudhabi",flag:"Gold",name:"Afro-Asian International Competition",place:"Abu Dhabi, VAE · 2024",desc:"Gold — Best Extra Virgin · AAIOOC"},
  {key:"biol_novello24",flag:"Extragold",name:"BIOLNOVELLO",place:"Bari, Italien · 2024",desc:"BIOLNOVELLO Extragold Medal · Bio Extra Vergine"},
  {key:"biol25",flag:"Gold",name:"BIOLNOVELLO",place:"Bari, Italien · 2025",desc:"BIOLNOVELLO Gold Medal · Kampagne 2025/26"},
  {key:"athens23",flag:"Double Gold",name:"Athena International Competition",place:"Athen · 2023",desc:"Double Gold Medal · ATHIOOC · „La Perla Chemlali"}
];

const MEDALS = [
  {y:"Al Ain 2026",l:"Gold"},{y:"Genf 2026",l:"Gold"},{y:"Bari 2026",l:"Gold"},
  {y:"Genf 2024",l:"Best in World"},{y:"Miami 2024",l:"Gold"},{y:"Abu Dhabi 2024",l:"Gold"},
  {y:"Bari 2024",l:"Extragold"},{y:"Athen 2023",l:"Double Gold"}
];

const FAQS = [
  {q:"Wie funktioniert der Container-Konfigurator?",a:"Wählen Sie im Konfigurator beliebig viele Formate (Glas, Dose, Fass, IBC) und Mengen. Volumen, Mengenrabatt und Gesamtpreis werden live berechnet. Anschließend zahlen Sie sofort und schließen den B2B-Kaufvertrag online ab."},
  {q:"Welche Zahlungsarten stehen zur Verfügung?",a:"Kreditkarte (Visa/Mastercard), PayPal, Klarna (Rechnung/Ratenkauf), SEPA-Lastschrift/-Überweisung, Apple Pay und Google Pay. Geschäftskunden können nach Bonitätsprüfung auch auf Rechnung mit Zahlungsziel bestellen."},
  {q:"Ist Laperla für den EU-Import zertifiziert?",a:"Ja. Wir halten ECO-CERT (EU-Bio, TN-BIO-001), USDA Organic, Organic Bio und FDA. Die Kennzeichnung erfolgt nach EU-Verordnung 1169/2011 und 29/2012. Alle Dokumente liegen jeder Lieferung bei."},
  {q:"Wie hoch ist mein Provisionssatz?",a:"Die Provision ist gestaffelt: 8 % (Partner, bis 5.000 L/Jahr), 14 % (Distributor, 5.000–25.000 L) und 20 % (Exklusiv, ab 25.000 L). Ihr aktueller Satz und Ihre Abrechnung sind im Händler-Dashboard sichtbar."},
  {q:"Wo wird das Öl produziert und kann ich es besuchen?",a:"Unsere Haine und Mühle liegen in Tunesien. Geschäftsbesuche zur Lieferantenprüfung sind willkommen — vereinbaren Sie eine Besichtigung oder virtuelle Tour."}
];

const DISTRIBUTORS = [
  {name:"Agentur Blumann",role:"Vertriebspartner · Deutschland",rows:[["⬦","Stephan Blumann"],["⌂","Auf der Ayl 62, 54295 Trier"],["☎","0176 / 533 26268"],["✉","stephanblumann@gmail.com"]]}
];

const ORDERS = [
  {id:"LP-2026-0044",date:"14.06.2026",items:"1.200 L · Glas & Dose",total:"3.480,00 €",status:"transit",statusLabel:"In Transit"},
  {id:"LP-2026-0042",date:"02.06.2026",items:"800 L · Metalldose",total:"1.536,00 €",status:"open",statusLabel:"Offen"},
  {id:"LP-2026-0041",date:"18.04.2026",items:"2.000 L · Bulkware",total:"4.980,00 €",status:"delivered",statusLabel:"Zugestellt"},
  {id:"LP-2026-0033",date:"03.03.2026",items:"2.250 L · Glas",total:"9.870,00 €",status:"paid",statusLabel:"Bezahlt"}
];

const COMMISSIONS = [
  {period:"Q1 2026",vol:"2.250 L",base:"9.870 €",pct:"14 %",amount:"1.381,80 €",status:"paid"},
  {period:"Q2 2026",vol:"4.000 L",base:"13.176 €",pct:"14 %",amount:"1.844,64 €",status:"open"}
];

const DOCS = [
  {name:"Analysezertifikat (COA) · Charge 2026-A",type:"PDF · COA",date:"14.06.2026"},
  {name:"ECO-CERT Bio-Zertifikat · TN-BIO-001",type:"PDF · Zertifikat",date:"01.01.2026"},
  {name:"Ursprungszeugnis · Tunesien",type:"PDF · Export",date:"14.06.2026"},
  {name:"Rechnung LP-2026-0042",type:"PDF · Rechnung",date:"02.06.2026"},
  {name:"Händlervertrag · Distributor",type:"PDF · Vertrag",date:"03.03.2026"}
];

// ============ HELPERS ============
function fmt(n){return n.toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})+" €";}
function fmtInt(n){return n.toLocaleString("de-DE")+" €";}
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),2200);}
function t(k){const d=(typeof I18N!=="undefined")?(I18N[currentLang]||I18N.de):null;if(!d)return k;return d[k]!==undefined?d[k]:(I18N.de&&I18N.de[k]!==undefined?I18N.de[k]:k);}

// ============ RENDER: PRODUCTS ============
function productMediaMarkup(p){
  let badgeHtml="";
  if(p.flag){
    const isUnavail=p.available===false;
    const isAward=/World|Gold|Best|Magnum|Maîtresse|Or|Maison/i.test(p.flag);
    const icon=isUnavail?"✕":isAward?"★":"✦";
    const cls="pc-flag"+(isUnavail?" unavailable-v88":"");
    const shortText=p.flag
      .replace("Best in the World · Genf","★ Best World")
      .replace("Wieder verfügbar","Wieder verf.")
      .replace("Zurzeit nicht verfügbar","Nicht verf.")
      .replace("La Pièce Maîttresse","La Pièce")
      .replace("Édition Or","Édit. Or")
      .replace("Maison Edition","Maison");
    badgeHtml=`<span class="${cls}" aria-label="${p.flag}"><span class="pc-medal-icon">${icon}</span><span class="pc-medal-text">${shortText}</span></span>`;
  }else if(p.badge){
    const shortBadge=p.badge.replace("Mehrfach goldprämiert 2026","Gold 2026");
    badgeHtml=`<span class="pc-flag trust-badge" aria-label="${p.badge}"><span class="pc-medal-icon">★</span><span class="pc-medal-text">${shortBadge}</span></span>`;
  }
  const media=p.images?.length
    ?`<span class="pc-media-pair">${p.images.map((src,i)=>`<img src="${src}" alt="${p.name} – Flasche ${i+1}">`).join("")}</span>`
    :`<img src="${p.img||IMG.shop}" alt="${p.name}">`;
  return `${media}${badgeHtml}`;
}
function renderProducts(filter=window.__lastFilter||"all"){window.__lastFilter=filter;
  const sort=window.__sortV77||"featured";
  const wishList=(typeof v77Wishlist==="function")?v77Wishlist():[];
  let list=PRODUCTS.filter(p=>!p.hidden&&(filter==="all"||p.cat===filter));
  if(sort==="price-asc")list=list.slice().sort((a,b)=>a.price-b.price);
  else if(sort==="price-desc")list=list.slice().sort((a,b)=>b.price-a.price);
  else if(sort==="name")list=list.slice().sort((a,b)=>a.name.localeCompare(b.name,"de"));
  document.getElementById("productGrid").innerHTML = list.map((p,i)=>{
    const perL=(typeof v77PerL==="function")?v77PerL(p):"";
    const ref=(typeof V77_REF!=="undefined"&&V77_REF[p.id])?V77_REF[p.id]:"";
    const wished=wishList.includes(p.id);
    return `
    <div class="product-card${p.available===false?" product-unavailable-v88":""}" style="--pcd:${Math.min(i,9)*70}ms">
      <i class="pc-corners77" aria-hidden="true"></i>
      <button class="pc-wish77${wished?" active":""}" type="button" data-wish77="${p.id}" aria-pressed="${wished?"true":"false"}" aria-label="${p.name} auf die Merkliste setzen">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
      <button class="pc-media pc-media-click" type="button" data-product-detail="${p.id}" aria-label="Große Detailansicht von ${p.name} öffnen">${productMediaMarkup(p)}</button>
      <div class="pc-body">
        <div class="pc-topline77"><span class="pc-cat">${p.cat==="glass"?t("cat_glass"):p.cat==="tin"?t("cat_tin"):t("cat_gift")}</span>${ref?`<span class="pc-ref77">Réf. ${ref}</span>`:""}</div>
        <h3>${p.name}</h3><div class="pc-vol">${p.vol}</div><p class="pc-notes">${p.notes}</p>${p.trust?`<div class="pc-trust"><span class="star">★</span><span>${p.trust}</span></div>`:""}
        ${p.available===false
          ? `<div class="pc-foot unavailable-foot-v88"><div class="unavailable-text-v88">${t("unavail")}</div><button class="pc-add unavailable-btn-v88" type="button" disabled>${t("not_orderable")}</button></div>`
          : `<div class="pc-foot pc-foot77">
              <div class="pc-foot77-row">
                <div class="pc-price">${fmt(p.price)}<small>${perL?perL+" · ":""}${t("incl_vat")}</small></div>
                <div class="pc-qty77" aria-label="Menge wählen"><button type="button" class="qbtn77" data-qty-minus aria-label="Menge verringern">−</button><span class="qty-val77" aria-live="polite">1</span><button type="button" class="qbtn77" data-qty-plus aria-label="Menge erhöhen">+</button></div>
              </div>
              <button class="pc-add pc-add77" type="button" data-add-v77="${p.id}">${t("add_cart")}</button>
              <div class="pc-ship77">◆ Versandfertig in 24 h · Versicherter Versand</div>
            </div>`}
      </div>
    </div>`}).join("");
  try{
    const counts={all:PRODUCTS.length,glass:0,tin:0,gift:0};
    PRODUCTS.forEach(p=>{if(counts[p.cat]!==undefined)counts[p.cat]++;});
    document.querySelectorAll("#shopFilters .filter-chip").forEach(c=>{const k=c.dataset.filter;if(counts[k]!==undefined)c.setAttribute("data-count",counts[k]);});
    const cc=document.getElementById("collectionCount77");
    if(cc)cc.textContent=list.length+(list.length===1?" Meisterwerk":" Meisterwerke")+" · Édition Prestige 2026";
  }catch(e){}
}

// ============ RENDER: AWARDS ============
function renderAwards(){
  const medalTemplate = (m,i,realIndex)=>{
    const parts = m.y.split(" ");
    const year = parts.pop();
    const city = parts.join(" ");
    const rank = m.l.toLowerCase().includes("double") ? "Double Gold" :
                 m.l.toLowerCase().includes("extra") ? "Extragold" :
                 m.l.toLowerCase().includes("best") ? "Best Award" : "Gold Medal";
    const isCurrent = year === "2026";
    return `
    <div class="medal-item ${isCurrent ? "is-2026" : ""}" data-medal="${realIndex}" tabindex="0" role="button" aria-label="${rank} ${city} ${year} öffnen">
      <div class="medal">
        <img class="medal-photo" src="${IMG.goldSeal}" alt="LAPERLA Goldmedaille">
      </div>
      <div class="medal-rank">${rank}</div>
      <div class="my">${city}</div>
      <div class="ml">${year}</div>
    </div>`;
  };

  // Alle Medaillen chronologisch sortieren: alt links → neu rechts
  const allMedals = MEDALS.map((m,i)=>({...m,_realIndex:i}))
    .sort((a,b)=>{
      const ya = parseInt(a.y.split(" ").pop()) || 0;
      const yb = parseInt(b.y.split(" ").pop()) || 0;
      return ya - yb;
    });

  // medalRow2026 leer lassen (Block ist per style="display:none" versteckt)
  const row2026 = document.getElementById("medalRow2026");
  if(row2026) row2026.innerHTML = "";

  // Alle Medaillen in "Internationale Prämierungen" anzeigen
  const medalRowEl = document.getElementById("medalRow");
  if(medalRowEl) medalRowEl.innerHTML = allMedals.map((m,i)=>medalTemplate(m,i,m._realIndex)).join("");

  // 2026 Spotlight Zertifikate
  const spotlight = AWARDS_DATA.filter(a=>a.place.includes("2026")).slice(0,3);
  const spotlightEl = document.getElementById("awards2026Spotlight");
  if(spotlightEl){
    spotlightEl.innerHTML = spotlight.map(a=>`
      <div class="award-2026-card" data-cert="${a.key}">
        <div class="award-2026-img"><span>${a.flag}</span><img src="${AWARD_IMG[a.key]}" alt="${a.name}"></div>
        <div class="award-2026-meta"><h4>${a.name}</h4><p>${a.place}</p></div>
      </div>`).join("");
  }

  document.getElementById("certGallery").innerHTML = AWARDS_DATA.filter(a=>!a.place.includes("2026")).map(a=>`
    <div class="cert-card" data-cert="${a.key}">
      <div class="img"><span class="cert-flag">${a.flag}</span><img src="${AWARD_IMG[a.key]}" alt="${a.name}"></div>
      <div class="meta"><h4>${a.name}</h4><div class="place">${a.place}</div><div class="desc">${a.desc}</div></div>
    </div>`).join("");
}

function renderFaqs(){
  const faqHtml = FAQS.map(f=>`
    <div class="faq-item"><button class="faq-q">${f.q}<span class="pm">+</span></button><div class="faq-a"><p>${f.a}</p></div></div>`).join("");
  const faqEl1 = document.getElementById("faqList");
  if(faqEl1) faqEl1.innerHTML = faqHtml;
  const faqEl2 = document.getElementById("faqList2");
  if(faqEl2) faqEl2.innerHTML = faqHtml;
}

// ============ HERITAGE TREE SVG ============
function renderHeritageArt(){
  const el=document.getElementById("heritageArt");
  if(!el || el.dataset.locked==="1") return;
}

// ============ B2B CONFIGURATOR ============
function discountFor(litres){
  if(litres>=1000) return 0.18; if(litres>=500) return 0.14; if(litres>=200) return 0.09; if(litres>=50) return 0.05; return 0;
}
function renderConfig(){
  document.getElementById("configProducts").innerHTML = B2B.map(b=>`
    <div class="config-item">
      <div class="thumb"><img src="${b.img||IMG.shop}" alt=""></div>
      <div class="info"><h4>${b.name}<span class="config-tier">${b.tier}</span></h4><div class="fmt">${b.fmt}</div><div class="unit">${fmtInt(b.price)} / Einheit · ${b.litres} L</div></div>
      <div class="config-controls"><div class="config-qty">
        <button data-cfg="${b.id}" data-d="-1">−</button>
        <input type="text" id="cfg-${b.id}" value="0" readonly>
        <button data-cfg="${b.id}" data-d="1">+</button>
      </div></div>
    </div>`).join("");
  B2B.forEach(b=>configState[b.id]=0);
  updateConfig();
}
function updateConfig(){
  let litres=0,subtotal=0,lines=[];
  B2B.forEach(b=>{const q=configState[b.id]||0;if(q>0){litres+=b.litres*q;subtotal+=b.price*q;lines.push(`<div class="config-line"><span class="cl-name">${q}× ${b.name}</span><span class="cl-val">${fmtInt(b.price*q)}</span></div>`);}});
  const disc=discountFor(litres);const total=subtotal*(1-disc);
  document.getElementById("configLines").innerHTML = lines.length?lines.join(""):`<div class="config-empty">Noch keine Artikel gewählt. Erhöhen Sie links die Mengen.</div>`;
  document.getElementById("configVol").textContent = litres.toLocaleString("de-DE")+" L";
  document.getElementById("configVolFill").style.width = Math.min(100,litres/1000*100)+"%";
  document.getElementById("configDiscount").textContent = Math.round(disc*100)+" %";
  document.getElementById("configTotal").textContent = fmtInt(Math.round(total));
  window._configTotal = total;
}

// ============ CART ============
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);const l=cart.find(x=>x.id===id);if(l)l.qty++;else cart.push({...p,qty:1});updateCart();toast(`„${p.name}" hinzugefügt`);}
function changeQty(id,d){const l=cart.find(x=>x.id===id);if(!l)return;l.qty+=d;if(l.qty<=0)cart=cart.filter(x=>x.id!==id);updateCart();}
function cartTotal(){return cart.reduce((s,x)=>s+x.price*x.qty,0);}
function updateCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartCount").textContent=count;
  const items=document.getElementById("cartItems");
  if(!cart.length){items.innerHTML=`<div class="cart-empty">Ihr Warenkorb ist noch leer.<br>Entdecken Sie die Kollektion.</div>`;}
  else{items.innerHTML=cart.map(x=>`
    <div class="cart-line"><div class="cart-line-img">${x.images?.length?x.images.map(src=>`<img src="${src}" alt="${x.name}">`).join(""):`<img src="${x.img||IMG.shop}" alt="${x.name}">`}</div>
      <div class="cart-line-info"><h5>${x.name}</h5><div class="v">${x.vol}</div><div class="cart-unit-price-v114">Einzelpreis: ${fmt(x.price)}</div>
        <div class="qty"><button data-qty="${x.id}" data-d="-1">−</button><span>${x.qty}</span><button data-qty="${x.id}" data-d="1">+</button></div></div>
      <div class="cart-line-price"><small>Gesamt</small>${fmt(x.price*x.qty)}</div></div>`).join("");}
  const tot=fmt(cartTotal());document.getElementById("cartTotal").textContent=tot;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("drawerOverlay").classList.add("open");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("drawerOverlay").classList.remove("open");}

// ============ DASHBOARD ============
function renderDashboard(){
  const statusClass={transit:"st-transit",open:"st-open",delivered:"st-delivered",paid:"st-paid"};
  const orderRows = ORDERS.map(o=>`<tr><td class="oid">${o.id}</td><td>${o.date}</td><td>${o.items}</td><td>${o.total}</td><td><span class="badge-status ${statusClass[o.status]}">${o.statusLabel}</span></td></tr>`).join("");
  const head=`<tr><th>Bestellung</th><th>Datum</th><th>Artikel</th><th>Betrag</th><th>Status</th></tr>`;
  document.getElementById("ovOrders").innerHTML = head+ORDERS.slice(0,3).map(o=>`<tr><td class="oid">${o.id}</td><td>${o.date}</td><td>${o.items}</td><td>${o.total}</td><td><span class="badge-status ${statusClass[o.status]}">${o.statusLabel}</span></td></tr>`).join("");
  document.getElementById("allOrders").innerHTML = head+orderRows;
  document.getElementById("commTable").innerHTML = `<tr><th>Zeitraum</th><th>Volumen</th><th>Umsatz</th><th>Satz</th><th>Provision</th><th>Status</th></tr>`+COMMISSIONS.map(c=>`<tr><td>${c.period}</td><td>${c.vol}</td><td>${c.base}</td><td>${c.pct}</td><td style="color:var(--gold-deep);font-weight:600">${c.amount}</td><td><span class="badge-status ${c.status==='paid'?'st-paid':'st-open'}">${c.status==='paid'?'Ausgezahlt':'Offen'}</span></td></tr>`).join("");
  document.getElementById("docTable").innerHTML = `<tr><th>Dokument</th><th>Typ</th><th>Datum</th><th></th></tr>`+DOCS.map(d=>`<tr><td>${d.name}</td><td>${d.type}</td><td>${d.date}</td><td><a class="btn-link" href="#" onclick="event.preventDefault();window.__toast&&window.__toast('Download gestartet')">Herunterladen</a></td></tr>`).join("");
  renderTrackSteps();
}
function renderTrackSteps(){
  const steps=[
    {t:"Bestellung bestätigt",d:"14.06.2026",state:"done"},
    {t:"Abfüllung & Verpackung",d:"Tunesien",state:"done"},
    {t:"Verschifft · Hafen Sousse",d:"17.06.2026",state:"done"},
    {t:"Mittelmeer-Transit",d:"unterwegs",state:"current"},
    {t:"Zustellung Trier",d:"ETA 23.06.2026",state:""}
  ];
  document.getElementById("trackSteps").innerHTML = steps.map(s=>`<div class="track-step ${s.state}"><span class="dot"></span><div class="ts-t">${s.t}</div><div class="ts-d">${s.d}</div></div>`).join("");
}

// ============ MAP SVG (Tunesien → Mittelmeer → Deutschland) ============
function mapSVG(progress){
  // progress 0..1 of ship along route
  const TN={x:430,y:330}, DE={x:470,y:120};
  const mid={x:380,y:230};
  // bezier point at progress
  function bez(t){const x=(1-t)*(1-t)*TN.x+2*(1-t)*t*mid.x+t*t*DE.x;const y=(1-t)*(1-t)*TN.y+2*(1-t)*t*mid.y+t*t*DE.y;return{x,y};}
  const ship=bez(progress);
  return `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16273d"/><stop offset="1" stop-color="#0c1623"/></linearGradient></defs>
    <rect width="800" height="400" fill="url(#sea)"/>
    <!-- grid dots -->
    <g fill="rgba(212,175,82,.06)">${Array.from({length:40}).map((_,i)=>`<circle cx="${(i%10)*80+20}" cy="${Math.floor(i/10)*100+30}" r="1.5"/>`).join("")}</g>
    <!-- Europe / Germany landmass (stylised) -->
    <path d="M340 60 Q420 40 520 70 Q580 90 560 150 Q540 190 470 200 Q400 200 360 160 Q330 110 340 60Z" fill="#23303f" stroke="rgba(212,175,82,.25)" stroke-width="1"/>
    <text x="470" y="120" fill="rgba(246,241,228,.5)" font-size="13" font-family="serif" text-anchor="middle" letter-spacing="2">DEUTSCHLAND</text>
    <circle cx="${DE.x}" cy="${DE.y}" r="6" fill="#2a5499" stroke="#fff" stroke-width="1.5"/>
    <text x="${DE.x+12}" y="${DE.y+4}" fill="#9bbce8" font-size="11" font-family="sans-serif">Trier</text>
    <!-- Italy boot hint -->
    <path d="M430 200 Q450 240 440 270 L455 268 Q466 230 448 198Z" fill="#23303f" opacity=".7"/>
    <!-- North Africa / Tunisia -->
    <path d="M330 300 Q420 280 520 300 Q600 320 580 380 L320 390 Q300 340 330 300Z" fill="#1f2a1a" stroke="rgba(92,107,51,.4)" stroke-width="1"/>
    <text x="440" y="365" fill="rgba(246,241,228,.5)" font-size="13" font-family="serif" text-anchor="middle" letter-spacing="2">TUNESIEN</text>
    <circle cx="${TN.x}" cy="${TN.y}" r="6" fill="#5C6B33" stroke="#fff" stroke-width="1.5"/>
    <text x="${TN.x+12}" y="${TN.y+4}" fill="#aebf8a" font-size="11" font-family="sans-serif">Tunisia</text>
    <!-- Mediterranean label -->
    <text x="370" y="255" fill="rgba(155,188,232,.45)" font-size="11" font-family="serif" font-style="italic" text-anchor="middle">Mittelmeer</text>
    <!-- route -->
    <path d="M${TN.x} ${TN.y} Q${mid.x} ${mid.y} ${DE.x} ${DE.y}" stroke="rgba(212,175,82,.35)" stroke-width="2" stroke-dasharray="6 6" fill="none"/>
    <path d="M${TN.x} ${TN.y} Q${mid.x} ${mid.y} ${ship.x} ${ship.y}" stroke="var(--gold-bright,#D4AF52)" stroke-width="2.5" fill="none"/>
    <!-- ship -->
    <g transform="translate(${ship.x},${ship.y})">
      <circle r="13" fill="rgba(212,175,82,.18)"><animate attributeName="r" values="11;17;11" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle r="7" fill="#D4AF52" stroke="#fff" stroke-width="1.5"/>
      <text y="4" font-size="9" text-anchor="middle">🚢</text>
    </g>
  </svg>`;
}
function europePresenceSVG(){
  return `<svg viewBox="0 0 920 560" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="euSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#182336"/><stop offset="1" stop-color="#101826"/></linearGradient>
      <linearGradient id="euLand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8d4c8"/><stop offset="1" stop-color="#a9a28f"/></linearGradient>
      <linearGradient id="goldPin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1df9c"/><stop offset="1" stop-color="#b8892b"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="920" height="560" rx="12" fill="url(#euSea)"/>
    <g fill="rgba(212,175,82,.06)">${Array.from({length:66}).map((_,i)=>`<circle cx="${(i%11)*86+30}" cy="${Math.floor(i/11)*92+28}" r="1.6"/>`).join('')}</g>
    <g fill="url(#euLand)" stroke="rgba(255,255,255,.18)" stroke-width="1.2">
      <path d="M210 145 C250 110 318 96 382 102 C448 108 504 128 556 160 C594 184 612 210 612 240 C612 270 598 294 571 312 C542 330 500 338 460 342 C427 345 396 354 366 370 C334 388 300 392 270 381 C244 371 227 350 215 328 C204 307 186 293 164 279 C143 266 126 245 126 220 C126 196 145 177 170 170 C186 165 198 158 210 145 Z"/>
      <path d="M496 326 C520 338 535 355 544 373 C551 388 552 407 546 425 C539 446 520 463 498 470 C478 476 462 466 454 450 C446 435 444 416 447 397 C451 373 464 350 496 326 Z" opacity=".95"/>
      <path d="M125 188 C109 177 95 174 78 178 C64 181 52 192 49 206 C46 221 49 239 61 250 C72 260 88 265 104 262 C119 259 131 249 138 237 C145 225 145 206 139 195 C136 191 131 189 125 188 Z" opacity=".96"/>
      <path d="M598 154 C626 143 655 144 679 153 C698 160 715 178 719 198 C723 217 715 236 699 251 C681 268 657 276 632 273 C612 270 598 259 590 244 C583 229 580 212 583 196 C586 180 590 162 598 154 Z" opacity=".95"/>
    </g>
    <g fill="rgba(212,175,82,.08)">
      <circle cx="504" cy="170" r="74"/>
      <circle cx="458" cy="256" r="56"/>
      <circle cx="432" cy="205" r="40"/>
      <circle cx="585" cy="355" r="28"/>
    </g>
    <text x="462" y="84" fill="rgba(246,241,228,.78)" font-size="24" font-family="Cinzel,serif" text-anchor="middle" letter-spacing="4">EUROPA</text>
    <text x="462" y="108" fill="rgba(246,241,228,.42)" font-size="10" font-family="Jost,sans-serif" text-anchor="middle" letter-spacing="3">SELECTED LAPERLA PRESENCE</text>

    <g filter="url(#glow)">
      <circle cx="474" cy="210" r="8.5" fill="url(#goldPin)" stroke="#fff3cf" stroke-width="1.5"/>
      <circle cx="474" cy="210" r="22" fill="rgba(212,175,82,.14)"/>
      <text x="489" y="204" fill="#f5df9a" font-size="12" font-family="Jost,sans-serif" font-weight="600">DEUTSCHLAND</text>
      <text x="489" y="220" fill="rgba(246,241,228,.68)" font-size="10" font-family="Jost,sans-serif">Kernmarkt</text>

      <circle cx="468" cy="248" r="6.5" fill="url(#goldPin)" stroke="#fff3cf" stroke-width="1.4"/>
      <circle cx="468" cy="248" r="18" fill="rgba(212,175,82,.12)"/>
      <text x="482" y="243" fill="#f5df9a" font-size="11.5" font-family="Jost,sans-serif" font-weight="600">SCHWEIZ</text>
      <text x="482" y="257" fill="rgba(246,241,228,.68)" font-size="9.5" font-family="Jost,sans-serif">Premium Markt</text>

      <circle cx="492" cy="190" r="6.5" fill="#5eb7ff" stroke="#e7f6ff" stroke-width="1.4"/>
      <circle cx="492" cy="190" r="16" fill="rgba(94,183,255,.14)"/>
      <text x="507" y="186" fill="#9fd8ff" font-size="11.5" font-family="Jost,sans-serif" font-weight="600">BERLIN</text>
      <text x="507" y="200" fill="rgba(231,246,255,.66)" font-size="9.5" font-family="Jost,sans-serif">Edition & Projekte</text>

      <circle cx="585" cy="355" r="6.5" fill="url(#goldPin)" stroke="#fff3cf" stroke-width="1.4"/>
      <circle cx="585" cy="355" r="18" fill="rgba(212,175,82,.12)"/>
      <text x="600" y="350" fill="#f5df9a" font-size="11.5" font-family="Jost,sans-serif" font-weight="600">MONACO</text>
      <text x="600" y="364" fill="rgba(246,241,228,.68)" font-size="9.5" font-family="Jost,sans-serif">Luxury Positioning</text>
    </g>
  </svg>`;
}

function renderMaps(){
  // logistics map + distributor cards
  const trackMapEl=document.getElementById("trackMap");
  if(trackMapEl) trackMapEl.innerHTML = mapSVG(0.6);
  const distCardsEl=document.getElementById("distCards");
  if(distCardsEl) distCardsEl.innerHTML = DISTRIBUTORS.map(d=>`
    <div class="dist-card"><h4>${d.name}</h4><div class="role">${d.role}</div>${d.rows.map(r=>`<div class="row"><span class="ic">${r[0]}</span><span>${r[1]}</span></div>`).join("")}</div>`).join("")
    + `<div class="dist-card territory-card"><h4 style="color:var(--gold-bright)">Vertriebsland angeben</h4><div class="role">Wo möchten Sie Laperla vertreiben?</div><div class="row"><span class="ic">⬦</span><span>Wählen Sie ein oder mehrere Länder aus. Die Auswahl wird sichtbar golden markiert und direkt in die B2B-Anfrage übernommen.</span></div><form class="territory-form" id="territoryInterestForm"><div class="country-helper">Länder auswählen:</div><div class="country-choice-grid" id="territoryCountries"><label class="country-choice" for="territory-country-0"><input type="checkbox" id="territory-country-0" name="countries" value="Deutschland"><span>Deutschland</span></label><label class="country-choice" for="territory-country-1"><input type="checkbox" id="territory-country-1" name="countries" value="Schweiz"><span>Schweiz</span></label><label class="country-choice" for="territory-country-2"><input type="checkbox" id="territory-country-2" name="countries" value="Österreich"><span>Österreich</span></label><label class="country-choice" for="territory-country-3"><input type="checkbox" id="territory-country-3" name="countries" value="Monaco"><span>Monaco</span></label><label class="country-choice" for="territory-country-4"><input type="checkbox" id="territory-country-4" name="countries" value="Frankreich"><span>Frankreich</span></label><label class="country-choice" for="territory-country-5"><input type="checkbox" id="territory-country-5" name="countries" value="Italien"><span>Italien</span></label><label class="country-choice" for="territory-country-6"><input type="checkbox" id="territory-country-6" name="countries" value="Spanien"><span>Spanien</span></label><label class="country-choice" for="territory-country-7"><input type="checkbox" id="territory-country-7" name="countries" value="Belgien"><span>Belgien</span></label><label class="country-choice" for="territory-country-8"><input type="checkbox" id="territory-country-8" name="countries" value="Niederlande"><span>Niederlande</span></label><label class="country-choice" for="territory-country-9"><input type="checkbox" id="territory-country-9" name="countries" value="Luxemburg"><span>Luxemburg</span></label><label class="country-choice" for="territory-country-10"><input type="checkbox" id="territory-country-10" name="countries" value="Vereinigtes Königreich"><span>Vereinigtes Königreich</span></label></div><div class="multi-note">Mehrfachauswahl möglich — ausgewählte Länder werden golden markiert.</div><input type="text" name="region" placeholder="Stadt / Region (optional)"><select name="exclusivity" required><option value="">Geplante Exklusivität auswählen *</option><option>Exklusiver Vertrieb pro Land gewünscht</option><option>Exklusiver Vertrieb nur für Region / Stadt</option><option>Nicht exklusiv / offener Vertrieb</option><option>Noch offen / verhandelbar</option></select><label style="display:flex;gap:8px;align-items:flex-start;font-size:.78rem;line-height:1.45;color:rgba(246,241,228,.74)"><input type="checkbox" name="exclusiveConsent" style="margin-top:4px;accent-color:#d4af52"><span>Exklusivrechte werden erst nach schriftlicher Zustimmung von Laperla gültig.</span></label><button class="btn btn-gold btn-sm" type="submit">Länder speichern & Anfrage starten</button></form><div class="territory-note">Nach dem Speichern gelangen Sie direkt zur Anfrage für den Geschäftskundenbereich.</div></div>`;
}

// ============ ROUTING ============
const SECTION_SCROLL={};
const ROUTE_PAGES={
  home:"page-home",
  editions:"page-editions",
  shop:"page-shop",
  awards:"page-awards",
  gallery:"page-gallery",
  wholesale:"page-wholesale",
  "wholesale-gate":"page-wholesale-code",
  origin:"page-origin",
  discover:"page-discover",
  berlin:"page-berlin-edition",
  europe:"page-europe",
  distributors:"page-distributors",
  legal:"page-legal",
  about:"page-about",
  mission:"page-mission",
  story:"page-story",
  account:"page-account",
  "b2b-login":"page-account",
  dashboard:"page-dashboard",
  "b2b-shop":"page-wholesale",
  "b2b-container":"page-wholesale",
  "b2b-pallet":"page-wholesale",
  "b2b-partners":"page-distributors",
  "b2b-approval":"page-b2b-approval",
  faq:"page-faq"
};
const ROUTE_ALIASES={
  "berlin-edition":"berlin",
  "land-entdecken":"discover",
  "herkunft":"origin",
  "grosshandel":"wholesale",
  "großhandel":"wholesale",
  "kollektion":"shop"
};
function normalizeRouteTarget(target){
  target=(target||"home").toString().trim();
  target=ROUTE_ALIASES[target]||target;
  return ROUTE_PAGES[target] ? target : "home";
}
function routeHash(target,legalTarget){
  target=normalizeRouteTarget(target);
  return legalTarget ? "#"+target+"/"+legalTarget : "#"+target;
}
function readRouteFromLocation(){
  let raw=(window.location.hash||"").replace(/^#/,"").trim();
  if(!raw) return {target:"home",legalTarget:null};
  try{raw=decodeURIComponent(raw);}catch(e){}
  const parts=raw.split("/").filter(Boolean);
  return {
    target:normalizeRouteTarget(parts[0]||"home"),
    legalTarget:parts[1]||null
  };
}
function syncBrowserHistory(target,opts){
  opts=opts||{};
  if(opts.skipHistory) return;
  if(!window.history || !history.pushState) return;
  const legalTarget=opts.legalTarget||null;
  const nextHash=routeHash(target,legalTarget);
  const state={target:normalizeRouteTarget(target),legalTarget};
  if(opts.replace){
    history.replaceState(state,"",nextHash);
  }else if(window.location.hash!==nextHash){
    history.pushState(state,"",nextHash);
  }
}
function go(target,opts){
  opts=opts||{};
  target=normalizeRouteTarget(target);

  // Alle Geschäftskunden-Bereiche sind geschützt: ohne Geheimcode kein direkter Zugang.
  const protectedB2BTargets={
    wholesale:{target:"wholesale",label:"Großhändler / B2B Shop"},
    distributors:{target:"distributors",label:"Vertriebspartner"},
    "b2b-shop":{target:"wholesale",label:"B2B Shop"},
    "b2b-container":{target:"wholesale",scrollTarget:"configurator",label:"Container konfigurieren"},
    "b2b-pallet":{target:"wholesale",scrollTarget:"pallet-configurator",label:"Paletten konfigurieren"},
    account:{target:"account",label:"Konto anmelden / registrieren"},
    "b2b-login":{target:"account",label:"Konto anmelden / registrieren"}
  };

  let protectedB2B=protectedB2BTargets[target]||null;
  if(target==="wholesale" && opts.scrollTarget==="configurator"){
    protectedB2B={target:"wholesale",scrollTarget:"configurator",label:"Container konfigurieren"};
  }
  if(target==="wholesale" && opts.scrollTarget==="pallet-configurator"){
    protectedB2B={target:"wholesale",scrollTarget:"pallet-configurator",label:"Paletten konfigurieren"};
  }

  if(protectedB2B && !opts.bypassCode){
    try{sessionStorage.setItem("laperlaPendingB2BTargetV85",JSON.stringify(protectedB2B));}catch(e){}
    if(window.__setB2BGateLabel)window.__setB2BGateLabel(protectedB2B.label);
    target="wholesale-gate";
    opts.scrollTarget=null;
  }else if(protectedB2B && opts.bypassCode){
    target=protectedB2B.target;
    if(protectedB2B.scrollTarget) opts.scrollTarget=protectedB2B.scrollTarget;
  }

  // Account/Dashboard bleibt weiterhin Login-Bereich. Vertriebspartner läuft jetzt über Code-Zugang.
  const b2bGated=["dashboard"];
  dealerApproved=(localStorage.getItem("laperlaDealerApproved")==="1"); window.dealerApproved=dealerApproved;
  if(b2bGated.includes(target) && !loggedIn){
    if(window.__toast && !opts.fromPop)window.__toast("Bitte melden Sie sich als Geschäftskunde an");
    if(window.setCustType)window.setCustType("business");
    target="account";
  }else if(b2bGated.includes(target) && !dealerApproved){
    if(window.__toast && !opts.fromPop)window.__toast("Zugang erst nach Zustimmung von Laperla");
    target="b2b-approval";
  }

  const pages={...ROUTE_PAGES,account:loggedIn?"page-dashboard":"page-account","b2b-login":loggedIn?"page-dashboard":"page-account",dashboard:"page-dashboard"};
  let pid=pages[target]||"page-home";
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const page=document.getElementById(pid);
  if(page)page.classList.add("active");

  const gate=document.getElementById("gate");
  if(gate)gate.classList.add("hidden");

  // light header on dark-hero pages (home scene + wholesale & distributors)
  const darkPages=["wholesale","wholesale-gate","distributors","berlin"];
  const isDark = target==="home" || darkPages.includes(target);
  const header=document.getElementById("header");
  if(header)header.classList.toggle("on-dark", isDark);

  window.__currentRouteTarget=target;
  syncBrowserHistory(target,{...opts,legalTarget:opts.legalTarget||null});

  if(opts.legalTarget && typeof window.__showLegal==="function"){
    setTimeout(()=>window.__showLegal(opts.legalTarget),0);
  }

  if(opts.scrollTarget){
    setTimeout(()=>{
      const el=document.getElementById(opts.scrollTarget);
      if(el){
        const y=el.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo({top:Math.max(0,y),behavior:"smooth"});
      }
    },320);
  }else if(!opts.keepScroll){
    window.scrollTo({top:0,behavior:"instant"});
  }
  if(window.closeMenu)window.closeMenu();
}
function showStartGate(){
  const gate=document.getElementById("gate");
  if(gate)gate.classList.remove("hidden");
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const home=document.getElementById("page-home");
  if(home)home.classList.add("active");
  const header=document.getElementById("header");
  if(header)header.classList.remove("on-dark","scrolled");
  window.__currentRouteTarget="gate";
  window.scrollTo({top:0,behavior:"instant"});
  if(window.closeMenu)window.closeMenu();
}
function initBrowserHistory(){
  if(window.__laperlaHistoryReady) return;
  window.__laperlaHistoryReady=true;
  if("scrollRestoration" in history) history.scrollRestoration="manual";

  const hasHash=!!window.location.hash;
  const initial=hasHash ? readRouteFromLocation() : {target:"gate",legalTarget:null};

  // Wichtig: Beim ersten Öffnen KEIN #home erzwingen.
  // So erscheint zuerst Logo + Auswahl Privatkunde / Großhandel.
  history.replaceState(initial,"", hasHash ? window.location.href : (window.location.pathname + window.location.search));

  if(hasHash){
    go(initial.target,{skipHistory:true,fromPop:true,legalTarget:initial.legalTarget});
  }else{
    showStartGate();
  }

  window.addEventListener("popstate",function(e){
    const state=e.state || (window.location.hash ? readRouteFromLocation() : {target:"gate"});
    if(!state.target || state.target==="gate"){
      showStartGate();
      return;
    }
    go(state.target||"home",{skipHistory:true,fromPop:true,legalTarget:state.legalTarget||null});
  });

  // Delegierte Navigation für später dynamisch eingefügte Links/Buttons.
  document.addEventListener("click",function(e){
    const el=e.target.closest("[data-nav]");
    if(!el || e.defaultPrevented) return;
    const href=el.getAttribute("href")||"";
    if(href && href!=="#" && !href.startsWith("#")) return;
    e.preventDefault();
    go(el.dataset.nav,{
      legalTarget:el.dataset.legaltarget||null,
      scrollTarget:el.dataset.scroll||null
    });
  });
}

// ============ CHECKOUT · GASTBESTELLUNG ============
function checkoutItems(){
  if(checkoutMode==="b2b"){
    return B2B.filter(b=>(configState[b.id]||0)>0).map(b=>({id:b.id,name:b.name,vol:b.fmt,price:b.price,qty:configState[b.id],img:b.img||IMG.shop,images:b.images||null}));
  }
  return cart.map(x=>({id:x.id,name:x.name,vol:x.vol,price:x.price,qty:x.qty,img:x.img||IMG.shop,images:x.images||null}));
}
function checkoutSubtotal(){
  if(checkoutMode==="b2b") return Math.round(window._configTotal||0);
  return cartTotal();
}
function checkoutShippingCost(){
  const method=document.getElementById("deliveryMethod")?.value||"standard";
  if(checkoutMode==="b2b" || method==="pickup" || method==="individual") return 0;
  return checkoutSubtotal()>=90?0:6.90;
}
function checkoutShippingLabel(){
  const method=document.getElementById("deliveryMethod")?.value||"standard";
  if(checkoutMode==="b2b" || method==="individual") return "Wird individuell geprüft";
  if(method==="pickup") return "0,00 € · Abholung";
  return checkoutShippingCost()===0?"Kostenfrei":"6,90 €";
}
function renderCheckoutProductFocusV116(){
  const host=document.getElementById("checkoutProductFocusV116");
  if(!host)return;
  const items=checkoutItems();
  const x=items[0];
  if(!x){host.innerHTML='<div class="checkout-product-focus-copy-v116"><b>Keine Produkte</b></div>';return;}
  const images=x.images?.length?x.images:[x.img||IMG.shop];
  const more=items.length>1?`<div class="checkout-product-focus-more-v116">+ ${items.length-1} weitere${items.length-1===1?'s Produkt':' Produkte'}</div>`:'';
  host.innerHTML=`<div class="checkout-product-focus-image-v116${images.length>1?' multi':''}">${images.map(src=>`<img src="${src}" alt="${x.name}">`).join('')}</div><div class="checkout-product-focus-copy-v116"><b>${x.name}</b><small>${x.qty} × ${x.vol||'Produkt'}</small><strong>${fmt(x.price*x.qty)}</strong>${more}</div>`;
}
function renderCheckoutProductStrip(){
  const host=document.getElementById("checkoutProductStrip");
  if(!host)return;
  const items=checkoutItems();
  host.innerHTML=items.map(x=>`<div class="checkout-product-card-v115"><span class="checkout-product-photo-v115">${x.images?.length?x.images.map(src=>`<img src="${src}" alt="${x.name}">`).join(""):`<img src="${x.img||IMG.shop}" alt="${x.name}">`}</span><span class="checkout-product-copy-v115"><b>${x.name}</b><small>${x.qty} × ${x.vol||"Produkt"}</small><strong>${fmt(x.price*x.qty)}</strong></span></div>`).join("")||`<div class="checkout-product-card-v115"><span class="checkout-product-copy-v115"><b>Keine Produkte</b></span></div>`;
  renderCheckoutProductFocusV116();
}
function renderCheckoutSummary(){
  renderCheckoutProductStrip();
  const items=checkoutItems();
  const host=document.getElementById("checkoutOrderItems");
  if(host) host.innerHTML=items.map(x=>`<div class="checkout-summary-item-v108"><span class="checkout-summary-photo-v114">${x.images?.length?x.images.map(src=>`<img src="${src}" alt="${x.name}">`).join(""):`<img src="${x.img||IMG.shop}" alt="${x.name}">`}</span><span><b>${x.name}</b><small>${x.vol||""} · ${fmt(x.price)} je Stück</small></span><span class="qty">${x.qty} ×</span><span class="price">${fmt(x.price*x.qty)}</span></div>`).join("")||`<div class="checkout-summary-item-v108"><span>Keine Artikel gewählt</span></div>`;
  const subtotal=checkoutSubtotal(), shipping=checkoutShippingCost();
  document.getElementById("checkoutSubtotal").textContent=fmt(subtotal);
  document.getElementById("checkoutShipping").textContent=checkoutShippingLabel();
  document.getElementById("checkoutTotal").textContent=fmt(subtotal+shipping);
}
function setCheckoutStep(step){
  checkoutStep=Math.max(1,Math.min(3,step));
  document.querySelectorAll("[data-checkout-step]").forEach(p=>p.classList.toggle("active",Number(p.dataset.checkoutStep)===checkoutStep));
  document.querySelectorAll("[data-step-indicator]").forEach(i=>{const n=Number(i.dataset.stepIndicator);i.classList.toggle("active",n===checkoutStep);i.classList.toggle("done",n<checkoutStep);});
  document.getElementById("checkoutBack").hidden=checkoutStep===1;
  document.getElementById("checkoutNext").hidden=checkoutStep===3;
  document.getElementById("placeOrder").hidden=checkoutStep!==3;
  document.getElementById("checkoutNext").textContent=checkoutStep===1?"Weiter zur Adresse":"Weiter zur Übersicht";
  if(checkoutStep===3) renderCheckoutSummary();
  document.querySelector(".checkout-main-v108")?.scrollTo({top:0,behavior:"smooth"});
}
function showCheckoutBusinessFields(){
  const business=document.getElementById("customerType").value==="business" || checkoutMode==="b2b";
  document.getElementById("companyField").classList.toggle("is-hidden",!business);
  document.getElementById("vatField").classList.toggle("is-hidden",!business);
  document.getElementById("customerCompany").required=business;
}
function toggleShippingFields(){
  const same=document.getElementById("sameShipping").checked;
  const fields=document.getElementById("shippingFields");
  fields.style.display=same?"none":"grid";
  ["shippingStreet","shippingZip","shippingCity"].forEach(id=>document.getElementById(id).required=!same);
}
function invalidField(id,message){
  const el=document.getElementById(id); if(!el)return false;
  if(!String(el.value||"").trim()){el.focus();toast(message);return true;}
  if(id==="customerEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())){el.focus();toast("Bitte geben Sie eine gültige E-Mail-Adresse ein");return true;}
  return false;
}
function validateCheckoutStep(step){
  if(step===1){
    if(invalidField("customerFirst","Bitte Vornamen eingeben"))return false;
    if(invalidField("customerLast","Bitte Nachnamen eingeben"))return false;
    if(invalidField("customerEmail","Bitte E-Mail-Adresse eingeben"))return false;
    if(invalidField("customerPhone","Bitte Telefonnummer eingeben"))return false;
    if((document.getElementById("customerType").value==="business"||checkoutMode==="b2b")&&invalidField("customerCompany","Bitte Firmennamen eingeben"))return false;
  }
  if(step===2){
    if(invalidField("billingStreet","Bitte Rechnungsadresse eingeben"))return false;
    if(invalidField("billingZip","Bitte PLZ eingeben"))return false;
    if(invalidField("billingCity","Bitte Ort eingeben"))return false;
    if(!document.getElementById("sameShipping").checked){
      if(invalidField("shippingStreet","Bitte Lieferadresse eingeben"))return false;
      if(invalidField("shippingZip","Bitte Liefer-PLZ eingeben"))return false;
      if(invalidField("shippingCity","Bitte Lieferort eingeben"))return false;
    }
  }
  return true;
}
function generateOrderNumber(){
  const year=new Date().getFullYear(); const key=`laperlaOrderCounter_${year}`;
  let counter=parseInt(localStorage.getItem(key)||"123",10)+1;
  localStorage.setItem(key,String(counter));
  return `LP-${year}-${String(counter).padStart(5,"0")}`;
}
function checkoutAddress(prefix){
  return {street:document.getElementById(prefix+"Street").value.trim(),zip:document.getElementById(prefix+"Zip").value.trim(),city:document.getElementById(prefix+"City").value.trim(),country:document.getElementById(prefix+"Country").value};
}
function buildOrderRequest(){
  const same=document.getElementById("sameShipping").checked;
  const billing=checkoutAddress("billing");
  const subtotal=checkoutSubtotal(),shipping=checkoutShippingCost();
  return {
    orderNumber:generateOrderNumber(),
    createdAt:new Date().toISOString(),
    status:"Anfrage",
    mode:checkoutMode,
    customer:{type:document.getElementById("customerType").value,firstName:document.getElementById("customerFirst").value.trim(),lastName:document.getElementById("customerLast").value.trim(),email:document.getElementById("customerEmail").value.trim(),phone:document.getElementById("customerPhone").value.trim(),company:document.getElementById("customerCompany").value.trim(),vatId:document.getElementById("customerVat").value.trim()},
    billingAddress:billing,
    shippingAddress:same?billing:checkoutAddress("shipping"),
    sameShipping:same,
    deliveryMethod:document.getElementById("deliveryMethod").value,
    note:document.getElementById("orderNote").value.trim(),
    items:checkoutItems(),
    totals:{subtotal,shipping,total:subtotal+shipping,currency:"EUR",shippingLabel:checkoutShippingLabel()},
    consents:{terms:true,privacy:true,withdrawal:true},
    contractNotice:"Unverbindliche Bestellanfrage. Kaufvertrag erst mit schriftlicher Auftragsbestätigung."
  };
}
function saveOrderLocally(order){
  try{
    const orders=JSON.parse(localStorage.getItem("laperlaOrderRequests")||"[]");
    orders.unshift(order); localStorage.setItem("laperlaOrderRequests",JSON.stringify(orders.slice(0,200)));
    localStorage.setItem("laperlaLastOrderRequest",JSON.stringify(order));
    return true;
  }catch(err){console.error("Lokale Bestellsicherung fehlgeschlagen",err);return false;}
}
function orderEmailPayload(order){
  const billing=order.billingAddress||{};
  const shipping=order.shippingAddress||billing;
  const customer=order.customer||{};
  const deliveryLabels={standard:"Standardversand Deutschland",pickup:"Abholung nach Vereinbarung",individual:"Spedition / individuelle Lieferung"};
  const products=(order.items||[]).map(x=>`${x.qty} × ${x.name} (${x.vol}) – ${fmt(x.price*x.qty)}`).join("\n");
  const addressText=a=>[a.street,a.zip,a.city,a.country].filter(Boolean).join(", ");
  return {
    _subject:`Neue Laperla Bestellanfrage ${order.orderNumber}`,
    _template:"table",
    _replyto:customer.email||"",
    _captcha:"false",
    _url:(location.protocol==="file:"?"https://laperla-olive.de/bestellung":location.href),
    email:customer.email||"",
    Bestellnummer:order.orderNumber,
    Datum:new Date(order.createdAt).toLocaleString("de-DE"),
    Kunde:`${customer.firstName||""} ${customer.lastName||""}`.trim(),
    Kundentyp:customer.type==="business"?"Geschäftskunde":"Privatkunde",
    Firma:customer.company||"–",
    Umsatzsteuer_ID:customer.vatId||"–",
    Telefon:customer.phone||"–",
    Rechnungsadresse:addressText(billing)||"–",
    Lieferadresse:addressText(shipping)||addressText(billing)||"–",
    Lieferart:deliveryLabels[order.deliveryMethod]||order.deliveryMethod||"–",
    Produkte:products||"–",
    Warenwert:fmt(order.totals.subtotal),
    Versand:order.totals.shippingLabel,
    Vorlaeufige_Gesamtsumme:fmt(order.totals.total),
    Bemerkung:order.note||"–",
    Vertragsstatus:"Unverbindliche Bestellanfrage – Kaufvertrag erst mit schriftlicher Auftragsbestätigung"
  };
}
async function transmitOrder(order){
  const backendEndpoint=String(window.LAPERLA_ORDER_BACKEND_ENDPOINT||"").trim();
  const emailEndpoint=String(window.LAPERLA_ORDER_EMAIL_ENDPOINT||"").trim();

  // FormSubmit funktioniert laut Anbieter nicht zuverlässig bei direkt geöffneten file://-Dateien.
  if(!backendEndpoint && location.protocol==="file:"){
    return {
      ok:false,
      mode:"local",
      reason:"file-protocol",
      message:"Die HTML-Datei wurde direkt vom Computer geöffnet. Der E-Mail-Dienst akzeptiert Bestellungen erst über eine echte Webadresse oder einen lokalen Webserver."
    };
  }

  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),20000);
  try{
    if(backendEndpoint){
      const response=await fetch(backendEndpoint,{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify(order),
        signal:controller.signal
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(data.message||`Backend HTTP ${response.status}`);
      return {ok:true,mode:"backend",data};
    }

    if(!emailEndpoint)return {ok:false,mode:"local",reason:"not-configured",message:"Keine E-Mail-Schnittstelle konfiguriert."};

    const body=new URLSearchParams();
    Object.entries(orderEmailPayload(order)).forEach(([key,value])=>body.append(key,String(value??"")));

    const response=await fetch(emailEndpoint,{
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
        "Accept":"application/json"
      },
      body:body.toString(),
      signal:controller.signal
    });

    const raw=await response.text();
    let data={};
    try{data=raw?JSON.parse(raw):{};}catch(_){data={message:raw};}
    const successValue=String(data.success??"").toLowerCase();
    const message=String(data.message||"");
    const activationRequired=/activat|confirm/i.test(message) && !/success/i.test(message);

    if(activationRequired){
      return {ok:false,mode:"activation",reason:"activation-required",message:message||"Formular muss einmal per E-Mail aktiviert werden.",data};
    }
    if(!response.ok || successValue==="false"){
      throw new Error(message||`E-Mail HTTP ${response.status}`);
    }
    return {ok:true,mode:"email",data};
  }catch(err){
    console.error("Bestellübertragung nicht erreichbar",err);
    return {ok:false,mode:"local",reason:String(err),message:err?.message||String(err)};
  }finally{
    clearTimeout(timer);
  }
}
function downloadOrderCopy(order){
  if(!order)return;
  const lines=["LAPERLA OLIVE OIL – BESTELLANFRAGE",order.orderNumber,"",`Datum: ${new Date(order.createdAt).toLocaleString("de-DE")}`,`Kunde: ${order.customer.firstName} ${order.customer.lastName}`,`E-Mail: ${order.customer.email}`,`Telefon: ${order.customer.phone}`,order.customer.company?`Firma: ${order.customer.company}`:"","",...order.items.map(x=>`${x.qty} × ${x.name} (${x.vol}) – ${fmt(x.price*x.qty)}`),"",`Warenwert: ${fmt(order.totals.subtotal)}`,`Versand: ${order.totals.shippingLabel}`,`Vorläufige Gesamtsumme: ${fmt(order.totals.total)}`,"",order.contractNotice].filter(Boolean);
  const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"}); const url=URL.createObjectURL(blob); const a=document.createElement("a");a.href=url;a.download=`${order.orderNumber}-Bestellanfrage.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function resetCheckoutForm(){
  document.getElementById("checkoutForm").reset();
  document.getElementById("sameShipping").checked=true;
  document.getElementById("customerType").value=checkoutMode==="b2b"?"business":"private";
  ["checkoutTerms","checkoutPrivacy","checkoutWithdrawal"].forEach(id=>document.getElementById(id).checked=false);
  toggleShippingFields();showCheckoutBusinessFields();setCheckoutStep(1);
}
function openCheckout(mode,total,title,sub){
  checkoutMode=mode||"retail";
  document.getElementById("checkoutFormView").style.display="block";
  document.getElementById("orderDoneView").style.display="none";
  document.getElementById("checkoutTitle").textContent=checkoutMode==="b2b"?"B2B-Anfrage als Gast":"Bestellung als Gast";
  document.getElementById("checkoutSub").textContent=checkoutMode==="b2b"?"Konfiguration → Firmendaten → Lieferadresse → Anfrage absenden":"Warenkorb → Kundendaten → Lieferadresse → Bestellübersicht → Bestellanfrage absenden";
  resetCheckoutForm();renderCheckoutSummary();
  const modal=document.getElementById("checkoutModal");modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
function closeCheckout(){const modal=document.getElementById("checkoutModal");modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}


function applyOrderTransmissionResult(order,result,localSaved){
  const icon=document.getElementById("orderDoneIcon");
  const title=document.getElementById("orderDoneTitle");
  const msg=document.getElementById("orderDoneMsg");
  const status=document.getElementById("orderBackendStatus");
  const retry=document.getElementById("retryOrderSend");

  icon.className="check";
  retry.hidden=true;

  if(result.ok){
    icon.textContent="✓";
    title.textContent="Bestellanfrage erfolgreich übermittelt";
    msg.textContent=`Ihre Bestellanfrage wurde unter ${order.orderNumber} an Laperla übermittelt. Wir prüfen Verfügbarkeit, Lieferkosten und Gesamtpreis und melden uns unter ${order.customer.email}.`;
    status.className="order-status-v108 ok";
    status.textContent=result.mode==="backend"
      ? "Sicher übermittelt: Die Anfrage wurde an das Bestell-Backend übertragen."
      : `E-Mail bestätigt: Die vollständige Bestellanfrage wurde an ${window.LAPERLA_ORDER_RECIPIENT} übermittelt und zusätzlich auf diesem Gerät gesichert.`;
    return;
  }

  icon.textContent="!";
  retry.hidden=false;
  if(result.reason==="activation-required"){
    icon.classList.add("activation");
    title.textContent="E-Mail-Schnittstelle noch nicht aktiviert";
    msg.textContent=`Die Anfrage ${order.orderNumber} wurde lokal gesichert, aber noch nicht per E-Mail zugestellt.`;
    status.className="order-status-v108 activation";
    status.textContent=`FormSubmit hat eine Aktivierungs-E-Mail an ${window.LAPERLA_ORDER_RECIPIENT} angefordert. Bitte Posteingang und Spam prüfen, den Aktivierungslink anklicken und anschließend „E-Mail erneut senden“ wählen.`;
  }else if(result.reason==="file-protocol"){
    icon.classList.add("error");
    title.textContent="E-Mail wurde nicht versendet";
    msg.textContent=`Die Anfrage ${order.orderNumber} wurde nur lokal auf diesem Gerät gesichert.`;
    status.className="order-status-v108 error";
    status.textContent="Diese Datei wurde direkt als HTML-Datei geöffnet. Für echten E-Mail-Versand muss die Website über https://laperla-olive.de oder einen lokalen Webserver geöffnet werden. Es wurde keine E-Mail an info@aniso-olive.de gesendet.";
  }else{
    icon.classList.add("error");
    title.textContent="E-Mail konnte nicht versendet werden";
    msg.textContent=`Die Anfrage ${order.orderNumber} wurde ${localSaved?"lokal gesichert":"nicht gespeichert"}.`;
    status.className="order-status-v108 error";
    status.textContent=`Die Übermittlung an ${window.LAPERLA_ORDER_RECIPIENT} ist fehlgeschlagen. ${result.message||"Bitte Internetverbindung und E-Mail-Schnittstelle prüfen."}`;
  }
}

// ============ INIT ============
// ============ I18N / SPRACHEN ============
const I18N={"de":{"nav_home":"Markenwelt","nav_shop":"Shop · Kollektion","nav_awards":"Auszeichnungen","nav_gallery":"Galerie","nav_wholesale":"Großhandel · B2B-Shop","nav_config":"Container konfigurieren","nav_commission":"Provisionsmodell","nav_dist":"Vertriebspartner","nav_account":"Anmelden / Registrieren","nav_dashboard":"Mein Händler-Dashboard","nav_logout":"Abmelden","grp_discover":"Entdecken","grp_business":"Geschäftskunden","grp_account":"Konto","grp_service":"Service","acct":"⬦ Konto","acct_in":"⬦ Mein Konto","hero_desc":"Geschichte und Gesundheit in jedem Tropfen. Kaltgepresst aus uralten Chemlali-Bäumen der Haine Tunesiens, seit Generationen. Prämiert auf drei Kontinenten.","hero_cta1":"Kollektion entdecken","hero_cta2":"Für Unternehmen","offers_ey":"Premium Olivenöl","offers_h":"Édition Prestige — Kuratierte Sets","purity_lead_pre":"Säuregehalt unter","cta_shop":"Zum Shop","cta_ws":"Großhandel","add_cart":"In den Warenkorb","incl_vat":"inkl. MwSt.","unavail":"Zurzeit nicht verfügbar","not_orderable":"Nicht bestellbar","cat_glass":"Glasflasche","cat_tin":"Metallkanister","cat_gift":"Geschenkedition","menu_brand":"Marke","menu_quality":"Qualität & Auszeichnungen","lnk_story":"Story","lnk_about":"Über uns","lnk_mission":"Mission","lnk_origin":"Herkunft · Tunesien","lnk_discover":"Tunesien entdecken","lnk_collection":"Kollektion","lnk_offers":"Premium Olivenöl","lnk_certified":"Zertifizierte Reinheit","lnk_certs":"Zertifikate & Awards","lnk_intl":"Internationale Auszeichnungen","lnk_ws":"Großhändler","lnk_dist":"Vertriebspartner","lnk_pallet":"Paletten konfigurieren","lnk_b2bshop":"B2B Shop","w_products":"Produkte","acct_sub":"Code-Zugang · Login · Registrierung · Freigabe","logout_sub":"Sitzung beenden","hs_ey":"Zembra la Romaine · Tunesien","hs_title_a":"Wo alles begann — ","hs_title_b":"und nichts vergessen wurde","hs_lead":"Zwischen felsigem Boden und Meeresluft wachsen Olivenbäume, die älter sind als jede Marke. Aus ihren Früchten entsteht Laperla Vestige — ein Öl, das Herkunft nicht behauptet, sondern beweist.","hs_text":"Jede Ernte folgt dem Rhythmus der Natur: von Hand gepflückt, innerhalb weniger Stunden kalt extrahiert und ungefiltert in seiner reinsten Form bewahrt. Kein Kompromiss, keine Abkürzung — nur ehrliches, sauberes Öl mit vollständiger Rückverfolgbarkeit bis zum Baum.","hs_f1":"Sortenrein & ungefiltert aus einer Herkunft","hs_f2":"Von der Ernte bis zur Kaltextraktion","hs_f3":"Zertifiziert & international goldprämiert","hs_bio":"Bio","menu_brand_sub":"Story · Über uns · Mission · Herkunft · Tunesien","menu_collection_sub":"Produkte · Berlin Edition · Angebote","menu_quality_sub":"Ultra Purity · Zertifikate & Awards","menu_b2b_sub":"Großhändler · Vertriebspartner · Container","w_all":"Alle","shop_h":"Die Kollektion","shop_sub":"","w_details":"Details ansehen","lnk_editions":"Editionen","lnk_berlin":"Berlin Edition","gate_award_count":"10+ internationale Auszeichnungen","gate_retail_title":"Privatkunde","gate_retail_desc":"Kuratierte Flaschen der Édition Prestige, direkt an Ihre Tafel.","gate_wholesale_title":"Großhandel","gate_wholesale_desc":"B2B-Shop, Container-Konfigurator, Provisionsmodell & Händlerzugang.","about_h":"Über uns","about_p1":"Laperla Olive Oil steht für hochwertiges Olivenöl mit Herkunft, Charakter und internationaler Anerkennung. Unsere Marke verbindet die Kraft tunesischer Olivenhaine mit einer modernen Premium-Präsentation für Privatkunden, Feinkost, Gastronomie und Großhandel.","about_p2":"Jede Flasche erzählt von alten Olivenbäumen, traditioneller Ernte, sorgfältiger Verarbeitung und dem Anspruch, Olivenöl nicht nur als Produkt, sondern als wertvolles Stück Kultur zu präsentieren. Laperla steht für Reinheit, Geschmack und Vertrauen — sichtbar durch internationale Auszeichnungen, Goldmedaillen und zertifizierte Qualität.","about_p3":"Unser Ziel ist es, tunesisches Premium-Olivenöl auf ein neues Niveau zu bringen: edel, ehrlich, nachvollziehbar und bereit für Kunden, die Qualität nicht nur schmecken, sondern auch verstehen möchten.","about_final":"Laperla Olive Oil ist mehr als Olivenöl. Es ist Herkunft, Handwerk und Eleganz in jeder Flasche.","mission_h2":"Mission","mission_p1":"Unsere Mission ist es, tunesisches Premium-Olivenöl mit Würde, Qualität und internationalem Anspruch zu präsentieren. Laperla Olive Oil soll zeigen, dass echtes Olivenöl mehr ist als ein Lebensmittel — es ist Herkunft, Kultur, Handwerk und Vertrauen.","mission_p2":"Wir möchten Kunden ein Olivenöl bieten, das durch Reinheit, Geschmack und Transparenz überzeugt. Von alten Olivenhainen über sorgfältige Verarbeitung bis zur edlen Präsentation steht jede Flasche für Respekt gegenüber der Natur, der Tradition und den Menschen, die hinter diesem Produkt stehen.","mission_p3":"Unsere Aufgabe ist es, tunesisches Olivenöl auf dem internationalen Markt stark zu positionieren — für Privatkunden, Feinkost, Gastronomie, Hotels, Großhandel und Vertriebspartner. Laperla verbindet mediterrane Geschichte mit moderner Premium-Markenführung.","mission_final":"Unsere Mission ist klar: Qualität sichtbar machen, Vertrauen schaffen und tunesisches Olivenöl als edles Kulturgut in die Welt tragen.","story_h2":"Story","story_p1":"Die Geschichte von Laperla Olive Oil beginnt dort, wo Olivenbäume seit Generationen tief in der Erde verwurzelt sind. In den tunesischen Hainen wachsen Bäume, die Hitze, Wind, steinigen Boden und die Zeit überstanden haben. Aus dieser Landschaft entsteht ein Olivenöl mit Charakter, Kraft und natürlicher Eleganz.","story_p2":"Laperla wurde geschaffen, um dieses Erbe sichtbar zu machen. Nicht als gewöhnliches Produkt im Regal, sondern als Premium-Olivenöl mit Seele, Herkunft und Ausstrahlung. Jede Flasche soll zeigen, dass wahre Qualität nicht laut sein muss — sie entsteht aus Geduld, Sorgfalt, Reinheit und Respekt vor der Natur.","story_p3":"Die Marke verbindet traditionelle Olivenölkultur mit moderner Präsentation. Alte Olivenhaine, sorgfältige Ernte, kontrollierte Verarbeitung und internationale Auszeichnungen formen eine Geschichte, die Kunden sehen, verstehen und schmecken können.","story_final":"Laperla Olive Oil erzählt die Geschichte Tunesiens in einer edlen Form: vom Baum zur Flasche, von der Tradition zur Weltmarke.","award_eyebrow":"Auf drei Kontinenten prämiert","award_band_label":"Internationale Auszeichnungen","award_band_sub":"Goldmedaillen und offizielle Zertifikate aus Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari und Athen — sichtbar dokumentiert durch internationale Jurys auf drei Kontinenten.","award_band_btn":"Alle Zertifikate ansehen","trust_awards":"Internationale Awards","trust_acid_l":"Säuregehalt","trust_poly_l":"mg/kg Polyphenole","trust_harvest_l":"Ernte bis Presse","offers_subtitle":"Kuratierte Sets","offers_intro_strong":"Ein Ausdruck von Exzellenz.","offers_intro_p":"Für Menschen mit höchsten Ansprüchen – geprägt von zeitloser Eleganz, außergewöhnlicher Qualität und einem unverwechselbaren Charakter.","purity_cap":"Säuregehalt","purity_lead":"Säuregehalt unter 0,3 % — deutlich besser als der 0,8-%-Grenzwert für Extra Vergine. Innerhalb von 4 Stunden nach der Ernte kaltgepresst. Jeder Tropfen ist flüssige Medizin, reich an über 600 mg/kg Polyphenolen, die Herz und Immunsystem schützen.","purity_acid_l":"Säuregehalt","purity_poly_l":"mg/kg Polyphenole","purity_harvest_l":"Ernte bis Presse","purity_tagline":"Schützen Sie Ihr Herz. Bekämpfen Sie Entzündungen — mit natürlichen Polyphenolen.","cert_eyebrow":"Zertifizierte Reinheit","cert_h2":"Bio-Qualität, offiziell dokumentiert","cert1_micro":"Bio-Kontrollcode · Tunesien","cert1_p":"Der Bio-Code macht die zertifizierte Herkunft sichtbar und unterstützt eine saubere Kennzeichnung für professionelle Produktunterlagen.","cert2_p":"Ein starker Vertrauensanker für Bio-Qualität, Rückverfolgbarkeit und seriöse Kommunikation gegenüber Händlern und Kunden.","cert3_p":"Relevantes Signal für internationale Märkte und Käufergruppen, die Bio-Qualität nach anerkannten Standards erwarten.","heritage_ey":"Altes Olivenerbe","heritage_h3":"Der Baum am Ursprung","heritage_p":"Ein uralter Olivenbaum, felsiger Boden und eine Herkunft, die Laperla mit Tiefe, Zeit und Authentizität auflädt.","reviews_kicker":"Kundenrezensionen · Customer Reviews · Avis Clients","reviews_h3":"Stimmen aus der ganzen Welt","reviews_sub":"Was Sommeliers, Chefköche, Feinkosthändler und Genießer aus 20+ Ländern über Laperla sagen.","reviews_avg_label":"Durchschnittliche Bewertung","reviews_count_label":"Verifizierte Bewertungen","reviews_countries_label":"Länder","footer_legacy_h":"Treten Sie dem Vermächtnis bei","footer_legacy_p":"Wo Geschichte und Gesundheit sich in jedem Tropfen vereinen — vom uralten Hain bis auf Ihre Tafel."},"en":{"nav_home":"Brand World","nav_shop":"Shop · Collection","nav_awards":"Awards","nav_gallery":"Gallery","nav_wholesale":"Wholesale · B2B Shop","nav_config":"Configure Container","nav_commission":"Commission Model","nav_dist":"Distribution Partners","nav_account":"Sign in / Register","nav_dashboard":"My Dealer Dashboard","nav_logout":"Sign out","grp_discover":"Discover","grp_business":"Business","grp_account":"Account","grp_service":"Service","acct":"⬦ Account","acct_in":"⬦ My Account","hero_desc":"History and health in every drop. Cold-pressed from ancient Chemlali trees in the groves of Tunisia, for generations. Awarded across three continents.","hero_cta1":"Discover the Collection","hero_cta2":"For Business","offers_ey":"Premium Olive Oil","offers_h":"Édition Prestige — Curated Sets","purity_lead_pre":"Acidity below","cta_shop":"To the Shop","cta_ws":"Wholesale","add_cart":"Add to Cart","incl_vat":"incl. VAT","unavail":"Currently unavailable","not_orderable":"Not orderable","cat_glass":"Glass Bottle","cat_tin":"Metal Tin","cat_gift":"Gift Edition","menu_brand":"Brand","menu_quality":"Quality & Awards","lnk_story":"Story","lnk_about":"About us","lnk_mission":"Mission","lnk_origin":"Origin · Tunisia","lnk_discover":"Discover Tunisia","lnk_collection":"Collection","lnk_offers":"Premium Olive Oil","lnk_certified":"Certified Purity","lnk_certs":"Certificates & Awards","lnk_intl":"International Awards","lnk_ws":"Wholesalers","lnk_dist":"Distribution Partners","lnk_pallet":"Configure Pallets","lnk_b2bshop":"B2B Shop","w_products":"Products","acct_sub":"Code access · Login · Registration · Approval","logout_sub":"End session","hs_ey":"Zembra la Romaine · Tunisia","hs_title_a":"Where it all began — ","hs_title_b":"and nothing was forgotten","hs_lead":"Between rocky soil and sea air grow olive trees older than any brand. From their fruit comes Laperla Vestige — an oil that doesn't claim its origin, it proves it.","hs_text":"Every harvest follows nature's rhythm: hand-picked, cold-extracted within hours and preserved unfiltered in its purest form. No compromise, no shortcuts — just honest, clean oil with full traceability back to the tree.","hs_f1":"Single-variety & unfiltered from one origin","hs_f2":"From harvest to cold extraction","hs_f3":"Certified & awarded gold worldwide","hs_bio":"Organic","menu_brand_sub":"Story · About us · Mission · Origin · Tunisia","menu_collection_sub":"Products · Berlin Edition · Offers","menu_quality_sub":"Ultra Purity · Certificates & Awards","menu_b2b_sub":"Wholesalers · Distribution Partners · Container","w_all":"All","shop_h":"The Collection","shop_sub":"","w_details":"View details","lnk_editions":"Editions","lnk_berlin":"Berlin Edition","gate_award_count":"10+ International Awards","gate_retail_title":"Private Customer","gate_retail_desc":"Curated bottles from the Édition Prestige, delivered directly to your table.","gate_wholesale_title":"Wholesale","gate_wholesale_desc":"B2B shop, container configurator, commission model & dealer access.","about_h":"About Us","about_p1":"Laperla Olive Oil stands for premium olive oil with origin, character and international recognition. Our brand unites the power of Tunisian olive groves with a modern premium presentation for private customers, delicatessens, gastronomy and wholesale.","about_p2":"Every bottle tells the story of ancient olive trees, traditional harvesting, careful processing and the ambition to present olive oil not just as a product, but as a valuable piece of culture. Laperla stands for purity, taste and trust — made visible through international awards, gold medals and certified quality.","about_p3":"Our goal is to elevate Tunisian premium olive oil to a new level: refined, honest, traceable and ready for customers who want not only to taste quality, but to understand it.","about_final":"Laperla Olive Oil is more than olive oil. It is origin, craftsmanship and elegance in every bottle.","mission_h2":"Mission","mission_p1":"Our mission is to present Tunisian premium olive oil with dignity, quality and international ambition. Laperla Olive Oil aims to show that real olive oil is more than a food product — it is origin, culture, craftsmanship and trust.","mission_p2":"We want to offer customers an olive oil that convinces through purity, taste and transparency. From ancient olive groves through careful processing to the refined presentation, every bottle stands for respect towards nature, tradition and the people behind this product.","mission_p3":"Our task is to position Tunisian olive oil strongly in the international market — for private customers, delicatessens, gastronomy, hotels, wholesale and distribution partners. Laperla connects Mediterranean history with modern premium brand management.","mission_final":"Our mission is clear: make quality visible, build trust and carry Tunisian olive oil as a noble cultural heritage into the world.","story_h2":"Story","story_p1":"The story of Laperla Olive Oil begins where olive trees have been deeply rooted in the earth for generations. In the Tunisian groves grow trees that have withstood heat, wind, rocky soil and the test of time. From this landscape emerges an olive oil with character, strength and natural elegance.","story_p2":"Laperla was created to make this heritage visible. Not as an ordinary product on a shelf, but as a premium olive oil with soul, origin and radiance. Every bottle is meant to show that true quality need not be loud — it comes from patience, care, purity and respect for nature.","story_p3":"The brand combines traditional olive oil culture with modern presentation. Ancient olive groves, careful harvesting, controlled processing and international awards form a story that customers can see, understand and taste.","story_final":"Laperla Olive Oil tells the story of Tunisia in a refined form: from tree to bottle, from tradition to world brand.","award_eyebrow":"Awarded on Three Continents","award_band_label":"International Awards","award_band_sub":"Gold medals and official certificates from Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari and Athens — visibly documented by international juries on three continents.","award_band_btn":"View All Certificates","trust_awards":"International Awards","trust_acid_l":"Acidity","trust_poly_l":"mg/kg Polyphenols","trust_harvest_l":"Harvest to Press","offers_subtitle":"Curated Sets","offers_intro_strong":"An expression of excellence.","offers_intro_p":"For people with the highest standards — defined by timeless elegance, exceptional quality and a distinctive character.","purity_cap":"Acidity","purity_lead":"Acidity below 0.3% — significantly better than the 0.8% threshold for Extra Virgin. Cold-pressed within 4 hours of harvest. Every drop is liquid medicine, rich in over 600 mg/kg polyphenols that protect heart and immune system.","purity_acid_l":"Acidity","purity_poly_l":"mg/kg Polyphenols","purity_harvest_l":"Harvest to Press","purity_tagline":"Protect your heart. Fight inflammation — with natural polyphenols.","cert_eyebrow":"Certified Purity","cert_h2":"Organic quality, officially documented","cert1_micro":"Organic Control Code · Tunisia","cert1_p":"The organic code makes certified origin visible and supports clean labelling for professional product documentation.","cert2_p":"A strong trust anchor for organic quality, traceability and serious communication with retailers and customers.","cert3_p":"A relevant signal for international markets and buyer groups that expect organic quality to recognised standards.","heritage_ey":"Ancient Olive Heritage","heritage_h3":"The Tree at the Origin","heritage_p":"An ancient olive tree, rocky soil and an origin that charges Laperla with depth, time and authenticity.","reviews_kicker":"Customer Reviews · Kundenrezensionen · Avis Clients","reviews_h3":"Voices from Around the World","reviews_sub":"What sommeliers, chefs, fine food retailers and connoisseurs from 20+ countries say about Laperla.","reviews_avg_label":"Average Rating","reviews_count_label":"Verified Reviews","reviews_countries_label":"Countries","footer_legacy_h":"Join the Legacy","footer_legacy_p":"Where history and health unite in every drop — from the ancient grove to your table."},"fr":{"nav_home":"Univers de la marque","nav_shop":"Boutique · Collection","nav_awards":"Distinctions","nav_gallery":"Galerie","nav_wholesale":"Gros · Boutique B2B","nav_config":"Configurer le conteneur","nav_commission":"Modèle de commission","nav_dist":"Partenaires de distribution","nav_account":"Se connecter / S'inscrire","nav_dashboard":"Mon tableau de bord","nav_logout":"Se déconnecter","grp_discover":"Découvrir","grp_business":"Professionnels","grp_account":"Compte","grp_service":"Service","acct":"⬦ Compte","acct_in":"⬦ Mon compte","hero_desc":"De l'histoire et de la santé dans chaque goutte. Pressée à froid à partir d'oliviers Chemlali centenaires des oliveraies de Tunisie, depuis des générations. Primée sur trois continents.","hero_cta1":"Découvrir la collection","hero_cta2":"Pour les entreprises","offers_ey":"Huile d'Olive Premium","offers_h":"Édition Prestige — Coffrets sélectionnés","purity_lead_pre":"Acidité inférieure à","cta_shop":"Vers la boutique","cta_ws":"Gros","add_cart":"Ajouter au panier","incl_vat":"TVA incluse","unavail":"Momentanément indisponible","not_orderable":"Commande impossible","cat_glass":"Bouteille en verre","cat_tin":"Bidon métallique","cat_gift":"Édition cadeau","menu_brand":"Marque","menu_quality":"Qualité & Distinctions","lnk_story":"Histoire","lnk_about":"À propos","lnk_mission":"Mission","lnk_origin":"Origine · Tunisie","lnk_discover":"Découvrir la Tunisie","lnk_collection":"Collection","lnk_offers":"Huile d'Olive Premium","lnk_certified":"Pureté certifiée","lnk_certs":"Certificats & Récompenses","lnk_intl":"Distinctions internationales","lnk_ws":"Grossistes","lnk_dist":"Partenaires de distribution","lnk_pallet":"Configurer des palettes","lnk_b2bshop":"Boutique B2B","w_products":"Produits","acct_sub":"Accès par code · Connexion · Inscription","logout_sub":"Terminer la session","hs_ey":"Zembra la Romaine · Tunisie","hs_title_a":"Là où tout a commencé — ","hs_title_b":"et rien n'a été oublié","hs_lead":"Entre sol rocheux et air marin poussent des oliviers plus anciens que toute marque. De leurs fruits naît Laperla Vestige — une huile qui n'affirme pas son origine : elle la prouve.","hs_text":"Chaque récolte suit le rythme de la nature : cueillie à la main, extraite à froid en quelques heures et conservée non filtrée dans sa forme la plus pure. Aucun compromis, aucun raccourci — seulement une huile honnête et pure, avec une traçabilité complète jusqu'à l'arbre.","hs_f1":"Monovariétale & non filtrée, une seule origine","hs_f2":"De la récolte à l'extraction à froid","hs_f3":"Certifiée & médaillée d'or à l'international","hs_bio":"Bio","menu_brand_sub":"Histoire · À propos · Mission · Origine · Tunisie","menu_collection_sub":"Produits · Berlin Edition · Offres","menu_quality_sub":"Ultra Purity · Certificats & Récompenses","menu_b2b_sub":"Grossistes · Partenaires de distribution · Container","w_all":"Tous","shop_h":"La Collection","shop_sub":"","w_details":"Voir les détails","lnk_editions":"Éditions","lnk_berlin":"Berlin Edition","gate_award_count":"10+ distinctions internationales","gate_retail_title":"Client particulier","gate_retail_desc":"Bouteilles sélectionnées de l'Édition Prestige, livrées directement à votre table.","gate_wholesale_title":"Grossiste","gate_wholesale_desc":"Boutique B2B, configurateur de conteneur, modèle de commission & accès revendeur.","about_h":"À propos de nous","about_p1":"Laperla Olive Oil représente une huile d'olive haut de gamme avec une origine, un caractère et une reconnaissance internationale. Notre marque unit la force des oliveraies tunisiennes à une présentation premium moderne pour les particuliers, les épiceries fines, la restauration et le commerce de gros.","about_p2":"Chaque bouteille raconte l'histoire d'oliviers centenaires, d'une récolte traditionnelle, d'une transformation soigneuse et de l'ambition de présenter l'huile d'olive non pas comme un simple produit, mais comme un précieux morceau de culture. Laperla symbolise pureté, saveur et confiance — visibles à travers les distinctions internationales, les médailles d'or et la qualité certifiée.","about_p3":"Notre objectif est d'élever l'huile d'olive premium tunisienne à un nouveau niveau : raffinée, honnête, traçable et prête pour des clients qui veulent non seulement goûter la qualité, mais aussi la comprendre.","about_final":"Laperla Olive Oil est plus qu'une huile d'olive. C'est une origine, un savoir-faire et une élégance dans chaque bouteille.","mission_h2":"Mission","mission_p1":"Notre mission est de présenter l'huile d'olive premium tunisienne avec dignité, qualité et ambition internationale. Laperla Olive Oil entend montrer que l'huile d'olive authentique est plus qu'un aliment — c'est une origine, une culture, un savoir-faire et une confiance.","mission_p2":"Nous souhaitons offrir aux clients une huile d'olive qui convainc par sa pureté, son goût et sa transparence. Des anciennes oliveraies à la présentation raffinée en passant par la transformation soigneuse, chaque bouteille témoigne du respect envers la nature, la tradition et les hommes qui se trouvent derrière ce produit.","mission_p3":"Notre mission est de positionner fortement l'huile d'olive tunisienne sur le marché international — pour les particuliers, les épiceries fines, la restauration, les hôtels, le commerce de gros et les partenaires de distribution. Laperla unit l'histoire méditerranéenne à une gestion de marque premium moderne.","mission_final":"Notre mission est claire : rendre la qualité visible, instaurer la confiance et porter l'huile d'olive tunisienne comme un précieux patrimoine culturel dans le monde entier.","story_h2":"Histoire","story_p1":"L'histoire de Laperla Olive Oil commence là où les oliviers sont profondément enracinés dans la terre depuis des générations. Dans les oliveraies tunisiennes poussent des arbres qui ont résisté à la chaleur, au vent, aux sols rocailleux et à l'épreuve du temps. De ce paysage naît une huile d'olive avec du caractère, de la force et une élégance naturelle.","story_p2":"Laperla a été créé pour rendre cet héritage visible. Non pas comme un produit ordinaire sur une étagère, mais comme une huile d'olive premium avec une âme, une origine et un rayonnement. Chaque bouteille est destinée à montrer que la vraie qualité n'a pas besoin d'être bruyante — elle vient de la patience, du soin, de la pureté et du respect de la nature.","story_p3":"La marque combine la culture traditionnelle de l'huile d'olive avec une présentation moderne. Anciennes oliveraies, récolte soigneuse, transformation contrôlée et distinctions internationales forment une histoire que les clients peuvent voir, comprendre et goûter.","story_final":"Laperla Olive Oil raconte l'histoire de la Tunisie sous une forme raffinée : de l'arbre à la bouteille, de la tradition à la marque mondiale.","award_eyebrow":"Primée sur trois continents","award_band_label":"Distinctions internationales","award_band_sub":"Médailles d'or et certificats officiels de Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari et Athènes — visiblement documentés par des jurys internationaux sur trois continents.","award_band_btn":"Voir tous les certificats","trust_awards":"Prix internationaux","trust_acid_l":"Acidité","trust_poly_l":"mg/kg Polyphénols","trust_harvest_l":"Récolte à la presse","offers_subtitle":"Coffrets sélectionnés","offers_intro_strong":"Une expression d'excellence.","offers_intro_p":"Pour les personnes aux exigences les plus élevées — marquées par une élégance intemporelle, une qualité exceptionnelle et un caractère distinctif.","purity_cap":"Acidité","purity_lead":"Acidité inférieure à 0,3 % — nettement meilleure que le seuil de 0,8 % pour l'Extra Vierge. Pressée à froid dans les 4 heures suivant la récolte. Chaque goutte est une médecine liquide, riche en plus de 600 mg/kg de polyphénols qui protègent le cœur et le système immunitaire.","purity_acid_l":"Acidité","purity_poly_l":"mg/kg Polyphénols","purity_harvest_l":"Récolte à la presse","purity_tagline":"Protégez votre cœur. Combattez l'inflammation — avec des polyphénols naturels.","cert_eyebrow":"Pureté certifiée","cert_h2":"Qualité bio, officiellement documentée","cert1_micro":"Code de contrôle bio · Tunisie","cert1_p":"Le code bio rend l'origine certifiée visible et soutient un étiquetage propre pour les documents produits professionnels.","cert2_p":"Un ancrage de confiance fort pour la qualité bio, la traçabilité et une communication sérieuse avec les revendeurs et les clients.","cert3_p":"Un signal pertinent pour les marchés internationaux et les groupes d'acheteurs qui exigent une qualité bio selon des normes reconnues.","heritage_ey":"Héritage ancestral de l'olivier","heritage_h3":"L'arbre à l'origine","heritage_p":"Un olivier millénaire, un sol rocheux et une origine qui charge Laperla de profondeur, de temps et d'authenticité.","reviews_kicker":"Avis Clients · Customer Reviews · Kundenrezensionen","reviews_h3":"Voix du monde entier","reviews_sub":"Ce que disent sommeliers, chefs, épiciers fins et amateurs de 20+ pays à propos de Laperla.","reviews_avg_label":"Note moyenne","reviews_count_label":"Avis vérifiés","reviews_countries_label":"Pays","footer_legacy_h":"Rejoignez l'héritage","footer_legacy_p":"Là où l'histoire et la santé s'unissent dans chaque goutte — de l'ancienne oliveraie à votre table."},"it":{"nav_home":"Mondo del marchio","nav_shop":"Shop · Collezione","nav_awards":"Riconoscimenti","nav_gallery":"Galleria","nav_wholesale":"Ingrosso · Shop B2B","nav_config":"Configura container","nav_commission":"Modello di commissione","nav_dist":"Partner di distribuzione","nav_account":"Accedi / Registrati","nav_dashboard":"La mia dashboard","nav_logout":"Esci","grp_discover":"Scopri","grp_business":"Aziende","grp_account":"Account","grp_service":"Servizio","acct":"⬦ Account","acct_in":"⬦ Il mio account","hero_desc":"Storia e salute in ogni goccia. Spremuto a freddo da antichi olivi Chemlali negli uliveti della Tunisia, da generazioni. Premiato in tre continenti.","hero_cta1":"Scopri la collezione","hero_cta2":"Per le aziende","offers_ey":"Olio d'Oliva Premium","offers_h":"Édition Prestige — Set selezionati","purity_lead_pre":"Acidità inferiore allo","cta_shop":"Allo shop","cta_ws":"Ingrosso","add_cart":"Aggiungi al carrello","incl_vat":"IVA inclusa","unavail":"Momentaneamente non disponibile","not_orderable":"Non ordinabile","cat_glass":"Bottiglia di vetro","cat_tin":"Latta metallica","cat_gift":"Edizione regalo","menu_brand":"Marchio","menu_quality":"Qualità & Premi","lnk_story":"Storia","lnk_about":"Chi siamo","lnk_mission":"Missione","lnk_origin":"Origine · Tunisia","lnk_discover":"Scoprire la Tunisia","lnk_collection":"Collezione","lnk_offers":"Olio d'Oliva Premium","lnk_certified":"Purezza certificata","lnk_certs":"Certificati & Premi","lnk_intl":"Riconoscimenti internazionali","lnk_ws":"Grossisti","lnk_dist":"Partner di distribuzione","lnk_pallet":"Configura pallet","lnk_b2bshop":"Shop B2B","w_products":"Prodotti","acct_sub":"Accesso con codice · Login · Registrazione","logout_sub":"Terminare la sessione","hs_ey":"Zembra la Romaine · Tunisia","hs_title_a":"Dove tutto è cominciato — ","hs_title_b":"e nulla è stato dimenticato","hs_lead":"Tra terreno roccioso e aria di mare crescono ulivi più antichi di qualsiasi marchio. Dai loro frutti nasce Laperla Vestige — un olio che non dichiara la propria origine: la dimostra.","hs_text":"Ogni raccolto segue il ritmo della natura: raccolto a mano, estratto a freddo in poche ore e conservato non filtrato nella sua forma più pura. Nessun compromesso, nessuna scorciatoia — solo olio onesto e pulito, con tracciabilità completa fino all'albero.","hs_f1":"Monovarietale e non filtrato, un'unica origine","hs_f2":"Dalla raccolta all'estrazione a freddo","hs_f3":"Certificato e premiato con oro internazionale","hs_bio":"Biologico","menu_brand_sub":"Storia · Chi siamo · Missione · Origine · Tunisia","menu_collection_sub":"Prodotti · Berlin Edition · Offerte","menu_quality_sub":"Ultra Purity · Certificati & Premi","menu_b2b_sub":"Grossisti · Partner di distribuzione · Container","w_all":"Tutti","shop_h":"La Collezione","shop_sub":"","w_details":"Vedi dettagli","lnk_editions":"Edizioni","lnk_berlin":"Berlin Edition","gate_award_count":"10+ premi internazionali","gate_retail_title":"Cliente privato","gate_retail_desc":"Bottiglie selezionate dell'Édition Prestige, direttamente alla vostra tavola.","gate_wholesale_title":"Ingrosso","gate_wholesale_desc":"Shop B2B, configuratore container, modello provvigionale & accesso rivenditore.","about_h":"Chi siamo","about_p1":"Laperla Olive Oil rappresenta olio d'oliva di alta qualità con origine, carattere e riconoscimento internazionale. Il nostro marchio unisce la forza degli uliveti tunisini a una presentazione premium moderna per clienti privati, gastronomia di lusso, ristorazione e commercio all'ingrosso.","about_p2":"Ogni bottiglia racconta di ulivi antichi, raccolta tradizionale, lavorazione attenta e l'ambizione di presentare l'olio d'oliva non solo come prodotto, ma come prezioso pezzo di cultura. Laperla rappresenta purezza, gusto e fiducia — visibili attraverso premi internazionali, medaglie d'oro e qualità certificata.","about_p3":"Il nostro obiettivo è portare l'olio d'oliva premium tunisino a un nuovo livello: raffinato, onesto, tracciabile e pronto per clienti che vogliono non solo assaporare la qualità, ma anche capirla.","about_final":"Laperla Olive Oil è più di un olio d'oliva. È origine, artigianalità ed eleganza in ogni bottiglia.","mission_h2":"Missione","mission_p1":"La nostra missione è presentare l'olio d'oliva premium tunisino con dignità, qualità e ambizione internazionale. Laperla Olive Oil vuole dimostrare che il vero olio d'oliva è più di un alimento — è origine, cultura, artigianalità e fiducia.","mission_p2":"Vogliamo offrire ai clienti un olio d'oliva che convinca per purezza, gusto e trasparenza. Dagli antichi uliveti alla presentazione raffinata, passando per la lavorazione attenta, ogni bottiglia rappresenta rispetto verso la natura, la tradizione e le persone dietro questo prodotto.","mission_p3":"Il nostro compito è posizionare con forza l'olio d'oliva tunisino sul mercato internazionale — per privati, gastronomia fine, ristorazione, hotel, ingrosso e partner di distribuzione. Laperla unisce la storia mediterranea alla gestione moderna di un brand premium.","mission_final":"La nostra missione è chiara: rendere visibile la qualità, costruire fiducia e portare l'olio d'oliva tunisino come nobile patrimonio culturale nel mondo.","story_h2":"Storia","story_p1":"La storia di Laperla Olive Oil inizia dove gli ulivi sono profondamente radicati nella terra da generazioni. Negli uliveti tunisini crescono alberi che hanno resistito al calore, al vento, al terreno sassoso e alla prova del tempo. Da questo paesaggio nasce un olio d'oliva con carattere, forza ed eleganza naturale.","story_p2":"Laperla è stato creato per rendere visibile questo patrimonio. Non come un prodotto ordinario sullo scaffale, ma come un olio d'oliva premium con anima, origine e fascino. Ogni bottiglia vuole dimostrare che la vera qualità non ha bisogno di essere rumorosa — nasce dalla pazienza, dalla cura, dalla purezza e dal rispetto per la natura.","story_p3":"Il marchio combina la cultura tradizionale dell'olio d'oliva con una presentazione moderna. Antichi uliveti, raccolta attenta, lavorazione controllata e premi internazionali formano una storia che i clienti possono vedere, capire e assaporare.","story_final":"Laperla Olive Oil racconta la storia della Tunisia in una forma raffinata: dall'albero alla bottiglia, dalla tradizione al marchio mondiale.","award_eyebrow":"Premiato su tre continenti","award_band_label":"Premi internazionali","award_band_sub":"Medaglie d'oro e certificati ufficiali da Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari e Atene — visibilmente documentati da giurie internazionali su tre continenti.","award_band_btn":"Vedi tutti i certificati","trust_awards":"Premi internazionali","trust_acid_l":"Acidità","trust_poly_l":"mg/kg Polifenoli","trust_harvest_l":"Raccolta alla pressa","offers_subtitle":"Set selezionati","offers_intro_strong":"Un'espressione di eccellenza.","offers_intro_p":"Per persone con i più alti standard — caratterizzate da eleganza senza tempo, qualità eccezionale e un carattere inconfondibile.","purity_cap":"Acidità","purity_lead":"Acidità inferiore allo 0,3% — nettamente migliore della soglia dello 0,8% per l'Extra Vergine. Estratto a freddo entro 4 ore dalla raccolta. Ogni goccia è medicina liquida, ricca di oltre 600 mg/kg di polifenoli che proteggono cuore e sistema immunitario.","purity_acid_l":"Acidità","purity_poly_l":"mg/kg Polifenoli","purity_harvest_l":"Raccolta alla pressa","purity_tagline":"Proteggi il tuo cuore. Combatti l'infiammazione — con polifenoli naturali.","cert_eyebrow":"Purezza certificata","cert_h2":"Qualità biologica, ufficialmente documentata","cert1_micro":"Codice di controllo bio · Tunisia","cert1_p":"Il codice bio rende visibile l'origine certificata e supporta un'etichettatura pulita per la documentazione professionale del prodotto.","cert2_p":"Un forte ancoraggio di fiducia per la qualità bio, la tracciabilità e la comunicazione seria con rivenditori e clienti.","cert3_p":"Un segnale rilevante per i mercati internazionali e i gruppi di acquirenti che richiedono qualità bio secondo standard riconosciuti.","heritage_ey":"Antico patrimonio olivicolo","heritage_h3":"L'albero all'origine","heritage_p":"Un ulivo millenario, terreno roccioso e un'origine che carica Laperla di profondità, tempo e autenticità.","reviews_kicker":"Recensioni Clienti · Customer Reviews · Avis Clients","reviews_h3":"Voci da tutto il mondo","reviews_sub":"Cosa dicono sommelier, chef, rivenditori di specialità gastronomiche e intenditori di 20+ paesi su Laperla.","reviews_avg_label":"Valutazione media","reviews_count_label":"Recensioni verificate","reviews_countries_label":"Paesi","footer_legacy_h":"Unisciti all'eredità","footer_legacy_p":"Dove storia e salute si uniscono in ogni goccia — dall'antico uliveto alla vostra tavola."},"es":{"nav_home":"Mundo de marca","nav_shop":"Tienda · Colección","nav_awards":"Premios","nav_gallery":"Galería","nav_wholesale":"Mayorista · Tienda B2B","nav_config":"Configurar contenedor","nav_commission":"Modelo de comisión","nav_dist":"Socios de distribución","nav_account":"Iniciar sesión / Registrarse","nav_dashboard":"Mi panel de distribuidor","nav_logout":"Cerrar sesión","grp_discover":"Descubrir","grp_business":"Empresas","grp_account":"Cuenta","grp_service":"Servicio","acct":"⬦ Cuenta","acct_in":"⬦ Mi cuenta","hero_desc":"Historia y salud en cada gota. Prensado en frío de antiguos olivos Chemlali en los olivares de Túnez, durante generaciones. Premiado en tres continentes.","hero_cta1":"Descubrir la colección","hero_cta2":"Para empresas","offers_ey":"Aceite de Oliva Premium","offers_h":"Édition Prestige — Sets seleccionados","purity_lead_pre":"Acidez inferior al","cta_shop":"A la tienda","cta_ws":"Mayorista","add_cart":"Añadir al carrito","incl_vat":"IVA incluido","unavail":"No disponible por el momento","not_orderable":"No disponible para pedido","cat_glass":"Botella de vidrio","cat_tin":"Lata metálica","cat_gift":"Edición regalo","menu_brand":"Marca","menu_quality":"Calidad y premios","lnk_story":"Historia","lnk_about":"Sobre nosotros","lnk_mission":"Misión","lnk_origin":"Origen · Túnez","lnk_discover":"Descubrir Túnez","lnk_collection":"Colección","lnk_offers":"Aceite de Oliva Premium","lnk_certified":"Pureza certificada","lnk_certs":"Certificados y premios","lnk_intl":"Premios internacionales","lnk_ws":"Mayoristas","lnk_dist":"Socios de distribución","lnk_pallet":"Configurar palets","lnk_b2bshop":"Tienda B2B","w_products":"Productos","acct_sub":"Acceso con código · Inicio de sesión · Registro","logout_sub":"Cerrar la sesión","hs_ey":"Zembra la Romaine · Túnez","hs_title_a":"Donde todo comenzó — ","hs_title_b":"y nada se olvidó","hs_lead":"Entre suelo rocoso y aire marino crecen olivos más antiguos que cualquier marca. De sus frutos nace Laperla Vestige: un aceite que no afirma su origen, lo demuestra.","hs_text":"Cada cosecha sigue el ritmo de la naturaleza: recogida a mano, extraída en frío en pocas horas y conservada sin filtrar en su forma más pura. Sin compromisos ni atajos: solo aceite honesto y limpio, con trazabilidad completa hasta el árbol.","hs_f1":"Monovarietal y sin filtrar, de un solo origen","hs_f2":"De la cosecha a la extracción en frío","hs_f3":"Certificado y premiado con oro internacional","hs_bio":"Ecológico","menu_brand_sub":"Historia · Sobre nosotros · Misión · Origen · Túnez","menu_collection_sub":"Productos · Berlin Edition · Ofertas","menu_quality_sub":"Ultra Purity · Certificados y premios","menu_b2b_sub":"Mayoristas · Socios de distribución · Container","w_all":"Todos","shop_h":"La Colección","shop_sub":"","w_details":"Ver detalles","lnk_editions":"Ediciones","lnk_berlin":"Berlin Edition","gate_award_count":"10+ premios internacionales","gate_retail_title":"Cliente particular","gate_retail_desc":"Botellas seleccionadas de la Édition Prestige, directamente a su mesa.","gate_wholesale_title":"Mayorista","gate_wholesale_desc":"Tienda B2B, configurador de contenedor, modelo de comisión y acceso para distribuidores.","about_h":"Sobre nosotros","about_p1":"Laperla Olive Oil representa un aceite de oliva de alta calidad con origen, carácter y reconocimiento internacional. Nuestra marca une la fuerza de los olivares tunecinos con una presentación premium moderna para clientes particulares, tiendas gourmet, gastronomía y comercio mayorista.","about_p2":"Cada botella cuenta la historia de olivos centenarios, cosecha tradicional, elaboración cuidadosa y la ambición de presentar el aceite de oliva no solo como un producto, sino como un valioso trozo de cultura. Laperla representa pureza, sabor y confianza — visible a través de premios internacionales, medallas de oro y calidad certificada.","about_p3":"Nuestro objetivo es elevar el aceite de oliva premium tunecino a un nuevo nivel: refinado, honesto, trazable y listo para clientes que no solo quieren saborear la calidad, sino también comprenderla.","about_final":"Laperla Olive Oil es más que aceite de oliva. Es origen, artesanía y elegancia en cada botella.","mission_h2":"Misión","mission_p1":"Nuestra misión es presentar el aceite de oliva premium tunecino con dignidad, calidad y ambición internacional. Laperla Olive Oil quiere demostrar que el auténtico aceite de oliva es más que un alimento — es origen, cultura, artesanía y confianza.","mission_p2":"Queremos ofrecer a los clientes un aceite de oliva que convenza por su pureza, sabor y transparencia. Desde los antiguos olivares hasta la presentación refinada, pasando por la elaboración cuidadosa, cada botella representa respeto hacia la naturaleza, la tradición y las personas detrás de este producto.","mission_p3":"Nuestra tarea es posicionar con fuerza el aceite de oliva tunecino en el mercado internacional — para particulares, tiendas gourmet, gastronomía, hoteles, mayoristas y socios de distribución. Laperla une la historia mediterránea con la gestión moderna de marca premium.","mission_final":"Nuestra misión es clara: hacer visible la calidad, generar confianza y llevar el aceite de oliva tunecino como un noble patrimonio cultural al mundo.","story_h2":"Historia","story_p1":"La historia de Laperla Olive Oil comienza donde los olivos llevan enraizados en la tierra durante generaciones. En los olivares tunecinos crecen árboles que han resistido el calor, el viento, el suelo pedregoso y la prueba del tiempo. De este paisaje surge un aceite de oliva con carácter, fuerza y elegancia natural.","story_p2":"Laperla fue creado para hacer visible esta herencia. No como un producto ordinario en una estantería, sino como un aceite de oliva premium con alma, origen y atractivo. Cada botella quiere demostrar que la verdadera calidad no necesita ser ruidosa — nace de la paciencia, el cuidado, la pureza y el respeto por la naturaleza.","story_p3":"La marca combina la cultura tradicional del aceite de oliva con una presentación moderna. Antiguos olivares, cosecha cuidadosa, elaboración controlada y premios internacionales forman una historia que los clientes pueden ver, entender y saborear.","story_final":"Laperla Olive Oil cuenta la historia de Túnez de una forma refinada: del árbol a la botella, de la tradición a la marca mundial.","award_eyebrow":"Premiado en tres continentes","award_band_label":"Premios internacionales","award_band_sub":"Medallas de oro y certificados oficiales de Swiss Gold 2026, Miami, Abu Dabi, Al Ain, Bari y Atenas — documentados visiblemente por jurados internacionales en tres continentes.","award_band_btn":"Ver todos los certificados","trust_awards":"Premios internacionales","trust_acid_l":"Acidez","trust_poly_l":"mg/kg Polifenoles","trust_harvest_l":"Cosecha a prensa","offers_subtitle":"Sets seleccionados","offers_intro_strong":"Una expresión de excelencia.","offers_intro_p":"Para personas con los más altos estándares — marcadas por una elegancia atemporal, una calidad excepcional y un carácter inconfundible.","purity_cap":"Acidez","purity_lead":"Acidez inferior al 0,3% — significativamente mejor que el límite del 0,8% para el Extra Virgen. Prensado en frío dentro de las 4 horas posteriores a la cosecha. Cada gota es medicina líquida, rica en más de 600 mg/kg de polifenoles que protegen el corazón y el sistema inmunológico.","purity_acid_l":"Acidez","purity_poly_l":"mg/kg Polifenoles","purity_harvest_l":"Cosecha a prensa","purity_tagline":"Proteja su corazón. Combata la inflamación — con polifenoles naturales.","cert_eyebrow":"Pureza certificada","cert_h2":"Calidad ecológica, oficialmente documentada","cert1_micro":"Código de control ecológico · Túnez","cert1_p":"El código ecológico hace visible el origen certificado y apoya un etiquetado limpio para la documentación profesional del producto.","cert2_p":"Un sólido ancla de confianza para la calidad ecológica, la trazabilidad y la comunicación seria con distribuidores y clientes.","cert3_p":"Una señal relevante para los mercados internacionales y los grupos de compradores que exigen calidad ecológica según normas reconocidas.","heritage_ey":"Antiguo patrimonio olivícola","heritage_h3":"El árbol en el origen","heritage_p":"Un olivo milenario, suelo rocoso y un origen que carga a Laperla de profundidad, tiempo y autenticidad.","reviews_kicker":"Reseñas de Clientes · Customer Reviews · Avis Clients","reviews_h3":"Voces de todo el mundo","reviews_sub":"Lo que dicen sumilleres, chefs, distribuidores gourmet y conocedores de más de 20 países sobre Laperla.","reviews_avg_label":"Valoración media","reviews_count_label":"Reseñas verificadas","reviews_countries_label":"Países","footer_legacy_h":"Únase al legado","footer_legacy_p":"Donde la historia y la salud se unen en cada gota — desde el antiguo olivar hasta su mesa."},"pt":{"nav_home":"Universo da marca","nav_shop":"Loja · Coleção","nav_awards":"Prémios","nav_gallery":"Galeria","nav_wholesale":"Grossista · Loja B2B","nav_config":"Configurar contentor","nav_commission":"Modelo de comissão","nav_dist":"Parceiros de distribuição","nav_account":"Iniciar sessão / Registar","nav_dashboard":"O meu painel de revendedor","nav_logout":"Terminar sessão","grp_discover":"Descobrir","grp_business":"Empresas","grp_account":"Conta","grp_service":"Serviço","acct":"⬦ Conta","acct_in":"⬦ A minha conta","hero_desc":"História e saúde em cada gota. Prensado a frio de oliveiras Chemlali centenárias dos olivais da Tunísia, há gerações. Premiado em três continentes.","hero_cta1":"Descobrir a coleção","hero_cta2":"Para empresas","offers_ey":"Azeite Premium","offers_h":"Édition Prestige — Conjuntos selecionados","purity_lead_pre":"Acidez inferior a","cta_shop":"Para a loja","cta_ws":"Grossista","add_cart":"Adicionar ao carrinho","incl_vat":"IVA incluído","unavail":"Indisponível de momento","not_orderable":"Não disponível para encomenda","cat_glass":"Garrafa de vidro","cat_tin":"Lata metálica","cat_gift":"Edição de oferta","menu_brand":"Marca","menu_quality":"Qualidade e prémios","lnk_story":"História","lnk_about":"Sobre nós","lnk_mission":"Missão","lnk_origin":"Origem · Tunísia","lnk_discover":"Descobrir a Tunísia","lnk_collection":"Coleção","lnk_offers":"Azeite Premium","lnk_certified":"Pureza certificada","lnk_certs":"Certificados e prémios","lnk_intl":"Prémios internacionais","lnk_ws":"Grossistas","lnk_dist":"Parceiros de distribuição","lnk_pallet":"Configurar paletes","lnk_b2bshop":"Loja B2B","w_products":"Produtos","acct_sub":"Acesso por código · Login · Registo","logout_sub":"Terminar sessão","hs_ey":"Zembra la Romaine · Tunísia","hs_title_a":"Onde tudo começou — ","hs_title_b":"e nada foi esquecido","hs_lead":"Entre solo rochoso e brisa marítima crescem oliveiras mais antigas do que qualquer marca. Dos seus frutos nasce o Laperla Vestige — um azeite que não afirma a origem: prova-a.","hs_text":"Cada colheita segue o ritmo da natureza: apanhado à mão, extraído a frio em poucas horas e conservado sem filtrar na sua forma mais pura. Sem compromissos nem atalhos — apenas azeite honesto e limpo, com rastreabilidade total até à árvore.","hs_f1":"Monovarietal e não filtrado, de uma só origem","hs_f2":"Da colheita à extração a frio","hs_f3":"Certificado e premiado com ouro internacional","hs_bio":"Biológico","menu_brand_sub":"História · Sobre nós · Missão · Origem · Tunísia","menu_collection_sub":"Produtos · Berlin Edition · Ofertas","menu_quality_sub":"Ultra Purity · Certificados e prémios","menu_b2b_sub":"Grossistas · Parceiros de distribuição · Container","w_all":"Todos","shop_h":"A Coleção","shop_sub":"","w_details":"Ver detalhes","lnk_editions":"Edições","lnk_berlin":"Berlin Edition","gate_award_count":"10+ prémios internacionais","gate_retail_title":"Cliente particular","gate_retail_desc":"Garrafas selecionadas da Édition Prestige, diretamente à sua mesa.","gate_wholesale_title":"Grossista","gate_wholesale_desc":"Loja B2B, configurador de contentores, modelo de comissão e acesso para revendedores.","about_h":"Sobre nós","about_p1":"A Laperla Olive Oil representa azeite de alta qualidade com origem, carácter e reconhecimento internacional. A nossa marca une a força dos olivais tunisinos a uma apresentação premium moderna para clientes particulares, lojas gourmet, gastronomia e comércio grossista.","about_p2":"Cada garrafa conta a história de oliveiras centenárias, colheita tradicional, processamento cuidadoso e a ambição de apresentar o azeite não apenas como um produto, mas como um valioso pedaço de cultura. A Laperla representa pureza, sabor e confiança — visível através de prémios internacionais, medalhas de ouro e qualidade certificada.","about_p3":"O nosso objetivo é elevar o azeite premium tunisino a um novo nível: refinado, honesto, rastreável e pronto para clientes que querem não só saborear a qualidade, mas também compreendê-la.","about_final":"A Laperla Olive Oil é mais do que azeite. É origem, artesanato e elegância em cada garrafa.","mission_h2":"Missão","mission_p1":"A nossa missão é apresentar o azeite premium tunisino com dignidade, qualidade e ambição internacional. A Laperla Olive Oil pretende mostrar que o azeite autêntico é mais do que um alimento — é origem, cultura, artesanato e confiança.","mission_p2":"Queremos oferecer aos clientes um azeite que convença pela pureza, sabor e transparência. Dos antigos olivais até à apresentação refinada, passando pelo processamento cuidadoso, cada garrafa representa respeito pela natureza, pela tradição e pelas pessoas por trás deste produto.","mission_p3":"A nossa tarefa é posicionar fortemente o azeite tunisino no mercado internacional — para particulares, lojas gourmet, gastronomia, hotéis, grossistas e parceiros de distribuição. A Laperla une a história mediterrânica à gestão moderna de marca premium.","mission_final":"A nossa missão é clara: tornar a qualidade visível, criar confiança e levar o azeite tunisino como um nobre patrimônio cultural para o mundo.","story_h2":"História","story_p1":"A história da Laperla Olive Oil começa onde as oliveiras estão profundamente enraizadas na terra há gerações. Nos olivais tunisinos crescem árvores que resistiram ao calor, ao vento, ao solo pedregoso e à prova do tempo. Desta paisagem emerge um azeite com carácter, força e elegância natural.","story_p2":"A Laperla foi criada para tornar visível esta herança. Não como um produto comum numa prateleira, mas como um azeite premium com alma, origem e irradiação. Cada garrafa pretende mostrar que a verdadeira qualidade não precisa de ser ruidosa — nasce da paciência, do cuidado, da pureza e do respeito pela natureza.","story_p3":"A marca combina a cultura tradicional do azeite com uma apresentação moderna. Olivais antigos, colheita cuidadosa, processamento controlado e prémios internacionais formam uma história que os clientes podem ver, compreender e saborear.","story_final":"A Laperla Olive Oil conta a história da Tunísia de uma forma refinada: da árvore à garrafa, da tradição à marca mundial.","award_eyebrow":"Premiada em três continentes","award_band_label":"Prémios internacionais","award_band_sub":"Medalhas de ouro e certificados oficiais do Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari e Atenas — visivelmente documentados por júris internacionais em três continentes.","award_band_btn":"Ver todos os certificados","trust_awards":"Prémios internacionais","trust_acid_l":"Acidez","trust_poly_l":"mg/kg Polifenóis","trust_harvest_l":"Colheita até prensa","offers_subtitle":"Conjuntos selecionados","offers_intro_strong":"Uma expressão de excelência.","offers_intro_p":"Para pessoas com os mais altos padrões — marcadas por uma elegância atemporal, qualidade excepcional e um carácter inconfundível.","purity_cap":"Acidez","purity_lead":"Acidez inferior a 0,3% — significativamente melhor do que o limite de 0,8% para o Extra Virgem. Prensado a frio nas 4 horas seguintes à colheita. Cada gota é medicina líquida, rica em mais de 600 mg/kg de polifenóis que protegem o coração e o sistema imunitário.","purity_acid_l":"Acidez","purity_poly_l":"mg/kg Polifenóis","purity_harvest_l":"Colheita até prensa","purity_tagline":"Proteja o seu coração. Combata a inflamação — com polifenóis naturais.","cert_eyebrow":"Pureza certificada","cert_h2":"Qualidade biológica, oficialmente documentada","cert1_micro":"Código de controlo biológico · Tunísia","cert1_p":"O código biológico torna a origem certificada visível e apoia uma rotulagem limpa para documentação profissional do produto.","cert2_p":"Uma âncora de confiança sólida para a qualidade biológica, rastreabilidade e comunicação séria com distribuidores e clientes.","cert3_p":"Um sinal relevante para os mercados internacionais e grupos de compradores que exigem qualidade biológica segundo normas reconhecidas.","heritage_ey":"Antigo patrimônio olivícola","heritage_h3":"A árvore na origem","heritage_p":"Uma oliveira milenar, solo rochoso e uma origem que carrega a Laperla com profundidade, tempo e autenticidade.","reviews_kicker":"Avaliações de Clientes · Customer Reviews · Avis Clients","reviews_h3":"Vozes de todo o mundo","reviews_sub":"O que sommeliers, chefs, retalhistas de produtos gourmet e apreciadores de mais de 20 países dizem sobre a Laperla.","reviews_avg_label":"Avaliação média","reviews_count_label":"Avaliações verificadas","reviews_countries_label":"Países","footer_legacy_h":"Junte-se ao legado","footer_legacy_p":"Onde a história e a saúde se unem em cada gota — do antigo olival à sua mesa."},"nl":{"nav_home":"Merkwereld","nav_shop":"Shop · Collectie","nav_awards":"Onderscheidingen","nav_gallery":"Galerij","nav_wholesale":"Groothandel · B2B-shop","nav_config":"Container configureren","nav_commission":"Commissiemodel","nav_dist":"Distributiepartners","nav_account":"Inloggen / Registreren","nav_dashboard":"Mijn dealerdashboard","nav_logout":"Uitloggen","grp_discover":"Ontdekken","grp_business":"Zakelijke klanten","grp_account":"Account","grp_service":"Service","acct":"⬦ Account","acct_in":"⬦ Mijn account","hero_desc":"Geschiedenis en gezondheid in elke druppel. Koudgeperst uit eeuwenoude Chemlali-bomen in de olijfgaarden van Tunesië, al generaties lang. Bekroond op drie continenten.","hero_cta1":"Ontdek de collectie","hero_cta2":"Voor bedrijven","offers_ey":"Premium Olijfolie","offers_h":"Édition Prestige — Samengestelde sets","purity_lead_pre":"Zuurgraad onder","cta_shop":"Naar de shop","cta_ws":"Groothandel","add_cart":"In winkelwagen","incl_vat":"incl. btw","unavail":"Tijdelijk niet beschikbaar","not_orderable":"Niet bestelbaar","cat_glass":"Glazen fles","cat_tin":"Metalen blik","cat_gift":"Geschenkeditie","menu_brand":"Merk","menu_quality":"Kwaliteit & Onderscheidingen","lnk_story":"Verhaal","lnk_about":"Over ons","lnk_mission":"Missie","lnk_origin":"Herkomst · Tunesië","lnk_discover":"Tunesië ontdekken","lnk_collection":"Collectie","lnk_offers":"Premium Olijfolie","lnk_certified":"Gecertificeerde zuiverheid","lnk_certs":"Certificaten & Awards","lnk_intl":"Internationale onderscheidingen","lnk_ws":"Groothandelaren","lnk_dist":"Distributiepartners","lnk_pallet":"Pallets configureren","lnk_b2bshop":"B2B-shop","w_products":"Producten","acct_sub":"Codetoegang · Inloggen · Registratie","logout_sub":"Sessie beëindigen","hs_ey":"Zembra la Romaine · Tunesië","hs_title_a":"Waar alles begon — ","hs_title_b":"en niets werd vergeten","hs_lead":"Tussen rotsachtige grond en zeelucht groeien olijfbomen die ouder zijn dan welk merk dan ook. Uit hun vruchten ontstaat Laperla Vestige — een olie die haar herkomst niet claimt, maar bewijst.","hs_text":"Elke oogst volgt het ritme van de natuur: met de hand geplukt, binnen enkele uren koud geëxtraheerd en ongefilterd bewaard in zijn zuiverste vorm. Geen compromissen, geen sluiproutes — alleen eerlijke, zuivere olie met volledige traceerbaarheid tot aan de boom.","hs_f1":"Eén ras & ongefilterd uit één herkomst","hs_f2":"Van oogst tot koude extractie","hs_f3":"Gecertificeerd & internationaal met goud bekroond","hs_bio":"Biologisch","menu_brand_sub":"Verhaal · Over ons · Missie · Herkomst · Tunesië","menu_collection_sub":"Producten · Berlin Edition · Aanbiedingen","menu_quality_sub":"Ultra Purity · Certificaten & Awards","menu_b2b_sub":"Groothandelaren · Distributiepartners · Container","w_all":"Alle","shop_h":"De Collectie","shop_sub":"","w_details":"Details bekijken","lnk_editions":"Edities","lnk_berlin":"Berlin Edition","gate_award_count":"10+ internationale onderscheidingen","gate_retail_title":"Particuliere klant","gate_retail_desc":"Samengestelde flessen van de Édition Prestige, rechtstreeks aan uw tafel.","gate_wholesale_title":"Groothandel","gate_wholesale_desc":"B2B-winkel, containerconfigurator, provisiemodel & toegang voor dealers.","about_h":"Over ons","about_p1":"Laperla Olive Oil staat voor hoogwaardige olijfolie met herkomst, karakter en internationale erkenning. Ons merk verbindt de kracht van Tunesische olijfgaarden met een moderne premium-presentatie voor particulieren, delicatessenwinkels, gastronomie en groothandel.","about_p2":"Elke fles vertelt het verhaal van oude olijfbomen, traditionele oogst, zorgvuldige verwerking en de ambitie om olijfolie niet alleen als product te presenteren, maar als een waardevol stuk cultuur. Laperla staat voor zuiverheid, smaak en vertrouwen — zichtbaar door internationale onderscheidingen, gouden medailles en gecertificeerde kwaliteit.","about_p3":"Ons doel is om Tunesische premium-olijfolie naar een nieuw niveau te tillen: verfijnd, eerlijk, traceerbaar en klaar voor klanten die kwaliteit niet alleen willen proeven, maar ook willen begrijpen.","about_final":"Laperla Olive Oil is meer dan olijfolie. Het is herkomst, vakmanschap en elegantie in elke fles.","mission_h2":"Missie","mission_p1":"Onze missie is het presenteren van Tunesische premium-olijfolie met waardigheid, kwaliteit en internationale ambitie. Laperla Olive Oil wil aantonen dat echte olijfolie meer is dan een voedingsmiddel — het is herkomst, cultuur, vakmanschap en vertrouwen.","mission_p2":"We willen klanten een olijfolie bieden die overtuigt door zuiverheid, smaak en transparantie. Van oude olijfgaarden via zorgvuldige verwerking tot aan de verfijnde presentatie, staat elke fles voor respect voor de natuur, de traditie en de mensen achter dit product.","mission_p3":"Onze taak is het sterk positioneren van Tunesische olijfolie op de internationale markt — voor particulieren, delicatessenwinkels, gastronomie, hotels, groothandel en distributiepartners. Laperla verbindt mediterrane geschiedenis met modern premium-merkmanagement.","mission_final":"Onze missie is duidelijk: kwaliteit zichtbaar maken, vertrouwen opbouwen en Tunesische olijfolie als nobel cultureel erfgoed de wereld in brengen.","story_h2":"Verhaal","story_p1":"Het verhaal van Laperla Olive Oil begint waar olijfbomen al generaties lang diep in de aarde geworteld zijn. In de Tunesische gaarden groeien bomen die hitte, wind, stenige bodem en de tand des tijds hebben weerstaan. Uit dit landschap ontstaat een olijfolie met karakter, kracht en natuurlijke elegantie.","story_p2":"Laperla werd gecreëerd om dit erfgoed zichtbaar te maken. Niet als een gewoon product op een rek, maar als een premium-olijfolie met ziel, herkomst en uitstraling. Elke fles is bedoeld om te laten zien dat ware kwaliteit niet luid hoeft te zijn — het ontstaat uit geduld, zorg, zuiverheid en respect voor de natuur.","story_p3":"Het merk combineert traditionele olijfoliecultuur met een moderne presentatie. Oude olijfgaarden, zorgvuldige oogst, gecontroleerde verwerking en internationale onderscheidingen vormen een verhaal dat klanten kunnen zien, begrijpen en proeven.","story_final":"Laperla Olive Oil vertelt het verhaal van Tunesië in een verfijnde vorm: van boom tot fles, van traditie tot wereldmerk.","award_eyebrow":"Bekroond op drie continenten","award_band_label":"Internationale onderscheidingen","award_band_sub":"Gouden medailles en officiële certificaten van Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari en Athene — zichtbaar gedocumenteerd door internationale jury's op drie continenten.","award_band_btn":"Alle certificaten bekijken","trust_awards":"Internationale awards","trust_acid_l":"Zuurgraad","trust_poly_l":"mg/kg Polyfenolen","trust_harvest_l":"Oogst tot pers","offers_subtitle":"Samengestelde sets","offers_intro_strong":"Een uitdrukking van excellentie.","offers_intro_p":"Voor mensen met de hoogste eisen — gekenmerkt door tijdloze elegantie, uitzonderlijke kwaliteit en een onmiskenbaar karakter.","purity_cap":"Zuurgraad","purity_lead":"Zuurgraad onder 0,3% — aanzienlijk beter dan de 0,8%-grens voor Extra Vergine. Koud geperst binnen 4 uur na de oogst. Elke druppel is vloeibare geneeskunde, rijk aan meer dan 600 mg/kg polyfenolen die hart en immuunsysteem beschermen.","purity_acid_l":"Zuurgraad","purity_poly_l":"mg/kg Polyfenolen","purity_harvest_l":"Oogst tot pers","purity_tagline":"Bescherm uw hart. Bestrijd ontstekingen — met natuurlijke polyfenolen.","cert_eyebrow":"Gecertificeerde zuiverheid","cert_h2":"Biologische kwaliteit, officieel gedocumenteerd","cert1_micro":"Biologische controlecode · Tunesië","cert1_p":"De biologische code maakt de gecertificeerde herkomst zichtbaar en ondersteunt een schone etikettering voor professionele productdocumentatie.","cert2_p":"Een sterk vertrouwensanker voor biologische kwaliteit, traceerbaarheid en serieuze communicatie met handelaars en klanten.","cert3_p":"Een relevant signaal voor internationale markten en kopersgroepen die biologische kwaliteit volgens erkende normen verwachten.","heritage_ey":"Oud olijvenerfgoed","heritage_h3":"De boom aan de oorsprong","heritage_p":"Een eeuwenoude olijfboom, rotsachtige bodem en een herkomst die Laperla laadt met diepte, tijd en authenticiteit.","reviews_kicker":"Klantbeoordelingen · Customer Reviews · Avis Clients","reviews_h3":"Stemmen van over de hele wereld","reviews_sub":"Wat sommeliers, chefs, delicatessenhandelaren en liefhebbers uit 20+ landen over Laperla zeggen.","reviews_avg_label":"Gemiddelde beoordeling","reviews_count_label":"Geverifieerde beoordelingen","reviews_countries_label":"Landen","footer_legacy_h":"Sluit u aan bij het erfgoed","footer_legacy_p":"Waar geschiedenis en gezondheid zich in elke druppel verenigen — van het oude olijfgaard tot aan uw tafel."},"sv":{"nav_home":"Varumärkesvärlden","nav_shop":"Butik · Kollektion","nav_awards":"Utmärkelser","nav_gallery":"Galleri","nav_wholesale":"Grossist · B2B-butik","nav_config":"Konfigurera container","nav_commission":"Provisionsmodell","nav_dist":"Distributionspartner","nav_account":"Logga in / Registrera","nav_dashboard":"Min återförsäljarpanel","nav_logout":"Logga ut","grp_discover":"Upptäck","grp_business":"Företagskunder","grp_account":"Konto","grp_service":"Service","acct":"⬦ Konto","acct_in":"⬦ Mitt konto","hero_desc":"Historia och hälsa i varje droppe. Kallpressad från uråldriga Chemlali-träd i Tunisiens olivlundar, i generationer. Prisbelönt på tre kontinenter.","hero_cta1":"Upptäck kollektionen","hero_cta2":"För företag","offers_ey":"Premium Olivolja","offers_h":"Édition Prestige — Utvalda set","purity_lead_pre":"Syrahalt under","cta_shop":"Till butiken","cta_ws":"Grossist","add_cart":"Lägg i varukorgen","incl_vat":"inkl. moms","unavail":"Tillfälligt slut","not_orderable":"Kan inte beställas","cat_glass":"Glasflaska","cat_tin":"Metallburk","cat_gift":"Presentutgåva","menu_brand":"Varumärke","menu_quality":"Kvalitet & Utmärkelser","lnk_story":"Berättelse","lnk_about":"Om oss","lnk_mission":"Mission","lnk_origin":"Ursprung · Tunisien","lnk_discover":"Upptäck Tunisien","lnk_collection":"Kollektion","lnk_offers":"Premium Olivolja","lnk_certified":"Certifierad renhet","lnk_certs":"Certifikat & Utmärkelser","lnk_intl":"Internationella utmärkelser","lnk_ws":"Grossister","lnk_dist":"Distributionspartner","lnk_pallet":"Konfigurera pallar","lnk_b2bshop":"B2B-butik","w_products":"Produkter","acct_sub":"Kodåtkomst · Inloggning · Registrering","logout_sub":"Avsluta session","hs_ey":"Zembra la Romaine · Tunisien","hs_title_a":"Där allt började — ","hs_title_b":"och inget glömdes bort","hs_lead":"Mellan stenig mark och havsluft växer olivträd som är äldre än något varumärke. Ur deras frukter föds Laperla Vestige — en olja som inte påstår sitt ursprung, utan bevisar det.","hs_text":"Varje skörd följer naturens rytm: handplockad, kallextraherad inom några timmar och bevarad ofiltrerad i sin renaste form. Inga kompromisser, inga genvägar — bara ärlig, ren olja med full spårbarhet ända till trädet.","hs_f1":"En sort & ofiltrerad från ett ursprung","hs_f2":"Från skörd till kallextraktion","hs_f3":"Certifierad & internationellt guldbelönad","hs_bio":"Ekologisk","menu_brand_sub":"Berättelse · Om oss · Mission · Ursprung · Tunisien","menu_collection_sub":"Produkter · Berlin Edition · Erbjudanden","menu_quality_sub":"Ultra Purity · Certifikat & Utmärkelser","menu_b2b_sub":"Grossister · Distributionspartner · Container","w_all":"Alla","shop_h":"Kollektionen","shop_sub":"","w_details":"Visa detaljer","lnk_editions":"Utgåvor","lnk_berlin":"Berlin Edition","gate_award_count":"10+ internationella utmärkelser","gate_retail_title":"Privatkund","gate_retail_desc":"Utvalda flaskor från Édition Prestige, direkt till ditt bord.","gate_wholesale_title":"Grossist","gate_wholesale_desc":"B2B-butik, containerkonfigurator, provisionsmodell & återförsäljaråtkomst.","about_h":"Om oss","about_p1":"Laperla Olive Oil representerar olivolja av hög kvalitet med ursprung, karaktär och internationellt erkännande. Vårt varumärke förenar kraften hos tunisiska olivlundar med en modern premiumpresentation för privatkunder, delikatessaffärer, gastronomi och grossisthandel.","about_p2":"Varje flaska berättar om gamla olivträd, traditionell skörd, omsorgsfull bearbetning och ambitionen att presentera olivolja inte bara som en produkt, utan som ett värdefullt stycke kultur. Laperla representerar renhet, smak och förtroende — synligt genom internationella utmärkelser, guldmedaljer och certifierad kvalitet.","about_p3":"Vårt mål är att lyfta tunisisk premiumolivolja till en ny nivå: förfinad, ärlig, spårbar och redo för kunder som inte bara vill smaka kvalitet, utan också förstå den.","about_final":"Laperla Olive Oil är mer än olivolja. Det är ursprung, hantverk och elegans i varje flaska.","mission_h2":"Mission","mission_p1":"Vårt uppdrag är att presentera tunisisk premiumolivolja med värdighet, kvalitet och internationell ambition. Laperla Olive Oil vill visa att äkta olivolja är mer än ett livsmedel — det är ursprung, kultur, hantverk och förtroende.","mission_p2":"Vi vill erbjuda kunderna en olivolja som övertalar genom renhet, smak och transparens. Från gamla olivlundar via omsorgsfull bearbetning till den förfinade presentationen representerar varje flaska respekt för naturen, traditionen och människorna bakom denna produkt.","mission_p3":"Vår uppgift är att starkt positionera tunisisk olivolja på den internationella marknaden — för privatkunder, delikatessaffärer, gastronomi, hotell, grossisthandel och distributionspartner. Laperla förenar medelhavshistorian med modern premiummärkesstyrning.","mission_final":"Vårt uppdrag är tydligt: göra kvalitet synlig, bygga förtroende och föra tunisisk olivolja som ett ädelt kulturarv ut i världen.","story_h2":"Berättelse","story_p1":"Historien om Laperla Olive Oil börjar där olivträd har sina rötter djupt i jorden sedan generationer. I de tunisiska olivlundarna växer träd som har klarat av värme, vind, stenig mark och tidens prövning. Från detta landskap uppstår en olivolja med karaktär, styrka och naturlig elegans.","story_p2":"Laperla skapades för att göra detta arv synligt. Inte som en vanlig produkt på en hylla, utan som en premiumolivolja med själ, ursprung och utstrålning. Varje flaska är tänkt att visa att sann kvalitet inte behöver vara bullrig — den uppstår ur tålamod, omsorg, renhet och respekt för naturen.","story_p3":"Varumärket kombinerar traditionell olivoljekultur med modern presentation. Gamla olivlundar, omsorgsfull skörd, kontrollerad bearbetning och internationella utmärkelser bildar en historia som kunderna kan se, förstå och smaka.","story_final":"Laperla Olive Oil berättar Tunisiens historia i en förfinad form: från trädet till flaskan, från tradition till världsvarumärke.","award_eyebrow":"Prisbelönat på tre kontinenter","award_band_label":"Internationella utmärkelser","award_band_sub":"Guldmedaljer och officiella certifikat från Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari och Aten — tydligt dokumenterade av internationella juryer på tre kontinenter.","award_band_btn":"Visa alla certifikat","trust_awards":"Internationella priser","trust_acid_l":"Syrahalt","trust_poly_l":"mg/kg Polyfenoler","trust_harvest_l":"Skörd till press","offers_subtitle":"Utvalda set","offers_intro_strong":"Ett uttryck för excellens.","offers_intro_p":"För människor med de högsta krav — präglade av tidlös elegans, exceptionell kvalitet och en omistlig karaktär.","purity_cap":"Syrahalt","purity_lead":"Syrahalt under 0,3% — avsevärt bättre än 0,8%-gränsen för Extra Vergine. Kallpressad inom 4 timmar efter skörd. Varje droppe är flytande medicin, rik på över 600 mg/kg polyfenoler som skyddar hjärta och immunsystem.","purity_acid_l":"Syrahalt","purity_poly_l":"mg/kg Polyfenoler","purity_harvest_l":"Skörd till press","purity_tagline":"Skydda ditt hjärta. Bekämpa inflammation — med naturliga polyfenoler.","cert_eyebrow":"Certifierad renhet","cert_h2":"Ekologisk kvalitet, officiellt dokumenterad","cert1_micro":"Ekologisk kontrollkod · Tunisien","cert1_p":"Den ekologiska koden gör det certifierade ursprunget synligt och stöder en ren märkning för professionella produktdokument.","cert2_p":"Ett starkt förtroendeankare för ekologisk kvalitet, spårbarhet och seriös kommunikation med återförsäljare och kunder.","cert3_p":"En relevant signal för internationella marknader och köpargrupper som förväntar sig ekologisk kvalitet enligt erkända standarder.","heritage_ey":"Gammalt olivarv","heritage_h3":"Trädet vid ursprunget","heritage_p":"Ett uråldrigt olivträd, stenig mark och ett ursprung som laddar Laperla med djup, tid och autenticitet.","reviews_kicker":"Kundrecensioner · Customer Reviews · Avis Clients","reviews_h3":"Röster från hela världen","reviews_sub":"Vad sommelierer, kockar, delikatesshandlare och konnässörer från 20+ länder säger om Laperla.","reviews_avg_label":"Genomsnittligt betyg","reviews_count_label":"Verifierade recensioner","reviews_countries_label":"Länder","footer_legacy_h":"Gå med i arvet","footer_legacy_p":"Där historia och hälsa förenas i varje droppe — från den uråldrига olivlunden till ditt bord."},"da":{"nav_home":"Brandunivers","nav_shop":"Butik · Kollektion","nav_awards":"Udmærkelser","nav_gallery":"Galleri","nav_wholesale":"Engros · B2B-butik","nav_config":"Konfigurer container","nav_commission":"Provisionsmodel","nav_dist":"Distributionspartnere","nav_account":"Log ind / Opret konto","nav_dashboard":"Mit forhandlerdashboard","nav_logout":"Log ud","grp_discover":"Opdag","grp_business":"Erhvervskunder","grp_account":"Konto","grp_service":"Service","acct":"⬦ Konto","acct_in":"⬦ Min konto","hero_desc":"Historie og sundhed i hver dråbe. Koldpresset fra ældgamle Chemlali-træer i Tunesiens olivenlunde, gennem generationer. Prisbelønnet på tre kontinenter.","hero_cta1":"Opdag kollektionen","hero_cta2":"For virksomheder","offers_ey":"Premium Olivenolie","offers_h":"Édition Prestige — Udvalgte sæt","purity_lead_pre":"Syreindhold under","cta_shop":"Til butikken","cta_ws":"Engros","add_cart":"Læg i kurven","incl_vat":"inkl. moms","unavail":"Midlertidigt udsolgt","not_orderable":"Kan ikke bestilles","cat_glass":"Glasflaske","cat_tin":"Metaldåse","cat_gift":"Gaveudgave","menu_brand":"Brand","menu_quality":"Kvalitet & Priser","lnk_story":"Historie","lnk_about":"Om os","lnk_mission":"Mission","lnk_origin":"Oprindelse · Tunesien","lnk_discover":"Oplev Tunesien","lnk_collection":"Kollektion","lnk_offers":"Premium Olivenolie","lnk_certified":"Certificeret renhed","lnk_certs":"Certifikater & Priser","lnk_intl":"Internationale udmærkelser","lnk_ws":"Grossister","lnk_dist":"Distributionspartnere","lnk_pallet":"Konfigurer paller","lnk_b2bshop":"B2B-butik","w_products":"Produkter","acct_sub":"Kodeadgang · Login · Registrering","logout_sub":"Afslut session","hs_ey":"Zembra la Romaine · Tunesien","hs_title_a":"Hvor det hele begyndte — ","hs_title_b":"og intet blev glemt","hs_lead":"Mellem klippegrund og havluft vokser oliventræer, der er ældre end noget brand. Af deres frugter opstår Laperla Vestige — en olie, der ikke hævder sin oprindelse, men beviser den.","hs_text":"Hver høst følger naturens rytme: håndplukket, koldekstraheret inden for få timer og bevaret ufiltreret i sin reneste form. Ingen kompromiser, ingen genveje — kun ærlig, ren olie med fuld sporbarhed helt tilbage til træet.","hs_f1":"Én sort & ufiltreret fra én oprindelse","hs_f2":"Fra høst til koldekstraktion","hs_f3":"Certificeret & internationalt guldpræmieret","hs_bio":"Økologisk","menu_brand_sub":"Historie · Om os · Mission · Oprindelse · Tunesien","menu_collection_sub":"Produkter · Berlin Edition · Tilbud","menu_quality_sub":"Ultra Purity · Certifikater & Priser","menu_b2b_sub":"Grossister · Distributionspartnere · Container","w_all":"Alle","shop_h":"Kollektionen","shop_sub":"","w_details":"Se detaljer","lnk_editions":"Udgaver","lnk_berlin":"Berlin Edition","gate_award_count":"10+ internationale udmærkelser","gate_retail_title":"Privatkunde","gate_retail_desc":"Udvalgte flasker fra Édition Prestige, direkte til dit bord.","gate_wholesale_title":"Engros","gate_wholesale_desc":"B2B-butik, containerkonfigurator, provisionsmodel & forhandleradgang.","about_h":"Om os","about_p1":"Laperla Olive Oil repræsenterer olivenolie af høj kvalitet med oprindelse, karakter og international anerkendelse. Vores mærke forener styrken fra tunesiske olivenlunde med en moderne premiumpræsentation for privatpersoner, delikatesseforretninger, gastronomi og engroshandel.","about_p2":"Hver flaske fortæller om gamle oliventræer, traditionel høst, omhyggelig forarbejdning og ambitionen om at præsentere olivenolie ikke blot som et produkt, men som et værdifuldt stykke kultur. Laperla repræsenterer renhed, smag og tillid — synlig gennem internationale udmærkelser, guldmedaljer og certificeret kvalitet.","about_p3":"Vores mål er at løfte tunesisk premiumolivenolie til et nyt niveau: raffineret, ærlig, sporbar og klar til kunder, der ikke kun vil smage kvalitet, men også forstå den.","about_final":"Laperla Olive Oil er mere end olivenolie. Det er oprindelse, håndværk og elegance i hver flaske.","mission_h2":"Mission","mission_p1":"Vores mission er at præsentere tunesisk premiumolivenolie med værdighed, kvalitet og international ambition. Laperla Olive Oil vil vise, at ægte olivenolie er mere end et fødevareprodukt — det er oprindelse, kultur, håndværk og tillid.","mission_p2":"Vi ønsker at tilbyde kunderne en olivenolie, der overbeviser gennem renhed, smag og gennemsigtighed. Fra gamle olivenlunde over omhyggelig forarbejdning til den raffinerede præsentation repræsenterer hver flaske respekt over for naturen, traditionen og menneskene bag dette produkt.","mission_p3":"Vores opgave er at positionere tunesisk olivenolie stærkt på det internationale marked — for privatpersoner, delikatesseforretninger, gastronomi, hoteller, engroshandel og distributionspartnere. Laperla forener den middelhavske historie med moderne premium-brandstyring.","mission_final":"Vores mission er klar: gøre kvalitet synlig, skabe tillid og bringe tunesisk olivenolie som en ædel kulturarv ud i verden.","story_h2":"Historie","story_p1":"Historien om Laperla Olive Oil begynder der, hvor oliventræer har haft rødder dybt i jorden gennem generationer. I de tunesiske lunde vokser træer, der har modstået varme, vind, stenet jord og tidens prøve. Fra dette landskab opstår en olivenolie med karakter, styrke og naturlig elegance.","story_p2":"Laperla blev skabt for at gøre denne arv synlig. Ikke som et almindeligt produkt på en hylde, men som en premiumolivenolie med sjæl, oprindelse og udstråling. Hver flaske er tænkt til at vise, at sand kvalitet ikke behøver at være larmende — den opstår af tålmodighed, omhu, renhed og respekt for naturen.","story_p3":"Mærket kombinerer traditionel olivenoliekultur med en moderne præsentation. Gamle olivenlunde, omhyggelig høst, kontrolleret forarbejdning og internationale udmærkelser danner en historie, som kunderne kan se, forstå og smage.","story_final":"Laperla Olive Oil fortæller Tunesiens historie i en raffineret form: fra træet til flasken, fra tradition til verdensmærke.","award_eyebrow":"Prisbelønnet på tre kontinenter","award_band_label":"Internationale udmærkelser","award_band_sub":"Guldmedaljer og officielle certifikater fra Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari og Athen — tydeligt dokumenteret af internationale juryer på tre kontinenter.","award_band_btn":"Se alle certifikater","trust_awards":"Internationale priser","trust_acid_l":"Syreindhold","trust_poly_l":"mg/kg Polyfenoler","trust_harvest_l":"Høst til presse","offers_subtitle":"Udvalgte sæt","offers_intro_strong":"Et udtryk for excellence.","offers_intro_p":"For mennesker med de højeste krav — præget af tidløs elegance, exceptionel kvalitet og en uforvekslelig karakter.","purity_cap":"Syreindhold","purity_lead":"Syreindhold under 0,3% — betydeligt bedre end 0,8%-grænsen for Extra Vergine. Koldpresset inden for 4 timer efter høst. Hver dråbe er flydende medicin, rig på over 600 mg/kg polyfenoler, der beskytter hjerte og immunsystem.","purity_acid_l":"Syreindhold","purity_poly_l":"mg/kg Polyfenoler","purity_harvest_l":"Høst til presse","purity_tagline":"Beskyt dit hjerte. Bekæmp betændelse — med naturlige polyfenoler.","cert_eyebrow":"Certificeret renhed","cert_h2":"Økologisk kvalitet, officielt dokumenteret","cert1_micro":"Økologisk kontrolkode · Tunesien","cert1_p":"Den økologiske kode gør den certificerede oprindelse synlig og understøtter en ren mærkning til professionel produktdokumentation.","cert2_p":"Et stærkt tillidsanker for økologisk kvalitet, sporbarhed og seriøs kommunikation over for forhandlere og kunder.","cert3_p":"Et relevant signal for internationale markeder og købergrupper, der forventer økologisk kvalitet efter anerkendte standarder.","heritage_ey":"Gammelt olivenarv","heritage_h3":"Træet ved oprindelsen","heritage_p":"Et ældgammelt oliventræ, stenet jord og en oprindelse, der oplader Laperla med dybde, tid og autenticitet.","reviews_kicker":"Kundeanmeldelser · Customer Reviews · Avis Clients","reviews_h3":"Stemmer fra hele verden","reviews_sub":"Hvad sommelierer, kokke, delikatessehandlere og kendere fra 20+ lande siger om Laperla.","reviews_avg_label":"Gennemsnitlig bedømmelse","reviews_count_label":"Verificerede anmeldelser","reviews_countries_label":"Lande","footer_legacy_h":"Bliv en del af arven","footer_legacy_p":"Hvor historie og sundhed forenes i hver dråbe — fra den ældgamle olivenlund til dit bord."},"no":{"nav_home":"Merkevareunivers","nav_shop":"Butikk · Kolleksjon","nav_awards":"Utmerkelser","nav_gallery":"Galleri","nav_wholesale":"Engros · B2B-butikk","nav_config":"Konfigurer container","nav_commission":"Provisjonsmodell","nav_dist":"Distribusjonspartnere","nav_account":"Logg inn / Registrer deg","nav_dashboard":"Mitt forhandlerdashbord","nav_logout":"Logg ut","grp_discover":"Oppdag","grp_business":"Bedriftskunder","grp_account":"Konto","grp_service":"Service","acct":"⬦ Konto","acct_in":"⬦ Min konto","hero_desc":"Historie og helse i hver dråpe. Kaldpresset fra eldgamle Chemlali-trær i Tunisias olivenlunder, gjennom generasjoner. Prisbelønnet på tre kontinenter.","hero_cta1":"Oppdag kolleksjonen","hero_cta2":"For bedrifter","offers_ey":"Premium Olivenolje","offers_h":"Édition Prestige — Utvalgte sett","purity_lead_pre":"Syreinnhold under","cta_shop":"Til butikken","cta_ws":"Engros","add_cart":"Legg i handlekurven","incl_vat":"inkl. mva.","unavail":"Midlertidig utsolgt","not_orderable":"Kan ikke bestilles","cat_glass":"Glassflaske","cat_tin":"Metallboks","cat_gift":"Gaveutgave","menu_brand":"Merkevare","menu_quality":"Kvalitet & Utmerkelser","lnk_story":"Historie","lnk_about":"Om oss","lnk_mission":"Misjon","lnk_origin":"Opprinnelse · Tunisia","lnk_discover":"Opplev Tunisia","lnk_collection":"Kolleksjon","lnk_offers":"Premium Olivenolje","lnk_certified":"Sertifisert renhet","lnk_certs":"Sertifikater & Priser","lnk_intl":"Internasjonale utmerkelser","lnk_ws":"Grossister","lnk_dist":"Distribusjonspartnere","lnk_pallet":"Konfigurer paller","lnk_b2bshop":"B2B-butikk","w_products":"Produkter","acct_sub":"Kodetilgang · Innlogging · Registrering","logout_sub":"Avslutt økt","hs_ey":"Zembra la Romaine · Tunisia","hs_title_a":"Der alt begynte — ","hs_title_b":"og ingenting ble glemt","hs_lead":"Mellom steinete jord og havluft vokser oliventrær som er eldre enn noe merke. Av fruktene deres oppstår Laperla Vestige — en olje som ikke hevder sitt opphav, men beviser det.","hs_text":"Hver innhøsting følger naturens rytme: håndplukket, kaldekstrahert i løpet av få timer og bevart ufiltrert i sin reneste form. Ingen kompromisser, ingen snarveier — bare ærlig, ren olje med full sporbarhet helt til treet.","hs_f1":"Én sort & ufiltrert fra ett opphav","hs_f2":"Fra innhøsting til kaldekstraksjon","hs_f3":"Sertifisert & internasjonalt gullpremiert","hs_bio":"Økologisk","menu_brand_sub":"Historie · Om oss · Misjon · Opprinnelse · Tunisia","menu_collection_sub":"Produkter · Berlin Edition · Tilbud","menu_quality_sub":"Ultra Purity · Sertifikater & Priser","menu_b2b_sub":"Grossister · Distribusjonspartnere · Container","w_all":"Alle","shop_h":"Kolleksjonen","shop_sub":"","w_details":"Se detaljer","lnk_editions":"Utgaver","lnk_berlin":"Berlin Edition","gate_award_count":"10+ internasjonale utmerkelser","gate_retail_title":"Privatkunde","gate_retail_desc":"Utvalgte flasker fra Édition Prestige, direkte til ditt bord.","gate_wholesale_title":"Engros","gate_wholesale_desc":"B2B-butikk, containerkonfigurator, provisjonsmodell & forhandlertilgang.","about_h":"Om oss","about_p1":"Laperla Olive Oil representerer olivenolje av høy kvalitet med opprinnelse, karakter og internasjonal anerkjennelse. Vårt merke forener styrken fra tunisiske olivenlunder med en moderne premiumpresentasjon for privatkunder, delikatessebutikker, gastronomi og engroshandel.","about_p2":"Hver flaske forteller om gamle oliventrær, tradisjonell innhøsting, omhyggelig bearbeiding og ambisjonen om å presentere olivenolje ikke bare som et produkt, men som et verdifullt stykke kultur. Laperla representerer renhet, smak og tillit — synlig gjennom internasjonale utmerkelser, gullmedaljer og sertifisert kvalitet.","about_p3":"Vårt mål er å løfte tunisisk premiumolivenolje til et nytt nivå: raffinert, ærlig, sporbar og klar for kunder som ikke bare vil smake kvalitet, men også forstå den.","about_final":"Laperla Olive Oil er mer enn olivenolje. Det er opprinnelse, håndverk og eleganse i hver flaske.","mission_h2":"Misjon","mission_p1":"Vår misjon er å presentere tunisisk premiumolivenolje med verdighet, kvalitet og internasjonal ambisjon. Laperla Olive Oil vil vise at ekte olivenolje er mer enn et næringsmiddel — det er opprinnelse, kultur, håndverk og tillit.","mission_p2":"Vi ønsker å tilby kundene en olivenolje som overbeviser gjennom renhet, smak og åpenhet. Fra gamle olivenlunder via omhyggelig bearbeiding til den raffinerte presentasjonen representerer hver flaske respekt for naturen, tradisjonen og menneskene bak dette produktet.","mission_p3":"Vår oppgave er å posisjonere tunisisk olivenolje sterkt i det internasjonale markedet — for privatkunder, delikatessebutikker, gastronomi, hoteller, engroshandel og distribusjonspartnere. Laperla forener den mediterrane historien med moderne premiummerkeledelse.","mission_final":"Vår misjon er klar: gjøre kvalitet synlig, bygge tillit og bære tunisisk olivenolje som et edelt kulturarv ut i verden.","story_h2":"Historie","story_p1":"Historien om Laperla Olive Oil begynner der oliventrær har vært dypt forankret i jorden gjennom generasjoner. I de tunisiske lundene vokser trær som har motstått varme, vind, steinete jord og tidens prøve. Fra dette landskapet oppstår en olivenolje med karakter, styrke og naturlig eleganse.","story_p2":"Laperla ble skapt for å gjøre denne arven synlig. Ikke som et vanlig produkt på en hylle, men som en premiumolivenolje med sjel, opprinnelse og utstråling. Hver flaske er ment å vise at sann kvalitet ikke trenger å være støyende — den oppstår fra tålmodighet, omsorg, renhet og respekt for naturen.","story_p3":"Merket kombinerer tradisjonell olivenoljekultur med moderne presentasjon. Gamle olivenlunder, omhyggelig innhøsting, kontrollert bearbeiding og internasjonale utmerkelser danner en historie som kundene kan se, forstå og smake.","story_final":"Laperla Olive Oil forteller Tunisias historie i en raffinert form: fra treet til flasken, fra tradisjon til verdensmerke.","award_eyebrow":"Premiert på tre kontinenter","award_band_label":"Internasjonale utmerkelser","award_band_sub":"Gullmedaljer og offisielle sertifikater fra Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari og Athen — tydelig dokumentert av internasjonale juryer på tre kontinenter.","award_band_btn":"Se alle sertifikater","trust_awards":"Internasjonale priser","trust_acid_l":"Syreinnhold","trust_poly_l":"mg/kg Polyfenoler","trust_harvest_l":"Høst til presse","offers_subtitle":"Utvalgte sett","offers_intro_strong":"Et uttrykk for eksellens.","offers_intro_p":"For mennesker med de høyeste krav — preget av tidløs eleganse, eksepsjonell kvalitet og en umiskjennelig karakter.","purity_cap":"Syreinnhold","purity_lead":"Syreinnhold under 0,3 % — betydelig bedre enn 0,8 %-grensen for Extra Vergine. Kaldpresset innen 4 timer etter høst. Hver dråpe er flytende medisin, rik på over 600 mg/kg polyfenoler som beskytter hjerte og immunsystem.","purity_acid_l":"Syreinnhold","purity_poly_l":"mg/kg Polyfenoler","purity_harvest_l":"Høst til presse","purity_tagline":"Beskytt hjertet ditt. Bekjemp betennelse — med naturlige polyfenoler.","cert_eyebrow":"Sertifisert renhet","cert_h2":"Økologisk kvalitet, offisielt dokumentert","cert1_micro":"Økologisk kontrollkode · Tunisia","cert1_p":"Den økologiske koden gjør den sertifiserte opprinnelsen synlig og støtter ren merking for profesjonell produktdokumentasjon.","cert2_p":"Et sterkt tillitsanker for økologisk kvalitet, sporbarhet og seriøs kommunikasjon overfor forhandlere og kunder.","cert3_p":"Et relevant signal for internasjonale markeder og kjøpergrupper som forventer økologisk kvalitet etter anerkjente standarder.","heritage_ey":"Gammelt olivenarvegods","heritage_h3":"Treet ved opprinnelsen","heritage_p":"Et urgammelt oliventre, steinete jord og en opprinnelse som lader Laperla med dybde, tid og autentisitet.","reviews_kicker":"Kundeanmeldelser · Customer Reviews · Avis Clients","reviews_h3":"Stemmer fra hele verden","reviews_sub":"Hva sommelierer, kokker, delikatessehandlere og kjennere fra 20+ land sier om Laperla.","reviews_avg_label":"Gjennomsnittlig vurdering","reviews_count_label":"Verifiserte anmeldelser","reviews_countries_label":"Land","footer_legacy_h":"Bli en del av arven","footer_legacy_p":"Der historie og helse forenes i hver dråpe — fra den urgamle olivenlunden til ditt bord."},"fi":{"nav_home":"Brändin maailma","nav_shop":"Kauppa · Kokoelma","nav_awards":"Palkinnot","nav_gallery":"Galleria","nav_wholesale":"Tukku · B2B-kauppa","nav_config":"Kontin konfigurointi","nav_commission":"Provisiomalli","nav_dist":"Jakelukumppanit","nav_account":"Kirjaudu / Rekisteröidy","nav_dashboard":"Jälleenmyyjän hallintapaneeli","nav_logout":"Kirjaudu ulos","grp_discover":"Tutustu","grp_business":"Yritysasiakkaat","grp_account":"Tili","grp_service":"Palvelu","acct":"⬦ Tili","acct_in":"⬦ Oma tili","hero_desc":"Historiaa ja terveyttä jokaisessa pisarassa. Kylmäpuristettu Tunisian oliivilehtojen ikivanhoista Chemlali-puista, sukupolvien ajan. Palkittu kolmella mantereella.","hero_cta1":"Tutustu kokoelmaan","hero_cta2":"Yrityksille","offers_ey":"Premium-Oliiviöljy","offers_h":"Édition Prestige — Valikoidut setit","purity_lead_pre":"Happopitoisuus alle","cta_shop":"Kauppaan","cta_ws":"Tukku","add_cart":"Lisää ostoskoriin","incl_vat":"sis. alv","unavail":"Tilapäisesti loppu","not_orderable":"Ei tilattavissa","cat_glass":"Lasipullo","cat_tin":"Metallitölkki","cat_gift":"Lahjapainos","menu_brand":"Brändi","menu_quality":"Laatu & Palkinnot","lnk_story":"Tarina","lnk_about":"Meistä","lnk_mission":"Missio","lnk_origin":"Alkuperä · Tunisia","lnk_discover":"Tutustu Tunisiaan","lnk_collection":"Kokoelma","lnk_offers":"Premium-Oliiviöljy","lnk_certified":"Sertifioitu puhtaus","lnk_certs":"Sertifikaatit & Palkinnot","lnk_intl":"Kansainväliset palkinnot","lnk_ws":"Tukkukauppiaat","lnk_dist":"Jakelukumppanit","lnk_pallet":"Lavojen konfigurointi","lnk_b2bshop":"B2B-kauppa","w_products":"Tuotteet","acct_sub":"Koodipääsy · Kirjautuminen · Rekisteröinti","logout_sub":"Lopeta istunto","hs_ey":"Zembra la Romaine · Tunisia","hs_title_a":"Missä kaikki alkoi — ","hs_title_b":"eikä mitään unohdettu","hs_lead":"Kivisen maaperän ja meri-ilman välissä kasvaa oliivipuita, jotka ovat vanhempia kuin yksikään tuotemerkki. Niiden hedelmistä syntyy Laperla Vestige — öljy, joka ei väitä alkuperäänsä vaan todistaa sen.","hs_text":"Jokainen sadonkorjuu seuraa luonnon rytmiä: käsin poimittu, kylmäuutettu muutamassa tunnissa ja säilytetty suodattamattomana puhtaimmassa muodossaan. Ei kompromisseja, ei oikoteitä — vain rehellistä, puhdasta öljyä, jonka voi jäljittää puuhun asti.","hs_f1":"Yksi lajike & suodattamaton, yksi alkuperä","hs_f2":"Sadonkorjuusta kylmäuuttoon","hs_f3":"Sertifioitu & kansainvälisesti kullalla palkittu","hs_bio":"Luomu","menu_brand_sub":"Tarina · Meistä · Missio · Alkuperä · Tunisia","menu_collection_sub":"Tuotteet · Berlin Edition · Tarjoukset","menu_quality_sub":"Ultra Purity · Sertifikaatit & Palkinnot","menu_b2b_sub":"Tukkukauppiaat · Jakelukumppanit · Container","w_all":"Kaikki","shop_h":"Kokoelma","shop_sub":"","w_details":"Näytä tiedot","lnk_editions":"Painokset","lnk_berlin":"Berlin Edition","gate_award_count":"10+ kansainvälistä palkintoa","gate_retail_title":"Yksityisasiakas","gate_retail_desc":"Édition Prestigen kuratoidut pullot suoraan pöytääsi.","gate_wholesale_title":"Tukku","gate_wholesale_desc":"B2B-kauppa, kontticonfiguaattori, provisomalli & jälleenmyyjäpääsy.","about_h":"Meistä","about_p1":"Laperla Olive Oil edustaa korkealaatuista oliiviöljyä, jolla on alkuperä, luonne ja kansainvälinen tunnustus. Brändimme yhdistää tunisialaisten oliivilehtovarsien voiman moderniin premium-esittelyyn yksityisasiakkaille, herkkukaupoille, gastronomille ja tukkukaupalle.","about_p2":"Jokainen pullo kertoo vanhoista oliivipuista, perinteisestä sadosta, huolellisesta jalostuksesta ja kunnianhimosta esitellä oliiviöljy ei vain tuotteena, vaan arvokkaana kulttuuripalasen. Laperla edustaa puhtautta, makua ja luottamusta — näkyvänä kansainvälisistä palkinnoista, kultamitalleista ja sertifioidusta laadusta.","about_p3":"Tavoitteenamme on nostaa tunisialainen premium-oliiviöljy uudelle tasolle: hienostunut, rehellinen, jäljitettävä ja valmis asiakkaille, jotka haluavat paitsi maistaa laadun, myös ymmärtää sen.","about_final":"Laperla Olive Oil on enemmän kuin oliiviöljy. Se on alkuperä, käsityötaito ja eleganssi jokaisessa pullossa.","mission_h2":"Missio","mission_p1":"Missiomme on esitellä tunisialainen premium-oliiviöljy arvokkaasti, laadukkaasti ja kansainvälisellä kunnianhimolla. Laperla Olive Oil haluaa osoittaa, että aito oliiviöljy on enemmän kuin elintarvike — se on alkuperä, kulttuuri, käsityötaito ja luottamus.","mission_p2":"Haluamme tarjota asiakkaille oliiviöljyn, joka vakuuttaa puhtaudella, maulla ja avoimuudella. Vanhoista oliivilehdoista huolellisen jalostuksen kautta hienostuneeseen esittelyyn jokainen pullo edustaa kunnioitusta luontoa, perinnettä ja tämän tuotteen taustalla olevia ihmisiä kohtaan.","mission_p3":"Tehtävämme on asemoida tunisialainen oliiviöljy vahvasti kansainvälisille markkinoille — yksityisasiakkaille, herkkukaupoille, gastronomille, hotelleille, tukkukaupalle ja jakelukumppaneille. Laperla yhdistää välimeren historian moderniin premium-brändijohtamiseen.","mission_final":"Missiomme on selkeä: tehdä laatu näkyväksi, rakentaa luottamusta ja viedä tunisialainen oliiviöljy jalona kulttuuriperintönä maailmalle.","story_h2":"Tarina","story_p1":"Laperla Olive Oilin tarina alkaa sieltä, missä oliivipuut ovat olleet syvälle juurtuneet maahan sukupolvien ajan. Tunisialaisissa lehdoissa kasvaa puita, jotka ovat kestäneet kuumuuden, tuulen, kivisen maaperän ja ajan koettelemuksen. Tästä maisemasta syntyy oliiviöljy, jolla on luonne, voima ja luonnollinen eleganssi.","story_p2":"Laperla luotiin tekemään tämä perintö näkyväksi. Ei tavallisena tuotteena hyllyllä, vaan premium-oliiviöljynä, jolla on sielu, alkuperä ja säteily. Jokaisen pullon on tarkoitus osoittaa, että aito laatu ei tarvitse olla äänekäs — se syntyy kärsivällisyydestä, huolenpidosta, puhtaudesta ja kunnioituksesta luontoa kohtaan.","story_p3":"Brändi yhdistää perinteisen oliiviöljykulttuurin moderniin esittelyyn. Vanhat oliivilehdot, huolellinen sato, hallittu jalostus ja kansainväliset palkinnot muodostavat tarinan, jonka asiakkaat voivat nähdä, ymmärtää ja maistaa.","story_final":"Laperla Olive Oil kertoo Tunisian tarinan hienostuneessa muodossa: puusta pulloon, perinteestä maailmanbrändiksi.","award_eyebrow":"Palkittu kolmella mantereella","award_band_label":"Kansainväliset palkinnot","award_band_sub":"Kultamitallit ja viralliset sertifikaatit Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari ja Ateenasta — selkeästi dokumentoituna kansainvälisten tuomariston toimesta kolmella mantereella.","award_band_btn":"Näytä kaikki sertifikaatit","trust_awards":"Kansainväliset palkinnot","trust_acid_l":"Happopitoisuus","trust_poly_l":"mg/kg Polyfenolit","trust_harvest_l":"Sadosta puristukseen","offers_subtitle":"Kuratoidut setit","offers_intro_strong":"Ilmaus erinomaisuudesta.","offers_intro_p":"Ihmisille, joilla on korkeat vaatimukset — leimaavana ajaton eleganssi, poikkeuksellinen laatu ja tunnistettava luonne.","purity_cap":"Happopitoisuus","purity_lead":"Happopitoisuus alle 0,3 % — selvästi parempi kuin Extra Vergine -rajan 0,8 %. Kylmäpuristettu 4 tunnin kuluessa sadosta. Jokainen pisara on nestemäistä lääkettä, rikkaana yli 600 mg/kg polyfenolit, jotka suojaavat sydäntä ja immuunijärjestelmää.","purity_acid_l":"Happopitoisuus","purity_poly_l":"mg/kg Polyfenolit","purity_harvest_l":"Sadosta puristukseen","purity_tagline":"Suojaa sydämesi. Torju tulehduksia — luonnollisilla polyfenoleilla.","cert_eyebrow":"Sertifioitu puhtaus","cert_h2":"Luomulaatu, virallisesti dokumentoitu","cert1_micro":"Luomukontrollikoodi · Tunisia","cert1_p":"Luomukoodi tekee sertifioidun alkuperän näkyväksi ja tukee puhdasta merkintää ammatilliseen tuotedokumentaatioon.","cert2_p":"Vahva luottamustukipilari luomulaadulle, jäljitettävyydelle ja seriöösille viestinnälle jälleenmyyjille ja asiakkaille.","cert3_p":"Relevantti signaali kansainvälisille markkinoille ja ostajayksiköille, jotka odottavat luomulaatua tunnustettujen standardien mukaan.","heritage_ey":"Vanha oliiviperintö","heritage_h3":"Puu alkuperässä","heritage_p":"Ikivanha oliivipuu, kivinen maaperä ja alkuperä, joka lataa Laperlan syvyydellä, ajalla ja aitoudella.","reviews_kicker":"Asiakasarvostelut · Customer Reviews · Avis Clients","reviews_h3":"Ääniä ympäri maailmaa","reviews_sub":"Mitä sommelier, kokit, herkkukauppiaiden jälleenmyyjät ja tuntijat yli 20 maasta sanovat Laperlasta.","reviews_avg_label":"Keskimääräinen arvio","reviews_count_label":"Vahvistetut arvostelut","reviews_countries_label":"Maat","footer_legacy_h":"Liity perintöön","footer_legacy_p":"Missä historia ja terveys yhdistyvät jokaisessa pisarassa — ikivanhasta lehdosta pöytääsi."},"pl":{"nav_home":"Świat marki","nav_shop":"Sklep · Kolekcja","nav_awards":"Nagrody","nav_gallery":"Galeria","nav_wholesale":"Hurt · Sklep B2B","nav_config":"Konfiguracja kontenera","nav_commission":"Model prowizyjny","nav_dist":"Partnerzy dystrybucyjni","nav_account":"Zaloguj się / Zarejestruj","nav_dashboard":"Panel dealera","nav_logout":"Wyloguj się","grp_discover":"Odkryj","grp_business":"Klienci biznesowi","grp_account":"Konto","grp_service":"Serwis","acct":"⬦ Konto","acct_in":"⬦ Moje konto","hero_desc":"Historia i zdrowie w każdej kropli. Tłoczona na zimno z wiekowych drzew Chemlali w tunezyjskich gajach oliwnych, od pokoleń. Nagradzana na trzech kontynentach.","hero_cta1":"Odkryj kolekcję","hero_cta2":"Dla firm","offers_ey":"Oliwa z Oliwek Premium","offers_h":"Édition Prestige — Wyselekcjonowane zestawy","purity_lead_pre":"Kwasowość poniżej","cta_shop":"Do sklepu","cta_ws":"Hurt","add_cart":"Do koszyka","incl_vat":"z VAT","unavail":"Chwilowo niedostępne","not_orderable":"Niedostępne do zamówienia","cat_glass":"Butelka szklana","cat_tin":"Puszka metalowa","cat_gift":"Edycja prezentowa","menu_brand":"Marka","menu_quality":"Jakość i nagrody","lnk_story":"Historia","lnk_about":"O nas","lnk_mission":"Misja","lnk_origin":"Pochodzenie · Tunezja","lnk_discover":"Odkryj Tunezję","lnk_collection":"Kolekcja","lnk_offers":"Oliwa z Oliwek Premium","lnk_certified":"Certyfikowana czystość","lnk_certs":"Certyfikaty i nagrody","lnk_intl":"Nagrody międzynarodowe","lnk_ws":"Hurtownicy","lnk_dist":"Partnerzy dystrybucyjni","lnk_pallet":"Konfiguracja palet","lnk_b2bshop":"Sklep B2B","w_products":"Produkty","acct_sub":"Dostęp kodem · Logowanie · Rejestracja","logout_sub":"Zakończ sesję","hs_ey":"Zembra la Romaine · Tunezja","hs_title_a":"Tam, gdzie wszystko się zaczęło — ","hs_title_b":"i nic nie zostało zapomniane","hs_lead":"Pomiędzy skalistym podłożem a morskim powietrzem rosną drzewa oliwne starsze niż jakakolwiek marka. Z ich owoców powstaje Laperla Vestige — oliwa, która nie deklaruje pochodzenia, lecz go dowodzi.","hs_text":"Każdy zbiór podąża za rytmem natury: zbierana ręcznie, tłoczona na zimno w ciągu kilku godzin i przechowywana niefiltrowana w najczystszej postaci. Bez kompromisów i dróg na skróty — tylko uczciwa, czysta oliwa z pełną identyfikowalnością aż do drzewa.","hs_f1":"Jednoodmianowa i niefiltrowana, jedno pochodzenie","hs_f2":"Od zbioru do tłoczenia na zimno","hs_f3":"Certyfikowana i nagradzana złotem na świecie","hs_bio":"Bio","menu_brand_sub":"Historia · O nas · Misja · Pochodzenie · Tunezja","menu_collection_sub":"Produkty · Berlin Edition · Oferty","menu_quality_sub":"Ultra Purity · Certyfikaty i nagrody","menu_b2b_sub":"Hurtownicy · Partnerzy dystrybucyjni · Container","w_all":"Wszystkie","shop_h":"Kolekcja","shop_sub":"","w_details":"Zobacz szczegóły","lnk_editions":"Edycje","lnk_berlin":"Berlin Edition","gate_award_count":"10+ nagród międzynarodowych","gate_retail_title":"Klient prywatny","gate_retail_desc":"Wyselekcjonowane butelki Édition Prestige, bezpośrednio na Twój stół.","gate_wholesale_title":"Hurt","gate_wholesale_desc":"Sklep B2B, konfigurator kontenera, model prowizyjny & dostęp dla dystrybutorów.","about_h":"O nas","about_p1":"Laperla Olive Oil to synonim wysokiej jakości oliwy z oliwek z określonym pochodzeniem, charakterem i międzynarodowym uznaniem. Nasza marka łączy siłę tunezyjskich gajów oliwnych z nowoczesną prezentacją premium dla klientów prywatnych, delikatesów, gastronomii i hurtowni.","about_p2":"Każda butelka opowiada o starych drzewach oliwnych, tradycyjnych zbiorach, starannym przetwarzaniu i ambicji prezentowania oliwy z oliwek nie tylko jako produktu, ale jako cennego kawałka kultury. Laperla reprezentuje czystość, smak i zaufanie — widoczne poprzez nagrody międzynarodowe, złote medale i certyfikowaną jakość.","about_p3":"Naszym celem jest wyniesienie tunezyjskiej oliwy premium na nowy poziom: wyszukanej, uczciwej, identyfikowalnej i gotowej dla klientów, którzy chcą nie tylko smakować jakość, ale i ją rozumieć.","about_final":"Laperla Olive Oil to więcej niż oliwa z oliwek. To pochodzenie, rzemiosło i elegancja w każdej butelce.","mission_h2":"Misja","mission_p1":"Naszą misją jest prezentowanie tunezyjskiej oliwy premium z godnością, jakością i międzynarodowymi ambicjami. Laperla Olive Oil ma pokazywać, że prawdziwa oliwa z oliwek jest czymś więcej niż produktem spożywczym — to pochodzenie, kultura, rzemiosło i zaufanie.","mission_p2":"Chcemy zaoferować klientom oliwę z oliwek, która przekonuje czystością, smakiem i przejrzystością. Od starych gajów oliwnych przez staranne przetwarzanie do wyszukanej prezentacji każda butelka symbolizuje szacunek dla natury, tradycji i ludzi stojących za tym produktem.","mission_p3":"Naszym zadaniem jest mocne pozycjonowanie tunezyjskiej oliwy z oliwek na rynku międzynarodowym — dla klientów prywatnych, delikatesów, gastronomii, hoteli, hurtowni i partnerów dystrybucyjnych. Laperla łączy śródziemnomorską historię z nowoczesnym zarządzaniem marką premium.","mission_final":"Nasza misja jest jasna: uczynić jakość widoczną, budować zaufanie i nieść tunezyjską oliwę z oliwek jako szlachetne dziedzictwo kulturowe na cały świat.","story_h2":"Historia","story_p1":"Historia Laperla Olive Oil zaczyna się tam, gdzie drzewa oliwne od pokoleń głęboko zakorzenione są w ziemi. W tunezyjskich gajach rosną drzewa, które wytrzymały upały, wiatry, kamieniste podłoże i próbę czasu. Z tego krajobrazu wyłania się oliwa z oliwek z charakterem, siłą i naturalną elegancją.","story_p2":"Laperla zostało stworzone, aby uczynić to dziedzictwo widocznym. Nie jako zwykły produkt na półce, lecz jako oliwa premium z duszą, pochodzeniem i wyjątkowością. Każda butelka ma pokazywać, że prawdziwa jakość nie musi być głośna — rodzi się z cierpliwości, troski, czystości i szacunku dla natury.","story_p3":"Marka łączy tradycyjną kulturę oliwy z oliwek z nowoczesną prezentacją. Stare gaje oliwne, staranne zbiory, kontrolowane przetwarzanie i nagrody międzynarodowe tworzą historię, którą klienci mogą zobaczyć, zrozumieć i poczuć.","story_final":"Laperla Olive Oil opowiada historię Tunezji w wyszukanej formie: od drzewa do butelki, od tradycji do marki światowej.","award_eyebrow":"Nagradzana na trzech kontynentach","award_band_label":"Nagrody międzynarodowe","award_band_sub":"Złote medale i oficjalne certyfikaty ze Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari i Aten — widocznie udokumentowane przez międzynarodowe jury na trzech kontynentach.","award_band_btn":"Zobacz wszystkie certyfikaty","trust_awards":"Nagrody międzynarodowe","trust_acid_l":"Kwasowość","trust_poly_l":"mg/kg Polifenole","trust_harvest_l":"Zbiory do prasy","offers_subtitle":"Wyselekcjonowane zestawy","offers_intro_strong":"Wyraz doskonałości.","offers_intro_p":"Dla ludzi o najwyższych wymaganiach — naznaczonych ponadczasową elegancją, wyjątkową jakością i niepowtarzalnym charakterem.","purity_cap":"Kwasowość","purity_lead":"Kwasowość poniżej 0,3% — znacznie lepsza od granicy 0,8% dla Extra Vergine. Tłoczona na zimno w ciągu 4 godzin od zbioru. Każda kropla to płynne lekarstwo, bogate w ponad 600 mg/kg polifenoli chroniących serce i układ odpornościowy.","purity_acid_l":"Kwasowość","purity_poly_l":"mg/kg Polifenole","purity_harvest_l":"Zbiory do prasy","purity_tagline":"Chroń swoje serce. Zwalczaj stany zapalne — naturalnymi polifenolami.","cert_eyebrow":"Certyfikowana czystość","cert_h2":"Jakość ekologiczna, oficjalnie udokumentowana","cert1_micro":"Ekologiczny kod kontrolny · Tunezja","cert1_p":"Kod ekologiczny czyni certyfikowane pochodzenie widocznym i wspiera czyste etykietowanie w profesjonalnej dokumentacji produktu.","cert2_p":"Silna kotwica zaufania dla jakości ekologicznej, identyfikowalności i poważnej komunikacji z handlowcami i klientami.","cert3_p":"Istotny sygnał dla rynków międzynarodowych i grup nabywców oczekujących jakości ekologicznej według uznanych standardów.","heritage_ey":"Stare dziedzictwo oliwkowe","heritage_h3":"Drzewo u źródła","heritage_p":"Pradawne drzewo oliwne, skaliste podłoże i pochodzenie, które napełnia Laperla głębią, czasem i autentycznością.","reviews_kicker":"Recenzje Klientów · Customer Reviews · Avis Clients","reviews_h3":"Głosy z całego świata","reviews_sub":"Co sommelierzy, szefowie kuchni, dystrybutorzy delikatesów i koneserzy z ponad 20 krajów mówią o Laperla.","reviews_avg_label":"Średnia ocena","reviews_count_label":"Zweryfikowane opinie","reviews_countries_label":"Kraje","footer_legacy_h":"Dołącz do dziedzictwa","footer_legacy_p":"Gdzie historia i zdrowie łączą się w każdej kropli — od pradawnego gaju po Twój stół."},"cs":{"nav_home":"Svět značky","nav_shop":"Obchod · Kolekce","nav_awards":"Ocenění","nav_gallery":"Galerie","nav_wholesale":"Velkoobchod · B2B obchod","nav_config":"Konfigurace kontejneru","nav_commission":"Provizní model","nav_dist":"Distribuční partneři","nav_account":"Přihlásit se / Registrovat","nav_dashboard":"Můj dealerský panel","nav_logout":"Odhlásit se","grp_discover":"Objevte","grp_business":"Firemní zákazníci","grp_account":"Účet","grp_service":"Servis","acct":"⬦ Účet","acct_in":"⬦ Můj účet","hero_desc":"Historie a zdraví v každé kapce. Lisováno za studena z prastarých stromů Chemlali v tuniských olivových hájích, po generace. Oceněno na třech kontinentech.","hero_cta1":"Objevte kolekci","hero_cta2":"Pro firmy","offers_ey":"Prémiový Olivový Olej","offers_h":"Édition Prestige — Vybrané sady","purity_lead_pre":"Kyselost pod","cta_shop":"Do obchodu","cta_ws":"Velkoobchod","add_cart":"Do košíku","incl_vat":"vč. DPH","unavail":"Momentálně nedostupné","not_orderable":"Nelze objednat","cat_glass":"Skleněná láhev","cat_tin":"Plechovka","cat_gift":"Dárková edice","menu_brand":"Značka","menu_quality":"Kvalita a ocenění","lnk_story":"Příběh","lnk_about":"O nás","lnk_mission":"Mise","lnk_origin":"Původ · Tunisko","lnk_discover":"Objevte Tunisko","lnk_collection":"Kolekce","lnk_offers":"Prémiový Olivový Olej","lnk_certified":"Certifikovaná čistota","lnk_certs":"Certifikáty a ocenění","lnk_intl":"Mezinárodní ocenění","lnk_ws":"Velkoobchodníci","lnk_dist":"Distribuční partneři","lnk_pallet":"Konfigurace palet","lnk_b2bshop":"B2B obchod","w_products":"Produkty","acct_sub":"Přístup kódem · Přihlášení · Registrace","logout_sub":"Ukončit relaci","hs_ey":"Zembra la Romaine · Tunisko","hs_title_a":"Kde vše začalo — ","hs_title_b":"a nic nebylo zapomenuto","hs_lead":"Mezi skalnatou půdou a mořským vzduchem rostou olivovníky starší než jakákoli značka. Z jejich plodů vzniká Laperla Vestige — olej, který svůj původ netvrdí, ale dokazuje.","hs_text":"Každá sklizeň následuje rytmus přírody: sbíráno ručně, lisováno za studena během několika hodin a uchováno nefiltrované v nejčistší podobě. Žádné kompromisy, žádné zkratky — jen poctivý, čistý olej s plnou dohledatelností až ke stromu.","hs_f1":"Jednoodrůdový a nefiltrovaný, jediný původ","hs_f2":"Od sklizně po lisování za studena","hs_f3":"Certifikováno a mezinárodně oceněno zlatem","hs_bio":"Bio","menu_brand_sub":"Příběh · O nás · Mise · Původ · Tunisko","menu_collection_sub":"Produkty · Berlin Edition · Nabídky","menu_quality_sub":"Ultra Purity · Certifikáty a ocenění","menu_b2b_sub":"Velkoobchodníci · Distribuční partneři · Container","w_all":"Vše","shop_h":"Kolekce","shop_sub":"","w_details":"Zobrazit podrobnosti","lnk_editions":"Edice","lnk_berlin":"Berlin Edition","gate_award_count":"10+ mezinárodních ocenění","gate_retail_title":"Soukromý zákazník","gate_retail_desc":"Kurátorsky vybrané láhve Édition Prestige, přímo na váš stůl.","gate_wholesale_title":"Velkoobchod","gate_wholesale_desc":"B2B obchod, konfigurátor kontejneru, provizní model & přístup pro prodejce.","about_h":"O nás","about_p1":"Laperla Olive Oil představuje vysoce kvalitní olivový olej s původem, charakterem a mezinárodním uznáním. Naše značka spojuje sílu tuniských olivových hájů s moderní prémiovouprezentací pro soukromé zákazníky, lahůdkářství, gastronomii a velkoobchod.","about_p2":"Každá lahev vypráví o starých olivovnících, tradiční sklizni, pečlivém zpracování a ambici prezentovat olivový olej nejen jako produkt, ale jako cenný kus kultury. Laperla představuje čistotu, chuť a důvěru — viditelnou prostřednictvím mezinárodních ocenění, zlatých medailí a certifikované kvality.","about_p3":"Naším cílem je povznést tuniský prémiový olivový olej na novou úroveň: rafinovaný, poctivý, sledovatelný a připravený pro zákazníky, kteří chtějí kvalitu nejen ochutnat, ale také ji pochopit.","about_final":"Laperla Olive Oil je víc než olivový olej. Je to původ, řemeslo a elegance v každé lahvi.","mission_h2":"Mise","mission_p1":"Naší misí je prezentovat tuniský prémiový olivový olej s důstojností, kvalitou a mezinárodními ambicemi. Laperla Olive Oil chce ukázat, že skutečný olivový olej je víc než potravina — je to původ, kultura, řemeslo a důvěra.","mission_p2":"Chceme zákazníkům nabídnout olivový olej, který přesvědčí čistotou, chutí a transparentností. Od starých olivových hájů přes pečlivé zpracování až po rafinovanou prezentaci každá lahev reprezentuje úctu k přírodě, tradici a lidem za tímto produktem.","mission_p3":"Naším úkolem je silně pozicionovat tuniský olivový olej na mezinárodním trhu — pro soukromé zákazníky, lahůdkářství, gastronomii, hotely, velkoobchod a distribuční partnery. Laperla spojuje středomořskou historii s moderním prémiový řízením značky.","mission_final":"Naše mise je jasná: zviditelnit kvalitu, budovat důvěru a nést tuniský olivový olej jako vznešené kulturní dědictví do světa.","story_h2":"Příběh","story_p1":"Příběh Laperla Olive Oil začíná tam, kde jsou olivovníky generace hluboko zakořeněné v zemi. V tuniských hájích rostou stromy, které odolaly vedru, větru, kamenité půdě a zkoušce času. Z této krajiny vzniká olivový olej s charakterem, silou a přirozenou elegancí.","story_p2":"Laperla bylo vytvořeno, aby toto dědictví zviditelnilo. Nikoli jako běžný produkt na polici, ale jako prémiový olivový olej s duší, původem a vyzařováním. Každá lahev má ukázat, že pravá kvalita nemusí být hlučná — rodí se z trpělivosti, péče, čistoty a respektu k přírodě.","story_p3":"Značka kombinuje tradiční kulturu olivového oleje s moderní prezentací. Staré olivové háje, pečlivá sklizeň, kontrolované zpracování a mezinárodní ocenění tvoří příběh, který zákazníci mohou vidět, pochopit a ochutnat.","story_final":"Laperla Olive Oil vypráví příběh Tuniska v rafinované formě: od stromu k lahvi, od tradice ke světové značce.","award_eyebrow":"Oceněno na třech kontinentech","award_band_label":"Mezinárodní ocenění","award_band_sub":"Zlaté medaile a oficiální certifikáty ze Swiss Gold 2026, Miami, Abú Dhabí, Al Ain, Bari a Atén — viditelně zdokumentované mezinárodními porotami na třech kontinentech.","award_band_btn":"Zobrazit všechny certifikáty","trust_awards":"Mezinárodní ceny","trust_acid_l":"Kyselost","trust_poly_l":"mg/kg Polyfenoly","trust_harvest_l":"Sklizeň k lisu","offers_subtitle":"Vybrané sady","offers_intro_strong":"Výraz excelence.","offers_intro_p":"Pro lidi s nejvyššími nároky — charakterizované nadčasovou elegancí, výjimečnou kvalitou a nezaměnitelným charakterem.","purity_cap":"Kyselost","purity_lead":"Kyselost pod 0,3 % — výrazně lepší než limit 0,8 % pro Extra Vergine. Lisováno za studena do 4 hodin po sklizni. Každá kapka je tekutým lékem, bohatá na více než 600 mg/kg polyfenolů chránících srdce a imunitní systém.","purity_acid_l":"Kyselost","purity_poly_l":"mg/kg Polyfenoly","purity_harvest_l":"Sklizeň k lisu","purity_tagline":"Chraňte své srdce. Bojujte se záněty — s přírodními polyfenoly.","cert_eyebrow":"Certifikovaná čistota","cert_h2":"Bio kvalita, oficiálně zdokumentovaná","cert1_micro":"Bio kontrolní kód · Tunisko","cert1_p":"Bio kód zviditelňuje certifikovaný původ a podporuje čisté označování pro profesionální produktovou dokumentaci.","cert2_p":"Silná kotva důvěry pro bio kvalitu, sledovatelnost a seriózní komunikaci s obchodníky a zákazníky.","cert3_p":"Relevantní signál pro mezinárodní trhy a skupiny kupujících, kteří očekávají bio kvalitu podle uznávaných standardů.","heritage_ey":"Staré dědictví olivovníků","heritage_h3":"Strom u původu","heritage_p":"Prastarý olivovník, skalnatá půda a původ, který nabíjí Laperla hloubkou, časem a autenticitou.","reviews_kicker":"Recenze zákazníků · Customer Reviews · Avis Clients","reviews_h3":"Hlasy z celého světa","reviews_sub":"Co sommelier, šéfkuchaři, prodejci lahůdek a znalci z více než 20 zemí říkají o Laperla.","reviews_avg_label":"Průměrné hodnocení","reviews_count_label":"Ověřené recenze","reviews_countries_label":"Země","footer_legacy_h":"Připojte se k odkazu","footer_legacy_p":"Kde se historie a zdraví spojují v každé kapce — od prastarého háje až na váš stůl."},"hu":{"nav_home":"Márkavilág","nav_shop":"Üzlet · Kollekció","nav_awards":"Díjak","nav_gallery":"Galéria","nav_wholesale":"Nagykereskedelem · B2B üzlet","nav_config":"Konténer konfigurálása","nav_commission":"Jutalékmodell","nav_dist":"Értékesítési partnerek","nav_account":"Bejelentkezés / Regisztráció","nav_dashboard":"Kereskedői irányítópultom","nav_logout":"Kijelentkezés","grp_discover":"Fedezze fel","grp_business":"Üzleti ügyfelek","grp_account":"Fiók","grp_service":"Szolgáltatás","acct":"⬦ Fiók","acct_in":"⬦ Fiókom","hero_desc":"Történelem és egészség minden cseppben. Hidegen sajtolva Tunézia olívaligeteinek ősi Chemlali-fáiról, generációk óta. Három kontinensen díjazva.","hero_cta1":"Fedezze fel a kollekciót","hero_cta2":"Vállalatoknak","offers_ey":"Prémium Olívaolaj","offers_h":"Édition Prestige — Válogatott szettek","purity_lead_pre":"Savtartalom kevesebb mint","cta_shop":"Az üzletbe","cta_ws":"Nagykereskedelem","add_cart":"Kosárba","incl_vat":"ÁFA-val","unavail":"Jelenleg nem elérhető","not_orderable":"Nem rendelhető","cat_glass":"Üvegpalack","cat_tin":"Fémdoboz","cat_gift":"Ajándékkiadás","menu_brand":"Márka","menu_quality":"Minőség és díjak","lnk_story":"Történet","lnk_about":"Rólunk","lnk_mission":"Küldetés","lnk_origin":"Eredet · Tunézia","lnk_discover":"Fedezze fel Tunéziát","lnk_collection":"Kollekció","lnk_offers":"Prémium Olívaolaj","lnk_certified":"Tanúsított tisztaság","lnk_certs":"Tanúsítványok és díjak","lnk_intl":"Nemzetközi díjak","lnk_ws":"Nagykereskedők","lnk_dist":"Értékesítési partnerek","lnk_pallet":"Raklapok konfigurálása","lnk_b2bshop":"B2B üzlet","w_products":"Termékek","acct_sub":"Kódos hozzáférés · Bejelentkezés · Regisztráció","logout_sub":"Munkamenet befejezése","hs_ey":"Zembra la Romaine · Tunézia","hs_title_a":"Ahol minden kezdődött — ","hs_title_b":"és semmi sem merült feledésbe","hs_lead":"Sziklás talaj és tengeri levegő között olyan olajfák nőnek, amelyek régebbiek minden márkánál. Gyümölcseikből születik a Laperla Vestige — egy olaj, amely nem állítja az eredetét, hanem bizonyítja.","hs_text":"Minden szüret a természet ritmusát követi: kézzel szedve, néhány órán belül hidegen sajtolva, és szűretlenül, legtisztább formájában megőrizve. Nincs kompromisszum, nincs rövidítés — csak becsületes, tiszta olaj, teljes nyomonkövethetőséggel egészen a fáig.","hs_f1":"Egyfajtájú és szűretlen, egyetlen eredet","hs_f2":"A szürettől a hideg sajtolásig","hs_f3":"Tanúsított és nemzetközi aranydíjas","hs_bio":"Bio","menu_brand_sub":"Történet · Rólunk · Küldetés · Eredet · Tunézia","menu_collection_sub":"Termékek · Berlin Edition · Ajánlatok","menu_quality_sub":"Ultra Purity · Tanúsítványok és díjak","menu_b2b_sub":"Nagykereskedők · Értékesítési partnerek · Container","w_all":"Összes","shop_h":"A kollekció","shop_sub":"","w_details":"Részletek megtekintése","lnk_editions":"Kiadások","lnk_berlin":"Berlin Edition","gate_award_count":"10+ nemzetközi díj","gate_retail_title":"Magánvásárló","gate_retail_desc":"Az Édition Prestige válogatott üvegei, közvetlenül az asztalára.","gate_wholesale_title":"Nagykereskedelem","gate_wholesale_desc":"B2B üzlet, konténer-konfigurátor, jutalékmodell és kereskedői hozzáférés.","about_h":"Rólunk","about_p1":"A Laperla Olive Oil kiváló minőségű olívaolajat képvisel, amely eredettel, karakterrel és nemzetközi elismeréssel rendelkezik. Márkánk egyesíti a tunéziai olajfaligetek erejét egy modern prémium bemutatással magánvásárlók, csemegekereskedések, gasztronómia és nagykereskedelem számára.","about_p2":"Minden palack régi olajfák, hagyományos szüret, gondos feldolgozás és azon ambíció történetét meséli el, hogy az olívaolajat ne csak termékként, hanem értékes kultúradarabként mutassuk be. A Laperla tisztaságot, ízet és bizalmat jelent — nemzetközi díjak, aranyérmek és tanúsított minőség révén láthatóan.","about_p3":"Célunk a tunéziai prémium olívaolajat új szintre emelni: kifinomult, őszinte, nyomon követhető, és készen áll azokra az ügyfelekre, akik nemcsak ízlelni, hanem érteni is akarják a minőséget.","about_final":"A Laperla Olive Oil több mint olívaolaj. Ez eredet, kézművesség és elegancia minden palackban.","mission_h2":"Küldetés","mission_p1":"Küldetésünk a tunéziai prémium olívaolaj méltósággal, minőséggel és nemzetközi ambícióval való bemutatása. A Laperla Olive Oil meg akarja mutatni, hogy az igazi olívaolaj több mint élelmiszer — ez eredet, kultúra, kézművesség és bizalom.","mission_p2":"Olyan olívaolajt szeretnénk kínálni ügyfeleinknek, amely tisztasággal, ízzel és átláthatósággal győz meg. A régi olajfaligetektől a gondos feldolgozáson át a kifinomult bemutatásig minden palack a természet, a hagyomány és a termék mögött álló emberek iránti tiszteletet képviseli.","mission_p3":"Feladatunk a tunéziai olívaolaj erős pozicionálása a nemzetközi piacon — magánvásárlók, csemegekereskedések, gasztronómia, szállodák, nagykereskedelem és forgalmazópartnerek számára. A Laperla a mediterrán történelmet modern prémium márkamanagementtel köti össze.","mission_final":"Küldetésünk világos: a minőséget láthatóvá tenni, bizalmat építeni és a tunéziai olívaolajat nemes kulturális örökségként vinni a világba.","story_h2":"Történet","story_p1":"A Laperla Olive Oil története ott kezdődik, ahol az olajfák generációk óta mélyen gyökereznek a földben. A tunéziai ligetekben hőséget, szelet, köves talajt és az idő próbáját kiálló fák nőnek. Ebből a tájból egy karakterrel, erővel és természetes eleganciával rendelkező olívaolaj születik.","story_p2":"A Laperla azért jött létre, hogy láthatóvá tegye ezt az örökséget. Nem mint egy közönséges termék egy polcon, hanem mint prémium olívaolaj lélekkel, eredettel és kisugárzással. Minden palack arra hivatott, hogy megmutassa: az igazi minőségnek nem kell hangosnak lennie — türelemből, gondosságból, tisztaságból és a természet iránti tiszteletből fakad.","story_p3":"A márka a hagyományos olívaolaj-kultúrát modern bemutatással ötvözi. Régi olajfaültetvények, gondos szüret, ellenőrzött feldolgozás és nemzetközi díjak olyan történetet alkotnak, amelyet az ügyfelek láthatnak, megérthetnek és megízlelhetnek.","story_final":"A Laperla Olive Oil egy kifinomult formában meséli Tunézia történetét: a fától a palackig, a hagyománytól a világmárkáig.","award_eyebrow":"Három kontinensen díjazva","award_band_label":"Nemzetközi díjak","award_band_sub":"Aranyérmek és hivatalos oklevelek a Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari és Athén versenyekről — három kontinensen láthatóan dokumentálva nemzetközi zsűrik által.","award_band_btn":"Összes oklevél megtekintése","trust_awards":"Nemzetközi díjak","trust_acid_l":"Savtartalom","trust_poly_l":"mg/kg Polifenolok","trust_harvest_l":"Szürettől sajtóig","offers_subtitle":"Válogatott szettek","offers_intro_strong":"A kiválóság kifejezése.","offers_intro_p":"A legmagasabb igényű embereknek — jellemezve az időtlen elegancia, kivételes minőség és felismerhető karakter.","purity_cap":"Savtartalom","purity_lead":"Savtartalom 0,3% alatt — jelentősen jobb, mint az Extra Szűz 0,8%-os határértéke. Szüret után 4 órán belül hidegen sajtolva. Minden csepp folyékony gyógyszer, gazdag több mint 600 mg/kg polifenolban, amelyek megvédik a szívet és az immunrendszert.","purity_acid_l":"Savtartalom","purity_poly_l":"mg/kg Polifenolok","purity_harvest_l":"Szürettől sajtóig","purity_tagline":"Védje szívét. Küzdjön a gyulladások ellen — természetes polifenolokkal.","cert_eyebrow":"Tanúsított tisztaság","cert_h2":"Bio minőség, hivatalosan dokumentálva","cert1_micro":"Bio ellenőrző kód · Tunézia","cert1_p":"A bio kód láthatóvá teszi a tanúsított eredetet, és tiszta jelölést támogat a professzionális termékdokumentációhoz.","cert2_p":"Erős bizalmi horgony a bio minőség, a nyomon követhetőség és a kereskedőkkel és ügyfelekkel folytatott komoly kommunikáció számára.","cert3_p":"Releváns jel a nemzetközi piacok és vásárlói csoportok számára, amelyek elismert szabványok szerinti bio minőséget várnak el.","heritage_ey":"Régi olajfa örökség","heritage_h3":"A fa az eredetnél","heritage_p":"Egy ősi olajfa, sziklás talaj és egy eredet, amely mélységgel, idővel és hitelességgel tölti meg a Laperla-t.","reviews_kicker":"Vásárlói értékelések · Customer Reviews · Avis Clients","reviews_h3":"Hangok a világ minden tájáról","reviews_sub":"Mit mondanak sommelierek, séfek, csemegekereskedők és szakértők 20+ országból a Laperla-ról.","reviews_avg_label":"Átlagos értékelés","reviews_count_label":"Ellenőrzött vélemények","reviews_countries_label":"Országok","footer_legacy_h":"Csatlakozzon az örökséghez","footer_legacy_p":"Ahol a történelem és az egészség minden cseppben egyesül — az ősi ligettől az asztaláig."},"ro":{"nav_home":"Universul mărcii","nav_shop":"Magazin · Colecție","nav_awards":"Premii","nav_gallery":"Galerie","nav_wholesale":"En-gros · Magazin B2B","nav_config":"Configurare container","nav_commission":"Model de comision","nav_dist":"Parteneri de distribuție","nav_account":"Autentificare / Înregistrare","nav_dashboard":"Panoul meu de dealer","nav_logout":"Deconectare","grp_discover":"Descoperiți","grp_business":"Clienți business","grp_account":"Cont","grp_service":"Servicii","acct":"⬦ Cont","acct_in":"⬦ Contul meu","hero_desc":"Istorie și sănătate în fiecare picătură. Presat la rece din arbori Chemlali seculari din livezile de măslini ale Tunisiei, de generații. Premiat pe trei continente.","hero_cta1":"Descoperiți colecția","hero_cta2":"Pentru companii","offers_ey":"Ulei de Măsline Premium","offers_h":"Édition Prestige — Seturi selecționate","purity_lead_pre":"Aciditate sub","cta_shop":"Spre magazin","cta_ws":"En-gros","add_cart":"Adaugă în coș","incl_vat":"TVA inclus","unavail":"Momentan indisponibil","not_orderable":"Nu poate fi comandat","cat_glass":"Sticlă","cat_tin":"Cutie metalică","cat_gift":"Ediție cadou","menu_brand":"Marcă","menu_quality":"Calitate și premii","lnk_story":"Poveste","lnk_about":"Despre noi","lnk_mission":"Misiune","lnk_origin":"Origine · Tunisia","lnk_discover":"Descoperiți Tunisia","lnk_collection":"Colecție","lnk_offers":"Ulei de Măsline Premium","lnk_certified":"Puritate certificată","lnk_certs":"Certificate și premii","lnk_intl":"Premii internaționale","lnk_ws":"Angrosiști","lnk_dist":"Parteneri de distribuție","lnk_pallet":"Configurare paleți","lnk_b2bshop":"Magazin B2B","w_products":"Produse","acct_sub":"Acces cu cod · Autentificare · Înregistrare","logout_sub":"Încheiere sesiune","hs_ey":"Zembra la Romaine · Tunisia","hs_title_a":"Unde a început totul — ","hs_title_b":"și nimic nu a fost uitat","hs_lead":"Între sol stâncos și aerul mării cresc măslini mai vechi decât orice marcă. Din fructele lor se naște Laperla Vestige — un ulei care nu își afirmă originea, ci o dovedește.","hs_text":"Fiecare recoltă urmează ritmul naturii: cules manual, extras la rece în câteva ore și păstrat nefiltrat, în forma sa cea mai pură. Fără compromisuri, fără scurtături — doar ulei onest și curat, cu trasabilitate completă până la copac.","hs_f1":"Monovarietal și nefiltrat, o singură origine","hs_f2":"De la recoltă la extracția la rece","hs_f3":"Certificat și premiat cu aur internațional","hs_bio":"Ecologic","menu_brand_sub":"Poveste · Despre noi · Misiune · Origine · Tunisia","menu_collection_sub":"Produse · Berlin Edition · Oferte","menu_quality_sub":"Ultra Purity · Certificate și premii","menu_b2b_sub":"Angrosiști · Parteneri de distribuție · Container","w_all":"Toate","shop_h":"Colecția","shop_sub":"","w_details":"Vezi detalii","lnk_editions":"Ediții","lnk_berlin":"Berlin Edition","gate_award_count":"10+ premii internaționale","gate_retail_title":"Client particular","gate_retail_desc":"Sticle selectate din Édition Prestige, direct pe masa dumneavoastră.","gate_wholesale_title":"En-gros","gate_wholesale_desc":"Magazin B2B, configurator container, model de comision & acces pentru dealeri.","about_h":"Despre noi","about_p1":"Laperla Olive Oil reprezintă ulei de măsline de înaltă calitate cu origine, caracter și recunoaștere internațională. Marca noastră unește forța livezilor de măslini tunisieni cu o prezentare premium modernă pentru clienți particulari, delicatese, gastronomie și comerț en-gros.","about_p2":"Fiecare sticlă povestește despre măslini vechi, recoltă tradițională, procesare atentă și ambiția de a prezenta uleiul de măsline nu doar ca produs, ci ca un valoros fragment de cultură. Laperla reprezintă puritate, gust și încredere — vizibile prin premii internaționale, medalii de aur și calitate certificată.","about_p3":"Scopul nostru este să ridicăm uleiul de măsline premium tunisian la un nivel nou: rafinat, onest, trasabil și pregătit pentru clienți care doresc nu doar să guste calitatea, ci și să o înțeleagă.","about_final":"Laperla Olive Oil este mai mult decât ulei de măsline. Este origine, meșteșug și eleganță în fiecare sticlă.","mission_h2":"Misiune","mission_p1":"Misiunea noastră este să prezentăm uleiul de măsline premium tunisian cu demnitate, calitate și ambiție internațională. Laperla Olive Oil vrea să demonstreze că uleiul de măsline adevărat este mai mult decât un aliment — este origine, cultură, meșteșug și încredere.","mission_p2":"Dorim să oferim clienților un ulei de măsline care convinge prin puritate, gust și transparență. De la livezile vechi de măslini prin procesarea atentă până la prezentarea rafinată, fiecare sticlă reprezintă respect față de natură, tradiție și oamenii din spatele acestui produs.","mission_p3":"Sarcina noastră este să poziționăm puternic uleiul de măsline tunisian pe piața internațională — pentru clienți particulari, delicatese, gastronomie, hoteluri, en-gros și parteneri de distribuție. Laperla unește istoria mediteraneană cu managementul modern al mărcii premium.","mission_final":"Misiunea noastră este clară: să facem calitatea vizibilă, să construim încredere și să ducem uleiul de măsline tunisian ca un patrimoniu cultural nobil în lume.","story_h2":"Poveste","story_p1":"Povestea Laperla Olive Oil începe acolo unde măslinii au rădăcini adânci în pământ de generații. În livezile tunisiene cresc copaci care au rezistat la căldură, vânt, sol stâncos și proba timpului. Din acest peisaj se naște un ulei de măsline cu caracter, forță și eleganță naturală.","story_p2":"Laperla a fost creat pentru a face vizibil acest patrimoniu. Nu ca un produs obișnuit pe raft, ci ca un ulei de măsline premium cu suflet, origine și strălucire. Fiecare sticlă este menită să arate că adevărata calitate nu trebuie să fie zgomotoasă — ea se naște din răbdare, grijă, puritate și respect față de natură.","story_p3":"Marca combină cultura tradițională a uleiului de măsline cu o prezentare modernă. Livezi vechi de măslini, recoltă atentă, procesare controlată și premii internaționale formează o poveste pe care clienții o pot vedea, înțelege și gusta.","story_final":"Laperla Olive Oil spune povestea Tunisiei într-o formă rafinată: de la copac la sticlă, de la tradiție la marcă mondială.","award_eyebrow":"Premiată pe trei continente","award_band_label":"Premii internaționale","award_band_sub":"Medalii de aur și certificate oficiale de la Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari și Atena — documentate vizibil de jurii internaționale pe trei continente.","award_band_btn":"Vedeți toate certificatele","trust_awards":"Premii internaționale","trust_acid_l":"Aciditate","trust_poly_l":"mg/kg Polifenoli","trust_harvest_l":"Recoltă la presă","offers_subtitle":"Seturi selecționate","offers_intro_strong":"O expresie a excelenței.","offers_intro_p":"Pentru persoane cu cele mai înalte standarde — marcate de eleganță atemporală, calitate excepțională și un caracter inconfundabil.","purity_cap":"Aciditate","purity_lead":"Aciditate sub 0,3% — semnificativ mai bună decât limita de 0,8% pentru Extra Vergine. Presat la rece în 4 ore de la recoltă. Fiecare picătură este medicament lichid, bogat în peste 600 mg/kg de polifenoli care protejează inima și sistemul imunitar.","purity_acid_l":"Aciditate","purity_poly_l":"mg/kg Polifenoli","purity_harvest_l":"Recoltă la presă","purity_tagline":"Protejați-vă inima. Combateți inflamația — cu polifenoli naturali.","cert_eyebrow":"Puritate certificată","cert_h2":"Calitate bio, oficial documentată","cert1_micro":"Cod de control bio · Tunisia","cert1_p":"Codul bio face vizibilă originea certificată și susține o etichetare curată pentru documentația profesională a produsului.","cert2_p":"O ancoră puternică de încredere pentru calitatea bio, trasabilitate și comunicare serioasă cu comercianții și clienții.","cert3_p":"Un semnal relevant pentru piețele internaționale și grupurile de cumpărători care se așteaptă la calitate bio conform standardelor recunoscute.","heritage_ey":"Vechi patrimoniu de măslini","heritage_h3":"Copacul la origine","heritage_p":"Un măslin milenar, sol stâncos și o origine care încarcă Laperla cu profunzime, timp și autenticitate.","reviews_kicker":"Recenzii Clienți · Customer Reviews · Avis Clients","reviews_h3":"Voci din întreaga lume","reviews_sub":"Ce spun sommelieri, bucătari șefi, comercianți de delicatese și cunoscători din 20+ țări despre Laperla.","reviews_avg_label":"Evaluare medie","reviews_count_label":"Recenzii verificate","reviews_countries_label":"Țări","footer_legacy_h":"Alăturați-vă moștenirii","footer_legacy_p":"Unde istoria și sănătatea se unesc în fiecare picătură — de la livada veche până la masa dumneavoastră."},"el":{"nav_home":"Ο κόσμος της μάρκας","nav_shop":"Κατάστημα · Συλλογή","nav_awards":"Διακρίσεις","nav_gallery":"Γκαλερί","nav_wholesale":"Χονδρική · Κατάστημα B2B","nav_config":"Διαμόρφωση εμπορευματοκιβωτίου","nav_commission":"Μοντέλο προμήθειας","nav_dist":"Συνεργάτες διανομής","nav_account":"Σύνδεση / Εγγραφή","nav_dashboard":"Ο πίνακας εμπόρου μου","nav_logout":"Αποσύνδεση","grp_discover":"Ανακαλύψτε","grp_business":"Επιχειρήσεις","grp_account":"Λογαριασμός","grp_service":"Εξυπηρέτηση","acct":"⬦ Λογαριασμός","acct_in":"⬦ Ο λογαριασμός μου","hero_desc":"Ιστορία και υγεία σε κάθε σταγόνα. Ψυχρής έκθλιψης από αιωνόβια δέντρα Chemlali στους ελαιώνες της Τυνησίας, εδώ και γενιές. Βραβευμένο σε τρεις ηπείρους.","hero_cta1":"Ανακαλύψτε τη συλλογή","hero_cta2":"Για επιχειρήσεις","offers_ey":"Premium Ελαιόλαδο","offers_h":"Édition Prestige — Επιλεγμένα σετ","purity_lead_pre":"Οξύτητα κάτω από","cta_shop":"Προς το κατάστημα","cta_ws":"Χονδρική","add_cart":"Προσθήκη στο καλάθι","incl_vat":"με ΦΠΑ","unavail":"Προσωρινά μη διαθέσιμο","not_orderable":"Μη διαθέσιμο για παραγγελία","cat_glass":"Γυάλινη φιάλη","cat_tin":"Μεταλλικό δοχείο","cat_gift":"Συσκευασία δώρου","menu_brand":"Μάρκα","menu_quality":"Ποιότητα & Βραβεία","lnk_story":"Ιστορία","lnk_about":"Σχετικά με εμάς","lnk_mission":"Αποστολή","lnk_origin":"Προέλευση · Τυνησία","lnk_discover":"Ανακαλύψτε την Τυνησία","lnk_collection":"Συλλογή","lnk_offers":"Premium Ελαιόλαδο","lnk_certified":"Πιστοποιημένη καθαρότητα","lnk_certs":"Πιστοποιητικά & Βραβεία","lnk_intl":"Διεθνείς διακρίσεις","lnk_ws":"Χονδρέμποροι","lnk_dist":"Συνεργάτες διανομής","lnk_pallet":"Διαμόρφωση παλετών","lnk_b2bshop":"Κατάστημα B2B","w_products":"Προϊόντα","acct_sub":"Πρόσβαση με κωδικό · Σύνδεση · Εγγραφή","logout_sub":"Τερματισμός συνεδρίας","hs_ey":"Zembra la Romaine · Τυνησία","hs_title_a":"Εκεί όπου όλα ξεκίνησαν — ","hs_title_b":"και τίποτα δεν ξεχάστηκε","hs_lead":"Ανάμεσα σε βραχώδη εδάφη και θαλασσινό αέρα μεγαλώνουν ελαιόδεντρα παλαιότερα από κάθε μάρκα. Από τους καρπούς τους γεννιέται το Laperla Vestige — ένα λάδι που δεν ισχυρίζεται την προέλευσή του, αλλά την αποδεικνύει.","hs_text":"Κάθε συγκομιδή ακολουθεί τον ρυθμό της φύσης: μαζεμένο στο χέρι, ψυχρής έκθλιψης μέσα σε λίγες ώρες και αφιλτράριστο στην πιο αγνή του μορφή. Κανένας συμβιβασμός, καμία συντόμευση — μόνο τίμιο, καθαρό λάδι με πλήρη ιχνηλασιμότητα έως το δέντρο.","hs_f1":"Μονοποικιλιακό & αφιλτράριστο από μία προέλευση","hs_f2":"Από τη συγκομιδή έως την ψυχρή έκθλιψη","hs_f3":"Πιστοποιημένο & διεθνώς βραβευμένο με χρυσό","hs_bio":"Βιολογικό","menu_brand_sub":"Ιστορία · Σχετικά με εμάς · Αποστολή · Προέλευση · Τυνησία","menu_collection_sub":"Προϊόντα · Berlin Edition · Προσφορές","menu_quality_sub":"Ultra Purity · Πιστοποιητικά & Βραβεία","menu_b2b_sub":"Χονδρέμποροι · Συνεργάτες διανομής · Container","w_all":"Όλα","shop_h":"Η Συλλογή","shop_sub":"","w_details":"Δείτε λεπτομέρειες","lnk_editions":"Εκδόσεις","lnk_berlin":"Berlin Edition","gate_award_count":"10+ διεθνείς διακρίσεις","gate_retail_title":"Ιδιώτης πελάτης","gate_retail_desc":"Επιμελημένα μπουκάλια της Édition Prestige, απευθείας στο τραπέζι σας.","gate_wholesale_title":"Χονδρική","gate_wholesale_desc":"B2B κατάστημα, διαμορφωτής εμπορευματοκιβωτίου, μοντέλο προμήθειας & πρόσβαση εμπόρων.","about_h":"Σχετικά με εμάς","about_p1":"Το Laperla Olive Oil αντιπροσωπεύει εξαιρετικής ποιότητας ελαιόλαδο με προέλευση, χαρακτήρα και διεθνή αναγνώριση. Η μάρκα μας ενώνει τη δύναμη των τυνησιακών ελαιώνων με μια σύγχρονη premium παρουσίαση για ιδιώτες πελάτες, καταστήματα λιχουδιών, γαστρονομία και χονδρικό εμπόριο.","about_p2":"Κάθε μπουκάλι αφηγείται την ιστορία αρχαίων ελαιόδεντρων, παραδοσιακής συγκομιδής, προσεκτικής επεξεργασίας και της φιλοδοξίας να παρουσιαστεί το ελαιόλαδο όχι μόνο ως προϊόν, αλλά ως ένα πολύτιμο κομμάτι πολιτισμού. Το Laperla συμβολίζει αγνότητα, γεύση και εμπιστοσύνη — ορατά μέσω διεθνών διακρίσεων, χρυσών μεταλλίων και πιστοποιημένης ποιότητας.","about_p3":"Στόχος μας είναι να ανυψώσουμε το τυνησιακό premium ελαιόλαδο σε νέο επίπεδο: εκλεπτυσμένο, ειλικρινές, ιχνηλάσιμο και έτοιμο για πελάτες που θέλουν όχι μόνο να γευτούν την ποιότητα, αλλά και να την κατανοήσουν.","about_final":"Το Laperla Olive Oil είναι κάτι περισσότερο από ελαιόλαδο. Είναι προέλευση, τεχνογνωσία και κομψότητα σε κάθε μπουκάλι.","mission_h2":"Αποστολή","mission_p1":"Αποστολή μας είναι να παρουσιάσουμε το τυνησιακό premium ελαιόλαδο με αξιοπρέπεια, ποιότητα και διεθνή φιλοδοξία. Το Laperla Olive Oil θέλει να δείξει ότι το αληθινό ελαιόλαδο είναι περισσότερο από τρόφιμο — είναι προέλευση, πολιτισμός, τεχνογνωσία και εμπιστοσύνη.","mission_p2":"Θέλουμε να προσφέρουμε στους πελάτες ένα ελαιόλαδο που πείθει μέσα από αγνότητα, γεύση και διαφάνεια. Από τους αρχαίους ελαιώνες μέσω της προσεκτικής επεξεργασίας έως την εκλεπτυσμένη παρουσίαση, κάθε μπουκάλι εκφράζει σεβασμό προς τη φύση, την παράδοση και τους ανθρώπους πίσω από αυτό το προϊόν.","mission_p3":"Καθήκον μας είναι να τοποθετήσουμε δυναμικά το τυνησιακό ελαιόλαδο στη διεθνή αγορά — για ιδιώτες, καταστήματα λιχουδιών, γαστρονομία, ξενοδοχεία, χονδρικό εμπόριο και διανομείς. Το Laperla συνδέει τη μεσογειακή ιστορία με τη σύγχρονη διαχείριση premium μάρκας.","mission_final":"Η αποστολή μας είναι ξεκάθαρη: να κάνουμε την ποιότητα ορατή, να χτίσουμε εμπιστοσύνη και να φέρουμε το τυνησιακό ελαιόλαδο ως ευγενή πολιτιστική κληρονομιά στον κόσμο.","story_h2":"Ιστορία","story_p1":"Η ιστορία του Laperla Olive Oil ξεκινά εκεί όπου τα ελαιόδεντρα είναι βαθιά ριζωμένα στη γη για γενιές. Στους τυνησιακούς ελαιώνες μεγαλώνουν δέντρα που έχουν αντισταθεί στη ζέστη, τον άνεμο, το βραχώδες έδαφος και τη δοκιμασία του χρόνου. Από αυτό το τοπίο προκύπτει ένα ελαιόλαδο με χαρακτήρα, δύναμη και φυσική κομψότητα.","story_p2":"Το Laperla δημιουργήθηκε για να κάνει αυτή την κληρονομιά ορατή. Όχι ως συνηθισμένο προϊόν σε ένα ράφι, αλλά ως premium ελαιόλαδο με ψυχή, προέλευση και λάμψη. Κάθε μπουκάλι σκοπεύει να δείξει ότι η αληθινή ποιότητα δεν χρειάζεται να είναι εντυπωσιακή — γεννιέται από υπομονή, φροντίδα, αγνότητα και σεβασμό στη φύση.","story_p3":"Η μάρκα συνδυάζει την παραδοσιακή κουλτούρα ελαιολάδου με σύγχρονη παρουσίαση. Αρχαίοι ελαιώνες, προσεκτική συγκομιδή, ελεγχόμενη επεξεργασία και διεθνείς διακρίσεις σχηματίζουν μια ιστορία που οι πελάτες μπορούν να δουν, να κατανοήσουν και να γευτούν.","story_final":"Το Laperla Olive Oil αφηγείται την ιστορία της Τυνησίας σε εκλεπτυσμένη μορφή: από το δέντρο στο μπουκάλι, από την παράδοση στην παγκόσμια μάρκα.","award_eyebrow":"Βραβευμένο σε τρεις ηπείρους","award_band_label":"Διεθνείς διακρίσεις","award_band_sub":"Χρυσά μετάλλια και επίσημα πιστοποιητικά από Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari και Αθήνα — ορατά τεκμηριωμένα από διεθνείς κριτικές επιτροπές σε τρεις ηπείρους.","award_band_btn":"Δείτε όλα τα πιστοποιητικά","trust_awards":"Διεθνή βραβεία","trust_acid_l":"Οξύτητα","trust_poly_l":"mg/kg Πολυφαινόλες","trust_harvest_l":"Συγκομιδή έως πρέσα","offers_subtitle":"Επιλεγμένα σετ","offers_intro_strong":"Μια έκφραση αριστείας.","offers_intro_p":"Για ανθρώπους με τις υψηλότερες απαιτήσεις — χαρακτηριζόμενους από διαχρονική κομψότητα, εξαιρετική ποιότητα και ανεπανάληπτο χαρακτήρα.","purity_cap":"Οξύτητα","purity_lead":"Οξύτητα κάτω από 0,3% — σημαντικά καλύτερη από το όριο του 0,8% για το Extra Vergine. Ψυχρής έκθλιψης εντός 4 ωρών από τη συγκομιδή. Κάθε σταγόνα είναι υγρό φάρμακο, πλούσιο σε πάνω από 600 mg/kg πολυφαινόλες που προστατεύουν καρδιά και ανοσοποιητικό σύστημα.","purity_acid_l":"Οξύτητα","purity_poly_l":"mg/kg Πολυφαινόλες","purity_harvest_l":"Συγκομιδή έως πρέσα","purity_tagline":"Προστατέψτε την καρδιά σας. Καταπολεμήστε τις φλεγμονές — με φυσικές πολυφαινόλες.","cert_eyebrow":"Πιστοποιημένη αγνότητα","cert_h2":"Βιολογική ποιότητα, επίσημα τεκμηριωμένη","cert1_micro":"Κωδικός βιολογικού ελέγχου · Τυνησία","cert1_p":"Ο βιολογικός κωδικός καθιστά ορατή την πιστοποιημένη προέλευση και υποστηρίζει καθαρή σήμανση για επαγγελματική τεκμηρίωση προϊόντων.","cert2_p":"Ισχυρή άγκυρα εμπιστοσύνης για βιολογική ποιότητα, ιχνηλασιμότητα και σοβαρή επικοινωνία με εμπόρους και πελάτες.","cert3_p":"Σχετικό σήμα για διεθνείς αγορές και ομάδες αγοραστών που αναμένουν βιολογική ποιότητα σύμφωνα με αναγνωρισμένα πρότυπα.","heritage_ey":"Αρχαία κληρονομιά ελαιώνων","heritage_h3":"Το δέντρο στην απαρχή","heritage_p":"Ένα αρχαίο ελαιόδεντρο, βραχώδες έδαφος και μια προέλευση που φορτίζει το Laperla με βάθος, χρόνο και αυθεντικότητα.","reviews_kicker":"Αξιολογήσεις Πελατών · Customer Reviews · Avis Clients","reviews_h3":"Φωνές από όλο τον κόσμο","reviews_sub":"Τι λένε σομελιέ, σεφ, έμποροι λιχουδιών και γνώστες από 20+ χώρες για το Laperla.","reviews_avg_label":"Μέση αξιολόγηση","reviews_count_label":"Επαληθευμένες αξιολογήσεις","reviews_countries_label":"Χώρες","footer_legacy_h":"Γίνετε μέρος της κληρονομιάς","footer_legacy_p":"Όπου ιστορία και υγεία ενώνονται σε κάθε σταγόνα — από τον αρχαίο ελαιώνα στο τραπέζι σας."},"tr":{"nav_home":"Marka Dünyası","nav_shop":"Mağaza · Koleksiyon","nav_awards":"Ödüller","nav_gallery":"Galeri","nav_wholesale":"Toptan · B2B Mağaza","nav_config":"Konteyner Yapılandırma","nav_commission":"Komisyon Modeli","nav_dist":"Dağıtım Ortakları","nav_account":"Giriş / Kayıt","nav_dashboard":"Bayi Panelim","nav_logout":"Çıkış Yap","grp_discover":"Keşfedin","grp_business":"Kurumsal Müşteriler","grp_account":"Hesap","grp_service":"Hizmet","acct":"⬦ Hesap","acct_in":"⬦ Hesabım","hero_desc":"Her damlada tarih ve sağlık. Tunus'un zeytinliklerindeki asırlık Chemlali ağaçlarından, nesillerdir soğuk sıkım. Üç kıtada ödüllü.","hero_cta1":"Koleksiyonu Keşfedin","hero_cta2":"Kurumsal Müşteriler","offers_ey":"Premium Zeytinyağı","offers_h":"Édition Prestige — Seçilmiş Setler","purity_lead_pre":"Maksimum asitlik","cta_shop":"Mağazaya Git","cta_ws":"Toptan","add_cart":"Sepete Ekle","incl_vat":"KDV dahil","unavail":"Şu anda mevcut değil","not_orderable":"Sipariş edilemez","cat_glass":"Cam Şişe","cat_tin":"Metal Kutu","cat_gift":"Hediye Edisyonu","menu_brand":"Marka","menu_quality":"Kalite ve Ödüller","lnk_story":"Hikâye","lnk_about":"Hakkımızda","lnk_mission":"Misyon","lnk_origin":"Köken · Tunus","lnk_discover":"Tunus'u Keşfedin","lnk_collection":"Koleksiyon","lnk_offers":"Premium Zeytinyağı","lnk_certified":"Sertifikalı Saflık","lnk_certs":"Sertifikalar ve Ödüller","lnk_intl":"Uluslararası Ödüller","lnk_ws":"Toptancılar","lnk_dist":"Dağıtım Ortakları","lnk_pallet":"Palet Yapılandırma","lnk_b2bshop":"B2B Mağaza","w_products":"Ürünler","acct_sub":"Kodla erişim · Giriş · Kayıt","logout_sub":"Oturumu sonlandır","hs_ey":"Zembra la Romaine · Tunus","hs_title_a":"Her şeyin başladığı yer — ","hs_title_b":"ve hiçbir şey unutulmadı","hs_lead":"Kayalık toprak ile deniz havası arasında, her markadan daha yaşlı zeytin ağaçları yetişir. Onların meyvelerinden Laperla Vestige doğar — kökenini iddia etmeyen, kanıtlayan bir yağ.","hs_text":"Her hasat doğanın ritmini izler: elle toplanır, birkaç saat içinde soğuk sıkımla elde edilir ve filtrelenmeden en saf haliyle korunur. Taviz yok, kestirme yok — yalnızca ağaca kadar tam izlenebilirliğe sahip dürüst, temiz yağ.","hs_f1":"Tek çeşit ve filtresiz, tek köken","hs_f2":"Hasattan soğuk sıkıma","hs_f3":"Sertifikalı ve uluslararası altın ödüllü","hs_bio":"Organik","menu_brand_sub":"Hikâye · Hakkımızda · Misyon · Köken · Tunus","menu_collection_sub":"Ürünler · Berlin Edition · Teklifler","menu_quality_sub":"Ultra Purity · Sertifikalar ve Ödüller","menu_b2b_sub":"Toptancılar · Dağıtım Ortakları · Container","w_all":"Tümü","shop_h":"Koleksiyon","shop_sub":"","w_details":"Detayları Gör","lnk_editions":"Edisyonlar","lnk_berlin":"Berlin Edition","gate_award_count":"10+ uluslararası ödül","gate_retail_title":"Bireysel müşteri","gate_retail_desc":"Édition Prestige'in özenle seçilmiş şişeleri, doğrudan sofranıza.","gate_wholesale_title":"Toptan","gate_wholesale_desc":"B2B mağazası, konteyner konfiguratörü, komisyon modeli & bayi erişimi.","about_h":"Hakkımızda","about_p1":"Laperla Olive Oil, köken, karakter ve uluslararası tanınırlığa sahip yüksek kaliteli zeytinyağını temsil eder. Markamız, Tunus zeytin bahçelerinin gücünü bireysel müşteriler, gurme mağazaları, gastronomi ve toptan ticaret için modern premium sunumla birleştirir.","about_p2":"Her şişe, eski zeytin ağaçlarını, geleneksel hasadı, özenli işlemeyi ve zeytinyağını yalnızca bir ürün olarak değil, değerli bir kültür parçası olarak sunma hırsını anlatır. Laperla, uluslararası ödüller, altın madalyalar ve sertifikalı kalite ile görünür kılınan saflık, lezzet ve güveni simgeler.","about_p3":"Hedefimiz, Tunus premium zeytinyağını yeni bir seviyeye taşımak: rafine, dürüst, izlenebilir ve kaliteyi sadece tatmak değil, anlamak isteyen müşterilere hazır.","about_final":"Laperla Olive Oil zeytinyağından fazlasıdır. Her şişede köken, ustalık ve zariftir.","mission_h2":"Misyon","mission_p1":"Misyonumuz, Tunus premium zeytinyağını onur, kalite ve uluslararası hırsla sunmaktır. Laperla Olive Oil, gerçek zeytinyağının bir besin maddesinden fazlası olduğunu göstermek istiyor — köken, kültür, ustalık ve güven.","mission_p2":"Müşterilere saflık, lezzet ve şeffaflık yoluyla ikna eden bir zeytinyağı sunmak istiyoruz. Eski zeytin bahçelerinden özenli işleme yoluyla rafine sunuma kadar her şişe doğaya, geleneğe ve bu ürünün arkasındaki insanlara saygıyı temsil eder.","mission_p3":"Görevimiz, Tunus zeytinyağını uluslararası pazarda güçlü şekilde konumlandırmaktır — bireysel müşteriler, gurme mağazaları, gastronomi, oteller, toptan ticaret ve dağıtım ortakları için. Laperla, Akdeniz tarihini modern premium marka yönetimiyle birleştirir.","mission_final":"Misyonumuz açıktır: kaliteyi görünür kılmak, güven inşa etmek ve Tunus zeytinyağını asil bir kültürel miras olarak dünyaya taşımak.","story_h2":"Hikâye","story_p1":"Laperla Olive Oil'in hikâyesi, zeytin ağaçlarının nesiller boyunca toprağa derin kök saldığı yerde başlar. Tunus bahçelerinde, sıcağa, rüzgâra, taşlı toprağa ve zamanın sınavına direnen ağaçlar yetişir. Bu manzaradan karakter, güç ve doğal zarafet taşıyan bir zeytinyağı ortaya çıkar.","story_p2":"Laperla bu mirası görünür kılmak için yaratıldı. Rafta sıradan bir ürün olarak değil, ruhu, kökeni ve ışıltısıyla premium bir zeytinyağı olarak. Her şişe, gerçek kalitenin gürültülü olmak zorunda olmadığını göstermek için tasarlandı — sabırdan, özenden, saflıktan ve doğaya saygıdan doğar.","story_p3":"Marka, geleneksel zeytinyağı kültürünü modern sunumla birleştirir. Eski zeytin bahçeleri, özenli hasat, kontrollü işleme ve uluslararası ödüller, müşterilerin görebileceği, anlayabileceği ve tadabileceği bir hikâye oluşturur.","story_final":"Laperla Olive Oil, Tunus'un hikâyesini zarif bir biçimde anlatır: ağaçtan şişeye, gelenekten dünya markasına.","award_eyebrow":"Üç kıtada ödüllü","award_band_label":"Uluslararası ödüller","award_band_sub":"Swiss Gold 2026, Miami, Abu Dabi, Al Ain, Bari ve Atina'dan altın madalyalar ve resmi sertifikalar — üç kıtada uluslararası jüriler tarafından belgelenmiş.","award_band_btn":"Tüm sertifikaları görüntüle","trust_awards":"Uluslararası ödüller","trust_acid_l":"Asitlik","trust_poly_l":"mg/kg Polifenoller","trust_harvest_l":"Hasattan preste","offers_subtitle":"Özenle seçilmiş setler","offers_intro_strong":"Mükemmelliğin bir ifadesi.","offers_intro_p":"En yüksek standartlara sahip insanlar için — zamansız zarafet, olağanüstü kalite ve eşsiz bir karakterle şekillendirilmiş.","purity_cap":"Asitlik","purity_lead":"Asitlik %0,3'ün altında — Ekstra Sızma için %0,8 sınırından çok daha iyi. Hasattan sonra 4 saat içinde soğuk sıkım. Her damla sıvı ilaçtır; kalbi ve bağışıklık sistemini koruyan 600 mg/kg'ın üzerinde polifenol içerir.","purity_acid_l":"Asitlik","purity_poly_l":"mg/kg Polifenoller","purity_harvest_l":"Hasattan preste","purity_tagline":"Kalbinizi koruyun. İltihaplanmayla savaşın — doğal polifenollerle.","cert_eyebrow":"Sertifikalı saflık","cert_h2":"Organik kalite, resmi olarak belgelenmiş","cert1_micro":"Organik kontrol kodu · Tunus","cert1_p":"Organik kod, sertifikalı kökeni görünür kılar ve profesyonel ürün belgeleri için temiz etiketlemeyi destekler.","cert2_p":"Organik kalite, izlenebilirlik ve bayiler ile müşterilere yönelik ciddi iletişim için güçlü bir güven çıpası.","cert3_p":"Tanınan standartlara göre organik kalite bekleyen uluslararası pazarlar ve alıcı grupları için ilgili bir sinyal.","heritage_ey":"Eski zeytin mirası","heritage_h3":"Kökenindeki ağaç","heritage_p":"Kadim bir zeytin ağacı, kayalık toprak ve Laperla'yı derinlik, zaman ve özgünlükle dolduran bir köken.","reviews_kicker":"Müşteri Yorumları · Customer Reviews · Avis Clients","reviews_h3":"Dünyanın dört bir yanından sesler","reviews_sub":"20'den fazla ülkeden sommelier, şef, gurme mağazaları ve uzmanların Laperla hakkında söyledikleri.","reviews_avg_label":"Ortalama değerlendirme","reviews_count_label":"Doğrulanmış yorumlar","reviews_countries_label":"Ülkeler","footer_legacy_h":"Mirasa katılın","footer_legacy_p":"Tarihin ve sağlığın her damlada birleştiği yer — kadim bahçeden sofranıza."},"ru":{"nav_home":"Мир бренда","nav_shop":"Магазин · Коллекция","nav_awards":"Награды","nav_gallery":"Галерея","nav_wholesale":"Опт · B2B-магазин","nav_config":"Конфигурация контейнера","nav_commission":"Комиссионная модель","nav_dist":"Дистрибьюторы","nav_account":"Войти / Регистрация","nav_dashboard":"Панель дилера","nav_logout":"Выйти","grp_discover":"Открыть для себя","grp_business":"Для бизнеса","grp_account":"Аккаунт","grp_service":"Сервис","acct":"⬦ Аккаунт","acct_in":"⬦ Мой аккаунт","hero_desc":"История и здоровье в каждой капле. Холодный отжим из вековых деревьев сорта Chemlali в оливковых рощах Туниса — из поколения в поколение. Отмечено наградами на трёх континентах.","hero_cta1":"Открыть коллекцию","hero_cta2":"Для бизнеса","offers_ey":"Премиальное оливковое масло","offers_h":"Édition Prestige — избранные наборы","purity_lead_pre":"Кислотность ниже","cta_shop":"В магазин","cta_ws":"Опт","add_cart":"В корзину","incl_vat":"с НДС","unavail":"Временно недоступно","not_orderable":"Недоступно для заказа","cat_glass":"Стеклянная бутылка","cat_tin":"Жестяная банка","cat_gift":"Подарочное издание","menu_brand":"Бренд","menu_quality":"Качество и награды","lnk_story":"История","lnk_about":"О нас","lnk_mission":"Миссия","lnk_origin":"Происхождение · Тунис","lnk_discover":"Откройте Тунис","lnk_collection":"Коллекция","lnk_offers":"Премиальное оливковое масло","lnk_certified":"Сертифицированная чистота","lnk_certs":"Сертификаты и награды","lnk_intl":"Международные награды","lnk_ws":"Оптовики","lnk_dist":"Дистрибьюторы","lnk_pallet":"Конфигурация паллет","lnk_b2bshop":"B2B-магазин","w_products":"Продукция","acct_sub":"Доступ по коду · Вход · Регистрация","logout_sub":"Завершить сеанс","hs_ey":"Zembra la Romaine · Тунис","hs_title_a":"Там, где всё началось, — ","hs_title_b":"и ничего не забыто","hs_lead":"Среди каменистой почвы и морского воздуха растут оливковые деревья старше любого бренда. Из их плодов рождается Laperla Vestige — масло, которое не заявляет о происхождении, а доказывает его.","hs_text":"Каждый урожай следует ритму природы: собран вручную, отжат холодным способом в течение нескольких часов и сохранён нефильтрованным в самой чистой форме. Без компромиссов и коротких путей — только честное, чистое масло с полной прослеживаемостью до самого дерева.","hs_f1":"Моносортовое и нефильтрованное, единое происхождение","hs_f2":"От сбора до холодного отжима","hs_f3":"Сертифицировано, золотые награды мира","hs_bio":"Био","menu_brand_sub":"История · О нас · Миссия · Происхождение · Тунис","menu_collection_sub":"Продукция · Berlin Edition · Предложения","menu_quality_sub":"Ultra Purity · Сертификаты и награды","menu_b2b_sub":"Оптовики · Дистрибьюторы · Container","w_all":"Все","shop_h":"Коллекция","shop_sub":"","w_details":"Подробнее","lnk_editions":"Издания","lnk_berlin":"Berlin Edition","gate_award_count":"10+ международных наград","gate_retail_title":"Частный покупатель","gate_retail_desc":"Отборные бутылки Édition Prestige, доставленные прямо на ваш стол.","gate_wholesale_title":"Оптовая торговля","gate_wholesale_desc":"B2B-магазин, конфигуратор контейнеров, комиссионная модель & доступ для дилеров.","about_h":"О нас","about_p1":"Laperla Olive Oil — это оливковое масло высшего качества с происхождением, характером и международным признанием. Наш бренд соединяет силу тунисских оливковых рощ с современной премиальной презентацией для частных покупателей, деликатесных магазинов, гастрономии и оптовой торговли.","about_p2":"Каждая бутылка рассказывает о вековых оливковых деревьях, традиционном сборе урожая, тщательной переработке и стремлении представить оливковое масло не просто как продукт, а как ценный культурный артефакт. Laperla олицетворяет чистоту, вкус и доверие — видимые через международные награды, золотые медали и сертифицированное качество.","about_p3":"Наша цель — вывести тунисское премиальное оливковое масло на новый уровень: изысканное, честное, прослеживаемое и готовое для покупателей, которые хотят не только ощутить качество, но и понять его.","about_final":"Laperla Olive Oil — это больше, чем оливковое масло. Это происхождение, мастерство и элегантность в каждой бутылке.","mission_h2":"Миссия","mission_p1":"Наша миссия — представить тунисское премиальное оливковое масло с достоинством, качеством и международными амбициями. Laperla Olive Oil хочет показать, что настоящее оливковое масло — это нечто большее, чем продукт питания: это происхождение, культура, мастерство и доверие.","mission_p2":"Мы хотим предложить покупателям оливковое масло, которое убеждает своей чистотой, вкусом и прозрачностью. От старинных оливковых рощ через тщательную переработку до изысканной презентации — каждая бутылка выражает уважение к природе, традициям и людям, стоящим за этим продуктом.","mission_p3":"Наша задача — прочно позиционировать тунисское оливковое масло на международном рынке — для частных покупателей, деликатесных магазинов, гастрономии, отелей, оптовой торговли и дистрибьюторов. Laperla объединяет средиземноморскую историю с современным управлением премиальным брендом.","mission_final":"Наша миссия ясна: сделать качество видимым, создать доверие и нести тунисское оливковое масло как благородное культурное наследие в мир.","story_h2":"История","story_p1":"История Laperla Olive Oil начинается там, где оливковые деревья глубоко укоренились в земле на протяжении поколений. В тунисских рощах растут деревья, выдержавшие жару, ветер, каменистую почву и испытание временем. Из этого ландшафта рождается оливковое масло с характером, силой и природной элегантностью.","story_p2":"Laperla было создано, чтобы сделать это наследие видимым. Не как обычный товар на полке, а как премиальное оливковое масло с душой, происхождением и притяжением. Каждая бутылка призвана показать, что истинное качество не обязано быть громким — оно рождается из терпения, заботы, чистоты и уважения к природе.","story_p3":"Бренд объединяет традиционную культуру оливкового масла с современной подачей. Старинные оливковые рощи, тщательный сбор урожая, контролируемая переработка и международные награды формируют историю, которую покупатели могут увидеть, понять и почувствовать на вкус.","story_final":"Laperla Olive Oil рассказывает историю Туниса в изысканной форме: от дерева к бутылке, от традиции к мировому бренду.","award_eyebrow":"Награждено на трёх континентах","award_band_label":"Международные награды","award_band_sub":"Золотые медали и официальные сертификаты Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari и Афин — задокументированы международными жюри на трёх континентах.","award_band_btn":"Просмотреть все сертификаты","trust_awards":"Международные награды","trust_acid_l":"Кислотность","trust_poly_l":"мг/кг Полифенолы","trust_harvest_l":"От урожая до пресса","offers_subtitle":"Отборные наборы","offers_intro_strong":"Воплощение совершенства.","offers_intro_p":"Для людей с самыми высокими требованиями — отмеченных вечной элегантностью, исключительным качеством и неповторимым характером.","purity_cap":"Кислотность","purity_lead":"Кислотность ниже 0,3% — значительно лучше порога 0,8% для Extra Vergine. Холодный отжим в течение 4 часов после сбора урожая. Каждая капля — жидкое лекарство, богатое более 600 мг/кг полифенолов, защищающих сердце и иммунную систему.","purity_acid_l":"Кислотность","purity_poly_l":"мг/кг Полифенолы","purity_harvest_l":"От урожая до пресса","purity_tagline":"Защитите своё сердце. Боритесь с воспалениями — с природными полифенолами.","cert_eyebrow":"Сертифицированная чистота","cert_h2":"Органическое качество, официально задокументировано","cert1_micro":"Органический контрольный код · Тунис","cert1_p":"Органический код делает сертифицированное происхождение видимым и поддерживает чистую маркировку для профессиональной документации продукта.","cert2_p":"Сильный якорь доверия для органического качества, прослеживаемости и серьёзной коммуникации с торговцами и покупателями.","cert3_p":"Актуальный сигнал для международных рынков и групп покупателей, ожидающих органического качества по признанным стандартам.","heritage_ey":"Древнее оливковое наследие","heritage_h3":"Дерево у истоков","heritage_p":"Древнее оливковое дерево, скалистая почва и происхождение, наполняющее Laperla глубиной, временем и подлинностью.","reviews_kicker":"Отзывы покупателей · Customer Reviews · Avis Clients","reviews_h3":"Голоса со всего мира","reviews_sub":"Что сомелье, шеф-повара, торговцы деликатесами и ценители из 20+ стран говорят о Laperla.","reviews_avg_label":"Средняя оценка","reviews_count_label":"Проверенные отзывы","reviews_countries_label":"Страны","footer_legacy_h":"Присоединяйтесь к наследию","footer_legacy_p":"Где история и здоровье соединяются в каждой капле — от древней рощи до вашего стола."},"uk":{"nav_home":"Світ бренду","nav_shop":"Магазин · Колекція","nav_awards":"Нагороди","nav_gallery":"Галерея","nav_wholesale":"Опт · B2B-магазин","nav_config":"Конфігурація контейнера","nav_commission":"Комісійна модель","nav_dist":"Дистриб'ютори","nav_account":"Увійти / Зареєструватися","nav_dashboard":"Панель дилера","nav_logout":"Вийти","grp_discover":"Відкрийте","grp_business":"Для бізнесу","grp_account":"Обліковий запис","grp_service":"Сервіс","acct":"⬦ Обліковий запис","acct_in":"⬦ Мій обліковий запис","hero_desc":"Історія та здоров'я в кожній краплі. Холодний віджим зі столітніх дерев сорту Chemlali в оливкових гаях Тунісу — з покоління в покоління. Відзначено нагородами на трьох континентах.","hero_cta1":"Відкрити колекцію","hero_cta2":"Для бізнесу","offers_ey":"Преміальна оливкова олія","offers_h":"Édition Prestige — добірні набори","purity_lead_pre":"Кислотність нижче","cta_shop":"До магазину","cta_ws":"Опт","add_cart":"До кошика","incl_vat":"з ПДВ","unavail":"Тимчасово недоступно","not_orderable":"Недоступно для замовлення","cat_glass":"Скляна пляшка","cat_tin":"Металева банка","cat_gift":"Подарункове видання","menu_brand":"Бренд","menu_quality":"Якість і нагороди","lnk_story":"Історія","lnk_about":"Про нас","lnk_mission":"Місія","lnk_origin":"Походження · Туніс","lnk_discover":"Відкрийте Туніс","lnk_collection":"Колекція","lnk_offers":"Преміальна оливкова олія","lnk_certified":"Сертифікована чистота","lnk_certs":"Сертифікати та нагороди","lnk_intl":"Міжнародні нагороди","lnk_ws":"Оптовики","lnk_dist":"Дистриб'ютори","lnk_pallet":"Конфігурація палет","lnk_b2bshop":"B2B-магазин","w_products":"Продукція","acct_sub":"Доступ за кодом · Вхід · Реєстрація","logout_sub":"Завершити сеанс","hs_ey":"Zembra la Romaine · Туніс","hs_title_a":"Там, де все почалося, — ","hs_title_b":"і нічого не забуто","hs_lead":"Серед кам'янистого ґрунту та морського повітря ростуть оливкові дерева, старші за будь-який бренд. З їхніх плодів народжується Laperla Vestige — олія, що не заявляє про походження, а доводить його.","hs_text":"Кожен урожай слідує ритму природи: зібраний вручну, віджатий холодним способом протягом кількох годин і збережений нефільтрованим у найчистішій формі. Без компромісів і скорочень — лише чесна, чиста олія з повною простежуваністю аж до дерева.","hs_f1":"Моносортова та нефільтрована, єдине походження","hs_f2":"Від збору до холодного віджиму","hs_f3":"Сертифіковано, золоті нагороди світу","hs_bio":"Органічна","menu_brand_sub":"Історія · Про нас · Місія · Походження · Туніс","menu_collection_sub":"Продукція · Berlin Edition · Пропозиції","menu_quality_sub":"Ultra Purity · Сертифікати та нагороди","menu_b2b_sub":"Оптовики · Дистриб'ютори · Container","w_all":"Усі","shop_h":"Колекція","shop_sub":"","w_details":"Детальніше","lnk_editions":"Видання","lnk_berlin":"Berlin Edition","gate_award_count":"10+ міжнародних нагород","gate_retail_title":"Приватний покупець","gate_retail_desc":"Відібрані пляшки Édition Prestige, прямо до вашого столу.","gate_wholesale_title":"Оптова торгівля","gate_wholesale_desc":"B2B-магазин, конфігуратор контейнерів, комісійна модель & доступ для дилерів.","about_h":"Про нас","about_p1":"Laperla Olive Oil — це оливкова олія найвищої якості з походженням, характером та міжнародним визнанням. Наш бренд поєднує силу туніських оливкових гаїв із сучасною преміальною презентацією для приватних покупців, делікатесних магазинів, гастрономії та оптової торгівлі.","about_p2":"Кожна пляшка розповідає про вікові оливкові дерева, традиційний збір урожаю, ретельну переробку та прагнення представити оливкову олію не просто як продукт, а як цінний шматочок культури. Laperla уособлює чистоту, смак і довіру — видимі через міжнародні нагороди, золоті медалі та сертифіковану якість.","about_p3":"Наша мета — вивести туніську преміальну оливкову олію на новий рівень: вишукану, чесну, простежувану та готову для покупців, які хочуть не лише відчути якість, але й зрозуміти її.","about_final":"Laperla Olive Oil — це більше, ніж оливкова олія. Це походження, майстерність та елегантність у кожній пляшці.","mission_h2":"Місія","mission_p1":"Наша місія — представити туніську преміальну оливкову олію з гідністю, якістю та міжнародними амбіціями. Laperla Olive Oil хоче показати, що справжня оливкова олія — це більше, ніж продукт харчування: це походження, культура, майстерність і довіра.","mission_p2":"Ми хочемо запропонувати покупцям оливкову олію, яка переконує своєю чистотою, смаком та прозорістю. Від старовинних оливкових гаїв через ретельну переробку до вишуканої презентації — кожна пляшка виражає повагу до природи, традицій та людей, які стоять за цим продуктом.","mission_p3":"Наше завдання — міцно позиціонувати туніську оливкову олію на міжнародному ринку — для приватних покупців, делікатесних магазинів, гастрономії, готелів, оптової торгівлі та партнерів із розповсюдження. Laperla об'єднує середземноморську історію з сучасним управлінням преміальним брендом.","mission_final":"Наша місія чітка: зробити якість видимою, побудувати довіру та нести туніську оливкову олію як благородну культурну спадщину у світ.","story_h2":"Історія","story_p1":"Історія Laperla Olive Oil починається там, де оливкові дерева глибоко вкоренилися в землі протягом поколінь. У туніських гаях ростуть дерева, що витримали спеку, вітер, кам'янистий ґрунт та випробування часом. З цього ландшафту народжується оливкова олія з характером, силою та природною елегантністю.","story_p2":"Laperla було створено, щоб зробити цю спадщину видимою. Не як звичайний товар на полиці, а як преміальна оливкова олія з душею, походженням та притяганням. Кожна пляшка покликана показати, що справжня якість не обов'язково має бути гучною — вона народжується з терпіння, дбайливості, чистоти та поваги до природи.","story_p3":"Бренд поєднує традиційну культуру оливкової олії із сучасною подачею. Старовинні оливкові гаї, ретельний збір урожаю, контрольована переробка та міжнародні нагороди формують історію, яку покупці можуть побачити, зрозуміти та відчути на смак.","story_final":"Laperla Olive Oil розповідає історію Тунісу у вишуканій формі: від дерева до пляшки, від традиції до світового бренду.","award_eyebrow":"Нагороджено на трьох континентах","award_band_label":"Міжнародні нагороди","award_band_sub":"Золоті медалі та офіційні сертифікати Swiss Gold 2026, Miami, Abu Dhabi, Al Ain, Bari і Афін — задокументовані міжнародними журі на трьох континентах.","award_band_btn":"Переглянути всі сертифікати","trust_awards":"Міжнародні нагороди","trust_acid_l":"Кислотність","trust_poly_l":"мг/кг Поліфеноли","trust_harvest_l":"Від урожаю до пресу","offers_subtitle":"Відібрані набори","offers_intro_strong":"Вираження досконалості.","offers_intro_p":"Для людей з найвищими вимогами — позначених вічною елегантністю, виключною якістю та неповторним характером.","purity_cap":"Кислотність","purity_lead":"Кислотність нижче 0,3% — значно краще порогу 0,8% для Extra Vergine. Холодний віджим протягом 4 годин після збору врожаю. Кожна крапля — рідкі ліки, багаті більш ніж 600 мг/кг поліфенолів, що захищають серце та імунну систему.","purity_acid_l":"Кислотність","purity_poly_l":"мг/кг Поліфеноли","purity_harvest_l":"Від урожаю до пресу","purity_tagline":"Захистіть своє серце. Боріться із запаленнями — з природними поліфенолами.","cert_eyebrow":"Сертифікована чистота","cert_h2":"Органічна якість, офіційно задокументована","cert1_micro":"Органічний контрольний код · Туніс","cert1_p":"Органічний код робить сертифіковане походження видимим та підтримує чисте маркування для професійної документації продукту.","cert2_p":"Міцний якір довіри для органічної якості, простежуваності та серйозної комунікації з торговцями та покупцями.","cert3_p":"Актуальний сигнал для міжнародних ринків та груп покупців, які очікують органічної якості за визнаними стандартами.","heritage_ey":"Стародавня оливкова спадщина","heritage_h3":"Дерево у витоків","heritage_p":"Стародавнє оливкове дерево, кам'янистий ґрунт та походження, що наповнює Laperla глибиною, часом та автентичністю.","reviews_kicker":"Відгуки покупців · Customer Reviews · Avis Clients","reviews_h3":"Голоси з усього світу","reviews_sub":"Що сомельє, шеф-кухарі, торговці делікатесами та поціновувачі з 20+ країн кажуть про Laperla.","reviews_avg_label":"Середня оцінка","reviews_count_label":"Перевірені відгуки","reviews_countries_label":"Країни","footer_legacy_h":"Приєднайтеся до спадщини","footer_legacy_p":"Де історія та здоров'я поєднуються в кожній краплі — від стародавнього гаю до вашого столу."},"ar":{"nav_home":"عالم العلامة","nav_shop":"المتجر · المجموعة","nav_awards":"الجوائز","nav_gallery":"المعرض","nav_wholesale":"الجملة · متجر B2B","nav_config":"تكوين الحاوية","nav_commission":"نموذج العمولة","nav_dist":"شركاء التوزيع","nav_account":"تسجيل الدخول / التسجيل","nav_dashboard":"لوحة التاجر الخاصة بي","nav_logout":"تسجيل الخروج","grp_discover":"اكتشف","grp_business":"عملاء الأعمال","grp_account":"الحساب","grp_service":"الخدمة","acct":"⬦ الحساب","acct_in":"⬦ حسابي","hero_desc":"تاريخ وصحة في كل قطرة. معصور على البارد من أشجار الشملالي العريقة في بساتين تونس، منذ أجيال. حائز على جوائز في ثلاث قارات.","hero_cta1":"اكتشف المجموعة","hero_cta2":"للشركات","offers_ey":"زيت زيتون فاخر","offers_h":"Édition Prestige — أطقم مختارة","purity_lead_pre":"حموضة أقل من","cta_shop":"إلى المتجر","cta_ws":"الجملة","add_cart":"أضف إلى السلة","incl_vat":"شامل الضريبة","unavail":"غير متوفر حالياً","not_orderable":"غير قابل للطلب","cat_glass":"زجاجة","cat_tin":"عبوة معدنية","cat_gift":"إصدار الهدايا","menu_brand":"العلامة","menu_quality":"الجودة والجوائز","lnk_story":"القصة","lnk_about":"من نحن","lnk_mission":"المهمة","lnk_origin":"المنشأ · تونس","lnk_discover":"اكتشف تونس","lnk_collection":"المجموعة","lnk_offers":"زيت زيتون فاخر","lnk_certified":"نقاء معتمد","lnk_certs":"الشهادات والجوائز","lnk_intl":"جوائز دولية","lnk_ws":"تجار الجملة","lnk_dist":"شركاء التوزيع","lnk_pallet":"تكوين المنصات","lnk_b2bshop":"متجر B2B","w_products":"المنتجات","acct_sub":"دخول برمز · تسجيل الدخول · التسجيل","logout_sub":"إنهاء الجلسة","hs_ey":"Zembra la Romaine · تونس","hs_title_a":"حيث بدأ كل شيء — ","hs_title_b":"ولم يُنسَ شيء","hs_lead":"بين التربة الصخرية ونسيم البحر تنمو أشجار زيتون أقدم من أي علامة تجارية. من ثمارها يولد Laperla Vestige — زيت لا يدّعي أصله، بل يثبته.","hs_text":"كل حصاد يتبع إيقاع الطبيعة: يُقطف يدوياً، ويُعصر على البارد خلال ساعات قليلة، ويُحفظ دون ترشيح في أنقى صوره. لا تنازلات ولا طرق مختصرة — فقط زيت نقي وصادق بإمكانية تتبع كاملة حتى الشجرة.","hs_f1":"صنف واحد وغير مرشّح من مصدر واحد","hs_f2":"من الحصاد إلى العصر البارد","hs_f3":"معتمد وحائز على الذهب دولياً","hs_bio":"عضوي","menu_brand_sub":"القصة · من نحن · المهمة · المنشأ · تونس","menu_collection_sub":"المنتجات · Berlin Edition · العروض","menu_quality_sub":"Ultra Purity · الشهادات والجوائز","menu_b2b_sub":"تجار الجملة · شركاء التوزيع · Container","w_all":"الكل","shop_h":"المجموعة","shop_sub":"","w_details":"عرض التفاصيل","lnk_editions":"إصدارات","lnk_berlin":"Berlin Edition","gate_award_count":"10+ جوائز دولية","gate_retail_title":"عميل خاص","gate_retail_desc":"زجاجات مختارة بعناية من Édition Prestige، مباشرةً إلى مائدتكم.","gate_wholesale_title":"الجملة","gate_wholesale_desc":"متجر B2B، منشئ تكوين الحاوية، نموذج العمولة ووصول الموزعين.","about_h":"من نحن","about_p1":"يمثل Laperla Olive Oil زيت زيتون عالي الجودة بأصل وشخصية واعتراف دولي. تجمع علامتنا التجارية قوة بساتين الزيتون التونسية مع عرض بريميوم عصري للعملاء الخاصين، ومحلات المأكولات الفاخرة، والمطاعم الراقية، وتجارة الجملة.","about_p2":"كل زجاجة تحكي عن أشجار زيتون عريقة، وحصاد تقليدي، ومعالجة دقيقة، وطموح لتقديم زيت الزيتون ليس فقط منتجاً، بل قطعة ثقافية ثمينة. يرمز لابيرلا إلى النقاء والنكهة والثقة — ظاهرة من خلال الجوائز الدولية وميداليات الذهب والجودة المعتمدة.","about_p3":"هدفنا هو الارتقاء بزيت الزيتون التونسي المميز إلى مستوى جديد: راقٍ، صادق، قابل للتتبع، وجاهز للعملاء الذين لا يريدون فقط تذوق الجودة، بل فهمها أيضاً.","about_final":"لابيرلا أوليف أويل أكثر من مجرد زيت زيتون. إنه أصل وحرفة وأناقة في كل زجاجة.","mission_h2":"المهمة","mission_p1":"مهمتنا هي تقديم زيت الزيتون التونسي المميز بكرامة وجودة وطموح دولي. يهدف Laperla Olive Oil إلى إظهار أن زيت الزيتون الحقيقي أكثر من مجرد غذاء — إنه أصل وثقافة وحرفة وثقة.","mission_p2":"نريد تقديم زيت زيتون للعملاء يُقنع بنقائه ونكهته وشفافيته. من البساتين العريقة عبر المعالجة الدقيقة حتى العرض الراقي، تمثل كل زجاجة احتراماً للطبيعة والتراث والأشخاص الذين يقفون وراء هذا المنتج.","mission_p3":"مهمتنا هي تحديد موقع زيت الزيتون التونسي بقوة في السوق الدولية — للعملاء الخاصين، ومحلات المأكولات الفاخرة، والمطاعم الراقية، والفنادق، وتجارة الجملة، وشركاء التوزيع. يجمع لابيرلا التاريخ المتوسطي مع إدارة العلامات التجارية الراقية الحديثة.","mission_final":"مهمتنا واضحة: جعل الجودة مرئية وبناء الثقة وحمل زيت الزيتون التونسي كتراث ثقافي نبيل إلى العالم.","story_h2":"القصة","story_p1":"تبدأ قصة لابيرلا أوليف أويل حيث تتجذر أشجار الزيتون في الأرض منذ أجيال. في البساتين التونسية تنمو أشجار صمدت أمام الحرارة والريح والتربة الصخرية واختبار الزمن. من هذا المشهد يولد زيت زيتون بشخصية وقوة وأناقة طبيعية.","story_p2":"أُنشئ لابيرلا لجعل هذا الإرث مرئياً. ليس كمنتج عادي على الرف، بل كزيت زيتون بريميوم بروح وأصل وإشعاع. كل زجاجة تهدف إلى إظهار أن الجودة الحقيقية لا يجب أن تكون صاخبة — تنبع من الصبر والعناية والنقاء والاحترام للطبيعة.","story_p3":"تجمع العلامة التجارية بين ثقافة زيت الزيتون التقليدية والعرض الحديث. تشكّل البساتين العريقة والحصاد الدقيق والمعالجة المضبوطة والجوائز الدولية قصة يمكن للعملاء رؤيتها وفهمها وتذوقها.","story_final":"يحكي لابيرلا أوليف أويل قصة تونس بشكل راقٍ: من الشجرة إلى الزجاجة، ومن التراث إلى العلامة التجارية العالمية.","award_eyebrow":"حائز على جوائز في ثلاث قارات","award_band_label":"جوائز دولية","award_band_sub":"ميداليات ذهبية وشهادات رسمية من Swiss Gold 2026، وميامي، وأبوظبي، والعين، وباري، وأثينا — موثقة بوضوح من قبل لجان تحكيم دولية في ثلاث قارات.","award_band_btn":"عرض جميع الشهادات","trust_awards":"جوائز دولية","trust_acid_l":"الحموضة","trust_poly_l":"ملغ/كغ البوليفينولات","trust_harvest_l":"من الحصاد إلى العصر","offers_subtitle":"أطقم مختارة","offers_intro_strong":"تعبير عن التميز.","offers_intro_p":"للأشخاص ذوي أعلى المعايير — يتسمون بالأناقة الخالدة والجودة الاستثنائية والشخصية المميزة.","purity_cap":"الحموضة","purity_lead":"حموضة أقل من 0.3٪ — أفضل بكثير من الحد الأقصى البالغ 0.8٪ للزيت البكر الممتاز. معصور على البارد في غضون 4 ساعات من الحصاد. كل قطرة دواء سائل، غنية بأكثر من 600 ملغ/كغ من البوليفينولات التي تحمي القلب والجهاز المناعي.","purity_acid_l":"الحموضة","purity_poly_l":"ملغ/كغ البوليفينولات","purity_harvest_l":"من الحصاد إلى العصر","purity_tagline":"احمِ قلبك. قاوم الالتهابات — بالبوليفينولات الطبيعية.","cert_eyebrow":"نقاء معتمد","cert_h2":"جودة عضوية، موثقة رسمياً","cert1_micro":"رمز التحكم العضوي · تونس","cert1_p":"يجعل رمز العضوية الأصل المعتمد مرئياً ويدعم التسمية النظيفة للتوثيق الاحترافي للمنتج.","cert2_p":"مرساة ثقة قوية للجودة العضوية وإمكانية التتبع والتواصل الجدي مع تجار التجزئة والعملاء.","cert3_p":"إشارة ذات صلة للأسواق الدولية ومجموعات المشترين التي تتوقع جودة عضوية وفق معايير معترف بها.","heritage_ey":"تراث الزيتون العريق","heritage_h3":"الشجرة في الأصل","heritage_p":"شجرة زيتون عريقة وتربة صخرية وأصل يمنح لابيرلا العمق والزمن والأصالة.","reviews_kicker":"تقييمات العملاء · Customer Reviews · Avis Clients","reviews_h3":"أصوات من حول العالم","reviews_sub":"ما يقوله خبراء التذوق والطهاة وتجار المأكولات الفاخرة والمتذوقون من أكثر من 20 دولة عن لابيرلا.","reviews_avg_label":"متوسط التقييم","reviews_count_label":"تقييمات موثقة","reviews_countries_label":"الدول","footer_legacy_h":"انضم إلى الإرث","footer_legacy_p":"حيث يتحد التاريخ والصحة في كل قطرة — من البستان العريق إلى مائدتكم."},"ja":{"nav_home":"ブランドの世界","nav_shop":"ショップ · コレクション","nav_awards":"受賞歴","nav_gallery":"ギャラリー","nav_wholesale":"卸売 · B2Bショップ","nav_config":"コンテナ構成","nav_commission":"コミッションモデル","nav_dist":"販売パートナー","nav_account":"ログイン / 登録","nav_dashboard":"ディーラーダッシュボード","nav_logout":"ログアウト","grp_discover":"発見する","grp_business":"法人のお客様","grp_account":"アカウント","grp_service":"サービス","acct":"⬦ アカウント","acct_in":"⬦ マイアカウント","hero_desc":"一滴一滴に歴史と健康を。チュニジアの畑に育つ古木のChemlaliオリーブから、世代を超えてコールドプレスで搾油。三大陸で受賞。","hero_cta1":"コレクションを見る","hero_cta2":"法人のお客様へ","offers_ey":"プレミアム オリーブオイル","offers_h":"Édition Prestige — 厳選セット","purity_lead_pre":"酸度 最大","cta_shop":"ショップへ","cta_ws":"卸売","add_cart":"カートに入れる","incl_vat":"税込","unavail":"現在在庫切れ","not_orderable":"ご注文いただけません","cat_glass":"ガラスボトル","cat_tin":"メタル缶","cat_gift":"ギフトエディション","menu_brand":"ブランド","menu_quality":"品質と受賞","lnk_story":"ストーリー","lnk_about":"私たちについて","lnk_mission":"ミッション","lnk_origin":"産地 · チュニジア","lnk_discover":"チュニジアを知る","lnk_collection":"コレクション","lnk_offers":"プレミアム オリーブオイル","lnk_certified":"認証された純度","lnk_certs":"認証と受賞","lnk_intl":"国際的な受賞歴","lnk_ws":"卸売業者","lnk_dist":"販売パートナー","lnk_pallet":"パレット構成","lnk_b2bshop":"B2Bショップ","w_products":"製品","acct_sub":"コードアクセス · ログイン · 登録","logout_sub":"セッションを終了","hs_ey":"Zembra la Romaine · チュニジア","hs_title_a":"すべてが始まった場所 — ","hs_title_b":"何ひとつ忘れられていない","hs_lead":"岩の大地と海風のあいだに、どのブランドよりも古いオリーブの木々が育ちます。その果実から生まれるLaperla Vestigeは、産地を語るのではなく、品質で証明するオイルです。","hs_text":"収穫はすべて自然のリズムに従います。手摘みで収穫し、数時間以内にコールドプレスで搾油、無濾過のまま最も純粋な姿で瓶詰めします。妥協も近道もなく、木まで完全に遡れる、誠実でクリーンなオイルだけをお届けします。","hs_f1":"単一品種・無濾過・単一産地","hs_f2":"収穫からコールドプレスまで","hs_f3":"認証取得・国際金賞受賞","hs_bio":"オーガニック","menu_brand_sub":"ストーリー · 私たちについて · ミッション · 産地 · チュニジア","menu_collection_sub":"製品 · Berlin Edition · オファー","menu_quality_sub":"Ultra Purity · 認証と受賞","menu_b2b_sub":"卸売業者 · 販売パートナー · Container","w_all":"すべて","shop_h":"コレクション","shop_sub":"","w_details":"詳細を見る","lnk_editions":"エディション","lnk_berlin":"Berlin Edition","gate_award_count":"10以上の国際的な受賞","gate_retail_title":"個人のお客様","gate_retail_desc":"Édition Prestigeの厳選ボトルを、直接お客様の食卓へ。","gate_wholesale_title":"卸売","gate_wholesale_desc":"B2Bショップ、コンテナコンフィギュレーター、コミッションモデル＆ディーラーアクセス。","about_h":"私たちについて","about_p1":"Laperla Olive Oilは、産地、個性、そして国際的な評価を持つ高品質なオリーブオイルを象徴しています。私たちのブランドは、チュニジアのオリーブ農園の力と、個人のお客様、高級食品店、ガストロノミー、卸売業向けのモダンなプレミアムプレゼンテーションを組み合わせています。","about_p2":"すべてのボトルは、古いオリーブの木々、伝統的な収穫、丁寧な製造、そしてオリーブオイルを単なる製品としてではなく、貴重な文化の一片として提示するという野心を物語っています。Laperlaは、国際的な受賞、金メダル、認定された品質を通じて見える純粋さ、風味、信頼を体現しています。","about_p3":"私たちの目標は、チュニジアのプレミアムオリーブオイルを新しいレベルへと高めること：洗練された、誠実な、追跡可能な、そして品質を味わうだけでなく理解したいお客様のための製品。","about_final":"Laperla Olive Oilはオリーブオイル以上のものです。すべてのボトルに宿る産地、職人技、そして優雅さです。","mission_h2":"ミッション","mission_p1":"私たちのミッションは、品位、品質、国際的な野心を持ってチュニジアのプレミアムオリーブオイルを紹介することです。Laperla Olive Oilは、本物のオリーブオイルが食品以上のものであることを示したいと考えています — それは産地、文化、職人技、そして信頼です。","mission_p2":"私たちは、純粋さ、風味、透明性によって納得させるオリーブオイルをお客様に提供したいと思っています。古いオリーブ農園から丁寧な製造を経て洗練されたプレゼンテーションまで、すべてのボトルは自然、伝統、そしてこの製品の背後にある人々への敬意を表しています。","mission_p3":"私たちの使命は、チュニジアのオリーブオイルを国際市場で強力に位置づけることです — 個人のお客様、高級食品店、ガストロノミー、ホテル、卸売業、および流通パートナーに向けて。Laperlaは地中海の歴史と現代のプレミアムブランドマネジメントを結びつけています。","mission_final":"私たちのミッションは明確です：品質を可視化し、信頼を構築し、チュニジアのオリーブオイルを高貴な文化遺産として世界へ。","story_h2":"ストーリー","story_p1":"Laperla Olive Oilの物語は、オリーブの木々が何世代にもわたって大地に深く根ざしている場所から始まります。チュニジアの農園では、熱さ、風、岩石地帯、そして時の試練に耐えてきた木々が育っています。この風景から、個性、力、そして自然の優雅さを持つオリーブオイルが生まれます。","story_p2":"Laperlaは、この遺産を目に見えるものにするために作られました。棚の上の普通の製品としてではなく、魂、産地、輝きを持つプレミアムオリーブオイルとして。すべてのボトルは、本物の品質は声高である必要はないことを示すことを意図しています — それは忍耐、細心の注意、純粋さ、自然への敬意から生まれます。","story_p3":"ブランドは伝統的なオリーブオイル文化と現代的なプレゼンテーションを組み合わせています。古いオリーブ農園、丁寧な収穫、管理された製造、国際的な受賞が、お客様が見て、理解して、味わえる物語を形成しています。","story_final":"Laperla Olive Oilは、洗練された形でチュニジアの物語を語ります：木からボトルへ、伝統からグローバルブランドへ。","award_eyebrow":"三大陸で受賞","award_band_label":"国際的な受賞","award_band_sub":"Swiss Gold 2026、マイアミ、アブダビ、アル・アイン、バーリ、アテネからの金メダルと公式証明書 — 三大陸の国際審査員団によって明確に文書化されています。","award_band_btn":"すべての証明書を見る","trust_awards":"国際的な受賞","trust_acid_l":"酸度","trust_poly_l":"mg/kg ポリフェノール","trust_harvest_l":"収穫からプレスまで","offers_subtitle":"厳選セット","offers_intro_strong":"卓越性の表現。","offers_intro_p":"最高の基準を持つ人々のために — 時代を超えた優雅さ、卓越した品質、独特の個性を特徴とする。","purity_cap":"酸度","purity_lead":"酸度0.3%未満 — エクストラバージンの0.8%基準を大幅に上回る品質。収穫後4時間以内にコールドプレス。すべての一滴は液体の薬であり、心臓と免疫システムを守る600mg/kg以上のポリフェノールが豊富です。","purity_acid_l":"酸度","purity_poly_l":"mg/kg ポリフェノール","purity_harvest_l":"収穫からプレスまで","purity_tagline":"心臓を守りましょう。炎症と戦いましょう — 天然ポリフェノールで。","cert_eyebrow":"認証された純度","cert_h2":"有機品質、公式に文書化","cert1_micro":"有機管理コード · チュニジア","cert1_p":"有機コードは認証された産地を可視化し、専門的な製品文書のためのクリーンなラベリングをサポートします。","cert2_p":"有機品質、トレーサビリティ、小売業者と顧客への真剣なコミュニケーションのための強力な信頼の錨。","cert3_p":"認識された基準に従った有機品質を期待する国際市場と購買グループのための関連シグナル。","heritage_ey":"古代オリーブの遺産","heritage_h3":"起源の木","heritage_p":"古代のオリーブの木、岩石地帯の土壌、そしてLaperlaに深み、時間、真正性を与える産地。","reviews_kicker":"顧客レビュー · Customer Reviews · Avis Clients","reviews_h3":"世界からの声","reviews_sub":"20か国以上のソムリエ、シェフ、高級食品小売業者、愛好家がLaperlaについて言っていること。","reviews_avg_label":"平均評価","reviews_count_label":"認証済みレビュー","reviews_countries_label":"国","footer_legacy_h":"遺産に参加する","footer_legacy_p":"すべての一滴に歴史と健康が融合する場所 — 古代の農園からあなたの食卓まで。"},"zh":{"nav_home":"品牌世界","nav_shop":"商店 · 系列","nav_awards":"奖项","nav_gallery":"画廊","nav_wholesale":"批发 · B2B商店","nav_config":"集装箱配置","nav_commission":"佣金模式","nav_dist":"分销合作伙伴","nav_account":"登录 / 注册","nav_dashboard":"我的经销商面板","nav_logout":"退出登录","grp_discover":"探索","grp_business":"企业客户","grp_account":"账户","grp_service":"服务","acct":"⬦ 账户","acct_in":"⬦ 我的账户","hero_desc":"每一滴都蕴含历史与健康。源自突尼斯橄榄园中古老的Chemlali橄榄树，世代相传，冷压萃取。荣获三大洲奖项。","hero_cta1":"探索系列","hero_cta2":"企业客户","offers_ey":"高级橄榄油","offers_h":"Édition Prestige — 精选套装","purity_lead_pre":"酸度低于","cta_shop":"前往商店","cta_ws":"批发","add_cart":"加入购物车","incl_vat":"含增值税","unavail":"暂时缺货","not_orderable":"暂不可订购","cat_glass":"玻璃瓶","cat_tin":"金属罐","cat_gift":"礼品版","menu_brand":"品牌","menu_quality":"品质与奖项","lnk_story":"品牌故事","lnk_about":"关于我们","lnk_mission":"使命","lnk_origin":"产地 · 突尼斯","lnk_discover":"探索突尼斯","lnk_collection":"产品系列","lnk_offers":"高级橄榄油","lnk_certified":"认证纯度","lnk_certs":"证书与奖项","lnk_intl":"国际奖项","lnk_ws":"批发商","lnk_dist":"分销合作伙伴","lnk_pallet":"托盘配置","lnk_b2bshop":"B2B商店","w_products":"产品","acct_sub":"代码访问 · 登录 · 注册","logout_sub":"结束会话","hs_ey":"Zembra la Romaine · 突尼斯","hs_title_a":"一切的起点 — ","hs_title_b":"传承从未被遗忘","hs_lead":"在岩石土壤与海风之间，生长着比任何品牌都古老的橄榄树。它们的果实孕育出Laperla Vestige——一款不空谈产地、而以品质证明产地的橄榄油。","hs_text":"每一次采收都遵循自然的节奏：手工采摘，数小时内冷压萃取，未经过滤，保留最纯净的形态。没有妥协，没有捷径——只有诚实、纯净、可全程追溯至每一棵树的橄榄油。","hs_f1":"单一品种，未经过滤，单一产地","hs_f2":"从采收到冷压萃取","hs_f3":"权威认证，国际金奖","hs_bio":"有机","menu_brand_sub":"品牌故事 · 关于我们 · 使命 · 产地 · 突尼斯","menu_collection_sub":"产品 · Berlin Edition · 优惠","menu_quality_sub":"Ultra Purity · 证书与奖项","menu_b2b_sub":"批发商 · 分销合作伙伴 · Container","w_all":"全部","shop_h":"产品系列","shop_sub":"","w_details":"查看详情","lnk_editions":"版本","lnk_berlin":"Berlin Edition","gate_award_count":"10+项国际大奖","gate_retail_title":"个人客户","gate_retail_desc":"精选Édition Prestige系列瓶装，直接送达您的餐桌。","gate_wholesale_title":"批发","gate_wholesale_desc":"B2B商店、集装箱配置器、佣金模式及经销商访问权限。","about_h":"关于我们","about_p1":"Laperla Olive Oil代表着具有产地、特色和国际认可度的高品质橄榄油。我们的品牌将突尼斯橄榄园的力量与面向个人客户、精品食品店、美食餐饮和批发贸易的现代高端展示相结合。","about_p2":"每一瓶都讲述着古老橄榄树、传统采摘、精心加工的故事，以及将橄榄油呈现为不仅是产品，更是珍贵文化片段的雄心。Laperla代表着纯净、风味和信任——通过国际奖项、金牌和认证品质彰显。","about_p3":"我们的目标是将突尼斯高端橄榄油提升到新的水平：精致、诚实、可追溯，并为那些不仅想品味品质还想理解品质的客户而准备。","about_final":"Laperla Olive Oil不仅仅是橄榄油。它是每一瓶中的产地、工艺和优雅。","mission_h2":"使命","mission_p1":"我们的使命是以尊严、品质和国际抱负呈现突尼斯高端橄榄油。Laperla Olive Oil旨在证明真正的橄榄油不仅仅是食品——它是产地、文化、工艺和信任。","mission_p2":"我们希望为客户提供一款以纯净、风味和透明度打动人心的橄榄油。从古老的橄榄园到精心加工再到精美呈现，每一瓶都体现着对自然、传统以及这一产品背后的人们的尊重。","mission_p3":"我们的任务是将突尼斯橄榄油在国际市场上强力定位——面向个人客户、精品食品店、美食餐饮、酒店、批发和分销合作伙伴。Laperla将地中海历史与现代高端品牌管理相结合。","mission_final":"我们的使命明确：让品质可见，建立信任，将突尼斯橄榄油作为高贵的文化遗产带向世界。","story_h2":"品牌故事","story_p1":"Laperla Olive Oil的故事始于橄榄树世代深根于土地之处。在突尼斯的橄榄园里，生长着经历了炎热、风沙、岩石地和时间考验的树木。从这片土地上诞生了一款具有个性、力量和自然优雅的橄榄油。","story_p2":"Laperla的创立是为了让这一遗产变得可见。不是作为货架上的普通产品，而是一款具有灵魂、产地和光彩的高端橄榄油。每一瓶都旨在表明，真正的品质不必喧嚣——它源于耐心、细心、纯净和对自然的尊重。","story_p3":"该品牌将传统橄榄油文化与现代展示相结合。古老的橄榄园、精心采摘、受控加工和国际奖项构成了一个客户可以看见、理解和品味的故事。","story_final":"Laperla Olive Oil以精致的形式讲述突尼斯的故事：从树到瓶，从传统到世界品牌。","award_eyebrow":"荣获三大洲奖项","award_band_label":"国际奖项","award_band_sub":"来自Swiss Gold 2026、迈阿密、阿布扎比、艾因、巴里和雅典的金牌和官方证书——由三大洲国际评委会清晰记录。","award_band_btn":"查看所有证书","trust_awards":"国际奖项","trust_acid_l":"酸度","trust_poly_l":"mg/kg 多酚","trust_harvest_l":"从采摘到榨取","offers_subtitle":"精选套装","offers_intro_strong":"卓越品质的体现。","offers_intro_p":"为具有最高标准的人士而设——以永恒的优雅、卓越的品质和独特的个性为特征。","purity_cap":"酸度","purity_lead":"酸度低于0.3%——远优于特级初榨橄榄油0.8%的标准。采摘后4小时内冷压。每一滴都是液态良药，富含超过600mg/kg的多酚，保护心脏和免疫系统。","purity_acid_l":"酸度","purity_poly_l":"mg/kg 多酚","purity_harvest_l":"从采摘到榨取","purity_tagline":"保护您的心脏。对抗炎症——用天然多酚。","cert_eyebrow":"认证纯度","cert_h2":"有机品质，官方记录","cert1_micro":"有机控制码 · 突尼斯","cert1_p":"有机码使认证产地清晰可见，支持专业产品文档的清洁标签。","cert2_p":"有机品质、可追溯性以及与零售商和客户进行认真沟通的强大信任锚。","cert3_p":"对国际市场和期望符合公认标准有机品质的买家群体的相关信号。","heritage_ey":"古老橄榄遗产","heritage_h3":"源头之树","heritage_p":"一棵古老的橄榄树、岩石土壤和赋予Laperla深度、时间和真实性的产地。","reviews_kicker":"客户评价 · Customer Reviews · Avis Clients","reviews_h3":"来自世界各地的声音","reviews_sub":"来自20多个国家的侍酒师、厨师长、精品食品零售商和鉴赏家对Laperla的评价。","reviews_avg_label":"平均评分","reviews_count_label":"认证评价","reviews_countries_label":"国家","footer_legacy_h":"加入这份传承","footer_legacy_p":"历史与健康在每一滴中融合——从古老的橄榄园到您的餐桌。"},"ko":{"nav_home":"브랜드 세계","nav_shop":"숍 · 컬렉션","nav_awards":"수상 내역","nav_gallery":"갤러리","nav_wholesale":"도매 · B2B 숍","nav_config":"컨테이너 구성","nav_commission":"커미션 모델","nav_dist":"유통 파트너","nav_account":"로그인 / 회원가입","nav_dashboard":"딜러 대시보드","nav_logout":"로그아웃","grp_discover":"둘러보기","grp_business":"기업 고객","grp_account":"계정","grp_service":"서비스","acct":"⬦ 계정","acct_in":"⬦ 내 계정","hero_desc":"한 방울마다 역사와 건강을 담았습니다. 튀니지 올리브 밭의 오래된 Chemlali 나무에서 대대로 콜드프레스 방식으로 얻은 오일. 3개 대륙에서 수상했습니다.","hero_cta1":"컬렉션 보기","hero_cta2":"기업 고객","offers_ey":"프리미엄 올리브 오일","offers_h":"Édition Prestige — 큐레이티드 세트","purity_lead_pre":"산도 최대","cta_shop":"숍으로","cta_ws":"도매","add_cart":"장바구니에 담기","incl_vat":"부가세 포함","unavail":"일시 품절","not_orderable":"주문 불가","cat_glass":"유리병","cat_tin":"메탈 캔","cat_gift":"기프트 에디션","menu_brand":"브랜드","menu_quality":"품질 및 수상","lnk_story":"스토리","lnk_about":"회사 소개","lnk_mission":"미션","lnk_origin":"원산지 · 튀니지","lnk_discover":"튀니지 둘러보기","lnk_collection":"컬렉션","lnk_offers":"프리미엄 올리브 오일","lnk_certified":"인증된 순도","lnk_certs":"인증서 및 수상","lnk_intl":"국제 수상","lnk_ws":"도매업체","lnk_dist":"유통 파트너","lnk_pallet":"팔레트 구성","lnk_b2bshop":"B2B 숍","w_products":"제품","acct_sub":"코드 액세스 · 로그인 · 가입","logout_sub":"세션 종료","hs_ey":"Zembra la Romaine · 튀니지","hs_title_a":"모든 것이 시작된 곳 — ","hs_title_b":"그리고 아무것도 잊히지 않았습니다","hs_lead":"바위투성이 땅과 바닷바람 사이에서 어떤 브랜드보다 오래된 올리브나무가 자랍니다. 그 열매에서 태어난 Laperla Vestige는 원산지를 주장하는 것이 아니라 증명하는 오일입니다.","hs_text":"모든 수확은 자연의 리듬을 따릅니다. 손으로 수확하여 몇 시간 안에 콜드프레스로 착유하고, 여과하지 않은 가장 순수한 형태로 담습니다. 타협도 지름길도 없이, 나무까지 완전히 추적 가능한 정직하고 깨끗한 오일만을 전합니다.","hs_f1":"단일 품종 · 무여과 · 단일 원산지","hs_f2":"수확부터 콜드프레스까지","hs_f3":"인증 획득 · 국제 금상 수상","hs_bio":"유기농","menu_brand_sub":"스토리 · 회사 소개 · 미션 · 원산지 · 튀니지","menu_collection_sub":"제품 · Berlin Edition · 프로모션","menu_quality_sub":"Ultra Purity · 인증서 및 수상","menu_b2b_sub":"도매업체 · 유통 파트너 · Container","w_all":"전체","shop_h":"컬렉션","shop_sub":"","w_details":"상세 보기","lnk_editions":"에디션","lnk_berlin":"Berlin Edition","gate_award_count":"10개 이상의 국제 수상","gate_retail_title":"개인 고객","gate_retail_desc":"Édition Prestige의 엄선된 병을 식탁으로 직접 배달.","gate_wholesale_title":"도매","gate_wholesale_desc":"B2B 숍, 컨테이너 구성기, 커미션 모델 및 딜러 접근.","about_h":"회사 소개","about_p1":"Laperla Olive Oil은 원산지, 개성, 국제적 인정을 갖춘 고품질 올리브 오일을 대표합니다. 우리 브랜드는 튀니지 올리브 농원의 힘을 개인 고객, 고급 식품점, 미식 업계, 도매업을 위한 현대적인 프리미엄 프레젠테이션과 결합합니다.","about_p2":"모든 병은 오래된 올리브 나무, 전통적인 수확, 정성스러운 가공, 그리고 올리브 오일을 단순한 제품이 아닌 귀중한 문화 조각으로 선보이려는 포부를 이야기합니다. Laperla는 국제 수상, 금메달, 인증된 품질을 통해 가시적으로 드러나는 순수함, 풍미, 신뢰를 나타냅니다.","about_p3":"우리의 목표는 튀니지 프리미엄 올리브 오일을 새로운 수준으로 끌어올리는 것입니다: 정제되고, 정직하고, 추적 가능하며, 품질을 맛볼 뿐 아니라 이해하고 싶은 고객을 위해 준비된.","about_final":"Laperla Olive Oil은 단순한 올리브 오일 그 이상입니다. 모든 병 속에 담긴 원산지, 장인 정신, 우아함입니다.","mission_h2":"미션","mission_p1":"우리의 미션은 품위, 품질, 국제적 포부로 튀니지 프리미엄 올리브 오일을 선보이는 것입니다. Laperla Olive Oil은 진정한 올리브 오일이 식품 이상이라는 것을 보여주고자 합니다 — 그것은 원산지, 문화, 장인 정신, 신뢰입니다.","mission_p2":"우리는 순수함, 풍미, 투명성으로 납득시키는 올리브 오일을 고객에게 제공하고 싶습니다. 오래된 올리브 농원에서 정성스러운 가공을 거쳐 정제된 프레젠테이션까지, 모든 병은 자연, 전통, 그리고 이 제품 뒤에 있는 사람들에 대한 존중을 나타냅니다.","mission_p3":"우리의 과제는 튀니지 올리브 오일을 국제 시장에서 강하게 포지셔닝하는 것입니다 — 개인 고객, 고급 식품점, 미식 업계, 호텔, 도매업, 유통 파트너를 위해. Laperla는 지중해 역사를 현대적인 프리미엄 브랜드 관리와 연결합니다.","mission_final":"우리의 미션은 명확합니다: 품질을 가시화하고, 신뢰를 쌓고, 튀니지 올리브 오일을 고귀한 문화 유산으로 세계에 전하는 것.","story_h2":"스토리","story_p1":"Laperla Olive Oil의 이야기는 올리브 나무가 세대에 걸쳐 대지에 깊이 뿌리를 내린 곳에서 시작됩니다. 튀니지의 농원에서는 열기, 바람, 암석 토양, 시간의 시험을 견뎌온 나무들이 자랍니다. 이 풍경에서 개성, 힘, 자연의 우아함을 지닌 올리브 오일이 탄생합니다.","story_p2":"Laperla는 이 유산을 가시화하기 위해 만들어졌습니다. 선반 위의 평범한 제품이 아닌, 영혼, 원산지, 광채를 지닌 프리미엄 올리브 오일로서. 모든 병은 진정한 품질이 요란할 필요가 없다는 것을 보여주려는 의도로 만들어졌습니다 — 인내, 세심함, 순수함, 자연에 대한 존중에서 탄생합니다.","story_p3":"브랜드는 전통적인 올리브 오일 문화와 현대적인 프레젠테이션을 결합합니다. 오래된 올리브 농원, 정성스러운 수확, 통제된 가공, 국제 수상이 고객이 보고, 이해하고, 맛볼 수 있는 이야기를 형성합니다.","story_final":"Laperla Olive Oil은 세련된 형태로 튀니지의 이야기를 전합니다: 나무에서 병으로, 전통에서 세계 브랜드로.","award_eyebrow":"세 대륙에서 수상","award_band_label":"국제 수상","award_band_sub":"Swiss Gold 2026, 마이애미, 아부다비, 알아인, 바리, 아테네의 금메달과 공식 인증서 — 세 대륙의 국제 심사위원단이 명확히 기록.","award_band_btn":"모든 인증서 보기","trust_awards":"국제 수상","trust_acid_l":"산도","trust_poly_l":"mg/kg 폴리페놀","trust_harvest_l":"수확부터 압착까지","offers_subtitle":"큐레이티드 세트","offers_intro_strong":"탁월함의 표현.","offers_intro_p":"가장 높은 기준을 가진 분들을 위해 — 시대를 초월한 우아함, 탁월한 품질, 독특한 개성을 특징으로 합니다.","purity_cap":"산도","purity_lead":"산도 0.3% 미만 — 엑스트라 버진의 0.8% 기준보다 훨씬 우수. 수확 후 4시간 이내 콜드 프레스. 모든 한 방울은 심장과 면역 시스템을 보호하는 600mg/kg 이상의 폴리페놀이 풍부한 액체 의약품입니다.","purity_acid_l":"산도","purity_poly_l":"mg/kg 폴리페놀","purity_harvest_l":"수확부터 압착까지","purity_tagline":"심장을 보호하세요. 염증과 싸우세요 — 천연 폴리페놀로.","cert_eyebrow":"인증된 순도","cert_h2":"유기농 품질, 공식 문서화","cert1_micro":"유기농 관리 코드 · 튀니지","cert1_p":"유기농 코드는 인증된 원산지를 가시화하고 전문 제품 문서를 위한 깨끗한 라벨링을 지원합니다.","cert2_p":"유기농 품질, 추적 가능성, 소매업체 및 고객과의 진지한 커뮤니케이션을 위한 강력한 신뢰 앵커.","cert3_p":"인정된 기준에 따른 유기농 품질을 기대하는 국제 시장과 구매자 그룹을 위한 관련 신호.","heritage_ey":"고대 올리브 유산","heritage_h3":"기원의 나무","heritage_p":"고대 올리브 나무, 암석 토양, 그리고 Laperla에 깊이, 시간, 진정성을 부여하는 원산지.","reviews_kicker":"고객 리뷰 · Customer Reviews · Avis Clients","reviews_h3":"전 세계의 목소리","reviews_sub":"20개국 이상의 소믈리에, 셰프, 고급 식품 소매업체, 감정가들이 Laperla에 대해 하는 말.","reviews_avg_label":"평균 평점","reviews_count_label":"인증된 리뷰","reviews_countries_label":"국가","footer_legacy_h":"유산에 동참하세요","footer_legacy_p":"역사와 건강이 모든 한 방울에서 만나는 곳 — 고대 농원에서 여러분의 식탁까지."}};
let currentLang="de";
function applyLang(lang){
  currentLang=lang;const d=I18N[lang]||I18N.de;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;const v=(d[k]!==undefined)?d[k]:I18N.de[k];if(v!==undefined){el.textContent=v;el.dir=(lang==="ar")?"auto":"";}});
  const lc=document.getElementById("langCurrent");if(lc)lc.textContent=lang.toUpperCase();
  document.querySelectorAll(".lang-opt").forEach(o=>o.classList.toggle("active",o.dataset.lang===lang));
  document.documentElement.lang=lang;
  try{localStorage.setItem("laperla_lang",lang);}catch(e){}
  if(typeof renderProducts==="function"&&document.getElementById("productGrid"))renderProducts(window.__lastFilter||"all");
  const ab=document.getElementById("acctBtn");if(ab&&!ab.querySelector("*"))ab.textContent=(window.__isLoggedIn&&window.__isLoggedIn())?d.acct_in:d.acct;
}

document.addEventListener("DOMContentLoaded",()=>{
  window.__toast=toast;
  renderProducts();renderAwards();renderFaqs();renderHeritageArt();renderConfig();renderDashboard();renderMaps();renderGallery();updateCart();

  // GATE
  const gate=document.getElementById("gate");
  document.querySelectorAll(".path-card").forEach(c=>c.addEventListener("click",()=>{
    const p=c.dataset.path;
    const dest=p==="retail"?"home":"wholesale";
    gate.classList.add("hidden");
    setTimeout(()=>go(dest),300);
  }));

  // NAV
  document.querySelectorAll("[data-nav]").forEach(el=>el.addEventListener("click",e=>{
    e.preventDefault();
    go(el.dataset.nav,{legalTarget:el.dataset.legaltarget||null,scrollTarget:el.dataset.scroll||null});
    if(el.dataset.legaltarget){showLegal(el.dataset.legaltarget);}
  }));

  // LEGAL tabs
  function showLegal(key){
    document.querySelectorAll(".legal-tab").forEach(t=>t.classList.toggle("active",t.dataset.legal===key));
    document.querySelectorAll(".legal-content").forEach(c=>c.classList.remove("active"));
    const el=document.getElementById("legal-"+key);if(el)el.classList.add("active");
    const titles={impressum:"Impressum",datenschutz:"Datenschutz",cookies:"Cookie-Richtlinie",versandzahlung:"Versand & Zahlung",agb:"Allgemeine Geschäftsbedingungen",widerruf:"Widerrufsbelehrung"};
    const h=document.getElementById("legalHeading");if(h)h.textContent=titles[key]||"Rechtliche Informationen";
  }
  window.__showLegal=showLegal;
  document.querySelectorAll(".legal-tab").forEach(t=>t.addEventListener("click",()=>{
    showLegal(t.dataset.legal);
    syncBrowserHistory("legal",{legalTarget:t.dataset.legal});
  }));
  initBrowserHistory();

  // header scroll
  const header=document.getElementById("header");
  window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>40));

  // SLIDE MENU
  const slideMenu=document.getElementById("slideMenu"), menuOverlay=document.getElementById("menuOverlay");
  window.openMenu=()=>{slideMenu.classList.add("open");menuOverlay.classList.add("open");};
  window.closeMenu=()=>{slideMenu.classList.remove("open");menuOverlay.classList.remove("open");};
  document.getElementById("burger").addEventListener("click",openMenu);
  document.getElementById("menuClose").addEventListener("click",closeMenu);
  menuOverlay.addEventListener("click",closeMenu);
  // menu links with optional scroll-to-section
  document.querySelectorAll("[data-scroll]").forEach(l=>l.addEventListener("click",e=>{
    const sec=l.dataset.scroll;
    setTimeout(()=>{
      const el=document.getElementById(sec);
      if(el){
        const y=el.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo({top:Math.max(0,y),behavior:"smooth"});
      }
    },420);
  }));

  // LANGUAGE SWITCH
  const langBtn=document.getElementById("langBtn"),langMenu=document.getElementById("langMenu");
  langBtn.addEventListener("click",e=>{e.stopPropagation();langMenu.classList.toggle("open");});
  document.addEventListener("click",()=>langMenu.classList.remove("open"));
  document.querySelectorAll(".lang-opt").forEach(o=>o.addEventListener("click",()=>{applyLang(o.dataset.lang);langMenu.classList.remove("open");const nm=o.querySelector(".lo-name");toast(nm?nm.textContent:o.textContent);}));

  // filters
  function applyShopFilter(filter){
    const safe=filter||"all";
    document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x.dataset.filter===safe));
    renderProducts(safe);
  }
  document.getElementById("shopFilters").addEventListener("click",e=>{const c=e.target.closest(".filter-chip");if(!c)return;applyShopFilter(c.dataset.filter);});

  // product detail lightbox
  const productDetailLightbox=document.getElementById("productDetailLightbox");
  const productDetailMedia=document.getElementById("productDetailMedia");
  const productDetailKicker=document.getElementById("productDetailKicker");
  const productDetailTitle=document.getElementById("productDetailTitle");
  const productDetailVol=document.getElementById("productDetailVol");
  const productDetailNotes=document.getElementById("productDetailNotes");
  const productDetailTrust=document.getElementById("productDetailTrust");
  const productDetailPrice=document.getElementById("productDetailPrice");
  const productDetailAction=document.getElementById("productDetailAction");
  function openProductDetail(id){
    const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
    const imgs=p.images?.length?p.images:[p.img||IMG.shop];
    productDetailMedia.classList.toggle("is-pair",imgs.length>1);
    productDetailMedia.innerHTML=imgs.map((src,i)=>`<img src="${src}" alt="${p.name}${imgs.length>1?` – Flasche ${i+1}`:""}">`).join("");
    productDetailKicker.textContent=p.cat==="glass"?"Glasflasche":p.cat==="tin"?"Metallkanister":"Geschenkedition";
    productDetailTitle.textContent=p.name;
    productDetailVol.textContent=p.vol;
    productDetailNotes.textContent=p.notes;
    if(p.trust){productDetailTrust.hidden=false;productDetailTrust.textContent="★ "+p.trust;}else{productDetailTrust.hidden=true;productDetailTrust.textContent="";}
    productDetailPrice.innerHTML=p.available===false?"":`${fmt(p.price)}<small>${t("incl_vat")}</small>`;
    productDetailAction.innerHTML=p.available===false
      ? `<div class="product-detail-unavailable">Zurzeit nicht verfügbar</div>`
      : `<button class="btn btn-gold" type="button" data-detail-add="${p.id}">In den Warenkorb</button>`;
    productDetailLightbox.classList.add("open");
    productDetailLightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  }
  function closeProductDetail(){
    productDetailLightbox.classList.remove("open");
    productDetailLightbox.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
  }
  document.addEventListener("click",e=>{
    const detail=e.target.closest("[data-product-detail]");
    if(detail){openProductDetail(detail.dataset.productDetail);return;}
  });
  document.getElementById("productDetailClose").addEventListener("click",closeProductDetail);
  productDetailLightbox.addEventListener("click",e=>{if(e.target===productDetailLightbox)closeProductDetail();});
  productDetailAction.addEventListener("click",e=>{const b=e.target.closest("[data-detail-add]");if(!b)return;addToCart(b.dataset.detailAdd);closeProductDetail();openCart();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&productDetailLightbox.classList.contains("open"))closeProductDetail();});

  // add to cart
  document.getElementById("productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;addToCart(b.dataset.add);b.classList.add("added");b.textContent="✓ Hinzugefügt";setTimeout(()=>{b.classList.remove("added");b.textContent="In den Warenkorb";},1400);});
  document.addEventListener("click",e=>{
    const quickAdd=e.target.closest("[data-add]");
    if(quickAdd && !quickAdd.closest("#productGrid")){
      addToCart(quickAdd.dataset.add);
      const original=quickAdd.textContent;
      quickAdd.textContent="✓ Im Warenkorb";
      setTimeout(()=>quickAdd.textContent=original,1400);
    }
    const filterTrigger=e.target.closest("[data-filter-target]");
    if(filterTrigger){
      const target=filterTrigger.dataset.filterTarget||"all";
      go("shop");
      setTimeout(()=>applyShopFilter(target),180);
    }
  });

  // offers add-to-cart
  document.querySelectorAll("[data-offer]").forEach(btn=>btn.addEventListener("click",()=>{
    const o=OFFERS[btn.dataset.offer];if(!o)return;
    const id="offer_"+btn.dataset.offer;const l=cart.find(x=>x.id===id);
    if(l)l.qty++;else cart.push({id,name:o.name,vol:o.vol,price:o.price,qty:1});
    updateCart();toast(`„${o.name}" hinzugefügt`);openCart();
  }));

  // cart
  document.getElementById("cartBtn").addEventListener("click",openCart);
  document.getElementById("cartClose").addEventListener("click",closeCart);
  document.getElementById("drawerOverlay").addEventListener("click",closeCart);
  document.getElementById("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;changeQty(b.dataset.qty,parseInt(b.dataset.d));});

  // retail checkout
  document.getElementById("checkoutBtn").addEventListener("click",()=>{if(!cart.length){toast("Ihr Warenkorb ist leer");return;}closeCart();openCheckout("retail");});

  // config
  document.getElementById("toConfig")&&document.getElementById("toConfig").addEventListener("click",()=>document.getElementById("configurator").scrollIntoView({behavior:"smooth"}));
  document.getElementById("configProducts").addEventListener("click",e=>{const b=e.target.closest("[data-cfg]");if(!b)return;const id=b.dataset.cfg,d=parseInt(b.dataset.d);configState[id]=Math.max(0,(configState[id]||0)+d);document.getElementById("cfg-"+id).value=configState[id];updateConfig();});
  document.getElementById("configCheckout").addEventListener("click",()=>{const t=window._configTotal||0;if(t<=0){toast("Bitte wählen Sie zuerst Artikel");return;}openCheckout("b2b",fmtInt(Math.round(t))+" zzgl. MwSt.","B2B-Kaufvertrag","Sofortzahlung & verbindlicher Vertragsabschluss.");});

  // checkout modal
  const cm=document.getElementById("checkoutModal");
  document.getElementById("checkoutClose").addEventListener("click",closeCheckout);
  cm.addEventListener("click",e=>{if(e.target===cm)closeCheckout();});
  document.getElementById("customerType").addEventListener("change",showCheckoutBusinessFields);
  document.getElementById("sameShipping").addEventListener("change",toggleShippingFields);
  document.getElementById("deliveryMethod").addEventListener("change",renderCheckoutSummary);
  document.getElementById("checkoutNext").addEventListener("click",()=>{if(validateCheckoutStep(checkoutStep))setCheckoutStep(checkoutStep+1);});
  document.getElementById("checkoutBack").addEventListener("click",()=>setCheckoutStep(checkoutStep-1));
  document.getElementById("placeOrder").addEventListener("click",async()=>{
    if(!document.getElementById("checkoutTerms").checked){toast("Bitte akzeptieren Sie die AGB");return;}
    if(!document.getElementById("checkoutPrivacy").checked){toast("Bitte bestätigen Sie den Datenschutz");return;}
    if(!document.getElementById("checkoutWithdrawal").checked){toast("Bitte bestätigen Sie die Widerrufsbelehrung");return;}
    const button=document.getElementById("placeOrder");button.disabled=true;button.textContent="Anfrage wird gesichert …";
    const order=buildOrderRequest(); const localSaved=saveOrderLocally(order); const result=await transmitOrder(order);
    if(result.ok && result.data?.orderNumber)order.orderNumber=result.data.orderNumber;
    lastSubmittedOrder=order;
    document.getElementById("checkoutFormView").style.display="none";
    document.getElementById("orderDoneView").style.display="block";
    document.getElementById("orderDoneNumber").textContent=order.orderNumber;
    applyOrderTransmissionResult(order,result,localSaved);
    if(result.ok && checkoutMode==="retail"){cart=[];updateCart();}
    button.disabled=false;button.textContent="Bestellanfrage absenden";
  });
  document.getElementById("downloadOrderCopy").addEventListener("click",()=>downloadOrderCopy(lastSubmittedOrder));
  document.getElementById("retryOrderSend").addEventListener("click",async()=>{
    if(!lastSubmittedOrder)return;
    const retry=document.getElementById("retryOrderSend");
    retry.disabled=true;retry.textContent="E-Mail wird erneut gesendet …";
    const result=await transmitOrder(lastSubmittedOrder);
    applyOrderTransmissionResult(lastSubmittedOrder,result,true);
    if(result.ok && checkoutMode==="retail"){cart=[];updateCart();}
    retry.disabled=false;retry.textContent="E-Mail erneut senden";
  });
  document.getElementById("orderDoneClose").addEventListener("click",()=>{closeCheckout();go(checkoutMode==="b2b"?(loggedIn?"dashboard":"wholesale"):"shop");});

  // FAQ
  document.getElementById("faqList").addEventListener("click",e=>{const it=e.target.closest(".faq-item");if(!it)return;it.classList.toggle("open");});
  document.addEventListener("click",e=>{
    const faq2=document.getElementById("faqList2");
    if(!faq2||!faq2.contains(e.target))return;
    const it=e.target.closest(".faq-item");
    if(!it)return;
    it.classList.toggle("open");
  });

  // awards lightbox
  const lightbox=document.getElementById("lightbox");
  const lbImg=document.getElementById("lbImg");
  const lbKicker=document.getElementById("lbKicker");
  const lbTitle=document.getElementById("lbTitle");
  const lbMeta=document.getElementById("lbMeta");
  const lbDesc=document.getElementById("lbDesc");
  function openAwardLightbox({img,kicker,title,meta,desc}){
    lbImg.src=img; lbKicker.textContent=kicker||"Luxury Gallery"; lbTitle.textContent=title||"Award"; lbMeta.textContent=meta||""; lbDesc.textContent=desc||"";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  }
  function closeAwardLightbox(){
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
  }
  function openCertFromCard(card){
    const a=AWARDS_DATA.find(x=>x.key===card.dataset.cert); if(!a) return;
    openAwardLightbox({
      img:AWARD_IMG[a.key],
      kicker:a.place.includes("2026") ? "2026 Spotlight" : (a.flag || "Official Certificate"),
      title:a.name,
      meta:a.place,
      desc:a.desc
    });
  }
  document.getElementById("certGallery").addEventListener("click",e=>{
    const c=e.target.closest("[data-cert]"); if(!c) return;
    openCertFromCard(c);
  });
  document.getElementById("awards2026Spotlight")?.addEventListener("click",e=>{
    const c=e.target.closest("[data-cert]"); if(!c) return;
    openCertFromCard(c);
  });
  function openMedalFromCard(card){
    const m=MEDALS[Number(card.dataset.medal)]; if(!m) return;
    const parts=m.y.split(" "); const year=parts.pop(); const city=parts.join(" ");
    const rank=m.l.toLowerCase().includes("double") ? "Double Gold" : m.l.toLowerCase().includes("extra") ? "Extragold" : m.l.toLowerCase().includes("best") ? "Best Award" : "Gold Medal";
    openAwardLightbox({
      img:IMG.goldSeal,
      kicker:year==="2026" ? "Goldmedaillon 2026" : "International Award",
      title:rank,
      meta:city+" · "+year,
      desc:year==="2026"
        ? "Aktuelle 2026-Goldmedaille im Vordergrund der Laperla Awards. Diese Auszeichnung steht als erster sichtbarer Qualitätsbeweis für die Premium-Positionierung der Marke."
        : "Kuratierte Medaillen-Ansicht aus der Laperla Award-Sammlung. Diese Auszeichnung steht für internationale Anerkennung, sichtbare Premium-Qualität und eine starke Vertrauenswirkung im Auftritt der Marke."
    });
  }
  ["medalRow2026","medalRow"].forEach(id=>{
    const row=document.getElementById(id); if(!row) return;
    row.addEventListener("click",e=>{const c=e.target.closest("[data-medal]"); if(!c) return; openMedalFromCard(c);});
    row.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.closest("[data-medal]")){e.preventDefault();openMedalFromCard(e.target.closest("[data-medal]"));}});
  });
  document.getElementById("lbClose").addEventListener("click",closeAwardLightbox);
  lightbox.addEventListener("click",e=>{if(e.target.id==="lightbox")closeAwardLightbox();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&lightbox.classList.contains("open"))closeAwardLightbox();});

  // AUTH
  // AUTH — customer type toggle
  let custType="private";
  function applyCust(){
    document.querySelectorAll(".cust-opt").forEach(o=>o.classList.toggle("active",o.dataset.cust===custType));
    document.querySelectorAll("[data-cust-form]").forEach(f=>{f.style.display=(f.dataset.custForm===custType && document.querySelector('.auth-tab.active').dataset.auth==='register')?"flex":"none";});
    document.querySelectorAll("[data-cust-show]").forEach(e=>{e.style.display=e.dataset.custShow===custType?"inline":"none";});
  }
  window.setCustType=(t)=>{custType=t;applyCust();};
  document.querySelectorAll(".cust-opt").forEach(o=>o.addEventListener("click",()=>{custType=o.dataset.cust;applyCust();}));
  document.querySelectorAll(".auth-tab").forEach(t=>t.addEventListener("click",()=>{
    document.querySelectorAll(".auth-tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");
    const mode=t.dataset.auth;
    document.getElementById("form-login").classList.toggle("active",mode==="login");
    const showReg=mode==="register";
    document.getElementById("form-register").classList.toggle("active",showReg && custType==="private");
    document.getElementById("form-register-biz").classList.toggle("active",showReg && custType==="business");
    document.getElementById("form-register").style.display=(showReg&&custType==="private")?"flex":"none";
    document.getElementById("form-register-biz").style.display=(showReg&&custType==="business")?"flex":"none";
    document.getElementById("form-login").style.display=mode==="login"?"flex":"none";
  }));
  // reflect login state in menu + header
  function updateAccountUI(){
    const dash=document.getElementById("menuDashLink"),logout=document.getElementById("menuLogoutLink"),acctL=document.getElementById("menuAccountLink");
    if(dash)dash.style.display=loggedIn?"block":"none";
    if(logout)logout.style.display=loggedIn?"block":"none";
    if(acctL)acctL.style.display=loggedIn?"none":"block";
    const d=I18N[currentLang]||I18N.de;
    const ab=document.getElementById("acctBtn");if(ab)ab.textContent=loggedIn?d.acct_in:d.acct;
  }
  window.__updateAccountUI=updateAccountUI;
  window.__isLoggedIn=()=>loggedIn;
  document.getElementById("loginBtn").addEventListener("click",()=>{
    if(custType==="business"){loggedIn=true;updateAccountUI();toast("Willkommen zurück, Stephan Blumann");go("dashboard");}
    else{loggedIn=true;updateAccountUI();toast("Willkommen zurück!");go("shop");}
  });
  document.getElementById("registerBtnP").addEventListener("click",()=>{if(!document.getElementById("regTermsP").checked){toast("Bitte AGB & Datenschutz akzeptieren");return;}loggedIn=true;updateAccountUI();toast("Privatkonto erstellt — willkommen!");go("shop");});
  document.getElementById("registerBtn").addEventListener("click",()=>{if(!document.getElementById("regTerms").checked){toast("Bitte AGB & Datenschutz akzeptieren");return;}loggedIn=true;updateAccountUI();toast("Händlerkonto erstellt");go("dashboard");});
  // LOGOUT
  document.getElementById("menuLogoutLink").addEventListener("click",e=>{e.preventDefault();loggedIn=false;updateAccountUI();toast("Sie wurden abgemeldet");go("home");});
  document.getElementById("dashLogout").addEventListener("click",()=>{loggedIn=false;updateAccountUI();toast("Sie wurden abgemeldet");go("home");});
  applyCust();updateAccountUI();(function(){let l="de";try{const sv=localStorage.getItem("laperla_lang");if(sv&&I18N[sv])l=sv;}catch(e){}applyLang(l);})();

  // dashboard tabs
  document.querySelectorAll(".dash-tab").forEach(t=>t.addEventListener("click",()=>{document.querySelectorAll(".dash-tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");document.querySelectorAll(".dash-panel").forEach(p=>p.classList.remove("active"));document.getElementById("dash-"+t.dataset.dash).classList.add("active");}));
  document.getElementById("payInvoice").addEventListener("click",()=>openCheckout("b2b","3.480,00 €","Rechnung begleichen","Rechnung LP-2026-0042 · sofortige Zahlung."));

  // marquee duplicate
  const mq=document.getElementById("mq"); if(mq && !mq.dataset.ready){ const base=mq.innerHTML; mq.innerHTML=base+base+base+base; mq.dataset.ready="1"; }

  // animate ship slightly on track map
  let prog=0.6, dir=1;
  setInterval(()=>{prog+=0.0015*dir;if(prog>0.66||prog<0.54)dir*=-1;const tm=document.getElementById("trackMap");if(tm&&document.getElementById("page-dashboard").classList.contains("active"))tm.innerHTML=mapSVG(prog);},120);
});
// expose for config button
window._scrollConfig=false;

/* ============================================================
   ===== V77 ULTRA COLLECTION — Sort · Merkliste · Menge ======
   ============================================================ */
window.__sortV77 = window.__sortV77 || "featured";
const IMG_MASTERPIECE77="/images/img_083.jpg";
const V77_LITRES={p3:.25,p2:.5,p1:.75,p10:.5,p11:.75,p9:1,p4:1,p5:3,p8:5,p6:.75,p7:2.25,pgb:.5,p4x5:20};
const V77_REF={p3:"LP-250-R",p2:"LP-500-R",p1:"LP-750-R",p10:"LP-500-C",p11:"LP-750-C",p9:"LP-1000-M",p4:"LP-TIN-1L",p5:"LP-TIN-3L",p8:"LP-TIN-5L",p6:"LP-COF-TRIO",p7:"LP-COF-OR-3",pgb:"LP-500-GB",p4x5:"LP-KAN-4X5"};
function v77Wishlist(){try{return JSON.parse(localStorage.getItem("laperlaWishlistV77")||"[]");}catch(e){return [];}}
function v77SaveWish(a){try{localStorage.setItem("laperlaWishlistV77",JSON.stringify(a));}catch(e){}}
function v77PerL(p){const l=V77_LITRES[p.id];if(!l)return "";return (p.price/l).toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})+" €/L";}
function addToCartV77(id,qty){
  qty=Math.max(1,parseInt(qty,10)||1);
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  const l=cart.find(x=>x.id===id);
  if(l)l.qty+=qty;else cart.push({...p,qty:qty});
  updateCart();
  toast(qty>1?qty+" × „"+p.name+"“ hinzugefügt":"„"+p.name+"“ hinzugefügt");
}
(function(){
  try{
    var mp=document.getElementById("masterpieceImg77");
    if(mp)mp.src=IMG_MASTERPIECE77;
  }catch(e){}
  var sortSel=document.getElementById("shopSort77");
  if(sortSel){
    sortSel.value=window.__sortV77||"featured";
    sortSel.addEventListener("change",function(){
      window.__sortV77=this.value;
      if(typeof renderProducts==="function")renderProducts(window.__lastFilter||"all");
    });
  }
  var grid=document.getElementById("productGrid");
  if(grid&&!grid.dataset.v77){
    grid.dataset.v77="1";
    grid.addEventListener("click",function(e){
      var w=e.target.closest("[data-wish77]");
      if(w){
        var id=w.getAttribute("data-wish77");
        var list=v77Wishlist();
        var idx=list.indexOf(id);
        if(idx>-1){
          list.splice(idx,1);
          w.classList.remove("active");
          w.setAttribute("aria-pressed","false");
          toast("Von der Merkliste entfernt");
        }else{
          list.push(id);
          w.classList.add("active");
          w.setAttribute("aria-pressed","true");
          w.classList.remove("pulse");void w.offsetWidth;w.classList.add("pulse");
          toast("Auf die Merkliste gesetzt ♥");
        }
        v77SaveWish(list);
        return;
      }
      var minus=e.target.closest("[data-qty-minus]");
      var plus=e.target.closest("[data-qty-plus]");
      if(minus||plus){
        var box=(minus||plus).closest(".pc-qty77");
        var span=box&&box.querySelector(".qty-val77");
        if(span){
          var v=parseInt(span.textContent,10)||1;
          v=plus?Math.min(12,v+1):Math.max(1,v-1);
          span.textContent=v;
        }
        return;
      }
      var add=e.target.closest("[data-add-v77]");
      if(add){
        var card=add.closest(".product-card");
        var qEl=card&&card.querySelector(".qty-val77");
        var q=qEl?(parseInt(qEl.textContent,10)||1):1;
        addToCartV77(add.getAttribute("data-add-v77"),q);
        add.classList.add("added");
        add.textContent="✓ Hinzugefügt";
        setTimeout(function(){
          add.classList.remove("added");
          add.textContent=t("add_cart");
          if(qEl)qEl.textContent="1";
        },1500);
      }
    });
  }
})();


<div aria-hidden="true" class="gallery-lightbox" id="galleryLightbox">
<button aria-label="Galerie schließen" class="gallery-lightbox-close" id="galleryLightboxClose">×</button>
<div class="gallery-lightbox-inner">
<div class="gallery-lightbox-media"><img alt="Galeriebild" id="galleryLightboxImage"/></div>
<div class="gallery-lightbox-copy">
<div class="k" id="galleryLightboxKicker">Galerie</div>
<h3 id="galleryLightboxTitle">Laperla</h3>
<p id="galleryLightboxDesc">Kuratiertes Bild aus der Laperla Bildwelt.</p>
</div>
</div>
</div>

(function(){
  const EXPORT_EMAIL = "info@aniso-olive.de";
  const API_REQUEST_ENDPOINT = "/api/b2b-requests";
  const API_EMAIL_ENDPOINT = "/api/send-b2b-request";
  function getRequests(){
    try{return JSON.parse(localStorage.getItem("laperlaB2BRequests")||"[]")}catch(e){return []}
  }
  function saveRequests(list){
    localStorage.setItem("laperlaB2BRequests", JSON.stringify(list));
  }
  function backendStatus(msg,type="warn"){
    const box=document.getElementById("backendStatusBox");
    if(!box) return;
    box.innerHTML=msg;
    box.className="backend-status show "+type;
  }
  async function sendRequestToBackend(req){
    try{
      const res=await fetch(API_REQUEST_ENDPOINT,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(req)
      });
      if(!res.ok) throw new Error("Backend Antwort: "+res.status);
      backendStatus("<b>Backend verbunden.</b><br>Die Anfrage wurde in der Datenbank gespeichert.","ok");
      return true;
    }catch(err){
      backendStatus("<b>Lokal gespeichert.</b><br>Backend/API ist in dieser Vorschau noch nicht verbunden. Sobald die Seite mit dem Backend-Paket läuft, wird die Anfrage automatisch über /api/b2b-requests gespeichert.","warn");
      return false;
    }
  }
  function getLastRequest(){
    const reqs=getRequests();
    return reqs.length ? reqs[reqs.length-1] : null;
  }
  function statusBox(msg){
    const box=document.getElementById("approvalStatusBox");
    if(!box) return;
    box.innerHTML=msg;
    box.classList.add("show");
  }
  function getCountryValues(scope){
    if(!scope) return [];
    return Array.from(scope.querySelectorAll('input[name="countries"]:checked')).map(i=>i.value).filter(Boolean);
  }
  function setCountryValues(scope, values){
    if(!scope) return;
    const arr = Array.isArray(values)?values:String(values||"").split(",").map(v=>v.trim()).filter(Boolean);
    scope.querySelectorAll('input[name="countries"]').forEach(input=>input.checked = arr.includes(input.value));
  }
  function ensureCountriesSelected(scope){
    const values=getCountryValues(scope);
    if(values.length) return true;
    if(window.__toast) window.__toast("Bitte mindestens ein Land auswählen");
    const first=scope?.querySelector('input[name="countries"]');
    if(first) first.focus();
    return false;
  }
  function needsExclusiveConsent(value){
    return /Exklusiv/i.test(String(value||""));
  }
  function validateExclusiveConsent(scope){
    const exclusivityField=scope.querySelector('[name="exclusivity"]');
    const consentField=scope.querySelector('[name="exclusiveConsent"]');
    if(!exclusivityField || !consentField) return true;
    if(needsExclusiveConsent(exclusivityField.value) && !consentField.checked){
      if(window.__toast) window.__toast("Bitte bestätigen Sie die Exklusivitäts-Bedingung");
      consentField.focus();
      return false;
    }
    return true;
  }
  function requestSummary(req){
    if(!req) return "";
    return [
      `Firma: ${req.company||'-'}`,
      `Ansprechpartner: ${req.contact||'-'}`,
      `E-Mail: ${req.email||'-'}`,
      `Telefon: ${req.phone||'-'}`,
      `Vertriebsländer: ${req.countriesJoined||req.country||'-'}`,
      `Region: ${req.region||'-'}`,
      `Exklusivität: ${req.exclusivity||'-'}`,
      `Exklusivitäts-Bestätigung: ${req.exclusiveConsent ? 'Ja' : 'Nein'}`,
      `Geschäftsart: ${req.type||'-'}`,
      `Menge: ${req.volume||'-'}`,
      `Nachricht: ${req.message||'-'}`,
      `Eingang: ${req.date||'-'}`,
    ].join("\n");
  }
  function showExportActions(show=true){
    const box=document.getElementById('approvalExportActions');
    if(box) box.classList.toggle('show', !!show);
  }
  function pdfEscape(text){
    return String(text||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\x20-\x7E]/g,"-").replace(/[()\\]/g, "\\$&");
  }
  function wrapPdfLine(text,max=86){
    const words=String(text||"").split(/\s+/);
    const lines=[]; let line="";
    words.forEach(w=>{
      if((line+" "+w).trim().length>max){ if(line) lines.push(line); line=w; }
      else line=(line+" "+w).trim();
    });
    if(line) lines.push(line);
    return lines.length?lines:[""];
  }
  function createPdfBlob(req){
    const rawLines = [
      "LAPERLA B2B-ANFRAGE",
      "Erstellt: "+new Date().toLocaleString("de-DE"),
      "",
      "Firma: "+(req.company||"-"),
      "Ansprechpartner: "+(req.contact||"-"),
      "E-Mail: "+(req.email||"-"),
      "Telefon: "+(req.phone||"-"),
      "Vertriebslaender: "+(req.countriesJoined||req.country||"-"),
      "Region: "+(req.region||"-"),
      "Exklusivitaet: "+(req.exclusivity||"-"),
      "Exklusivitaets-Bestaetigung: "+(req.exclusiveConsent ? "Ja" : "Nein"),
      "Geschaeftsart: "+(req.type||"-"),
      "Geplante Menge: "+(req.volume||"-"),
      "",
      "Nachricht:",
      ...(wrapPdfLine(req.message||"-",86)),
      "",
      "Hinweis: Exklusivrechte gelten erst nach schriftlicher Zustimmung von Laperla."
    ].flatMap(l=>wrapPdfLine(l,86));

    const contentParts=["BT","/F1 11 Tf","50 790 Td"];
    rawLines.slice(0,52).forEach((line,i)=>{
      if(i>0) contentParts.push("0 -15 Td");
      contentParts.push("("+pdfEscape(line)+") Tj");
    });
    contentParts.push("ET");
    const stream=contentParts.join("\\n");
    const enc=new TextEncoder();
    const objects=[
      "1 0 obj\\n<< /Type /Catalog /Pages 2 0 R >>\\nendobj\\n",
      "2 0 obj\\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\\nendobj\\n",
      "3 0 obj\\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\\nendobj\\n",
      "4 0 obj\\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\\nendobj\\n",
      "5 0 obj\\n<< /Length "+enc.encode(stream).length+" >>\\nstream\\n"+stream+"\\nendstream\\nendobj\\n"
    ];
    let pdf="%PDF-1.4\\n";
    const offsets=[0];
    objects.forEach(o=>{ offsets.push(enc.encode(pdf).length); pdf+=o; });
    const xref=enc.encode(pdf).length;
    pdf+="xref\\n0 6\\n0000000000 65535 f \\n";
    for(let i=1;i<=5;i++) pdf+=String(offsets[i]).padStart(10,"0")+" 00000 n \\n";
    pdf+="trailer\\n<< /Size 6 /Root 1 0 R >>\\nstartxref\\n"+xref+"\\n%%EOF";
    return new Blob([pdf],{type:"application/pdf"});
  }
  function downloadBlob(blob, filename){
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download=filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},500);
  }
  function exportRequestPDF(req){
    if(!req){ if(window.__toast) window.__toast("Keine Anfrage zum Export vorhanden"); return; }
    const safeName=String(req.company||"Laperla-B2B-Anfrage").replace(/[^a-z0-9_-]+/gi,"_");
    downloadBlob(createPdfBlob(req), safeName+"_B2B_Anfrage.pdf");
    if(window.__toast) window.__toast("PDF wurde heruntergeladen");
  }
  async function exportRequestEmail(req){
    if(!req){ if(window.__toast) window.__toast("Keine Anfrage zum Export vorhanden"); return; }
    try{
      const res=await fetch(API_EMAIL_ENDPOINT,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(req)
      });
      if(!res.ok) throw new Error("Backend Antwort: "+res.status);
      backendStatus("<b>E-Mail gesendet.</b><br>Die B2B-Anfrage wurde über das Backend an Laperla weitergeleitet.","ok");
      if(window.__toast) window.__toast("E-Mail wurde über Backend gesendet");
    }catch(err){
      backendStatus("<b>E-Mail-Backend noch nicht verbunden.</b><br>Die Anfrage ist lokal gespeichert. Im Backend-Paket ist der echte SMTP-Versand vorbereitet. Bis dahin öffnet sich als Fallback Ihr E-Mail-Programm.","warn");
      const subject=encodeURIComponent(`Laperla B2B-Anfrage – ${req.company||'Neue Anfrage'}`);
      const body=encodeURIComponent(requestSummary(req));
      window.location.href=`mailto:${EXPORT_EMAIL}?subject=${subject}&body=${body}`;
    }
  }
  function renderAdminApproval(){
    const listEl=document.getElementById("approvalRequestsList");
    if(!listEl) return;
    const reqs=getRequests();
    const approved=(localStorage.getItem("laperlaDealerApproved")==="1");
    if(!reqs.length){
      listEl.innerHTML='<div class="admin-request-card"><div class="top"><h4>Noch keine B2B-Anfrage</h4><span class="approval-pill">wartet</span></div><div class="meta">Sobald ein Geschäftskunde eine Freigabe anfragt, erscheint die Anfrage hier.</div></div>';
      return;
    }
    listEl.innerHTML=reqs.slice().reverse().map((r,idx)=>{
      const realIndex=reqs.length-1-idx;
      return `<div class="admin-request-card">
        <div class="top">
          <h4>${r.company||"B2B Anfrage"}</h4>
          <span class="approval-pill ${approved?'approved':''}">${approved?'freigegeben':'wartet auf Zustimmung'}</span>
        </div>
        <div class="meta">
          Ansprechpartner: ${r.contact||"-"}<br>
          E-Mail: ${r.email||"-"} · Telefon: ${r.phone||"-"}<br>
          Vertriebsländer: ${r.countriesJoined||r.country||"-"}${r.region?` · Region: ${r.region}`:''}<br>
          Exklusivität: ${r.exclusivity||"-"} · Zustimmung: ${r.exclusiveConsent ? 'Ja' : 'Nein'}<br>
          Bereich: ${r.type||"-"} · Menge: ${r.volume||"-"}<br>
          Nachricht: ${r.message||"-"}<br>
          Eingang: ${r.date||"-"}
        </div>
        <div class="admin-request-actions">
          <button class="btn btn-gold btn-sm" data-approve-b2b="${realIndex}">Zustimmung erteilen</button>
          <button class="btn btn-ghost btn-sm" data-revoke-b2b>Freigabe sperren</button>
          <button class="btn btn-ghost btn-sm" data-export-pdf="${realIndex}" style="color:var(--gold-bright);border-color:var(--gold-bright)">PDF</button>
          <button class="btn btn-ghost btn-sm" data-export-mail="${realIndex}" style="color:var(--gold-bright);border-color:var(--gold-bright)">E-Mail</button>
        </div>
      </div>`;
    }).join("");
  }

  document.addEventListener("submit", function(e){
    const territory=e.target.closest("#territoryInterestForm");
    if(territory){
      e.preventDefault();
      if(!validateExclusiveConsent(territory)) return;
      if(!ensureCountriesSelected(territory)) return;
      const countries = getCountryValues(territory);
      const region = territory.querySelector('[name="region"]')?.value || "";
      const exclusivity = territory.querySelector('[name="exclusivity"]')?.value || "";
      const exclusiveConsent = territory.querySelector('[name="exclusiveConsent"]')?.checked ? '1' : '';
      localStorage.setItem("laperlaDesiredCountries", JSON.stringify(countries));
      localStorage.setItem("laperlaDesiredRegion", region);
      localStorage.setItem("laperlaDesiredExclusivity", exclusivity);
      localStorage.setItem("laperlaDesiredExclusiveConsent", exclusiveConsent);
      if(window.__toast) window.__toast("Vertriebsländer gespeichert");
      const approvalCountries=document.getElementById("approvalCountries");
      setCountryValues(approvalCountries, countries);
      const regionField=document.querySelector('#b2bApprovalForm input[name="region"]');
      if(regionField) regionField.value=region;
      const exclusivityField=document.querySelector('#b2bApprovalForm select[name="exclusivity"]');
      if(exclusivityField) exclusivityField.value=exclusivity;
      const consentField=document.getElementById('exclusiveConsent');
      if(consentField) consentField.checked=!!exclusiveConsent;
      if(typeof go==="function") go("b2b-approval");
      return;
    }

    const form=e.target.closest("#b2bApprovalForm");
    if(form){
      e.preventDefault();
      if(!validateExclusiveConsent(form)) return;
      const fd=new FormData(form);
      const data=Object.fromEntries(fd.entries());
      if(!ensureCountriesSelected(form)) return;
      const countries = getCountryValues(form);
      data.countries = countries;
      data.countriesJoined = countries.join(', ');
      data.exclusiveConsent = form.querySelector('[name="exclusiveConsent"]')?.checked ? '1' : '';
      data.date=new Date().toLocaleString("de-DE");
      const reqs=getRequests();
      reqs.push(data);
      saveRequests(reqs);
      sendRequestToBackend(data);
      localStorage.setItem("laperlaDealerApproved","0");
      localStorage.setItem("laperlaDesiredCountries", JSON.stringify(countries));
      localStorage.setItem("laperlaDesiredRegion", data.region||"");
      localStorage.setItem("laperlaDesiredExclusivity", data.exclusivity||"");
      localStorage.setItem("laperlaDesiredExclusiveConsent", data.exclusiveConsent||"");
      statusBox("<b>Anfrage gespeichert.</b><br>Ihr Zugang ist noch nicht freigegeben. Laperla prüft die Anfrage, die gewünschten Länder, die Exklusivität und die Zustimmung zu den Exklusivitäts-Bedingungen und erteilt danach die Freigabe für den Geschäftskundenbereich.");
      showExportActions(true);
      form.reset();
      renderAdminApproval();
      if(window.__toast) window.__toast("B2B-Freigabe angefragt");
      return;
    }
  });

  document.addEventListener("click", function(e){
    const approveBtn=e.target.closest("[data-approve-b2b]");
    if(approveBtn){
      localStorage.setItem("laperlaDealerApproved","1");
      window.dealerApproved=true;
      renderAdminApproval();
      if(window.__toast) window.__toast("B2B-Zugang durch Laperla freigegeben");
      return;
    }
    if(e.target.closest("[data-revoke-b2b]")){
      localStorage.setItem("laperlaDealerApproved","0");
      window.dealerApproved=false;
      renderAdminApproval();
      if(window.__toast) window.__toast("B2B-Zugang gesperrt");
      return;
    }
    const pdfAdmin=e.target.closest('[data-export-pdf]');
    if(pdfAdmin){
      const idx=Number(pdfAdmin.getAttribute('data-export-pdf'));
      const req=getRequests()[idx];
      exportRequestPDF(req); return;
    }
    const mailAdmin=e.target.closest('[data-export-mail]');
    if(mailAdmin){
      const idx=Number(mailAdmin.getAttribute('data-export-mail'));
      const req=getRequests()[idx];
      exportRequestEmail(req); return;
    }
    if(e.target.closest('#approvalPdfBtn')){ exportRequestPDF(getLastRequest()); return; }
    if(e.target.closest('#approvalMailBtn')){ exportRequestEmail(getLastRequest()); return; }
  });

  window.renderAdminApproval=renderAdminApproval;
  function prefillApprovalMarket(){
    const approvalCountries=document.getElementById("approvalCountries");
    const regionField=document.querySelector('#b2bApprovalForm input[name="region"]');
    const exclusivityField=document.querySelector('#b2bApprovalForm select[name="exclusivity"]');
    const consentField=document.getElementById('exclusiveConsent');
    let savedCountries=[];
    try{ savedCountries=JSON.parse(localStorage.getItem("laperlaDesiredCountries")||"[]") }catch(e){ savedCountries=[] }
    const savedRegion=localStorage.getItem("laperlaDesiredRegion")||"";
    const savedExclusivity=localStorage.getItem("laperlaDesiredExclusivity")||"";
    const savedConsent=localStorage.getItem("laperlaDesiredExclusiveConsent")||"";
    if(approvalCountries && savedCountries.length) setCountryValues(approvalCountries, savedCountries);
    if(regionField && savedRegion && !regionField.value) regionField.value=savedRegion;
    if(exclusivityField && savedExclusivity && !exclusivityField.value) exclusivityField.value=savedExclusivity;
    if(consentField && savedConsent) consentField.checked=true;
    showExportActions(!!getLastRequest());
  }
  document.addEventListener("DOMContentLoaded", function(){ renderAdminApproval(); prefillApprovalMarket(); });
  setTimeout(function(){ renderAdminApproval(); prefillApprovalMarket(); }, 600);
})();


(function(){
  function closeMenuIfOpen(){
    document.querySelector(".slide-menu")?.classList.remove("open");
    document.querySelector(".menu-overlay")?.classList.remove("open");
  }

  document.addEventListener("click", function(e){
    const link = e.target.closest(".menu-link[data-scroll]");
    if(!link) return;

    const targetId = link.getAttribute("data-scroll");
    const navTarget = link.getAttribute("data-nav");
    if(!targetId || !navTarget) return;

    e.preventDefault();

    const goFn = window.go || window.navigateTo || null;
    if(typeof goFn === "function"){
      goFn(navTarget);
    }else{
      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      const page = document.getElementById("page-" + navTarget);
      if(page) page.classList.add("active");
    }

    closeMenuIfOpen();

    setTimeout(function(){
      const el = document.getElementById(targetId);
      if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
    }, 220);
  }, true);
})();


(function(){
  const logo=document.querySelector('.header-logo[data-scroll]');
  if(!logo) return;
  logo.addEventListener('click', function(e){
    e.preventDefault();
    const goFn = window.go || window.navigateTo || null;
    if(typeof goFn === 'function'){
      goFn('home');
    }else{
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      const page=document.getElementById('page-home');
      if(page) page.classList.add('active');
    }
    setTimeout(function(){
      const el=document.getElementById('hero');
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 180);
  });
})();


(function(){
  function initClickableGallery(){
    const modal = document.getElementById("galleryLightbox");
    const modalImg = document.getElementById("galleryLightboxImage");
    const titleEl = document.getElementById("galleryLightboxTitle");
    const descEl = document.getElementById("galleryLightboxDesc");
    const kickerEl = document.getElementById("galleryLightboxKicker");
    const closeBtn = document.getElementById("galleryLightboxClose");

    if(!modal || !modalImg) return;

    function openFromCard(card){
      const img = card.querySelector("img");
      if(!img || !img.src) return;

      const title = card.querySelector(".gallery-body h3, h3, h4")?.textContent?.trim() || "Laperla";
      const desc = card.querySelector(".gallery-body p, p")?.textContent?.trim() || "Kuratiertes Bild aus der Laperla Bildwelt.";
      const kicker = card.querySelector(".gallery-body .k, .k, .ey")?.textContent?.trim() || "Galerie";

      modalImg.src = img.src;
      modalImg.alt = img.alt || title;
      if(titleEl) titleEl.textContent = title;
      if(descEl) descEl.textContent = desc;
      if(kickerEl) kickerEl.textContent = kicker;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    }

    function closeGallery(){
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
      setTimeout(function(){ if(!modal.classList.contains("open")) modalImg.src = ""; }, 180);
    }

    document.querySelectorAll("[data-gallery-card], .gallery-card").forEach(function(card){
      card.addEventListener("click", function(e){
        e.preventDefault();
        openFromCard(card);
      });
    });

    if(closeBtn){
      closeBtn.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        closeGallery();
      });
    }

    modal.addEventListener("click", function(e){
      if(e.target === modal) closeGallery();
    });

    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && modal.classList.contains("open")) closeGallery();
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initClickableGallery);
  }else{
    initClickableGallery();
  }
})();



(function(){
  const PALLETS = {
    p750:{name:"Palette Glasflasche 750 ml",cartons:72,units:864,litres:648,price:72*78},
    p500:{name:"Palette Glasflasche 500 ml",cartons:80,units:1200,litres:600,price:80*69},
    p5l:{name:"Palette Metalldose 5 L",cartons:48,units:192,litres:960,price:48*128},
    mixed:{name:"Mischpalette Prestige",cartons:72,units:960,litres:624,price:5650}
  };
  const money = n => Math.round(n).toLocaleString("de-DE")+" €";
  const discount = litres => litres>=2500 ? .20 : litres>=1000 ? .18 : litres>=500 ? .14 : litres>=200 ? .09 : .05;

  function byId(id){return document.getElementById(id);}
  function updatePallet(){
    const type = byId("palletType");
    const qtyInput = byId("palletQty");
    if(!type || !qtyInput) return;
    const p = PALLETS[type.value] || PALLETS.p750;
    const qty = Math.max(1, parseInt(qtyInput.value||"1",10));
    const litres = p.litres * qty;
    const cartons = p.cartons * qty;
    const units = p.units * qty;
    let subtotal = p.price * qty;
    if(byId("palletPrivate")?.checked) subtotal += 290 * qty;
    if(byId("palletGift")?.checked) subtotal += 390 * qty;
    const disc = discount(litres);
    const total = subtotal * (1-disc);

    byId("palletSummaryQty").textContent = qty.toLocaleString("de-DE");
    byId("palletSummaryCartons").textContent = cartons.toLocaleString("de-DE");
    byId("palletSummaryUnits").textContent = units.toLocaleString("de-DE");
    byId("palletSummaryLitres").textContent = litres.toLocaleString("de-DE")+" L";
    byId("palletSummaryDiscount").textContent = Math.round(disc*100)+" %";
    byId("palletSummaryTotal").textContent = money(total);
    window._palletQuote = {type:p.name,qty,cartons,units,litres,total};
  }

  function scrollToPallet(){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    byId("page-wholesale")?.classList.add("active");
    byId("slideMenu")?.classList.remove("open");
    byId("menuOverlay")?.classList.remove("open");
    document.body.classList.remove("menu-is-open");
    setTimeout(()=>byId("pallet-configurator")?.scrollIntoView({behavior:"smooth",block:"start"}),180);
  }

  document.addEventListener("DOMContentLoaded", function(){
    ["palletType","palletPrivate","palletGift"].forEach(id=>byId(id)?.addEventListener("change",updatePallet));
    byId("palletMinus")?.addEventListener("click",function(){
      const i=byId("palletQty"); if(!i) return;
      i.value=Math.max(1,parseInt(i.value||"1",10)-1); updatePallet();
    });
    byId("palletPlus")?.addEventListener("click",function(){
      const i=byId("palletQty"); if(!i) return;
      i.value=Math.min(99,parseInt(i.value||"1",10)+1); updatePallet();
    });
    byId("toPallet")?.addEventListener("click",function(e){e.preventDefault();scrollToPallet();});
    document.querySelectorAll('[data-scroll="pallet-configurator"]').forEach(el=>{
      el.addEventListener("click",function(e){e.preventDefault();scrollToPallet();},true);
    });
    byId("palletInquiry")?.addEventListener("click",function(){
      updatePallet();
      const q=window._palletQuote||{};
      const body=[
        "Paletten-Anfrage Laperla Olive Oil",
        "",
        "Paletten-Typ: "+(q.type||""),
        "Anzahl Paletten: "+(q.qty||""),
        "Kartons: "+(q.cartons||""),
        "Einheiten/Flaschen: "+(q.units||""),
        "Gesamtvolumen: "+(q.litres||"")+" L",
        "Schätzung: "+money(q.total||0),
        "",
        "Bitte Angebot, Lieferzeit, Transport und B2B-Freigabe bestätigen."
      ].join("\n");
      window.location.href="mailto:?subject="+encodeURIComponent("Paletten-Anfrage Laperla Olive Oil")+"&body="+encodeURIComponent(body);
    });
    updatePallet();
  });
})();



(function(){
  function showPage(pageId){
    document.querySelectorAll(".page").forEach(function(p){p.classList.remove("active");});
    var page=document.getElementById(pageId);
    if(page) page.classList.add("active");

    var gate=document.getElementById("gate");
    if(gate) gate.classList.add("hidden");

    var header=document.getElementById("header");
    if(header){
      header.classList.toggle("on-dark", pageId==="page-home");
      header.classList.add("scrolled");
    }

    if(window.closeMenu) window.closeMenu();
  }

  function jumpTo(id){
    if(id === "faq"){
      showPage("page-faq");
      window.__currentRouteTarget = "faq";
      window.scrollTo({top:0, behavior:"smooth"});
      return;
    }
    var pageId = "page-home";
    showPage(pageId);
    window.__currentRouteTarget = "home";
    setTimeout(function(){
      var el=document.getElementById(id);
      if(!el) return;
      var y = el.getBoundingClientRect().top + window.pageYOffset - 105;
      window.scrollTo({top:Math.max(0,y), behavior:"smooth"});
    },120);
  }

  document.addEventListener("click", function(e){
    var el=e.target.closest("[data-footer-jump]");
    if(!el) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    jumpTo(el.dataset.footerJump);
  }, true);
})();



(function(){
  const states = [{"id": "bw", "name": "Baden-Württemberg", "cities": "Stuttgart · Karlsruhe · Mannheim", "focus": "Premium-Retail, Feinkost & Gastronomie", "x": 48, "y": 78}, {"id": "by", "name": "Bayern", "cities": "München · Nürnberg · Augsburg", "focus": "Hotels, Restaurants & Handel", "x": 63, "y": 80}, {"id": "be", "name": "Berlin", "cities": "Berlin · Hauptstadtvertretung", "focus": "Hauptkoordination Deutschland", "x": 66, "y": 32}, {"id": "bb", "name": "Brandenburg", "cities": "Potsdam · Cottbus · Frankfurt (Oder)", "focus": "Regionale Partner & Feinkost", "x": 70, "y": 37}, {"id": "hb", "name": "Bremen", "cities": "Bremen · Bremerhaven", "focus": "Hanseatischer Handel & Gastro", "x": 38, "y": 26}, {"id": "hh", "name": "Hamburg", "cities": "Hamburg · Hafen & Premiumhandel", "focus": "Import, Großhandel & Hotels", "x": 47, "y": 17}, {"id": "he", "name": "Hessen", "cities": "Frankfurt · Wiesbaden · Kassel", "focus": "Business, Retail & Gastronomie", "x": 45, "y": 57}, {"id": "mv", "name": "Mecklenburg-Vorpommern", "cities": "Rostock · Schwerin · Stralsund", "focus": "Tourismus, Hotels & Feinkost", "x": 61, "y": 13}, {"id": "ni", "name": "Niedersachsen", "cities": "Hannover · Braunschweig · Osnabrück", "focus": "Handel, Märkte & B2B", "x": 39, "y": 35}, {"id": "nw", "name": "Nordrhein-Westfalen", "cities": "Köln · Düsseldorf · Dortmund", "focus": "Starke B2B- und Gastro-Region", "x": 29, "y": 52}, {"id": "rp", "name": "Rheinland-Pfalz", "cities": "Mainz · Koblenz · Trier", "focus": "Wein, Feinkost & Gastronomie", "x": 34, "y": 67}, {"id": "sl", "name": "Saarland", "cities": "Saarbrücken · Neunkirchen", "focus": "Grenzregion & Premiumhandel", "x": 29, "y": 75}, {"id": "sn", "name": "Sachsen", "cities": "Dresden · Leipzig · Chemnitz", "focus": "Retail, Feinkost & Hotels", "x": 66, "y": 58}, {"id": "st", "name": "Sachsen-Anhalt", "cities": "Magdeburg · Halle (Saale)", "focus": "Regionale Distribution", "x": 57, "y": 43}, {"id": "sh", "name": "Schleswig-Holstein", "cities": "Kiel · Lübeck · Flensburg", "focus": "Küste, Hotels & Feinkost", "x": 48, "y": 7}, {"id": "th", "name": "Thüringen", "cities": "Erfurt · Jena · Weimar", "focus": "Kultur, Feinkost & Gastronomie", "x": 52, "y": 60}];

  function setMapState(id){
    const s = states.find(x => x.id === id) || states[0];
    if(!s) return;

    document.querySelectorAll(".de-map-pin").forEach(pin => {
      pin.classList.toggle("active", pin.dataset.state === s.id);
    });

    document.querySelectorAll(".state-location-card").forEach(card => {
      const h = card.querySelector("h4");
      card.classList.toggle("active", h && h.textContent.trim() === s.name);
    });

    const select = document.getElementById("deStateSelect");
    if(select && select.value !== s.id) select.value = s.id;

    const result = document.getElementById("deMapResult");
    if(result){
      result.innerHTML = `
        <div class="k">Aktives Vertriebsgebiet</div>
        <h4>${s.name}</h4>
        <p>${s.cities}</p>
        <div class="f">${s.focus}</div>
      `;
    }
  }

  document.addEventListener("click", function(e){
    const pin = e.target.closest(".de-map-pin");
    if(!pin) return;
    e.preventDefault();
    setMapState(pin.dataset.state);
    const grid = document.querySelector(".state-location-grid");
    if(grid){
      setTimeout(() => grid.scrollIntoView({behavior:"smooth", block:"nearest"}), 120);
    }
  });

  document.addEventListener("change", function(e){
    if(e.target && e.target.id === "deStateSelect") setMapState(e.target.value);
  });

  document.addEventListener("DOMContentLoaded", function(){
    setMapState("be");
  });
})();



(function(){
  const stateData = [{"id": "bw", "name": "Baden-Württemberg", "city": "Stuttgart", "cities": "Stuttgart · Karlsruhe · Mannheim", "focus": "Premium-Retail, Feinkost & Gastronomie", "lat": 48.7758, "lon": 9.1829, "partner": "LaPerla Südwest Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "by", "name": "Bayern", "city": "München", "cities": "München · Nürnberg · Augsburg", "focus": "Hotels, Restaurants & Handel", "lat": 48.1351, "lon": 11.582, "partner": "LaPerla Bayern Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "be", "name": "Berlin", "city": "Berlin", "cities": "Berlin · Hauptstadtvertretung", "focus": "Hauptkoordination Deutschland", "lat": 52.52, "lon": 13.405, "partner": "ANISO / LaPerla Deutschland Hauptvertretung", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "bb", "name": "Brandenburg", "city": "Potsdam", "cities": "Potsdam · Cottbus · Frankfurt (Oder)", "focus": "Regionale Partner & Feinkost", "lat": 52.3906, "lon": 13.0645, "partner": "LaPerla Brandenburg Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "hb", "name": "Bremen", "city": "Bremen", "cities": "Bremen · Bremerhaven", "focus": "Hanseatischer Handel & Gastro", "lat": 53.0793, "lon": 8.8017, "partner": "LaPerla Bremen Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "hh", "name": "Hamburg", "city": "Hamburg", "cities": "Hamburg · Hafen & Premiumhandel", "focus": "Import, Großhandel & Hotels", "lat": 53.5511, "lon": 9.9937, "partner": "LaPerla Hamburg Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "he", "name": "Hessen", "city": "Frankfurt am Main", "cities": "Frankfurt · Wiesbaden · Kassel", "focus": "Business, Retail & Gastronomie", "lat": 50.1109, "lon": 8.6821, "partner": "LaPerla Hessen Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "mv", "name": "Mecklenburg-Vorpommern", "city": "Rostock", "cities": "Rostock · Schwerin · Stralsund", "focus": "Tourismus, Hotels & Feinkost", "lat": 54.0924, "lon": 12.0991, "partner": "LaPerla Nordost Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "ni", "name": "Niedersachsen", "city": "Hannover", "cities": "Hannover · Braunschweig · Osnabrück", "focus": "Handel, Märkte & B2B", "lat": 52.3759, "lon": 9.732, "partner": "LaPerla Niedersachsen Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "nw", "name": "Nordrhein-Westfalen", "city": "Düsseldorf", "cities": "Köln · Düsseldorf · Dortmund", "focus": "Starke B2B- und Gastro-Region", "lat": 51.2277, "lon": 6.7735, "partner": "LaPerla NRW Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "rp", "name": "Rheinland-Pfalz", "city": "Mainz", "cities": "Mainz · Koblenz · Trier", "focus": "Wein, Feinkost & Gastronomie", "lat": 49.9929, "lon": 8.2473, "partner": "LaPerla Rheinland-Pfalz Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "sl", "name": "Saarland", "city": "Saarbrücken", "cities": "Saarbrücken · Neunkirchen", "focus": "Grenzregion & Premiumhandel", "lat": 49.2402, "lon": 6.9969, "partner": "LaPerla Saarland Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "sn", "name": "Sachsen", "city": "Dresden", "cities": "Dresden · Leipzig · Chemnitz", "focus": "Retail, Feinkost & Hotels", "lat": 51.0504, "lon": 13.7373, "partner": "LaPerla Sachsen Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "st", "name": "Sachsen-Anhalt", "city": "Magdeburg", "cities": "Magdeburg · Halle (Saale)", "focus": "Regionale Distribution", "lat": 52.1205, "lon": 11.6276, "partner": "LaPerla Sachsen-Anhalt Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "sh", "name": "Schleswig-Holstein", "city": "Kiel", "cities": "Kiel · Lübeck · Flensburg", "focus": "Küste, Hotels & Feinkost", "lat": 54.3233, "lon": 10.1228, "partner": "LaPerla Schleswig-Holstein Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}, {"id": "th", "name": "Thüringen", "city": "Erfurt", "cities": "Erfurt · Jena · Weimar", "focus": "Kultur, Feinkost & Gastronomie", "lat": 50.9848, "lon": 11.0299, "partner": "LaPerla Thüringen Partner", "contact": "+49 176 9996 9996", "email": "info@aniso-olive.de"}];

  function mapUrl(lat, lon){
    const dLon = 2.0;
    const dLat = 1.25;
    const bbox = [
      (lon - dLon).toFixed(4),
      (lat - dLat).toFixed(4),
      (lon + dLon).toFixed(4),
      (lat + dLat).toFixed(4)
    ].join(",");
    return "https://www.openstreetmap.org/export/embed.html?bbox=" + bbox + "&layer=mapnik&marker=" + lat.toFixed(4) + "," + lon.toFixed(4);
  }

  function activateLocal(id){
    const s = stateData.find(x => x.id === id) || stateData.find(x => x.id === "be") || stateData[0];
    if(!s) return;

    const iframe = document.getElementById("deRealMapFrame");
    if(iframe) iframe.src = mapUrl(Number(s.lat), Number(s.lon));

    const label = document.getElementById("deRealMapLabel");
    if(label) label.textContent = s.city + " · " + s.name;

    document.querySelectorAll(".local-partner-card").forEach(card => {
      card.classList.toggle("active", card.dataset.localState === s.id);
    });

    document.querySelectorAll(".de-map-pin").forEach(pin => {
      pin.classList.toggle("active", pin.dataset.state === s.id);
    });

    const select = document.getElementById("deStateSelect");
    if(select && select.value !== s.id) select.value = s.id;
  }

  document.addEventListener("click", function(e){
    const btn = e.target.closest("[data-local-select]");
    if(btn){
      e.preventDefault();
      activateLocal(btn.dataset.localSelect);
      const map = document.getElementById("deutschland-karte");
      if(map) setTimeout(() => map.scrollIntoView({behavior:"smooth", block:"center"}), 120);
      return;
    }

    const pin = e.target.closest(".de-map-pin");
    if(pin){
      activateLocal(pin.dataset.state);
    }
  }, true);

  document.addEventListener("change", function(e){
    if(e.target && e.target.id === "deStateSelect") activateLocal(e.target.value);
  }, true);

  document.addEventListener("DOMContentLoaded", function(){
    activateLocal("be");
  });
})();



(function(){
  const SECRET_CODES = ["LAPERLA2026","ANISO2026","GROSSHANDEL"];
  const PENDING_KEY = "laperlaPendingB2BTargetV85";
  const LABELS = {
    wholesale:"Großhändler / B2B Shop",
    distributors:"Vertriebspartner",
    "b2b-shop":"B2B Shop",
    "b2b-container":"Container konfigurieren",
    "b2b-pallet":"Paletten konfigurieren",
    account:"Konto anmelden / registrieren",
    "b2b-login":"Konto anmelden / registrieren"
  };

  function readPending(){
    try{
      const raw=sessionStorage.getItem(PENDING_KEY);
      return raw ? JSON.parse(raw) : null;
    }catch(e){return null;}
  }

  function savePending(obj){
    try{sessionStorage.setItem(PENDING_KEY,JSON.stringify(obj));}catch(e){}
    setGateLabel(obj && obj.label ? obj.label : "Geschützter B2B-Bereich");
  }

  function setGateLabel(label){
    const el=document.getElementById("wcgTargetLabelV85");
    if(el) el.textContent="Code-Zugang für: "+(label||"geschützter B2B-Bereich");
  }

  window.__setB2BGateLabel=setGateLabel;
  window.__openB2BCodeGate=function(target,scrollTarget,label){
    const obj={target:target||"wholesale",label:label||LABELS[target]||"Geschützter B2B-Bereich"};
    if(scrollTarget) obj.scrollTarget=scrollTarget;
    if(target==="b2b-container"){obj.target="wholesale";obj.scrollTarget="configurator";obj.label="Container konfigurieren";}
    if(target==="b2b-pallet"){obj.target="wholesale";obj.scrollTarget="pallet-configurator";obj.label="Paletten konfigurieren";}
    if(target==="b2b-shop"){obj.target="wholesale";obj.label="B2B Shop";}
    if(target==="account" || target==="b2b-login"){obj.target="account";obj.label="Konto anmelden / registrieren";}
    savePending(obj);
    if(window.go) window.go("wholesale-gate",{bypassCode:true});
  };

  function openProtectedArea(){
    const pending=readPending() || {target:"wholesale",label:"Großhändler / B2B Shop"};
    try{sessionStorage.removeItem(PENDING_KEY);}catch(e){}

    const opts={bypassCode:true};
    if(pending.scrollTarget) opts.scrollTarget=pending.scrollTarget;

    if(window.go){
      window.go(pending.target||"wholesale",opts);
    }
  }

  document.addEventListener("click",function(e){
    const link=e.target.closest("[data-b2b-gate]");
    if(!link) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation)e.stopImmediatePropagation();

    const key=link.getAttribute("data-b2b-gate")||"wholesale";
    const scroll=link.getAttribute("data-scroll")||null;
    const label=link.textContent.trim()||LABELS[key]||"Geschützter B2B-Bereich";
    window.__openB2BCodeGate(key,scroll,label);
  },true);

  document.addEventListener("submit",function(e){
    const form=e.target.closest("#wholesaleCodeForm");
    if(!form) return;
    e.preventDefault();

    const input=document.getElementById("wholesaleSecretCode");
    const status=document.getElementById("wholesaleCodeStatus");
    const code=(input && input.value ? input.value : "").trim().toUpperCase();

    if(SECRET_CODES.includes(code)){
      if(status){
        status.classList.remove("error");
        status.textContent="Zugang freigeschaltet. Der geschützte Bereich wird geöffnet …";
      }
      setTimeout(openProtectedArea,420);
    }else{
      if(status){
        status.classList.add("error");
        status.textContent="Falscher Geheimcode. Bitte prüfen oder Freigabe anfordern.";
      }
      if(input) input.focus();
    }
  },true);

  document.addEventListener("DOMContentLoaded",function(){
    const pending=readPending();
    if(pending) setGateLabel(pending.label);
  });
})();



(function(){
  try{ localStorage.removeItem("laperlaWholesaleCodeApproved"); }catch(e){}
})();



(function(){
  function setAccordion(acc, open){
    const head = acc.querySelector(".menu-pro-head");
    const panel = acc.querySelector(".menu-pro-panel");
    if(!head || !panel) return;
    acc.classList.toggle("open", !!open);
    panel.hidden = !open;
    head.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function initMenuAccordions(){
    document.querySelectorAll("[data-menu-accordion]").forEach(function(acc){
      const open = acc.classList.contains("open");
      setAccordion(acc, open);
    });
  }

  document.addEventListener("click", function(e){
    const head = e.target.closest(".menu-pro-head");
    if(!head) return;
    const acc = head.closest("[data-menu-accordion]");
    if(!acc) return;

    e.preventDefault();
    e.stopPropagation();

    const nextOpen = !acc.classList.contains("open");
    setAccordion(acc, nextOpen);
  }, true);

  document.addEventListener("keydown", function(e){
    if(e.key !== "Enter" && e.key !== " ") return;
    const head = e.target.closest(".menu-pro-head");
    if(!head) return;
    e.preventDefault();
    head.click();
  }, true);

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initMenuAccordions);
  }else{
    initMenuAccordions();
  }

  window.__fixMenuAccordions = initMenuAccordions;
})();



(function(){
  document.addEventListener("click", function(e){
    const btn = e.target.closest("[data-scroll]");
    if(!btn) return;
    const targetId = btn.getAttribute("data-scroll");
    if(!targetId) return;
    setTimeout(function(){
      const el = document.getElementById(targetId);
      if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
    }, 180);
  }, true);
})();



(function(){
  const brandPages = {
    story: "page-story",
    about: "page-about",
    mission: "page-mission",
  };

  function closeMenu(){
    document.body.classList.remove("menu-open");
    document.documentElement.classList.remove("menu-open");
    document.querySelectorAll(".side-menu,.menu-pro,.menu-drawer,#menu,#sideMenu").forEach(function(el){
      el.classList.remove("open","active","is-open");
    });
  }

  function showBrandPage(key){
    const pageId = brandPages[key];
    const page = document.getElementById(pageId);
    if(!page) return false;

    document.querySelectorAll(".page").forEach(function(p){ p.classList.remove("active"); });
    page.classList.add("active");

    const gate = document.getElementById("gate");
    if(gate) gate.classList.add("hidden");

    const header = document.getElementById("header");
    if(header){
      header.classList.add("scrolled");
      header.classList.remove("on-dark");
    }

    closeMenu();
    window.__currentRouteTarget = key;
    window.scrollTo({top:0, behavior:"smooth"});
    return true;
  }

  document.addEventListener("click", function(e){
    const link = e.target.closest("[data-brand-nav]");
    if(!link) return;

    const key = link.getAttribute("data-brand-nav");
    if(!brandPages[key]) return;

    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();

    showBrandPage(key);
  }, true);
})();


<!-- ============ COOKIE CONSENT ============ -->
<div class="cookie-banner-v80" id="cookieBannerV80" aria-live="polite" hidden>
  <div class="cookie-card-v80">
    <div>
      <span>Datenschutz &amp; Cookies</span>
      <h3>Cookie-Einstellungen</h3>
      <p>Wir nutzen notwendige Cookies für Warenkorb, Login und Sicherheit. Analyse- und Marketing-Cookies werden nur mit Ihrer Zustimmung aktiviert.</p>
    </div>
    <div class="cookie-actions-v80">
      <button type="button" class="cookie-btn ghost" id="cookieNecessaryV80">Nur notwendige</button>
      <button type="button" class="cookie-btn ghost" id="cookieCustomizeV80">Einstellungen</button>
      <button type="button" class="cookie-btn gold" id="cookieAcceptAllV80">Alle akzeptieren</button>
    </div>
  </div>
</div>

<div class="cookie-modal-v80" id="cookieModalV80" hidden>
  <div class="cookie-modal-box-v80" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitleV80">
    <button type="button" class="cookie-x-v80" id="cookieCloseV80" aria-label="Schließen">✕</button>
    <span>Privacy Center</span>
    <h3 id="cookieModalTitleV80">Cookie-Einstellungen verwalten</h3>
    <label class="cookie-switch-v80 disabled">
      <input type="checkbox" checked disabled>
      <div><b>Notwendige Cookies</b><small>Erforderlich für Warenkorb, Login, Sicherheit und Cookie-Auswahl.</small></div>
    </label>
    <label class="cookie-switch-v80">
      <input type="checkbox" id="cookieAnalyticsV80">
      <div><b>Analyse-Cookies</b><small>Helfen uns zu verstehen, wie die Website genutzt wird.</small></div>
    </label>
    <label class="cookie-switch-v80">
      <input type="checkbox" id="cookieMarketingV80">
      <div><b>Marketing-Cookies</b><small>Ermöglichen Marketing, Kampagnen und externe Medien.</small></div>
    </label>
    <div class="cookie-modal-actions-v80">
      <button type="button" class="cookie-btn ghost" id="cookieSaveV80">Auswahl speichern</button>
      <button type="button" class="cookie-btn gold" id="cookieAcceptAllModalV80">Alle akzeptieren</button>
    </div>
  </div>
</div>


(function(){
  const KEY = "laperlaCookieConsentV82";

  function get(id){ return document.getElementById(id); }

  function readConsent(){
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); }
    catch(e){ return null; }
  }

  function writeConsent(settings){
    const consent = {
      necessary: true,
      analytics: !!settings.analytics,
      marketing: !!settings.marketing,
      savedAt: new Date().toISOString()
    };
    try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch(e) {}
    window.laperlaCookieConsent = consent;
    hideCookieUI();
  }

  function hideCookieUI(){
    const banner = get("cookieBannerV80");
    const modal = get("cookieModalV80");
    if(banner) banner.hidden = true;
    if(modal) modal.hidden = true;
    document.body.classList.remove("cookie-modal-open");
  }

  function showBannerIfNeeded(){
    const banner = get("cookieBannerV80");
    if(!banner) return;
    banner.hidden = !!readConsent();
  }

  function openSettings(){
    const modal = get("cookieModalV80");
    const consent = readConsent() || {analytics:false, marketing:false};
    const analytics = get("cookieAnalyticsV80");
    const marketing = get("cookieMarketingV80");
    if(analytics) analytics.checked = !!consent.analytics;
    if(marketing) marketing.checked = !!consent.marketing;
    if(modal) modal.hidden = false;
    document.body.classList.add("cookie-modal-open");
  }

  function saveSelection(){
    writeConsent({
      analytics: !!get("cookieAnalyticsV80")?.checked,
      marketing: !!get("cookieMarketingV80")?.checked
    });
  }

  function acceptAll(){
    const analytics = get("cookieAnalyticsV80");
    const marketing = get("cookieMarketingV80");
    if(analytics) analytics.checked = true;
    if(marketing) marketing.checked = true;
    writeConsent({analytics:true, marketing:true});
  }

  function onlyNecessary(){
    const analytics = get("cookieAnalyticsV80");
    const marketing = get("cookieMarketingV80");
    if(analytics) analytics.checked = false;
    if(marketing) marketing.checked = false;
    writeConsent({analytics:false, marketing:false});
  }

  function handleCookieClick(e){
    const target = e.target.closest(
      "#cookieAcceptAllV80,#cookieAcceptAllModalV80,#cookieSaveV80,#cookieNecessaryV80,#cookieCustomizeV80,#cookieSettingsFooter,#cookieCloseV80,#cookieFloatingV82"
    );
    if(!target) return;

    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();

    if(target.id === "cookieAcceptAllV80" || target.id === "cookieAcceptAllModalV80"){
      acceptAll();
      return;
    }
    if(target.id === "cookieSaveV80"){
      saveSelection();
      return;
    }
    if(target.id === "cookieNecessaryV80"){
      onlyNecessary();
      return;
    }
    if(target.id === "cookieCustomizeV80" || target.id === "cookieSettingsFooter" || target.id === "cookieFloatingV82"){
      openSettings();
      return;
    }
    if(target.id === "cookieCloseV80"){
      const modal = get("cookieModalV80");
      if(modal) modal.hidden = true;
      document.body.classList.remove("cookie-modal-open");
      return;
    }
  }

  // Capture-Phase, damit kein anderes Website-Script die Cookie-Buttons abfängt.
  document.addEventListener("click", handleCookieClick, true);

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", showBannerIfNeeded);
  }else{
    showBannerIfNeeded();
  }

  window.laperlaOpenCookieSettings = openSettings;
})();


<button type="button" class="cookie-floating-v82" id="cookieFloatingV82" aria-label="Cookie-Einstellungen öffnen">
  Cookies
</button>



(function(){
  "use strict";
  const DRAFT_KEY="laperlaCheckoutDraftV121";
  const draftIds=["customerType","customerFirst","customerLast","customerEmail","customerPhone","customerCompany","customerVat","billingStreet","billingZip","billingCity","billingCountry","sameShipping","shippingStreet","shippingZip","shippingCity","shippingCountry","deliveryMethod","orderNote"];

  function itemCountV121(){
    try{return checkoutItems().reduce((sum,x)=>sum+Number(x.qty||0),0);}catch(_){return 0;}
  }
  function updateCheckoutLiveV121(){
    const count=itemCountV121();
    const label=count===1?"1 Artikel":`${count} Artikel`;
    let total=0;
    try{total=checkoutSubtotal()+checkoutShippingCost();}catch(_){total=0;}
    const totalText=typeof fmt==="function"?fmt(total):`${total.toFixed(2)} €`;
    ["checkoutHeaderItemsV121","checkoutActionItemsV121","checkoutSummaryCountV121"].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=label;});
    ["checkoutHeaderTotalV121","checkoutActionTotalV121"].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=totalText;});
  }

  function syncCustomerCardsV121(){
    const value=document.getElementById("customerType")?.value||"private";
    document.querySelectorAll("[data-customer-type]").forEach(btn=>{
      const active=btn.dataset.customerType===value;
      btn.classList.toggle("active",active);
      btn.setAttribute("aria-pressed",String(active));
    });
  }
  function syncDeliveryCardsV121(){
    const value=document.getElementById("deliveryMethod")?.value||"standard";
    document.querySelectorAll("[data-delivery]").forEach(btn=>{
      const active=btn.dataset.delivery===value;
      btn.classList.toggle("active",active);
      btn.setAttribute("aria-pressed",String(active));
    });
  }

  function fieldWrapperV121(el){return el?.closest(".checkout-field-v108")||null;}
  function clearFieldErrorV121(el){
    if(!el)return;
    const wrap=fieldWrapperV121(el);
    wrap?.classList.remove("has-error");
    el.removeAttribute("aria-invalid");
    wrap?.querySelector(".checkout-field-error-v121")?.remove();
  }
  function markFieldErrorV121(el,message){
    if(!el)return;
    const wrap=fieldWrapperV121(el);
    if(!wrap)return;
    clearFieldErrorV121(el);
    wrap.classList.add("has-error");
    el.setAttribute("aria-invalid","true");
    const error=document.createElement("div");
    error.className="checkout-field-error-v121";
    error.textContent=message;
    wrap.appendChild(error);
  }
  function updateFieldStateV121(el){
    if(!el || !el.matches("input,select,textarea"))return;
    const wrap=fieldWrapperV121(el);
    if(!wrap || wrap.classList.contains("checkout-native-select-v121"))return;
    const filled=el.type==="checkbox"?el.checked:String(el.value||"").trim().length>0;
    wrap.classList.toggle("is-complete",filled && el.type!=="checkbox" && el.tagName!=="TEXTAREA");
    if(filled)clearFieldErrorV121(el);
  }

  function saveCheckoutDraftV121(){
    try{
      const data={};
      draftIds.forEach(id=>{
        const el=document.getElementById(id);if(!el)return;
        data[id]=el.type==="checkbox"?el.checked:el.value;
      });
      localStorage.setItem(DRAFT_KEY,JSON.stringify(data));
    }catch(err){console.warn("Checkout-Entwurf konnte nicht gespeichert werden",err);}
  }
  function restoreCheckoutDraftV121(){
    try{
      const raw=localStorage.getItem(DRAFT_KEY);if(!raw)return;
      const data=JSON.parse(raw);
      draftIds.forEach(id=>{
        const el=document.getElementById(id);if(!el || data[id]===undefined)return;
        if(el.type==="checkbox")el.checked=Boolean(data[id]);else el.value=String(data[id]);
        updateFieldStateV121(el);
      });
      if(typeof checkoutMode!=="undefined" && checkoutMode==="b2b"){const type=document.getElementById("customerType");if(type)type.value="business";}
      if(typeof showCheckoutBusinessFields==="function")showCheckoutBusinessFields();
      if(typeof toggleShippingFields==="function")toggleShippingFields();
      syncCustomerCardsV121();syncDeliveryCardsV121();
      if(typeof renderCheckoutSummary==="function")renderCheckoutSummary();
    }catch(err){console.warn("Checkout-Entwurf konnte nicht geladen werden",err);}
  }
  function clearCheckoutDraftV121(resetFields){
    try{localStorage.removeItem(DRAFT_KEY);}catch(_){}
    if(resetFields && typeof resetCheckoutForm==="function"){
      resetCheckoutForm();
      syncCustomerCardsV121();syncDeliveryCardsV121();
      document.querySelectorAll("#checkoutForm .is-complete,#checkoutForm .has-error").forEach(el=>el.classList.remove("is-complete","has-error"));
      document.querySelectorAll("#checkoutForm .checkout-field-error-v121").forEach(el=>el.remove());
      updateCheckoutLiveV121();
      if(typeof toast==="function")toast("Eingaben wurden gelöscht");
    }
  }

  function escapeHtmlV121(value){return String(value??"").replace(/[&<>'"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));}
  function renderCheckoutReviewV121(){
    const host=document.getElementById("checkoutReviewV121");if(!host)return;
    const first=document.getElementById("customerFirst")?.value.trim()||"";
    const last=document.getElementById("customerLast")?.value.trim()||"";
    const email=document.getElementById("customerEmail")?.value.trim()||"";
    const phone=document.getElementById("customerPhone")?.value.trim()||"";
    const type=document.getElementById("customerType")?.value==="business"?"Geschäftskunde":"Privatkunde";
    const company=document.getElementById("customerCompany")?.value.trim()||"";
    const street=document.getElementById("billingStreet")?.value.trim()||"";
    const zip=document.getElementById("billingZip")?.value.trim()||"";
    const city=document.getElementById("billingCity")?.value.trim()||"";
    const country=document.getElementById("billingCountry")?.value||"";
    const delivery=document.getElementById("deliveryMethod")?.value||"standard";
    const deliveryLabel={standard:"Standardversand",pickup:"Abholung nach Vereinbarung",individual:"Individuelle Lieferung"}[delivery]||delivery;
    host.innerHTML=`
      <article class="checkout-review-card-v121"><span>Kontakt</span><b>${escapeHtmlV121(first)} ${escapeHtmlV121(last)}</b><small>${escapeHtmlV121(type)}${company?` · ${escapeHtmlV121(company)}`:""}<br>${escapeHtmlV121(email)}${phone?` · ${escapeHtmlV121(phone)}`:""}</small><button type="button" data-review-step="1">Ändern</button></article>
      <article class="checkout-review-card-v121"><span>Rechnung & Lieferung</span><b>${escapeHtmlV121(street)}</b><small>${escapeHtmlV121(zip)} ${escapeHtmlV121(city)}${country?` · ${escapeHtmlV121(country)}`:""}<br>${escapeHtmlV121(deliveryLabel)}</small><button type="button" data-review-step="2">Ändern</button></article>`;
  }

  function goToStepV121(target){
    const current=Number(window.checkoutStep||1);
    if(target<=current){setCheckoutStep(target);return;}
    let step=current;
    while(step<target){if(!validateCheckoutStep(step))return;step++;setCheckoutStep(step);}
  }

  document.addEventListener("DOMContentLoaded",function(){
    const form=document.getElementById("checkoutForm");if(!form)return;

    document.querySelectorAll("[data-step-indicator]").forEach(indicator=>{
      indicator.setAttribute("role","button");indicator.setAttribute("tabindex","0");
      const activate=()=>goToStepV121(Number(indicator.dataset.stepIndicator));
      indicator.addEventListener("click",activate);
      indicator.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();activate();}});
    });

    document.getElementById("customerTypeCardsV121")?.addEventListener("click",e=>{
      const btn=e.target.closest("[data-customer-type]");if(!btn)return;
      const select=document.getElementById("customerType");select.value=btn.dataset.customerType;
      select.dispatchEvent(new Event("change",{bubbles:true}));
      syncCustomerCardsV121();saveCheckoutDraftV121();
    });
    document.getElementById("deliveryCardsV121")?.addEventListener("click",e=>{
      const btn=e.target.closest("[data-delivery]");if(!btn)return;
      const select=document.getElementById("deliveryMethod");select.value=btn.dataset.delivery;
      select.dispatchEvent(new Event("change",{bubbles:true}));
      syncDeliveryCardsV121();saveCheckoutDraftV121();updateCheckoutLiveV121();
    });
    document.getElementById("checkoutReviewV121")?.addEventListener("click",e=>{
      const btn=e.target.closest("[data-review-step]");if(btn)setCheckoutStep(Number(btn.dataset.reviewStep));
    });
    document.getElementById("clearCheckoutDraftV121")?.addEventListener("click",()=>clearCheckoutDraftV121(true));
    const consentIds=["checkoutTerms","checkoutPrivacy","checkoutWithdrawal"];
    document.getElementById("placeOrder")?.addEventListener("click",()=>{
      consentIds.forEach(id=>{const input=document.getElementById(id);input?.closest(".checkout-check-v108")?.classList.toggle("has-error",!input.checked);});
    },true);
    consentIds.forEach(id=>document.getElementById(id)?.addEventListener("change",e=>{if(e.target.checked)e.target.closest(".checkout-check-v108")?.classList.remove("has-error");}));

    let draftTimer=0;
    form.addEventListener("input",e=>{
      updateFieldStateV121(e.target);
      clearTimeout(draftTimer);draftTimer=setTimeout(saveCheckoutDraftV121,180);
    });
    form.addEventListener("change",e=>{
      updateFieldStateV121(e.target);saveCheckoutDraftV121();
      if(e.target.id==="customerType")syncCustomerCardsV121();
      if(e.target.id==="deliveryMethod")syncDeliveryCardsV121();
      updateCheckoutLiveV121();
    });

    const originalInvalid=window.invalidField;
    if(typeof originalInvalid==="function"){
      window.invalidField=function(id,message){
        const invalid=originalInvalid(id,message);
        if(invalid)markFieldErrorV121(document.getElementById(id),message);
        return invalid;
      };
    }
    const originalSetStep=window.setCheckoutStep;
    if(typeof originalSetStep==="function"){
      window.setCheckoutStep=function(step){
        originalSetStep(step);updateCheckoutLiveV121();
        if(Number(step)===3)renderCheckoutReviewV121();
      };
    }
    const originalRender=window.renderCheckoutSummary;
    if(typeof originalRender==="function"){
      window.renderCheckoutSummary=function(){originalRender();updateCheckoutLiveV121();};
    }
    const originalOpen=window.openCheckout;
    if(typeof originalOpen==="function"){
      window.openCheckout=function(){
        const result=originalOpen.apply(this,arguments);
        restoreCheckoutDraftV121();syncCustomerCardsV121();syncDeliveryCardsV121();updateCheckoutLiveV121();
        return result;
      };
    }
    const originalApplyResult=window.applyOrderTransmissionResult;
    if(typeof originalApplyResult==="function"){
      window.applyOrderTransmissionResult=function(order,result,localSaved){
        const value=originalApplyResult(order,result,localSaved);
        if(result?.ok)clearCheckoutDraftV121(false);
        return value;
      };
    }

    syncCustomerCardsV121();syncDeliveryCardsV121();updateCheckoutLiveV121();
  });
})();



(function(){
  /* ── Editionen Code-Gate ── */
  var EDITIONS_LS_KEY = 'lapelaEditionsUnlocked';
  var EDITIONS_CODE   = 'LAPERLA2026';

  function doShowEditions(){
    document.body.classList.add('show-editions-v126');
    if(typeof go==='function') go('home');
    setTimeout(()=>{
      const el=document.getElementById('editions-overview');
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    },260);
    const dr=document.getElementById('drawer'); if(dr) dr.classList.remove('open');
    const ov=document.getElementById('drawerOverlay'); if(ov) ov.classList.remove('open');
  }

  function showEditionsGate(navToEditions){
    // Bereits freigeschaltet?
    if(localStorage.getItem(EDITIONS_LS_KEY)==='1'){
      if(navToEditions && typeof go==='function'){ go('editions'); }
      else { doShowEditions(); }
      return;
    }

    // Overlay erstellen
    var overlay = document.createElement('div');
    overlay.id = 'editions-gate-overlay';
    overlay.style.cssText = [
      'position:fixed','inset:0','z-index:9999',
      'background:rgba(10,8,4,.72)','display:flex',
      'align-items:center','justify-content:center','padding:24px'
    ].join(';');

    overlay.innerHTML = '<div style="background:#fbf8f0;border-radius:18px;padding:44px 40px 36px;max-width:420px;width:100%;text-align:center;box-shadow:0 32px 80px rgba(0,0,0,.35);position:relative;">'
      + '<button id="edGateClose" style="position:absolute;top:14px;right:18px;background:none;border:none;font-size:1.4rem;cursor:pointer;color:#888;line-height:1">✕</button>'
      + '<div style="font-family:var(--serif,serif);font-size:2.2rem;font-style:italic;color:#8c6a1e;letter-spacing:.02em;margin-bottom:6px">Laperla</div>'
      + '<div style="font-family:var(--display,sans-serif);font-size:.65rem;letter-spacing:.45em;text-transform:uppercase;color:#b89040;margin-bottom:28px">Éditions · Zugang</div>'
      + '<p style="font-size:.92rem;color:#555;margin-bottom:20px;line-height:1.55">Dieser Bereich ist zugangsbeschränkt.<br>Bitte geben Sie Ihren Editionen-Code ein.</p>'
      + '<input id="edGateInput" type="password" placeholder="Code eingeben …" style="width:100%;box-sizing:border-box;padding:12px 16px;border:1.5px solid #d4c08a;border-radius:9px;font-size:1rem;text-align:center;letter-spacing:.12em;outline:none;margin-bottom:12px;background:#fff;">'
      + '<div id="edGateError" style="color:#c0392b;font-size:.82rem;min-height:18px;margin-bottom:10px"></div>'
      + '<button id="edGateSubmit" style="width:100%;padding:13px;background:linear-gradient(135deg,#c9a227,#8c6a1e);color:#fff;border:none;border-radius:9px;font-size:.88rem;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;font-family:var(--display,sans-serif)">Freischalten</button>'
      + '</div>';

    document.body.appendChild(overlay);
    setTimeout(()=>{ var inp=document.getElementById('edGateInput'); if(inp) inp.focus(); }, 80);

    function closeGate(){ var o=document.getElementById('editions-gate-overlay'); if(o) o.remove(); }

    document.getElementById('edGateClose').onclick = closeGate;
    overlay.addEventListener('click', function(e){ if(e.target===overlay) closeGate(); });

    function tryCode(){
      var val=(document.getElementById('edGateInput').value||'').trim().toUpperCase();
      if(val===EDITIONS_CODE){
        localStorage.setItem(EDITIONS_LS_KEY,'1');
        closeGate();
        if(navToEditions && typeof go==='function'){ go('editions'); }
        else { doShowEditions(); }
        if(window.__toast) window.__toast('Editionen freigeschaltet ✓');
      } else {
        var errEl=document.getElementById('edGateError');
        if(errEl){ errEl.textContent='Ungültiger Code — bitte erneut versuchen.'; }
        var inp=document.getElementById('edGateInput');
        if(inp){ inp.value=''; inp.focus(); }
      }
    }

    document.getElementById('edGateSubmit').onclick = tryCode;
    document.getElementById('edGateInput').addEventListener('keydown', function(e){ if(e.key==='Enter') tryCode(); });
  }

  // Handler: Menü-Link "Editionen" (editions-overview = Home + Scroll)
  document.addEventListener('click', e=>{
    const el = e.target.closest('[data-nav="editions-overview"]');
    if(!el) return;
    e.preventDefault();
    showEditionsGate(false);
  }, true);

  // Handler: Berlin-Edition "Alle Editionen"-Button → nach Gate → page-editions
  document.addEventListener('click', e=>{
    const el = e.target.closest('[data-nav="editions-gate-all"]');
    if(!el) return;
    e.preventDefault();
    showEditionsGate(true);
  }, true);
})();


(function(){
  function showBerlin(){
    document.body.classList.add('show-berlin-v127');
    if(typeof go==='function') go('home');
    setTimeout(()=>{
      const el=document.getElementById('royal-edition');
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    },260);
    const dr=document.getElementById('drawer'); if(dr) dr.classList.remove('open');
    const ov=document.getElementById('drawerOverlay'); if(ov) ov.classList.remove('open');
  }
  document.addEventListener('click', e=>{
    const el = e.target.closest('[data-nav="berlin-edition"]');
    if(!el) return;
    e.preventDefault();
    showBerlin();
  }, true);
})();


(function(){
  const track = document.querySelector('.reviews-track-v131');
  if(!track) return;
  const cards = Array.from(track.children);
  cards.forEach(c => track.appendChild(c.cloneNode(true)));
})();
