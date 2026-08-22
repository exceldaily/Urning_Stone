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
  pink: { body: '#E2B8B4', light: '#F2D8D5', shade: '#BF9490' },
  white: { body: '#EFEAE1', light: '#FBF8F3', shade: '#CFC7BA' },
  steel: { body: '#B6B9BC', light: '#D6D8DA', shade: '#8E9295' },
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
    case 'pendant':
      return 'M100 74 C110 74 116 82 116 96 V150 C116 164 110 172 100 172 C90 172 84 164 84 150 V96 C84 82 90 74 100 74 Z';
    case 'keychain':
      return 'M100 84 C108 84 113 90 113 100 V156 C113 166 108 172 100 172 C92 172 87 166 87 156 V100 C87 90 92 84 100 84 Z';
    case 'bone':
      /* A dog bone lying on its side. */
      return 'M66 106 C58 98 58 86 68 84 C77 82 82 88 84 94 H116 C118 88 123 82 132 84 C142 86 142 98 134 106 C142 114 142 126 132 128 C123 130 118 124 116 118 H84 C82 124 77 130 68 128 C58 126 58 114 66 106 Z';
    case 'paw':
      /* Four toes above a broad pad. */
      return 'M100 168 C78 168 62 156 62 140 C62 124 78 116 100 116 C122 116 138 124 138 140 C138 156 122 168 100 168 Z';
    case 'heart':
      return 'M100 172 C70 148 54 132 54 112 C54 96 66 86 80 86 C89 86 96 91 100 98 C104 91 111 86 120 86 C134 86 146 96 146 112 C146 132 130 148 100 172 Z';
    case 'wing':
      /* A pair of folded wings. */
      return 'M100 78 C100 78 84 84 74 100 C64 116 62 142 68 160 C80 150 92 138 100 124 C108 138 120 150 132 160 C138 142 136 116 126 100 C116 84 100 78 100 78 Z';
    case 'cat':
      /* Seated cat: ears, head, shoulders, tucked base. */
      return 'M78 62 L86 88 C92 82 108 82 114 88 L122 62 L126 96 C136 108 140 126 140 142 C140 160 128 172 100 172 C72 172 60 160 60 142 C60 126 64 108 74 96 Z';
    case 'dog':
      /* A dog curled up asleep. */
      return 'M56 138 C56 112 76 96 104 96 C132 96 146 112 146 134 C146 158 126 172 100 172 C74 172 56 160 56 138 Z';
    case 'anubis':
      /* Tall upright guardian figure. */
      return 'M88 40 L94 70 C104 70 106 70 112 70 L118 40 L122 78 C132 88 136 104 136 120 V162 A8 8 0 0 1 128 170 H72 A8 8 0 0 1 64 162 V120 C64 104 68 88 78 78 Z';
    case 'seed':
    default:
      return 'M100 58 C130 74 144 100 144 126 C144 154 124 172 100 172 C76 172 56 154 56 126 C56 100 70 74 100 58 Z';
  }
}

/** Extra marks layered over the silhouette for the sculpted forms. */
function detail(form: UrnForm, stroke: string) {
  switch (form) {
    case 'paw':
      return (
        <g fill={stroke} fillOpacity="0.5">
          <ellipse cx="70" cy="102" rx="10" ry="13" />
          <ellipse cx="90" cy="92" rx="10" ry="14" />
          <ellipse cx="111" cy="92" rx="10" ry="14" />
          <ellipse cx="131" cy="102" rx="10" ry="13" />
        </g>
      );
    case 'cat':
      return (
        <g fill="none" stroke={stroke} strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round">
          <path d="M88 108 h6 M112 108 h6" />
          <path d="M97 118 q3 4 6 0" />
          <path d="M100 132 v14" strokeOpacity="0.3" />
        </g>
      );
    case 'dog':
      return (
        <g fill="none" stroke={stroke} strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round">
          <path d="M74 128 q12 -14 26 -10" />
          <path d="M126 130 q-10 -16 -26 -12" strokeOpacity="0.3" />
          <circle cx="120" cy="120" r="2.5" fill={stroke} stroke="none" fillOpacity="0.6" />
        </g>
      );
    case 'wing':
      return (
        <g fill="none" stroke={stroke} strokeOpacity="0.45" strokeWidth="1.8" strokeLinecap="round">
          <path d="M88 104 q-8 16 -6 34 M78 112 q-8 16 -4 32" />
          <path d="M112 104 q8 16 6 34 M122 112 q8 16 4 32" />
        </g>
      );
    case 'anubis':
      return (
        <g fill="none" stroke={stroke} strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round">
          <path d="M80 130 h40 M80 144 h40" />
          <circle cx="100" cy="92" r="3" fill={stroke} stroke="none" fillOpacity="0.5" />
        </g>
      );
    case 'bone':
      return <path d="M88 106 h24" stroke={stroke} strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" fill="none" />;
    case 'keychain':
      return <circle cx="100" cy="70" r="10" fill="none" stroke={stroke} strokeOpacity="0.7" strokeWidth="3" />;
    default:
      return null;
  }
}

const NO_LID: UrnForm[] = ['cube', 'seed', 'paw', 'heart', 'bone', 'wing', 'cat', 'dog', 'anubis', 'keychain'];

function lid(form: UrnForm) {
  if (NO_LID.includes(form)) return null;
  if (form === 'pendant') return <circle cx="100" cy="66" r="9" fill="none" strokeWidth="3" />;
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
        {detail(product.art.form, t.shade)}
      </g>

      <path d="M20 190 H180" stroke="#DCD2C2" strokeWidth="1.5" />
      <text x="100" y="207" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill="#8A8176" fontFamily="Karla, system-ui, sans-serif">
        PHOTOGRAPHY TO FOLLOW
      </text>
    </svg>
  );
}
