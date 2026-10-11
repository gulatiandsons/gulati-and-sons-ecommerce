import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const publicAllowed = '/';
  const privateDisallowed = [
    '/admin',
    '/admin/*',
    '/api/*',
    '/account',
    '/account/*',
    '/checkout',
    '/checkout/*',
    '/order-confirmation',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
      {
        userAgent: 'Googlebot',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
      {
        userAgent: 'Bingbot',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
      {
        userAgent: 'Applebot',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
      {
        userAgent: 'GPTBot',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
      {
        userAgent: 'PerplexityBot',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
      {
        userAgent: 'ClaudeBot',
        allow: publicAllowed,
        disallow: privateDisallowed,
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://gulatiandsons.com'}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL || 'https://gulatiandsons.com',
  };
}
