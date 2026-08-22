import Link from 'next/link';
import type { DocPageContent } from '@/data/pages';
import { Breadcrumbs } from './Breadcrumbs';
import { HelpPrompt } from './HelpPrompt';

export function DocPage({ page }: { page: DocPageContent }) {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Help', href: '/help/faq' }, { name: page.title, href: `/help/${page.slug}` }];
  const pendingCount = page.sections.filter((s) => s.pending).length;

  return (
    <div className="shell section">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl">{page.title}</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink2">{page.standfirst}</p>
      </header>

      {pendingCount > 0 && (
        <p className="mt-8 max-w-2xl rounded-xl border border-dashed border-bronze/50 bg-bronze/[0.04] px-5 py-4 text-[0.85rem] leading-relaxed text-bronze-deep">
          {pendingCount} {pendingCount === 1 ? 'section on this page is' : 'sections on this page are'} awaiting the real terms.
          Nothing here should be treated as a published policy until it has been written by the business.
        </p>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="max-w-2xl space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl">{section.heading}</h2>
              <div className={section.pending ? 'pending mt-4 space-y-3' : 'prose-calm mt-4'}>
                {section.paragraphs?.map((p) => <p key={p} className={section.pending ? 'text-[0.9rem] leading-relaxed text-ink2' : ''}>{p}</p>)}
                {section.list && (
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-ink2">
                    {section.list.map((li) => <li key={li}>{li}</li>)}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <HelpPrompt heading="Still not sure?" />
          <nav aria-label="Other help pages" className="rounded-[1.1rem] border border-hairline bg-linen/60 p-6">
            <h2 className="eyebrow">More help</h2>
            <ul className="mt-3 space-y-2 text-[0.9rem]">
              <li><Link href="/help/faq" className="link-underline">Frequently asked questions</Link></li>
              <li><Link href="/size-guide" className="link-underline">Urn size guide</Link></li>
              <li><Link href="/help/personalization-guide" className="link-underline">Personalization guide</Link></li>
              <li><Link href="/help/shipping" className="link-underline">Shipping and delivery</Link></li>
              <li><Link href="/help/returns" className="link-underline">Returns and exchanges</Link></li>
              <li><Link href="/resources" className="link-underline">Memorial planning resources</Link></li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
