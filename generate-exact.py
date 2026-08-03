#!/usr/bin/env python3
"""
Generate: public/content.html + small page.jsx
- Saves body HTML with replaced data URIs to public/content.html
- Creates small page.jsx that fetches content.html and injects via innerHTML
- Re-injects scripts so all JS executes properly
"""
import re
import json
import os

HTML_PATH = '/home/yassine/Bureau/perla_v6/86 claude v2 2.html'
BASE = '/home/yassine/Bureau/perla_v6'
MAPPING_PATH = os.path.join(BASE, 'public/images/mapping.json')

with open(MAPPING_PATH) as f:
    mapping = json.load(f)

with open(HTML_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

print(f"Original HTML: {len(html):,} chars")

# Extract body content
body_start = html.find('<body>')
body_end = html.find('</body>')
body_content = html[body_start + 6:body_end]
print(f"Body content: {len(body_content):,} chars")

# Replace data URIs (longest first to avoid partial matches)
sorted_items = sorted(mapping.items(), key=lambda x: len(x[0]), reverse=True)
count = 0
for b64, img_path in sorted_items:
    if b64 in body_content:
        body_content = body_content.replace(b64, img_path)
        count += 1
print(f"Replaced {count} data URIs")
print(f"After replacement: {len(body_content):,} chars")

# Save to public/content.html
content_path = os.path.join(BASE, 'public', 'content.html')
with open(content_path, 'w', encoding='utf-8') as f:
    f.write(body_content)
print(f"content.html written: {len(body_content):,} chars")

# Remove old component files
comp_dir = os.path.join(BASE, 'components')
if os.path.isdir(comp_dir):
    for f in os.listdir(comp_dir):
        if f.endswith('.jsx'):
            os.remove(os.path.join(comp_dir, f))

# Clear .next cache
import shutil
next_dir = os.path.join(BASE, '.next')
if os.path.isdir(next_dir):
    shutil.rmtree(next_dir)
    print("Cleared .next cache")

# Write small page.jsx
page_jsx = """'use client';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const rootRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/content.html')
      .then(r => r.text())
      .then(html => {
        if (cancelled) return;
        const root = rootRef.current;
        if (!root) return;

        root.innerHTML = html;

        // Re-inject <script> elements so they execute
        const scripts = root.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });

        document.dispatchEvent(new Event('DOMContentLoaded'));
      })
      .catch(err => console.error('Failed to load content:', err));

    return () => { cancelled = true; };
  }, []);

  return <div ref={rootRef} />;
}
"""

with open(os.path.join(BASE, 'app', 'page.jsx'), 'w') as f:
    f.write(page_jsx)
print(f"page.jsx written: {len(page_jsx):,} chars")
print("\nDone! Run: npm run dev")
