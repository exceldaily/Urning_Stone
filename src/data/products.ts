/**
 * PRODUCT DATA
 * -------------------------------------------------------------------------
 * Placeholder catalogue. The UI never hard-codes product facts, so this file
 * can be replaced by a CMS/commerce API response of the same shape without
 * touching any component.
 *
 * >> REPLACE BEFORE LAUNCH: every product below is illustrative. Prices,
 *    capacities, dimensions and materials must come from the real supplier.
 * >> IMAGES: `images` and `lifestyleImages` are empty. Until real photography
 *    exists, <UrnImage /> renders a neutral illustrative placeholder driven by
 *    `art`. Populate the arrays with /public paths and the components will use
 *    them automatically.
 */

export type CategoryId = 'adult' | 'keepsake' | 'companion' | 'pet' | 'jewelry';
export type StyleId = 'traditional' | 'modern' | 'wood' | 'ceramic' | 'nature' | 'biodegradable' | 'jewelry';
export type MaterialId = 'wood' | 'ceramic' | 'brass' | 'stone' | 'glass' | 'biodegradable' | 'sterling' | 'steel';
export type ColorId = 'natural' | 'cream' | 'sage' | 'charcoal' | 'bronze' | 'stone' | 'rose';
export type UrnForm = 'vase' | 'cube' | 'cylinder' | 'dome' | 'chest' | 'teardrop' | 'pendant' | 'seed';

export type PersonalizationFieldId = 'name' | 'dates' | 'inscription' | 'motif' | 'photo';

export type ProductImage = { src: string; alt: string; kind: 'product' | 'detail' | 'lifestyle' };

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: CategoryId;
  intendedUse: string;
  material: MaterialId;
  materialLabel: string;
  color: ColorId;
  colorLabel: string;
  style: StyleId;
  /** Interior capacity in cubic inches. */
  capacityCuIn: number;
  /** General planning guidance only — approx. 1 cu in per 1 lb of body weight. */
  suitableUpToLb: number | null;
  dimensions: { height: number; width: number; depth: number; unit: 'in' };
  weightLb: number;
  /** Price in minor units (cents) to avoid float rounding. */
  priceCents: number;
  images: ProductImage[];
  lifestyleImages: ProductImage[];
  /** Drives the placeholder illustration until photography is supplied. */
  art: { form: UrnForm; tone: ColorId };
  inStock: boolean;
  stockNote?: string;
  personalization: { available: boolean; fields: PersonalizationFieldId[]; finalSale: boolean | null };
  closure: string;
  care: string;
  processingTime: string;
  shipping: { shipWeightLb: number; fragile: boolean; boxNote: string };
  featured: boolean;
  /** Used only for the "popularity" sort. Replace with real order counts. */
  popularityRank: number;
  createdAt: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

const base = {
  images: [] as ProductImage[],
  lifestyleImages: [] as ProductImage[],
  inStock: true,
  // TODO: confirm real lead times with the supplier before launch.
  processingTime: 'TODO: confirm — currently shown as an estimate',
  care: 'Dust with a soft, dry cloth. Avoid household cleaners and direct, prolonged sunlight.',
};

