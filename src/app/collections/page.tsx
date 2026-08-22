import Link from 'next/link';
import type { Metadata } from 'next';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Shop by style',
  description: 'Browse memorial urns by type and style: adult, keepsake, companion and pet urns in wood, ceramic, brass, stone and biodegradable materials.',
  alternates: { canonical: '/collections' },
};

export default function CollectionsIndex() {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Collections', href: '/collections' }];
  return (
    <div className="shell section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }} />
      <Breadcrumbs trail={trail} />
      <h1 className="mt-6 font-display text-4xl">Shop by style</h1>
      <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-ink2">
        Every collection draws from the same catalogue, sorted the way people usually look for things.
        If you would rather answer a few questions instead, the <Link href="/urn-finder" className="link-underline">urn finder</Link> takes about a minute.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => {
          const count = products.filter(c.match).length;
          return (
            <li key={c.slug}>
              <Link href={`/collections/${c.slug}`} className="flex h-full flex-col rounded-[1.1rem] border border-hairline bg-cream p-6 transition-all duration-500 ease-calm hover:-translate-y-0.5 hover:border-bronze/50 hover:shadow-lift">
                <h2 className="font-display text-xl">{c.heading}</h2>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink2">{c.intro}</p>
                <span className="mt-5 text-[0.8rem] text-muted">{count} {count === 1 ? 'piece' : 'pieces'}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
