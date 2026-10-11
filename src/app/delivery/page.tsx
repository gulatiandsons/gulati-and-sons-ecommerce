import React from 'react';
import Link from 'next/link';
import { Truck, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';
import { PAN_INDIA_REGIONS } from '@/lib/data/deliveryStates';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pan-India Logistics & Delivery Coverage | Gulati & Sons',
  description: 'White-glove courier coverage across all 28 states and 8 Union Territories. Serviceable pincode directory and delivery schedules.',
  robots: {
    index: true,
    follow: true
  }
};

export default function DeliveryDirectoryPage() {
  const states = PAN_INDIA_REGIONS.filter((r) => r.type === 'State');
  const unionTerritories = PAN_INDIA_REGIONS.filter((r) => r.type === 'Union Territory');

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-[#CCC5B9]/80 pb-8">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          DOMESTIC REACH · 36 REGIONS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] font-normal">
          Pan-India Logistics Directory.
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
          Gulati & Sons facilitates secure, insured white-glove dispatches across all 28 Indian States and 8 Union Territories. Delivery is confirmed during checkout against customer pincode serviceability.
        </p>
      </div>

      {/* States Grid (28 States) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-[#51292D]" />
          <h2 className="font-serif text-2xl sm:text-3xl text-[#252522]">
            Indian States (28)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {states.map((st) => (
            <Link
              key={st.slug}
              href={`/delivery/${st.slug}`}
              className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] hover:border-[#51292D] hover:bg-[#E2D9C8] transition-all group block"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-base text-[#252522] group-hover:text-[#51292D]">
                  {st.name}
                </h3>
                <ChevronRight className="w-4 h-4 text-[#A58B5F] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] font-mono text-[#252522]/60 mt-1">
                Transit: {st.estimatedDays}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Union Territories Grid (8 UTs) */}
      <div className="space-y-6 pt-4 border-t border-[#CCC5B9]/80">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[#51292D]" />
          <h2 className="font-serif text-2xl sm:text-3xl text-[#252522]">
            Union Territories (8)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {unionTerritories.map((ut) => (
            <Link
              key={ut.slug}
              href={`/delivery/${ut.slug}`}
              className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] hover:border-[#51292D] hover:bg-[#E2D9C8] transition-all group block"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-base text-[#252522] group-hover:text-[#51292D]">
                  {ut.name}
                </h3>
                <ChevronRight className="w-4 h-4 text-[#A58B5F] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] font-mono text-[#252522]/60 mt-1">
                Transit: {ut.estimatedDays}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Logistics Standard Note */}
      <div className="p-6 bg-[#34483D] text-[#F3EFE6] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58B5F] flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Transit Security Policy
          </span>
          <p className="text-xs sm:text-sm text-[#E2D9C8]/90 font-sans max-w-2xl leading-relaxed">
            All parcels travel with full transit insurance, tamper-evident security labels, and recipient signature verification upon handover.
          </p>
        </div>
        <Link
          href="/shipping"
          className="shrink-0 px-5 py-2.5 bg-[#F3EFE6] text-[#34483D] text-xs font-sans uppercase tracking-wider hover:bg-[#E2D9C8] transition-colors"
        >
          View Shipping Policy &rarr;
        </Link>
      </div>
    </div>
  );
}
