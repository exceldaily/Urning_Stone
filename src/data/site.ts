/**
 * SITE CONFIGURATION
 * -------------------------------------------------------------------------
 * Single source of truth for brand identity, navigation, contact details and
 * every reassurance claim shown on the storefront.
 *
 * >> REPLACE BEFORE LAUNCH: brand name, domain, contact details, hours.
 * >> Nothing here should state a delivery, return or quality promise the
 *    business has not confirmed. Placeholders are marked TODO.
 */

export const site = {
  // TODO: replace with the final brand name and legal entity.
  // "Fern & Paw" is a WORKING NAME chosen to suit a pet memorial store.
  // Change it here and it changes everywhere — nothing hard-codes it.
  brandName: 'Fern & Paw',
  brandTagline: 'Memorials for the pets we loved',
  legalEntity: 'TODO: Registered company name',
  // TODO: replace with the production domain once it is registered (used for
  // canonical URLs + sitemap). Currently the Vercel deployment URL.
  url: 'https://urning-stone.vercel.app',
  locale: 'en_US',
  currency: 'USD',

  // Announcement bar. Factual tone only — this is not a delivery promise.
  announcement: 'Gently packaged, and someone here to help you choose.',

  contact: {
    email: 'TODO: care@yourdomain.com',
    phone: 'TODO: (000) 000-0000',
    hours: 'TODO: confirm support hours',
    address: 'TODO: business address',
  },

  social: [
    { label: 'Instagram', href: '#' }, // TODO: real profile URLs
    { label: 'Pinterest', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
};

export type NavChild = { label: string; href: string; note?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const primaryNav: NavItem[] = [
  {
    label: 'Shop Urns',
    href: '/collections/pet-memorial-urns',
    children: [
      { label: 'Urns for dogs', href: '/collections/dog-urns', note: 'Every size' },
      { label: 'Urns for cats', href: '/collections/cat-urns', note: 'From 15 cu in' },
      { label: 'Urns for small pets', href: '/collections/small-pet-urns', note: 'Rabbits, birds and others' },
      { label: 'Keepsakes', href: '/collections/keepsake-urns', note: 'A small portion' },
      { label: 'View everything', href: '/collections/pet-memorial-urns' },
    ],
  },
  {
    label: 'Shop by Style',
    href: '/collections',
    children: [
      { label: 'Sculpted and figurative', href: '/collections/sculpted-urns' },
      { label: 'Ceramic and porcelain', href: '/collections/ceramic-urns' },
      { label: 'Stainless steel', href: '/collections/steel-urns' },
      { label: 'Modern and minimal', href: '/collections/modern-urns' },
      { label: 'Biodegradable', href: '/collections/biodegradable-urns' },
      { label: 'Jewellery and keyrings', href: '/collections/memorial-jewelry' },
    ],
  },
  { label: 'Personalisation', href: '/personalization' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Our Story', href: '/about' },
  {
    label: 'Help',
    href: '/help/faq',
    children: [
      { label: 'Frequently asked questions', href: '/help/faq' },
      { label: 'Shipping and delivery', href: '/help/shipping' },
      { label: 'Returns and exchanges', href: '/help/returns' },
      { label: 'Personalisation guide', href: '/help/personalization-guide' },
      { label: 'Grief and pet loss resources', href: '/resources' },
      { label: 'Contact and support', href: '/help/contact' },
    ],
  },
];

export const footerNav = [
  {
    heading: 'Shop',
    links: [
      { label: 'All pet urns', href: '/collections/pet-memorial-urns' },
      { label: 'Urns for dogs', href: '/collections/dog-urns' },
      { label: 'Urns for cats', href: '/collections/cat-urns' },
      { label: 'Urns for small pets', href: '/collections/small-pet-urns' },
      { label: 'Keepsakes', href: '/collections/keepsake-urns' },
      { label: 'Jewellery and keyrings', href: '/collections/memorial-jewelry' },
    ],
  },
  {
    heading: 'Guidance',
    links: [
      { label: 'Size guide', href: '/size-guide' },
      { label: 'Personalisation', href: '/personalization' },
      { label: 'Find the right urn', href: '/urn-finder' },
      { label: 'Grief and pet loss resources', href: '/resources' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Shipping and delivery', href: '/help/shipping' },
      { label: 'Returns and exchanges', href: '/help/returns' },
      { label: 'Frequently asked questions', href: '/help/faq' },
      { label: 'Contact us', href: '/help/contact' },
      { label: 'Accessibility', href: '/help/accessibility' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our story', href: '/about' },
      { label: 'Privacy policy', href: '/help/privacy' },
      { label: 'Terms and conditions', href: '/help/terms' },
    ],
  },
];

/**
 * Reassurance row. Each item describes how we work rather than guaranteeing an
 * outcome. Review every line once real policies exist.
 */
export const trustPoints = [
  { title: 'Gentle packaging', body: 'Wrapped and boxed with care, in plain outer packaging with no branding on the outside.' },
  { title: 'Secure checkout', body: 'Card details are handled by the payment provider and never stored by us.' },
  { title: 'Checked before it ships', body: 'Every piece is inspected for finish, fit and closure before it leaves us.' },
  { title: 'Someone to talk to', body: 'If you would rather ask a person — including how to measure — we will help you work it out.' },
  { title: 'No rush, ever', body: 'Take as long as you need. Nothing here counts down at you or pretends to run out.' },
];
