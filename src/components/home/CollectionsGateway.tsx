'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';

export default function CollectionsGateway() {
  return (
    <section
      aria-labelledby="collections-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              THE COLLECTIONS
            </span>
            <h2
              id="collections-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
            >
              A Few Things Worth Keeping.
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="text-xs uppercase tracking-[0.2em] font-sans text-[#51292D] hover:underline flex items-center gap-1.5"
          >
            Explore Complete Catalog <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Large Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.slice(0, 3).map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group block relative bg-[#E2D9C8] border border-[#CCC5B9]/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#E2D9C8]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/80 via-[#252522]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#F3EFE6]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A58B5F] mb-1">
                    The House Selection
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide">
                      {cat.name}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-[#F3EFE6]/20 backdrop-blur-sm border border-[#F3EFE6]/30 flex items-center justify-center group-hover:bg-[#51292D] group-hover:border-[#51292D] transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-[#F3EFE6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                  <p className="text-xs text-[#E2D9C8]/80 font-sans mt-2 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
