'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HousePhilosophy() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="w-full bg-[#34483D] text-[#F3EFE6] py-24 lg:py-32 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Embossed Heritage G&S Monogram */}
      <div className="absolute -top-12 -right-12 w-96 h-96 border border-[#A58B5F]/15 rounded-full pointer-events-none select-none flex items-center justify-center">
        <span className="font-serif text-[14rem] text-[#F3EFE6]/5 font-light">G</span>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#A58B5F] block">
          THE HOUSE PHILOSOPHY
        </span>

        <h2
          id="philosophy-heading"
          className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F3EFE6] leading-tight font-normal"
        >
          Good taste needs no introduction.
        </h2>

        <p className="font-sans text-sm sm:text-base lg:text-lg text-[#E2D9C8]/85 leading-relaxed max-w-2xl mx-auto font-light">
          At Gulati & Sons, we believe the things we choose to wear, carry and live with should feel considered. Some are discovered in a moment. The best become part of a routine.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/the-house"
            className="px-8 py-3.5 bg-transparent border border-[#A58B5F]/60 text-[#F3EFE6] hover:bg-[#F3EFE6] hover:text-[#34483D] text-xs font-sans tracking-[0.2em] uppercase transition-all flex items-center gap-2 group"
          >
            <span>Discover The House</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
