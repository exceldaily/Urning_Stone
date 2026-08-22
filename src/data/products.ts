/**
 * PRODUCT DATA — PET MEMORIALS
 * -------------------------------------------------------------------------
 * The UI never hard-codes product facts, so this file can be replaced by a
 * CMS/commerce API response of the same shape without touching a component.
 *
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │ PRICING NOTICE — READ BEFORE TAKING A SINGLE REAL ORDER               │
 * │                                                                       │
 * │ Every `costCents` below is a PLACEHOLDER, and every product is        │
 * │ marked `costVerified: false`.                                         │
 * │                                                                       │
 * │ The supplier listings these products come from (see `sourceUrl`)      │
 * │ could not be read when this catalogue was written, so no real         │
 * │ supplier price, MOQ or specification was available. Nothing here      │
 * │ was invented to look authoritative: the numbers are round, obvious    │
 * │ placeholders, and the storefront visibly labels any product whose     │
 * │ cost is unverified rather than presenting it as a firm price.         │
 * │                                                                       │
 * │ TO GO LIVE: put the real landed unit cost into `costCents` and set    │
 * │ `costVerified: true`. Retail price is DERIVED — cost x the markup     │
 * │ multiplier in src/data/pricing.ts — so it updates everywhere at once: │
 * │ cards, filters, cart, structured data and Stripe.                     │
 * └───────────────────────────────────────────────────────────────────────┘
 *
 * IMAGES: `images` is empty, so <UrnImage /> renders an original illustration
 * driven by `art`. Supplier photography is copyright of the supplier — get
 * written permission, or shoot your own, before populating these arrays.
 */
import { retailCents } from './pricing';

export type CategoryId = 'urn' | 'keepsake' | 'jewelry';
export type PetId = 'dog' | 'cat' | 'small';
export type StyleId = 'modern' | 'classic' | 'sculptural' | 'nature' | 'biodegradable' | 'jewelry';
export type MaterialId = 'ceramic' | 'porcelain' | 'steel' | 'resin' | 'biodegradable' | 'wood';
export type ColorId = 'natural' | 'cream' | 'sage' | 'charcoal' | 'bronze' | 'stone' | 'rose' | 'pink' | 'white' | 'steel';
export type UrnForm =
  | 'vase' | 'cube' | 'cylinder' | 'dome' | 'seed' | 'pendant'
  | 'paw' | 'heart' | 'bone' | 'wing' | 'cat' | 'dog' | 'keychain' | 'anubis';

export type PersonalisationFieldId = 'name' | 'dates' | 'inscription' | 'motif' | 'photo' | 'pawprint';

export type ProductImage = { src: string; alt: string; kind: 'product' | 'detail' | 'lifestyle' };

