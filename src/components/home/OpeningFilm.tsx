'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronDown } from 'lucide-react';

export default function OpeningFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [prefersReducedMotion]);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const scrollToHero = () => {
    const heroElem = document.getElementById('section-real-hero');
    if (heroElem) {
      heroElem.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      aria-label="Cinematic Opening Film"
      className="relative w-full h-screen min-h-[640px] bg-[#3C2921] overflow-hidden select-none"
    >
      {/* Background Video */}
      {!prefersReducedMotion ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-85' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source src="/video-loop.mp4" type="video/mp4" />
        </video>
      ) : null}

      {/* Static Fallback Poster (Visible when video loading or reduced motion active) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          videoLoaded && !prefersReducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1920&q=85')`
        }}
      />

      {/* Cinematic Film Vignette & Subtle Warm Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#252522]/60 via-transparent to-[#252522]/80 pointer-events-none" />

      {/* Minimal Editorial Overlay Controls (Section 00 Specification) */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 pointer-events-none z-20">
        {/* Top spacer for header */}
        <div className="pt-20" />

        {/* Bottom Utility Bar */}
        <div className="flex items-end justify-between text-[#F3EFE6] pointer-events-auto">
          {/* Bottom Left: Title label */}
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#A58B5F]">
              THE OPENING FILM
            </span>
            <p className="font-serif text-base sm:text-lg text-[#F3EFE6]/90 tracking-wide">
              A House of Character.
            </p>
          </div>

          {/* Bottom Center: Scroll to discover */}
          <button
            onClick={scrollToHero}
            className="hidden sm:flex flex-col items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#F3EFE6]/80 hover:text-[#F3EFE6] transition-colors -translate-x-6"
            aria-label="Scroll to explore collection"
          >
            <span>Scroll to Discover</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>

          {/* Bottom Right: Play / Pause Accessible Control */}
          <div>
            <button
              onClick={togglePlayback}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#252522]/60 hover:bg-[#252522]/90 backdrop-blur-md border border-[#A58B5F]/40 text-[#F3EFE6] text-[11px] font-mono tracking-wider transition-colors"
              aria-label={isPlaying ? 'Pause opening film' : 'Play opening film'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#A58B5F]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#A58B5F]" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
