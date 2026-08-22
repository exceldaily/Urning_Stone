import Link from 'next/link';
import type { Metadata } from 'next';
import { CAPACITY_CAVEAT, CAPACITY_RULE, sizeBands } from '@/data/sizeGuide';
import { CapacityScale } from '@/components/ui/CapacityScale';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HelpPrompt } from '@/components/ui/HelpPrompt';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Urn size guide',
  description: 'How urn capacity is measured in cubic inches, with the one pound to one cubic inch planning guide and sizes for adult, extra-large, companion, keepsake and pet urns.',
  alternates: { canonical: '/size-guide' },
};

const examples = [
  { weight: 120, suggested: '140 – 180 cu in' },
  { weight: 160, suggested: '180 – 200 cu in' },
  { weight: 200, suggested: '210 – 250 cu in' },
  { weight: 260, suggested: '280 – 320 cu in' },
];

const guideFaqs = [
  { q: 'How is urn capacity measured?', a: 'In cubic inches. It describes the interior volume of the urn, not its exterior size, so two urns of the same height can hold different amounts.' },
  { q: 'How do I estimate the capacity I need?', a: 'Use approximately one cubic inch for each pound of healthy body weight. Someone who weighed 170 pounds is usually well served by an urn of 170 to 200 cubic inches. This is a general estimate rather than a guarantee.' },
  { q: 'What if I am between two sizes?', a: 'Choose the larger one. An urn with room to spare closes properly, while an urn that is slightly too small cannot be used at all.' },
];

export default function SizeGuidePage() {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Urn size guide', href: '/size-guide' }];

  return (
    <div className="shell section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(guideFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }} />
      <Breadcrumbs trail={trail} />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl">Urn size guide</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink2">
          Capacity is the one thing worth getting right first. It is measured in cubic inches, and it describes
          the space inside the urn rather than how large the urn looks.
        </p>
      </header>

      <section className="mt-12 rounded-[1.4rem] border border-hairline bg-cream p-6 shadow-soft sm:p-10">
        <p className="eyebrow">The planning guide</p>
        <p className="mt-3 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">{CAPACITY_RULE}</p>
        <p className="mt-5 max-w-2xl text-[0.92rem] leading-relaxed text-muted">{CAPACITY_CAVEAT}</p>

        <table className="mt-8 w-full border-collapse text-left text-[0.92rem]">
          <caption className="sr-only">Suggested urn capacity by approximate body weight</caption>
          <thead>
            <tr className="border-b border-hairline">
              <th scope="col" className="py-3 font-medium">Approximate weight</th>
              <th scope="col" className="py-3 font-medium">Capacity usually suitable</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((e) => (
              <tr key={e.weight} className="border-b border-hairline">
                <td className="py-3 tabular-nums">{e.weight} lb</td>
                <td className="py-3 tabular-nums text-ink2">{e.suggested}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">The sizes you will see</h2>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink2">
          Every bar below is drawn on the same scale, so the bands are directly comparable. The same scale appears on
          every product page.
        </p>
        <ul className="mt-8 space-y-4">
          {sizeBands.map((band) => (
            <li key={band.id} className="grid items-center gap-4 rounded-[1.1rem] border border-hairline bg-cream p-6 sm:grid-cols-[220px_1fr_auto]">
              <div>
                <h3 className="font-display text-xl">{band.label}</h3>
                <p className="text-[0.82rem] tabular-nums text-muted">{band.range}</p>
              </div>
              <div>
                <CapacityScale capacity={Math.round((band.capacityLow + band.capacityHigh) / 2)} size="lg" />
                <p className="mt-1 text-[0.9rem] text-ink2">{band.suits}</p>
              </div>
              <Link href={band.href} className="btn-secondary justify-self-start text-[0.85rem] sm:justify-self-end">Browse</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl">Before you order</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-ink2">
            <li><strong className="font-medium text-ink">Ask the crematory.</strong> Many can tell you the actual volume, which removes the guesswork entirely.</li>
            <li><strong className="font-medium text-ink">Measure the space.</strong> Every product page lists exterior height, width and depth.</li>
            <li><strong className="font-medium text-ink">Check niche limits.</strong> Cemeteries and columbaria often set strict maximum dimensions.</li>
            <li><strong className="font-medium text-ink">Plan for keepsakes separately.</strong> Keepsakes hold very little, so order the main urn at full capacity anyway.</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/urn-finder" className="btn-primary">Find the right urn</Link>
            <Link href="/collections/memorial-urns-for-ashes" className="btn-secondary">Browse by capacity</Link>
          </div>
        </div>
        <HelpPrompt heading="Would you like us to check?" body="Send us the weight and any niche measurements and we will tell you which capacities fit. No order required." />
      </section>
    </div>
  );
}
