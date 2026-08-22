import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/data/site';
import { StoreProvider } from '@/components/store/StoreProvider';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { ConsentBar } from '@/components/layout/ConsentBar';
import { organizationJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brandName} — ${site.brandTagline}`, template: `%s — ${site.brandName}` },
  description: 'Memorial urns and keepsakes chosen for meaning, quality and how they sit in a family home. Clear capacity guidance, optional engraving, and help whenever you want it.',
  openGraph: {
    type: 'website', siteName: site.brandName, locale: site.locale, url: site.url,
    title: `${site.brandName} — ${site.brandTagline}`,
    description: 'A beautiful resting place for a life deeply loved. Memorial urns and keepsakes, with clear guidance on size and personalization.',
    // TODO: add /public/og.jpg once brand photography exists.
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FBF8F3" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory">
          Skip to content
        </a>
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <ConsentBar />
        </StoreProvider>
      </body>
    </html>
  );
}
