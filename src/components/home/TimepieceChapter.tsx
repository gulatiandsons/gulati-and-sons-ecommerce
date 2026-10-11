'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Rotate3d, Info, Check, ShieldAlert } from 'lucide-react';

const WATCH_HOTSPOTS = [
  {
    id: 'bezel',
    name: 'Cerachrom Bezel',
    coords: { top: '32%', left: '48%' },
    desc: 'Unidirectional 60-minute rotatable bezel in black scratch-resistant Cerachrom ceramic with gold numerals.'
  },
  {
    id: 'dial',
    name: 'Chromalight Display',
    coords: { top: '48%', left: '52%' },
    desc: 'Intense black dial with luminescent hour markers emitting a long-lasting blue glow.'
  },
  {
    id: 'crown',
    name: 'Triplock Winding Crown',
    coords: { top: '50%', left: '68%' },
    desc: 'Triple waterproofness system in 18 ct yellow gold screwing down hermetically against the Oyster case.'
  },
  {
    id: 'bracelet',
    name: 'Rolesor Oyster Bracelet',
    coords: { top: '78%', left: '50%' },
    desc: 'Three-piece solid links in Oystersteel and 18 ct yellow gold with Oysterlock safety clasp and Glidelock system.'
  }
];

export default function TimepieceChapter() {
  const [activeHotspot, setActiveHotspot] = useState(WATCH_HOTSPOTS[0]);
  const [activeAngle, setActiveAngle] = useState(0);

  const watchImages = [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1400&q=85'
  ];

  return (
    <section
      aria-labelledby="timepiece-chapter-heading"
      className="w-full bg-[#3C2921] text-[#F3EFE6] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#A58B5F]/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header and Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Heading & Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A58B5F] block">
              CHAPTER II. TIME
            </span>

            <h2
              id="timepiece-chapter-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F3EFE6] font-normal leading-[1.12]"
            >
              Time, Well Spent.
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#E2D9C8]/85 leading-relaxed font-light">
              A considered timepiece brings character to every hour. Explore exceptional horological proportions, precision calibres, and dual-metal architecture forged for endurance.
            </p>

            <div className="p-4 bg-[#252522]/60 border border-[#A58B5F]/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A58B5F] uppercase">
                <Info className="w-4 h-4" /> Selected Horological Specimen
              </div>
              <p className="font-serif text-lg text-[#F3EFE6]">
                Submariner Date 126613LN · 41 mm Yellow Rolesor
              </p>
              <p className="text-xs text-[#E2D9C8]/70 font-sans">
                Waterproof to 300 metres with Oysterlock clasp and Cerachrom insert.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/products/rolex-submariner-date-126613ln"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#A58B5F] hover:text-[#252522] transition-all shadow-md group"
              >
                <span>Launch Watchmaker Dossier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: The Watchmaker's View (Interactive Hotspots & Camera Angles) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#252522] border border-[#A58B5F]/40 shadow-2xl overflow-hidden group">
              {/* Display Image */}
              <Image
                src={watchImages[activeAngle]}
                alt="Watchmaker's View: Two-tone Yellow Rolesor Submariner Date"
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 680px"
              />

              {/* Angle Switcher Controls */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                <button
                  onClick={() => setActiveAngle(0)}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                    activeAngle === 0 ? 'bg-[#51292D] border-[#51292D] text-[#F3EFE6]' : 'bg-[#252522]/80 border-[#A58B5F]/40 text-[#E2D9C8]'
                  }`}
                >
                  Dial View
                </button>
                <button
                  onClick={() => setActiveAngle(1)}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                    activeAngle === 1 ? 'bg-[#51292D] border-[#51292D] text-[#F3EFE6]' : 'bg-[#252522]/80 border-[#A58B5F]/40 text-[#E2D9C8]'
                  }`}
                >
                  Bezel Detail
                </button>
                <button
                  onClick={() => setActiveAngle(2)}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                    activeAngle === 2 ? 'bg-[#51292D] border-[#51292D] text-[#F3EFE6]' : 'bg-[#252522]/80 border-[#A58B5F]/40 text-[#E2D9C8]'
                  }`}
                >
                  Bracelet & Clasp
                </button>
              </div>

              {/* Interactive Hotspot Markers (on primary angle) */}
              {activeAngle === 0 &&
                WATCH_HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    className="absolute z-20 w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/btn"
                    style={{ top: spot.coords.top, left: spot.coords.left }}
                    aria-label={`Inspect ${spot.name}`}
                  >
                    <span className="absolute w-6 h-6 rounded-full bg-[#A58B5F]/30 animate-ping pointer-events-none" />
                    <span className={`w-3.5 h-3.5 rounded-full border border-[#F3EFE6] transition-colors ${
                      activeHotspot.id === spot.id ? 'bg-[#51292D]' : 'bg-[#A58B5F]'
                    }`} />
                  </button>
                ))}

              {/* Hotspot detail popup card */}
              <div className="absolute bottom-4 inset-x-4 z-20 bg-[#252522]/95 backdrop-blur-md p-4 border border-[#A58B5F]/40 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58B5F]">
                      HOTSPOT SPECIFICATION
                    </span>
                    <span className="text-xs font-serif text-[#F3EFE6] font-medium">
                      · {activeHotspot.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#E2D9C8]/80 font-sans leading-relaxed">
                    {activeHotspot.desc}
                  </p>
                </div>
                <Rotate3d className="w-5 h-5 text-[#A58B5F] shrink-0 opacity-60" />
              </div>
            </div>

            {/* Strict Prototype Disclaimer */}
            <p className="text-[11px] text-[#E2D9C8]/50 font-mono mt-3 leading-relaxed flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#A58B5F] shrink-0" />
              Demonstration listing only. Gulati & Sons is not an authorized Rolex retailer and does not claim affiliation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
