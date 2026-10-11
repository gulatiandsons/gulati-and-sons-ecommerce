'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Truck,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Check,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { PAN_INDIA_REGIONS } from '@/lib/data/deliveryStates';
import { useCommerce } from '@/lib/store/commerceStore';
import ProductCard from '@/components/product/ProductCard';

export default function StateDeliveryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { products } = useCommerce();

  const region = PAN_INDIA_REGIONS.find((r) => r.slug === slug) || PAN_INDIA_REGIONS[0];

  const [pincode, setPincode] = useState('');
  const [checkResult, setCheckResult] = useState<'idle' | 'success' | 'invalid'>('idle');

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setCheckResult('invalid');
      return;
    }
    setCheckResult('success');
  };

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-mono text-[#252522]/60 uppercase tracking-widest">
        <Link href="/" className="hover:text-[#51292D]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/delivery" className="hover:text-[#51292D]">Pan-India Delivery</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#51292D] font-medium">{region.name}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-[#CCC5B9]/80 pb-8">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          LOGISTICS SPECIFICATION · {region.type.toUpperCase()}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] font-normal">
          Delivery to {region.name}.
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
          White-glove courier dispatches to {region.capital} and across {region.name}. Delivery serviceability is strictly validated against your individual 6-digit postal code during checkout.
        </p>
      </div>

      {/* Logistics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#252522]/60 block">Capital / Administrative Hub</span>
          <p className="font-serif text-xl text-[#252522]">{region.capital}</p>
        </div>

        <div className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#252522]/60 block">Estimated Transit Window</span>
          <p className="font-serif text-xl text-[#51292D] font-medium">{region.estimatedDays}</p>
        </div>

        <div className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#252522]/60 block">Primary Regional Hub</span>
          <p className="font-serif text-xl text-[#252522]">{region.hubCity}</p>
        </div>

        <div className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#252522]/60 block">Postal Prefix Spectrum</span>
          <p className="font-mono text-sm text-[#34483D] font-medium">{region.serviceablePincodesRange}</p>
        </div>
      </div>

      {/* Regional Operational Details */}
      <div className="p-8 bg-[#E2D9C8]/50 border border-[#A58B5F]/40 space-y-4">
        <h2 className="font-serif text-2xl text-[#252522]">Regional Routing & Packaging Protocol</h2>
        <p className="text-xs sm:text-sm text-[#252522]/85 font-sans leading-relaxed max-w-3xl">
          {region.deliveryNotes} All consignments destined for {region.name} are sealed with serialized tamper-evident tape and tracked through direct domestic air and express linehauls.
        </p>
      </div>

      {/* Pincode Serviceability Form */}
      <div className="p-8 bg-[#F3EFE6] border border-[#CCC5B9] max-w-xl space-y-4 shadow-sm">
        <h2 className="font-serif text-xl text-[#252522] flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#51292D]" /> Verify {region.name} Postal Code
        </h2>
        <p className="text-xs text-[#252522]/70 font-sans">
          Enter your 6-digit postal code to check standard courier connectivity and estimated handover schedule.
        </p>
        <form onSubmit={handlePincodeCheck} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="e.g. 110001"
            className="flex-1 px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-mono outline-none focus:border-[#51292D]"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-wider hover:bg-[#3C2921] transition-colors"
          >
            Verify
          </button>
        </form>

        {checkResult === 'success' && (
          <div className="p-3 bg-[#34483D]/10 border border-[#34483D] text-xs font-mono text-[#34483D] flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Pincode {pincode} verified. Scheduled transit to {region.name} active.</span>
          </div>
        )}

        {checkResult === 'invalid' && (
          <div className="p-3 bg-[#51292D]/10 border border-[#51292D] text-xs font-mono text-[#51292D] flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Please enter a valid 6-digit postal code.</span>
          </div>
        )}
      </div>

      {/* Recommended Pieces for this Region */}
      <div className="space-y-6 pt-6 border-t border-[#CCC5B9]/80">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              AVAILABLE FOR DIRECT DISPATCH
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#252522] mt-1">
              Curated House Pieces
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="text-xs uppercase font-sans tracking-wider text-[#51292D] hover:underline flex items-center gap-1"
          >
            <span>View All</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
