'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ArrowRight, Check, Heart, Shield } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, isInWishlist, toggleWishlist } = useCommerce();
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariantId(quickViewProduct.variants[0]?.id || '');
      setActiveImageIdx(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const price = currentVariant ? currentVariant.price : product.price;
  const inWishlist = isInWishlist(product.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick View"
      className="fixed inset-0 z-[110] bg-[#252522]/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
    >
      <div className="absolute inset-0" onClick={() => setQuickViewProduct(null)} />

      <div className="relative w-full max-w-4xl bg-[#F3EFE6] border border-[#A58B5F]/40 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#252522]/70 hover:text-[#51292D] bg-[#F3EFE6]/80 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Side (55%) */}
        <div className="md:w-[52%] bg-[#E2D9C8]/40 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#CCC5B9]/60">
          <div className="relative w-full aspect-[4/5] bg-[#E2D9C8] border border-[#CCC5B9]/60 overflow-hidden">
            <Image
              src={product.images[activeImageIdx]?.url || product.images[0]?.url || ''}
              alt={product.images[activeImageIdx]?.alt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-14 h-16 shrink-0 border transition-all ${
                    activeImageIdx === idx ? 'border-[#51292D] ring-1 ring-[#51292D]' : 'border-[#CCC5B9]/70 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Side (48%) */}
        <div className="md:w-[48%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] uppercase tracking-[0.2em] font-mono text-[#A58B5F]">
                {product.categoryLabel}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-1.5 text-[#252522]/60 hover:text-[#51292D] transition-colors"
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#51292D] text-[#51292D]' : ''}`} />
              </button>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#252522] leading-tight mb-2">
              {product.name}
            </h3>

            {/* Price display */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl text-[#252522]">
                ₹{price.toLocaleString('en-IN')}
              </span>
              {product.mrp > price && (
                <span className="text-xs line-through text-[#252522]/50 font-mono">
                  MRP ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs text-[#252522]/80 font-sans leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Demonstration notice */}
            {product.isDemonstration && (
              <div className="mb-6 p-3 bg-[#E2D9C8]/60 border border-[#A58B5F]/40 text-[13px] text-[#3C2921] leading-relaxed">
                <span className="font-semibold block uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#51292D]" /> Prototype Demonstration Listing
                </span>
                {product.disclaimer}
              </div>
            )}

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <label className="block text-[13px] uppercase tracking-[0.15em] font-mono text-[#252522]/70 mb-2">
                  Select Edition / Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`px-3 py-2 text-xs font-sans transition-all border ${
                        selectedVariantId === v.id
                          ? 'border-[#51292D] bg-[#51292D] text-[#F3EFE6]'
                          : 'border-[#CCC5B9] bg-[#E2D9C8]/40 text-[#252522] hover:bg-[#E2D9C8]'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-[#CCC5B9]/60">
            <button
              onClick={() => {
                addToCart(product, selectedVariantId);
                setQuickViewProduct(null);
              }}
              className="w-full py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3C2921] transition-all shadow-md active:scale-[0.99]"
            >
              Add to Bag <Check className="w-4 h-4" />
            </button>

            <Link
              href={`/products/${product.slug}`}
              onClick={() => setQuickViewProduct(null)}
              className="w-full py-2.5 text-center text-xs text-[#51292D] font-sans uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 hover:underline"
            >
              View Full Product Dossier <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
