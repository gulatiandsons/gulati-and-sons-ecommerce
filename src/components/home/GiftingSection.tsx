'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Gift, Check } from 'lucide-react';

export default function GiftingSection() {
  return (
    <section
      aria-labelledby="gifting-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (55%): Gifting Packaging Visual */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-[4/3] bg-[#E2D9C8] border border-[#A58B5F]/40 shadow-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85"
                alt="Gulati & Sons Gift Presentation Packaging with wax seal and cotton stationery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 700px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 bg-[#F3EFE6]/95 backdrop-blur-md px-4 py-2 border border-[#A58B5F]/40">
                <span className="text-[12px] font-mono uppercase tracking-widest text-[#51292D] flex items-center gap-1.5 font-medium">
                  <Gift className="w-3.5 h-3.5 text-[#51292D]" /> Complimentary Presentation Casing
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (45%): Editorial & Services */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              BESPOKE SERVICES
            </span>

            <h2
              id="gifting-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal leading-[1.12]"
            >
              A Gift Worth Remembering.
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
              Discover thoughtful choices for people who appreciate the details. Every piece ordered as a gift is accompanied by our signature heavyweight unboxing presentation.
            </p>

            <ul className="space-y-3 pt-2 text-xs font-sans text-[#252522]/85">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#51292D] shrink-0" />
                <span>Rigid presentation box with debossed House monogram</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#51292D] shrink-0" />
                <span>Heavyweight cotton paper correspondence card with your bespoke words</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#51292D] shrink-0" />
                <span>Hand-tied deep oxblood grosgrain ribbon finish</span>
              </li>
            </ul>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/gifting"
                className="px-6 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-[#3C2921] transition-colors shadow-md"
              >
                <span>Explore Gift Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
