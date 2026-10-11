import React from 'react';
import OpeningFilmClient from './OpeningFilmClient';

export default function OpeningFilm() {
  return (
    <section
      id="section-opening-film"
      aria-label="Cinematic Opening Film"
      className="relative w-full h-[100dvh] md:h-screen md:min-h-[640px] bg-[#161311] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Video Container:
          - On mobile: Strictly horizontal 16:9 aspect ratio, object-contain, zero cropping, zero stretching, zero cutoff.
          - On desktop: Full cinematic viewport cover.
      */}
      <div className="w-full aspect-[16/9] max-h-[100dvh] relative flex items-center justify-center md:absolute md:inset-0 md:w-full md:h-full md:max-h-none md:aspect-auto">
        <OpeningFilmClient />
      </div>

      {/* Cinematic Title Card for Desktop / Headless Layout */}
      <div className="hidden md:flex flex-col items-center justify-end pb-12 sm:pb-16 z-20 pointer-events-none absolute inset-0 text-center">
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.3em] uppercase text-[#F3EFE6]/80 drop-shadow-lg">
          Gulati &amp; Sons
        </h2>
        <p className="text-[12px] sm:text-[13px] font-mono tracking-[0.25em] text-[#C8AD7F] uppercase mt-1 drop-shadow">
          The Private House
        </p>
      </div>
    </section>
  );
}
