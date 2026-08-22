import Link from 'next/link';
import type { Metadata } from 'next';
import { faqGroups, faqs } from '@/data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HelpPrompt } from '@/components/ui/HelpPrompt';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description: 'Answers on choosing an urn size, keepsake and companion urns, engraving, ordering, delivery and care.',
  alternates: { canonical: '/help/faq' },
};

export default function FaqPage() {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Help', href: '/help/faq' }, { name: 'FAQ', href: '/help/faq' }];
  // Only questions with settled answers are eligible for FAQ structured data.
  const structured = faqs.filter((f) => !f.policyPending).map((f) => ({ q: f.q, a: f.a }));

  return (
    <div className="shell section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(structured)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }} />
      <Breadcrumbs trail={trail} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl">Frequently asked questions</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink2">
          The questions people ask us most. If yours is not here, <Link href="/help/contact" className="link-underline">ask us directly</Link> — we would rather answer it than have you guess.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="max-w-2xl space-y-10">
          {faqGroups.map((group) => (
            <section key={group}>
              <h2 className="font-display text-2xl">{group}</h2>
              <div className="mt-4">
                <Accordion
                  items={faqs.filter((f) => f.group === group).map((f) => ({
                    title: f.q,
                    content: f.policyPending ? <p className="pending text-[0.9rem]">{f.a}</p> : <p>{f.a}</p>,
                  }))}
                />
              </div>
            </section>
          ))}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start"><HelpPrompt /></aside>
      </div>
    </div>
  );
}
