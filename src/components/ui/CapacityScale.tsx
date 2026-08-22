/**
 * CAPACITY SCALE — the site's signature device.
 * A single measured rule, used everywhere capacity is mentioned, so that a
 * number most people have never had to think about becomes comparable at a
 * glance. The scale maximum is shared across the whole site, which is what
 * makes two products comparable without reading either figure.
 */
import { CAPACITY_SCALE_MAX, sizeBands } from '@/data/sizeGuide';

interface Props {
  capacity: number;
  /** 'sm' for cards, 'lg' for the size guide and product pages. */
  size?: 'sm' | 'lg';
  showTicks?: boolean;
  label?: string;
}

const ticks = [0, 100, 200, 300, 440];

export function CapacityScale({ capacity, size = 'sm', showTicks = false, label }: Props) {
  const pct = Math.max(1.5, Math.min(100, (capacity / CAPACITY_SCALE_MAX) * 100));
  const band = sizeBands.find((b) => capacity >= b.capacityLow && capacity <= b.capacityHigh);

  return (
    <div className={size === 'lg' ? 'space-y-2' : 'space-y-1.5'}>
      {label && <p className="eyebrow">{label}</p>}
      <div
        role="img"
        aria-label={`Interior capacity ${capacity} cubic inches${band ? `, within the ${band.label.toLowerCase()} range` : ''}. Shown on a scale up to ${CAPACITY_SCALE_MAX} cubic inches.`}
        className="relative w-full"
      >
        <div className={`w-full rounded-full bg-taupe/60 ${size === 'lg' ? 'h-2' : 'h-1.5'}`}>
          <div
            className={`rounded-full bg-sage transition-[width] duration-700 ease-calm ${size === 'lg' ? 'h-2' : 'h-1.5'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {showTicks && (
          <div className="relative mt-1.5 h-4">
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute -translate-x-1/2 text-[0.65rem] tabular-nums text-muted"
                style={{ left: `${Math.min(100, (t / CAPACITY_SCALE_MAX) * 100)}%` }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className={`tabular-nums ${size === 'lg' ? 'text-base text-ink' : 'text-[0.8rem] text-ink2'}`}>
        {capacity} cu in
        {band && <span className="text-muted"> · {band.label.replace(' urns', '')}</span>}
      </p>
    </div>
  );
}
