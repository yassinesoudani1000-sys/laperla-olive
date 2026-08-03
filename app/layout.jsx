import './globals.css';

export const metadata = {
  metadataBase: new URL('https://laperla-olive.de'),
  title: {
    template: '%s · LAPERLA Olive Oil',
    default: 'LAPERLA Premium Olive Oil · Édition Prestige · Best Olive Oil in the World',
  },
  description: 'LAPERLA Premium Olive Oil – Édition Prestige. Prämiertes, ECO-CERT & TN-BIO-001 zertifiziertes tunesisches Olivenöl extra vergine. Best Olive Oil in the World – Swiss Genf 2026. Kaltgepresst, bio-zertifiziert.',
  keywords: ['Olivenöl', 'extra vergine', 'bio', 'tunesisch', 'premium', 'LAPERLA', 'Édition Prestige', 'ECO-CERT', 'TN-BIO-001', 'kaltgepresst', 'Best Olive Oil'],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://laperla-olive.de',
    siteName: 'LAPERLA Olive Oil',
    title: 'LAPERLA Premium Olive Oil · Édition Prestige',
    description: 'Prämiertes tunesisches Olivenöl extra vergine. ECO-CERT & TN-BIO-001 zertifiziert. Best Olive Oil in the World – Swiss Genf 2026.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'LAPERLA Premium Olive Oil · Édition Prestige' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LAPERLA Premium Olive Oil · Édition Prestige',
    description: 'Prämiertes tunesisches Olivenöl extra vergine. Best Olive Oil in the World – Swiss Genf 2026.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: '/' },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <link rel="preload" as="image" href="/images/herof.webp" fetchPriority="high" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=Cinzel:wght@400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
