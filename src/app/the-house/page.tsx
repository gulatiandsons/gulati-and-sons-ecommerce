import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The House | Gulati & Sons',
  description: 'The Private House. A modern luxury lifestyle house grounded in taste, craftsmanship, and quiet restraint.',
};

export default function TheHousePage() {
  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 max-w-2xl mx-auto border-b border-[#CCC5B9]/80 pb-12">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#51292D] block">
          THE PRIVATE HOUSE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] font-normal leading-tight">
          Est. in Taste, Not in Years.
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
          A modern luxury lifestyle house with the visual character of a respected heritage establishment.
        </p>
      </div>

      {/* Main Campaign Imagery */}
      <div className="relative w-full aspect-[16/9] bg-[#E2D9C8] border border-[#A58B5F]/40 shadow-xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1600&q=85"
          alt="The Private House Atelier Interior"
          fill
          priority
          className="object-cover"
          sizes="1000px"
        />
      </div>

      {/* Narrative Paragraphs */}
      <div className="space-y-8 font-serif text-lg sm:text-xl text-[#252522]/90 leading-relaxed max-w-3xl mx-auto font-normal">
        <p>
          At Gulati & Sons, our philosophy stems from a simple observation: modern commerce is replete with noise, excessive decoration, and artificial heraldry. We choose instead the quiet confidence of considered materials and thoughtful curation.
        </p>

        <p>
          We present ourselves not as an impersonal marketplace, but as a Private House. When visitors enter our digital presence, we wish them to feel as though they have stepped into a respected private residence—discovering a rare oud flacon upon a walnut credenza, a precision sports timepiece resting beside a leather case, and daily grooming formulations crafted without compromise.
        </p>

        <p>
          Our commitments remain straightforward: genuine materials, honest product descriptions, transparent Pan-India delivery, and personal service. We make no invented founding claims or fabricated histories. Quality requires no apology, and good taste needs no introduction.
        </p>
      </div>

      {/* Quote Banner */}
      <div className="p-10 bg-[#34483D] text-[#F3EFE6] text-center space-y-3">
        <p className="font-serif text-2xl sm:text-3xl italic font-normal">
          &ldquo;Luxury through restraint. Beautiful materials, considered spacing, and quiet typography.&rdquo;
        </p>
        <span className="text-xs font-mono text-[#A58B5F] uppercase tracking-widest block">
          The Five House Principles
        </span>
      </div>

      {/* Founder Editorial Crosslink */}
      <div className="p-8 bg-[#E2D9C8]/50 border border-[#CCC5B9] flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#51292D]">The Founder Behind The House</span>
          <h3 className="font-serif text-2xl text-[#252522]">Meet Varun Gulati</h3>
          <p className="text-xs text-[#252522]/75 font-sans">Discover the personal style and craftsmanship philosophy behind the house.</p>
        </div>
        <Link
          href="/founder"
          className="px-6 py-3 bg-[#3C2921] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#51292D] transition-colors whitespace-nowrap"
        >
          Discover The Founder &rarr;
        </Link>
      </div>

      {/* Next CTA */}
      <div className="pt-8 text-center">
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-all shadow-md group"
        >
          <span>Explore The Collections</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
