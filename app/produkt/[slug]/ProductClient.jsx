'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PDP_UI, PDP_LANG_KEY } from '../../lib/pdp-i18n';
import { PRODUCTS } from '../../lib/products';

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

function fmt(n) {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20AC';
}

function ui(key, lang) {
  const row = PDP_UI[key];
  if (!row) return key;
  return row[lang] || row.de || key;
}

function getCartLoaded() {
  const rawItems = readCartItems();
  return rawItems
    .map((it) => {
      const p = PRODUCTS.find((x) => x.id === it.id);
      if (!p) return null;
      return { ...p, qty: parseInt(it.qty, 10) || 1 };
    })
    .filter(Boolean);
}

function cartItemsToStorage(items) {
  return items.map((x) => ({ id: x.id, qty: x.qty }));
}

export default function ProductClient({ product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [lang, setLang] = useState('de');
  const timerRef = useRef(null);
  const scrollYRef = useRef(0);

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

  useEffect(() => {
    if (showCart) {
      setCartItems(getCartLoaded());
      scrollYRef.current = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [showCart]);

  useEffect(() => {
    const onIconClick = (e) => {
      const a = e.target.closest('a.pdp-cart');
      if (!a) return;
      e.preventDefault();
      setShowCart(true);
    };
    document.addEventListener('click', onIconClick);
    return () => document.removeEventListener('click', onIconClick);
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
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = cartCount(items);
      el.hidden = false;
    });
    setAdded(true);
    setShowPanel(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 2000);
  };

  const refreshCart = () => {
    const raw = readCartItems();
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      const n = cartCount(raw);
      el.textContent = n;
      el.hidden = n <= 0;
    });
    setCartItems(getCartLoaded());
  };

  const total = cartItems.reduce((s, x) => s + x.price * x.qty, 0);

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
            <button className="pdp-confirm-primary" type="button" onClick={() => { setShowPanel(false); setShowCart(true); }}>{ui('toCart', lang)}</button>
            <a className="pdp-confirm-ghost" href="/#shop" onClick={() => setShowPanel(false)}>{ui('continueShopping', lang)}</a>
          </div>
        </div>
      ) : null}

      {showCart && typeof document !== 'undefined' ? createPortal(
        <>
          <div className="drawer-overlay" onClick={() => setShowCart(false)} style={{ zIndex: 121, opacity: 1, visibility: 'visible' }} />
          <aside className="cart-drawer" style={{ zIndex: 122, transform: 'translateX(0)' }}>
            <div className="cart-head">
              <h3 className="script-font" style={{ fontSize: '1.9rem' }}>{ui('toCart', lang)}</h3>
              <button className="cart-close" type="button" aria-label={ui('confirmClose', lang)} onClick={() => setShowCart(false)}>✕</button>
            </div>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">{ui('emptyCart', lang)}</div>
              ) : (
                cartItems.map((item) => (
                  <div className="cart-line" key={item.id}>
                    <div className="cart-line-img">
                      {(item.images || [{ src: item.img }]).slice(0, 3).map((src, i) => (
                        <img key={i} src={typeof src === 'string' ? src : src.src} alt={item.name} />
                      ))}
                    </div>
                    <div className="cart-line-info">
                      <h5>{item.name}</h5>
                      <div className="v">{item.vol}</div>
                      <div className="cart-unit-price-v114">Einzelpreis: {fmt(item.price)}</div>
                      <div className="qty">
                        <button data-qty={item.id} data-d="-1" type="button" onClick={() => {
                          const raw = readCartItems();
                          const line = raw.find((x) => x.id === item.id);
                          if (line) {
                            line.qty = Math.max(0, (parseInt(line.qty, 10) || 1) - 1);
                            if (line.qty <= 0) raw.splice(raw.indexOf(line), 1);
                            try { localStorage.setItem(CART_KEY, JSON.stringify({ v: 1, ts: Date.now(), items: cartItemsToStorage(raw) })); } catch (e) {}
                            refreshCart();
                          }
                        }}>−</button>
                        <span>{item.qty}</span>
                        <button data-qty={item.id} data-d="1" type="button" onClick={() => {
                          const raw = readCartItems();
                          const line = raw.find((x) => x.id === item.id);
                          if (line) {
                            line.qty = Math.min(99, (parseInt(line.qty, 10) || 1) + 1);
                            try { localStorage.setItem(CART_KEY, JSON.stringify({ v: 1, ts: Date.now(), items: cartItemsToStorage(raw) })); } catch (e) {}
                            refreshCart();
                          }
                        }}>+</button>
                      </div>
                    </div>
                    <div className="cart-line-price"><small>Gesamt</small>{fmt(item.price * item.qty)}</div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-foot">
              <div className="cart-total">
                <span>Gesamt</span>
                <span id="pdp-cart-total">{fmt(total)}</span>
              </div>
              <a className="btn btn-gold" href={`/?openCart=1`}>{ui('checkout', lang)}</a>
              <div className="ship-note">Gastbestellung ohne Kundenkonto · Ihre Anfrage ist zunächst unverbindlich.</div>
            </div>
          </aside>
        </>,
        document.body
      ) : null}
    </div>
  );
}
