'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Clock, Quote } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { BUSINESS_CONFIG } from '@/lib/config/business';

export default function FounderPage() {
  const { founderContent } = useCommerce();

  // Structured Data (JSON-LD) for Search Engines (AEO, SEO & Knowledge Graph)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: founderContent.name,
      jobTitle: founderContent.role,
      description: founderContent.subtitle,
      worksFor: {
        '@type': 'Organization',
        name: BUSINESS_CONFIG.brandName,
        url: BUSINESS_CONFIG.domain,
        telephone: BUSINESS_CONFIG.phone,
        email: BUSINESS_CONFIG.email
      },
      url: `${BUSINESS_CONFIG.domain}/founder`,
      image: founderContent.heroImage
    }
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full bg-[#F3EFE6] text-[#252522] selection:bg-[#51292D] selection:text-[#F3EFE6]">
        {/* SECTION 1: EDITORIAL HERO */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#CCC5B9]/80"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[13px] font-mono uppercase tracking-[0.3em] text-[#51292D] block">
                  THE FOUNDER BEHIND GULATI & SONS
                </span>
                <h1
                  id="hero-heading"
                  className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#252522] font-normal tracking-tight leading-[1.08]"
                >
                  Meet {founderContent.name}.
                </h1>
              </div>

              <p className="font-serif text-xl sm:text-2xl text-[#51292D] italic font-normal leading-relaxed">
                {founderContent.title}
              </p>

              <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light max-w-2xl">
                {founderContent.subtitle}
              </p>

              {/* Administrative portrait note indicator */}
              <div className="pt-4 border-t border-[#CCC5B9]/50 flex items-center gap-2 text-[13px] font-mono text-[#252522]/55">
                <span className="w-2 h-2 rounded-full bg-[#A58B5F]" />
                <span>Private House Curation · Managed via Superadmin</span>
              </div>
            </div>

            {/* Right Portrait Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto bg-[#E2D9C8] border border-[#A58B5F]/40 shadow-xl overflow-hidden group">
                <Image
                  src={founderContent.heroImage}
                  alt={`Portrait of ${founderContent.name}, Founder of Gulati & Sons`}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                {/* Subtle luxury paper overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#F3EFE6]/90 backdrop-blur-md border border-[#A58B5F]/30 text-[12px] font-mono uppercase tracking-wider text-[#252522] text-center">
                  <span>{founderContent.name} · Founder</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE FOUNDER */}
        <section
          aria-labelledby="founder-bio-heading"
          className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto border-b border-[#CCC5B9]/80"
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                AN INTRODUCTION
              </span>
              <h2
                id="founder-bio-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
              >
                {founderContent.bioHeading}
              </h2>
            </div>

            <div className="space-y-6 font-serif text-lg sm:text-xl text-[#252522]/85 leading-relaxed font-normal">
              {founderContent.bioParagraphs.map((para, idx) => (
                <p key={idx} className="first-letter:text-4xl first-letter:font-serif first-letter:text-[#51292D] first-letter:mr-1">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: THE PHILOSOPHY */}
        <section
          aria-labelledby="philosophy-heading"
          className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-[#E2D9C8]/40 border-b border-[#CCC5B9]/80"
        >
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                THE SELECTION PRINCIPLES
              </span>
              <h2
                id="philosophy-heading"
                className="font-serif text-3xl sm:text-5xl text-[#252522] font-normal"
              >
                {founderContent.philosophyHeading}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#252522]/70 font-light">
                {founderContent.philosophySubheading}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {founderContent.philosophyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-[#F3EFE6] border border-[#CCC5B9] space-y-4 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[13px] font-mono text-[#A58B5F] block">
                      0{idx + 1} / PRINCIPLE
                    </span>
                    <h3 className="font-serif text-xl text-[#252522] font-normal">
                      {point.title}
                    </h3>
                    <p className="font-sans text-xs text-[#252522]/75 leading-relaxed font-light">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: THE COLLECTION */}
        <section
          aria-labelledby="collections-heading"
          className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#CCC5B9]/80"
        >
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  CURATED EXPRESSIONS
                </span>
                <h2
                  id="collections-heading"
                  className="font-serif text-3xl sm:text-5xl text-[#252522] font-normal"
                >
                  The Three Pillars.
                </h2>
              </div>
              <p className="font-sans text-xs text-[#252522]/70 font-light max-w-md">
                {founderContent.collectionsIntro}
              </p>
            </div>

            {/* 3 Categories Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Fragrance */}
              <div className="bg-[#E2D9C8]/30 border border-[#CCC5B9] p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[12px] font-mono uppercase tracking-widest text-[#51292D]">Chapter I</span>
                  <h3 className="font-serif text-2xl text-[#252522]">Fragrance & Ouds</h3>
                  <p className="font-sans text-xs text-[#252522]/75 leading-relaxed font-light">
                    Extrait-strength extractions, wild agarwood resins, honeyed amber, and cold-pressed citrus crafted for longevity and quiet sillage.
                  </p>
                </div>
                <Link
                  href="/collections/fragrances"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#51292D] hover:underline"
                >
                  Explore Fragrances &rarr;
                </Link>
              </div>

              {/* Timepieces */}
              <div className="bg-[#E2D9C8]/30 border border-[#CCC5B9] p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[12px] font-mono uppercase tracking-widest text-[#51292D]">Chapter II</span>
                  <h3 className="font-serif text-2xl text-[#252522]">Timepieces</h3>
                  <p className="font-sans text-xs text-[#252522]/75 leading-relaxed font-light">
                    Mechanical complications and architectural proportions selected as physical markers of horological conviction.
                  </p>
                </div>
                <Link
                  href="/collections/watches"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#51292D] hover:underline"
                >
                  Explore Timepieces &rarr;
                </Link>
              </div>

              {/* Outerwear & Atelier */}
              <div className="bg-[#E2D9C8]/30 border border-[#CCC5B9] p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[12px] font-mono uppercase tracking-widest text-[#51292D]">Chapter III</span>
                  <h3 className="font-serif text-2xl text-[#252522]">Outerwear & Leather</h3>
                  <p className="font-sans text-xs text-[#252522]/75 leading-relaxed font-light">
                    Full-grain drum-dyed lambskin, antique brass hardware, and bespoke Cupro linings built to develop rich patina with wear.
                  </p>
                </div>
                <Link
                  href="/collections/clothing"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#51292D] hover:underline"
                >
                  Explore Outerwear &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: A NOTE FROM THE FOUNDER */}
        <section
          aria-labelledby="note-heading"
          className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-[#3C2921] text-[#E2D9C8]"
        >
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <Quote className="w-10 h-10 text-[#A58B5F] mx-auto opacity-75" />

            <div className="space-y-3">
              <span className="text-[13px] font-mono uppercase tracking-[0.3em] text-[#A58B5F] block">
                {founderContent.personalStatementHeading}
              </span>
              <p
                id="note-heading"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F3EFE6] italic leading-relaxed font-normal"
              >
                &ldquo;{founderContent.personalStatement}&rdquo;
              </p>
            </div>

            <div className="pt-6 border-t border-[#A58B5F]/30 space-y-1">
              <p className="font-serif text-lg text-[#F3EFE6] tracking-wide">{founderContent.name}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-[#A58B5F]">
                {founderContent.title}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: EXPLORE GULATI AND SONS */}
        <section
          aria-labelledby="explore-heading"
          className="py-20 md:py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto text-center space-y-8"
        >
          <div className="space-y-2">
            <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              CONTINUE THE DISCOVERY
            </span>
            <h2
              id="explore-heading"
              className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal"
            >
              Explore Gulati & Sons
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-widest hover:bg-[#3C2921] transition-all shadow-md"
            >
              Return to Homepage
            </Link>
            <Link
              href="/collections/all"
              className="px-8 py-3.5 bg-[#F3EFE6] border border-[#252522] text-[#252522] text-xs font-mono uppercase tracking-widest hover:bg-[#E2D9C8] transition-all"
            >
              View Entire Collection
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-transparent border border-[#A58B5F] text-[#51292D] text-xs font-mono uppercase tracking-widest hover:bg-[#A58B5F]/10 transition-all"
            >
              Contact The Concierge
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
