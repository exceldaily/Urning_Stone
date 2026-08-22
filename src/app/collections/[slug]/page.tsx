import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { collections, getCollection } from '@/data/collections';
import { products } from '@/data/products';
import { CollectionView } from '@/components/collection/CollectionView';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HelpPrompt } from '@/components/ui/HelpPrompt';
import { GridSkeleton } from '@/components/ui/Skeleton';
import { breadcrumbJsonLd, canonical } from '@/lib/seo';

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { title: c.seoTitle, description: c.seoDescription, url: canonical(`/collections/${c.slug}`) },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const pool = products.filter(collection.match);
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: collection.title, href: `/collections/${collection.slug}` },
  ];

  return (
    <div className="shell section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }} />
      <Breadcrumbs trail={trail} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl">{collection.heading}</h1>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink2">{collection.intro}</p>
      </header>

      <div className="mt-12">
        <Suspense fallback={<GridSkeleton />}>
          <CollectionView pool={pool} />
        </Suspense>
      </div>

      {collection.footnote && (
        <p className="mt-14 max-w-2xl text-[0.9rem] leading-relaxed text-ink2">{collection.footnote}</p>
      )}

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[1.1rem] border border-hairline bg-linen/60 p-6">
          <h2 className="font-display text-xl">Related guidance</h2>
          <ul className="mt-3 space-y-2 text-[0.92rem]">
            <li><Link href="/size-guide" className="link-underline">How urn capacity is measured</Link></li>
            <li><Link href="/journal/how-to-choose-the-right-urn-size" className="link-underline">How to choose the right urn size</Link></li>
            <li><Link href="/journal/understanding-keepsake-and-companion-urns" className="link-underline">Keepsake and companion urns explained</Link></li>
            <li><Link href="/personalization" className="link-underline">What can be engraved</Link></li>
          </ul>
        </div>
        <HelpPrompt />
      </div>
    </div>
  );
}
