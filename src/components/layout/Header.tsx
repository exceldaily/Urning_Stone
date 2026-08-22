'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { primaryNav, site } from '@/data/site';
import { useStore } from '@/components/store/StoreProvider';
import { CurrencySwitcher } from '@/components/layout/CurrencySwitcher';

function Wordmark() {
  return (
    <Link href="/" className="group flex items-baseline gap-2" aria-label={`${site.brandName} — home`}>
      <span aria-hidden className="mb-0.5 h-2 w-2 rounded-full border border-bronze bg-transparent transition-colors group-hover:bg-bronze" />
      <span className="font-display text-[1.35rem] leading-none tracking-[0.01em]">{site.brandName}</span>
    </Link>
  );
}

export function Header() {
  const router = useRouter();
  const { cartCount, saved, setCartOpen, hydrated } = useStore();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.body.style.overflow = mobile || search ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile, search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpenMenu(null); setMobile(false); setSearch(false); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(false); setMobile(false);
    router.push(`/collections/memorial-urns-for-ashes?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-ivory/90 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button" onClick={() => setMobile(true)}
            className="-ml-2 flex h-12 w-12 items-center justify-center rounded-full text-ink2 hover:text-ink lg:hidden"
            aria-label="Open menu" aria-expanded={mobile}
          >
            <span aria-hidden className="space-y-[5px]">
              <span className="block h-px w-6 bg-current" /><span className="block h-px w-6 bg-current" /><span className="block h-px w-4 bg-current" />
            </span>
          </button>
          <Wordmark />
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.label} className="relative" onMouseEnter={() => item.children && setOpenMenu(item.label)} onMouseLeave={() => setOpenMenu(null)}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={openMenu === item.label}
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      className="rounded-full px-3 py-2 text-[0.9rem] text-ink2 transition-colors hover:text-ink"
                    >
                      {item.label}
                    </button>
                    {openMenu === item.label && (
                      <div className="absolute left-0 top-full w-72 pt-2">
                        <ul className="card overflow-hidden p-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} onClick={() => setOpenMenu(null)} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-linen">
                                <span className="text-[0.92rem]">{child.label}</span>
                                {child.note && <span className="block text-[0.78rem] text-muted">{child.note}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="rounded-full px-3 py-2 text-[0.9rem] text-ink2 transition-colors hover:text-ink">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden sm:block"><CurrencySwitcher /></div>
          <button type="button" onClick={() => setSearch(true)} className="flex h-12 w-12 items-center justify-center rounded-full text-ink2 hover:text-ink" aria-label="Search">
            <svg aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="9" r="6" /><path d="m13.5 13.5 4 4" strokeLinecap="round" />
            </svg>
          </button>
          <Link href="/account" className="hidden h-12 w-12 items-center justify-center rounded-full text-ink2 hover:text-ink sm:flex" aria-label="Saved pieces and account">
            <svg aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 3h10v14l-5-3.6L5 17Z" strokeLinejoin="round" />
            </svg>
          </Link>
          <button type="button" onClick={() => setCartOpen(true)} className="relative flex h-12 items-center gap-2 rounded-full px-3 text-[0.9rem] text-ink2 hover:text-ink">
            Basket
            <span className="min-w-[22px] rounded-full border border-hairline bg-cream px-1.5 py-0.5 text-center text-[0.72rem] tabular-nums">{hydrated ? cartCount : 0}</span>
            <span className="sr-only">items in your basket</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setMobile(false)} aria-hidden />
          <div role="dialog" aria-modal="true" aria-label="Menu" className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto border-r border-hairline bg-ivory">
            <div className="flex h-[72px] items-center justify-between border-b border-hairline px-5">
              <Wordmark />
              <button type="button" onClick={() => setMobile(false)} className="flex h-12 w-12 items-center justify-center rounded-full text-ink2" aria-label="Close menu"><span aria-hidden>×</span></button>
            </div>
            <form onSubmit={submitSearch} className="border-b border-hairline p-5">
              <label htmlFor="m-search" className="sr-only">Search urns</label>
              <input id="m-search" value={query} onChange={(e) => setQuery(e.target.value)} className="field" placeholder="Search urns" type="search" />
            </form>
            <nav aria-label="Mobile" className="flex-1 p-3">
              <ul className="space-y-1">
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} onClick={() => setMobile(false)} className="block rounded-xl px-4 py-4 text-[1.05rem] hover:bg-linen">{item.label}</Link>
                    {item.children && (
                      <ul className="mb-2 ml-4 space-y-0.5 border-l border-hairline pl-3">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onClick={() => setMobile(false)} className="block rounded-lg px-3 py-3 text-[0.92rem] text-ink2 hover:bg-linen">{c.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-hairline p-5">
              <Link href="/urn-finder" onClick={() => setMobile(false)} className="btn-primary w-full">Find the right urn</Link>
              <p className="mt-3 text-center text-[0.8rem] text-muted">{saved.length > 0 ? `${saved.length} saved` : 'Take your time.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {search && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setSearch(false)} aria-hidden />
          <div role="dialog" aria-modal="true" aria-label="Search" className="relative border-b border-hairline bg-ivory p-6">
            <form onSubmit={submitSearch} className="shell flex gap-3">
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} className="field" placeholder="Search by name, material or style" type="search" aria-label="Search urns" />
              <button type="submit" className="btn-primary px-6">Search</button>
              <button type="button" onClick={() => setSearch(false)} className="btn-quiet">Close</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
