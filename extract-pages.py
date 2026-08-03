#!/usr/bin/env python3
"""
Extract page sections from the original HTML file and generate Next.js page files.
Preserves ALL content exactly as-is, only converting:
- class -> className
- for -> htmlFor
- data:image URIs -> /images/img_XXX paths
"""

import re
import json
import os
import hashlib

HTML_PATH = '/home/yassine/Bureau/perla_v6/86 claude v2 2.html'
OUTPUT_DIR = '/home/yassine/Bureau/perla_v6'
MAPPING_PATH = '/home/yassine/Bureau/perla_v6/public/images/mapping.json'

# Load image mapping
with open(MAPPING_PATH) as f:
    mapping = json.load(f)

def replace_data_uris(text):
    """Replace all data:image URIs with their mapped file paths."""
    for b64, img_path in mapping.items():
        if b64 in text:
            text = text.replace(b64, img_path)
    return text

def html_to_jsx(html_content):
    """Convert HTML content to JSX-compatible string."""
    # Replace data URIs first
    html_content = replace_data_uris(html_content)
    
    # Convert class -> className
    html_content = html_content.replace('class="', 'className="')
    
    # Convert for -> htmlFor (in label tags)
    html_content = html_content.replace('for="', 'htmlFor="')
    
    # Handle style attributes: style="..." -> style={{...}}
    # But CSS in <style> tags should remain as-is
    # Convert inline styles
    def convert_style(match):
        prefix = match.group(1)
        style_content = match.group(2)
        # Convert CSS to JS object
        props = []
        for prop in style_content.split(';'):
            prop = prop.strip()
            if not prop:
                continue
            if ':' in prop:
                key, val = prop.split(':', 1)
                key = key.strip()
                val = val.strip()
                # Convert kebab-case to camelCase
                key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
                props.append(f"{key}: '{val}'")
        if props:
            return f'{prefix}{{{{{", ".join(props)}}}}}'
        return match.group(0)
    
    html_content = re.sub(r'(style=")([^"]*)(")', convert_style, html_content)
    
    return html_content

def extract_page_section(html, page_id):
    """Extract the content of a page div by its ID."""
    # Find the page div opening
    pattern = f'<div\\s+class="page"[^>]*id="{page_id}"[^>]*>'
    match = re.search(pattern, html)
    if not match:
        return None
    
    start = match.start()
    # Find the opening tag end
    tag_end = match.end()
    
    # Parse nested div structure to find matching close
    depth = 0
    i = tag_end
    in_tag = False
    in_script = False
    
    while i < len(html):
        if html[i] == '<' and html[i+1:i+8] == 'script ':
            # Find the closing script tag
            script_end = html.find('</script>', i)
            if script_end > 0:
                i = script_end + 9
                continue
        
        if html[i:i+8] == '</script':
            # Handle closing script tag
            while i < len(html) and html[i] != '>':
                i += 1
            i += 1
            continue
            
        if html[i] == '<':
            if html[i+1] == '/':
                # Check if it's a closing div
                if html[i+2:i+6] == 'div>' or html[i+2:i+6] == 'div ':
                    depth -= 1
                    if depth < 0:
                        # This closes our page div
                        end = i + 6 if html[i+2:i+6] == 'div>' else i + 6
                        # Find >
                        while i < len(html) and html[i] != '>':
                            i += 1
                        end = i + 1
                        return html[tag_end:end - 1]
            else:
                # Opening tag
                tag_name_match = re.match(r'<(\w+)', html[i:])
                if tag_name_match:
                    tag_name = tag_name_match.group(1)
                    if tag_name == 'div':
                        depth += 1
        i += 1
    
    # Fallback: use simpler regex-based extraction
    end_pattern = f'</div>\\s*<div\\s+class="page"'
    end_match = re.search(end_pattern, html[start + len(page_id) + 50:])
    if end_match:
        return html[tag_end:start + len(page_id) + 50 + end_match.start()]
    
    return None

