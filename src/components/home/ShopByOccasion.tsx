'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const OCCASIONS = [
  {
    title: 'For Everyday',
    subtitle: 'Considered essentials and subtle daily fragrances.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    link: '/collections/essentials'
  },
  {
    title: 'For Evenings',
    subtitle: 'Intense resinous ouds and horological presence.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    link: '/collections/fragrances'
  },
  {
    title: 'For Gifting',
    subtitle: 'Signature hardboard cases with personalized notes.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    link: '/gifting'
  }
];

export default function ShopByOccasion() {
  return (
    <section
      aria-labelledby="occasion-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
            OCCASION SELECTIONS
          </span>
          <h2
            id="occasion-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
          >
            For the Moments That Matter.
          </h2>
          <p className="text-xs sm:text-sm text-[#252522]/70 font-sans">
            Luxury chosen with purpose. Discover edits tailored for specific hours, settings, and milestones.
          </p>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {OCCASIONS.map((occ) => (
            <Link
              key={occ.title}
              href={occ.link}
              className="group block relative bg-[#E2D9C8] border border-[#CCC5B9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative w-full aspect-[4/5] bg-[#E2D9C8] overflow-hidden">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/85 via-[#252522]/30 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#F3EFE6]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-medium tracking-wide">{occ.title}</h3>
                    <div className="w-8 h-8 rounded-full bg-[#F3EFE6]/20 backdrop-blur-sm border border-[#F3EFE6]/30 flex items-center justify-center group-hover:bg-[#51292D] group-hover:border-[#51292D] transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-[#F3EFE6]" />
                    </div>
                  </div>
                  <p className="text-xs text-[#E2D9C8]/80 font-sans mt-2">{occ.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Occasion Tags Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#CCC5B9]/60">
          <span className="text-xs font-mono uppercase tracking-widest text-[#51292D] mr-2">Quick Curations:</span>
          {['Weddings & Soirees', 'Executive Travel', 'Anniversary Keepsakes', 'Private Vanity', 'House Warming'].map((tag) => (
            <Link
              key={tag}
              href="/collections/all"
              className="px-3.5 py-1.5 bg-[#E2D9C8]/50 hover:bg-[#51292D] hover:text-[#F3EFE6] text-xs font-sans text-[#252522] border border-[#CCC5B9] transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
