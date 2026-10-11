'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, products } = useCommerce();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const filteredProducts = trimmed
    ? products.filter((p) => {
        const matchName = p.name.toLowerCase().includes(trimmed);
        const matchCat = p.categoryLabel.toLowerCase().includes(trimmed) || p.category.toLowerCase().includes(trimmed);
        const matchDesc = p.shortDescription.toLowerCase().includes(trimmed);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(trimmed));
        const matchPrice = p.price.toString().includes(trimmed);
        return matchName || matchCat || matchDesc || matchTags || matchPrice;
      })
    : [];

  const popularSearches = ['OUD Gold', 'Submariner', 'Leather Jacket', 'Perfume', 'Oystersteel', 'Woody'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Store Search"
      className="fixed inset-0 z-[100] bg-[#252522]/80 backdrop-blur-sm flex flex-col justify-start items-center pt-16 sm:pt-24 px-4 transition-opacity duration-300"
    >
      <div className="w-full max-w-3xl bg-[#F3EFE6] border border-[#A58B5F]/40 shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]">
        {/* Top Search Bar */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#CCC5B9]/60 bg-[#E2D9C8]/40">
          <SearchIcon className="w-5 h-5 text-[#51292D]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances, timepieces, materials..."
            className="flex-1 bg-transparent border-none outline-none font-sans text-base text-[#252522] placeholder:text-[#252522]/50"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#252522]/70 hover:text-[#51292D] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#51292D] font-mono mb-3">Popular Enquiries</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-[#E2D9C8] hover:bg-[#51292D] hover:text-[#F3EFE6] text-xs font-sans text-[#252522] transition-colors border border-[#CCC5B9]"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="border-t border-[#CCC5B9]/60 pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#51292D] font-mono mb-4">Curated Chapters</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href="/collections/fragrances"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-4 bg-[#E2D9C8]/30 hover:bg-[#E2D9C8] border border-[#CCC5B9] group transition-all"
                  >
                    <p className="font-serif text-lg text-[#252522] group-hover:text-[#51292D]">Fragrances</p>
                    <p className="text-xs text-[#252522]/60 mt-1">Eau de Parfum & Ouds</p>
                  </Link>
                  <Link
                    href="/collections/watches"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-4 bg-[#E2D9C8]/30 hover:bg-[#E2D9C8] border border-[#CCC5B9] group transition-all"
                  >
                    <p className="font-serif text-lg text-[#252522] group-hover:text-[#51292D]">Timepieces</p>
                    <p className="text-xs text-[#252522]/60 mt-1">Precision Horology</p>
                  </Link>
                  <Link
                    href="/collections/clothing"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-4 bg-[#E2D9C8]/30 hover:bg-[#E2D9C8] border border-[#CCC5B9] group transition-all"
                  >
                    <p className="font-serif text-lg text-[#252522] group-hover:text-[#51292D]">Clothing</p>
                    <p className="text-xs text-[#252522]/60 mt-1">Nappa Outerwear</p>
                  </Link>
                </div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#51292D] font-mono mb-4">
                {filteredProducts.length} Piece{filteredProducts.length > 1 ? 's' : ''} Found
              </p>
              <div className="divide-y divide-[#CCC5B9]/50">
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 py-4 group hover:bg-[#E2D9C8]/40 px-2 transition-colors"
                  >
                    <div className="w-16 h-20 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]/60">
                      <Image
                        src={p.images[0]?.url || ''}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[12px] uppercase tracking-[0.2em] text-[#A58B5F] font-mono">
                        {p.categoryLabel}
                      </span>
                      <h4 className="font-serif text-base text-[#252522] group-hover:text-[#51292D] truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#252522]/60 truncate mt-0.5">{p.shortDescription}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-sans font-medium text-sm text-[#252522]">
                        ₹{p.price.toLocaleString('en-IN')}
                      </p>
                      <span className="text-[13px] text-[#51292D] flex items-center justify-end gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-xl text-[#252522] mb-2">No matches for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#252522]/70 max-w-md mx-auto mb-6 font-sans">
                No items directly matched your search criteria. Try a different term or explore our core house collections.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/collections/all"
                  onClick={() => setIsSearchOpen(false)}
                  className="px-5 py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans tracking-wider uppercase hover:bg-[#3C2921] transition-colors"
                >
                  Explore All Collections
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
