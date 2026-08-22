/**
 * PLACEHOLDER PRODUCT ART
 * -------------------------------------------------------------------------
 * No photography has been supplied yet. Rather than show grey boxes, each
 * product renders a neutral illustrative silhouette derived from `product.art`.
 *
 * >> WHEN REAL PHOTOGRAPHY ARRIVES: populate `product.images` in
 *    src/data/products.ts. This component automatically renders the first
 *    image instead, and no other file needs to change. Swap <img> for
 *    next/image at that point and add the domain to next.config.mjs.
 */
import type { Product, UrnForm, ColorId } from '@/data/products';

const tones: Record<ColorId, { body: string; light: string; shade: string }> = {
  natural: { body: '#CBAA7E', light: '#E6D2AE', shade: '#A9855A' },
  cream: { body: '#E7DCC9', light: '#F5EEE2', shade: '#C8B99F' },
  sage: { body: '#A9B7A1', light: '#C9D3C3', shade: '#84947C' },
  charcoal: { body: '#59524A', light: '#7B7268', shade: '#3E3931' },
  bronze: { body: '#AB8B57', light: '#C9AC7C', shade: '#856A3D' },
  stone: { body: '#C7C0B5', light: '#DDD7CE', shade: '#A49C90' },
  rose: { body: '#C7A099', light: '#DEC0BA', shade: '#A67E77' },
};

function shape(form: UrnForm) {
  switch (form) {
    case 'vase':
      return 'M78 60 C66 74 62 96 62 118 C62 150 70 172 100 172 C130 172 138 150 138 118 C138 96 134 74 122 60 Z';
    case 'cube':
      return 'M64 76 H136 A6 6 0 0 1 142 82 V166 A6 6 0 0 1 136 172 H64 A6 6 0 0 1 58 166 V82 A6 6 0 0 1 64 76 Z';
    case 'cylinder':
      return 'M70 64 H130 A4 4 0 0 1 134 68 V168 A4 4 0 0 1 130 172 H70 A4 4 0 0 1 66 168 V68 A4 4 0 0 1 70 64 Z';
    case 'dome':
      return 'M100 58 C136 58 148 92 148 122 C148 154 128 172 100 172 C72 172 52 154 52 122 C52 92 64 58 100 58 Z';
    case 'chest':
      return 'M54 88 H146 A8 8 0 0 1 154 96 V164 A8 8 0 0 1 146 172 H54 A8 8 0 0 1 46 164 V96 A8 8 0 0 1 54 88 Z';
    case 'teardrop':
      return 'M100 52 C124 84 142 108 142 132 C142 156 123 172 100 172 C77 172 58 156 58 132 C58 108 76 84 100 52 Z';
    case 'pendant':
      return 'M100 74 C110 74 116 82 116 96 V150 C116 164 110 172 100 172 C90 172 84 164 84 150 V96 C84 82 90 74 100 74 Z';
    case 'seed':
    default:
      return 'M100 58 C130 74 144 100 144 126 C144 154 124 172 100 172 C76 172 56 154 56 126 C56 100 70 74 100 58 Z';
  }
}

function lid(form: UrnForm) {
  if (form === 'cube' || form === 'chest') return null;
  if (form === 'pendant') return <circle cx="100" cy="66" r="9" fill="none" strokeWidth="3" />;
  if (form === 'seed') return null;
  return <path d="M80 60 H120" strokeWidth="4" strokeLinecap="round" fill="none" />;
}

interface Props {
  product: Product;
  variant?: 'product' | 'lifestyle';
  className?: string;
  priority?: boolean;
}

export function UrnImage({ product, variant = 'product', className = '', priority = false }: Props) {
  const real = variant === 'lifestyle' ? product.lifestyleImages[0] : product.images[0];

  if (real) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={real.src}
        alt={real.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const t = tones[product.art.tone];
  const id = `g-${product.id}-${variant}`;
  const label = `Illustration of the ${product.name}, a ${product.materialLabel.toLowerCase()} ${
    product.category === 'jewelry' ? 'memorial pendant' : 'memorial urn'
  }. Product photography to follow.`;

  return (
    <svg viewBox="0 0 200 220" role="img" aria-label={label} className={`h-full w-full ${className}`}>
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFDFA" />
          <stop offset="100%" stopColor="#F0E9DC" />
        </linearGradient>
        <linearGradient id={`${id}-v`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={t.light} />
          <stop offset="55%" stopColor={t.body} />
          <stop offset="100%" stopColor={t.shade} />
        </linearGradient>
        <radialGradient id={`${id}-l`} cx="0.25" cy="0.12" r="0.9">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="220" fill={`url(#${id}-b)`} />
      <rect width="200" height="220" fill={`url(#${id}-l)`} />

      {variant === 'lifestyle' && (
        <g opacity="0.5">
          <rect x="18" y="18" width="58" height="150" rx="3" fill="#FFFFFF" opacity="0.75" />
          <path d="M18 60 H76 M18 108 H76" stroke="#DCD2C2" strokeWidth="1.5" />
          <path d="M140 20 v150" stroke="#E4DACB" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
        </g>
      )}

      <ellipse cx="100" cy="176" rx="52" ry="7" fill="#B9AE9C" opacity="0.28" />
      <g stroke={t.shade} strokeOpacity="0.75">
        <path d={shape(product.art.form)} fill={`url(#${id}-v)`} strokeWidth="1.5" />
        {lid(product.art.form)}
      </g>

      <path d="M20 190 H180" stroke="#DCD2C2" strokeWidth="1.5" />
      <text x="100" y="207" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill="#8A8176" fontFamily="Karla, system-ui, sans-serif">
        PHOTOGRAPHY TO FOLLOW
      </text>
    </svg>
  );
}
