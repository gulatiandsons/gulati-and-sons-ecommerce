import type { Metadata, Viewport } from 'next';
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
import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister';
import CustomerOnboardingModal from '@/components/auth/CustomerOnboardingModal';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap'
});

const baskerville = Libre_Baskerville({
  variable: '--font-baskerville',
  subsets: ['latin'],
  weight: ['400'],
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
  weight: ['400'],
  display: 'swap'
});

export const viewport: Viewport = {
  themeColor: '#51292D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gulatiandsons.com'),
  title: {
    default: 'GULATI & SONS | The Private House',
    template: '%s | GULATI & SONS'
  },
  description:
    'A modern luxury lifestyle house of fragrances, timepieces and everyday essentials. Established in taste, not in years.',
  keywords: ['Gulati & Sons', 'luxury perfume', 'timepieces', 'oud gold', 'heritage luxury', 'pan india luxury ecommerce', 'Varun Gulati'],
  authors: [{ name: 'Varun Gulati' }, { name: 'Gulati & Sons Concierge' }],
  creator: 'Varun Gulati',
  publisher: 'Gulati & Sons',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Gulati & Sons'
  },
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
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
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
      <head>
        <link rel="preload" as="image" href="/hero-poster.webp" type="image/webp" fetchPriority="high" />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F3EFE6] text-[#252522]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#51292D] focus:text-[#F3EFE6] focus:font-mono focus:text-xs shadow-lg"
        >
          Skip to main content
        </a>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <AuthProvider>
          <CommerceProvider>
            <AnnouncementBar />
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main id="main-content" className="flex-1 w-full flex flex-col">{children}</main>
            <Footer />
            <CartDrawer />
            <GlobalSearchModal />
            <QuickViewModal />
            <ToastNotification />
            <CustomerOnboardingModal />
            <ServiceWorkerRegister />
          </CommerceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
