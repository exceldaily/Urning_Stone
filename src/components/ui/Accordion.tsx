'use client';
import { useId, useState } from 'react';

export interface AccordionItem { title: string; content: React.ReactNode }

export function Accordion({ items, defaultOpen = -1 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                id={`${base}-b-${i}`}
                aria-expanded={expanded}
                aria-controls={`${base}-p-${i}`}
                onClick={() => setOpen(expanded ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-[0.98rem] font-medium text-ink transition-colors hover:text-bronze-deep"
              >
                <span>{item.title}</span>
                <span aria-hidden className={`shrink-0 text-bronze transition-transform duration-300 ease-calm ${expanded ? 'rotate-45' : ''}`}>+</span>
              </button>
            </h3>
            <div id={`${base}-p-${i}`} role="region" aria-labelledby={`${base}-b-${i}`} hidden={!expanded} className="pb-5 pr-8 text-[0.95rem] leading-relaxed text-ink2">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
