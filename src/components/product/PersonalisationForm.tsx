'use client';
import { useEffect, useState } from 'react';
import type { PersonalisationFieldId, Product } from '@/data/products';
import type { Personalisation } from '@/components/store/StoreProvider';
import { track } from '@/lib/analytics';

/** Character limits reflect what fits on the piece, not an arbitrary cap. */
export const LIMITS: Record<PersonalisationFieldId, number> = {
  name: 30, dates: 24, inscription: 80, motif: 0, photo: 0, pawprint: 0,
};

export const FONTS = [
  { id: 'serif', label: 'Serif', css: 'var(--font-display, Georgia, serif)' },
  { id: 'sans', label: 'Sans-serif', css: 'Karla, system-ui, sans-serif' },
];

export const MOTIFS = [
  { id: 'none', label: 'No motif' },
  { id: 'paw', label: 'Paw print' },
  { id: 'heart', label: 'Small heart' },
  { id: 'leaf', label: 'Single leaf' },
  { id: 'star', label: 'Small star' },
  // TODO: replace with the real motif library once artwork is supplied.
];

interface Props {
  product: Product;
  value: Personalisation;
  onChange: (p: Personalisation) => void;
}

export function PersonalisationForm({ product, value, onChange }: Props) {
  const fields = product.personalization.fields;
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const filled = Boolean(value.name || value.dates || value.inscription);
    if (filled && !started) { setStarted(true); track('personalization_started', { sku: product.sku }); }
  }, [value, started, product.sku]);

  const set = (patch: Partial<Personalisation>) => onChange({ ...value, ...patch, confirmed: patch.confirmed ?? false });

  const counter = (field: PersonalisationFieldId, text: string | undefined) => {
    const used = (text ?? '').length;
    const limit = LIMITS[field];
    const over = used > limit;
    return (
      <span className={`text-[0.75rem] tabular-nums ${over ? 'font-medium text-bronze-deep' : 'text-muted'}`}>
        {used} of {limit}{over ? ' — too long to engrave' : ''}
      </span>
    );
  };

  const previewFont = value.font === 'sans' ? FONTS[1].css : FONTS[0].css;

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {fields.includes('name') && (
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="p-name" className="text-[0.9rem] font-medium">Name</label>
              {counter('name', value.name)}
            </div>
            <input
              id="p-name" className="field mt-1.5" maxLength={LIMITS.name + 10} value={value.name ?? ''}
              onChange={(e) => set({ name: e.target.value })}
              placeholder="As you would say it aloud"
              aria-describedby="p-name-help"
            />
            <p id="p-name-help" className="mt-1 text-[0.78rem] text-muted">Many families use a first name or a familiar name rather than a full legal name.</p>
          </div>
        )}

        {fields.includes('dates') && (
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="p-dates" className="text-[0.9rem] font-medium">Dates</label>
              {counter('dates', value.dates)}
            </div>
            <input id="p-dates" className="field mt-1.5" maxLength={LIMITS.dates + 10} value={value.dates ?? ''} onChange={(e) => set({ dates: e.target.value })} placeholder="1948 – 2026" />
          </div>
        )}

        {fields.includes('inscription') && (
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="p-insc" className="text-[0.9rem] font-medium">Short inscription <span className="font-normal text-muted">(optional)</span></label>
              {counter('inscription', value.inscription)}
            </div>
            <textarea id="p-insc" rows={2} className="field mt-1.5 resize-none" maxLength={LIMITS.inscription + 20} value={value.inscription ?? ''} onChange={(e) => set({ inscription: e.target.value })} placeholder="A line they said often, or a place that mattered" />
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="p-font" className="text-[0.9rem] font-medium">Lettering</label>
            <select id="p-font" className="field mt-1.5" value={value.font ?? 'serif'} onChange={(e) => set({ font: e.target.value })}>
              {FONTS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
          </div>
          {fields.includes('motif') && (
            <div>
              <label htmlFor="p-motif" className="text-[0.9rem] font-medium">Motif</label>
              <select id="p-motif" className="field mt-1.5" value={value.motif ?? 'none'} onChange={(e) => set({ motif: e.target.value })}>
                {MOTIFS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-hairline bg-linen/60 p-5">
        <p className="eyebrow">Preview</p>
        <div className="mt-3 flex min-h-[92px] flex-col items-center justify-center gap-1 rounded-lg bg-cream px-4 py-5 text-center" style={{ fontFamily: previewFont }}>
          {value.name || value.dates || value.inscription ? (
            <>
              {value.name && <span className="text-lg leading-tight">{value.name}</span>}
              {value.dates && <span className="text-[0.85rem] text-ink2">{value.dates}</span>}
              {value.inscription && <span className="mt-1 max-w-[26ch] text-[0.8rem] italic text-ink2">{value.inscription}</span>}
              {value.motif && value.motif !== 'none' && <span className="mt-1 text-bronze" aria-hidden>—</span>}
            </>
          ) : (
            <span className="text-[0.85rem] text-muted">Your wording will appear here as you type.</span>
          )}
        </div>
        <p className="mt-3 text-[0.78rem] text-muted">
          The preview shows wording and placement. The finished engraving depends on the material and is cut by hand.
        </p>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-hairline bg-cream p-4">
        <input
          type="checkbox" checked={value.confirmed}
          onChange={(e) => { onChange({ ...value, confirmed: e.target.checked }); if (e.target.checked) track('personalization_completed', { sku: product.sku }); }}
          className="mt-1 h-5 w-5 shrink-0 accent-[#5C6A56]"
        />
        <span className="text-[0.88rem] leading-relaxed text-ink2">
          I have checked the spelling above. <span className="text-muted">Engraving is cut exactly as written and cannot be undone.</span>
        </span>
      </label>
    </div>
  );
}

export function personalisationErrors(p: Personalisation, fields: PersonalisationFieldId[]) {
  const errors: string[] = [];
  if (fields.includes('name') && (p.name ?? '').length > LIMITS.name) errors.push(`The name is longer than the ${LIMITS.name} characters that fit on this piece.`);
  if (fields.includes('dates') && (p.dates ?? '').length > LIMITS.dates) errors.push(`The dates are longer than the ${LIMITS.dates} characters that fit on this piece.`);
  if (fields.includes('inscription') && (p.inscription ?? '').length > LIMITS.inscription) errors.push(`The inscription is longer than the ${LIMITS.inscription} characters that fit on this piece.`);
  if (!p.confirmed) errors.push('Please confirm you have checked the spelling before adding this to your basket.');
  return errors;
}
