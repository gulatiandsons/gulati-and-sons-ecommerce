'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  MapPin,
  Heart,
  Clock,
  CheckCircle2,
  ChevronRight,
  Shield,
  ArrowRight,
  Truck
} from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { useAuth } from '@/lib/store/authStore';

export default function AccountPage() {
  const { orders, wishlist, products } = useCommerce();
  const { currentUser, isAdmin, loginWithGoogle, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'wishlist'>('overview');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));
  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Account Header */}
      <div className="border-b border-[#CCC5B9]/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
            PATRON CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal mt-1">
            {currentUser?.name || 'Patron Account'}
          </h1>
          <p className="text-xs text-[#252522]/60 font-mono mt-1">
            {currentUser?.email || 'Registered Patron'} · Member since 2026
          </p>
        </div>

        {/* Demo Role Switcher & Sign In */}
        <div className="flex flex-wrap items-center gap-2">
          {!isAdmin ? (
            <button
              onClick={() => loginWithGoogle(true)}
              className="px-3 py-1.5 bg-[#3C2921] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#51292D] transition-colors"
            >
              Switch to Super Admin View
            </button>
          ) : (
            <Link
              href="/admin"
              className="px-3.5 py-1.5 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921] transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" /> Open Super Admin Dashboard
            </Link>
          )}

          <button
            onClick={logout}
            className="px-3 py-1.5 border border-[#CCC5B9] text-xs font-mono text-[#252522] hover:bg-[#E2D9C8] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Account Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 bg-[#E2D9C8]/40 border border-[#CCC5B9] p-4 space-y-1">
          <button
            onClick={() => { setActiveTab('overview'); setSelectedOrderId(null); }}
            className={`w-full text-left px-4 py-3 text-xs font-mono uppercase tracking-wider flex items-center justify-between transition-colors ${
              activeTab === 'overview' ? 'bg-[#51292D] text-[#F3EFE6]' : 'text-[#252522] hover:bg-[#E2D9C8]'
            }`}
          >
            <span>Overview</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => { setActiveTab('orders'); }}
            className={`w-full text-left px-4 py-3 text-xs font-mono uppercase tracking-wider flex items-center justify-between transition-colors ${
              activeTab === 'orders' ? 'bg-[#51292D] text-[#F3EFE6]' : 'text-[#252522] hover:bg-[#E2D9C8]'
            }`}
          >
            <span>My Orders ({orders.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => { setActiveTab('addresses'); setSelectedOrderId(null); }}
            className={`w-full text-left px-4 py-3 text-xs font-mono uppercase tracking-wider flex items-center justify-between transition-colors ${
              activeTab === 'addresses' ? 'bg-[#51292D] text-[#F3EFE6]' : 'text-[#252522] hover:bg-[#E2D9C8]'
            }`}
          >
            <span>Saved Addresses</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => { setActiveTab('wishlist'); setSelectedOrderId(null); }}
            className={`w-full text-left px-4 py-3 text-xs font-mono uppercase tracking-wider flex items-center justify-between transition-colors ${
              activeTab === 'wishlist' ? 'bg-[#51292D] text-[#F3EFE6]' : 'text-[#252522] hover:bg-[#E2D9C8]'
            }`}
          >
            <span>Saved Wishlist ({wishlist.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Content Area (9 cols) */}
        <div className="lg:col-span-9 bg-[#F3EFE6] border border-[#CCC5B9] p-8 sm:p-10 shadow-sm min-h-[460px]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="font-serif text-2xl text-[#252522] border-b border-[#CCC5B9]/60 pb-3">
                Patron Status & Metrics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9]">
                  <span className="text-[10px] font-mono uppercase text-[#252522]/60 block">Lifetime Orders</span>
                  <span className="font-serif text-3xl text-[#51292D] mt-1 block">{orders.length}</span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9]">
                  <span className="text-[10px] font-mono uppercase text-[#252522]/60 block">Lifetime Valuation</span>
                  <span className="font-serif text-3xl text-[#51292D] mt-1 block">
                    ₹{orders.reduce((a, b) => a + b.total, 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9]">
                  <span className="text-[10px] font-mono uppercase text-[#252522]/60 block">Delivery Tier</span>
                  <span className="font-serif text-xl text-[#34483D] mt-2 block flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#34483D]" /> Priority White-Glove
                  </span>
                </div>
              </div>

              {/* Recent Order Callout */}
              {orders.length > 0 && (
                <div className="p-6 bg-[#E2D9C8]/50 border border-[#A58B5F]/40 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#51292D]">
                        Most Recent Acquisition
                      </span>
                      <h4 className="font-serif text-xl text-[#252522] mt-0.5">Order #{orders[0].orderNumber}</h4>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedOrderId(orders[0].id);
                        setActiveTab('orders');
                      }}
                      className="text-xs uppercase tracking-wider font-mono text-[#51292D] hover:underline"
                    >
                      Track Order &rarr;
                    </button>
                  </div>
                  <p className="text-xs font-mono text-[#252522]/70">
                    Status: <span className="uppercase text-[#34483D] font-medium">{orders[0].fulfillmentStatus}</span> · Total: ₹{orders[0].total.toLocaleString('en-IN')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY ORDERS & TRACKING */}
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-[#CCC5B9]/60 pb-3">
                <h2 className="font-serif text-2xl text-[#252522]">Order Archive & Live Tracking</h2>
                <span className="text-xs font-mono text-[#252522]/60">{orders.length} Records</span>
              </div>

              {/* Order selector list */}
              <div className="divide-y divide-[#CCC5B9]/60 border border-[#CCC5B9]">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrderId(ord.id)}
                    className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                      selectedOrder?.id === ord.id ? 'bg-[#E2D9C8]/80' : 'hover:bg-[#E2D9C8]/30'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="font-serif text-lg text-[#252522] font-medium">#{ord.orderNumber}</span>
                      <p className="text-xs font-mono text-[#252522]/60">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN')} · {ord.items.length} piece{ord.items.length > 1 ? 's' : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-serif text-base text-[#51292D]">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-[#34483D]/10 text-[#34483D] border border-[#34483D]/30">
                        {ord.fulfillmentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Order Detailed Tracking Timeline */}
              {selectedOrder && (
                <div className="p-6 bg-[#E2D9C8]/40 border border-[#A58B5F]/40 space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center border-b border-[#CCC5B9]/60 pb-3">
                    <h3 className="font-serif text-xl text-[#252522]">
                      Order #{selectedOrder.orderNumber} Status Dossier
                    </h3>
                    <span className="text-xs font-mono text-[#51292D] uppercase font-medium">
                      Payment: {selectedOrder.paymentStatus}
                    </span>
                  </div>

                  {/* Visual Stepper / Timeline */}
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#A58B5F] flex items-center gap-1.5 font-medium">
                      <Truck className="w-3.5 h-3.5 text-[#51292D]" /> Handover Progress
                    </span>

                    <div className="space-y-3 relative border-l-2 border-[#51292D] ml-3 pl-6 py-2">
                      {selectedOrder.timeline.map((event, idx) => (
                        <div key={idx} className="relative space-y-0.5">
                          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#51292D] ring-4 ring-[#F3EFE6]" />
                          <p className="font-serif text-base text-[#252522] font-medium">{event.title}</p>
                          <p className="text-[11px] font-mono text-[#252522]/60">{event.timestamp}</p>
                          {event.note && (
                            <p className="text-xs text-[#252522]/80 italic font-sans">{event.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="pt-4 border-t border-[#CCC5B9]/60 text-xs font-mono text-[#252522]/70 space-y-1">
                    <p className="text-[#252522] font-semibold">Delivery To: {selectedOrder.customer.name}</p>
                    <p>{selectedOrder.shippingAddress.addressLine1}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#252522] border-b border-[#CCC5B9]/60 pb-3">
                Saved Residences
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#A58B5F]/40 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#51292D] font-semibold">
                    Primary Residence (Default)
                  </span>
                  <p className="font-serif text-lg text-[#252522]">{currentUser?.name || 'Yashveer Singh'}</p>
                  <p className="text-xs text-[#252522]/80 leading-relaxed font-sans">
                    {currentUser?.addresses[0]?.addressLine1 || '14 Amrita Shergill Marg'}
                  </p>
                  <p className="text-xs text-[#252522]/80 font-mono">
                    {currentUser?.addresses[0]?.city || 'New Delhi'}, {currentUser?.addresses[0]?.state || 'Delhi'} - {currentUser?.addresses[0]?.pincode || '110003'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#252522] border-b border-[#CCC5B9]/60 pb-3">
                Saved Wishlist Pieces ({wishlistProducts.length})
              </h2>
              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] flex gap-4">
                      <div className="w-16 h-20 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]">
                        <Image src={p.images[0]?.url || ''} alt={p.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-base text-[#252522] line-clamp-1">{p.name}</h4>
                          <p className="text-xs font-serif text-[#51292D] mt-0.5">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-xs uppercase font-mono text-[#51292D] hover:underline flex items-center gap-1"
                        >
                          View Piece &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#252522]/60 font-sans">No items saved to your personal wishlist yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
