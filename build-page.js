const fs = require('fs');
const path = require('path');

const HTML_FILE = '/home/yassine/Bureau/perla_v6/86 claude v2 2.html';
const MAPPING_FILE = '/home/yassine/Bureau/perla_v6/public/images/mapping.json';

const html = fs.readFileSync(HTML_FILE, 'utf8');
const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));

function replaceDataUris(text) {
  for (const [b64, newPath] of Object.entries(mapping)) {
    text = text.split(b64).join(newPath);
  }
  return text;
}

function extractLines(startLine, endLine) {
  const lines = html.split('\n');
  return lines.slice(startLine - 1, endLine).join('\n');
}

const dataDir = '/home/yassine/Bureau/perla_v6/public/data';
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

console.log('=== Step 1: Extracting app data and scripts ===');

// Instead of trying to JSON.parse JS objects, extract the raw script content
// Find the data block: from '// ============ DATA ============' to '// ============ STATE ============'
const dataBlockStart = html.indexOf('// ============ DATA ============');
const dataBlockEnd = html.indexOf('// ============ STATE ============');
let dataBlockJS = '';
if (dataBlockStart !== -1 && dataBlockEnd !== -1) {
  dataBlockJS = html.substring(dataBlockStart, dataBlockEnd).trim();
}
// Also get IMG constants before DATA
const imgBlockStart = html.indexOf('// ============ IMAGE URIS');
let imgBlockJS = '';
if (imgBlockStart !== -1) {
  const imgBlockEnd = html.indexOf('// ============ DATA ============');
  if (imgBlockEnd !== -1) {
    imgBlockJS = html.substring(imgBlockStart, imgBlockEnd).trim();
  }
}
// Replace data URIs in IMG constants
imgBlockJS = replaceDataUris(imgBlockJS);
dataBlockJS = replaceDataUris(dataBlockJS);

console.log('=== Step 2: Extracting CSS ===');
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
  const css = replaceDataUris(cssMatch[1].trim());
  fs.writeFileSync('/home/yassine/Bureau/perla_v6/app/globals.css', css);
  console.log('✓ globals.css (' + (css.length / 1024).toFixed(0) + 'KB)');
}

console.log('=== Step 3: Processing static HTML sections ===');
// Each section processed and written separately
const sections = {
  'page-home': { start: 11608, end: 12033 },
};

for (const [name, { start, end }] of Object.entries(sections)) {
  let content = extractLines(start, end);
  content = replaceDataUris(content);
  content = content.replace(/<script[\s\S]*?<\/script>/g, '');
  fs.writeFileSync(path.join(dataDir, `content-${name}.html`), content);
  console.log(`✓ content-${name}.html`);
}

console.log('=== Step 4: Building app JavaScript ===');

// Combine all JS: IMG constants, data, helpers, and app logic
let fullAppJS = '';

// 1. Image constants
if (imgBlockJS) {
  fullAppJS += '// ============ IMAGE URIS (replaced) ============\n';
  fullAppJS += imgBlockJS + '\n\n';
}

// 2. Data variables  
if (dataBlockJS) {
  fullAppJS += '// ============ DATA ============\n';
  fullAppJS += dataBlockJS + '\n\n';
}

// 3. The rest of the app JS (from HELPERS to end)
const helpersStart = html.indexOf('// ============ HELPERS ============');
const stateStart = html.indexOf('// ============ STATE ============');
const firstHelper = html.indexOf('// ============ HELPERS ============');
if (firstHelper !== -1) {
  // Get everything from HELPERS to the end of the last script
  const lastScriptEnd = html.lastIndexOf('</script>');
  if (lastScriptEnd !== -1) {
    let appJS = html.substring(firstHelper, lastScriptEnd + 9);
    // Strip script tags
    appJS = appJS.replace(/<script[\s\S]*?>/g, '').replace(/<\/script>/g, '');
    fullAppJS += appJS;
  }
}

// Replace data URIs in the full JS
fullAppJS = replaceDataUris(fullAppJS);

const bootJS = `
(function boot() {
  'use strict';
  var container = document.getElementById('page-home-inner');
  if (container) {
    fetch('/data/content-page-home.html').then(function(r) { return r.text(); }).then(function(homeHTML) {
      container.innerHTML = homeHTML;
      if (typeof initApp === 'function') initApp();
      if (typeof renderProducts === 'function') setTimeout(renderProducts, 50);
      if (typeof initB2BGate === 'function') initB2BGate();
      if (typeof initNav === 'function') initNav();
      if (typeof initLangSwitch === 'function') initLangSwitch();
    }).catch(console.error);
  } else {
    if (typeof initApp === 'function') initApp();
  }
})();
`;

fs.writeFileSync(path.join(dataDir, 'app-scripts.js'), bootJS + '\n\n' + fullAppJS);
console.log('✓ app-scripts.js (' + ((bootJS.length + fullAppJS.length) / 1024).toFixed(0) + 'KB)');

console.log('=== Step 5: Writing page.jsx ===');
const pageJSX = `import Gate from '../components/Gate';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import NavDrawer from '../components/NavDrawer';
import CookieConsent from '../components/CookieConsent';
import Toast from '../components/Toast';

export default function HomePage() {
  return (
    <>
      <Gate />
      <NavDrawer />
      <CartDrawer />
      <CheckoutModal />
      <CookieConsent />
      <Toast />
      <div id="page-home" className="page active">
        <div id="page-home-inner" />
      </div>
      <div className="toast" id="toast"></div>
      <script src="/data/app-scripts.js" />
    </>
  );
}
`;

fs.writeFileSync('/home/yassine/Bureau/perla_v6/app/page.jsx', pageJSX);
console.log('✓ page.jsx');

console.log('=== Step 6: Writing layout.jsx ===');
const layoutContent = `import './globals.css';

export const metadata = {
  title: 'LAPERLA · Premium Olive Oil · Édition Prestige',
  description: 'LAPERLA Premium Olive Oil – Édition Prestige. Prämiertes, ECO-CERT & TN-BIO-001 zertifiziertes tunesisches Olivenöl. Best Olive Oil in the World – Swiss Genf 2026.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=Cinzel:wght@400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
`;
fs.writeFileSync('/home/yassine/Bureau/perla_v6/app/layout.jsx', layoutContent);
console.log('✓ layout.jsx');

console.log('=== Step 7: Writing package.json ===');
const pkg = {
  name: 'laperla',
  version: '1.0.0',
  private: true,
  scripts: {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
  },
  dependencies: {
    'next': '16.0.0-canary.9',
    'react': '19.0.0-rc.0',
    'react-dom': '19.0.0-rc.0',
  },
};
fs.writeFileSync('/home/yassine/Bureau/perla_v6/package.json', JSON.stringify(pkg, null, 2));
console.log('✓ package.json');

console.log('=== Step 8: Writing next.config.mjs ===');
const nc = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
};
export default nextConfig;
`;
fs.writeFileSync('/home/yassine/Bureau/perla_v6/next.config.mjs', nc);
console.log('✓ next.config.mjs');

console.log('\\n✅ Build complete! Run: npm run dev');
