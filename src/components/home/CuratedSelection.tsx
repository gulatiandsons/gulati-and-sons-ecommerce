'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import ProductCard from '@/components/product/ProductCard';

export default function CuratedSelection() {
  const { products } = useCommerce();

  return (
    <section
      aria-labelledby="curated-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              THE CURATED SELECTION
            </span>
            <h2
              id="curated-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
            >
              Selected for a Reason.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#252522]/70">
              Discover the pieces that define our collection.
            </p>
          </div>
          <Link
            href="/collections/all"
            className="text-xs uppercase tracking-[0.2em] font-sans text-[#51292D] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Shop All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
