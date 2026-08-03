const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('/home/yassine/Bureau/perla_v6/86 claude v2 2.html', 'utf8');

const dataUriRegex = /data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;

const matches = [];
let match;
while ((match = dataUriRegex.exec(html)) !== null) {
  matches.push({ full: match[0], ext: match[1], b64: match[2] });
}

console.log(`Found ${matches.length} data URIs`);

// Generate hash -> filename mapping
const crypto = require('crypto');
const seen = new Map();
let idx = 0;

for (const m of matches) {
  const h = crypto.createHash('md5').update(m.b64).digest('hex').slice(0, 10);
  if (seen.has(h)) continue;
  seen.set(h, true);

  let ext = m.ext;
  if (ext === 'svg+xml') ext = 'svg';
  if (ext === 'jpeg') ext = 'jpg';

  const buf = Buffer.from(m.b64, 'base64');
  const filename = `img_${String(idx).padStart(3, '0')}.${ext}`;
  const filepath = path.join('/home/yassine/Bureau/perla_v6/public/images', filename);
  fs.writeFileSync(filepath, buf);
  console.log(`  ${filename}  (${buf.length} bytes)`);
  idx++;

  // Replace in html
  // We'll generate a separate mapping file
}

// Generate mapping JSON
const mapping = {};
let mi = 0;
const seen2 = new Map();
const dataUriRegex2 = /data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;
while ((match = dataUriRegex2.exec(html)) !== null) {
  const h = crypto.createHash('md5').update(match[2]).digest('hex').slice(0, 10);
  if (seen2.has(h)) continue;
  seen2.set(h, true);
  let ext = match[1];
  if (ext === 'svg+xml') ext = 'svg';
  if (ext === 'jpeg') ext = 'jpg';
  mapping[match[0]] = `/images/img_${String(mi).padStart(3, '0')}.${ext}`;
  mi++;
}

fs.writeFileSync('/home/yassine/Bureau/perla_v6/public/images/mapping.json', JSON.stringify(mapping, null, 2));
console.log(`\nMapping written to public/images/mapping.json`);
