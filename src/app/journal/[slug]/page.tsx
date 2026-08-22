import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { articles, getArticle } from '@/data/articles';
import { formatDate } from '@/lib/format';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HelpPrompt } from '@/components/ui/HelpPrompt';
import { articleJsonLd, breadcrumbJsonLd, canonical } from '@/lib/seo';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.standfirst,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { title: a.title, description: a.standfirst, type: 'article', url: canonical(`/journal/${a.slug}`) },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const trail = [{ name: 'Home', href: '/' }, { name: 'Journal', href: '/journal' }, { name: article.title, href: `/journal/${article.slug}` }];
  const related = article.related.map(getArticle).filter(Boolean);

  return (
    <div className="shell section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }} />
      <Breadcrumbs trail={trail} />

      <div className="mt-6 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <article className="max-w-2xl">
          <p className="eyebrow">{article.readingMinutes} min read · {formatDate(article.published)}</p>
          <h1 className="mt-3 font-display text-[2.2rem] leading-tight sm:text-[2.6rem]">{article.title}</h1>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink2">{article.standfirst}</p>

          <div className="mt-10 space-y-8">
            {article.body.map((block, i) => (
              <section key={i}>
                {block.heading && <h2 className="font-display text-2xl">{block.heading}</h2>}
                <div className="prose-calm mt-3">
                  {block.paragraphs.map((p) => <p key={p}>{p}</p>)}
                </div>
                {block.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-ink2">
                    {block.list.map((li) => <li key={li}>{li}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-hairline pt-8">
            <Link href="/size-guide" className="btn-secondary">Open the size guide</Link>
            <Link href="/urn-finder" className="btn-secondary">Find the right urn</Link>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <HelpPrompt />
          {related.length > 0 && (
            <nav aria-label="Related articles" className="rounded-[1.1rem] border border-hairline bg-linen/60 p-6">
              <h2 className="eyebrow">Read next</h2>
              <ul className="mt-3 space-y-3">
                {related.map((r) => r && (
                  <li key={r.slug}><Link href={`/journal/${r.slug}`} className="text-[0.95rem] link-underline">{r.title}</Link></li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>
    </div>
  );
}
