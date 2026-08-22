/**
 * COLLECTIONS
 * Each entry is both a navigable landing page and an SEO target. `match`
 * narrows the catalogue; nothing here is hard-coded into components.
 */
import type { Product } from './products';

export interface Collection {
  slug: string;
  title: string;
  heading: string;
  intro: string;
  /** Longer supporting copy shown beneath the grid for search context. */
  footnote?: string;
  seoTitle: string;
  seoDescription: string;
  match: (p: Product) => boolean;
}

export const collections: Collection[] = [
  {
    slug: 'pet-memorial-urns',
    title: 'All pet urns',
    heading: 'Pet memorial urns',
    intro: 'Every piece we carry, in one place. Filter by the animal you are remembering, by material, or by the amount of ashes an urn needs to hold.',
    footnote: 'If you are not sure where to begin, the size guide explains capacity in plain terms, and the urn finder narrows things down in a few short questions.',
    seoTitle: 'Pet memorial urns',
    seoDescription: 'Urns and keepsakes for dogs, cats and small pets in ceramic, porcelain, steel, resin and biodegradable materials, with capacity listed for every piece.',
    match: () => true,
  },
  {
    slug: 'dog-urns',
    title: 'Dog urns',
    heading: 'Urns for dogs',
    intro: 'Sized for dogs from the very small to the very large. As a general guide, look for capacity in cubic inches roughly equal to their healthy weight in pounds.',
    seoTitle: 'Dog urns and memorials',
    seoDescription: 'Memorial urns for dog ashes in ceramic, steel, wood and resin, with capacity in cubic inches listed for every piece.',
    match: (p) => p.petTypes.includes('dog'),
  },
  {
    slug: 'cat-urns',
    title: 'Cat urns',
    heading: 'Urns for cats',
    intro: 'Smaller vessels, sized for cats and kittens. Most cats are comfortably held by an urn of 25 to 45 cubic inches.',
    seoTitle: 'Cat urns and memorials',
    seoDescription: 'Memorial urns for cat ashes in ceramic, porcelain, steel and resin, sized from 15 cubic inches upward.',
    match: (p) => p.petTypes.includes('cat'),
  },
  {
    slug: 'small-pet-urns',
    title: 'Small pet urns',
    heading: 'Urns for small pets',
    intro: 'For rabbits, guinea pigs, ferrets, birds and the other small animals who take up far more room in a household than their size suggests.',
    seoTitle: 'Small pet urns',
    seoDescription: 'Small memorial urns and keepsakes for rabbits, guinea pigs, birds and other small pets.',
    match: (p) => p.petTypes.includes('small'),
  },
  {
    slug: 'keepsake-urns',
    title: 'Keepsakes',
    heading: 'Keepsake urns',
    intro: 'Small pieces holding a portion rather than all of the ashes — for when a pet belonged to more than one household, or when you want to keep a little of them close and the rest somewhere else.',
    seoTitle: 'Pet keepsake urns',
    seoDescription: 'Small keepsake urns holding a portion of a pet’s ashes, for sharing between family members.',
    match: (p) => p.category === 'keepsake' || (p.capacityCuIn > 0.5 && p.capacityCuIn <= 20),
  },
  {
    slug: 'memorial-jewelry',
    title: 'Jewellery and keyrings',
    heading: 'Memorial jewellery and keyrings',
    intro: 'Sealed pieces holding a pinch of ashes, made to be carried every day. Each arrives with a small funnel and plain instructions for filling it yourself, at your own pace.',
    seoTitle: 'Pet memorial jewellery and keyrings',
    seoDescription: 'Waterproof stainless steel pet ashes keyrings and memorial jewellery, supplied with a filling funnel.',
    match: (p) => p.category === 'jewelry',
  },
  {
    slug: 'ceramic-urns',
    title: 'Ceramic urns',
    heading: 'Ceramic and porcelain pet urns',
    intro: 'Glazed by hand, so the colour moves a little across the surface and no two are identical. The most home-like of the materials we carry.',
    seoTitle: 'Ceramic pet urns',
    seoDescription: 'Hand-glazed ceramic and porcelain pet urns in cream, sage, white and rosewater finishes.',
    match: (p) => p.material === 'ceramic' || p.material === 'porcelain',
  },
  {
    slug: 'steel-urns',
    title: 'Steel urns',
    heading: 'Stainless steel pet urns',
    intro: 'Sealed, solid and hard to damage. The right answer if the urn will be moved, travelled with, or kept somewhere it might be knocked.',
    seoTitle: 'Stainless steel pet urns',
    seoDescription: 'Brushed and matte stainless steel pet urns with sealed threaded lids, in a range of capacities.',
    match: (p) => p.material === 'steel',
  },
  {
    slug: 'sculpted-urns',
    title: 'Sculpted urns',
    heading: 'Sculpted and figurative urns',
    intro: 'Pieces shaped as the animal themselves, or as something that stood for them. For families who would rather the memorial looked like a sculpture than a container.',
    seoTitle: 'Sculpted pet urns',
    seoDescription: 'Figurative pet urns shaped as sleeping dogs, seated cats, bones and guardian figures.',
    match: (p) => p.style === 'sculptural',
  },
  {
    slug: 'biodegradable-urns',
    title: 'Biodegradable urns',
    heading: 'Biodegradable pet urns',
    intro: 'Made to be buried, where they break down into the soil around them. For a garden they loved, or a tree planted over them.',
    seoTitle: 'Biodegradable pet urns',
    seoDescription: 'Compressed plant-fibre biodegradable pet urns for burial and tree planting.',
    match: (p) => p.material === 'biodegradable',
  },
  {
    slug: 'personalized-urns',
    title: 'Personalised urns',
    heading: 'Personalised pet urns',
    intro: 'Every piece here can carry their name. Most can also take dates, a short line, or a paw print.',
    seoTitle: 'Personalised pet urns',
    seoDescription: 'Pet urns that can be engraved with a name, dates, a short inscription or a paw print.',
    match: (p) => p.personalization.available,
  },
  {
    slug: 'modern-urns',
    title: 'Modern and minimal',
    heading: 'Modern pet urns',
    intro: 'Plain forms and quiet finishes, for a home where an ornate piece would sit awkwardly.',
    seoTitle: 'Modern pet urns',
    seoDescription: 'Minimal, modern pet urns in steel and ceramic, without ornament.',
    match: (p) => p.style === 'modern',
  },
];

/** Guided entry points shown on the homepage. */
export const guidedPaths = [
  { label: 'For a dog', href: '/collections/dog-urns', body: 'Every size, from the smallest terrier to a wolfhound. Capacity is listed on every piece so you can match it to their weight.' },
  { label: 'For a cat', href: '/collections/cat-urns', body: 'Smaller vessels from 15 cubic inches up, including sculpted pieces and quiet ones that read as pottery.' },
  { label: 'For a small pet', href: '/collections/small-pet-urns', body: 'Rabbits, guinea pigs, ferrets and birds — small animals who took up far more room than their size suggests.' },
  { label: 'Something to carry', href: '/collections/memorial-jewelry', body: 'Sealed keyrings and jewellery holding a pinch of ashes, for keeping them with you rather than on a shelf.' },
];

export const getCollection = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);
