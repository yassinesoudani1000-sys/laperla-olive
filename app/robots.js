export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    sitemap: 'https://laperla-olive.de/sitemap.xml',
  };
}
