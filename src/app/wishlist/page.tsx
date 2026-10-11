'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import ProductCard from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { wishlist, products } = useCommerce();
  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12">
      <div className="border-b border-[#CCC5B9]/80 pb-6">
        <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          SAVED PIECES
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal mt-1">
          Personal Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-[#252522]/70 font-sans mt-1">
          {savedProducts.length} Piece{savedProducts.length !== 1 ? 's' : ''} reserved for consideration.
        </p>
      </div>

      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {savedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#E2D9C8]/30 border border-[#CCC5B9] p-8 space-y-4 max-w-md mx-auto">
          <Heart className="w-8 h-8 text-[#51292D]/40 mx-auto" />
          <h2 className="font-serif text-2xl text-[#252522]">No Pieces Saved Yet</h2>
          <p className="text-xs text-[#252522]/70 font-sans leading-relaxed">
            While exploring our collections, select the heart emblem on any piece to preserve it here.
          </p>
          <Link
            href="/collections/all"
            className="inline-block px-6 py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      )}
    </div>
  );
}
