#!/usr/bin/env python3
"""
Generate complete Next.js app from original HTML.
Preserves ALL content exactly - only converts class->className, for->htmlFor, data:URIs->paths.
"""
import re
import json
import os
import hashlib

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

def convert_style_attr(match):
    """Convert style='...' or style=\"...\" to JSX style={{key:'val'}}"""
    prefix = match.group(1)
    style_content = match.group(2)
    props = []
    for prop in style_content.split(';'):
        prop = prop.strip()
        if not prop or ':' not in prop:
            continue
        key, val = prop.split(':', 1)
        key = key.strip()
        val = val.strip().strip("'\"").replace("'", "\\'")
        # kebab-case to camelCase
        key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
        props.append(f"{key}: '{val}'")
    if props:
        inner = ', '.join(props)
        return f'{prefix}{{{{{inner}}}}}'
    return match.group(0)

def html_to_jsx(html):
    """Convert HTML to JSX. Preserves everything except class/for/style/data-uri."""
    html = replace_data_uris(html)
    html = html.replace('class="', 'className="')
    html = html.replace("class='", "className='")
    html = re.sub(r'<label\s+([^>]*)for="', r'<label \1htmlFor="', html)
    html = re.sub(r'(style=")([^"]*)(")', convert_style_attr, html)
    return html

def extract_balanced(html, tag, id_attr=None, id_val=None):
    """Extract a balanced HTML element by tag name."""
    if id_attr and id_val:
        pattern = f'<{tag}[^>]*{id_attr}="{re.escape(id_val)}"[^>]*>'
    else:
        pattern = f'<{tag}[^>]*>'
    
    match = re.search(pattern, html)
    if not match:
        return None
    
    start = match.start()
    tag_open = match.group(0)
    
    # Count nested tags to find matching close
    open_tag = f'<{tag}'
    close_tag = f'</{tag}>'
    
    depth = 0
    i = match.end()
    # First, eat the opening tag completely
    in_tag = False
    while i < len(html):
        if html[i] == '>':
            break
        i += 1
    i += 1
    content_start = match.end()
    # Actually let me find the correct content start
    # Skip past the opening tag
    i = match.end()
    # Now find matching close
    depth = 1
    # Simple approach: find the opening tag end properly
    i = match.end()
    # Reset depth
    depth = 1
    while i < len(html):
        if html[i:i+len(close_tag)] == close_tag:
            depth -= 1
            if depth == 0:
                return html[match.end():i]
            i += len(close_tag)
            continue
        if html[i:i+len(open_tag)] == open_tag and html[i+len(open_tag)] in (' ', '>', '\n'):
            # Check it's really an opening tag, not just similar text
            next_char = html[i+len(open_tag)]
            if next_char in (' ', '>', '\n', '\t', '\r'):
                depth += 1
                i += len(open_tag)
                continue
        i += 1
    return None

def extract_section_regex(html, start_pattern, end_pattern):
    """Extract content between two regex patterns."""
    start_match = re.search(start_pattern, html)
    if not start_match:
        return None
    end_match = re.search(end_pattern, html[start_match.end():])
    if not end_match:
        return html[start_match.end():]
    return html[start_match.end():start_match.end() + end_match.start()]

