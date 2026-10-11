'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export default function RealHero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5; // max 2.5 deg tilt
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="section-real-hero"
      aria-labelledby="hero-heading"
      className="relative w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column (43% ~ 5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:space-y-8 z-10">
          <div className="space-y-2">
            <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              THE HOUSE OF GULATI
            </span>
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#7A5E2E] font-medium block">
              EST. IN TASTE, NOT IN YEARS
            </span>
          </div>

          <h1
            id="hero-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] leading-[1.08] tracking-tight font-medium"
          >
            A Certain Way of Living.
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed max-w-md">
            Fragrances, timepieces and everyday essentials, selected with intention. Objects of character curated for a life considered.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/collections/all"
              className="px-8 py-4 bg-[#51292D] text-[#F3EFE6] text-xs font-sans tracking-[0.2em] uppercase text-center hover:bg-[#3C2921] transition-all shadow-md flex items-center justify-center gap-2 group min-h-[44px]"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/the-house"
              className="px-6 py-4 bg-transparent border border-[#252522]/60 text-[#252522] text-xs font-sans tracking-[0.2em] uppercase text-center hover:border-[#51292D] hover:text-[#51292D] transition-colors min-h-[44px]"
            >
              Discover Our Story
            </Link>
          </div>

          <div className="pt-6 border-t border-[#CCC5B9]/60 flex items-center gap-6 text-xs font-mono text-[#252522]/80">
            <span>THE COLLECTION / 01</span>
            <span>·</span>
            <span>CURATED HOUSE PIECES</span>
          </div>
        </div>

        {/* Right Column (57% ~ 7 cols): The Collector's Table */}
        <div
          className="lg:col-span-7 relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-full aspect-[5/4] sm:aspect-[4/3] bg-[#E2D9C8] border border-[#A58B5F]/40 shadow-2xl overflow-hidden transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
            }}
          >
            {/* Table Composition Photographic Artistry */}
            <Image
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=85"
              alt="The Collector's Table: Curated perfume flacon, timepiece, and grooming essential"
              fill
              loading="lazy"
              className="object-cover scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 700px"
            />

            {/* Subtle Directional Ambient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3C2921]/40 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Collector's Hotspots */}
            <div className="absolute bottom-6 left-6 z-20">
              <Link
                href="/products/bella-vita-luxury-oud-gold-eau-de-parfum"
                className="group inline-flex items-center gap-3 bg-[#F3EFE6]/90 backdrop-blur-md px-4 py-2.5 border border-[#A58B5F]/40 shadow-lg hover:bg-[#51292D] hover:text-[#F3EFE6] transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#51292D] group-hover:bg-[#F3EFE6] animate-pulse" />
                <div className="text-left">
                  <span className="block text-[12px] font-mono uppercase tracking-widest text-[#A58B5F]">
                    Featured Scent
                  </span>
                  <span className="block font-serif text-xs font-medium">
                    Bella Vita OUD Gold · ₹2,499
                  </span>
                </div>
              </Link>
            </div>

            <div className="absolute top-6 right-6 z-20">
              <Link
                href="/products/rolex-submariner-date-126613ln"
                className="group inline-flex items-center gap-3 bg-[#F3EFE6]/90 backdrop-blur-md px-4 py-2.5 border border-[#A58B5F]/40 shadow-lg hover:bg-[#3C2921] hover:text-[#F3EFE6] transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-[#A58B5F]" />
                <div className="text-left">
                  <span className="block text-[12px] font-mono uppercase tracking-widest text-[#A58B5F]">
                    Horology Explorer
                  </span>
                  <span className="block font-serif text-xs font-medium">
                    Submariner 126613LN
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
