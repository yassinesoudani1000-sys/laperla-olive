#!/bin/bash
BASE="/home/yassine/Bureau/perla_v6/app"

for dir in about account awards berlin discover gallery legal mission story wholesale; do
  mkdir -p "$BASE/$dir"
  cat > "$BASE/$dir/page.jsx" << 'EOF'
import Header from '../../components/Header';
import NavDrawer from '../../components/NavDrawer';
import CartDrawer from '../../components/CartDrawer';
import CheckoutModal from '../../components/CheckoutModal';
import CookieConsent from '../../components/CookieConsent';
import Toast from '../../components/Toast';

export default function Page() {
  return (
    <>
      <Header />
      <NavDrawer />
      <CartDrawer />
      <CheckoutModal />
      <CookieConsent />
      <Toast />
      <main style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <div className="wrap" style={{ textAlign: 'center', padding: '80px 32px' }}>
          <h1 style={{ fontFamily: 'var(--script)', fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
            La Perla
          </h1>
          <div className="divider-orn" style={{ margin: '20px auto' }}>
            <span>&#10026;</span>
          </div>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '500px', margin: '0 auto' }}>
            Premium Olive Oil &middot; Edition Prestige
          </p>
        </div>
      </main>
      <footer>
        <div className="wrap">
          <div className="footer-bottom" style={{ padding: '40px 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <span>&copy; 2026 La Perla &middot; Premium Olive Oil</span>
            <span><a href="/legal">Impressum</a></span>
          </div>
        </div>
      </footer>
    </>
  );
}
EOF
  echo "Created $dir/page.jsx"
done

# Create legal sub-routes
mkdir -p "$BASE/legal/impressum" "$BASE/legal/datenschutz" "$BASE/legal/agb"
for sub in impressum datenschutz agb; do
  cp "$BASE/legal/page.jsx" "$BASE/legal/$sub/page.jsx" 2>/dev/null
  echo "Created legal/$sub/page.jsx"
done
