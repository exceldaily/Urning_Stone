'use client';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { UrnImage } from './UrnImage';

/**
 * Gallery with a zoom toggle. With real photography, swap the placeholder art
 * for next/image and add srcset-driven zoom.
 */
export function Gallery({ product }: { product: Product }) {
  const views: { key: string; variant: 'product' | 'lifestyle'; label: string }[] = [
    { key: 'front', variant: 'product', label: 'Front view' },
    { key: 'angle', variant: 'product', label: 'Alternate angle' },
    { key: 'room', variant: 'lifestyle', label: 'In a room' },
  ];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[1.1rem] border border-hairline bg-linen">
        <div className={`aspect-square transition-transform duration-500 ease-calm ${zoom ? 'scale-[1.6]' : 'scale-100'}`}>
          <UrnImage product={product} variant={views[active].variant} priority />
        </div>
        <button
          type="button"
          onClick={() => setZoom((z) => !z)}
          aria-pressed={zoom}
          className="absolute bottom-3 right-3 rounded-full border border-hairline bg-cream/90 px-4 py-2 text-[0.8rem] text-ink2 hover:text-ink"
        >
          {zoom ? 'Zoom out' : 'Zoom in'}
        </button>
      </div>
      <div className="flex gap-3" role="tablist" aria-label={`${product.name} views`}>
        {views.map((v, i) => (
          <button
            key={v.key}
            role="tab"
            aria-selected={active === i}
            onClick={() => { setActive(i); setZoom(false); }}
            className={`h-20 w-20 overflow-hidden rounded-lg border bg-linen transition-colors ${active === i ? 'border-bronze' : 'border-hairline hover:border-taupe'}`}
          >
            <UrnImage product={product} variant={v.variant} />
            <span className="sr-only">{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
