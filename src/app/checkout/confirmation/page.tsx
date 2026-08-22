import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your order has been received',
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <div className="shell section">
      <div className="mx-auto max-w-2xl rounded-[1.4rem] border border-hairline bg-cream p-8 text-center sm:p-12">
        <span className="rule-bronze mx-auto" aria-hidden />
        <h1 className="mt-6 font-display text-3xl sm:text-4xl">Your order has been received.</h1>
        <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-ink2">
          We&apos;ll handle it with care and keep you updated as it moves through each step.
        </p>
        <p className="mx-auto mt-4 max-w-md text-[0.9rem] leading-relaxed text-muted">
          A confirmation is on its way to your email address. If anything needs changing — a spelling, an address,
          a date that has moved — tell us as soon as you can and we will do what we can.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/help/contact" className="btn-primary">Contact us about this order</Link>
          <Link href="/" className="btn-secondary">Return to the homepage</Link>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-[1.1rem] border border-hairline bg-linen/60 p-6">
        <h2 className="font-display text-xl">What happens next</h2>
        <ol className="mt-3 space-y-3 text-[0.92rem] leading-relaxed text-ink2">
          <li><span className="text-ink">1.</span> We check the order, including any engraving, exactly as you wrote it.</li>
          <li><span className="text-ink">2.</span> The piece is prepared, inspected and packed in plain outer packaging.</li>
          <li><span className="text-ink">3.</span> We email tracking details when it leaves us.</li>
        </ol>
        {/* TODO: replace with real timings once processing and delivery windows are set. */}
        <p className="pending mt-4 text-[0.85rem]">Specific timings appear here once processing and delivery windows are confirmed.</p>
      </div>
    </div>
  );
}
