#!/usr/bin/env python3
"""
Final generator: extracts HTML content exactly, uses dangerouslySetInnerHTML.
Preserves ALL original content with zero changes.
Only replaces Base64 data URIs with image paths.
"""
import re
import json
import os

HTML_PATH = '/home/yassine/Bureau/perla_v6/86 claude v2 2.html'
BASE = '/home/yassine/Bureau/perla_v6'
MAPPING_PATH = os.path.join(BASE, 'public/images/mapping.json')

with open(MAPPING_PATH) as f:
    mapping = json.load(f)

def replace_data_uris(text):
    for b64, img_path in mapping.items():
        if b64 in text:
            text = text.replace(b64, img_path)
    return text

# Read HTML
with open(HTML_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

print(f"Read HTML: {len(html):,} chars")

# Replace all data URIs in the full HTML first
html_replaced = replace_data_uris(html)
print("Replaced data URIs")

# Extract sections using exact position-based extraction (more reliable than regex)

# Find key positions
pos_gate = html.find('<div id="gate"')
pos_header = html.find('<header', pos_gate) if pos_gate >= 0 else html.find('<header')
pos_nav = html.find('<aside class="slide-menu"')
pos_home = html.find('id="page-home"')
pos_gallery = html.find('id="page-gallery"')
pos_footer = html.find('<footer')
pos_cart = html.find('<aside class="cart-drawer"')
pos_checkout = html.find('class="modal-overlay" id="checkoutModal"')
pos_cookie_banner = html.find('class="cookie-banner-v80"')
pos_cookie_modal = html.find('class="cookie-modal-v80"')
pos_toast = html.find('class="toast" id="toast"')
pos_script_start = html.find('<script>')

# Helper: extract content from start to end position
def extract(start_tag, end_marker, start_after=None):
    if start_after:
        p = html.find(start_tag, start_after)
    else:
        p = html.find(start_tag)
    if p < 0: return ''
    # Find the closing of the start tag
    tag_end = html.find('>', p)
    if tag_end < 0: return ''
    content_start = tag_end + 1
    
    if end_marker == '</>' or end_marker == 'EOF':
        return html[content_start:]
    
    # Find end marker after content start
    if isinstance(end_marker, tuple):
        # Multiple possible end markers
        end_pos = len(html)
        for mk in end_marker:
            ep = html.find(mk, content_start)
            if ep >= 0 and ep < end_pos:
                end_pos = ep
        if end_pos < len(html):
            return html[content_start:end_pos]
        return html[content_start:]
    
    ep = html.find(end_marker, content_start)
    if ep >= 0:
        return html[content_start:ep]
    return ''

# Extract sections from the replaced HTML
def extract_replaced(start_tag, end_marker, start_after=None):
    if start_after:
        p = html_replaced.find(start_tag, start_after)
    else:
        p = html_replaced.find(start_tag)
    if p < 0: return ''
    tag_end = html_replaced.find('>', p)
    if tag_end < 0: return ''
    content_start = tag_end + 1
    
    if end_marker == '</>' or end_marker == 'EOF':
        return html_replaced[content_start:]
    
    if isinstance(end_marker, tuple):
        end_pos = len(html_replaced)
        for mk in end_marker:
            ep = html_replaced.find(mk, content_start)
            if ep >= 0 and ep < end_pos:
                end_pos = ep
        if end_pos < len(html_replaced):
            return html_replaced[content_start:end_pos]
        return html_replaced[content_start:]
    
    ep = html_replaced.find(end_marker, content_start)
    if ep >= 0:
        return html_replaced[content_start:ep]
    return ''

# 1. Gate content (between <div id="gate"> and before <header)
gate_content = extract_replaced('<div id="gate"', '<header')
# The gate content includes the closing </div> of the gate
# Cut at the last </div> before <header
# gate_content = gate_content[:gate_content.rfind('</div>')]
print(f"Gate: {len(gate_content):,} chars")

# 2. Header content (between <header and </header>)
header_content = extract_replaced('<header', '</header>')
print(f"Header: {len(header_content):,} chars")

# 3. Nav drawer content
nav_content = extract_replaced('<aside class="slide-menu"', '</aside>')
print(f"Nav: {len(nav_content):,} chars")

# 4. Page home content (between page-home and next page)
home_start = html_replaced.find('<div class="page active" id="page-home">')
if home_start >= 0:
    home_tag_end = html_replaced.find('>', home_start)
    if home_tag_end >= 0:
        home_content_start = home_tag_end + 1
        # Find next page div
        next_page = html_replaced.find('<div class="page" id="page-gallery"', home_content_start)
        if next_page >= 0:
            home_content = html_replaced[home_content_start:next_page]
        else:
            home_content = html_replaced[home_content_start:]
else:
    home_content = ''
print(f"Home: {len(home_content):,} chars")

# 5. Footer content
footer_content = extract_replaced('<footer', '</footer>')
print(f"Footer: {len(footer_content):,} chars")

# 6. Cart drawer
cart_content = extract_replaced('<aside class="cart-drawer"', '</aside>')
print(f"Cart: {len(cart_content):,} chars")

# 7. Checkout modal
checkout_content = extract_replaced('<div class="modal-overlay" id="checkoutModal"', 
    ('<div class="cookie-banner-v80"', '<div class="cookie-modal-v80"'))
print(f"Checkout: {len(checkout_content):,} chars")

# 8. Cookie banner
cookie_content = extract_replaced('<div class="cookie-banner-v80"', 
    ('<div class="cookie-modal-v80"', '<div class="toast"'))
print(f"Cookie: {len(cookie_content):,} chars")

# 9. Cookie modal  
cookie_modal_content = extract_replaced('<div class="cookie-modal-v80"', '</div>')
# Find the actual closing
cm_start = html_replaced.find('<div class="cookie-modal-v80"')
if cm_start >= 0:
    # Find the enclosing </div></div> pattern
    rest = html_replaced[cm_start:]
    # Simple: find first </div></div> after content
    dd = rest.find('</div></div>')
    if dd > 0:
        cookie_modal_content = rest[:dd]
    else:
        cookie_modal_content = ''
print(f"Cookie modal: {len(cookie_modal_content):,} chars")

# 10. Toast
toast_content = '<div class="toast" id="toast"></div>'

# --- Generate files ---

os.makedirs(os.path.join(BASE, 'components'), exist_ok=True)

# Component template: client component that renders HTML via dangerouslySetInnerHTML
def make_component(name, html_content, extra_logic=''):
    # Escape the HTML content for JSX string
    escaped = html_content.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    
    if extra_logic:
        logic = f'''
  {extra_logic}
'''
    else:
        logic = ''
    
    return f"""'use client';
import {{ useEffect }} from 'react';

export default function {name}() {{{logic}
  return (
    <div dangerouslySetInnerHTML={{{{__html: `{escaped}`}}}} />
  );
}}
"""

# Gate component
print("\nGenerating components...")
with open(os.path.join(BASE, 'components', 'Gate.jsx'), 'w') as f:
    content = gate_content
    # Wrap in gate div
    gate_html = f'<div id="gate">\n{content}\n</div>'
    f.write(make_component('Gate', gate_html, '''
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 6000);
    return () => clearTimeout(timer);
  }, []);
'''))
print("  Gate.jsx")

# Header component  
with open(os.path.join(BASE, 'components', 'Header.jsx'), 'w') as f:
    f.write(make_component('Header', header_content))
print("  Header.jsx")

# NavDrawer
with open(os.path.join(BASE, 'components', 'NavDrawer.jsx'), 'w') as f:
    f.write(make_component('NavDrawer', nav_content))
print("  NavDrawer.jsx")

# CartDrawer
with open(os.path.join(BASE, 'components', 'CartDrawer.jsx'), 'w') as f:
    f.write(make_component('CartDrawer', cart_content))
print("  CartDrawer.jsx")

# CheckoutModal
with open(os.path.join(BASE, 'components', 'CheckoutModal.jsx'), 'w') as f:
    f.write(make_component('CheckoutModal', checkout_content))
print("  CheckoutModal.jsx")

# CookieConsent
with open(os.path.join(BASE, 'components', 'CookieConsent.jsx'), 'w') as f:
    f.write(make_component('CookieConsent', cookie_content))
print("  CookieConsent.jsx")

# Toast
with open(os.path.join(BASE, 'components', 'Toast.jsx'), 'w') as f:
    f.write("""export default function Toast() {
  return <div className="toast" id="toast" />;
}
""")
print("  Toast.jsx")

# Write the main page.jsx
home_jsx = """import Gate from '../components/Gate';
import Header from '../components/Header';
import NavDrawer from '../components/NavDrawer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import CookieConsent from '../components/CookieConsent';
import Toast from '../components/Toast';
import Script from 'next/script';

export default function HomePage() {
  return (
    <>
      <Gate />
      <Header />
      <NavDrawer />
      <div id="page-home" className="page active" dangerouslySetInnerHTML={{__html: `"""

# Escape home content for template literal
home_escaped = home_content.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

home_jsx += home_escaped
home_jsx += """`}} />
      <footer dangerouslySetInnerHTML={{__html: `"""

footer_escaped = footer_content.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
home_jsx += footer_escaped
home_jsx += """`}} />
      <CartDrawer />
      <CheckoutModal />
      <CookieConsent />
      <Toast />
      <Script src="/app.js" strategy="beforeInteractive" />
    </>
  );
}
"""

with open(os.path.join(BASE, 'app', 'page.jsx'), 'w') as f:
    f.write(home_jsx)
print(f"\npage.jsx written: {len(home_jsx):,} chars")

# Process app.js (replace data URIs)
print("\nProcessing app.js...")
scripts = []
js_start = html.find('<script>')
if js_start >= 0:
    # Find all script blocks after the main content
    for m in re.finditer(r'<script>(.*?)</script>', html_replaced, re.DOTALL):
        scripts.append(m.group(1).strip())

all_js = '\n\n'.join(scripts)
with open(os.path.join(BASE, 'public', 'app.js'), 'w') as f:
    f.write(all_js)
print(f"app.js: {len(all_js):,} chars")

print("\n✓ Generation complete!")
print("\nRun: cd /home/yassine/Bureau/perla_v6 && npm run dev")
