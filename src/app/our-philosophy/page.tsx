import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Selection Philosophy | Gulati & Sons',
  description: 'The five guiding principles of Gulati & Sons: Luxury through restraint, heritage without pretense, and considered commerce.',
};

export default function OurPhilosophyPage() {
  const principles = [
    {
      num: '01',
      title: 'Luxury Through Restraint',
      body: 'Beautiful materials, considered negative space, exceptional imagery, and quiet typography. We reject loud neon accents, artificial urgency countdowns, and excessive digital decoration.'
    },
    {
      num: '02',
      title: 'Heritage Without Pretense',
      body: 'Classical visual language is welcomed and honored. Invented founding centuries, fictional coats of arms, and unsupported craftsmanship assertions are strictly forbidden.'
    },
    {
      num: '03',
      title: 'Experience Without Friction',
      body: 'While our storytelling and campaign visuals are atmospheric, purchasing, filtering, searching, and checkout remain instantaneous and intuitive across devices.'
    },
    {
      num: '04',
      title: 'Motion With Purpose',
      body: 'Every animation behaves like a precision Swiss instrument or a carefully opened leather presentation case. No arcade physics, bouncing buttons, or gratuitous delays.'
    },
    {
      num: '05',
      title: 'Designed For Growth',
      body: 'Perfumes, deodorants, precision timepieces, and leather outerwear feel equally at home in our Private House architecture, unified under one timeless aesthetic.'
    }
  ];

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto border-b border-[#CCC5B9]/80 pb-12">
        <span className="text-[13px] font-mono uppercase tracking-[0.3em] text-[#51292D] block">
          THE HOUSE DOCTRINE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] font-normal leading-tight">
          Good Taste Needs No Introduction.
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
          The five governing tenets that shape how Gulati & Sons designs, selects, and presents every object.
        </p>
      </div>

      <div className="space-y-6">
        {principles.map((p) => (
          <div
            key={p.num}
            className="p-8 sm:p-10 bg-[#E2D9C8]/40 border border-[#CCC5B9] grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline hover:border-[#51292D] transition-colors"
          >
            <div className="md:col-span-2">
              <span className="font-mono text-2xl sm:text-3xl text-[#51292D] font-light">{p.num}</span>
            </div>
            <div className="md:col-span-10 space-y-2">
              <h2 className="font-serif text-2xl text-[#252522]">{p.title}</h2>
              <p className="font-sans text-xs sm:text-sm text-[#252522]/80 leading-relaxed font-light">
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 text-center">
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-all shadow-md"
        >
          <span>Explore The Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
