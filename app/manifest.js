export default function manifest() {
  return {
    name: 'LAPERLA Premium Olive Oil',
    short_name: 'LAPERLA',
    description: 'Prämiertes tunesisches Olivenöl extra vergine · Édition Prestige',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#1a1a1a',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
