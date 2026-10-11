import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Check, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke Gifting Services | Gulati & Sons',
  description: 'Curated luxury gifting with signature hardboard presentation boxes, wax seals, and personalized cotton correspondence notes.',
};

export default function GiftingPage() {
  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-16">
      <div className="max-w-3xl space-y-4 border-b border-[#CCC5B9]/80 pb-8">
        <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          COMMEMORATIVE HONORS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] font-normal">
          A Gift Worth Remembering.
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
          Objects curated for those who appreciate the details. Presented in our signature heavyweight rigid casing with hand-penned correspondence.
        </p>
      </div>

      {/* Hero Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 relative aspect-[16/11] bg-[#E2D9C8] border border-[#A58B5F]/40 shadow-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=85"
            alt="Bespoke Gifting Presentation Case"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 700px"
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-3xl text-[#252522]">
            The Presentation Protocol
          </h2>
          <p className="text-xs sm:text-sm text-[#252522]/80 font-sans leading-relaxed">
            Every gift dispatched from our Private House is treated with individual consideration. We do not affix synthetic peel stickers or generic barcode wrappers.
          </p>

          <div className="space-y-4 pt-2 text-xs font-sans">
            <div className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-1">
              <span className="font-mono text-[#51292D] uppercase font-semibold">01 · Rigid Presentation Case</span>
              <p className="text-[#252522]/70">Constructed from heavy greyboard with debossed House monogram and magnetic closure.</p>
            </div>
            <div className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-1">
              <span className="font-mono text-[#51292D] uppercase font-semibold">02 · Cotton Correspondence Card</span>
              <p className="text-[#252522]/70">300 GSM warm ivory stationery featuring your bespoke message penned by hand.</p>
            </div>
            <div className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-1">
              <span className="font-mono text-[#51292D] uppercase font-semibold">03 · Satin Grosgrain Ribbon</span>
              <p className="text-[#252522]/70">Tied in a traditional double-loop oxblood ribbon with subtle brass trim.</p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/collections/all"
              className="px-6 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] inline-flex items-center gap-2 hover:bg-[#3C2921] transition-colors"
            >
              <span>Explore Pieces for Gifting</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
