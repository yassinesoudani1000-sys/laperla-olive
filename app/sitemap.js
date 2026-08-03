import { PRODUCTS } from './lib/products';

const SITE = 'https://laperla-olive.de';
const LAST_MOD = '2026-07-01';

export default function sitemap() {
  const visibleProducts = PRODUCTS.filter((p) => !p.hidden);

  const productPages = visibleProducts.map((p, i) => ({
    url: `${SITE}/produkt/${p.slug}`,
    lastModified: LAST_MOD,
    changeFrequency: 'weekly',
    priority: p.flag?.includes('Best') ? 0.9 : 0.8,
    images: (p.images || [p.img]).map((src) => `${SITE}${src}`),
  }));

  return [
    {
      url: SITE,
      lastModified: LAST_MOD,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...productPages,
  ];
}
