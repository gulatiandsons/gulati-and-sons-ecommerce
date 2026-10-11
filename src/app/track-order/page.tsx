'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, CheckCircle2, Clock, Search, ArrowRight, AlertCircle } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';

export default function TrackOrderPage() {
  const { orders } = useCommerce();
  const [orderQuery, setOrderQuery] = useState('');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const cleaned = orderQuery.trim().toUpperCase().replace('#', '');
    const found = orders.find(
      (o) => o.orderNumber.toUpperCase() === cleaned || o.orderNumber.toUpperCase() === `GS-${cleaned}`
    );

    if (!found) {
      setErrorMsg(`No consignment record found for Reference #${orderQuery}. Please verify your confirmation email or contact the concierge.`);
      setSearchedOrder(null);
      return;
    }

    setSearchedOrder(found);
  };

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      <div className="border-b border-[#CCC5B9]/80 pb-8 space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          LOGISTICS SURVEILLANCE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252522] font-normal">
          Track Your Consignment.
        </h1>
        <p className="font-sans text-sm text-[#252522]/80 font-light">
          Real-time status tracking for white-glove dispatches across our domestic carrier network.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="p-8 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm space-y-6">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                Order Reference Number
              </label>
              <input
                type="text"
                required
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="e.g. GS-8921"
                className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono outline-none focus:border-[#51292D]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                Contact Telephone or Email
              </label>
              <input
                type="text"
                value={phoneQuery}
                onChange={(e) => setPhoneQuery(e.target.value)}
                placeholder="Linked phone or email address"
                className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Locate Consignment</span>
          </button>
        </form>

        {errorMsg && (
          <div className="p-4 bg-[#51292D]/10 border border-[#51292D] text-xs font-mono text-[#51292D] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Results View */}
      {searchedOrder && (
        <div className="p-8 bg-[#F3EFE6] border border-[#A58B5F]/40 shadow-md space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-[#CCC5B9]/60 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#51292D]">
                Verified Order
              </span>
              <h2 className="font-serif text-2xl text-[#252522] mt-0.5">#{searchedOrder.orderNumber}</h2>
              <p className="text-xs font-mono text-[#252522]/60">
                Patron: {searchedOrder.customer.name} · Destination: {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#252522]/60 block uppercase">Fulfillment Status</span>
              <span className="text-sm font-mono text-[#34483D] font-medium uppercase px-3 py-1 bg-[#34483D]/10 border border-[#34483D]/30 inline-block mt-1">
                {searchedOrder.fulfillmentStatus}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-[#252522] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#51292D]" /> Chronological Transit Milestones
            </h3>

            <div className="space-y-4 relative border-l-2 border-[#51292D] ml-4 pl-6 py-2">
              {searchedOrder.timeline.map((event: any, idx: number) => (
                <div key={idx} className="relative space-y-1">
                  <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#51292D] ring-4 ring-[#F3EFE6]" />
                  <p className="font-serif text-base text-[#252522] font-medium">{event.title}</p>
                  <p className="text-[11px] font-mono text-[#252522]/60">{event.timestamp}</p>
                  {event.note && (
                    <p className="text-xs text-[#252522]/80 font-sans italic">{event.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#CCC5B9]/60 flex justify-between items-center text-xs font-sans">
            <span className="text-[#252522]/60">
              Need to modify delivery address? Contact concierge immediately.
            </span>
            <Link href="/contact" className="text-[#51292D] font-mono uppercase underline">
              Concierge Desk &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