# Read the HTML
with open(HTML_PATH, 'r') as f:
    html = f.read()

print(f"HTML file size: {len(html)} chars")

# Mapping of page IDs to route names
PAGE_ROUTES = {
    'page-home': None,  # Main page
}

# For pages after page-home, extract by finding them
# The HTML structure is: <!-- content --><div class="page" id="page-XXX">

# First, let's extract by finding all page divs using regex
all_pages = {}

# Find all page divs
for m in re.finditer(r'<div\s+class="page"\s+id="([^"]+)"[^>]*>', html):
    page_id = m.group(1)
    # Find this page's content by finding next page div or known boundaries
    start = m.end()
    
    # Find next page
    next_page = re.search(r'<div\s+class="page"\s+id="[^"]+"', html[m.end():])
    if next_page:
        end = m.end() + next_page.start()
    else:
        # Last page - find end of content (before toast/editions-gate)
        toast_match = re.search(r'<div\s+class="toast"', html[m.end():])
        if toast_match:
            end = m.end() + toast_match.start()
        else:
            end = len(html)
    
    raw_content = html[start:end].strip()
    
    # Remove trailing </div> if it closes the page div
    if raw_content.endswith('</div>'):
        raw_content = raw_content[:-6].strip()
    
    all_pages[page_id] = raw_content
    print(f"  Extracted {page_id}: {len(raw_content)} chars")

print(f"\nExtracted {len(all_pages)} pages")

# Now let's write the homepage first
home_content = all_pages.get('page-home', '')
print(f"\nHomepage content: {len(home_content)} chars")

# Extract the gate section (before header)
gate_end = html.find('<header')
gate_content = html[:gate_end] if gate_end > 0 else ''

# Find the gate div specifically
gate_match = re.search(r'<div\s+id="gate"[^>]*>.*?</div>\s*</div>\s*<header', html, re.DOTALL)
if gate_match:
    gate_html_full = gate_match.group(0)[:-8]  # Remove <header
    print(f"  Gate section: {len(gate_html_full)} chars")

# Extract header
header_match = re.search(r'<header[^>]*>.*?</header>', html, re.DOTALL)
if header_match:
    header_html = header_match.group(0)
    print(f"  Header: {len(header_html)} chars")

# Extract footer
footer_match = re.search(r'<footer[^>]*>.*?</footer>', html, re.DOTALL)
if footer_match:
    footer_html = footer_match.group(0)
    print(f"  Footer: {len(footer_html)} chars")

# Extract nav drawer
nav_match = re.search(r'<div\s+class="drawer"[^>]*>.*?</div>\s*</div>', html, re.DOTALL)
if nav_match:
    nav_html = nav_match.group(0)
    print(f"  Nav drawer: {len(nav_html)} chars")

# Extract cart drawer
cart_match = re.search(r'<div\s+class="cart-drawer"[^>]*>.*?</div>\s*</div>', html, re.DOTALL)
if cart_match:
    cart_html = cart_match.group(0)
    print(f"  Cart drawer: {len(cart_html)} chars")

# Extract checkout modal
checkout_match = re.search(r'<div\s+class="checkout-modal[^"]*"[^>]*>.*?</div>\s*</div>', html, re.DOTALL)
if checkout_match:
    checkout_html = checkout_match.group(0)
    print(f"  Checkout modal: {len(checkout_html)} chars")

# Extract cookie consent
cookie_match = re.search(r'<div\s+id="cookieConsent"[^>]*>.*?</div>\s*</div>', html, re.DOTALL)
if cookie_match:
    cookie_html = cookie_match.group(0)
    print(f"  Cookie consent: {len(cookie_html)} chars")

# Extract toast
toast_match = re.search(r'<div\s+class="toast"\s+id="toast"[^>]*>.*?</div>', html, re.DOTALL)
if toast_match:
    toast_html = toast_match.group(0)
    print(f"  Toast: {len(toast_html)} chars")

print("\nDone extracting sections.")
