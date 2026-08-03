import { notFound } from 'next/navigation';
import { PRODUCTS, MEDALS, getProductBySlug, getRelatedProducts, fmtPrice, perLitre } from '../../lib/products';
import ProductClient from './ProductClient';
import PdpI18n from './PdpI18n';
import '../pdp.css';

const SITE_URL = 'https://laperla-olive.de';

// Script anti-flash exécuté avant le premier paint : pose la langue et,
// si la langue n'est pas l'allemand (SSR), masque les textes traduisibles
// jusqu'à l'application des traductions par PdpI18n (pas de flash allemand).
const LANG_BOOT = `(function(){try{
var l=localStorage.getItem('laperla_lang')||'de';
if(!/^(de|en|fr|it|es|ar)$/.test(l))l='de';
window.__PDP_LANG=l;
document.documentElement.lang=l;
if(l==='ar')document.documentElement.dir='rtl';
if(l!=='de')document.documentElement.classList.add('pdp-i18n-loading');
setTimeout(function(){document.documentElement.classList.remove('pdp-i18n-loading')},1500);
}catch(e){}})();`;

// Pages générées en statique au build → ultra rapide (SSG)
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: 'Produkt nicht gefunden · LAPERLA Olive Oil' };
  const title = `${p.name} · LAPERLA Olive Oil`;
  const description = `${p.notes} ${p.vol} — ${fmtPrice(p.price)}. Prämiertes tunesisches Olivenöl extra vergine, ECO-CERT & TN-BIO-001 zertifiziert.`;
  return {
    title,
    description,
    alternates: { canonical: `/produkt/${p.slug}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/produkt/${p.slug}`,
      title,
      description,
      images: [{ url: p.img, alt: p.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [p.img] },
  };
}

function jsonLd(p) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: [`${SITE_URL}${p.img}`],
    description: p.description,
    sku: p.ref,
    brand: { '@type': 'Brand', name: 'LAPERLA' },
    url: `${SITE_URL}/produkt/${p.slug}`,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/produkt/${p.slug}`,
      priceCurrency: 'EUR',
      price: p.price.toFixed(2),
      availability: p.available === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

// Sceaux d'excellence affichés sous le titre (style boutique)
function sealsFor(p) {
  const seals = [];
  if (/Best in the World/i.test(p.flag || '')) seals.push(['Genf 2024', 'Best in World']);
  if (/Gold|goldprämiert/i.test(p.badge || '')) seals.push(['Bari 2026', 'Gold · Biol']);
  seals.push(['Säuregehalt', 'unter 0,3 %']);
  seals.push(['Extra vergine', 'Kaltgepresst']);
  return seals.slice(0, 3);
}

// Médailles traduisibles : mappe le libellé allemand vers une clé i18n
function medalKey(l) {
  const lower = l.toLowerCase();
  if (/double/i.test(lower)) return 'medalDouble';
  if (/extra/i.test(lower)) return 'medalExtra';
  if (/best/i.test(lower)) return 'medalBest';
  if (/gold/i.test(lower)) return 'medalGold';
  return 'medalGold';
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const related = getRelatedProducts(p, 3);
  const perL = perLitre(p);
  const isPair = (p.images || []).length > 1;
  const unavailable = p.available === false;
  const seals = sealsFor(p);

  return (
    <div className="pdp">
      <script dangerouslySetInnerHTML={{ __html: LANG_BOOT }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(p)) }} />

      {/* ---- Barre supérieure ---- */}
      <header className="pdp-top">
        <a className="pdp-back" href="/#shop" data-pd-aria="backAria" aria-label="Zurück zur Kollektion">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span data-pd="back">Kollektion</span>
        </a>
        <a className="pdp-brand" href="/" data-pd-aria="brandAria" aria-label="LAPERLA Olive Oil — Startseite">
          <span className="pdp-brand-name">La Perla</span>
          <span className="pdp-brand-sub">Édition Prestige</span>
        </a>
        <div className="pdp-top-right">
          <PdpI18n productId={p.id} />
          <a className="pdp-cart" href="/?openCart=1" data-pd-aria="cartAria" aria-label="Warenkorb öffnen">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12l1 14H5L6 7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 9V6a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="pdp-cart-count" data-cart-count hidden>0</span>
          </a>
        </div>
      </header>

      {/* ---- Fil d'Ariane ---- */}
      <nav className="pdp-breadcrumb wrap" aria-label="Breadcrumb">
        <a href="/" data-pd="bcHome">Startseite</a>
        <span aria-hidden="true">·</span>
        <a href="/#shop" data-pd="bcCollection">Kollektion</a>
        <span aria-hidden="true">·</span>
        <span aria-current="page" id="pdNameBc">{p.name}</span>
      </nav>

      <main className="wrap">
        {/* ---- Carte maîtresse ---- */}
        <section className="pdp-master">
          {/* Scène produit */}
          <div className={`pdp-stage${isPair ? ' is-pair' : ''}`}>
            {p.flag ? (
              <span className="pdp-award"><span aria-hidden="true">{unavailable ? '✕' : '★'}</span><span id="pdFlag">{p.flag}</span></span>
            ) : null}
            {(p.images || [p.img]).map((src, i) => (
              <img key={i} src={src} alt={isPair ? `${p.name} – Flasche ${i + 1}` : p.name} loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />
            ))}
            <span className="pdp-podium" aria-hidden="true"></span>
          </div>

          {/* Informations */}
          <div className="pdp-body">
            <div className="pdp-eyebrow">
              <span id="pdCat" data-cat={p.cat}>{p.catLabel}</span>
              <span className="pdp-eyebrow-sep" aria-hidden="true">·</span>
              <span>Réf. {p.ref}</span>
            </div>
            <h1 className="pdp-title" id="pdName">{p.name}</h1>
            <div className="pdp-vol" id="pdVol">{p.vol}</div>

            <p className="pdp-lead" id="pdNotes">{p.notes}</p>

            {p.trust ? <div className="pdp-trust"><span aria-hidden="true">★</span><span id="pdTrust">{p.trust}</span></div> : null}
            {p.badge && !p.trust ? <div className="pdp-trust"><span aria-hidden="true">★</span><span id="pdBadge">{p.badge}</span></div> : null}

            {/* Sceaux */}
            <div className="pdp-seals">
              {seals.map(([b, s], i) => (
                <span key={i}><strong data-pd={`sealAward${i + 1}b`}>{b}</strong><span data-pd={`sealAward${i + 1}s`}>{s}</span></span>
              ))}
            </div>

            {/* Points clés */}
            <ul className="pdp-meta">
              <li data-pd="meta1">Säuregehalt unter 0,3 % · erste Kaltpressung</li>
              <li data-pd="meta2">100 % Chemlali · Zembra la Romaine, Tunesien</li>
              <li data-pd="meta3">EU-Bio zertifiziert · ECO-CERT · TN-BIO-001</li>
            </ul>

            {/* Achat */}
            <div className="pdp-buy-zone">
              <div className="pdp-price-wrap">
                {unavailable ? (
                  <div className="pdp-unavailable" data-pd="unavailable">{p.flag || 'Nicht verfügbar'}</div>
                ) : (
                  <>
                    <div className="pdp-price">{fmtPrice(p.price)}</div>
                    <small>{perL ? `${perL} · ` : ''}<span data-pd="vat">inkl. MwSt.</span></small>
                  </>
                )}
              </div>
              <ProductClient product={{ id: p.id, name: p.name, price: p.price, vol: p.vol, available: p.available !== false }} />
            </div>
            {!unavailable && <div className="pdp-note">◆ <span data-pd="shipNote">Versandfertig in 24 h · Versicherter Versand · Bruchsicher verpackt</span></div>}
          </div>
        </section>

        {/* ---- Panneaux d'information ---- */}
        <section className="pdp-panels">
          <article className="pdp-panel">
            <h2><span aria-hidden="true">✦</span> <span data-pd="panelDesc">Beschreibung</span></h2>
            <p id="pdDesc">{p.description}</p>
          </article>
          <article className="pdp-panel">
            <h2><span aria-hidden="true">✦</span> <span data-pd="panelTasting">Verkostungsnotizen</span></h2>
            <ul id="pdTasting">{p.tasting.map((note, i) => <li key={i}>{note}</li>)}</ul>
          </article>
          <article className="pdp-panel">
            <h2><span aria-hidden="true">✦</span> <span data-pd="panelDetails">Details &amp; Herkunft</span></h2>
            <dl id="pdDetails">{p.details.map(([k, v], i) => <div key={i}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </article>
          <article className="pdp-panel">
            <h2><span aria-hidden="true">✦</span> <span data-pd="panelShipping">Versand &amp; Lieferung</span></h2>
            <p data-pd="shippingText">Versandfertig innerhalb von 24 Stunden. Versicherter Versand mit bruchsicherer Verpackung. Lieferung innerhalb Deutschlands in 2–4 Werktagen, EU-weit in 3–7 Werktagen.</p>
            <ul className="pdp-panel-checks">
              <li data-pd="shipCheck1">Versicherter Versand</li>
              <li data-pd="shipCheck2">Bruchsichere Premium-Verpackung</li>
              <li data-pd="shipCheck3">Sendungsverfolgung inklusive</li>
            </ul>
          </article>
        </section>

        {/* ---- Médailles ---- */}
        <section className="pdp-medals" aria-label="Auszeichnungen">
          <div className="pdp-medals-head">
            <span className="pdp-eyebrow-sm" data-pd="medalsKicker">Auszeichnungen</span>
            <h2 data-pd="medalsTitle">Prämiert auf drei Kontinenten</h2>
          </div>
          <ul>
            {MEDALS.map((m, i) => (
              <li key={i}><span className="pdp-medal-star" aria-hidden="true">★</span><b>{m.y}</b><small data-pd-medal={medalKey(m.l)}>{m.l}</small></li>
            ))}
          </ul>
        </section>

        {/* ---- Produits associés ---- */}
        <section className="pdp-related">
          <div className="pdp-related-head">
            <span className="pdp-eyebrow-sm" data-pd="relKicker">Weiter entdecken</span>
            <h2 data-pd="relTitle">Das könnte Ihnen gefallen</h2>
          </div>
          <div className="pdp-related-grid">
            {related.map((r) => (
              <a className="pdp-rel-card" key={r.id} href={`/produkt/${r.slug}`}>
                <i className="pdp-rel-corners" aria-hidden="true"></i>
                <span className="pdp-rel-media">
                  <img src={r.img} alt={r.name} loading="lazy" />
                </span>
                <span className="pdp-rel-body">
                  <span className="pdp-rel-cat" data-cat={r.cat} data-pd-rel-cat>{r.catLabel}</span>
                  <b data-pd-rel={r.id} data-pd-field="name">{r.name}</b>
                  <small data-pd-rel={r.id} data-pd-field="vol">{r.vol}</small>
                  <span className="pdp-rel-foot">
                    <span className="pdp-rel-price">{fmtPrice(r.price)}</span>
                    <span className="pdp-rel-go" aria-hidden="true" data-pd="relGo">Ansehen →</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* ---- Pied de page ---- */}
      <div className="pdp-footer" role="contentinfo">
        <div className="wrap pdp-footer-inner">
          <a className="pdp-brand" href="/" data-pd-aria="brandAria" aria-label="LAPERLA Olive Oil — Startseite">
            <span className="pdp-brand-name">La Perla</span>
            <span className="pdp-brand-sub">Édition Prestige</span>
          </a>
          <nav aria-label="Footer">
            <a href="/#shop" data-pd="bcCollection">Kollektion</a>
            <a href="/#awards" data-pd="footAwards">Auszeichnungen</a>
            <a href="/#story" data-pd="footStory">Story</a>
            <a href="/#contact" data-pd="footContact">Kontakt</a>
          </nav>
          <small data-pd="footCopy">© LAPERLA Olive Oil · Prämiertes tunesisches Olivenöl</small>
        </div>
      </div>
    </div>
  );
}
