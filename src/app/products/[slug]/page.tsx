import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct, products } from '@/data/products';
import { categoryLabels } from '@/data/finder';
import { formatDimensions } from '@/lib/format';
import { Gallery } from '@/components/product/Gallery';
import { BuyBox, StickyBuyBar } from '@/components/product/BuyBox';
import { ProductRail, RecentlyViewed } from '@/components/product/ProductRail';
import { Accordion } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HelpPrompt } from '@/components/ui/HelpPrompt';
import { breadcrumbJsonLd, canonical, productJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: p.seoTitle, description: p.seoDescription, url: canonical(`/products/${p.slug}`), type: 'website' },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.style === product.style))
    .slice(0, 3);

  const complementary = products
    .filter((p) => p.id !== product.id && (p.category === 'keepsake' || p.category === 'jewelry'))
    .slice(0, 3);

  return (
    <div className="shell section pb-28 md:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }} />
      <Breadcrumbs trail={trail} />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start"><Gallery product={product} /></div>

        <div id="buy">
          <p className="eyebrow">{categoryLabels[product.category]} · {product.materialLabel}</p>
          <h1 className="mt-3 font-display text-[2.1rem] leading-tight sm:text-[2.5rem]">{product.name}</h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink2">{product.description}</p>

          <div className="mt-8"><BuyBox product={product} /></div>

          <dl className="mt-10 divide-y divide-hairline border-y border-hairline text-[0.9rem]">
            {[
              ['Intended use', product.intendedUse],
              ['Material', product.materialLabel],
              ['Colour', product.colorLabel],
              ['Exterior dimensions', formatDimensions(product.dimensions)],
              ['Interior capacity', `${product.capacityCuIn} cubic inches`],
              ['Weight', `${product.weightLb} lb`],
              ['Closure', product.closure],
              ['Included', product.category === 'jewelry' ? 'Chain, filling funnel and sealing adhesive' : 'Protective pouch and care card'],
              ['Processing time', product.processingTime],
              ['SKU', product.sku],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-3">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Accordion
              items={[
                {
                  title: 'Delivery and returns',
                  content: (
                    <div className="space-y-3">
                      <p>{product.shipping.boxNote}. Outer packaging is plain and does not identify the contents.</p>
                      {/* TODO: replace with real rates and windows once shipping is configured. */}
                      <p className="pending text-[0.85rem]">Delivery estimate and returns window: to be confirmed by the business before launch.</p>
                      <p><Link href="/help/shipping" className="link-underline">Shipping and delivery</Link> · <Link href="/help/returns" className="link-underline">Returns and exchanges</Link></p>
                    </div>
                  ),
                },
                { title: 'Care', content: <p>{product.care}</p> },
                {
                  title: 'Personalisation',
                  content: product.personalization.available
                    ? <p>This piece can be engraved with {product.personalization.fields.join(', ')}. Character limits are shown as you type, and you confirm the spelling before adding it to your basket. <Link href="/help/personalization-guide" className="link-underline">Read the personalisation guide</Link>.</p>
                    : <p>This piece is supplied plain. <Link href="/collections/personalized-urns" className="link-underline">See pieces that can be engraved</Link>.</p>,
                },
                {
                  title: 'Choosing a size',
                  content: <p>Capacity is listed in cubic inches. The usual planning guide is one cubic inch for each pound of healthy body weight, and sizing up is the safer choice when you are unsure. <Link href="/size-guide" className="link-underline">Open the size guide</Link>.</p>,
                },
              ]}
            />
          </div>

          <HelpPrompt className="mt-8" heading="Need help choosing?" />
        </div>
      </div>

      <ProductRail heading="You may also like" items={related} />
      {complementary.length > 0 && (
        <ProductRail heading="Keepsakes to go alongside" items={complementary} note="Only if it would be useful — many families order one, some order none." />
      )}
      <RecentlyViewed excludeId={product.id} />

      <StickyBuyBar product={product} />
    </div>
  );
}
