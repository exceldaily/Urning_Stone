/**
 * ANALYTICS
 * -------------------------------------------------------------------------
 * A thin, provider-agnostic event layer. No third-party script is loaded here
 * and nothing leaves the browser until consent is granted.
 *
 * >> TO CONNECT A PROVIDER: implement `deliver()` below (GA4, Plausible,
 *    Fathom, a server endpoint — whatever you choose) and load its script only
 *    after `hasConsent()` returns true.
 * >> Do not add pixels or session recorders here without a consent gate.
 */

export type AnalyticsEvent =
  | 'urn_finder_started'
  | 'urn_finder_completed'
  | 'product_viewed'
  | 'size_guide_opened'
  | 'personalization_started'
  | 'personalization_completed'
  | 'product_saved'
  | 'product_compared'
  | 'add_to_cart'
  | 'checkout_started'
  | 'purchase_completed'
  | 'support_requested';

const CONSENT_KEY = 'ls.analytics.consent';
const queue: { event: AnalyticsEvent; payload: Record<string, unknown>; at: number }[] = [];

export function hasConsent() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(CONSENT_KEY) === 'granted';
}

export function setConsent(granted: boolean) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
  if (granted) flush();
  else queue.length = 0;
}

export function consentAnswered() {
  if (typeof window === 'undefined') return true;
  return window.localStorage.getItem(CONSENT_KEY) !== null;
}

/** Replace this with a real transport once a provider is chosen. */
function deliver(event: AnalyticsEvent, payload: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload);
  }
  // TODO: forward to the chosen analytics provider here.
}

function flush() {
  while (queue.length) {
    const item = queue.shift();
    if (item) deliver(item.event, item.payload);
  }
}

export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (!hasConsent()) {
    queue.push({ event, payload, at: Date.now() });
    if (queue.length > 50) queue.shift();
    return;
  }
  deliver(event, payload);
}
