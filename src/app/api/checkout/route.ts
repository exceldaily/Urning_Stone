/**
 * STRIPE CHECKOUT SESSION
 * -------------------------------------------------------------------------
 * Takes the cart, rebuilds every line from the server-side catalogue, and
 * creates a Stripe Checkout Session.
 *
 * PRICES ARE NEVER TAKEN FROM THE CLIENT. The browser sends product ids and
 * quantities only; the amount charged is recomputed here from products.ts at
 * the configured markup. A tampered cart cannot change what is charged.
 *
 * Settlement is in the base currency (USD). The on-site currency switcher is
 * a display conversion for the customer's benefit, and says so.
 */
import { NextResponse } from 'next/server';
import { getStripe, stripeConfigured } from '@/lib/stripe';
import { products } from '@/data/products';
import { BASE_CURRENCY } from '@/data/currencies';
import { site } from '@/data/site';

export const runtime = 'nodejs';

interface IncomingLine {
  productId: string;
  quantity: number;
  personalization?: Record<string, string | boolean | undefined>;
}

const MAX_QTY = 20;

export async function POST(request: Request) {
  const stripe = getStripe();

  if (!stripe) {
    return NextResponse.json(
      {
        error: 'payments_not_configured',
        message:
          'Payments are not connected yet. Set STRIPE_SECRET_KEY to take real orders.',
      },
      { status: 503 },
    );
  }

  let body: { lines?: IncomingLine[]; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Malformed request body.' }, { status: 400 });
  }

  const incoming = Array.isArray(body.lines) ? body.lines : [];
  if (!incoming.length) {
    return NextResponse.json({ error: 'empty_cart', message: 'There is nothing in the basket.' }, { status: 400 });
  }

  // Rebuild each line from the catalogue. Anything unrecognised is refused
  // outright rather than silently dropped, so the customer never pays for a
  // basket that differs from the one they reviewed.
  const lineItems = [];
  for (const line of incoming) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) {
      return NextResponse.json(
        { error: 'unknown_product', message: 'One of the items is no longer available.' },
        { status: 400 },
      );
    }
    if (!product.inStock) {
      return NextResponse.json(
        { error: 'out_of_stock', message: `${product.name} is currently unavailable.` },
        { status: 409 },
      );
    }

    const quantity = Math.max(1, Math.min(MAX_QTY, Math.floor(Number(line.quantity) || 1)));

    // Engraving text is recorded against the line so it reaches the order,
    // but it never affects the amount charged.
    const engraving = [line.personalization?.name, line.personalization?.dates, line.personalization?.inscription]
      .filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
      .join(' · ');

    lineItems.push({
      quantity,
      price_data: {
        currency: BASE_CURRENCY.toLowerCase(),
        unit_amount: product.priceCents, // derived from cost x markup
        product_data: {
          name: product.name,
          description: [product.materialLabel, `${product.capacityCuIn} cu in`, engraving && `Engraving: ${engraving}`]
            .filter(Boolean)
            .join(' — ')
            .slice(0, 400),
          metadata: { sku: product.sku, productId: product.id, engraving: engraving.slice(0, 400) },
        },
      },
    });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || site.url;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: typeof body.email === 'string' && body.email.includes('@') ? body.email : undefined,
      success_url: `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'IE', 'AU', 'NZ'] },
      phone_number_collection: { enabled: false },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[checkout] Stripe session failed:', message);
    return NextResponse.json(
      { error: 'stripe_error', message: 'The payment provider could not start a checkout session.' },
      { status: 502 },
    );
  }
}
