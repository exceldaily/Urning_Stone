import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { docPages, getDocPage } from '@/data/pages';
import { DocPage } from '@/components/ui/DocPage';
import { breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return docPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) return {};
  return { title: page.seoTitle, description: page.seoDescription, alternates: { canonical: `/help/${page.slug}` } };
}

export default async function HelpDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) notFound();
  const trail = [{ name: 'Home', href: '/' }, { name: 'Help', href: '/help/faq' }, { name: page.title, href: `/help/${page.slug}` }];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }} />
      <DocPage page={page} />
    </>
  );
}
