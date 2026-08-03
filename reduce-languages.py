#!/usr/bin/env python3
"""Reduce I18N to 7 languages + update HTML language switcher"""
import re
import json

CONTENT_PATH = '/home/yassine/Bureau/perla_v6/public/content.html'

with open(CONTENT_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
print(f"Total lines: {len(lines)}")

# 1. Update "23 Sprachen" to "7 Sprachen"
count_old = content.count('23 Sprachen')
content = content.replace('23 Sprachen', '7 Sprachen')
print(f"Updated '23 Sprachen' → '7 Sprachen': {count_old} occurrences")

# 2. Parse and reduce I18N object
i18n_match = re.search(r'const I18N=(\{.*?\});\s*let currentLang="de";', content, re.DOTALL)
if i18n_match:
    i18n_raw = i18n_match.group(1)
    try:
        i18n = json.loads(i18n_raw)
        print(f"Original languages: {len(i18n)}")
        print(f"Original keys: {sorted(i18n.keys())}")
        
        keep = {'de', 'en', 'fr', 'es', 'it', 'ar', 'zh'}
        removed = [k for k in i18n if k not in keep]
        i18n = {k: v for k, v in i18n.items() if k in keep}
        print(f"Kept languages: {sorted(i18n.keys())}")
        print(f"Removed languages: {removed}")
        
        # Rebuild the I18N line
        new_i18n_str = json.dumps(i18n, ensure_ascii=False, separators=(',', ':'))
        new_line = f'const I18N={new_i18n_str};\nlet currentLang="de";'
        
        # Replace in content
        old_line = i18n_match.group(0)
        content = content.replace(old_line, new_line)
        print(f"I18N size before: {len(i18n_raw):,} chars")
        print(f"I18N size after: {len(new_i18n_str):,} chars")
        
    except json.JSONDecodeError as e:
        print(f"ERROR parsing I18N JSON: {e}")
        # Try to find the issue
        pos = e.pos
        print(f"Error at position {pos}")
        print(f"Context: ...{i18n_raw[max(0,pos-50):pos+50]}...")
        exit(1)
else:
    print("ERROR: Could not find I18N definition")
    exit(1)

# 3. Remove extra language buttons from HTML
# Languages to keep: de, en, fr, es, it, ar, zh
# Languages to remove: pt, nl, sv, da, no, fi, pl, cs, hu, ro, el, tr, ru, uk, ja, ko
langs_to_remove = ['pt', 'nl', 'sv', 'da', 'no', 'fi', 'pl', 'cs', 'hu', 'ro', 'el', 'tr', 'ru', 'uk', 'ja', 'ko']

for lang in langs_to_remove:
    # Pattern: <button class="lang-opt" data-lang="XX" role="option"><span class="lo-code">XX</span><span class="lo-name">NAME</span></button>
    pattern = re.compile(
        r'\s*<button class="lang-opt"[^>]*data-lang="' + re.escape(lang) + r'"[^>]*>.*?</button>'
    )
    new_content, n = pattern.subn('', content)
    if n > 0:
        print(f"Removed language button: {lang}")
        content = new_content
    else:
        print(f"WARNING: Could not remove language button: {lang}")

# Write back
with open(CONTENT_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! Reduced to 7 languages: de, en, fr, es, it, ar, zh")
