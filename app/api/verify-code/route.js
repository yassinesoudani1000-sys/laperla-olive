import { createHash, timingSafeEqual } from 'crypto';

// Vérification des codes d'accès B2B — 100% côté serveur.
// Les hachés SHA-256 des codes autorisés sont configurés via la variable
// d'environnement B2B_CODE_HASHES (séparés par des virgules).
// Secours embarqué (jamais exposé au navigateur : ce fichier ne quitte pas le serveur).
const FALLBACK_HASHES = [
  '69b4326c0cc57d2e243ffebc79d78b0f4552e04c00c8da9e2fda40635d70e66c',
  'c4920495f0506dce14666317acb6a0aee09e7c3c3914b5ff9a4955299af6c863',
  '8912f131eb5625964714120b9d83c02c9207e32480286cc63df86be1e6416b0a',
];

// Limitation anti brute-force : 5 tentatives / minute / IP (par instance serverless)
const attempts = new Map();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const rec = attempts.get(ip) || { count: 0, reset: now + WINDOW_MS };
  if (now > rec.reset) {
    rec.count = 0;
    rec.reset = now + WINDOW_MS;
  }
  rec.count += 1;
  attempts.set(ip, rec);
  // Nettoyage occasionnel pour éviter la croissance mémoire
  if (attempts.size > 5000) {
    for (const [k, v] of attempts) if (now > v.reset) attempts.delete(k);
  }
  return rec.count > MAX_ATTEMPTS;
}

function allowedHashes() {
  const fromEnv = (process.env.B2B_CODE_HASHES || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(s => /^[0-9a-f]{64}$/.test(s));
  return fromEnv.length ? fromEnv : FALLBACK_HASHES;
}

export async function POST(request) {
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';

  if (isRateLimited(ip)) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const code = String(body?.code || '').trim().toUpperCase();
  if (!code || code.length > 64) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const digest = createHash('sha256').update(code, 'utf8').digest();
  const ok = allowedHashes().some(hex => {
    const ref = Buffer.from(hex, 'hex');
    return ref.length === digest.length && timingSafeEqual(ref, digest);
  });

  return Response.json({ ok });
}
