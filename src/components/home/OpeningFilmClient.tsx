'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronDown } from 'lucide-react';

export default function OpeningFilmClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showCue, setShowCue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCue(true), 3500);
    return () => clearTimeout(timer);
  }, []);

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
    const vid = videoRef.current;
    if (!vid) return;

    vid.defaultMuted = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.loop = true;

    const startPlayback = () => {
      if (!vid) return;
      vid.defaultMuted = true;
      vid.muted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setVideoReady(true);
          })
          .catch(() => {
            const resumeOnInteraction = () => {
              if (vid) {
                vid.defaultMuted = true;
                vid.muted = true;
                vid.play().then(() => {
                  setIsPlaying(true);
                  setVideoReady(true);
                }).catch(() => {});
              }
              window.removeEventListener('click', resumeOnInteraction);
              window.removeEventListener('touchstart', resumeOnInteraction);
              window.removeEventListener('scroll', resumeOnInteraction);
            };
            window.addEventListener('click', resumeOnInteraction, { once: true });
            window.addEventListener('touchstart', resumeOnInteraction, { once: true });
            window.addEventListener('scroll', resumeOnInteraction, { once: true });
          });
      }
    };

    const timer = setTimeout(startPlayback, 2000);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

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
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
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
    <>
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.webp"
          className="w-full h-full object-contain md:object-cover relative z-10"
          aria-label="Gulati & Sons Opening Film"
        >
          <source src="/video-loop-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/video-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Subtle playback control */}
      <div className="absolute bottom-6 right-6 z-20 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-500">
        <button
          onClick={togglePlayback}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#252522]/70 hover:bg-[#252522] backdrop-blur-md border border-[#A58B5F]/40 text-[#F3EFE6] text-[13px] font-mono tracking-wider transition-colors"
          aria-label={isPlaying ? 'Pause film' : 'Play film'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-[#A58B5F]" />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#A58B5F]" />
              <span className="hidden sm:inline">Play</span>
            </>
          )}
        </button>
      </div>

      {/* Scroll cue */}
      <div
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto transition-opacity duration-1000 ${
          showCue ? 'opacity-80' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToHero}
          className="group flex flex-col items-center gap-1.5 text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.25em] text-[#F3EFE6]/60 hover:text-[#F3EFE6] transition-colors"
          aria-label="Scroll to discover collection"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
          <ChevronDown className="w-4 h-4 text-[#C8AD7F] group-hover:text-[#F3EFE6] animate-bounce" />
        </button>
      </div>
    </>
  );
}
