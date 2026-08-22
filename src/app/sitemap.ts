import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { products } from '@/data/products';
import { collections } from '@/data/collections';
import { articles } from '@/data/articles';
import { docPages } from '@/data/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const now = new Date();

  const staticRoutes = ['/', '/collections', '/urn-finder', '/size-guide', '/personalization', '/journal', '/about', '/resources', '/help/faq', '/help/contact', '/cart'];

  return [
    ...staticRoutes.map((path) => ({ url: url(path), lastModified: now, changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.7 })),
    ...collections.map((c) => ({ url: url(`/collections/${c.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...products.map((p) => ({ url: url(`/products/${p.slug}`), lastModified: new Date(p.createdAt), changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...articles.map((a) => ({ url: url(`/journal/${a.slug}`), lastModified: new Date(a.published), changeFrequency: 'yearly' as const, priority: 0.5 })),
    ...docPages.map((d) => ({ url: url(`/help/${d.slug}`), lastModified: now, changeFrequency: 'yearly' as const, priority: 0.4 })),
  ];
}
