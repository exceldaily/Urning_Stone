'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from '@/components/store/StoreProvider';
import { useCurrency } from '@/components/store/CurrencyProvider';
import { UrnImage } from '@/components/product/UrnImage';
import { track } from '@/lib/analytics';

/**
 * CHECKOUT
 * -------------------------------------------------------------------------
 * A complete, validated front end with no payment processor attached.
 *
 * >> TO GO LIVE: submit the collected values to your payment provider
 *    (Stripe, Shopify, etc.) from a server route. Never place secret keys in
 *    client code, and never handle raw card numbers yourself — mount the
 *    provider's hosted fields where the payment panel is marked below.
 */

type Fields = { email: string; name: string; address1: string; city: string; postcode: string; country: string; phone: string };
const emptyFields: Fields = { email: '', name: '', address1: '', city: '', postcode: '', country: 'United States', phone: '' };

export default function CheckoutPage() {
  const { price } = useCurrency();
  const router = useRouter();
  const { lines, lineProduct, subtotalCents, hydrated, clearCart } = useStore();
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (hydrated && lines.length) track('checkout_started', { value: subtotalCents / 100 }); }, [hydrated, lines.length, subtotalCents]);

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!/.+@.+\..+/.test(fields.email)) next.email = 'Enter an email address in the form name@example.com so we can send your confirmation.';
    if (fields.name.trim().length < 2) next.name = 'Enter the name the delivery should be addressed to.';
    if (fields.address1.trim().length < 4) next.address1 = 'Enter the street address for delivery.';
    if (!fields.city.trim()) next.city = 'Enter the town or city.';
    if (!fields.postcode.trim()) next.postcode = 'Enter the postal or ZIP code.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const first = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      first?.focus();
      return;
    }
    setSubmitting(true);
    // TODO: replace with a real payment intent + order creation call.
    track('purchase_completed', { value: subtotalCents / 100, items: lines.length });
    setTimeout(() => { clearCart(); router.push('/checkout/confirmation'); }, 600);
  };

  if (!hydrated) return <div className="shell section"><div className="skeleton h-72 w-full" /></div>;

  if (!lines.length) {
    return (
      <div className="shell section text-center">
        <h1 className="font-display text-3xl">Your basket is empty</h1>
        <p className="mt-3 text-ink2">There is nothing to check out just yet.</p>
        <Link href="/collections/memorial-urns-for-ashes" className="btn-primary mt-6">Browse the collection</Link>
      </div>
    );
  }

  const field = (key: keyof Fields, label: string, type = 'text', autoComplete?: string) => (
    <div>
      <label htmlFor={key} className="text-[0.9rem] font-medium">{label}</label>
      <input
        id={key} type={type} autoComplete={autoComplete} value={fields[key]}
        onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
        aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-err` : undefined}
        className={`field mt-1.5 ${errors[key] ? 'border-bronze' : ''}`}
      />
      {errors[key] && <p id={`${key}-err`} role="alert" className="mt-1.5 text-[0.82rem] text-bronze-deep">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="shell section">
      <h1 className="font-display text-4xl">Checkout</h1>
      <p className="mt-3 max-w-xl text-[0.95rem] text-ink2">
        You can order as a guest. We ask only for what is needed to deliver the order and keep you updated.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} noValidate className="space-y-8">
          <section>
            <h2 className="font-display text-xl">Express payment</h2>
            {/* TODO: mount Apple Pay / Google Pay / PayPal buttons here when the provider is configured. */}
            <div className="pending mt-3 text-[0.88rem] text-ink2">
              Express payment buttons appear here once a payment provider is connected. No provider is configured yet.
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl">Where should it go?</h2>
            {field('email', 'Email address', 'email', 'email')}
            {field('name', 'Full name', 'text', 'name')}
            {field('address1', 'Street address', 'text', 'address-line1')}
            <div className="grid gap-4 sm:grid-cols-2">
              {field('city', 'Town or city', 'text', 'address-level2')}
              {field('postcode', 'Postal or ZIP code', 'text', 'postal-code')}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="country" className="text-[0.9rem] font-medium">Country</label>
                <select id="country" value={fields.country} onChange={(e) => setFields((f) => ({ ...f, country: e.target.value }))} className="field mt-1.5">
                  {/* TODO: replace with the real list of countries you ship to. */}
                  <option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option>
                </select>
              </div>
              {field('phone', 'Phone (optional)', 'tel', 'tel')}
            </div>
            <p className="text-[0.82rem] text-muted">A phone number only helps the carrier if there is a delivery problem.</p>
          </section>

          <section>
            <h2 className="font-display text-xl">Delivery</h2>
            <div className="pending mt-3 text-[0.88rem] text-ink2">
              Delivery options and costs appear here once carriers and rates are configured. Nothing will be added to your total that is not shown on this page.
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl">Payment</h2>
            <div className="pending mt-3 text-[0.88rem] text-ink2">
              The payment provider&apos;s secure card fields mount here. Card details are never handled by this site directly.
            </div>
          </section>

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Placing your order…' : 'Place order'}
          </button>
          <p className="text-center text-[0.8rem] text-muted">
            By placing an order you agree to our <Link href="/help/terms" className="link-underline">terms</Link>. No account is created unless you ask for one.
          </p>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.1rem] border border-hairline bg-cream p-6">
            <h2 className="font-display text-xl">Order summary</h2>
            <ul className="mt-4 divide-y divide-hairline">
              {lines.map((line) => {
                const p = lineProduct(line);
                if (!p) return null;
                return (
                  <li key={line.lineId} className="flex gap-4 py-4">
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-hairline bg-linen"><UrnImage product={p} /></div>
                    <div className="min-w-0 flex-1 text-[0.88rem]">
                      <p>{p.name} <span className="text-muted">× {line.quantity}</span></p>
                      {line.personalization?.name && <p className="mt-1 text-[0.8rem] text-muted">Engraved: {line.personalization.name}</p>}
                    </div>
                    <span className="tabular-nums text-[0.88rem]">{price(p.priceCents * line.quantity)}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-hairline pt-4 text-[0.92rem]">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{price(subtotalCents)}</dd></div>
              <div className="flex justify-between"><dt>Delivery</dt><dd className="text-muted">To be confirmed</dd></div>
            </dl>
          </div>
          <p className="mt-4 text-[0.85rem] leading-relaxed text-ink2">
            Something not right? <Link href="/help/contact" className="link-underline">Ask us before you order</Link> — we would rather fix it now.
          </p>
        </aside>
      </div>
    </div>
  );
}
