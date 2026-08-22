'use client';
import Link from 'next/link';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="shell section">
      <div className="mx-auto max-w-xl text-center">
        <span className="rule-bronze mx-auto" aria-hidden />
        <h1 className="mt-6 font-display text-4xl">Something went wrong loading this page</h1>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink2">
          Nothing in your basket has been lost. Trying again usually works; if it does not, tell us what you were doing
          and we will look into it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">Try again</button>
          <Link href="/" className="btn-secondary">Go to the homepage</Link>
          <Link href="/help/contact" className="btn-secondary">Report the problem</Link>
        </div>
      </div>
    </div>
  );
}
