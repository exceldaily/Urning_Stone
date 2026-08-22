'use client';
import Link from 'next/link';
import { useState } from 'react';
import { footerNav, site } from '@/data/site';

export function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /.+@.+\..+/.test(email);
    setState(valid ? 'done' : 'error');
    // TODO: connect to the email platform. Store consent alongside the address.
  };

  return (
    <footer className="mt-8 border-t border-hairline bg-linen/70">
      <div className="shell section-tight">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-2xl">{site.brandName}</p>
            <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-ink2">
              Memorial urns and keepsakes chosen for meaning, quality, and how they sit in a family home.
            </p>
            <form onSubmit={submit} className="mt-6 max-w-sm" noValidate>
              <label htmlFor="nl" className="text-[0.9rem] font-medium">Guidance, occasionally</label>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
                Plain, practical notes on choosing and caring for a memorial piece. No offers, and you can leave at any time.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  id="nl" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState('idle'); }}
                  className="field" placeholder="Your email address"
                  aria-invalid={state === 'error'} aria-describedby="nl-msg"
                />
                <button type="submit" className="btn-secondary px-5">Join</button>
              </div>
              <p id="nl-msg" role="status" className="mt-2 min-h-[1.25rem] text-[0.82rem]">
                {state === 'error' && <span className="text-bronze-deep">Please enter an email address in the form name@example.com.</span>}
                {state === 'done' && <span className="text-sage-deep">Thank you — you are on the list.</span>}
              </p>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="eyebrow">{col.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}><Link href={l.href} className="text-[0.88rem] text-ink2 transition-colors hover:text-ink">{l.label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-muted">© {new Date().getFullYear()} {site.brandName}. {site.legalEntity}.</p>
          <ul className="flex gap-5">
            {site.social.map((s) => (
              <li key={s.label}><a href={s.href} className="text-[0.82rem] text-ink2 hover:text-ink">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
