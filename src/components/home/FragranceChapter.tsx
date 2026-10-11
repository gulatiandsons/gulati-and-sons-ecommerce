'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, RotateCw, Sparkles } from 'lucide-react';

const SCENT_PROFILES = [
  {
    id: 'woody',
    label: 'Woody & Smokey',
    description: 'Resinous agarwood (oud), cedar chips, dried tobacco leaf, and smoked leather.',
    recommendedNote: 'Caramel & Aged Oud Accord',
    productLink: '/products/bella-vita-luxury-oud-gold-eau-de-parfum'
  },
  {
    id: 'warm',
    label: 'Warm & Amber',
    description: 'Bourbon vanilla, ambergris, roasted tonka bean, and balsamic resins.',
    recommendedNote: 'Golden Amber & Florentine Orris',
    productLink: '/products/bella-vita-luxury-oud-gold-eau-de-parfum'
  },
  {
    id: 'fresh',
    label: 'Sunlit Citrus',
    description: 'Calabrian bergamot, neroli, sea salt, and bitter orange blossom.',
    recommendedNote: 'Sun-drenched Bergamot',
    productLink: '/collections/fragrances'
  },
  {
    id: 'floral',
    label: 'Rich Floral',
    description: 'Damascus rose absolute, jasmine sambac, and powdery violet root.',
    recommendedNote: 'Damascene Rose Absolute',
    productLink: '/collections/fragrances'
  }
];

export default function FragranceChapter() {
  const [selectedProfile, setSelectedProfile] = useState(SCENT_PROFILES[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRotating) return;
    setRotationAngle((prev) => (prev + e.movementX * 0.8) % 360);
  };

  return (
    <section
      aria-labelledby="fragrance-chapter-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top 55:45 Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: 55% Cinematic Imagery & Interactive Bottle Rotation */}
          <div className="lg:col-span-7 relative">
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#E2D9C8] border border-[#A58B5F]/40 shadow-xl overflow-hidden cursor-ew-resize select-none"
              onMouseDown={() => setIsRotating(true)}
              onMouseUp={() => setIsRotating(false)}
              onMouseLeave={() => setIsRotating(false)}
              onMouseMove={handleDrag}
            >
              <div
                className="w-full h-full relative transition-transform duration-75"
                style={{ transform: `rotateY(${rotationAngle * 0.15}deg)` }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1400&q=85"
                  alt="Liquid Glass flacon: Bella Vita Luxury OUD Gold Eau de Parfum"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 680px"
                />
              </div>

              {/* Liquid glass 3D cue badge */}
              <div className="absolute top-4 left-4 bg-[#252522]/80 backdrop-blur-md text-[#F3EFE6] px-3 py-1.5 text-[12px] font-mono uppercase tracking-widest flex items-center gap-2 border border-[#A58B5F]/40">
                <RotateCw className="w-3 h-3 text-[#A58B5F]" />
                <span>Drag to Inspect Flacon</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-[#F3EFE6]/90 backdrop-blur-md px-3 py-1 text-[13px] font-mono text-[#51292D]">
                50 ML · EAU DE PARFUM
              </div>
            </div>
          </div>

          {/* Right: 45% Editorial Chapter Content */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              CHAPTER I. FRAGRANCE
            </span>

            <h2
              id="fragrance-chapter-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal leading-[1.12]"
            >
              A Presence That Lingers.
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
              Find a fragrance that feels distinctly yours. Our olfactory selection balances smoked resinous woods with sunlit citrus extracts and pure floral distillates.
            </p>

            <div className="pt-2">
              <Link
                href="/products/bella-vita-luxury-oud-gold-eau-de-parfum"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-all shadow-md group"
              >
                <span>Acquire Bella Vita OUD Gold</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* The Scent Library (Interactive Olfactory Explorer) */}
        <div className="bg-[#E2D9C8]/50 border border-[#CCC5B9] p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-[#CCC5B9]/60 pb-6">
            <div>
              <span className="text-[12px] font-mono uppercase tracking-[0.25em] text-[#7A5E2E] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#7A5E2E]" /> The Scent Library
              </span>
              <h3 className="font-serif text-2xl text-[#252522] mt-1">Explore by Fragrance Character</h3>
            </div>
            <span className="text-xs text-[#252522]/80 font-mono">Select a character profile to refine olfactory notes</span>
          </div>

          {/* Character selection buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {SCENT_PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className={`p-4 text-left border transition-all ${
                  selectedProfile.id === profile.id
                    ? 'border-[#51292D] bg-[#51292D] text-[#F3EFE6] shadow-sm'
                    : 'border-[#CCC5B9] bg-[#F3EFE6] text-[#252522] hover:bg-[#E2D9C8]'
                }`}
              >
                <span className="block font-serif text-base">{profile.label}</span>
                <span className={`text-[12px] font-mono uppercase tracking-wider block mt-1 ${
                  selectedProfile.id === profile.id ? 'text-[#C8AD7F]' : 'text-[#252522]/75'
                }`}>
                  Aromatic Accord
                </span>
              </button>
            ))}
          </div>

          {/* Dynamic suggestion panel */}
          <div className="bg-[#F3EFE6] border border-[#CCC5B9] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#51292D]">
                Distinguishing Note: {selectedProfile.recommendedNote}
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#252522]/80 max-w-xl">
                {selectedProfile.description}
              </p>
            </div>
            <Link
              href={selectedProfile.productLink}
              className="shrink-0 px-5 py-2.5 bg-transparent border border-[#51292D] text-[#51292D] hover:bg-[#51292D] hover:text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.15em] transition-colors"
            >
              Explore Matches &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
