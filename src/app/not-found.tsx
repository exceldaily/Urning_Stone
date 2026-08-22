import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="shell section">
      <div className="mx-auto max-w-xl text-center">
        <span className="rule-bronze mx-auto" aria-hidden />
        <h1 className="mt-6 font-display text-4xl">That page is not here</h1>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink2">
          The link may be out of date, or the piece may have moved. These usually lead where people are trying to go.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/collections/memorial-urns-for-ashes" className="btn-primary">Browse the collection</Link>
          <Link href="/size-guide" className="btn-secondary">Urn size guide</Link>
          <Link href="/help/contact" className="btn-secondary">Ask us</Link>
        </div>
      </div>
    </div>
  );
}
