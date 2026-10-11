import { MetadataRoute } from 'next';
import { SEED_PRODUCTS } from '@/lib/data/products';
import { PAN_INDIA_REGIONS } from '@/lib/data/deliveryStates';
import { JOURNAL_ARTICLES } from '@/lib/data/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gulatiandsons.com';
  const now = new Date();

  // Core static & editorial routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/founder',
    '/the-house',
    '/our-philosophy',
    '/collections/fragrances',
    '/collections/watches',
    '/collections/clothing',
    '/collections/essentials',
    '/delivery',
    '/journal',
    '/gifting',
    '/contact',
    '/shipping',
    '/returns',
    '/cancellation-refunds',
    '/privacy',
    '/terms',
    '/faqs',
    '/track-order',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route === '/founder' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/founder' ? 0.95 : 0.8,
  }));

  // Curated product detail pages
  const productRoutes: MetadataRoute.Sitemap = SEED_PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // All 36 Indian states & UTs delivery hubs
  const deliveryRoutes: MetadataRoute.Sitemap = PAN_INDIA_REGIONS.map((r) => ({
    url: `${baseUrl}/delivery/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // House Journal articles
  const journalRoutes: MetadataRoute.Sitemap = JOURNAL_ARTICLES.map((a) => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...deliveryRoutes, ...journalRoutes];
}
