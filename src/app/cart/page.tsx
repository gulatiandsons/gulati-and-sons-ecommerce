'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, coupons, settings } = useCommerce();
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeThreshold = settings.freeShippingThreshold || 5000;
  const shippingFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : settings.standardShippingFee;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else {
      discount = appliedCoupon.value;
    }
  }

  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const found = coupons.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase() && c.active
    );
    if (!found) {
      setCouponError('Invalid or expired voucher code.');
      return;
    }
    if (subtotal < found.minCartValue) {
      setCouponError(`Minimum order value of ₹${found.minCartValue.toLocaleString('en-IN')} required.`);
      return;
    }
    setAppliedCoupon(found);
    setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-36 px-6 text-center max-w-xl mx-auto space-y-6">
        <div className="w-20 h-20 border border-[#A58B5F]/40 flex items-center justify-center rounded-full mx-auto bg-[#E2D9C8]/40">
          <span className="font-serif text-3xl text-[#A58B5F]">G&S</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252522]">Nothing in the Bag. Yet.</h1>
        <p className="text-xs sm:text-sm text-[#252522]/70 font-sans leading-relaxed">
          Your personal acquisition bag is currently empty. Explore our curated collections of perfumes, precision timepieces, and daily grooming essentials.
        </p>
        <Link
          href="/collections/all"
          className="inline-block px-8 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-colors"
        >
          Explore Complete Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12">
      <div>
        <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          YOUR SELECTION
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal mt-1">
          Review Shopping Bag
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Bag Items (7 cols) */}
        <div className="lg:col-span-7 divide-y divide-[#CCC5B9]/60 border-t border-b border-[#CCC5B9]/60">
          {cart.map((item) => (
            <div key={item.id} className="py-6 flex gap-6">
              <div className="w-24 h-32 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]/80 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F]">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg text-[#252522] leading-snug">
                    <Link href={`/products/${item.slug}`} className="hover:text-[#51292D]">
                      {item.name}
                    </Link>
                  </h3>
                  {item.variantTitle && (
                    <p className="text-xs text-[#252522]/60 font-mono mt-0.5">{item.variantTitle}</p>
                  )}
                  <p className="text-sm font-serif font-medium text-[#51292D] mt-1">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-[#CCC5B9] bg-[#E2D9C8]/40">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-[#E2D9C8] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-mono">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-[#E2D9C8] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-[#252522]/50 hover:text-[#51292D] flex items-center gap-1 font-mono transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary & Coupon (5 cols) */}
        <div className="lg:col-span-5 bg-[#E2D9C8]/50 border border-[#CCC5B9] p-8 space-y-6">
          <h2 className="font-serif text-xl text-[#252522] border-b border-[#CCC5B9]/80 pb-4">
            Summary of Order
          </h2>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between text-[#252522]/80">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-[#34483D]">
                <span>Voucher ({appliedCoupon.code})</span>
                <span>- ₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-[#252522]/80">
              <span>Pan-India Logistics</span>
              <span>{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}</span>
            </div>

            <div className="flex justify-between text-base font-serif text-[#252522] pt-4 border-t border-[#CCC5B9]/80">
              <span>Estimated Total</span>
              <span className="text-xl text-[#51292D] font-medium">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Coupon Entry */}
          <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-[#CCC5B9]/60">
            <label className="block text-[13px] uppercase tracking-wider font-mono text-[#252522]/70">
              Promotional Voucher or Privilege Code:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="e.g. HOUSE10"
                className="flex-1 px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono uppercase outline-none focus:border-[#51292D]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-wider hover:bg-[#3C2921]"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-xs text-[#51292D] font-mono">{couponError}</p>}
            {appliedCoupon && (
              <p className="text-xs text-[#34483D] font-mono flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Voucher {appliedCoupon.code} applied successfully.
              </p>
            )}
          </form>

          {/* Checkout CTA */}
          <div className="pt-4 space-y-3">
            <Link
              href="/checkout"
              className="w-full py-4 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3C2921] transition-all shadow-md"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[13px] text-[#252522]/60 font-sans text-center leading-relaxed">
              Dispatched with tamper-proof security seals in signature packaging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
