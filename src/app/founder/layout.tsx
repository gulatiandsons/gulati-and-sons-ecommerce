import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Varun Gulati | The Founder Behind Gulati & Sons',
  description: 'Meet Varun Gulati, founder of Gulati & Sons. Discover the philosophy of personal style, craftsmanship, and timeless taste behind the private luxury house.',
  alternates: {
    canonical: 'https://gulatiandsons.com/founder',
  },
  openGraph: {
    title: 'Varun Gulati | The Founder Behind Gulati & Sons',
    description: 'A modern luxury lifestyle house grounded in taste, craftsmanship, and quiet restraint.',
    url: 'https://gulatiandsons.com/founder',
    siteName: 'Gulati & Sons',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 800,
        alt: 'Varun Gulati - Founder of Gulati & Sons'
      }
    ],
    locale: 'en_IN',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varun Gulati | The Founder Behind Gulati & Sons',
    description: 'A modern luxury lifestyle house grounded in taste, craftsmanship, and quiet restraint.',
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'],
  }
};

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
