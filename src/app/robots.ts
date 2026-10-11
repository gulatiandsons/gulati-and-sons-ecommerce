import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/account',
          '/checkout',
          '/order-confirmation',
        ],
      },
    ],
    sitemap: 'https://gulatiandsons.com/sitemap.xml',
    host: 'https://gulatiandsons.com',
  };
}
