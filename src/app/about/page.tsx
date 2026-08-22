import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/data/site';
import { RoomScene } from '@/components/home/RoomScene';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Our story',
  description: 'Why we choose the memorial pieces we do, and how we try to make choosing an urn clearer and less clinical for families.',
  alternates: { canonical: '/about' },
};

const beliefs = [
  { title: 'Every person deserves to be remembered as an individual', body: 'Not as a category, a size band or an order number. The point of a memorial piece is that it belongs to one particular life.' },
  { title: 'Choosing should not feel clinical', body: 'Most of this industry is written in language that keeps people at arm\u2019s length. We would rather say ashes than remains container, and explain a cubic inch rather than assume you know.' },
  { title: 'Guidance, not pressure', body: 'Nothing on this site counts down, sells out, or hurries you along. If we tell you something is a good fit, it is because it is.' },
  { title: 'Chosen for meaning, quality and the home', body: 'We look for pieces that are well made, honestly described, and suited to sitting in a room people actually live in.' },
];

export default function AboutPage() {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Our story', href: '/about' }];
  return (
    <div className="shell section">
      <Breadcrumbs trail={trail} />
      <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl">Our story</h1>
          <div className="prose-calm mt-6">
            <p>
              {site.brandName} exists for a narrow reason: choosing an urn is unreasonably hard, and it does not need to be.
            </p>
            <p>
              People arrive at this decision tired, often within days of a loss, and are met with catalogues written in
              procedural language, sizes given without explanation, and a great deal of imagery that has nothing to do
              with the person they are thinking about. The decision itself is not complicated. The way it is usually
              presented is.
            </p>
            <p>
              So we have tried to build the version we would want to use. Capacity explained plainly and shown on the
              same scale everywhere. Dimensions listed before you ask. Engraving you can preview and check. Policies
              written in sentences rather than clauses. And a person to talk to when reading is not what you need.
            </p>
            <p>
              We are careful about what we claim. Where we do not yet know something — a delivery window, a returns
              term — we say so rather than fill the space with something reassuring and untrue.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections/memorial-urns-for-ashes" className="btn-primary">See the collection</Link>
            <Link href="/help/contact" className="btn-secondary">Talk to someone</Link>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-[1.4rem] border border-hairline bg-cream shadow-soft">
            <RoomScene tone="afternoon" />
          </div>
          <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
            {beliefs.map((b) => (
              <li key={b.title} className="py-5">
                <h2 className="font-display text-lg">{b.title}</h2>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink2">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
