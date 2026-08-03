'use client';
import { useEffect, useRef } from 'react';

const PREOPEN = `(function(){try{if(/[?&]openCart=1/.test(location.search))document.documentElement.classList.add('cart-preopen')}catch(e){}})();`;

export default function HomePage() {
  const rootRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    fetch('/content.html')
      .then((r) => r.text())
      .then((html) => {
        const root = rootRef.current;
        if (!root) return;

        root.innerHTML = html;

        const scripts = Array.from(root.querySelectorAll('script'));
        scripts.forEach((oldScript) => {
          const type = oldScript.getAttribute('type');
          if (type && type !== 'text/javascript' && type !== 'application/javascript') return;

          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          if (oldScript.src) {
            newScript.src = oldScript.src;
          } else {
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
      .catch((err) => console.error('Failed to load content:', err));
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PREOPEN }} />
      <div ref={rootRef} id="spa-root" />
    </>
  );
}
