import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Cormorant_Garamond, Libre_Baskerville, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { CommerceProvider } from '@/lib/store/commerceStore';
import { AuthProvider } from '@/lib/store/authStore';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import CartDrawer from '@/components/navigation/CartDrawer';
import GlobalSearchModal from '@/components/navigation/GlobalSearchModal';
import QuickViewModal from '@/components/product/QuickViewModal';
import ToastNotification from '@/components/ui/ToastNotification';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const baskerville = Libre_Baskerville({
  variable: '--font-baskerville',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono-plex',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gulatiandsons.com'),
  title: {
    default: 'GULATI & SONS | The Private House',
    template: '%s | GULATI & SONS'
  },
  description:
    'A modern luxury lifestyle house of fragrances, timepieces and everyday essentials. Est. in taste, not in years.',
  keywords: ['Gulati & Sons', 'luxury perfume', 'timepieces', 'oud gold', 'heritage luxury', 'pan india luxury ecommerce'],
  authors: [{ name: 'Gulati & Sons Concierge' }],
  openGraph: {
    title: 'GULATI & SONS | A Certain Way of Living',
    description: 'Discover fragrances, timepieces and everyday essentials selected with intention.',
    url: 'https://gulatiandsons.com',
    siteName: 'Gulati & Sons',
    locale: 'en_IN',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${baskerville.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F3EFE6] text-[#252522]">
        <AuthProvider>
          <CommerceProvider>
            <AnnouncementBar />
            <Suspense fallback={<div className="h-20 bg-[#F3EFE6]" />}>
              <Header />
            </Suspense>
            <main className="flex-1 w-full flex flex-col">{children}</main>
            <Footer />
            <CartDrawer />
            <GlobalSearchModal />
            <QuickViewModal />
            <ToastNotification />
          </CommerceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
