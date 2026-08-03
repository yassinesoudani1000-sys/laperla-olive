'use client';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { PDP_UI, PDP_PRODUCTS, PDP_LANGS, PDP_LANG_KEY } from '../../lib/pdp-i18n';

function tr(key, lang) {
  const row = PDP_UI[key];
  if (!row) return key;
  return row[lang] || row.de || key;
}

function field(productId, f, lang) {
  const p = PDP_PRODUCTS[productId];
  if (!p || !p[f]) return null;
  const row = p[f];
  return row[lang] || row.de || null;
}

export default function PdpI18n({ productId }) {
  const [lang, setLang] = useState('de');

  const apply = useCallback((l) => {
    // Textes UI marqués data-pd="clé"
    document.querySelectorAll('[data-pd]').forEach((el) => {
      const k = el.getAttribute('data-pd');
      const v = tr(k, l);
      if (v !== k) el.innerHTML = v;
    });
    // Attributs aria-label marqués data-pd-aria="clé"
    document.querySelectorAll('[data-pd-aria]').forEach((el) => {
      const k = el.getAttribute('data-pd-aria');
      const v = tr(k, l);
      if (v !== k) el.setAttribute('aria-label', v);
    });
    // Champs produit simples (par id)
    const simple = [
      ['pdCat', 'catLabel'],
      ['pdName', 'name'],
      ['pdNameBc', 'name'],
      ['pdVol', 'vol'],
      ['pdNotes', 'notes'],
      ['pdTrust', 'trust'],
      ['pdFlag', 'flag'],
      ['pdBadge', 'badge'],
      ['pdDesc', 'description'],
    ];
    simple.forEach(([eid, f]) => {
      const el = document.getElementById(eid);
      if (!el) return;
      let v;
      if (f === 'catLabel') {
        const cat = el.getAttribute('data-cat') || 'glass';
        v = tr(cat === 'glass' ? 'cat_glass' : cat === 'tin' ? 'cat_tin' : 'cat_gift', l);
      } else {
        v = field(productId, f, l);
      }
      if (v !== null && v !== undefined) {
        el.textContent = v;
        el.hidden = v === '';
      }
    });
    // Liste de dégustation
    const ul = document.getElementById('pdTasting');
    const tasting = field(productId, 'tasting', l);
    if (ul && Array.isArray(tasting)) {
      ul.innerHTML = tasting.map((x) => '<li>' + x + '</li>').join('');
    }
    // Détails & origine
    const dl = document.getElementById('pdDetails');
    const det = field(productId, 'details', l);
    if (dl && Array.isArray(det)) {
      dl.innerHTML = det.map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>').join('');
    }
    // Médailles
    document.querySelectorAll('[data-pd-medal]').forEach((el) => {
      el.textContent = tr(el.getAttribute('data-pd-medal'), l);
    });
    // Produits associés
    document.querySelectorAll('[data-pd-rel]').forEach((el) => {
      const relId = el.getAttribute('data-pd-rel');
      const f = el.getAttribute('data-pd-field');
      const v = field(relId, f, l);
      if (v !== null && v !== undefined && v !== '') el.textContent = v;
    });
    // Catégories des produits associés
    document.querySelectorAll('[data-pd-rel-cat]').forEach((el) => {
      const cat = el.getAttribute('data-cat') || 'glass';
      el.textContent = tr(cat === 'glass' ? 'cat_glass' : cat === 'tin' ? 'cat_tin' : 'cat_gift', l);
    });
    // Langue du document
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.remove('pdp-i18n-loading');
    try { localStorage.setItem(PDP_LANG_KEY, l); } catch (e) {}
    window.dispatchEvent(new CustomEvent('pdp:lang', { detail: l }));
  }, [productId]);

  useLayoutEffect(() => {
    const l = window.__PDP_LANG || 'de';
    setLang(l);
    if (l !== 'de') apply(l);
    else document.documentElement.classList.remove('pdp-i18n-loading');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === PDP_LANG_KEY && e.newValue && e.newValue !== lang) {
        setLang(e.newValue);
        apply(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [lang, apply]);

  const change = (e) => {
    const l = e.target.value;
    setLang(l);
    apply(l);
  };

  return (
    <select
      className="pdp-lang"
      aria-label={tr('langAria', lang)}
      value={lang}
      onChange={change}
    >
      {PDP_LANGS.map((l) => (
        <option key={l} value={l}>{l.toUpperCase()}</option>
      ))}
    </select>
  );
}
