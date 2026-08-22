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
  brandName: 'Linden & Stone',
  brandTagline: 'Memorial urns and keepsakes',
  legalEntity: 'TODO: Registered company name',
  // TODO: replace with the production domain once it is registered (used for
  // canonical URLs + sitemap). Currently the Vercel deployment URL.
  url: 'https://urning-stone.vercel.app',
  locale: 'en_US',
  currency: 'USD',

  // Announcement bar. Factual tone only — this is not a delivery promise.
  announcement: 'Compassionate support and carefully packaged delivery.',

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
    href: '/collections/memorial-urns-for-ashes',
    children: [
      { label: 'Adult cremation urns', href: '/collections/adult-cremation-urns', note: 'Holds all ashes' },
      { label: 'Keepsake urns', href: '/collections/keepsake-urns', note: 'A small portion' },
      { label: 'Companion urns', href: '/collections/companion-urns', note: 'For two people' },
      { label: 'Pet memorial urns', href: '/collections/pet-memorial-urns', note: 'All sizes' },
      { label: 'View everything', href: '/collections/memorial-urns-for-ashes' },
    ],
  },
  {
    label: 'Shop by Style',
    href: '/collections',
    children: [
      { label: 'Wooden urns', href: '/collections/wooden-urns' },
      { label: 'Ceramic urns', href: '/collections/ceramic-urns' },
      { label: 'Modern and minimal', href: '/collections/modern-urns' },
      { label: 'Nature-inspired', href: '/collections/nature-inspired-urns' },
      { label: 'Biodegradable urns', href: '/collections/biodegradable-urns' },
      { label: 'Memorial jewelry', href: '/collections/memorial-jewelry' },
    ],
  },
  { label: 'Personalization', href: '/personalization' },
  { label: 'Urn Size Guide', href: '/size-guide' },
  { label: 'Our Story', href: '/about' },
  {
    label: 'Help',
    href: '/help/faq',
    children: [
      { label: 'Frequently asked questions', href: '/help/faq' },
      { label: 'Shipping and delivery', href: '/help/shipping' },
      { label: 'Returns and exchanges', href: '/help/returns' },
      { label: 'Personalization guide', href: '/help/personalization-guide' },
      { label: 'Memorial planning resources', href: '/resources' },
      { label: 'Contact and support', href: '/help/contact' },
    ],
  },
];

export const footerNav = [
  {
    heading: 'Shop',
    links: [
      { label: 'All memorial urns', href: '/collections/memorial-urns-for-ashes' },
      { label: 'Adult urns', href: '/collections/adult-cremation-urns' },
      { label: 'Keepsake urns', href: '/collections/keepsake-urns' },
      { label: 'Companion urns', href: '/collections/companion-urns' },
      { label: 'Pet memorials', href: '/collections/pet-memorial-urns' },
      { label: 'Memorial jewelry', href: '/collections/memorial-jewelry' },
    ],
  },
  {
    heading: 'Guidance',
    links: [
      { label: 'Urn size guide', href: '/size-guide' },
      { label: 'Personalization', href: '/personalization' },
      { label: 'Find the right urn', href: '/urn-finder' },
      { label: 'Memorial planning resources', href: '/resources' },
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
  { title: 'Respectful packaging', body: 'Every piece is wrapped and boxed with care, in plain outer packaging.' },
  { title: 'Secure checkout', body: 'Card details are handled by the payment provider and never stored by us.' },
  { title: 'Checked before it ships', body: 'Each urn is inspected for finish, fit and closure before it leaves us.' },
  { title: 'Someone to talk to', body: 'If you would rather ask a person, we will help you work it out.' },
  { title: 'Clear delivery and returns', body: 'Timeframes and conditions are written plainly before you order.' },
];
