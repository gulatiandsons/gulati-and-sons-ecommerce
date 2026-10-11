'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Gift,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  QrCode
} from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { useAuth } from '@/lib/store/authStore';
import { PaymentAdapter } from '@/lib/payments/razorpay';
import { PAN_INDIA_REGIONS } from '@/lib/data/deliveryStates';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, placeOrder, coupons, settings } = useCommerce();
  const { currentUser } = useAuth();

  // Contact & Address Form
  const [name, setName] = useState(currentUser?.name || 'Yashveer Singh');
  const [email, setEmail] = useState(currentUser?.email || 'yashveer@gulatiandsons.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98110 12345');
  const [addressLine1, setAddressLine1] = useState(currentUser?.addresses[0]?.addressLine1 || '14 Amrita Shergill Marg');
  const [city, setCity] = useState(currentUser?.addresses[0]?.city || 'New Delhi');
  const [state, setState] = useState(currentUser?.addresses[0]?.state || 'Delhi');
  const [pincode, setPincode] = useState(currentUser?.addresses[0]?.pincode || '110003');
  const [deliveryNote, setDeliveryNote] = useState('');

  // Gifting option
  const [includeGiftPackaging, setIncludeGiftPackaging] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Voucher
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeThreshold = settings.freeShippingThreshold || 5000;
  const shippingFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : settings.standardShippingFee;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
      if (appliedCoupon.maxDiscount) discount = Math.min(discount, appliedCoupon.maxDiscount);
    } else {
      discount = appliedCoupon.value;
    }
  }

  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const found = coupons.find(
      (c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active
    );
    if (!found) {
      setErrorMsg('Invalid or expired coupon.');
      return;
    }
    if (subtotal < found.minCartValue) {
      setErrorMsg(`Minimum cart value of ₹${found.minCartValue.toLocaleString('en-IN')} required.`);
      return;
    }
    setAppliedCoupon(found);
    setCouponCode('');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      router.push('/collections/all');
      return;
    }

    if (!name || !email || !phone || !addressLine1 || !city || !pincode) {
      setErrorMsg('Please complete all required shipping fields.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // Process payment through adapter (Runs in verified Demo Mode)
      const payResult = await PaymentAdapter.processDemoPayment(total, paymentMethod);

      if (!payResult.success) {
        throw new Error(payResult.error || 'Payment processing failed');
      }

      // Create authoritative order
      const newOrder = placeOrder({
        customer: {
          name,
          email,
          phone,
          isGuest: !currentUser
        },
        shippingAddress: {
          addressLine1,
          city,
          state,
          pincode,
          deliveryNote
        },
        items: cart.map((c) => ({
          productId: c.productId,
          variantId: c.variantId,
          name: c.name,
          slug: c.slug,
          image: c.image,
          price: c.price,
          quantity: c.quantity,
          variantTitle: c.variantTitle,
          sku: c.sku
        })),
        subtotal,
        discount,
        shippingFee,
        total,
        couponCode: appliedCoupon?.code,
        giftPackaging: includeGiftPackaging,
        giftNote: includeGiftPackaging ? giftNote : undefined,
        paymentMethod,
        paymentId: payResult.transactionId,
        paymentStatus: 'paid'
      });

      // Redirect to Order Confirmation
      router.push(`/order-confirmation?orderNumber=${newOrder.orderNumber}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during transaction.');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-32 text-center max-w-md mx-auto space-y-4 px-6">
        <h1 className="font-serif text-3xl">Your Shopping Bag Is Empty.</h1>
        <p className="text-xs text-[#252522]/70">Add a piece to your bag before proceeding to checkout.</p>
        <Link
          href="/collections/all"
          className="inline-block px-6 py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em]"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-10">
      {/* Checkout Header */}
      <div className="border-b border-[#CCC5B9]/80 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
            SECURE TRANSACTION · 256-BIT ENCRYPTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal mt-1">
            Secure Checkout
          </h1>
        </div>

        {/* Payment mode badge */}
        <div className="bg-[#E2D9C8] border border-[#A58B5F]/40 px-3.5 py-1.5 text-xs font-mono text-[#51292D] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34483D] animate-pulse" />
          <span>Verified Demo Checkout Mode (No Real Money Charged)</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Checkout Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          {/* Step 1: Contact Details */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl text-[#252522] flex items-center gap-2 border-b border-[#CCC5B9]/60 pb-2">
              <span className="text-xs font-mono text-[#51292D] bg-[#51292D]/10 px-2 py-0.5 rounded-sm">01</span>
              <span>Contact & Identity</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Phone Number (For Handover Verification)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>
            </div>
          </section>

          {/* Step 2: Shipping Destination */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl text-[#252522] flex items-center gap-2 border-b border-[#CCC5B9]/60 pb-2">
              <span className="text-xs font-mono text-[#51292D] bg-[#51292D]/10 px-2 py-0.5 rounded-sm">02</span>
              <span>Pan-India Delivery Address</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Residence / Estate Address</label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Apartment, suite, villa or building name"
                  className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">State / UT</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                  >
                    {PAN_INDIA_REGIONS.map((r) => (
                      <option key={r.slug} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Postal Code (PIN)</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="6 digits"
                    className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono text-[#252522] outline-none focus:border-[#51292D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Special Delivery Note (Optional)</label>
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="e.g. Leave with security concierge"
                  className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>
            </div>
          </section>

          {/* Gifting Accordion Checkbox */}
          <section className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeGiftPackaging}
                onChange={(e) => setIncludeGiftPackaging(e.target.checked)}
                className="w-4 h-4 accent-[#51292D]"
              />
              <span className="font-serif text-base text-[#252522] flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#51292D]" /> Complimentary Bespoke Gift Presentation
              </span>
            </label>
            {includeGiftPackaging && (
              <div className="pt-2 space-y-2 animate-in fade-in duration-200">
                <label className="block text-[11px] font-mono uppercase text-[#252522]/70">
                  Hand-written Correspondence Message (Max 250 characters):
                </label>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  maxLength={250}
                  rows={3}
                  placeholder="Write your personal message to be penned on heavyweight cotton stationery..."
                  className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]"
                />
              </div>
            )}
          </section>

          {/* Step 3: Payment Method */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl text-[#252522] flex items-center gap-2 border-b border-[#CCC5B9]/60 pb-2">
              <span className="text-xs font-mono text-[#51292D] bg-[#51292D]/10 px-2 py-0.5 rounded-sm">03</span>
              <span>Settlement Channel</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'upi' ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]' : 'bg-[#E2D9C8]/40 border-[#CCC5B9] text-[#252522]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 accent-[#A58B5F]"
                />
                <div>
                  <span className="font-serif text-base font-medium flex items-center gap-1.5">
                    <QrCode className="w-4 h-4" /> UPI Instant Transfer
                  </span>
                  <p className={`text-xs mt-1 font-sans ${paymentMethod === 'upi' ? 'text-[#E2D9C8]' : 'text-[#252522]/60'}`}>
                    Google Pay, PhonePe, Paytm, or BHIM. Zero surcharge.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'card' ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]' : 'bg-[#E2D9C8]/40 border-[#CCC5B9] text-[#252522]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 accent-[#A58B5F]"
                />
                <div>
                  <span className="font-serif text-base font-medium flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" /> Credit / Debit Card
                  </span>
                  <p className={`text-xs mt-1 font-sans ${paymentMethod === 'card' ? 'text-[#E2D9C8]' : 'text-[#252522]/60'}`}>
                    Visa, Mastercard, RuPay, and American Express.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'netbanking' ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]' : 'bg-[#E2D9C8]/40 border-[#CCC5B9] text-[#252522]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                  className="mt-1 accent-[#A58B5F]"
                />
                <div>
                  <span className="font-serif text-base font-medium">Net Banking</span>
                  <p className={`text-xs mt-1 font-sans ${paymentMethod === 'netbanking' ? 'text-[#E2D9C8]' : 'text-[#252522]/60'}`}>
                    Direct bank clearance via 50+ institutional banks.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'cod' ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]' : 'bg-[#E2D9C8]/40 border-[#CCC5B9] text-[#252522]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#A58B5F]"
                />
                <div>
                  <span className="font-serif text-base font-medium">White-Glove Handover</span>
                  <p className={`text-xs mt-1 font-sans ${paymentMethod === 'cod' ? 'text-[#E2D9C8]' : 'text-[#252522]/60'}`}>
                    Verification and payment settlement upon doorstep arrival.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {errorMsg && (
            <div className="p-4 bg-[#51292D]/10 border border-[#51292D] text-xs font-mono text-[#51292D] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3C2921] transition-all shadow-lg disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Establishing Banking Handshake...</span>
            ) : (
              <>
                <span>Complete Order Authorization (₹{total.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Right: Order Snapshot (5 cols) */}
        <div className="lg:col-span-5 bg-[#E2D9C8]/50 border border-[#CCC5B9] p-8 space-y-6">
          <h2 className="font-serif text-xl text-[#252522] border-b border-[#CCC5B9]/80 pb-3">
            Acquisition Ledger ({cart.length} item{cart.length > 1 ? 's' : ''})
          </h2>

          <div className="divide-y divide-[#CCC5B9]/60 max-h-72 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <div className="w-14 h-16 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm text-[#252522] truncate">{item.name}</h4>
                  <p className="text-[11px] font-mono text-[#252522]/60">
                    Qty: {item.quantity} {item.variantTitle ? `· ${item.variantTitle}` : ''}
                  </p>
                </div>
                <span className="font-serif text-sm text-[#51292D] shrink-0 font-medium">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Ledger calculations */}
          <div className="space-y-2 text-xs font-mono pt-4 border-t border-[#CCC5B9]/60">
            <div className="flex justify-between text-[#252522]/70">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-[#34483D]">
                <span>Privilege Voucher ({appliedCoupon.code})</span>
                <span>- ₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-[#252522]/70">
              <span>Pan-India Transit</span>
              <span>{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-serif text-[#252522] pt-3 border-t border-[#CCC5B9]/80">
              <span>Final Total</span>
              <span className="text-xl text-[#51292D] font-medium">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#CCC5B9]/60 space-y-2 text-[11px] text-[#252522]/60 font-sans leading-relaxed">
            <p className="flex items-center gap-1.5 text-[#34483D] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#34483D]" /> All taxes included. No unexpected fees upon arrival.
            </p>
            <p>
              By authorizing this order, you confirm acceptance of Gulati & Sons terms of commerce and return standards.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
