'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronDown } from 'lucide-react';

export default function OpeningFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showCue, setShowCue] = useState(false);

  useEffect(() => {
    // Only fade in subtle scroll guide after patron has enjoyed initial opening film
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

  // Ensure robust automatic video playback and continuous looping
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
            setVideoLoaded(true);
          })
          .catch((err) => {
            console.warn('Autoplay requires gesture or waiting for buffer:', err);
            // In case browser policy temporarily deferred, trigger on first document interaction
            const resumeOnInteraction = () => {
              if (vid) {
                vid.defaultMuted = true;
                vid.muted = true;
                vid.play().then(() => {
                  setIsPlaying(true);
                  setVideoLoaded(true);
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

    startPlayback();
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
        {!prefersReducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            onPlay={() => {
              setIsPlaying(true);
              setVideoLoaded(true);
            }}
            className="w-full h-full object-contain md:object-cover opacity-95 transition-opacity duration-700"
            aria-label="Gulati & Sons Opening Film"
          >
            <source src="/video-loop.mp4" type="video/mp4" />
          </video>
        ) : null}

        {/* Static Fallback Poster (Visible only when video is loading or reduced motion is active) */}
        <div
          className={`absolute inset-0 bg-contain md:bg-cover bg-center bg-no-repeat transition-opacity duration-1000 -z-10 ${
            videoLoaded && !prefersReducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1920&q=85')`
          }}
        />
      </div>

      {/* Subtle, unobtrusive playback control in bottom-right corner (revealed on subtle hover/focus) */}
      <div className="absolute bottom-6 right-6 z-20 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-500">
        <button
          onClick={togglePlayback}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#252522]/70 hover:bg-[#252522] backdrop-blur-md border border-[#A58B5F]/40 text-[#F3EFE6] text-[11px] font-mono tracking-wider transition-colors"
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

      {/* Elegant, subtle scroll cue that glides in gently at the bottom center after opening playback */}
      <div className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto transition-opacity duration-1000 ${
        showCue ? 'opacity-80' : 'opacity-0 pointer-events-none'
      }`}>
        <button
          onClick={scrollToHero}
          className="group flex flex-col items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#F3EFE6]/60 hover:text-[#F3EFE6] transition-colors"
          aria-label="Scroll to discover collection"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
          <ChevronDown className="w-4 h-4 text-[#A58B5F]/80 group-hover:text-[#A58B5F] animate-bounce" />
        </button>
      </div>
    </section>
  );
}
