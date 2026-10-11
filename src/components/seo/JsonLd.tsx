import React from 'react';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gulati & Sons',
    legalName: 'Gulati & Sons Private House',
    url: 'https://gulatiandsons.com',
    logo: 'https://gulatiandsons.com/logo-nav.png',
    description: 'A modern luxury lifestyle house of fragrances, timepieces and everyday essentials.',
    founder: {
      '@type': 'Person',
      name: 'Varun Gulati',
      jobTitle: 'Founder',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-83750-44808',
      contactType: 'customer service',
      email: 'gulatiandsons.info@gmail.com',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://instagram.com/gulatiandsons'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gulati & Sons',
    url: 'https://gulatiandsons.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gulatiandsons.com/collections/all?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  sku,
  availability = 'InStock',
  url
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  sku: string;
  availability?: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: [image],
    sku,
    brand: {
      '@type': 'Brand',
      name: 'Gulati & Sons'
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      price,
      priceValidUntil: '2027-12-31',
      availability: availability === 'InStock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Gulati & Sons'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({
  questions
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FounderJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Varun Gulati',
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Gulati & Sons',
      url: 'https://gulatiandsons.com'
    },
    description: 'Founder of Gulati & Sons, leading a modern Indian luxury lifestyle house with restraint, taste, and curatorial discipline.'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
