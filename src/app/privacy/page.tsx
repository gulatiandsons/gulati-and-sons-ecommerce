import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gulati & Sons',
  description: 'Data stewardship, client confidentiality, and cookie usage standards.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      <div className="border-b border-[#CCC5B9]/80 pb-8 space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          PRIVACY STEWARDSHIP
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252522] font-normal">
          Privacy Policy.
        </h1>
      </div>

      <div className="space-y-8 font-sans text-xs sm:text-sm text-[#252522]/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">1. Information Collected</h2>
          <p>
            Gulati & Sons collects only essential information required to fulfill orders and provide concierge assistance: customer name, dispatch address, contact telephone, email address, and transaction logs. We never store credit or debit card numbers, CVVs, or bank security credentials.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">2. Use of Information</h2>
          <p>
            Your information is utilized solely to authorize transactions, generate shipping documentation, coordinate courier handovers, and transmit consensual order tracking correspondence. We never sell, rent, or trade client dossiers to third-party data brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">3. Security Infrastructure</h2>
          <p>
            Our storefront operates across encrypted 256-bit SSL connections. Payment settlement occurs through PCI-DSS Level 1 compliant gateway partners adhering to RBI domestic processing norms.
          </p>
        </section>
      </div>
    </div>
  );
}
