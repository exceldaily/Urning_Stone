import Link from 'next/link';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HelpPrompt } from '@/components/ui/HelpPrompt';

export const metadata: Metadata = {
  title: 'Personalization',
  description: 'Add a name, dates, a short inscription or a simple motif to a memorial urn, with character limits, a live preview and a spelling check before ordering.',
  alternates: { canonical: '/personalization' },
};

const options = [
  { title: 'Name and dates', body: 'Most families use a familiar name rather than a full legal name. Dates can be full or years alone.', limit: 'Up to 30 characters for a name, 24 for dates.' },
  { title: 'A short inscription', body: 'One or two lines. Something they said often, a place that mattered, or nothing at all.', limit: 'Up to 80 characters.' },
  { title: 'A symbol or motif', body: 'Small and quiet — a leaf, a wave, a single star. Availability depends on the material.', limit: 'One motif per piece.' },
  { title: 'A photo medallion', body: 'On selected pieces, set into the front or the lid.', limit: 'Availability shown on each product page.' },
  { title: 'A preview before you order', body: 'You see the wording laid out and confirm the spelling yourself before anything is added to the basket.', limit: 'Required on every engraved order.' },
];

export default function PersonalizationPage() {
  const engravable = products.filter((p) => p.personalization.available).slice(0, 3);
  const trail = [{ name: 'Home', href: '/' }, { name: 'Personalization', href: '/personalization' }];

  return (
    <div className="shell section">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl">Personalization</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink2">
          Engraving makes a piece specific. It is also entirely optional — plain is not a failure of effort, and
          many families add words later rather than now.
        </p>
      </header>

      <section className="mt-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((o) => (
            <li key={o.title} className="rounded-[1.1rem] border border-hairline bg-cream p-6">
              <h2 className="font-display text-xl">{o.title}</h2>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink2">{o.body}</p>
              <p className="mt-3 text-[0.8rem] text-muted">{o.limit}</p>
            </li>
          ))}
        </ul>
        {/* Availability is per product; this page describes what the platform supports. */}
        <p className="mt-6 max-w-2xl text-[0.85rem] leading-relaxed text-muted">
          Not every option is available on every piece — engraving depends on the material and the surface.
          Each product page shows exactly what that item supports.
        </p>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl">Getting the wording right</h2>
          <div className="prose-calm mt-4">
            <p>
              Short lines usually read better than long ones, especially on a curved surface. A name and two dates is
              the most common choice; a single remembered line is the next.
            </p>
            <p>
              You are asked to confirm the spelling before an engraved item goes into your basket. Please read it
              twice, and ask someone else to read it too if you can. Engraving is cut exactly as written and cannot
              be undone.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/collections/personalized-urns" className="btn-primary">See pieces that can be engraved</Link>
            <Link href="/help/personalization-guide" className="btn-secondary">Read the full guide</Link>
          </div>
        </div>
        <HelpPrompt heading="Not sure what to write?" body="Tell us a little about them and we will suggest a few options. Many people find it easier to react to something than to start from nothing." />
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Pieces that can be engraved</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {engravable.map((p) => <ProductCard key={p.id} product={p} showCompare={false} />)}
        </div>
      </section>
    </div>
  );
}
