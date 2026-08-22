import Link from 'next/link';
import { site } from '@/data/site';

/** Gentle, persistent access to a person. Never a popup. */
export function HelpPrompt({ heading = 'Need help choosing?', body, className = '' }: { heading?: string; body?: string; className?: string }) {
  return (
    <aside className={`rounded-[1.1rem] border border-hairline bg-sage-wash/70 p-6 ${className}`}>
      <h3 className="font-display text-xl">{heading}</h3>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-ink2">
        {body ?? 'If you would rather talk it through than work it out alone, we will help you narrow it down — no pressure to order anything.'}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/help/contact" className="btn-secondary text-sm">Ask us a question</Link>
        <Link href="/size-guide" className="btn-quiet underline decoration-bronze/40 underline-offset-4">Read the size guide</Link>
      </div>
      <p className="mt-3 text-[0.78rem] text-muted">{site.contact.hours}</p>
    </aside>
  );
}
