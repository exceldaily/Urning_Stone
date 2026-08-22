/**
 * STRIPE CLIENT
 * -------------------------------------------------------------------------
 * Server-only. Never import this into a client component — it would leak the
 * secret key into the browser bundle.
 *
 * Required environment variables (set these in Vercel → Project → Settings →
 * Environment Variables, never in the repository):
 *
 *   STRIPE_SECRET_KEY        sk_test_... while testing, sk_live_... when live
 *   NEXT_PUBLIC_SITE_URL     used to build success/cancel URLs (optional —
 *                            falls back to site.url)
 *
 * The storefront runs perfectly well without them: checkout simply reports
 * that payments are not configured yet rather than pretending to charge.
 */
import Stripe from 'stripe';

export const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

let client: Stripe | null = null;

/** Returns null when no key is configured, so callers can degrade gracefully. */
export function getStripe(): Stripe | null {
  if (!stripeConfigured) return null;
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  return client;
}
