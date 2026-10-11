'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCommerce } from '@/lib/store/commerceStore';
import ProductCard from '@/components/product/ProductCard';

export default function HouseEdit() {
  const { products } = useCommerce();
  const [activeTab, setActiveTab] = useState<'all' | 'fragrances' | 'watches' | 'clothing'>('all');

  const filtered = activeTab === 'all'
    ? products
    : products.filter((p) => p.category === activeTab);

  return (
    <section
      aria-labelledby="house-edit-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              THE HOUSE EDIT
            </span>
            <h2
              id="house-edit-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
            >
              From the House, For the Everyday.
            </h2>
            <p className="text-xs sm:text-sm text-[#252522]/70 font-sans">
              An editorial selection organized around character, occasion, and material permanence.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#CCC5B9]/80 pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-sans transition-all relative ${
                activeTab === 'all'
                  ? 'text-[#51292D] font-medium border-b-2 border-[#51292D]'
                  : 'text-[#252522]/60 hover:text-[#252522]'
              }`}
            >
              Complete Edit
            </button>
            <button
              onClick={() => setActiveTab('fragrances')}
              className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-sans transition-all relative ${
                activeTab === 'fragrances'
                  ? 'text-[#51292D] font-medium border-b-2 border-[#51292D]'
                  : 'text-[#252522]/60 hover:text-[#252522]'
              }`}
            >
              Fragrance
            </button>
            <button
              onClick={() => setActiveTab('watches')}
              className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-sans transition-all relative ${
                activeTab === 'watches'
                  ? 'text-[#51292D] font-medium border-b-2 border-[#51292D]'
                  : 'text-[#252522]/60 hover:text-[#252522]'
              }`}
            >
              Timepieces
            </button>
            <button
              onClick={() => setActiveTab('clothing')}
              className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-sans transition-all relative ${
                activeTab === 'clothing'
                  ? 'text-[#51292D] font-medium border-b-2 border-[#51292D]'
                  : 'text-[#252522]/60 hover:text-[#252522]'
              }`}
            >
              Clothing Atelier
            </button>
          </div>
        </div>

        {/* Product Cards with fast 200ms crossfade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
