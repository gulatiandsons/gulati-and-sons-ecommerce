'use client';

import React from 'react';
import { ShieldCheck, Truck, Lock, Clock } from 'lucide-react';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Clear From the Start',
    desc: 'Product specifications, transparent pricing, and delivery terms presented without hidden charges.'
  },
  {
    icon: Lock,
    title: 'Secure Settlement',
    desc: 'Instant UPI, net banking, and card verification backed by trusted payment gateways and 256-bit SSL.'
  },
  {
    icon: Truck,
    title: 'White-Glove Pan-India Logistics',
    desc: 'Specialized thermal-protected and high-value transport serving all 28 states and 8 Union Territories.'
  },
  {
    icon: Clock,
    title: 'Concierge Support',
    desc: 'Attentive personal assistance for product inquiries, sizing guidance, and order tracking.'
  }
];

export default function HouseStandard() {
  return (
    <section
      aria-labelledby="standard-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
            THE HOUSE STANDARD
          </span>
          <h2
            id="standard-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
          >
            Considered Beyond the Product.
          </h2>
          <p className="text-xs sm:text-sm text-[#252522]/70 font-sans">
            What our patrons can rely on throughout every stage of inquiry, acquisition, and delivery.
          </p>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-[#E2D9C8]/40 border border-[#CCC5B9] flex flex-col justify-between space-y-6 hover:border-[#A58B5F] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#51292D]/10 text-[#51292D] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-lg text-[#252522] font-medium">{p.title}</h3>
                  <p className="text-xs text-[#252522]/75 font-sans leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
