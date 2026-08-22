# Linden & Stone — memorial urn storefront

A complete Next.js 15 storefront for memorial urns and keepsakes. Warm, quiet, and
built to help people make a decision they only make once.

**"Linden & Stone" is a working name.** Replace it in one place: `src/data/site.ts`.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build — currently 58 static pages
npm run start
```

No environment variables are required to run. Nothing calls an external service yet.

## Deploying to Vercel

The project is a stock Next.js App Router app, so Vercel needs no configuration:

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework preset: **Next.js**. Leave build command and output directory as detected.
4. Deploy.

Before the first real deploy, set `site.url` in `src/data/site.ts` to the live domain —
it is used for canonicals, Open Graph, `sitemap.xml`, and `robots.txt`.

---

## How it is organised

```
src/
  data/          Content and product data. Edit these, not the components.
    site.ts          Brand name, URL, contact details, navigation, trust points
    products.ts      Product type + the 18 placeholder products
    collections.ts   12 SEO landing collections + homepage guided paths
    finder.ts        Urn finder questions and the match-scoring function
    sizeGuide.ts     Capacity rule, caveat, size bands, capacity scale maximum
    faqs.ts          15 FAQs, grouped
    articles.ts      Journal articles
    testimonials.ts  Placeholder stories + hasVerifiedReviews flag
    pages.ts         Shipping, returns, privacy, terms, accessibility copy
  lib/           format.ts, filters.ts, seo.ts (JSON-LD), analytics.ts
  components/    layout / product / collection / finder / home / ui / store
  app/           Routes
```

**Product data is deliberately separate from UI.** Adding a product means adding an
object to `products.ts` — every card, filter, collection, comparison, finder result,
sitemap entry, and structured-data block picks it up automatically.

### The capacity scale

`src/components/ui/CapacityScale.tsx` draws one shared 0–440 cu in rule that appears on
product cards, product pages, the size guide, and the comparison tray. It exists so the
number people find hardest to judge becomes comparable at a glance. If you add a product
larger than 440 cu in, raise `CAPACITY_SCALE_MAX` in `src/data/sizeGuide.ts`.

### Images

There is no photography yet, so products render illustrated SVG placeholders
(`components/product/UrnImage.tsx`) labelled "Photography to follow", and the hero is a
drawn interior (`components/home/RoomScene.tsx`).

To switch to real photography: populate `images` and `lifestyleImages` on each product in
`products.ts` and replace the `UrnImage` usage with `next/image`. The placeholder label is
visible on purpose — it should never survive to a live store.

### Analytics

`src/lib/analytics.ts` defines 12 typed events (view_item, add_to_cart, begin_checkout,
finder_start, finder_complete, and so on). Events queue until the visitor consents via the
consent bar, then flush. `deliver()` is a stub — point it at your provider. No third-party
script loads before consent.

---

## What this site will not do

By design, and worth keeping that way:

- No countdown timers, fake stock counts, or invented urgency.
- No fabricated reviews. Testimonials are flagged `placeholder: true`, a visible notice sits
  beside them, and they are **excluded from Review structured data**. The notice disappears
  on its own once `hasVerifiedReviews` is true.
- No invented policies. Anything unconfirmed renders inside a visible dashed
  "to be confirmed" panel rather than as fake certainty.
- No aggressive upselling, no exit popups, no forced account creation.

---

## Before this can go live — needs your input

31 `TODO` comments mark these in the code.

**Business**
- Real brand name and domain (`src/data/site.ts`)
- Phone, email, hours, postal address
- Social profile URLs

**Products**
- Real products: names, descriptions, SKUs, prices, capacities in cubic inches,
  dimensions, weights, materials, closure type, care notes
- Photography, plus lifestyle shots
- Which items accept engraving, and the motif artwork library

**Policies** (`src/data/pages.ts`, `src/data/faqs.ts`)
- Processing and delivery times
- Shipping carriers, rates, and whether you ship internationally
- Returns window, and **whether engraved items are final sale**
- Damaged-in-transit process
- Privacy policy and terms of sale — have a lawyer write these

**Technical**
- Payment provider (checkout collects and validates details but does not charge)
- Order storage / fulfilment system
- Email platform for order confirmations and the newsletter
- Analytics provider for `deliver()` in `src/lib/analytics.ts`
- Verified review source
- An Open Graph image at `/public/og.jpg` (1200×630)

---

## Accessibility

Every text colour pair was checked against WCAG AA; the lowest is 4.81:1. Bronze and sage
are used for rules and icons only, never body text. Dialogs trap focus and restore it on
close, there is a skip link, all controls are keyboard reachable with visible focus rings,
tap targets are 44–48px, and `prefers-reduced-motion` disables entrance animations.

Re-run the contrast check after any palette change in `tailwind.config.ts`.
