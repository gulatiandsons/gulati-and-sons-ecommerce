import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import { Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation & Refunds | Gulati & Sons',
  description: 'Procedures for pre-dispatch cancellation and banking refund timelines.',
};

export default function CancellationRefundsPage() {
  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      <div className="border-b border-[#CCC5B9]/80 pb-8 space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          COMMERCE POLICY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252522] font-normal">
          Cancellation & Refunds.
        </h1>
      </div>

      <div className="space-y-8 font-sans text-xs sm:text-sm text-[#252522]/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">Order Cancellation</h2>
          <p>
            An order may be cancelled without penalty at any point prior to physical handover to our logistics carrier. Once dispatched with an active tracking consignment, standard return terms apply upon delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">Refund Processing Timelines</h2>
          <p>
            Approved refunds are re-credited strictly to the original payment instrument used during checkout. For UPI transactions, settlement typically completes within 24 to 48 banking hours. For Credit and Debit cards, clearance depends on the issuing bank (typically 3 to 7 business days).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252522]">Damaged or Defective Consignments</h2>
          <p>
            If a parcel arrives damaged, please notify our concierge within 48 hours of delivery. Once verified, an immediate replacement piece or full reimbursement is sanctioned.
          </p>
        </section>

        <div className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] mt-8 space-y-4">
          <h3 className="font-serif text-lg text-[#252522]">Immediate Cancellation Inquiries</h3>
          <p className="text-xs text-[#252522]/80">
            For rapid dispatch interception, contact our desk directly with your Order Reference ID:
          </p>
          <div className="flex flex-wrap gap-6 pt-1 text-xs font-mono">
            <a href={BUSINESS_CONFIG.phoneTelLink} className="text-[#51292D] hover:underline flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> {BUSINESS_CONFIG.phone}
            </a>
            <a href={BUSINESS_CONFIG.emailMailtoLink} className="text-[#51292D] hover:underline flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {BUSINESS_CONFIG.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

