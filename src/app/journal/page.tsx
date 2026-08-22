import Link from 'next/link';
import type { Metadata } from 'next';
import { articles } from '@/data/articles';
import { formatDate } from '@/lib/format';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Guidance and articles',
  description: 'Plain, practical guidance on choosing an urn size, choosing something personal, and understanding keepsake and companion urns.',
  alternates: { canonical: '/journal' },
};

export default function JournalIndex() {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Journal', href: '/journal' }];
  return (
    <div className="shell section">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl">Guidance</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink2">
          Short, practical pieces on the decisions people find hardest. No sales copy, and nothing you need to buy to use.
        </p>
      </header>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <article className="group flex h-full flex-col rounded-[1.1rem] border border-hairline bg-cream p-6 transition-all duration-500 ease-calm hover:-translate-y-0.5 hover:shadow-lift">
              <p className="eyebrow">{a.readingMinutes} min read · {formatDate(a.published)}</p>
              <h2 className="mt-3 font-display text-xl leading-snug">
                <Link href={`/journal/${a.slug}`} className="transition-colors group-hover:text-bronze-deep">{a.title}</Link>
              </h2>
              <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink2">{a.standfirst}</p>
              <span className="mt-5 text-[0.82rem] text-bronze-deep">Read this →</span>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
