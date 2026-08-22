/**
 * CUSTOMER STORIES — PLACEHOLDER CONTENT
 * -------------------------------------------------------------------------
 * !! NONE OF THESE ARE REAL CUSTOMERS. !!
 * Every entry has `placeholder: true` and the UI renders a visible notice
 * saying so. Do not remove that notice while these entries are in place.
 *
 * To connect real reviews later:
 *   1. Replace this array with verified review data (or fetch it from the
 *      review provider inside `getTestimonials()`).
 *   2. Set `placeholder: false` on verified entries.
 *   3. `verifiedSource` should name the provider so the badge can display it.
 *   4. Only then may Review/AggregateRating structured data be emitted — see
 *      src/lib/seo.ts, where it is intentionally disabled.
 */

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  context: string;
  placeholder: boolean;
  verifiedSource?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Sample text standing in for a real customer story. Replace this once verified reviews are available.',
    attribution: 'Placeholder attribution',
    context: 'Placeholder — urn for a dog',
    placeholder: true,
  },
  {
    id: 't-2',
    quote: 'Sample text standing in for a real customer story. Replace this once verified reviews are available.',
    attribution: 'Placeholder attribution',
    context: 'Placeholder — keepsakes shared in a family',
    placeholder: true,
  },
  {
    id: 't-3',
    quote: 'Sample text standing in for a real customer story. Replace this once verified reviews are available.',
    attribution: 'Placeholder attribution',
    context: 'Placeholder — urn for a cat',
    placeholder: true,
  },
];

export const hasVerifiedReviews = testimonials.some((t) => !t.placeholder);
