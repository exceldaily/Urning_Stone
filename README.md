# Fern & Paw — pet memorial storefront

A complete Next.js 15 storefront for pet urns and keepsakes. Warm, quiet, and built
to help people make a decision they only make once.

**"Fern & Paw" is a working name.** Replace it in one place: `src/data/site.ts`.

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

## Pricing — read this before taking an order

Retail price is **derived, never authored**:

```
retail = costCents x MARKUP_MULTIPLIER      # src/data/pricing.ts
```

`MARKUP_MULTIPLIER` is currently `2` — a 100% markup, i.e. a 50% gross margin.
Change it in one place and every price moves with it: cards, filters, cart,
structured data, and Stripe.

> **Every `costCents` in `src/data/products.ts` is a placeholder, and every
> product is flagged `costVerified: false`.**
>
> The supplier listings (recorded per product as `sourceUrl`) were not reachable
> from the environment this catalogue was built in, so no real supplier price,
> MOQ or specification was available. Nothing was invented to look
> authoritative. Products with an unverified cost show a visible "indicative
> price" notice on their page, and `scripts/sync-stripe.mjs` refuses to run
> against a live Stripe key while any remain.
>
> **To go live:** fill in the costs. There is a spreadsheet workflow for this:
>
> ```bash
> npm run catalogue:template          # writes catalogue.csv, one row per product
> # fill in the cost_usd column, set verified to yes on real quotes
> npm run catalogue:import            # dry run — shows cost, derived retail, warnings
> npm run catalogue:import -- --apply # writes src/data/supplierCosts.ts
> ```
>
> Costs land in `src/data/supplierCosts.ts` (generated, keyed by SKU) and
> override the placeholders in `products.ts`. Products you have not quoted yet
> keep their placeholder and their notice, so you can do this a few at a time.
>
> Corrected capacities or dimensions in the CSV are **reported, not applied** —
> those are authored content, and silently rewriting a catalogue from a
> spreadsheet is how catalogues rot. Edit `products.ts` for those.

## Currency

Prices are stored once, in USD minor units, and converted for display only.
The visitor's currency is guessed from their browser locale and overridable
from the header switcher, which states the exact rate applied, whether it is
live, and that settlement happens in USD.

Rates refresh hourly from `EXCHANGE_RATES_API_URL` (any feed returning
`{ rates: { CODE: number } }` quoted against USD). Without it, the static table
in `src/data/currencies.ts` is used and is labelled *indicative* in the UI.

Add or remove currencies in `src/data/currencies.ts`.

## Payments (Stripe)

Checkout hands off to Stripe's hosted page — **no card details are entered on
this site.**

```bash
STRIPE_SECRET_KEY=sk_test_...        # required to take payments
NEXT_PUBLIC_SITE_URL=https://...     # optional; falls back to site.url
```

Set these in Vercel → Project → Settings → Environment Variables. Never commit
them. Without `STRIPE_SECRET_KEY` the checkout route replies 503 and the UI says
payments are not connected, rather than faking a completed order.

**The browser never sends prices.** `/api/checkout` receives product ids and
quantities only, then rebuilds and reprices every line from `products.ts`. A
tampered basket cannot change what is charged.

The confirmation page verifies the Checkout Session before confirming anything,
and only clears the basket on a verified payment — so a cancelled or failed
checkout returns the customer to an intact basket.

### Syncing the catalogue into Stripe

```bash
export STRIPE_SECRET_KEY=sk_test_...
npm run stripe:sync              # dry run — prints what would change
npm run stripe:sync -- --apply   # write to Stripe
```

Products are matched on the `sku` metadata field, so re-running updates in place
rather than creating duplicates. Stripe Prices are immutable, so a changed
amount creates a new Price, sets it as the product default, and deactivates the
old one.

Still to add before this is a real shop: a **webhook** (`checkout.session.completed`)
to record orders and trigger fulfilment, plus order storage. The confirmation
page verifies the session on read, which is correct for showing the customer
their status, but it is not a substitute for a webhook.

## How it is organised

```
src/
  data/          Content and product data. Edit these, not the components.
    site.ts          Brand name, URL, contact details, navigation, trust points
    pricing.ts       Markup multiplier — retail is derived from supplier cost
    currencies.ts    Supported currencies + fallback rates
    products.ts      Product type + the 15 products (placeholder costs)
    collections.ts   12 SEO landing collections + homepage guided paths
    finder.ts        Finder questions (by animal) and the match-scoring function
    sizeGuide.ts     Weight-to-capacity rule, size bands by animal, scale maximum
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
sitemap entry, structured-data block and Stripe record picks it up automatically.

### The capacity scale

`src/components/ui/CapacityScale.tsx` draws one shared 0–140 cu in rule that appears on
product cards, product pages, the size guide, and the comparison tray. It exists so the
number people find hardest to judge becomes comparable at a glance. If you add a product
larger than 140 cu in, raise `CAPACITY_SCALE_MAX` in `src/data/sizeGuide.ts`.

### Images

There is no photography yet, so products render illustrated SVG placeholders
(`components/product/UrnImage.tsx`) labelled "Photography to follow", and the hero is a
drawn interior (`components/home/RoomScene.tsx`).

To switch to real photography: populate `images` and `lifestyleImages` on each product in
`products.ts` and replace the `UrnImage` usage with `next/image`. The placeholder label is
visible on purpose — it should never survive to a live store.

**Supplier photography is the supplier's copyright.** Listing images on a wholesale
marketplace are not licensed for use on your own storefront by default. Get written
permission, or shoot your own. This is the single most common way a new dropshipping
store gets a takedown notice.

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
- No invented supplier prices. Unverified costs are flagged in the UI and block a live
  Stripe sync.
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

**Products** — the blocking one
- **Real supplier costs** for all 15 products (`costCents` + `costVerified: true`).
  Everything else about pricing is already wired; this is the missing input.
- Confirm capacities, dimensions, weights, materials and MOQs against the
  supplier listings recorded in each product's `sourceUrl`
- Photography, plus lifestyle shots — and the rights to use it
- Which items accept engraving, and the motif artwork library

**Policies** (`src/data/pages.ts`, `src/data/faqs.ts`)
- Processing and delivery times
- Shipping carriers, rates, and whether you ship internationally
- Returns window, and **whether engraved items are final sale**
- Damaged-in-transit process
- Privacy policy and terms of sale — have a lawyer write these

**Technical**
- `STRIPE_SECRET_KEY` in the deployment environment, then `npm run stripe:sync -- --apply`
- A Stripe webhook on `checkout.session.completed`, plus order storage / fulfilment
- `EXCHANGE_RATES_API_URL` for live currency rates (optional — falls back to
  indicative rates, labelled as such)
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
