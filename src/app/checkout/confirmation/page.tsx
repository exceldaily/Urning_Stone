/**
 * ORDER CONFIRMATION
 * -------------------------------------------------------------------------
 * Stripe redirects here with ?session_id=... after payment. The session is
 * verified server-side before anything is confirmed: this page must never
 * tell someone their order succeeded just because they loaded the URL.
 *
 * Three honest states: paid, still processing, and could-not-verify.
 */
import Link from 'next/link';
import type { Metadata } from 'next';
import { getStripe } from '@/lib/stripe';
import { ClearCartOnMount } from '@/components/store/ClearCartOnMount';

export const metadata: Metadata = {
  title: 'Your order',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type Status = 'paid' | 'processing' | 'unverified';

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let status: Status = 'unverified';
  let email: string | null = null;
  let amount: number | null = null;

  const stripe = getStripe();
  if (stripe && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      email = session.customer_details?.email ?? null;
      amount = session.amount_total ?? null;
      if (session.payment_status === 'paid') status = 'paid';
      else if (session.status === 'open') status = 'unverified';
      else status = 'processing';
    } catch {
      status = 'unverified';
    }
  }

  const heading =
    status === 'paid' ? 'Your order has been received.'
    : status === 'processing' ? 'Your payment is still going through.'
    : 'We could not confirm this order.';

  return (
    <div className="shell section">
      {status === 'paid' && <ClearCartOnMount value={amount != null ? amount / 100 : undefined} />}

      <div className="mx-auto max-w-2xl rounded-[1.4rem] border border-hairline bg-cream p-8 text-center sm:p-12">
        <span className="rule-bronze mx-auto" aria-hidden />
        <h1 className="mt-6 font-display text-3xl sm:text-4xl">{heading}</h1>

        {status === 'paid' && (
          <>
            <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-ink2">
              We&apos;ll handle it with care and keep you updated as it moves through each step.
            </p>
            <p className="mx-auto mt-4 max-w-md text-[0.9rem] leading-relaxed text-muted">
              A confirmation is on its way{email ? ` to ${email}` : ' to your email address'}. If anything needs
              changing — a spelling, an address, a date that has moved — tell us as soon as you can and we will do
              what we can.
            </p>
          </>
        )}

        {status === 'processing' && (
          <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-ink2">
            Your bank has not finished confirming the payment. This usually resolves within a few minutes, and we
            will email you either way. Please do not pay a second time.
          </p>
        )}

        {status === 'unverified' && (
          <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-ink2">
            We could not match this page to a completed payment, so we would rather say so than tell you an order
            exists when it may not. If you were charged, contact us with the time you ordered and we will find it.
            Your basket has been left as it was.
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/help/contact" className="btn-primary">Contact us about this order</Link>
          <Link href={status === 'unverified' ? '/cart' : '/'} className="btn-secondary">
            {status === 'unverified' ? 'Back to your basket' : 'Return to the homepage'}
          </Link>
        </div>
      </div>

      {status === 'paid' && (
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
      )}
    </div>
  );
}
