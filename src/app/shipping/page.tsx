import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Standards | Gulati & Sons',
  description: 'Pan-India logistics timelines, white-glove packaging, and transit insurance terms.',
};

export default function ShippingPage() {
  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      <div className="border-b border-[#CCC5B9]/80 pb-8 space-y-2">
        <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          COMMERCE POLICY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252522] font-normal">
          Shipping & Delivery Standards.
        </h1>
      </div>

      <div className="space-y-8 font-sans text-xs sm:text-sm text-[#252522]/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">1. Pan-India Delivery Coverage</h2>
          <p>
            Gulati & Sons fulfills orders across all 28 Indian States and 8 Union Territories. Dispatches originate from our central temperature-controlled facility and regional air logistics gateways in New Delhi and Mumbai.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">2. Dispatch Timelines</h2>
          <p>
            Orders confirmed prior to 14:00 IST on business days commence inspection and packaging the same afternoon. Transit durations typically range from 2 to 4 business days for major metropolitan hubs and 4 to 7 business days for regional and foothill sectors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">3. Complimentary Delivery Threshold</h2>
          <p>
            Orders aggregating ₹5,000 or greater qualify for complimentary standard white-glove transit across all serviceable postal codes. Orders below ₹5,000 incur a standard ₹250 domestic logistics surcharge.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">4. Tamper-Evident Packaging & Insurance</h2>
          <p>
            Every parcel is dispatched with full transit indemnity. Consignments are sealed with serialized security tape. Patrons are advised to refuse any parcel showing visible signs of tampering or damage upon handover.
          </p>
        </section>

        <div className="pt-4">
          <Link href="/delivery" className="text-xs uppercase font-mono text-[#51292D] underline">
            View Pan-India 36 Regional Directory &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
