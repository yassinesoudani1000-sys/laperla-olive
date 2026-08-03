const fs = require('fs');
const path = require('path');

const HTML_FILE = '/home/yassine/Bureau/perla_v6/86 claude v2 2.html';
const html = fs.readFileSync(HTML_FILE, 'utf8');

// Load mapping
const mappingPath = '/home/yassine/Bureau/perla_v6/public/images/mapping.json';
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Helper: replace all data URIs in a string
function replaceImg(text) {
  for (const [b64, newPath] of Object.entries(mapping)) {
    text = text.split(b64).join(newPath);
  }
  return text;
}

// Helper: process inline styles (<style>...</style>) to replace data URIs
function processCSS(css) {
  return replaceImg(css);
}

// Extract the full CSS from the HTML
function extractCSS() {
  const match = html.match(/<style>([\s\S]*?)<\/style>/);
  return match ? processCSS(match[1].trim()) : '';
}

// ============================
// 1. Write package.json
// ============================
const packageJson = {
  name: 'laperla',
  version: '1.0.0',
  private: true,
  scripts: {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
    lint: 'next lint'
  },
  dependencies: {
    'next': '16.0.0-canary.9',
    'react': '19.0.0-rc.0',
    'react-dom': '19.0.0-rc.0'
  }
};
fs.writeFileSync('/home/yassine/Bureau/perla_v6/package.json', JSON.stringify(packageJson, null, 2));

// ============================
// 2. Write next.config.mjs
// ============================
const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true
  }
};
export default nextConfig;
`;
fs.writeFileSync('/home/yassine/Bureau/perla_v6/next.config.mjs', nextConfig);

// ============================
// 3. Write app/globals.css
// ============================
const css = extractCSS();
fs.writeFileSync('/home/yassine/Bureau/perla_v6/app/globals.css', css);
console.log('CSS extracted, length:', css.length);

// ============================
// 4. Write app/layout.jsx
// ============================
const layout = `import './globals.css';

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
fs.writeFileSync('/home/yassine/Bureau/perla_v6/app/layout.jsx', layout);

// ============================
// 5. Extract pages from HTML
// ============================
// Extract each page section's inner HTML
function extractPageContent(pageId) {
  // Find the page div
  const re = new RegExp(`<div\\s+class="page"[^>]*id="${pageId}"[^>]*>([\\s\\S]*?)<\\/div>\\s*<div\\s+class="page"`, 'i');
  const match = html.match(re);
  if (match) return match[1];
  // Try last page
  const re2 = new RegExp(`<div\\s+class="page"[^>]*id="${pageId}"[^>]*>([\\s\\S]*?)<\\/div>\\s*<div\\s+id="editions-gate`, 'i');
  const match2 = html.match(re2);
  if (match2) return match2[1];
  // Try matching to end
  const re3 = new RegExp(`<div\\s+class="page"[^>]*id="${pageId}"[^>]*>([\\s\\S]*?)<\\/div>\\s*<\\/div>\\s*<div\\s+class="toast"`, 'i');
  const match3 = html.match(re3);
  if (match3) return match3[1];
  return '';
}

// Generate a page file from HTML content
function generatePage(pageId, content) {
  // Replace data URIs in the content
  content = replaceImg(content);
  // Replace class with className
  content = content.replace(/\bclass="/g, 'className="');
  // Preserve style tags content - keep as is in JSX (it works)
  // Handle for attribute
  content = content.replace(/\bfor="/g, 'htmlFor="');
  
  const pageContent = `'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Re-run any inline scripts
    const scripts = document.querySelectorAll('script[src]');
    // Page-specific init
  }, []);

  return (
    <>
      ${content}
    </>
  );
}
`;
  return pageContent;
}

// ============================
// Instead of manual extraction, let's create a simpler approach:
// We'll extract all pages from the HTML and write them properly
// ============================

console.log('Building project files...');

// The HTML page structure analysis:
// page-home (active) - the main page
// page-shop - shop page
// page-wholesale - wholesale
// page-discover - discover
// page-awards - awards
// page-berlin-edition - berlin
// page-about - about
// page-mission - mission
// page-story - story
// page-legal - legal
// page-gallery - gallery
// page-account - account

// We'll write a comprehensive generator. Due to the size, 
// let me write the complete page.jsx with all sections inline.

const PAGE_SECTIONS = {
  'home': 'page-home',
  'shop': 'page-shop', 
  'wholesale': 'page-wholesale',
  'discover': 'page-discover',
  'awards': 'page-awards',
  'berlin': 'page-berlin-edition',
  'about': 'page-about',
  'mission': 'page-mission',
  'story': 'page-story',
  'legal': 'page-legal',
  'gallery': 'page-gallery',
  'account': 'page-account'
};

// For the main page, we need to extract the full page-home + all sections before first page div
// Let's find what comes before <div class="page" id="page-about">
const beforeFirstPage = html.split('<div class="page" id="page-about">')[0];
// Everything before the first [class="page"] div
const allBefore = beforeFirstPage;

// Extract main content (page-home section)
function extractBetweenPageMarkers(startId, endId) {
  const startMarker = `id="${startId}"`;
  const endMarker = `id="${endId}"`;
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) return '';
  // Find the closing </div> of this page
  let depth = 0;
  let inTag = false;
  let endIdx = startIdx;
  for (let i = startIdx; i < html.length; i++) {
    if (html[i] === '<') { inTag = true; continue; }
    if (html[i] === '>') { inTag = false; continue; }
    if (!inTag && html[i] === '<' && html[i+1] === '/') {
      // Check if it's </div>
      if (html.substring(i+2, i+6) === 'div>') {
        depth--;
        if (depth === -1) { endIdx = i + 6; break; }
      }
    }
    if (!inTag && html[i] === '<' && html.substring(i+1, i+4) === 'div') {
      depth++;
    }
  }
  return html.substring(startIdx, endIdx);
}

// Write a minimal homepage JSX
// Since the file is massive, let me write a simpler approach:
// Extract the core CSS + build a React layout manually

console.log('Done. Next: write all page components...');

// We need a more robust approach. Let me create the key files.
