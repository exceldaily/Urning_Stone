import Link from 'next/link';
import type { Metadata } from 'next';
import { UrnFinder } from '@/components/finder/UrnFinder';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Find the right urn',
  description: 'Five short questions to narrow down memorial urns by who you are remembering, capacity, style, engraving and budget.',
  alternates: { canonical: '/urn-finder' },
};

export default function UrnFinderPage() {
  const trail = [{ name: 'Home', href: '/' }, { name: 'Find the right urn', href: '/urn-finder' }];
  return (
    <div className="shell section">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl">Find the right urn</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink2">
          Five short questions. Answer what you know, skip what you do not, and change any answer as you go.
          This is guidance rather than advice, and nothing you enter is stored or sent anywhere.
        </p>
      </header>
      <div className="mt-12 rounded-[1.4rem] border border-hairline bg-cream p-6 shadow-soft sm:p-10">
        <UrnFinder />
      </div>
      <p className="mt-8 text-[0.9rem] text-ink2">
        Prefer to browse? <Link href="/collections/memorial-urns-for-ashes" className="link-underline">See the full collection</Link> or
        read the <Link href="/size-guide" className="link-underline">urn size guide</Link> first.
      </p>
    </div>
  );
}
