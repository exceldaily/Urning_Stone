import { site } from '@/data/site';
import type { Product } from '@/data/products';
import { formatDimensions } from './format';

export const canonical = (path: string) => `${site.url}${path === '/' ? '' : path}`;

export function productJsonLd(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    sku: p.sku,
    productID: p.id,
    description: p.seoDescription,
    material: p.materialLabel,
    color: p.colorLabel,
    height: `${p.dimensions.height} in`,
    width: `${p.dimensions.width} in`,
    depth: `${p.dimensions.depth} in`,
    weight: `${p.weightLb} lb`,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Interior capacity', value: `${p.capacityCuIn} cubic inches` },
      { '@type': 'PropertyValue', name: 'Closure', value: p.closure },
      { '@type': 'PropertyValue', name: 'Exterior dimensions', value: formatDimensions(p.dimensions) },
    ],
    url: canonical(`/products/${p.slug}`),
    brand: { '@type': 'Brand', name: site.brandName },
    offers: {
      '@type': 'Offer',
      url: canonical(`/products/${p.slug}`),
      priceCurrency: site.currency,
      price: (p.priceCents / 100).toFixed(2),
      availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    // NOTE: aggregateRating and review are deliberately omitted. Do not add them
    // until verified customer reviews exist — see src/data/testimonials.ts.
  };
}

export function breadcrumbJsonLd(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t.name, item: canonical(t.href),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question', name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function articleJsonLd(a: { title: string; standfirst: string; slug: string; published: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.standfirst,
    datePublished: a.published,
    url: canonical(`/journal/${a.slug}`),
    publisher: { '@type': 'Organization', name: site.brandName },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.brandName,
    url: site.url,
    description: 'Memorial urns and keepsakes chosen for meaning, quality and how they sit in a family home.',
  };
}
