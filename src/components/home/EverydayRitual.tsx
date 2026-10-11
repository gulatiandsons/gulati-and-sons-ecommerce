'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const FORMATS = [
  {
    id: 'spray',
    name: 'Dry Body Spray',
    volume: '150 ml / 5.1 fl. oz.',
    notes: 'Micro-fine propellant without harsh gases. Subtle sillage designed for shirt fabric and chest.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'stick',
    name: 'Solid Deodorant Stick',
    volume: '75 g net wt.',
    notes: 'Aluminum-free glide infused with witch hazel and arrowroot powder for clean 24-hour freshness.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'rollon',
    name: 'Precision Roll-On',
    volume: '50 ml liquid emollient',
    notes: 'Fast-absorbing botanical emulsion delivering soothing hydration with zero textile staining.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85'
  }
];

export default function EverydayRitual() {
  const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]);

  return (
    <section
      aria-labelledby="everyday-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Media & Format Preview */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/3] bg-[#E2D9C8] border border-[#CCC5B9] shadow-lg overflow-hidden">
              <Image
                src={selectedFormat.image}
                alt={selectedFormat.name}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 text-[#F3EFE6]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58B5F]">
                  Formulation Format
                </span>
                <h4 className="font-serif text-xl sm:text-2xl mt-0.5">{selectedFormat.name}</h4>
                <p className="text-xs font-mono text-[#E2D9C8]/80 mt-1">{selectedFormat.volume}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial & Format Switching */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              CHAPTER III. THE EVERYDAY
            </span>

            <h2
              id="everyday-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal leading-[1.12]"
            >
              The Details Make the Difference.
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
              A considered routine begins with the essentials. Subtle formulations, clean scents, and refined tactile everyday objects designed to sit comfortably on your vanity.
            </p>

            {/* Format Selector Pills */}
            <div className="pt-2">
              <label className="block text-xs uppercase tracking-[0.2em] font-mono text-[#51292D] mb-3">
                Select Grooming Format:
              </label>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-4 py-2.5 text-xs font-sans uppercase tracking-wider transition-all border ${
                      selectedFormat.id === fmt.id
                        ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D] shadow-sm'
                        : 'bg-[#E2D9C8]/40 text-[#252522] border-[#CCC5B9] hover:bg-[#E2D9C8]'
                    }`}
                  >
                    {fmt.name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#252522]/70 font-sans mt-3 leading-relaxed">
                {selectedFormat.notes}
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/collections/essentials"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-[#252522]/40 text-[#252522] hover:border-[#51292D] hover:text-[#51292D] text-xs font-sans uppercase tracking-[0.2em] transition-colors group"
              >
                <span>Discover All Essentials</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
