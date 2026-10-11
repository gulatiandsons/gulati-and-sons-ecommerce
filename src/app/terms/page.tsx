import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Commerce | Gulati & Sons',
  description: 'Terms governing acquisitions, website utilization, and consumer rights.',
};

export default function TermsPage() {
  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      <div className="border-b border-[#CCC5B9]/80 pb-8 space-y-2">
        <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          LEGAL FRAMEWORK
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252522] font-normal">
          Terms of Commerce.
        </h1>
      </div>

      <div className="space-y-8 font-sans text-xs sm:text-sm text-[#252522]/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">1. Introduction & Acceptance</h2>
          <p>
            By accessing gulatiandsons.com and commissioning orders through our digital storefront, you agree to comply with and be bound by these Terms of Commerce. All transactions are governed by the laws of India and the jurisdiction of the courts of New Delhi.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">2. Pricing & Product Descriptions</h2>
          <p>
            Prices are displayed in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST). We endeavor to ensure absolute precision in all material specifications and imagery. Prototype and demonstration items are identified explicitly and do not constitute inventory offers until verified.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">3. Intellectual Property</h2>
          <p>
            All visual identity elements, typography, wordmarks, and editorial photography are proprietary to Gulati & Sons or utilized under appropriate authorization. Third-party brand references (such as horological models) remain the exclusive trademarks of their respective proprietors.
          </p>
        </section>
      </div>
    </div>
  );
}