export const products: Product[] = [
  {
    ...base, id: 'p-001', sku: 'LS-ADT-OAK-200', name: 'Linden Oak Vessel', slug: 'linden-oak-vessel',
    category: 'adult', intendedUse: 'Holds the full amount of ashes for one adult',
    material: 'wood', materialLabel: 'Solid white oak', color: 'natural', colorLabel: 'Natural oak', style: 'wood',
    capacityCuIn: 210, suitableUpToLb: 200,
    dimensions: { height: 10.2, width: 6.5, depth: 6.5, unit: 'in' }, weightLb: 4.4, priceCents: 34500,
    art: { form: 'vase', tone: 'natural' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription', 'motif'], finalSale: null },
    closure: 'Threaded base plate with a felt seal',
    shipping: { shipWeightLb: 6.5, fragile: false, boxNote: 'Double-boxed, plain outer carton' },
    featured: true, popularityRank: 3, createdAt: '2025-11-02',
    description: 'Turned from a single piece of white oak, with a grain that shifts quietly as the light moves across it. Made to sit comfortably on a shelf among the things you already keep.',
    seoTitle: 'Linden Oak Vessel — solid wood adult cremation urn',
    seoDescription: 'A turned white oak cremation urn with 210 cubic inches of capacity, a threaded base and optional engraving.',
  },
  {
    ...base, id: 'p-002', sku: 'LS-ADT-CER-205', name: 'Fieldstone Ceramic Urn', slug: 'fieldstone-ceramic-urn',
    category: 'adult', intendedUse: 'Holds the full amount of ashes for one adult',
    material: 'ceramic', materialLabel: 'Stoneware with a matte glaze', color: 'stone', colorLabel: 'Warm stone', style: 'ceramic',
    capacityCuIn: 205, suitableUpToLb: 195,
    dimensions: { height: 9.8, width: 7, depth: 7, unit: 'in' }, weightLb: 6.1, priceCents: 29800,
    art: { form: 'dome', tone: 'stone' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Fitted lid with a recessed silicone gasket',
    shipping: { shipWeightLb: 9, fragile: true, boxNote: 'Foam-cradled, double-boxed' },
    featured: true, popularityRank: 1, createdAt: '2025-12-14',
    description: 'Thrown stoneware with a soft matte glaze that catches the light the way a favourite bowl does. Each piece varies slightly, which is rather the point.',
    seoTitle: 'Fieldstone Ceramic Urn — handmade stoneware cremation urn',
    seoDescription: 'A matte-glazed stoneware cremation urn holding 205 cubic inches, with a gasket-sealed lid and optional engraving.',
  },
  {
    ...base, id: 'p-003', sku: 'LS-ADT-BRZ-200', name: 'Quiet Hours Bronze', slug: 'quiet-hours-bronze',
    category: 'adult', intendedUse: 'Holds the full amount of ashes for one adult',
    material: 'brass', materialLabel: 'Brushed solid brass', color: 'bronze', colorLabel: 'Antique bronze', style: 'traditional',
    capacityCuIn: 200, suitableUpToLb: 190,
    dimensions: { height: 10, width: 6.2, depth: 6.2, unit: 'in' }, weightLb: 7.2, priceCents: 41000,
    art: { form: 'vase', tone: 'bronze' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription', 'motif'], finalSale: null },
    closure: 'Threaded lid',
    shipping: { shipWeightLb: 10, fragile: false, boxNote: 'Cloth bag inside a fitted carton' },
    featured: false, popularityRank: 6, createdAt: '2025-09-20',
    description: 'A traditional silhouette in brushed brass, warmed rather than polished, so it reads as an heirloom rather than an ornament.',
    seoTitle: 'Quiet Hours Bronze — brass adult cremation urn',
    seoDescription: 'A brushed brass cremation urn with 200 cubic inches of capacity and a threaded lid. Engraving available.',
  },
  {
    ...base, id: 'p-004', sku: 'LS-ADT-MOD-210', name: 'Still Cube in Walnut', slug: 'still-cube-in-walnut',
    category: 'adult', intendedUse: 'Holds the full amount of ashes for one adult',
    material: 'wood', materialLabel: 'American walnut', color: 'charcoal', colorLabel: 'Deep walnut', style: 'modern',
    capacityCuIn: 215, suitableUpToLb: 205,
    dimensions: { height: 7.5, width: 7.5, depth: 7.5, unit: 'in' }, weightLb: 5.2, priceCents: 36500,
    art: { form: 'cube', tone: 'charcoal' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription'], finalSale: null },
    closure: 'Sliding base panel with concealed magnets',
    shipping: { shipWeightLb: 7.5, fragile: false, boxNote: 'Double-boxed, plain outer carton' },
    featured: true, popularityRank: 4, createdAt: '2026-01-08',
    description: 'Square, low and unhurried. The walnut darkens gently over the years, which many families come to like.',
    seoTitle: 'Still Cube in Walnut — modern wooden cremation urn',
    seoDescription: 'A minimal walnut cremation urn holding 215 cubic inches, with a magnetic base panel and optional engraving.',
  },
  {
    ...base, id: 'p-005', sku: 'LS-ADT-XL-320', name: 'Broadleaf Extra-Large Urn', slug: 'broadleaf-extra-large-urn',
    category: 'adult', intendedUse: 'Extra capacity for a larger adult',
    material: 'wood', materialLabel: 'Solid ash with a soft wax finish', color: 'natural', colorLabel: 'Pale ash', style: 'wood',
    capacityCuIn: 320, suitableUpToLb: 300,
    dimensions: { height: 11.4, width: 8, depth: 8, unit: 'in' }, weightLb: 6.8, priceCents: 39500,
    art: { form: 'chest', tone: 'natural' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription', 'motif'], finalSale: null },
    closure: 'Threaded base plate with a felt seal',
    shipping: { shipWeightLb: 9.5, fragile: false, boxNote: 'Double-boxed, plain outer carton' },
    featured: false, popularityRank: 9, createdAt: '2025-10-11',
    description: 'The same calm proportions as our standard vessels, with room to spare. A sensible choice when you would rather not measure twice.',
    seoTitle: 'Broadleaf Extra-Large Urn — 320 cubic inch wooden urn',
    seoDescription: 'An extra-large ash wood cremation urn with 320 cubic inches of capacity for larger adults.',
  },
  {
    ...base, id: 'p-006', sku: 'LS-CMP-OAK-420', name: 'Two Chairs Companion Urn', slug: 'two-chairs-companion-urn',
    category: 'companion', intendedUse: 'Holds the ashes of two adults together',
    material: 'wood', materialLabel: 'Solid white oak', color: 'natural', colorLabel: 'Natural oak', style: 'traditional',
    capacityCuIn: 420, suitableUpToLb: 400,
    dimensions: { height: 10.5, width: 12.4, depth: 7.2, unit: 'in' }, weightLb: 9.4, priceCents: 58000,
    art: { form: 'chest', tone: 'natural' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription', 'motif'], finalSale: null },
    closure: 'Divided interior with two sealed compartments and a lift-off lid',
    shipping: { shipWeightLb: 13, fragile: false, boxNote: 'Double-boxed, plain outer carton' },
    featured: true, popularityRank: 7, createdAt: '2025-08-30',
    description: 'Two separate compartments inside one piece, so a pair who shared a life can stay together. Often chosen years apart, and made to be opened again gently.',
    seoTitle: 'Two Chairs Companion Urn — double compartment wooden urn',
    seoDescription: 'A companion cremation urn for two adults with 420 cubic inches divided across two sealed compartments.',
  },
  {
    ...base, id: 'p-007', sku: 'LS-CMP-CER-400', name: 'Harbour Companion Vessel', slug: 'harbour-companion-vessel',
    category: 'companion', intendedUse: 'Holds the ashes of two adults together',
    material: 'ceramic', materialLabel: 'Glazed stoneware', color: 'sage', colorLabel: 'Soft sage', style: 'ceramic',
    capacityCuIn: 400, suitableUpToLb: 380,
    dimensions: { height: 11.8, width: 9.5, depth: 9.5, unit: 'in' }, weightLb: 11.2, priceCents: 62000,
    art: { form: 'dome', tone: 'sage' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Fitted lid with a recessed silicone gasket',
    shipping: { shipWeightLb: 15, fragile: true, boxNote: 'Foam-cradled, double-boxed' },
    featured: false, popularityRank: 12, createdAt: '2026-02-02',
    description: 'A generous stoneware form in a quiet sage glaze. Wide enough to hold two, calm enough to live on a mantel.',
    seoTitle: 'Harbour Companion Vessel — ceramic companion urn',
    seoDescription: 'A sage-glazed stoneware companion urn holding 400 cubic inches for two adults.',
  },
  {
    ...base, id: 'p-008', sku: 'LS-KPS-OAK-020', name: 'Palm Keepsake in Oak', slug: 'palm-keepsake-in-oak',
    category: 'keepsake', intendedUse: 'Holds a small portion of ashes',
    material: 'wood', materialLabel: 'Solid white oak', color: 'natural', colorLabel: 'Natural oak', style: 'wood',
    capacityCuIn: 3, suitableUpToLb: null,
    dimensions: { height: 2.6, width: 2, depth: 2, unit: 'in' }, weightLb: 0.4, priceCents: 6800,
    art: { form: 'cylinder', tone: 'natural' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Threaded base with a silicone ring',
    shipping: { shipWeightLb: 1, fragile: false, boxNote: 'Cotton pouch inside a small carton' },
    featured: true, popularityRank: 2, createdAt: '2026-01-22',
    description: 'Small enough to close your hand around. Families often order several so everyone has something to hold on to.',
    seoTitle: 'Palm Keepsake in Oak — small wooden keepsake urn',
    seoDescription: 'A 3 cubic inch oak keepsake urn for a small portion of ashes, with optional name and date engraving.',
  },
  {
    ...base, id: 'p-009', sku: 'LS-KPS-CER-025', name: 'Hollow Keepsake, Cream Glaze', slug: 'hollow-keepsake-cream-glaze',
    category: 'keepsake', intendedUse: 'Holds a small portion of ashes',
    material: 'ceramic', materialLabel: 'Stoneware with a cream glaze', color: 'cream', colorLabel: 'Cream', style: 'ceramic',
    capacityCuIn: 4, suitableUpToLb: null,
    dimensions: { height: 3, width: 2.4, depth: 2.4, unit: 'in' }, weightLb: 0.6, priceCents: 7400,
    art: { form: 'dome', tone: 'cream' },
    personalization: { available: false, fields: [], finalSale: null },
    closure: 'Cork stopper with an inner seal',
    shipping: { shipWeightLb: 1.2, fragile: true, boxNote: 'Foam-cradled small carton' },
    featured: false, popularityRank: 10, createdAt: '2026-02-19',
    description: 'A rounded little vessel with a cork stopper, glazed the colour of unbleached linen.',
    seoTitle: 'Hollow Keepsake, Cream Glaze — ceramic keepsake urn',
    seoDescription: 'A 4 cubic inch cream-glazed ceramic keepsake urn with a sealed cork stopper.',
  },
  {
    ...base, id: 'p-010', sku: 'LS-JWL-STR-001', name: 'Thread Pendant, Sterling', slug: 'thread-pendant-sterling',
    category: 'jewelry', intendedUse: 'Holds a very small portion of ashes',
    material: 'sterling', materialLabel: 'Sterling silver', color: 'stone', colorLabel: 'Polished silver', style: 'jewelry',
    capacityCuIn: 0.05, suitableUpToLb: null,
    dimensions: { height: 1.1, width: 0.4, depth: 0.4, unit: 'in' }, weightLb: 0.02, priceCents: 15500,
    art: { form: 'pendant', tone: 'stone' },
    personalization: { available: true, fields: ['name', 'motif'], finalSale: null },
    closure: 'Threaded screw top, sealed with the included adhesive',
    shipping: { shipWeightLb: 0.5, fragile: false, boxNote: 'Jewellery box, includes a filling funnel' },
    featured: false, popularityRank: 8, createdAt: '2025-12-01',
    description: 'A slim sterling pendant on an 18-inch chain, with a threaded top and a small funnel included. Quiet enough to wear every day.',
    seoTitle: 'Thread Pendant, Sterling — cremation ash jewelry',
    seoDescription: 'A sterling silver cremation pendant that holds a very small portion of ashes, with a screw closure and chain.',
  },
  {
    ...base, id: 'p-011', sku: 'LS-BIO-SED-200', name: 'Seedfall Biodegradable Urn', slug: 'seedfall-biodegradable-urn',
    category: 'adult', intendedUse: 'For burial or water release',
    material: 'biodegradable', materialLabel: 'Compressed plant fibre and recycled paper', color: 'natural', colorLabel: 'Undyed fibre', style: 'biodegradable',
    capacityCuIn: 200, suitableUpToLb: 190,
    dimensions: { height: 9, width: 8, depth: 8, unit: 'in' }, weightLb: 1.6, priceCents: 14500,
    art: { form: 'seed', tone: 'natural' },
    personalization: { available: false, fields: [], finalSale: null },
    closure: 'Folded lid with a fibre tie',
    shipping: { shipWeightLb: 3, fragile: false, boxNote: 'Kept dry in a lined carton' },
    featured: false, popularityRank: 11, createdAt: '2026-03-05',
    description: 'Made to return quietly to the ground or the water. Firm enough to carry and to hold, and designed to break down naturally afterwards.',
    seoTitle: 'Seedfall Biodegradable Urn — plant fibre burial urn',
    seoDescription: 'A 200 cubic inch biodegradable urn made from compressed plant fibre for burial or water release.',
  },
  {
    ...base, id: 'p-012', sku: 'LS-NAT-CER-190', name: 'Meadow Line Ceramic', slug: 'meadow-line-ceramic',
    category: 'adult', intendedUse: 'Holds the full amount of ashes for one adult',
    material: 'ceramic', materialLabel: 'Stoneware with a hand-drawn line motif', color: 'sage', colorLabel: 'Pale sage', style: 'nature',
    capacityCuIn: 195, suitableUpToLb: 185,
    dimensions: { height: 9.4, width: 6.8, depth: 6.8, unit: 'in' }, weightLb: 5.8, priceCents: 32500,
    art: { form: 'vase', tone: 'sage' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Fitted lid with a recessed silicone gasket',
    shipping: { shipWeightLb: 8.5, fragile: true, boxNote: 'Foam-cradled, double-boxed' },
    featured: true, popularityRank: 5, createdAt: '2026-03-18',
    description: 'A thin band of grasses drawn by hand around the shoulder of the pot. For someone who was happiest outdoors.',
    seoTitle: 'Meadow Line Ceramic — nature-inspired cremation urn',
    seoDescription: 'A sage stoneware cremation urn with a hand-drawn grass motif and 195 cubic inches of capacity.',
  },
  {
    ...base, id: 'p-013', sku: 'LS-PET-OAK-060', name: 'Hearth Pet Urn, Small', slug: 'hearth-pet-urn-small',
    category: 'pet', intendedUse: 'For a pet up to about 50 lb',
    material: 'wood', materialLabel: 'Solid oak with a brass plate', color: 'natural', colorLabel: 'Natural oak', style: 'wood',
    capacityCuIn: 60, suitableUpToLb: 50,
    dimensions: { height: 5.2, width: 5.6, depth: 4.4, unit: 'in' }, weightLb: 1.7, priceCents: 12500,
    art: { form: 'chest', tone: 'natural' },
    personalization: { available: true, fields: ['name', 'dates', 'motif'], finalSale: null },
    closure: 'Sliding base panel',
    shipping: { shipWeightLb: 3, fragile: false, boxNote: 'Double-boxed, plain outer carton' },
    featured: false, popularityRank: 13, createdAt: '2026-01-30',
    description: 'A small oak box with an engraved brass plate on the front. Sized for cats and smaller dogs.',
    seoTitle: 'Hearth Pet Urn, Small — wooden pet memorial urn',
    seoDescription: 'A 60 cubic inch oak pet urn with an engraved brass plate, suited to pets up to about 50 lb.',
  },
  {
    ...base, id: 'p-014', sku: 'LS-PET-CER-110', name: 'Hearth Pet Urn, Large', slug: 'hearth-pet-urn-large',
    category: 'pet', intendedUse: 'For a pet up to about 100 lb',
    material: 'ceramic', materialLabel: 'Glazed stoneware', color: 'stone', colorLabel: 'Warm stone', style: 'ceramic',
    capacityCuIn: 110, suitableUpToLb: 100,
    dimensions: { height: 7, width: 6, depth: 6, unit: 'in' }, weightLb: 3.9, priceCents: 16500,
    art: { form: 'dome', tone: 'stone' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Fitted lid with a recessed silicone gasket',
    shipping: { shipWeightLb: 6, fragile: true, boxNote: 'Foam-cradled, double-boxed' },
    featured: false, popularityRank: 14, createdAt: '2026-02-11',
    description: 'A rounder, softer shape for a larger dog, glazed in the same warm stone as our adult vessels.',
    seoTitle: 'Hearth Pet Urn, Large — ceramic pet memorial urn',
    seoDescription: 'A 110 cubic inch glazed stoneware pet urn suited to pets up to about 100 lb.',
  },
  {
    ...base, id: 'p-015', sku: 'LS-MOD-STL-200', name: 'Column Urn in Soft Steel', slug: 'column-urn-in-soft-steel',
    category: 'adult', intendedUse: 'Holds the full amount of ashes for one adult',
    material: 'steel', materialLabel: 'Powder-coated steel', color: 'charcoal', colorLabel: 'Matte charcoal', style: 'modern',
    capacityCuIn: 200, suitableUpToLb: 190,
    dimensions: { height: 10.6, width: 5.8, depth: 5.8, unit: 'in' }, weightLb: 4.9, priceCents: 28500,
    art: { form: 'cylinder', tone: 'charcoal' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription'], finalSale: null },
    closure: 'Threaded lid',
    shipping: { shipWeightLb: 7, fragile: false, boxNote: 'Cloth bag inside a fitted carton' },
    featured: false, popularityRank: 15, createdAt: '2026-04-02',
    description: 'A plain cylinder in matte charcoal, with nothing on it but the engraving you choose.',
    seoTitle: 'Column Urn in Soft Steel — modern minimal cremation urn',
    seoDescription: 'A matte charcoal steel cremation urn holding 200 cubic inches, with a threaded lid and optional engraving.',
  },
  {
    ...base, id: 'p-016', sku: 'LS-KPS-BRZ-015', name: 'Rosewater Keepsake', slug: 'rosewater-keepsake',
    category: 'keepsake', intendedUse: 'Holds a small portion of ashes',
    material: 'brass', materialLabel: 'Brass with a rose finish', color: 'rose', colorLabel: 'Dusty rose', style: 'traditional',
    capacityCuIn: 3, suitableUpToLb: null,
    dimensions: { height: 3.1, width: 1.9, depth: 1.9, unit: 'in' }, weightLb: 0.5, priceCents: 8900,
    art: { form: 'teardrop', tone: 'rose' },
    personalization: { available: true, fields: ['name', 'dates', 'motif'], finalSale: null },
    closure: 'Threaded base with a silicone ring',
    shipping: { shipWeightLb: 1, fragile: false, boxNote: 'Cotton pouch inside a small carton' },
    featured: false, popularityRank: 16, createdAt: '2026-03-28',
    description: 'A softly tapered keepsake in a muted rose finish, with a threaded base and a velvet pouch.',
    seoTitle: 'Rosewater Keepsake — small brass keepsake urn',
    seoDescription: 'A 3 cubic inch brass keepsake urn in a dusty rose finish, with a threaded base and pouch.',
  },
  {
    ...base, id: 'p-017', sku: 'LS-NAT-STN-200', name: 'Riverbed Stone Urn', slug: 'riverbed-stone-urn',
    category: 'adult', intendedUse: 'Holds the full amount of ashes for one adult',
    material: 'stone', materialLabel: 'Cultured marble', color: 'cream', colorLabel: 'Ivory marble', style: 'nature',
    capacityCuIn: 200, suitableUpToLb: 190,
    dimensions: { height: 9.2, width: 7.4, depth: 7.4, unit: 'in' }, weightLb: 9.8, priceCents: 44500,
    art: { form: 'dome', tone: 'cream' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription'], finalSale: null },
    closure: 'Weighted lid seated on a felt ring',
    shipping: { shipWeightLb: 13, fragile: true, boxNote: 'Foam-cradled, double-boxed' },
    featured: false, popularityRank: 17, createdAt: '2025-07-15',
    description: 'Cool, weighty and pale as a river stone, with faint veining that differs from piece to piece.',
    seoTitle: 'Riverbed Stone Urn — marble cremation urn',
    seoDescription: 'An ivory cultured marble cremation urn with 200 cubic inches of capacity and a weighted lid.',
  },
  {
    ...base, id: 'p-018', sku: 'LS-ADT-GLS-200', name: 'Daylight Glass Vessel', slug: 'daylight-glass-vessel',
    category: 'adult', intendedUse: 'Holds the full amount of ashes for one adult',
    material: 'glass', materialLabel: 'Hand-blown glass', color: 'sage', colorLabel: 'Pale sea glass', style: 'modern',
    capacityCuIn: 200, suitableUpToLb: 190,
    dimensions: { height: 9.6, width: 6.6, depth: 6.6, unit: 'in' }, weightLb: 5.4, priceCents: 47500,
    art: { form: 'teardrop', tone: 'sage' },
    personalization: { available: false, fields: [], finalSale: null },
    closure: 'Ground glass stopper with a sealing ring',
    shipping: { shipWeightLb: 9, fragile: true, boxNote: 'Foam-cradled, double-boxed' },
    featured: false, popularityRank: 18, createdAt: '2026-04-20', inStock: false,
    stockNote: 'Expected back — TODO: confirm restock date before displaying one',
    description: 'Hand-blown in pale sea glass so it holds the light without showing what is inside. An interior sleeve keeps the contents private.',
    seoTitle: 'Daylight Glass Vessel — hand-blown glass cremation urn',
    seoDescription: 'A hand-blown sea glass cremation urn with 200 cubic inches of capacity and a sealed glass stopper.',
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByIds = (ids: string[]) => ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
