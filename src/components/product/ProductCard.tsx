'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCommerce } from '@/lib/store/commerceStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, setQuickViewProduct } = useCommerce();
  const inWishlist = isInWishlist(product.id);

  const mainImage = product.images[0]?.url || '';
  const hoverImage = product.images[1]?.url || mainImage;

  return (
    <article aria-label={product.name} className="group relative bg-[#F3EFE6] flex flex-col justify-between">
      {/* Media Frame */}
      <div className="relative w-full aspect-[4/5] bg-[#E2D9C8]/50 border border-[#CCC5B9]/60 overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
          {/* Primary Image */}
          <Image
            src={mainImage}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Alternate Image on hover */}
          <Image
            src={hoverImage}
            alt={product.images[1]?.alt || product.name}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-[#F3EFE6]/80 hover:bg-[#F3EFE6] backdrop-blur-sm text-[#252522] rounded-full transition-all shadow-sm"
          aria-label={inWishlist ? 'Remove from saved items' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-150 ${
              inWishlist ? 'fill-[#51292D] text-[#51292D]' : 'text-[#252522]/70 hover:text-[#51292D]'
            }`}
          />
        </button>

        {/* Prototype/Demo Badge if applicable */}
        {product.isDemonstration && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-[#3C2921]/90 text-[#F3EFE6] text-[11px] font-mono uppercase tracking-widest">
            Prototype Demo
          </span>
        )}

        {/* Quick View Action (Discreet desktop overlay) */}
        <div className="absolute inset-x-0 bottom-0 p-3 hidden sm:flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="w-full py-2.5 bg-[#252522]/90 hover:bg-[#51292D] text-[#F3EFE6] backdrop-blur-md text-[13px] font-sans uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4 flex flex-col justify-between flex-1 space-y-1">
        <div>
          <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#A58B5F] block">
            {product.categoryLabel}
          </span>
          <h3 className="font-serif text-base sm:text-lg text-[#252522] group-hover:text-[#51292D] transition-colors leading-snug line-clamp-1 mt-0.5">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-[#252522]/60 line-clamp-1 font-sans">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-2 flex items-baseline justify-between border-t border-[#CCC5B9]/40">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-medium text-[#252522]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-[#252522]/50 line-through font-mono">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[13px] font-mono text-[#51292D] uppercase tracking-wider">
            {product.variants[0]?.title || 'Stocked'}
          </span>
        </div>
      </div>
    </article>
  );
}
