'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { finderSteps, scoreProducts, type FinderAnswers } from '@/data/finder';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { track } from '@/lib/analytics';
import { CAPACITY_CAVEAT } from '@/data/sizeGuide';

export function UrnFinder({ compact = false }: { compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [started, setStarted] = useState(false);
  const done = index >= finderSteps.length;

  const results = useMemo(() => (done ? scoreProducts(products, answers).slice(0, 6) : []), [done, answers]);

  const begin = () => { if (!started) { setStarted(true); track('urn_finder_started'); } };

  const choose = (value: string) => {
    begin();
    const step = finderSteps[index];
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    if (index + 1 >= finderSteps.length) track('urn_finder_completed', { answers: next });
    setIndex(index + 1);
  };

  const skip = () => {
    begin();
    if (index + 1 >= finderSteps.length) track('urn_finder_completed', { answers, skippedLast: true });
    setIndex(index + 1);
  };

  const restart = () => { setIndex(0); setAnswers({}); };

  if (done) {
    return (
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="eyebrow">Step {finderSteps.length} of {finderSteps.length}</p>
            <h2 className="mt-2 font-display text-3xl">A few that may suit</h2>
          </div>
          <button type="button" onClick={restart} className="btn-quiet underline decoration-bronze/40 underline-offset-4">Start again</button>
        </div>

        <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-ink2">
          These are suggestions based on what you told us, not a recommendation or professional advice.
          Please check capacity against the <Link href="/size-guide" className="link-underline">urn size guide</Link> before ordering.
        </p>

        {results.length === 0 ? (
          <div className="mt-8 rounded-[1.1rem] border border-hairline bg-linen/60 p-8 text-center">
            <p className="font-display text-xl">Nothing matched every answer</p>
            <p className="mx-auto mt-2 max-w-md text-[0.92rem] text-ink2">That usually means the combination is unusual rather than unavailable. Browsing the full collection or asking us directly will get you there faster.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/collections/memorial-urns-for-ashes" className="btn-primary">Browse everything</Link>
              <button type="button" onClick={restart} className="btn-secondary">Change my answers</button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => <ProductCard key={r.product.id} product={r.product} showCompare={false} />)}
          </div>
        )}

        <p className="mt-8 max-w-2xl text-[0.82rem] leading-relaxed text-muted">{CAPACITY_CAVEAT}</p>
      </div>
    );
  }

  const step = finderSteps[index];
  const progress = ((index) / finderSteps.length) * 100;

  return (
    <div className={compact ? '' : 'mx-auto max-w-2xl'}>
      <div className="flex items-center gap-4">
        <div className="h-1 flex-1 rounded-full bg-taupe/60" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={finderSteps.length} aria-label="Progress through the urn finder">
          <div className="h-1 rounded-full bg-sage transition-[width] duration-500 ease-calm" style={{ width: `${Math.max(6, progress)}%` }} />
        </div>
        <span className="text-[0.78rem] tabular-nums text-muted">{index + 1} of {finderSteps.length}</span>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-[1.75rem] sm:text-[2rem]">{step.question}</h2>
        {step.helper && <p className="mt-2 text-[0.92rem] text-ink2">{step.helper}</p>}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {step.options.map((o) => {
            const selected = answers[step.id] === o.value;
            return (
              <button
                key={o.value} type="button" onClick={() => choose(o.value)}
                className={`rounded-[1.1rem] border p-5 text-left transition-all duration-300 ease-calm min-h-[76px] ${
                  selected ? 'border-sage bg-sage-wash' : 'border-hairline bg-cream hover:border-bronze/50 hover:shadow-soft'
                }`}
              >
                <span className="block text-[1rem]">{o.label}</span>
                {o.note && <span className="mt-0.5 block text-[0.82rem] text-muted">{o.note}</span>}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0} className="btn-quiet disabled:opacity-40">← Back</button>
          <button type="button" onClick={skip} className="btn-quiet underline decoration-bronze/40 underline-offset-4">Skip this question</button>
        </div>
      </div>
    </div>
  );
}
