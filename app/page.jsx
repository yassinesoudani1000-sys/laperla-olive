'use client';
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
        const scripts = Array.from(root.querySelectorAll('script'));
        scripts.forEach(oldScript => {
          // Skip non-JavaScript scripts (templates, JSON, etc.)
          const type = oldScript.getAttribute('type');
          if (type && type !== 'text/javascript' && type !== 'application/javascript') return;

          const newScript = document.createElement('script');

          // Copy all attributes (type, id, async, defer, etc.)
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });

          if (oldScript.src) {
            // External script
            newScript.src = oldScript.src;
          } else {
            // Inline script
            newScript.textContent = oldScript.textContent;
          }

          try {
            if (oldScript.parentNode) {
              oldScript.parentNode.replaceChild(newScript, oldScript);
            }
          } catch (err) {
            console.warn('Script injection error:', err);
          }
        });

        document.dispatchEvent(new Event('DOMContentLoaded'));
      })
      .catch(err => console.error('Failed to load content:', err));

    return () => { cancelled = true; };
  }, []);

  return <div ref={rootRef} />;
}
