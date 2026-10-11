'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Gift,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  QrCode,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Coins
} from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { useAuth } from '@/lib/store/authStore';
import { PAN_INDIA_REGIONS } from '@/lib/data/deliveryStates';
import PaymentSimulatorModal from '@/components/checkout/PaymentSimulatorModal';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, buyNowItem, placeOrder, coupons, settings } = useCommerce();
  const { currentUser } = useAuth();

  // Detect Buy Now flow
  const isBuyNow = searchParams?.get('buynow') === '1' && Boolean(buyNowItem);
  const checkoutItems = isBuyNow && buyNowItem ? [buyNowItem] : cart;

  // Contact & Address Form (Clean prefill from currentUser only)
  const defaultAddress = currentUser?.addresses?.[0];
  const [name, setName] = useState(currentUser?.fullName || currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.contactEmail || currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.primaryPhone || currentUser?.phone || '');
  const [addressLine1, setAddressLine1] = useState(defaultAddress?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(defaultAddress?.addressLine2 || '');
  const [city, setCity] = useState(defaultAddress?.city || '');
  const [state, setState] = useState(defaultAddress?.state || 'Delhi');
  const [pincode, setPincode] = useState(defaultAddress?.pincode || '');
  const [deliveryNote, setDeliveryNote] = useState('');

  // Update fields if user authenticates
  useEffect(() => {
    if (currentUser) {
      if (!name) setName(currentUser.fullName || currentUser.name || '');
      if (!email) setEmail(currentUser.contactEmail || currentUser.email || '');
      if (!phone) setPhone(currentUser.primaryPhone || currentUser.phone || '');
      if (currentUser.addresses?.[0]) {
        const addr = currentUser.addresses[0];
        if (!addressLine1) setAddressLine1(addr.addressLine1);
        if (!addressLine2) setAddressLine2(addr.addressLine2 || '');
        if (!city) setCity(addr.city);
        if (!state) setState(addr.state);
        if (!pincode) setPincode(addr.pincode);
      }
    }
  }, [currentUser]);

  // Gifting option
  const [includeGiftPackaging, setIncludeGiftPackaging] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Three checkout payment modes:
  // 1. 'cod' (Cash on Delivery)
  // 2. 'online' (Complete Online Payment)
  // 3. 'split_prepay_shipping' (Pay Shipping Now, Rest on Delivery)
  const [paymentMode, setPaymentMode] = useState<'cod' | 'online' | 'split_prepay_shipping'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Voucher
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Payment Simulator modal state
  const [showPaymentSimulator, setShowPaymentSimulator] = useState(false);

  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeThreshold = settings.freeShippingThreshold || 3000;
  const shippingFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : (settings.standardShippingFee || 250);

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

  // Split calculation based on payment mode
  let amountPayableNow = 0;
  let amountDueOnDelivery = 0;

  if (paymentMode === 'online') {
    amountPayableNow = total;
    amountDueOnDelivery = 0;
  } else if (paymentMode === 'split_prepay_shipping') {
    amountPayableNow = shippingFee;
    amountDueOnDelivery = Math.max(0, subtotal - discount);
  } else {
    // Cash on Delivery
    amountPayableNow = 0;
    amountDueOnDelivery = total;
  }

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

  const validateForm = (): boolean => {
    if (checkoutItems.length === 0) {
      router.push('/collections/all');
      return false;
    }

    if (!name.trim() || !email.trim() || !phone.trim() || !addressLine1.trim() || !city.trim() || !pincode.trim()) {
      setErrorMsg('Please complete all required contact and shipping address fields.');
      return false;
    }

    // Strict Indian PIN code validation (6 digits, non-zero starting digit)
    const cleanedPincode = pincode.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanedPincode)) {
      setErrorMsg('Please enter a valid 6-digit Indian Postal PIN code (e.g. 110003).');
      return false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address for dispatch updates.');
      return false;
    }

    // Phone validation (10 digits)
    const cleanedPhone = phone.replace(/[^0-9]/g, '');
    if (cleanedPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number for courier SMS notifications.');
      return false;
    }

    return true;
  };

  const executeOrderCreation = (transactionId?: string) => {
    try {
      const newOrder = placeOrder({
        customer: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          isGuest: !currentUser,
          uid: currentUser?.id
        },
        customerUid: currentUser?.id,
        shippingAddress: {
          addressLine1: addressLine1.trim(),
          addressLine2: addressLine2.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          deliveryNote: deliveryNote.trim() || undefined
        },
        items: checkoutItems.map((c) => ({
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
        amountCollected: amountPayableNow,
        amountDueOnDelivery,
        couponCode: appliedCoupon?.code,
        giftPackaging: includeGiftPackaging,
        giftNote: includeGiftPackaging ? giftNote : undefined,
        paymentMode,
        paymentMethod: paymentMode === 'online' ? 'razorpay' : paymentMode === 'split_prepay_shipping' ? 'split_shipping' : 'cod',
        paymentId: transactionId,
        paymentStatus: paymentMode === 'online' ? 'paid' : paymentMode === 'split_prepay_shipping' ? 'partial' : 'pending',
        isBuyNow
      });

      router.push(`/order-confirmation?orderNumber=${newOrder.orderNumber}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while confirming your order.');
      setIsProcessing(false);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    if (!validateForm()) return;

    setErrorMsg(null);

    if (paymentMode === 'cod') {
      // Direct Cash on Delivery placement
      setIsProcessing(true);
      executeOrderCreation();
    } else {
      // Online payment (either full online or split prepay shipping)
      setShowPaymentSimulator(true);
    }
  };

  const handleSimulatorSuccess = (txnId: string) => {
    setShowPaymentSimulator(false);
    setIsProcessing(true);
    executeOrderCreation(txnId);
  };

  const handleSimulatorFailure = (reason: string) => {
    setShowPaymentSimulator(false);
    setIsProcessing(false);
    setErrorMsg(reason);
  };

  const handleSimulatorCancel = () => {
    setShowPaymentSimulator(false);
    setIsProcessing(false);
    setErrorMsg('Payment transaction was cancelled. You may select another payment mode or retry.');
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="pt-32 pb-32 text-center max-w-md mx-auto space-y-4 px-6">
        <h1 className="font-serif text-3xl">Your Shopping Bag Is Empty.</h1>
        <p className="text-xs text-[#252522]/70 font-sans">
          Select a piece from our catalog to proceed to checkout.
        </p>
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
      {/* Payment Simulator Modal */}
      <PaymentSimulatorModal
        isOpen={showPaymentSimulator}
        amount={amountPayableNow}
        modeTitle={
          paymentMode === 'split_prepay_shipping'
            ? 'Pay Shipping Fee Now (Rest on Delivery)'
            : 'Complete Online Payment'
        }
        onSuccess={handleSimulatorSuccess}
        onFailure={handleSimulatorFailure}
        onCancel={handleSimulatorCancel}
      />

      {/* Checkout Header */}
      <div className="border-b border-[#CCC5B9]/80 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
            SECURE TRANSACTION · 256-BIT ENCRYPTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal mt-1">
            {isBuyNow ? 'Instant Acquisition Checkout' : 'Secure Checkout'}
          </h1>
        </div>

        {/* Payment mode badge */}
        <div className="bg-[#E2D9C8] border border-[#A58B5F]/40 px-3.5 py-1.5 text-xs font-mono text-[#51292D] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34483D] animate-pulse" />
          <span>Verified Demo Checkout Mode (No Real Money Charged)</span>
        </div>
      </div>

      {/* Mobile-Only Collapsible Order Summary Bar (< lg) */}
      <div className="lg:hidden bg-[#E2D9C8] border border-[#CCC5B9] overflow-hidden">
        <button
          type="button"
          onClick={() => setShowMobileSummary(!showMobileSummary)}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left min-h-[48px]"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#51292D]">
            <ShoppingBag className="w-4 h-4 text-[#51292D]" />
            <span>{showMobileSummary ? 'Hide Ledger Summary' : 'Show Ledger Summary'}</span>
            {showMobileSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
          <span className="font-serif text-base font-semibold text-[#51292D]">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </button>

        {showMobileSummary && (
          <div className="p-4 border-t border-[#CCC5B9]/60 bg-[#E2D9C8]/60 space-y-3">
            <div className="divide-y divide-[#CCC5B9]/60 max-h-60 overflow-y-auto pr-1">
              {checkoutItems.map((item) => (
                <div key={item.id} className="py-2.5 flex gap-3 items-center">
                  <div className="w-12 h-14 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs text-[#252522] truncate">{item.name}</h4>
                    <p className="text-[12px] font-mono text-[#252522]/60">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-serif text-xs text-[#51292D] shrink-0 font-medium">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-1 text-xs font-mono pt-2 border-t border-[#CCC5B9]/60">
              <div className="flex justify-between text-[#252522]/70">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#34483D]">
                  <span>Voucher Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#252522]/70">
                <span>Pan-India Transit</span>
                <span>{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
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
                  placeholder="Enter full legal name"
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
                  placeholder="patron@example.com"
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
                  placeholder="+91 98000 00000"
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
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Residence / Estate Address (Line 1)</label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Apartment, suite, villa or building name"
                  className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Street / Locality (Line 2)</label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Street, sector, or neighborhood"
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
                    placeholder="e.g. New Delhi"
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
                    onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
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
                  placeholder="e.g. Leave with estate concierge"
                  className="w-full px-3.5 py-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>
            </div>
          </section>

          {/* Gifting Option */}
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
                <label className="block text-[13px] font-mono uppercase text-[#252522]/70">
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

          {/* Step 3: Three Payment Modes */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl text-[#252522] flex items-center gap-2 border-b border-[#CCC5B9]/60 pb-2">
              <span className="text-xs font-mono text-[#51292D] bg-[#51292D]/10 px-2 py-0.5 rounded-sm">03</span>
              <span>Settlement Channel</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* Mode 1: Complete Online Payment */}
              <label
                className={`p-4 border cursor-pointer transition-all flex items-start gap-3.5 ${
                  paymentMode === 'online'
                    ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]'
                    : 'bg-[#E2D9C8]/40 border-[#CCC5B9] text-[#252522]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMode === 'online'}
                  onChange={() => setPaymentMode('online')}
                  className="mt-1 accent-[#A58B5F]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-base font-medium flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#A58B5F]" /> Pay Online
                    </span>
                    <span className="text-xs font-mono font-semibold">
                      ₹{total.toLocaleString('en-IN')} Now
                    </span>
                  </div>
                  <p className={`text-xs mt-1 font-sans leading-relaxed ${paymentMode === 'online' ? 'text-[#E2D9C8]' : 'text-[#252522]/70'}`}>
                    Settle full order online via UPI, Credit/Debit Cards, or Netbanking through secure Razorpay. Immediate dispatch reservation.
                  </p>
                </div>
              </label>

              {/* Mode 2: Split Payment: Prepay Shipping, Rest on Delivery */}
              <label
                className={`p-4 border cursor-pointer transition-all flex items-start gap-3.5 ${
                  paymentMode === 'split_prepay_shipping'
                    ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]'
                    : 'bg-[#E2D9C8]/40 border-[#CCC5B9] text-[#252522]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMode === 'split_prepay_shipping'}
                  onChange={() => setPaymentMode('split_prepay_shipping')}
                  className="mt-1 accent-[#A58B5F]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-base font-medium flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#A58B5F]" /> Pay Shipping Now, Rest on Delivery
                    </span>
                    <span className="text-xs font-mono font-semibold">
                      {shippingFee === 0 ? 'Complimentary Shipping' : `₹${shippingFee.toLocaleString('en-IN')} Now`}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 font-sans leading-relaxed ${paymentMode === 'split_prepay_shipping' ? 'text-[#E2D9C8]' : 'text-[#252522]/70'}`}>
                    Prepay only the courier transit fee now (₹{shippingFee.toLocaleString('en-IN')}). The remaining product value of ₹{Math.max(0, subtotal - discount).toLocaleString('en-IN')} is collected via COD upon doorstep arrival.
                  </p>
                </div>
              </label>

              {/* Mode 3: Cash on Delivery */}
              <label
                className={`p-4 border cursor-pointer transition-all flex items-start gap-3.5 ${
                  paymentMode === 'cod'
                    ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]'
                    : 'bg-[#E2D9C8]/40 border-[#CCC5B9] text-[#252522]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMode === 'cod'}
                  onChange={() => setPaymentMode('cod')}
                  className="mt-1 accent-[#A58B5F]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-base font-medium flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-[#A58B5F]" /> Cash on Delivery
                    </span>
                    <span className="text-xs font-mono font-semibold">
                      ₹{total.toLocaleString('en-IN')} on Delivery
                    </span>
                  </div>
                  <p className={`text-xs mt-1 font-sans leading-relaxed ${paymentMode === 'cod' ? 'text-[#E2D9C8]' : 'text-[#252522]/70'}`}>
                    Pay the complete order value in cash or UPI directly to our delivery executive upon doorstep arrival. No online payment required now.
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
              <span>Confirming Acquisition...</span>
            ) : (
              <>
                <span>
                  {paymentMode === 'online' && `Pay Online (₹${total.toLocaleString('en-IN')})`}
                  {paymentMode === 'split_prepay_shipping' && `Pay Shipping Fee (₹${shippingFee.toLocaleString('en-IN')})`}
                  {paymentMode === 'cod' && `Confirm Cash on Delivery Order (₹${total.toLocaleString('en-IN')})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Right: Order Snapshot (5 cols) */}
        <div className="lg:col-span-5 bg-[#E2D9C8]/50 border border-[#CCC5B9] p-8 space-y-6">
          <h2 className="font-serif text-xl text-[#252522] border-b border-[#CCC5B9]/80 pb-3">
            Acquisition Ledger ({checkoutItems.length} piece{checkoutItems.length > 1 ? 's' : ''})
          </h2>

          <div className="divide-y divide-[#CCC5B9]/60 max-h-72 overflow-y-auto pr-2">
            {checkoutItems.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <div className="w-14 h-16 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm text-[#252522] truncate">{item.name}</h4>
                  <p className="text-[13px] font-mono text-[#252522]/60">
                    Qty: {item.quantity} {item.variantTitle ? `· ${item.variantTitle}` : ''}
                  </p>
                </div>
                <span className="font-serif text-sm text-[#51292D] shrink-0 font-medium">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Coupon Input */}
          <div className="pt-2 border-t border-[#CCC5B9]/60">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Privilege Voucher Code"
                className="flex-1 px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono uppercase outline-none focus:border-[#51292D]"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921]"
              >
                Apply
              </button>
            </div>
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
            <div className="flex justify-between text-base font-serif text-[#252522] pt-3 border-t border-[#CCC5B9]/80 font-medium">
              <span>Total Order Value</span>
              <span className="text-xl text-[#51292D]">₹{total.toLocaleString('en-IN')}</span>
            </div>

            {/* Split breakdown callout */}
            <div className="p-3 bg-[#E2D9C8] border border-[#A58B5F]/40 space-y-1 mt-3">
              <div className="flex justify-between text-xs text-[#51292D] font-bold">
                <span>Payable Now (Online):</span>
                <span>₹{amountPayableNow.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-[#252522] font-semibold">
                <span>Due on Handover (COD):</span>
                <span>₹{amountDueOnDelivery.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#CCC5B9]/60 space-y-2 text-[13px] text-[#252522]/60 font-sans leading-relaxed">
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

export default function CheckoutPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F3EFE6] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#51292D] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </React.Suspense>
  );
}
