'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { consentAnswered, setConsent } from '@/lib/analytics';

/** Consent gate for analytics. Nothing is measured until this is answered. */
export function ConsentBar() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(!consentAnswered()); }, []);
  if (!show) return null;

  const answer = (granted: boolean) => { setConsent(granted); setShow(false); };

  return (
    <div role="region" aria-label="Analytics choice" className="fixed inset-x-3 bottom-[92px] z-40 rounded-[1.1rem] border border-hairline bg-cream p-4 shadow-lift md:bottom-4 md:left-auto md:right-4 md:max-w-sm">
      <p className="text-[0.88rem] leading-relaxed text-ink2">
        We would like to measure which pages help people, using anonymous counts only. Nothing loads until you choose.
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => answer(true)} className="btn-primary flex-1 py-2.5 text-[0.85rem]">Allow</button>
        <button type="button" onClick={() => answer(false)} className="btn-secondary flex-1 py-2.5 text-[0.85rem]">No thanks</button>
      </div>
      <Link href="/help/privacy" className="mt-2 inline-block text-[0.78rem] text-muted underline underline-offset-2">Privacy policy</Link>
    </div>
  );
}
