'use client';
import { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react';
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

const LANG_LABELS = {
  de: 'Deutsch', en: 'English', fr: 'Français',
  it: 'Italiano', es: 'Español', ar: 'العربية'
};

export default function PdpI18n({ productId }) {
  const [lang, setLang] = useState('de');
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const apply = useCallback((l) => {
    document.querySelectorAll('[data-pd]').forEach((el) => {
      const k = el.getAttribute('data-pd');
      const v = tr(k, l);
      if (v !== k) el.innerHTML = v;
    });
    document.querySelectorAll('[data-pd-aria]').forEach((el) => {
      const k = el.getAttribute('data-pd-aria');
      const v = tr(k, l);
      if (v !== k) el.setAttribute('aria-label', v);
    });
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
    const ul = document.getElementById('pdTasting');
    const tasting = field(productId, 'tasting', l);
    if (ul && Array.isArray(tasting)) {
      ul.innerHTML = tasting.map((x) => '<li>' + x + '</li>').join('');
    }
    const dl = document.getElementById('pdDetails');
    const det = field(productId, 'details', l);
    if (dl && Array.isArray(det)) {
      dl.innerHTML = det.map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>').join('');
    }
    document.querySelectorAll('[data-pd-medal]').forEach((el) => {
      el.textContent = tr(el.getAttribute('data-pd-medal'), l);
    });
    document.querySelectorAll('[data-pd-rel]').forEach((el) => {
      const relId = el.getAttribute('data-pd-rel');
      const f = el.getAttribute('data-pd-field');
      const v = field(relId, f, l);
      if (v !== null && v !== undefined && v !== '') el.textContent = v;
    });
    document.querySelectorAll('[data-pd-rel-cat]').forEach((el) => {
      const cat = el.getAttribute('data-cat') || 'glass';
      el.textContent = tr(cat === 'glass' ? 'cat_glass' : cat === 'tin' ? 'cat_tin' : 'cat_gift', l);
    });
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

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const selectLang = (l) => {
    setLang(l);
    apply(l);
    setOpen(false);
  };

  return (
    <div className="pdp-lang-switch">
      <button
        ref={btnRef}
        className="pdp-lang-btn"
        type="button"
        aria-haspopup="listbox"
        aria-label={tr('langAria', lang)}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
      >
        <svg className="pdp-lang-globe" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9"/>
          <path d="M3 12h18M12 3c2.8 2.6 4 5.7 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.7-4-9s1.2-6.4 4-9Z"/>
        </svg>
        <span>{lang.toUpperCase()}</span>
        <span className="pdp-lang-caret">⌄</span>
      </button>
      {open && (
        <div className="pdp-lang-menu" ref={menuRef} role="listbox" aria-label={tr('langAria', lang)}>
          <div className="pdp-lang-menu-head">
            <span className="pdp-lmh-title">Sprache · Language</span>
            <span className="pdp-lmh-count">6 Sprachen</span>
          </div>
          <div className="pdp-lang-menu-grid">
            {PDP_LANGS.map((l) => (
              <button
                key={l}
                className={`pdp-lang-opt${l === lang ? ' active' : ''}`}
                role="option"
                aria-selected={l === lang}
                onClick={() => selectLang(l)}
              >
                <span className="pdp-lo-code">{l.toUpperCase()}</span>
                <span className="pdp-lo-name">{LANG_LABELS[l] || l}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
