import Link from 'next/link';
import type { Metadata } from 'next';
import { resourceGroups } from '@/data/pages';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HelpPrompt } from '@/components/ui/HelpPrompt';

export const metadata: Metadata = {
  title: 'Pet loss resources',
  description: 'Practical guidance for the days after losing a pet: what to ask the crematorium, how families usually decide, and where to find support that takes pet grief seriously.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Memorial planning resources', href: '/resources' }];
  return (
    <div className="shell section">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl">Memorial planning resources</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink2">
          Practical things that are easy to miss when you are tired. None of this requires an order, and none of it is
          legal or professional advice — where local rules apply, please check with the relevant authority.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="max-w-2xl space-y-10">
          {resourceGroups.map((group) => (
            <section key={group.heading}>
              <h2 className="font-display text-2xl">{group.heading}</h2>
              <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                {group.items.map((item) => (
                  <li key={item.title} className="py-5">
                    <h3 className="text-[1rem] font-medium">{item.title}</h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink2">{item.body}</p>
                    {'pending' in item && item.pending && (
                      <p className="mt-2 text-[0.8rem] text-bronze-deep">Local rules vary — this needs checking for your area before you plan a date.</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="text-[0.9rem] text-ink2">
            More on sizing in the <Link href="/size-guide" className="link-underline">urn size guide</Link> and the{' '}
            <Link href="/journal" className="link-underline">journal</Link>.
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start"><HelpPrompt heading="Would it help to talk it through?" /></aside>
      </div>
    </div>
  );
}
