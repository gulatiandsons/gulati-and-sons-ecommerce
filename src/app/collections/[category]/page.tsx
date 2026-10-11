'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, ChevronRight, X } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { CATEGORIES } from '@/lib/data/categories';
import ProductCard from '@/components/product/ProductCard';

export default function CollectionPage() {
  const params = useParams();
  const categorySlug = (params?.category as string) || 'all';
  const { products } = useCommerce();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Find category metadata
  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug);
  const isAll = categorySlug === 'all';

  const categoryTitle = isAll
    ? 'The Complete Collection'
    : currentCategory?.heroHeading || 'Curated Collection';

  const categorySubheading = isAll
    ? 'Explore every piece from the House of Gulati.'
    : currentCategory?.heroSubheading || 'Objects of Character';

  const categoryDesc = isAll
    ? 'A comprehensive catalog spanning artisanal fragrances, precision horology, and daily essentials selected with intention.'
    : currentCategory?.description || '';

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = products;

    if (!isAll) {
      result = result.filter((p) => p.category === categorySlug);
    }

    if (selectedTag) {
      result = result.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [products, categorySlug, isAll, selectedTag, inStockOnly, sortBy]);

  // Available tags for active category
  const availableTags = useMemo(() => {
    const relevant = isAll ? products : products.filter((p) => p.category === categorySlug);
    const tags = new Set<string>();
    relevant.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [products, categorySlug, isAll]);

  return (
    <div className="w-full pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-mono text-[#252522]/60 uppercase tracking-widest">
        <Link href="/" className="hover:text-[#51292D]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/collections/all" className="hover:text-[#51292D]">Collections</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#51292D] font-medium">{isAll ? 'All Pieces' : currentCategory?.name || categorySlug}</span>
      </nav>

      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl border-b border-[#CCC5B9]/60 pb-8">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A58B5F] block">
          {categorySubheading}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] font-normal leading-tight">
          {categoryTitle}
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
          {categoryDesc}
        </p>
      </div>

      {/* Category Shortcuts Row */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Link
          href="/collections/all"
          className={`px-4 py-2 text-xs font-sans uppercase tracking-wider transition-all border ${
            isAll ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]' : 'bg-[#E2D9C8]/40 border-[#CCC5B9] hover:bg-[#E2D9C8]'
          }`}
        >
          All Pieces
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/collections/${c.slug}`}
            className={`px-4 py-2 text-xs font-sans uppercase tracking-wider transition-all border ${
              categorySlug === c.slug
                ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]'
                : 'bg-[#E2D9C8]/40 border-[#CCC5B9] hover:bg-[#E2D9C8]'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] text-xs">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[#51292D] uppercase tracking-wider flex items-center gap-1.5 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </span>
          <label className="flex items-center gap-2 cursor-pointer font-sans text-[#252522]/80">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-[#51292D]"
            />
            <span>In Stock Only</span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#252522]/60 font-mono">
            {filteredProducts.length} Piece{filteredProducts.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#51292D]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none text-xs font-sans text-[#252522] focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Sort: Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedTag || inStockOnly) && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[11px] font-mono text-[#252522]/60 uppercase">Active Refinements:</span>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-2.5 py-1 bg-[#51292D] text-[#F3EFE6] text-xs font-mono flex items-center gap-1 hover:bg-[#3C2921]"
            >
              Tag: {selectedTag} <X className="w-3 h-3" />
            </button>
          )}
          {inStockOnly && (
            <button
              onClick={() => setInStockOnly(false)}
              className="px-2.5 py-1 bg-[#51292D] text-[#F3EFE6] text-xs font-mono flex items-center gap-1 hover:bg-[#3C2921]"
            >
              In Stock <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Product Results Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#E2D9C8]/30 border border-[#CCC5B9] p-8 space-y-4">
          <p className="font-serif text-2xl text-[#252522]">No pieces match your selected filter.</p>
          <p className="text-xs text-[#252522]/70 font-sans max-w-sm mx-auto">
            Try adjusting your refinement filters or explore our complete catalog.
          </p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setInStockOnly(false);
            }}
            className="px-6 py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
