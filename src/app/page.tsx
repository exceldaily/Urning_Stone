import Link from 'next/link';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { guidedPaths } from '@/data/collections';
import { articles } from '@/data/articles';
import { hasVerifiedReviews, testimonials } from '@/data/testimonials';
import { trustPoints } from '@/data/site';
import { CAPACITY_CAVEAT, CAPACITY_RULE, sizeBands } from '@/data/sizeGuide';
import { ProductCard } from '@/components/product/ProductCard';
import { UrnFinder } from '@/components/finder/UrnFinder';
import { RoomScene } from '@/components/home/RoomScene';
import { Reveal } from '@/components/ui/Reveal';
import { CapacityScale } from '@/components/ui/CapacityScale';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Somewhere lovely for a friend who was family',
  description: 'Urns and keepsakes for dogs, cats and small pets. Clear size guidance based on their weight, optional engraving, and someone to talk to whenever you want.',
  alternates: { canonical: '/' },
};

const personalizationOptions = [
  { title: 'Name and dates', body: 'As you would say it aloud, rather than as it appears on a document.' },
  { title: 'A short inscription', body: 'A line they said often, or a place that mattered to them.' },
  { title: 'A symbol or motif', body: 'Small and quiet — a leaf, a wave, a single star.' },
  { title: 'A photo medallion', body: 'On selected pieces, set into the front or the lid.' },
  { title: 'A preview before you order', body: 'You see the wording laid out, and confirm the spelling yourself.' },
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* 3. Hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="shell grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="max-w-xl">
            <span className="rule-bronze" aria-hidden />
            <h1 className="mt-6 font-display text-[2.4rem] leading-[1.08] sm:text-[3.1rem]">
              Somewhere lovely for a friend who was family.
            </h1>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink2">
              Urns and keepsakes for dogs, cats and small pets — chosen to hold them safely, and to look
              like they belong in the room where they slept.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/urn-finder" className="btn-primary">Find the right urn</Link>
              <Link href="/collections/memorial-urns-for-ashes" className="btn-secondary">Browse the collection</Link>
            </div>
            <p className="mt-4 text-[0.88rem] text-muted">
              Not sure what you need? <Link href="/size-guide" className="link-underline">Our simple guide can help.</Link>
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[1.4rem] border border-hairline bg-cream shadow-soft">
              <RoomScene tone="morning" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Guided shopping */}
      <section className="section border-b border-hairline">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Let us help you choose</p>
            <h2 className="mt-3 max-w-lg font-display text-3xl sm:text-4xl">Start with who you are remembering.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guidedPaths.map((path, i) => (
              <Reveal key={path.href} delay={i * 70}>
                <Link href={path.href} className="group flex h-full flex-col justify-between rounded-[1.1rem] border border-hairline bg-cream p-6 transition-all duration-500 ease-calm hover:-translate-y-0.5 hover:border-bronze/50 hover:shadow-lift">
                  <div>
                    <h3 className="font-display text-xl">{path.label}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-ink2">{path.body}</p>
                  </div>
                  <span className="mt-6 text-[0.82rem] text-bronze-deep transition-transform duration-300 ease-calm group-hover:translate-x-1">Look at these →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Urn finder */}
      <section className="section border-b border-hairline bg-linen/50" id="finder">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Five short questions</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">We can narrow it down with you.</h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink2">
                Answer what you know and skip what you do not. Nothing is recorded, and you can change any answer.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 rounded-[1.4rem] border border-hairline bg-cream p-6 shadow-soft sm:p-10">
            <UrnFinder />
          </div>
        </div>
      </section>

      {/* 6. Featured collection */}
      <section className="section border-b border-hairline">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">A place to begin</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl">Pieces families come back to</h2>
              </div>
              <Link href="/collections/memorial-urns-for-ashes" className="btn-secondary">See everything</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}><ProductCard product={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Made for the home you shared */}
      <section className="section border-b border-hairline bg-linen/50">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Made for the home you shared</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">In the room where they slept.</h2>
            <div className="prose-calm mt-5 max-w-xl">
              <p>
                A memorial piece does not have to sit apart from everything else. On a shelf among the books they
                read, on a mantel, on the windowsill where the light comes in — it can be part of the room rather
                than an interruption to it.
              </p>
              <p>
                That is not about keeping it out of sight. It is the opposite: something that looks like it belongs
                is easier to live alongside, and easier to notice fondly on an ordinary afternoon.
              </p>
            </div>
            <Link href="/collections/memorial-urns-for-ashes" className="btn-secondary mt-7">See how pieces sit in a room</Link>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[1.1rem] border border-hairline bg-cream sm:col-span-2"><RoomScene tone="afternoon" pet="cat" label="An illustrated living room with afternoon light, a shelf with a memorial urn among books, and a cat asleep on the rug. Photography to follow." /></div>
              <div className="overflow-hidden rounded-[1.1rem] border border-hairline bg-cream"><RoomScene tone="evening" pet="none" label="An illustrated interior in evening light with a memorial urn and a collar resting on a shelf. Photography to follow." /></div>
              <div className="flex flex-col justify-center rounded-[1.1rem] border border-hairline bg-cream p-6">
                <p className="font-display text-xl">Sized before you order</p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink2">Every product page lists exterior height, width and depth, so you can measure the space first.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Personalisation */}
      <section className="section border-b border-hairline">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Personalisation</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Their name, in your handwriting or ours.</h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink2">
              Engraving is optional, and plain is not a failure of effort. If you would like words on a piece,
              here is what can usually be added. Availability differs by material, and each product page shows
              exactly what that piece supports.
            </p>
            <Link href="/personalization" className="btn-secondary mt-7">See personalization options</Link>
          </Reveal>
          <Reveal delay={80}>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {personalizationOptions.map((o) => (
                <li key={o.title} className="py-5">
                  <h3 className="font-display text-lg">{o.title}</h3>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-ink2">{o.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 9. Size guide preview */}
      <section className="section border-b border-hairline bg-linen/50">
        <div className="shell">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Size guide</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">What size will you need?</h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink2">{CAPACITY_RULE} So a 40 lb spaniel is usually well served by an urn of 40 to 50 cubic inches. Use their healthy weight rather than their weight at the end.</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-10 space-y-4">
              {sizeBands.map((band) => (
                <li key={band.id} className="grid items-center gap-4 rounded-[1.1rem] border border-hairline bg-cream p-5 sm:grid-cols-[200px_1fr_auto]">
                  <div>
                    <Link href={band.href} className="font-display text-lg hover:text-bronze-deep">{band.label}</Link>
                    <p className="text-[0.8rem] tabular-nums text-muted">{band.range}</p>
                  </div>
                  <div>
                    <CapacityScale capacity={Math.round((band.capacityLow + band.capacityHigh) / 2)} />
                    <p className="mt-1 text-[0.85rem] text-ink2">{band.suits}</p>
                  </div>
                  <Link href={band.href} className="btn-quiet justify-self-start text-[0.82rem] underline decoration-bronze/40 underline-offset-4 sm:justify-self-end">View</Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-[0.85rem] leading-relaxed text-muted">{CAPACITY_CAVEAT}</p>
            <Link href="/size-guide" className="btn-primary mt-7">Use the urn size guide</Link>
          </Reveal>
        </div>
      </section>

      {/* 10. Trust and reassurance */}
      <section className="section-tight border-b border-hairline">
        <div className="shell">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {trustPoints.map((t) => (
              <li key={t.title}>
                <span className="rule-bronze" aria-hidden />
                <h3 className="mt-3 text-[0.95rem] font-medium">{t.title}</h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink2">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. Customer stories */}
      <section className="section border-b border-hairline bg-linen/50">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">In their words</p>
                <h2 className="mt-3 font-display text-3xl">In their words</h2>
              </div>
              {/* Disappears on its own once verified reviews are connected. */}
              {!hasVerifiedReviews && (
                <p className="max-w-sm rounded-full border border-dashed border-bronze/50 px-4 py-2 text-[0.78rem] text-bronze-deep">
                  Placeholder content — no verified reviews are connected yet.
                </p>
              )}
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 70}>
                <figure className="flex h-full flex-col rounded-[1.1rem] border border-hairline bg-cream p-6">
                  <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-ink2">{t.quote}</blockquote>
                  <figcaption className="mt-5 border-t border-hairline pt-4 text-[0.82rem] text-muted">
                    {t.attribution} · {t.context}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Educational content */}
      <section className="section border-b border-hairline">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Guidance</p>
                <h2 className="mt-3 font-display text-3xl">Things worth knowing first</h2>
              </div>
              <Link href="/journal" className="btn-secondary">All guidance</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <article className="group flex h-full flex-col rounded-[1.1rem] border border-hairline bg-cream p-6 transition-all duration-500 ease-calm hover:-translate-y-0.5 hover:shadow-lift">
                  <p className="eyebrow">{a.readingMinutes} min read · {formatDate(a.published)}</p>
                  <h3 className="mt-3 font-display text-xl leading-snug">
                    <Link href={`/journal/${a.slug}`} className="transition-colors group-hover:text-bronze-deep">{a.title}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink2">{a.standfirst}</p>
                  <span className="mt-5 text-[0.82rem] text-bronze-deep">Read this →</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Final call to action */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-[1.4rem] border border-hairline bg-cream px-6 py-14 text-center shadow-soft sm:px-12">
              <span className="rule-bronze mx-auto" aria-hidden />
              <h2 className="mt-6 font-display text-3xl sm:text-4xl">Honor their memory in a way that feels personal.</h2>
              <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-ink2">
                Take the time you need. Nothing here is held, reserved, or counting down.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/collections/memorial-urns-for-ashes" className="btn-primary">Explore memorial urns</Link>
                <Link href="/help/contact" className="btn-secondary">Talk to someone</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