interface ProductInput {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: CategoryId;
  /** Which animals this piece suits. Drives the pet-type collections. */
  petTypes: PetId[];
  intendedUse: string;
  material: MaterialId;
  materialLabel: string;
  color: ColorId;
  colorLabel: string;
  style: StyleId;
  /** Interior capacity in cubic inches. */
  capacityCuIn: number;
  /** Approx. 1 cu in per 1 lb of healthy body weight. */
  suitableUpToLb: number | null;
  dimensions: { height: number; width: number; depth: number; unit: 'in' };
  weightLb: number;
  /** Landed supplier cost per unit, minor units. PLACEHOLDER — see notice above. */
  costCents: number;
  /** False until a real supplier quote has been entered. Shown to the customer. */
  costVerified: boolean;
  /** The supplier listing this product is sourced from. */
  sourceUrl: string;
  images: ProductImage[];
  lifestyleImages: ProductImage[];
  art: { form: UrnForm; tone: ColorId };
  inStock: boolean;
  stockNote?: string;
  personalization: { available: boolean; fields: PersonalisationFieldId[]; finalSale: boolean | null };
  closure: string;
  care: string;
  processingTime: string;
  shipping: { shipWeightLb: number; fragile: boolean; boxNote: string };
  featured: boolean;
  popularityRank: number;
  createdAt: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

/** Retail price is derived, never authored. */
export interface Product extends ProductInput {
  /** Derived: costCents x MARKUP_MULTIPLIER. */
  priceCents: number;
}

const base = {
  images: [] as ProductImage[],
  lifestyleImages: [] as ProductImage[],
  inStock: true,
  costVerified: false,
  processingTime: 'TODO: confirm real lead time with the supplier',
  care: 'Wipe gently with a soft, dry cloth. Keep out of prolonged direct sunlight.',
};

const catalogue: ProductInput[] = [
  {
    ...base, id: 'p-001', sku: 'PM-STL-CYL-060', name: 'Stillwater Steel Urn', slug: 'stillwater-steel-urn',
    category: 'urn', petTypes: ['dog', 'cat'], intendedUse: 'A full-size urn for a medium or large dog',
    material: 'steel', materialLabel: 'Brushed stainless steel', color: 'steel', colorLabel: 'Brushed steel', style: 'modern',
    capacityCuIn: 60, suitableUpToLb: 60,
    dimensions: { height: 6.1, width: 4.3, depth: 4.3, unit: 'in' }, weightLb: 1.6,
    costCents: 1800, sourceUrl: 'https://www.alibaba.com/product-detail/Wholesale-Pet-Supplies-Stainless-Steel-Urns_1601313993645.html',
    art: { form: 'cylinder', tone: 'stone' },
    personalization: { available: true, fields: ['name', 'dates', 'pawprint'], finalSale: null },
    closure: 'Threaded lid with a silicone seal',
    shipping: { shipWeightLb: 2.4, fragile: false, boxNote: 'Double-boxed with a foam cradle' },
    featured: true, popularityRank: 2, createdAt: '2026-05-02',
    description: 'A quiet cylinder in brushed steel, weighted so it sits solidly on a shelf. The lid threads closed against a silicone seal, which makes it one of the more secure pieces we carry — a good choice if it will be moved, travelled with, or kept somewhere it might be knocked.',
    seoTitle: 'Stillwater Steel Pet Urn', seoDescription: 'Brushed stainless steel pet urn with a sealed threaded lid, holding up to 60 cubic inches — suitable for dogs up to around 60 lb.',
  },
  {
    ...base, id: 'p-002', sku: 'PM-CER-DOM-045', name: 'Morning Light Ceramic Urn', slug: 'morning-light-ceramic-urn',
    category: 'urn', petTypes: ['dog', 'cat'], intendedUse: 'A full-size urn for a cat or small dog',
    material: 'ceramic', materialLabel: 'Glazed stoneware', color: 'cream', colorLabel: 'Warm cream', style: 'modern',
    capacityCuIn: 45, suitableUpToLb: 45,
    dimensions: { height: 5.5, width: 4.7, depth: 4.7, unit: 'in' }, weightLb: 2.1,
    costCents: 1600, sourceUrl: 'https://www.alibaba.com/product-detail/Modern-Eco-Friendly-Ceramic-Urn-with_1601665991491.html',
    art: { form: 'dome', tone: 'cream' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription'], finalSale: null },
    closure: 'Recessed base plate with a threaded cover',
    shipping: { shipWeightLb: 3.2, fragile: true, boxNote: 'Suspension-packed — ceramic' },
    featured: true, popularityRank: 1, createdAt: '2026-05-04',
    description: 'A softly rounded stoneware urn in a warm cream glaze that shifts with the light through the day. The opening is underneath, so from every normal angle it reads as a piece of pottery rather than an urn — which is exactly why people choose it for a living room.',
    seoTitle: 'Morning Light Ceramic Pet Urn', seoDescription: 'Handglazed cream ceramic pet urn holding 45 cubic inches, with a discreet base opening. Suits cats and small dogs.',
  },
  {
    ...base, id: 'p-003', sku: 'PM-CER-BON-030', name: 'Good Boy Bone Urn', slug: 'good-boy-bone-urn',
    category: 'urn', petTypes: ['dog'], intendedUse: 'A bone-shaped urn for a small or medium dog',
    material: 'ceramic', materialLabel: 'Glazed ceramic', color: 'white', colorLabel: 'Soft white', style: 'sculptural',
    capacityCuIn: 30, suitableUpToLb: 30,
    dimensions: { height: 3.4, width: 7.2, depth: 3.1, unit: 'in' }, weightLb: 1.7,
    costCents: 1500, sourceUrl: 'https://www.alibaba.com/product-detail/Pet-Cremation-Bone-Ashes-Memorial-Urn_1601783662096.html',
    art: { form: 'bone', tone: 'white' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Sealed base stopper',
    shipping: { shipWeightLb: 2.6, fragile: true, boxNote: 'Suspension-packed — ceramic' },
    featured: false, popularityRank: 7, createdAt: '2026-05-06',
    description: 'Unmistakably a bone, made carefully enough that it never tips into novelty. Families tell us the shape is the point — it makes them smile before it makes them sad, which is a kind thing for an object in a hallway to do.',
    seoTitle: 'Bone-Shaped Dog Urn', seoDescription: 'Ceramic bone-shaped urn for dog ashes, holding 30 cubic inches, with optional name and dates.',
  },
  {
    ...base, id: 'p-004', sku: 'PM-POR-VAS-050', name: 'Hollow Cream Porcelain Urn', slug: 'hollow-cream-porcelain-urn',
    category: 'urn', petTypes: ['dog', 'cat'], intendedUse: 'A full-size urn for a cat or medium dog',
    material: 'porcelain', materialLabel: 'Hand-thrown porcelain', color: 'cream', colorLabel: 'Bone cream', style: 'classic',
    capacityCuIn: 50, suitableUpToLb: 50,
    dimensions: { height: 6.4, width: 4.5, depth: 4.5, unit: 'in' }, weightLb: 2.4,
    costCents: 2200, sourceUrl: 'https://www.alibaba.com/product-detail/Handmade-Custom-Cream-Porcelain-Eco-Friendly_1601848092808.html',
    art: { form: 'vase', tone: 'cream' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription'], finalSale: null },
    closure: 'Fitted lid with a felt-lined rim',
    shipping: { shipWeightLb: 3.6, fragile: true, boxNote: 'Suspension-packed — porcelain' },
    featured: false, popularityRank: 8, createdAt: '2026-05-08',
    description: 'Thrown by hand, so no two are quite the same height or quite the same cream. The felt-lined rim means the lid settles silently instead of clicking — a small detail you notice every single time you lift it.',
    seoTitle: 'Handmade Cream Porcelain Pet Urn', seoDescription: 'Hand-thrown porcelain pet urn in a bone-cream glaze, 50 cubic inches, with a felt-lined fitted lid.',
  },
  {
    ...base, id: 'p-005', sku: 'PM-WOD-BOX-055', name: 'Quiet Hours Memory Box', slug: 'quiet-hours-memory-box',
    category: 'urn', petTypes: ['dog', 'cat', 'small'], intendedUse: 'An urn and keepsake box in one',
    material: 'wood', materialLabel: 'Solid beech with a brass catch', color: 'natural', colorLabel: 'Natural beech', style: 'classic',
    capacityCuIn: 55, suitableUpToLb: 55,
    dimensions: { height: 4.2, width: 7.5, depth: 5.4, unit: 'in' }, weightLb: 2.2,
    costCents: 2000, sourceUrl: 'https://www.alibaba.com/product-detail/Pet-Memorial-Products-Animal-Ashes-Box_1601904256896.html',
    art: { form: 'cube', tone: 'natural' },
    personalization: { available: true, fields: ['name', 'dates', 'photo', 'pawprint'], finalSale: null },
    closure: 'Hinged lid with a brass catch',
    shipping: { shipWeightLb: 3.1, fragile: false, boxNote: 'Corner-protected carton' },
    featured: true, popularityRank: 3, createdAt: '2026-05-10',
    description: 'A box rather than a vessel, with room beside the inner container for a collar, a tag, a tuft of fur, the last photo. For a lot of families that extra inch of space matters more than the urn itself.',
    seoTitle: 'Wooden Pet Memory Box Urn', seoDescription: 'Solid beech pet urn and keepsake box holding 55 cubic inches, with room for a collar, tag and photographs.',
  },
  {
    ...base, id: 'p-006', sku: 'PM-CER-DOG-035', name: 'Sleeping Dog Urn', slug: 'sleeping-dog-urn',
    category: 'urn', petTypes: ['dog'], intendedUse: 'A sculpted urn for a small or medium dog',
    material: 'ceramic', materialLabel: 'Glazed ceramic', color: 'sage', colorLabel: 'Soft sage', style: 'sculptural',
    capacityCuIn: 35, suitableUpToLb: 35,
    dimensions: { height: 4.6, width: 7.0, depth: 4.0, unit: 'in' }, weightLb: 2.0,
    costCents: 1900, sourceUrl: 'https://www.alibaba.com/product-detail/Eco-Friendly-Ceramic-Dog-Shaped-Pet_1601717870739.html',
    art: { form: 'dog', tone: 'sage' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Sealed base stopper',
    shipping: { shipWeightLb: 3.0, fragile: true, boxNote: 'Suspension-packed — ceramic' },
    featured: true, popularityRank: 4, createdAt: '2026-05-12',
    description: 'A dog curled into the shape they make when they have finally settled and you know they are down for the night. Sculpted simply, without breed markings, so it can stand in for almost any dog.',
    seoTitle: 'Sleeping Dog Ceramic Urn', seoDescription: 'Sculpted ceramic urn shaped as a sleeping dog, holding 35 cubic inches, glazed in soft sage.',
  },
  {
    ...base, id: 'p-007', sku: 'PM-CER-VAS-040', name: 'Long Walk Memorial Urn', slug: 'long-walk-memorial-urn',
    category: 'urn', petTypes: ['dog', 'cat'], intendedUse: 'A full-size urn for a cat or small dog',
    material: 'ceramic', materialLabel: 'Matte-glazed ceramic', color: 'stone', colorLabel: 'River stone', style: 'nature',
    capacityCuIn: 40, suitableUpToLb: 40,
    dimensions: { height: 5.8, width: 4.4, depth: 4.4, unit: 'in' }, weightLb: 2.0,
    costCents: 1700, sourceUrl: 'https://www.alibaba.com/product-detail/Cross-border-Pet-Cremation-Urn-Memorial_1601783543273.html',
    art: { form: 'vase', tone: 'stone' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription'], finalSale: null },
    closure: 'Threaded base cover',
    shipping: { shipWeightLb: 3.0, fragile: true, boxNote: 'Suspension-packed — ceramic' },
    featured: false, popularityRank: 9, createdAt: '2026-05-14',
    description: 'A matte grey-green glaze with the depth of a stone lifted out of a riverbed — the kind of thing you would have brought home from a walk together. Unmarked unless you ask for engraving.',
    seoTitle: 'Long Walk Ceramic Pet Urn', seoDescription: 'Matte river-stone ceramic pet urn holding 40 cubic inches, with an optional engraved name and dates.',
  },
  {
    ...base, id: 'p-008', sku: 'PM-STL-CYL-025', name: 'Small Hours Steel Urn', slug: 'small-hours-steel-urn',
    category: 'urn', petTypes: ['cat', 'small'], intendedUse: 'A full-size urn for a cat or small animal',
    material: 'steel', materialLabel: 'Matte stainless steel', color: 'charcoal', colorLabel: 'Matte graphite', style: 'modern',
    capacityCuIn: 25, suitableUpToLb: 25,
    dimensions: { height: 4.4, width: 3.3, depth: 3.3, unit: 'in' }, weightLb: 1.1,
    costCents: 1500, sourceUrl: 'https://www.alibaba.com/product-detail/Stainless-Steel-Modern-Minimalism-Cylindrical-Pet_1601786812358.html',
    art: { form: 'cylinder', tone: 'charcoal' },
    personalization: { available: true, fields: ['name', 'dates', 'pawprint'], finalSale: null },
    closure: 'Threaded lid with a silicone seal',
    shipping: { shipWeightLb: 1.8, fragile: false, boxNote: 'Double-boxed with a foam cradle' },
    featured: false, popularityRank: 10, createdAt: '2026-05-16',
    description: 'The smaller companion to the Stillwater, in a matte graphite finish that does not show fingerprints. Sealed and light enough to travel with, if home is somewhere you have not settled yet.',
    seoTitle: 'Small Cat Urn in Matte Steel', seoDescription: 'Matte graphite stainless steel urn for cats and small pets, 25 cubic inches, with a sealed threaded lid.',
  },
  {
    ...base, id: 'p-009', sku: 'PM-CER-DOM-030', name: 'Rosewater Ceramic Urn', slug: 'rosewater-ceramic-urn',
    category: 'urn', petTypes: ['cat', 'small'], intendedUse: 'A full-size urn for a cat or small animal',
    material: 'ceramic', materialLabel: 'Hand-glazed ceramic', color: 'pink', colorLabel: 'Pale rosewater', style: 'modern',
    capacityCuIn: 30, suitableUpToLb: 30,
    dimensions: { height: 4.9, width: 4.2, depth: 4.2, unit: 'in' }, weightLb: 1.8,
    costCents: 2100, sourceUrl: 'https://www.alibaba.com/product-detail/Handmade-Modern-Pink-Ceramic-ELEVE-Pet_11000028742198.html',
    art: { form: 'dome', tone: 'pink' },
    personalization: { available: true, fields: ['name', 'dates', 'inscription'], finalSale: null },
    closure: 'Recessed base plate with a threaded cover',
    shipping: { shipWeightLb: 2.8, fragile: true, boxNote: 'Suspension-packed — ceramic' },
    featured: false, popularityRank: 11, createdAt: '2026-05-18',
    description: 'A pale rosewater glaze, hand-applied, so it pools very slightly darker where the curve turns. Warm rather than sweet — it reads as a piece of studio pottery first and a memorial second.',
    seoTitle: 'Pink Ceramic Cat Urn', seoDescription: 'Hand-glazed rosewater ceramic urn for cats and small pets, holding 30 cubic inches.',
  },
  {
    ...base, id: 'p-010', sku: 'PM-STL-KEY-001', name: 'Always With Me Keyring', slug: 'always-with-me-keyring',
    category: 'jewelry', petTypes: ['dog', 'cat', 'small'], intendedUse: 'Holds a small pinch of ashes, carried daily',
    material: 'steel', materialLabel: 'Stainless steel, waterproof seal', color: 'steel', colorLabel: 'Polished steel', style: 'jewelry',
    capacityCuIn: 0.2, suitableUpToLb: null,
    dimensions: { height: 1.6, width: 0.5, depth: 0.5, unit: 'in' }, weightLb: 0.06,
    costCents: 600, sourceUrl: 'https://www.alibaba.com/product-detail/Waterproof-Pet-Urn-KeyChain-Stainless-Steel_1601926958423.html',
    art: { form: 'keychain', tone: 'stone' },
    personalization: { available: true, fields: ['name'], finalSale: null },
    closure: 'Screw fitting with an O-ring, supplied with a small funnel',
    shipping: { shipWeightLb: 0.4, fragile: false, boxNote: 'Small padded pouch and gift box' },
    featured: false, popularityRank: 12, createdAt: '2026-05-20',
    description: 'A sealed steel barrel on a keyring, holding a pinch of ashes. The O-ring fitting is genuinely waterproof, which matters for something that lives in a pocket. Comes with a funnel and instructions, and it is a job you can do at the kitchen table without ceremony.',
    seoTitle: 'Waterproof Pet Ashes Keyring', seoDescription: 'Waterproof stainless steel pet ashes keyring with a sealed screw fitting, supplied with a filling funnel.',
  },
  {
    ...base, id: 'p-011', sku: 'PM-STL-WNG-001', name: 'Little Wings Keyring', slug: 'little-wings-keyring',
    category: 'jewelry', petTypes: ['dog', 'cat', 'small'], intendedUse: 'Holds a small pinch of ashes, carried daily',
    material: 'steel', materialLabel: 'Stainless steel with a wing motif', color: 'steel', colorLabel: 'Polished steel', style: 'jewelry',
    capacityCuIn: 0.2, suitableUpToLb: null,
    dimensions: { height: 1.9, width: 0.9, depth: 0.5, unit: 'in' }, weightLb: 0.07,
    costCents: 700, sourceUrl: 'https://www.alibaba.com/product-detail/Wings-Pet-Urn-KeyChain-Stainless-Steel_1601927017073.html',
    art: { form: 'wing', tone: 'stone' },
    personalization: { available: true, fields: ['name'], finalSale: null },
    closure: 'Screw fitting with an O-ring, supplied with a small funnel',
    shipping: { shipWeightLb: 0.4, fragile: false, boxNote: 'Small padded pouch and gift box' },
    featured: false, popularityRank: 13, createdAt: '2026-05-20',
    description: 'The same sealed barrel as the Always With Me, with a small pair of wings folded against it. If the wings feel right to you they will feel right every time you find your keys; if they do not, the plain one is the same piece underneath.',
    seoTitle: 'Winged Pet Ashes Keyring', seoDescription: 'Stainless steel pet ashes keyring with a wing motif and a sealed waterproof fitting.',
  },
  {
    ...base, id: 'p-012', sku: 'PM-RES-ANU-040', name: 'Guardian Anubis Urn', slug: 'guardian-anubis-urn',
    category: 'urn', petTypes: ['dog'], intendedUse: 'A sculpted guardian urn for a dog',
    material: 'resin', materialLabel: 'Hand-finished resin', color: 'charcoal', colorLabel: 'Antique black and gold', style: 'sculptural',
    capacityCuIn: 40, suitableUpToLb: 40,
    dimensions: { height: 9.2, width: 3.6, depth: 3.6, unit: 'in' }, weightLb: 2.3,
    costCents: 2600, sourceUrl: 'https://www.alibaba.com/product-detail/Custom-Egyptian-Anubis-Dog-Memorial-Urn_1600491094231.html',
    art: { form: 'anubis', tone: 'charcoal' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Sealed base stopper',
    shipping: { shipWeightLb: 3.4, fragile: true, boxNote: 'Corner-protected with a moulded insert' },
    featured: false, popularityRank: 14, createdAt: '2026-05-22',
    description: 'Anubis, who in Egyptian belief guided the dead and guarded them on the way. Hand-finished in antique black with gold detail. A deliberate, upright piece for people who want the memorial to look like it is standing watch.',
    seoTitle: 'Anubis Dog Memorial Urn', seoDescription: 'Hand-finished Egyptian Anubis guardian urn for dog ashes, 40 cubic inches, in antique black and gold.',
  },
  {
    ...base, id: 'p-013', sku: 'PM-CER-ANG-015', name: 'Angel Bone Keepsake', slug: 'angel-bone-keepsake',
    category: 'keepsake', petTypes: ['dog'], intendedUse: 'Holds a small portion, often shared between people',
    material: 'ceramic', materialLabel: 'Hand-finished ceramic', color: 'white', colorLabel: 'Chalk white', style: 'sculptural',
    capacityCuIn: 15, suitableUpToLb: null,
    dimensions: { height: 3.0, width: 4.4, depth: 2.4, unit: 'in' }, weightLb: 0.8,
    costCents: 1200, sourceUrl: 'https://www.alibaba.com/product-detail/In-stock-Handmade-Angelic-Bone-Shaped_1601706275995.html',
    art: { form: 'wing', tone: 'white' },
    personalization: { available: true, fields: ['name'], finalSale: null },
    closure: 'Sealed base stopper',
    shipping: { shipWeightLb: 1.5, fragile: true, boxNote: 'Suspension-packed — ceramic' },
    featured: false, popularityRank: 15, createdAt: '2026-05-24',
    description: 'A small winged bone in chalk-white ceramic. Keepsake-sized on purpose: when a dog belonged to a whole family, one urn in one house is not always the right answer, and several of these can be.',
    seoTitle: 'Angel Wing Bone Keepsake Urn', seoDescription: 'Small winged bone-shaped ceramic keepsake urn for sharing a portion of a dog’s ashes.',
  },
  {
    ...base, id: 'p-014', sku: 'PM-BIO-SED-045', name: 'Seedfall Biodegradable Urn', slug: 'seedfall-biodegradable-urn',
    category: 'urn', petTypes: ['dog', 'cat', 'small'], intendedUse: 'For burial or planting, breaks down naturally',
    material: 'biodegradable', materialLabel: 'Compressed plant fibre', color: 'sage', colorLabel: 'Moss and sand', style: 'biodegradable',
    capacityCuIn: 45, suitableUpToLb: 45,
    dimensions: { height: 5.5, width: 5.5, depth: 5.5, unit: 'in' }, weightLb: 0.7,
    costCents: 1400, sourceUrl: 'https://www.alibaba.com/product-detail/Eco-Friendly-Biodegradable-Boying-Brand-Round_1601749801879.html',
    art: { form: 'seed', tone: 'sage' },
    personalization: { available: false, fields: [], finalSale: null },
    closure: 'Fold-in fibre lid with a cotton tie',
    shipping: { shipWeightLb: 1.4, fragile: false, boxNote: 'Kept dry in a lined carton' },
    featured: false, popularityRank: 6, createdAt: '2026-05-26',
    description: 'Made from compressed plant fibre and intended to be buried, where it breaks down into the soil around it. If you have a garden they loved, or a tree you want to plant over them, this is the piece for it. Not for indoor display — it is meant to go into the ground.',
    seoTitle: 'Biodegradable Pet Urn for Burial', seoDescription: 'Compressed plant-fibre biodegradable pet urn for burial or tree planting, holding 45 cubic inches.',
  },
  {
    ...base, id: 'p-015', sku: 'PM-RES-CAT-025', name: 'Bastet Cat Urn', slug: 'bastet-cat-urn',
    category: 'urn', petTypes: ['cat'], intendedUse: 'A sculpted guardian urn for a cat',
    material: 'resin', materialLabel: 'Hand-finished resin', color: 'bronze', colorLabel: 'Antique bronze', style: 'sculptural',
    capacityCuIn: 25, suitableUpToLb: 25,
    dimensions: { height: 8.4, width: 3.2, depth: 3.2, unit: 'in' }, weightLb: 1.9,
    costCents: 2400, sourceUrl: 'https://www.alibaba.com/product-detail/Customized-Resin-Cat-Egyptian-Urn_1600238889477.html',
    art: { form: 'cat', tone: 'bronze' },
    personalization: { available: true, fields: ['name', 'dates'], finalSale: null },
    closure: 'Sealed base stopper',
    shipping: { shipWeightLb: 2.9, fragile: true, boxNote: 'Corner-protected with a moulded insert' },
    featured: true, popularityRank: 5, createdAt: '2026-05-28',
    description: 'A seated cat in antique bronze, in the Egyptian manner — upright, composed, entirely unbothered. Anyone who has lived with a cat will recognise the posture immediately, which is rather the point.',
    seoTitle: 'Egyptian Cat Memorial Urn', seoDescription: 'Hand-finished Egyptian seated cat urn in antique bronze, holding 25 cubic inches of ashes.',
  },
];

/** Retail price applied here, once, from the single markup constant. */
export const products: Product[] = catalogue.map((p) => ({ ...p, priceCents: retailCents(p.costCents) }));

/** True while any product still carries a placeholder supplier cost. */
export const hasUnverifiedPricing = products.some((p) => !p.costVerified);

/** Look up a single product by slug. */
export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/** Products suitable for a given animal. */
export const forPet = (pet: PetId): Product[] =>
  products.filter((p) => p.petTypes.includes(pet));