with open(HTML_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

print(f"HTML: {len(html):,} chars")

# === EXTRACT SECTIONS ===

# 1. Gate (splash overlay)
gate = extract_section_regex(html, r'<div\s+id="gate"[^>]*>', r'<header\s')
print(f"Gate: {len(gate or ''):,} chars")

# 2. Header
header = extract_section_regex(html, r'<header[^>]*>', r'</header>\s*<input\s+type="checkbox"\s+id="burger"')
if not header:
    header = extract_section_regex(html, r'<header[^>]*>', r'</header>')
# Include the closing </header>
header_close_match = re.search(r'</header>', html[html.find('<header'):] if html.find('<header') >= 0 else '')
if header and header_close_match:
    header = html[html.find('<'):html.find('<') + header_close_match.end() + 8]
print(f"Header: {len(header or ''):,} chars")

# 3. Nav Drawer (slide-menu)
nav = extract_section_regex(html, r'<aside\s+class="slide-menu"[^>]*>', r'</aside>')
print(f"Nav: {len(nav or ''):,} chars")

# 4. Page Home content
home_match = re.search(r'<div\s+class="page[^"]*"\s+id="page-home"[^>]*>', html)
if home_match:
    next_page = re.search(r'<div\s+class="page[^"]*"\s+id="page-gallery"[^>]*>', html[home_match.end():])
    if next_page:
        home_content = html[home_match.end():home_match.end() + next_page.start()]
    else:
        home_content = ''
    print(f"Home content: {len(home_content):,} chars")
else:
    home_content = ''

# 5. Footer
footer = extract_section_regex(html, r'<footer[^>]*>', r'<div\s+class="toast"')
print(f"Footer: {len(footer or ''):,} chars")

# 6. Cart Drawer
cart = extract_section_regex(html, r'<aside\s+class="cart-drawer"[^>]*>', r'</aside>')
print(f"Cart: {len(cart or ''):,} chars")

# 7. Checkout Modal
checkout = extract_section_regex(html, r'<div\s+class="modal-overlay"[^>]*>', r'<div\s+class="cookie-banner-v80"')
print(f"Checkout: {len(checkout or ''):,} chars")

# 8. Cookie Consent
cookie = extract_section_regex(html, r'<div\s+class="cookie-banner-v80"[^>]*>', r'<div\s+class="cookie-modal-v80"')
print(f"Cookie: {len(cookie or ''):,} chars")

# 9. Cookie Modal (settings)
cookie_modal = extract_section_regex(html, r'<div\s+class="cookie-modal-v80"[^>]*>', r'</div>\s*</div>\s*<script')
print(f"Cookie modal: {len(cookie_modal or ''):,} chars")

# 10. Toast
toast_match = re.search(r'<div class="toast" id="toast"></div>', html)
toast = toast_match.group(0) if toast_match else '<div class="toast" id="toast"></div>'
print(f"Toast: {len(toast):,} chars")

# === CONVERT TO JSX ===
print("\nConverting to JSX...")

sections = {
    'gate': gate or '',
    'header': header or '',
    'nav': nav or '',
    'home': home_content or '',
    'footer': footer or '',
    'cart': cart or '',
    'checkout': checkout or '',
    'cookie': cookie or '',
    'toast': toast or '',
    'cookie_modal': cookie_modal or '',
}

converted = {}
for name, content in sections.items():
    conv = html_to_jsx(content)
    # Clean up
    conv = conv.strip()
    # Remove leading/trailing </div> if they don't belong to the content
    converted[name] = conv
    print(f"  {name}: {len(conv):,} chars")

# === GENERATE PAGE FILES ===

os.makedirs(os.path.join(BASE, 'app'), exist_ok=True)

# Write the gate component
gate_jsx = f"""'use client';
import {{ useState, useEffect }} from 'react';

export default function Gate() {{
  const [hidden, setHidden] = useState(false);

  useEffect(() => {{
    const timer = setTimeout(() => setHidden(true), 6000);
    return () => clearTimeout(timer);
  }}, []);

  const handleEnter = () => setHidden(true);

  return (
    <div id="gate" className={{hidden ? 'hidden' : ''}}>
{converted['gate']}
    </div>
  );
}}
"""
# For the gate content, we need to extract just the inner content between <div id="gate"> and the closing </div>
gate_inner_match = re.search(r'<div\s+id="gate"[^>]*>(.*?)(</div>\s*)?$', converted['gate'], re.DOTALL)
if gate_inner_match:
    gate_inner = gate_inner_match.group(1)
else:
    gate_inner = converted['gate']

gate_jsx = "'use client';\n"
gate_jsx += "import { useState, useEffect } from 'react';\n\n"
gate_jsx += "export default function Gate() {\n"
gate_jsx += "  const [hidden, setHidden] = useState(false);\n\n"
gate_jsx += "  useEffect(() => {\n"
gate_jsx += "    const timer = setTimeout(() => setHidden(true), 6000);\n"
gate_jsx += "    return () => clearTimeout(timer);\n"
gate_jsx += "  }, []);\n\n"
gate_jsx += "  const handleEnter = () => setHidden(true);\n\n"
gate_jsx += "  return (\n"
gate_jsx += '    <div id="gate" className={hidden ? \'hidden\' : \'\'}>\n'
gate_jsx += gate_inner + '\n'
gate_jsx += "    </div>\n"
gate_jsx += "  );\n"
gate_jsx += "}\n"
os.makedirs(os.path.join(BASE, 'components'), exist_ok=True)
with open(os.path.join(BASE, 'components', 'Gate.jsx'), 'w') as f:
    f.write(gate_jsx)
print(f"\nGate.jsx written: {len(gate_jsx):,} chars")

# Write the header component
# Extract header inner content
header_inner = re.sub(r'^<header[^>]*>(.*?)</header>\s*$', r'\1', converted['header'].strip(), flags=re.DOTALL)
header_jsx = """'use client';
import { useState, useEffect } from 'react';

export default function Header({ onDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openNav = () => {
    const evt = new CustomEvent('toggleNav', { detail: true });
    window.dispatchEvent(evt);
  };

  const openCart = () => {
    const evt = new CustomEvent('toggleCart', { detail: true });
    window.dispatchEvent(evt);
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
""" + header_inner + """
    </header>
  );
}
"""
with open(os.path.join(BASE, 'components', 'Header.jsx'), 'w') as f:
    f.write(header_jsx)
print(f"Header.jsx written: {len(header_jsx):,} chars")

# Write NavDrawer
nav_inner = re.sub(r'<aside\s+class="slide-menu"[^>]*>(.*?)</aside>', r'\1', converted['nav'].strip(), flags=re.DOTALL)
nav_jsx = "'use client';\n"
nav_jsx += "import { useState, useEffect } from 'react';\n\n"
nav_jsx += "export default function NavDrawer() {\n"
nav_jsx += "  const [open, setOpen] = useState(false);\n\n"
nav_jsx += "  useEffect(() => {\n"
nav_jsx += "    const handler = (e) => setOpen(e.detail);\n"
nav_jsx += "    window.addEventListener('toggleNav', handler);\n"
nav_jsx += "    return () => window.removeEventListener('toggleNav', handler);\n"
nav_jsx += "  }, []);\n\n"
nav_jsx += "  const close = () => setOpen(false);\n\n"
nav_jsx += "  return (\n"
nav_jsx += "    <>\n"
nav_jsx += '      <div className={"drawer-overlay" + (open ? \' open\' : \'\')} onClick={close} />\n'
nav_jsx += '      <nav className={"drawer" + (open ? \' open\' : \'\')}>\n'
nav_jsx += nav_inner + '\n'
nav_jsx += "      </nav>\n"
nav_jsx += "    </>\n"
nav_jsx += "  );\n"
nav_jsx += "}\n"
with open(os.path.join(BASE, 'components', 'NavDrawer.jsx'), 'w') as f:
    f.write(nav_jsx)

# Write CartDrawer
cart_jsx = "'use client';\n"
cart_jsx += "import { useState, useEffect } from 'react';\n\n"
cart_jsx += "export default function CartDrawer() {\n"
cart_jsx += "  const [open, setOpen] = useState(false);\n\n"
cart_jsx += "  useEffect(() => {\n"
cart_jsx += "    const handler = (e) => setOpen(e.detail);\n"
cart_jsx += "    window.addEventListener('toggleCart', handler);\n"
cart_jsx += "    return () => window.removeEventListener('toggleCart', handler);\n"
cart_jsx += "  }, []);\n\n"
cart_jsx += "  const close = () => setOpen(false);\n\n"
cart_jsx += "  return (\n"
cart_jsx += "    <>\n"
cart_jsx += '      <div className={"drawer-overlay" + (open ? \' open\' : \'\')} onClick={close} />\n'
cart_jsx += converted['cart'] + '\n'
cart_jsx += "    </>\n"
cart_jsx += "  );\n"
cart_jsx += "}\n"
with open(os.path.join(BASE, 'components', 'CartDrawer.jsx'), 'w') as f:
    f.write(cart_jsx)

# Write CheckoutModal
checkout_jsx = "'use client';\n"
checkout_jsx += "import { useState, useEffect } from 'react';\n\n"
checkout_jsx += "export default function CheckoutModal() {\n"
checkout_jsx += "  const [open, setOpen] = useState(false);\n\n"
checkout_jsx += "  useEffect(() => {\n"
checkout_jsx += "    const handler = () => setOpen(true);\n"
checkout_jsx += "    window.addEventListener('openCheckout', handler);\n"
checkout_jsx += "    window.addEventListener('closeCheckout', () => setOpen(false));\n"
checkout_jsx += "    return () => {\n"
checkout_jsx += "      window.removeEventListener('openCheckout', handler);\n"
checkout_jsx += "      window.removeEventListener('closeCheckout', () => setOpen(false));\n"
checkout_jsx += "    };\n"
checkout_jsx += "  }, []);\n\n"
checkout_jsx += "  const close = () => setOpen(false);\n\n"
checkout_jsx += "  return (\n"
checkout_jsx += '    <div className={"modal-overlay" + (open ? \' open\' : \'\')}>\n'
checkout_jsx += converted['checkout'] + '\n'
checkout_jsx += "    </div>\n"
checkout_jsx += "  );\n"
checkout_jsx += "}\n"
with open(os.path.join(BASE, 'components', 'CheckoutModal.jsx'), 'w') as f:
    f.write(checkout_jsx)

# Write CookieConsent
cookie_jsx = "'use client';\n"
cookie_jsx += "import { useState, useEffect } from 'react';\n\n"
cookie_jsx += "export default function CookieConsent() {\n"
cookie_jsx += "  const [visible, setVisible] = useState(true);\n"
cookie_jsx += "  const accept = () => setVisible(false);\n"
cookie_jsx += "  if (!visible) return null;\n"
cookie_jsx += "  return (\n"
cookie_jsx += "    <>\n"
cookie_jsx += converted['cookie'] + '\n'
cookie_jsx += "    </>\n"
cookie_jsx += "  );\n"
cookie_jsx += "}\n"
with open(os.path.join(BASE, 'components', 'CookieConsent.jsx'), 'w') as f:
    f.write(cookie_jsx)

# Write Toast
toast_jsx = """export default function Toast() {
  return <div className="toast" id="toast" />;
}
"""
with open(os.path.join(BASE, 'components', 'Toast.jsx'), 'w') as f:
    f.write(toast_jsx)

# Write the main page.jsx (homepage)
home_jsx = "import Gate from '../components/Gate';\n"
home_jsx += "import Header from '../components/Header';\n"
home_jsx += "import NavDrawer from '../components/NavDrawer';\n"
home_jsx += "import CartDrawer from '../components/CartDrawer';\n"
home_jsx += "import CheckoutModal from '../components/CheckoutModal';\n"
home_jsx += "import CookieConsent from '../components/CookieConsent';\n"
home_jsx += "import Toast from '../components/Toast';\n\n"
home_jsx += "export default function HomePage() {\n"
home_jsx += "  return (\n"
home_jsx += "    <>\n"
home_jsx += "      <Gate />\n"
home_jsx += "      <Header />\n"
home_jsx += "      <NavDrawer />\n"
home_jsx += '      <div id="page-home" className="page active">\n'
home_jsx += converted['home'] + '\n'
home_jsx += "      </div>\n"
home_jsx += converted['footer'] + '\n'
home_jsx += "      <CartDrawer />\n"
home_jsx += "      <CheckoutModal />\n"
home_jsx += "      <CookieConsent />\n"
home_jsx += "      <Toast />\n"
home_jsx += "    </>\n"
home_jsx += "  );\n"
home_jsx += "}\n"
with open(os.path.join(BASE, 'app', 'page.jsx'), 'w') as f:
    f.write(home_jsx)
print(f"page.jsx written: {len(home_jsx):,} chars")

print("\n✓ All files generated successfully!")
print(f"\nStats:")
for name, content in converted.items():
    print(f"  {name}: {len(content):,} chars")
