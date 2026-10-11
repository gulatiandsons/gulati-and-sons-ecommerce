'use client';

import React from 'react';
import Image from 'next/image';

export default function CloserLook() {
  return (
    <section
      aria-labelledby="closer-look-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
            MATERIAL STORYTELLING
          </span>
          <h2
            id="closer-look-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
          >
            The Difference Is in the Detail.
          </h2>
          <p className="text-xs sm:text-sm text-[#252522]/70 font-sans max-w-xl">
            True luxury resides in the quiet convergence of tactile materials: heavy crystal flacons, calibrated ceramic bezels, and supple full-grain Nappa hide.
          </p>
        </div>

        {/* Journal-style Grid: 1 Large Image + 2 Smaller Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Large Left Item (7 cols): Glass & Light */}
          <div className="lg:col-span-7 relative bg-[#E2D9C8] border border-[#CCC5B9] overflow-hidden group min-h-[380px] sm:min-h-[460px]">
            <Image
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85"
              alt="Close-up of perfume flacon glass and light refraction"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-[#F3EFE6]">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F]">
                DETAIL 01
              </span>
              <h3 className="font-serif text-2xl font-medium mt-0.5">Glass & Light</h3>
              <p className="text-xs text-[#E2D9C8]/80 font-sans mt-1 max-w-md">
                Heavy-base crystal flacons engineered to catch natural daylight, featuring snug weighted caps and micro-fine atomizers.
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): 2 Stacked Items */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Detail: The Dial */}
            <div className="relative flex-1 bg-[#E2D9C8] border border-[#CCC5B9] overflow-hidden group min-h-[220px]">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85"
                alt="Horological dial indices and gold ceramic bezel close-up"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-[#F3EFE6]">
                <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F]">
                  DETAIL 02
                </span>
                <h4 className="font-serif text-lg font-medium mt-0.5">The Horological Bezel</h4>
                <p className="text-xs text-[#E2D9C8]/80 font-sans">
                  Diamond-polished Cerachrom ceramic numerals coated with micro-layers of gold.
                </p>
              </div>
            </div>

            {/* Bottom Detail: The Leather Grain */}
            <div className="relative flex-1 bg-[#E2D9C8] border border-[#CCC5B9] overflow-hidden group min-h-[220px]">
              <Image
                src="https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=85"
                alt="Full-grain Nappa leather texture and gunmetal snap hardware"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-[#F3EFE6]">
                <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F]">
                  DETAIL 03
                </span>
                <h4 className="font-serif text-lg font-medium mt-0.5">Supple Nappa Grain</h4>
                <p className="text-xs text-[#E2D9C8]/80 font-sans">
                  Uncorrected natural leather that breathes, softens, and patinas with personal wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
