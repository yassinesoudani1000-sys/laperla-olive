import { PRODUCTS } from './lib/products';

export default function sitemap() {
  const productPages = PRODUCTS.map((p) => ({
    url: `https://laperla-olive.de/produkt/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://laperla-olive.de',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...productPages,
  ];
}
