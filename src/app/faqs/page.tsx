import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import { FaqJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Gulati & Sons',
  description: 'Inquiries regarding order placement, Pan-India transit, fragrance longevity, and returns policy.',
};

export default function FaqsPage() {
  const faqs = [
    {
      q: 'How does Gulati & Sons manage Pan-India delivery?',
      a: 'We partner with specialized domestic express air and linehaul logistics carriers covering all 28 states and 8 Union Territories. High-value parcels travel with full transit insurance and tamper-evident serialized wax/tape seals.'
    },
    {
      q: 'Are your fragrances authentic Eau de Parfum concentrations?',
      a: 'Yes. Our perfume editions are compounded at high aromatic oil concentrations (typically 15% to 20%), providing sustained 6 to 10-hour sillage and nuanced dry-downs.'
    },
    {
      q: 'How do I choose between watch case sizes?',
      a: 'Case diameter is only one factor; lug-to-lug distance determines anatomical fit. We recommend profiles between 39 mm and 41 mm for standard wrist circumferences (6.5" to 7.5"). Refer to our horological guide in the Journal for exhaustive measurements.'
    },
    {
      q: 'What is your returns and exchange policy?',
      a: 'We accept returns within 7 calendar days of confirmed delivery for untampered items in original packaging with unbroken seals. Due to hygiene regulations, opened fragrances and body care products cannot be accepted.'
    },
    {
      q: 'Can I include a personalized gift message?',
      a: 'Yes. During checkout, choose Complimentary Bespoke Gift Presentation to include a handwritten message penned on 300 GSM cotton ivory stationery.'
    }
  ];

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      <FaqJsonLd questions={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <div className="border-b border-[#CCC5B9]/80 pb-8 space-y-2">
        <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          HELP & ASSISTANCE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252522] font-normal">
          Frequently Asked Questions.
        </h1>
      </div>

      <div className="space-y-6">
        {faqs.map((f, idx) => (
          <div key={idx} className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-2">
            <h2 className="font-serif text-xl text-[#252522]">{f.q}</h2>
            <p className="font-sans text-xs sm:text-sm text-[#252522]/80 leading-relaxed font-light">
              {f.a}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-[#CCC5B9]/80 text-xs font-sans text-center text-[#252522]/70">
        Require further clarification? Contact our concierge at{' '}
        <a href={BUSINESS_CONFIG.emailMailtoLink} className="text-[#51292D] underline font-medium">
          {BUSINESS_CONFIG.email}
        </a>{' '}
        or call{' '}
        <a href={BUSINESS_CONFIG.phoneTelLink} className="text-[#51292D] underline font-medium">
          {BUSINESS_CONFIG.phoneFormatted}
        </a>.
      </div>
    </div>
  );
}
