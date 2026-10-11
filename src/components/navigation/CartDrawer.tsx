'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, settings } = useCommerce();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = settings.freeShippingThreshold || 5000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-[100] bg-[#252522]/70 backdrop-blur-sm transition-opacity duration-300"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Drawer Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-[#F3EFE6] shadow-2xl flex flex-col border-l border-[#A58B5F]/30 z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#CCC5B9]/70 bg-[#E2D9C8]/40">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl text-[#252522] tracking-wide">The Shopping Bag</h3>
            <span className="text-xs font-mono text-[#51292D] bg-[#51292D]/10 px-2 py-0.5 rounded-sm">
              ({cart.reduce((a, b) => a + b.quantity, 0)})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-[#252522]/70 hover:text-[#51292D] transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        <div className="px-6 py-3 bg-[#E2D9C8]/70 border-b border-[#CCC5B9]/60 text-xs text-[#252522]">
          {amountToFreeShipping > 0 ? (
            <p>
              Add <span className="font-semibold text-[#51292D]">₹{amountToFreeShipping.toLocaleString('en-IN')}</span> for complimentary delivery.
            </p>
          ) : (
            <p className="text-[#34483D] font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#34483D]" />
              Complimentary White-Glove Delivery unlocked.
            </p>
          )}
          <div className="w-full bg-[#CCC5B9] h-1.5 mt-2 rounded-full overflow-hidden">
            <div
              className="bg-[#51292D] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#CCC5B9]/60">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 border border-[#A58B5F]/40 flex items-center justify-center rounded-full mb-4 bg-[#E2D9C8]/40">
                <span className="font-serif text-2xl text-[#A58B5F]">G&S</span>
              </div>
              <h4 className="font-serif text-2xl text-[#252522] mb-2">Nothing in the Bag. Yet.</h4>
              <p className="text-xs text-[#252522]/70 max-w-xs mb-6 font-sans">
                Discover exceptional fragrances, horological masterpieces, and everyday essentials curated for the Private House.
              </p>
              <Link
                href="/collections/all"
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-colors"
              >
                Explore The Collection
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <div className="w-20 h-24 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]/60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-base text-[#252522] leading-tight line-clamp-1">
                      {item.name}
                    </h4>
                    {item.variantTitle && (
                      <p className="text-xs text-[#252522]/60 font-mono mt-0.5">{item.variantTitle}</p>
                    )}
                    <p className="text-xs font-sans text-[#51292D] font-medium mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#CCC5B9] bg-[#E2D9C8]/30">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#E2D9C8] text-[#252522] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono text-[#252522]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#E2D9C8] text-[#252522] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#252522]/50 hover:text-[#51292D] p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout CTA */}
        {cart.length > 0 && (
          <div className="border-t border-[#CCC5B9] bg-[#E2D9C8]/50 p-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#252522]/70">Subtotal</span>
              <span className="font-serif text-2xl text-[#252522]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[13px] text-[#252522]/60 font-sans leading-relaxed">
              Taxes included. Delivery charges and applicable coupons verified at checkout.
            </p>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3C2921] transition-all shadow-md"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 bg-transparent border border-[#51292D]/40 text-[#51292D] text-xs font-sans uppercase tracking-[0.15em] flex items-center justify-center hover:bg-[#51292D]/5 transition-colors"
              >
                View Full Bag Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
