import Link from 'next/link';

export function Breadcrumbs({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8rem] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((t, i) => (
          <li key={t.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-hairline">/</span>}
            {i === trail.length - 1
              ? <span aria-current="page" className="text-ink2">{t.name}</span>
              : <Link href={t.href} className="transition-colors hover:text-ink">{t.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
