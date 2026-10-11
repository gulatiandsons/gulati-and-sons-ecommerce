'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const { orders } = useCommerce();

  const order = orders.find((o) => o.orderNumber === orderNumber) || orders[0];

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      {/* Heritage Seal Confirmation Block */}
      <div className="text-center space-y-4 border-b border-[#CCC5B9]/80 pb-10">
        <div className="w-20 h-20 border-2 border-[#A58B5F] rounded-full flex items-center justify-center mx-auto bg-[#E2D9C8]/40 shadow-inner">
          <span className="font-serif text-3xl text-[#51292D] font-light">G&S</span>
        </div>

        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#34483D] flex items-center justify-center gap-1.5 font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#34483D]" /> TRANSACTION VERIFIED & SECURED
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#252522] font-normal">
          Your Order Is Confirmed.
        </h1>

        <p className="font-sans text-xs sm:text-sm text-[#252522]/70 max-w-lg mx-auto">
          An official confirmation summary has been logged for Order #{order?.orderNumber || 'GS-8921'}. Our atelier has commenced white-glove inspection and bespoke boxing.
        </p>
      </div>

      {/* Order Dossier Card */}
      <div className="bg-[#E2D9C8]/40 border border-[#A58B5F]/40 p-8 sm:p-10 space-y-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-[#CCC5B9]/60 gap-4 text-xs font-mono">
          <div>
            <span className="text-[#252522]/50 block uppercase">Reference Number</span>
            <span className="text-base text-[#51292D] font-semibold">{order?.orderNumber || 'GS-8921'}</span>
          </div>
          <div>
            <span className="text-[#252522]/50 block uppercase">Date Placed</span>
            <span className="text-[#252522]">{new Date(order?.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div>
            <span className="text-[#252522]/50 block uppercase">Payment Status</span>
            <span className="text-[#34483D] font-medium uppercase">{order?.paymentStatus || 'Paid'} (Simulated Authorization)</span>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg text-[#252522]">Commissioned Pieces</h2>
          <div className="divide-y divide-[#CCC5B9]/60 border-t border-b border-[#CCC5B9]/60">
            {order?.items.map((item, idx) => (
              <div key={idx} className="py-4 flex gap-4 items-center">
                <div className="w-16 h-20 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base text-[#252522]">{item.name}</h3>
                  {item.variantTitle && (
                    <p className="text-xs text-[#252522]/60 font-mono mt-0.5">{item.variantTitle}</p>
                  )}
                  <p className="text-xs text-[#252522]/70 font-mono">Qty: {item.quantity}</p>
                </div>
                <span className="font-serif text-base text-[#51292D] font-medium">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Destination & Gift Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs font-sans">
          <div className="space-y-1.5 p-4 bg-[#F3EFE6] border border-[#CCC5B9]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#51292D] flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5" /> Destination Dispatch Address
            </span>
            <p className="font-medium text-[#252522]">{order?.customer.name}</p>
            <p className="text-[#252522]/80">{order?.shippingAddress.addressLine1}</p>
            <p className="text-[#252522]/80">
              {order?.shippingAddress.city}, {order?.shippingAddress.state} - {order?.shippingAddress.pincode}
            </p>
            <p className="text-[#252522]/60 font-mono pt-1">Contact: {order?.customer.phone}</p>
          </div>

          <div className="space-y-1.5 p-4 bg-[#F3EFE6] border border-[#CCC5B9]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58B5F] flex items-center gap-1 font-semibold">
              <Truck className="w-3.5 h-3.5" /> Transit & Timeline Expectation
            </span>
            <p className="text-[#252522]/80 leading-relaxed">
              Standard white-glove transit scheduled. Delivery expected within 2 to 5 business days depending on regional logistics clearing.
            </p>
            {order?.giftPackaging && (
              <p className="text-[#51292D] font-serif pt-1 italic">
                &ldquo;Gift presentation casing and handwritten correspondence note attached.&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="pt-6 border-t border-[#CCC5B9]/60 flex flex-col sm:flex-row justify-between gap-4">
          <Link
            href="/account"
            className="px-6 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3C2921] transition-colors"
          >
            <span>Monitor Live Order Status</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/collections/all"
            className="px-6 py-3.5 bg-transparent border border-[#51292D]/40 text-[#51292D] text-xs font-sans uppercase tracking-[0.15em] flex items-center justify-center hover:bg-[#51292D]/5 transition-colors"
          >
            Return to The Private House
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center font-serif text-xl">Loading Order Dossier...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
