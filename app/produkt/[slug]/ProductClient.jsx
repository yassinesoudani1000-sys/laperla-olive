'use client';
import { useEffect, useRef, useState } from 'react';
import { PDP_UI, PDP_LANG_KEY } from '../../lib/pdp-i18n';

const CART_KEY = 'laperlaCartV1';

function readCartItems() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.items)) return [];
    return data.items;
  } catch (e) {
    return [];
  }
}

function cartCount(items) {
  return items.reduce((s, x) => s + (parseInt(x.qty, 10) || 0), 0);
}

function ui(key, lang) {
  const row = PDP_UI[key];
  if (!row) return key;
  return row[lang] || row.de || key;
}

export default function ProductClient({ product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [lang, setLang] = useState('de');
  const timerRef = useRef(null);

  // Langue : synchronisée avec le reste du site (localStorage + événement PdpI18n)
  useEffect(() => {
    const initial = window.__PDP_LANG || (() => { try { return localStorage.getItem(PDP_LANG_KEY) || 'de'; } catch (e) { return 'de'; } })();
    setLang(initial);
    const onPdpLang = (e) => setLang(e.detail || 'de');
    const onStorage = (e) => { if (e.key === PDP_LANG_KEY && e.newValue) setLang(e.newValue); };
    window.addEventListener('pdp:lang', onPdpLang);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('pdp:lang', onPdpLang);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Compteur du panier dans l'en-tête (partagé avec la boutique via localStorage)
  useEffect(() => {
    const update = () => {
      const items = readCartItems();
      const n = cartCount(items);
      document.querySelectorAll('[data-cart-count]').forEach((el) => {
        el.textContent = n;
        el.hidden = n <= 0;
      });
    };
    update();
    window.addEventListener('storage', update);
    window.addEventListener('focus', update);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('focus', update);
    };
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (!product.available) {
    return (
      <div className="pdp-buy">
        <button className="pdp-add is-disabled" type="button" disabled>
          {ui('notOrderable', lang)}
        </button>
        <p className="pdp-buy-note">{ui('unavailableNote', lang)}</p>
      </div>
    );
  }

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(99, q + 1));

  const addToCart = () => {
    // Écrit dans le même format que la boutique principale (fusion des lignes)
    const items = readCartItems();
    const line = items.find((x) => x.id === product.id);
    if (line) {
      line.qty = Math.min(99, (parseInt(line.qty, 10) || 1) + qty);
    } else {
      items.push({ id: product.id, qty });
    }
    try {
      localStorage.setItem(CART_KEY, JSON.stringify({ v: 1, ts: Date.now(), items }));
    } catch (e) {}
    // Met à jour le compteur de l'en-tête immédiatement
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = cartCount(items);
      el.hidden = false;
    });
    setAdded(true);
    setShowPanel(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pdp-buy">
      <div className="pdp-buy-row">
        <div className="pdp-qty" aria-label={ui('qtyAria', lang)}>
          <button type="button" onClick={dec} aria-label={ui('decAria', lang)} disabled={qty <= 1}>−</button>
          <span aria-live="polite">{qty}</span>
          <button type="button" onClick={inc} aria-label={ui('incAria', lang)} disabled={qty >= 99}>+</button>
        </div>
        <button className={`pdp-add${added ? ' is-added' : ''}`} type="button" onClick={addToCart}>
          {added ? ui('added', lang) : ui('addCart', lang)}
        </button>
      </div>

      {showPanel ? (
        <div className="pdp-confirm" role="dialog" aria-modal="true" aria-label={ui('confirmTitle', lang)}>
          <button className="pdp-confirm-close" type="button" aria-label={ui('confirmClose', lang)} onClick={() => setShowPanel(false)}>✕</button>
          <div className="pdp-confirm-check" aria-hidden="true">✓</div>
          <b>{ui('confirmTitle', lang)}</b>
          <p>{qty} × {product.name} · {product.vol}</p>
          <div className="pdp-confirm-actions">
            <a className="pdp-confirm-primary" href="/?openCart=1">{ui('toCart', lang)}</a>
            <a className="pdp-confirm-ghost" href="/#shop" onClick={() => setShowPanel(false)}>{ui('continueShopping', lang)}</a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
