import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config/business';

export const metadata: Metadata = {
  title: 'Returns & Exchanges | Gulati & Sons',
  description: 'Conditions of return, eligibility criteria, and inspection standards.',
};

export default function ReturnsPage() {
  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      <div className="border-b border-[#CCC5B9]/80 pb-8 space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          COMMERCE POLICY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252522] font-normal">
          Returns & Exchanges.
        </h1>
      </div>

      <div className="space-y-8 font-sans text-xs sm:text-sm text-[#252522]/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">7-Day Return Window</h2>
          <p>
            Gulati & Sons accepts return requests within 7 calendar days from the date of confirmed delivery. To maintain integrity, pieces must remain in their original unworn condition with all presentation tags, serial markers, and protective coverings intact.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">Olfactory & Grooming Exemptions</h2>
          <p>
            In compliance with domestic health, cosmetic, and sanitary regulations, fragrances and deodorants whose cellophane wrap or flacon pump has been unsealed cannot be accepted for return, unless arrived damaged during transit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">Initiating a Return Request</h2>
          <p>
            To initiate a return or exchange, contact our Concierge Desk at{' '}
            <a href={BUSINESS_CONFIG.emailMailtoLink} className="text-[#51292D] underline font-medium">
              {BUSINESS_CONFIG.email}
            </a>{' '}
            or telephone{' '}
            <a href={BUSINESS_CONFIG.phoneTelLink} className="text-[#51292D] underline font-medium">
              {BUSINESS_CONFIG.phoneFormatted}
            </a>{' '}
            citing your Order Reference Number and dispatch photographs if reporting transit defect.
          </p>
        </section>
      </div>
    </div>
  );
}
