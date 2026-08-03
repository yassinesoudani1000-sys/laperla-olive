'use client';
import { useEffect } from 'react';

export default function BootClient() {
  useEffect(() => {
    const root = document.getElementById('spa-root');
    if (!root) return;

    // Ré-injecte les scripts rendus inertes côté serveur pour qu'ils s'exécutent une seule fois
    const scripts = Array.from(root.querySelectorAll('script[type="laperla-js"]'));
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        if (attr.name !== 'type') newScript.setAttribute(attr.name, attr.value);
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
  }, []);

  return null;
}
