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
    slug: 'memorial-urns-for-ashes',
    title: 'All memorial urns',
    heading: 'Memorial urns for ashes',
    intro: 'Every piece we carry, in one place. Filter by who you are remembering, by material, or by the amount of ashes an urn needs to hold.',
    footnote: 'If you are not sure where to begin, the urn size guide explains capacity in plain terms, and the urn finder narrows things down in five short questions.',
    seoTitle: 'Memorial urns for ashes',
    seoDescription: 'Adult, keepsake, companion and pet memorial urns in wood, ceramic, brass, stone and biodegradable materials, with capacity listed for every piece.',
    match: () => true,
  },
  {
    slug: 'adult-cremation-urns',
    title: 'Adult urns',
    heading: 'Adult cremation urns',
    intro: 'Urns sized to hold the full amount of ashes for one adult. As a general guide, look for capacity in cubic inches roughly equal to the person\u2019s healthy body weight in pounds.',
    seoTitle: 'Adult cremation urns',
    seoDescription: 'Full-size adult cremation urns with capacity listed in cubic inches, in wood, ceramic, brass, marble and glass.',
    match: (p) => p.category === 'adult' && p.capacityCuIn >= 150,
  },
  {
    slug: 'keepsake-urns',
    title: 'Keepsake urns',
    heading: 'Keepsake urns',
    intro: 'Small vessels that hold a portion of ashes. Families often choose several, so that more than one person has something to keep close.',
    seoTitle: 'Keepsake urns',
    seoDescription: 'Small keepsake urns holding a portion of ashes, in oak, ceramic and brass, with optional engraving.',
    match: (p) => p.category === 'keepsake',
  },
  {
    slug: 'companion-urns',
    title: 'Companion urns',
    heading: 'Companion urns',
    intro: 'Made to hold two people together, usually in separate compartments so each can be placed at a different time.',
    seoTitle: 'Companion urns for two',
    seoDescription: 'Companion cremation urns for two adults, with divided interiors and capacity listed in cubic inches.',
    match: (p) => p.category === 'companion',
  },
  {
    slug: 'pet-memorial-urns',
    title: 'Pet memorials',
    heading: 'Pet memorial urns',
    intro: 'Sized for cats, dogs and smaller companions, with the same materials and care as the rest of the collection.',
    seoTitle: 'Pet memorial urns',
    seoDescription: 'Wooden and ceramic pet urns with engraved plates, sized by weight for cats and dogs.',
    match: (p) => p.category === 'pet',
  },
  {
    slug: 'wooden-urns',
    title: 'Wooden urns',
    heading: 'Wooden urns',
    intro: 'Oak, walnut and ash, finished by hand. Wood warms a room in a way few other materials manage.',
    seoTitle: 'Wooden cremation urns',
    seoDescription: 'Solid oak, walnut and ash cremation urns with sealed closures and optional engraving.',
    match: (p) => p.material === 'wood',
  },
  {
    slug: 'ceramic-urns',
    title: 'Ceramic urns',
    heading: 'Ceramic urns',
    intro: 'Thrown and glazed stoneware. Small variations between pieces are part of how they are made.',
    seoTitle: 'Ceramic cremation urns',
    seoDescription: 'Handmade stoneware cremation urns with matte and satin glazes and gasket-sealed lids.',
    match: (p) => p.material === 'ceramic',
  },
  {
    slug: 'modern-urns',
    title: 'Modern and minimal',
    heading: 'Modern and minimal urns',
    intro: 'Plain geometry, quiet finishes, and nothing on the surface but the words you choose.',
    seoTitle: 'Modern minimalist cremation urns',
    seoDescription: 'Minimal cremation urns in walnut, steel and glass with clean geometry and optional engraving.',
    match: (p) => p.style === 'modern',
  },
  {
    slug: 'nature-inspired-urns',
    title: 'Nature-inspired',
    heading: 'Nature-inspired urns',
    intro: 'Motifs and materials drawn from outdoors, for someone who was happiest there.',
    seoTitle: 'Nature-inspired cremation urns',
    seoDescription: 'Cremation urns with botanical motifs and natural stone and ceramic finishes.',
    match: (p) => p.style === 'nature',
  },
  {
    slug: 'biodegradable-urns',
    title: 'Biodegradable urns',
    heading: 'Biodegradable urns',
    intro: 'Made to return to the earth or the water. Please check local rules for scattering or burial before you plan a date.',
    seoTitle: 'Biodegradable urns for burial and water',
    seoDescription: 'Plant fibre biodegradable urns for green burial and water release, with capacity listed in cubic inches.',
    match: (p) => p.material === 'biodegradable',
  },
  {
    slug: 'personalized-urns',
    title: 'Personalized urns',
    heading: 'Personalized urns',
    intro: 'Every piece here can carry a name, dates, a short inscription or a simple motif.',
    seoTitle: 'Personalized engraved cremation urns',
    seoDescription: 'Cremation urns that can be engraved with a name, dates, a short inscription or a motif.',
    match: (p) => p.personalization.available,
  },
  {
    slug: 'memorial-jewelry',
    title: 'Memorial jewelry',
    heading: 'Memorial jewelry',
    intro: 'Pendants that hold a very small portion of ashes, made to be worn rather than displayed.',
    seoTitle: 'Cremation jewelry and ash pendants',
    seoDescription: 'Sterling silver cremation pendants that hold a small portion of ashes, supplied with a chain and funnel.',
    match: (p) => p.category === 'jewelry',
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/** The four entry points shown in the guided shopping section on the homepage. */
export const guidedPaths = [
  { label: 'Urns for an adult', body: 'Holds the full amount of ashes for one person.', href: '/collections/adult-cremation-urns' },
  { label: 'Keepsake urns', body: 'A small portion, often shared between family.', href: '/collections/keepsake-urns' },
  { label: 'Companion urns', body: 'For two people, kept together in one piece.', href: '/collections/companion-urns' },
  { label: 'Pet memorials', body: 'Sized by weight, for cats, dogs and smaller companions.', href: '/collections/pet-memorial-urns' },
];
