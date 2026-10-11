'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/lib/data/journal';

export default function HouseJournal() {
  return (
    <section
      aria-labelledby="journal-heading"
      className="w-full bg-[#F3EFE6] text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/60"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              EDITORIAL PERSPECTIVE
            </span>
            <h2
              id="journal-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
            >
              Notes From the House.
            </h2>
            <p className="text-xs sm:text-sm text-[#252522]/70 font-sans">
              Essays on olfactory composition, horological proportion, and the preservation of natural materials.
            </p>
          </div>
          <Link
            href="/journal"
            className="text-xs uppercase tracking-[0.2em] font-sans text-[#51292D] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Read All Essays</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(0, 3).map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between space-y-4"
            >
              <Link href={`/journal/${article.slug}`} className="block relative aspect-[16/10] bg-[#E2D9C8] border border-[#CCC5B9] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-mono text-[#A58B5F] uppercase tracking-widest">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#252522] group-hover:text-[#51292D] transition-colors leading-snug">
                  <Link href={`/journal/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs text-[#252522]/70 font-sans line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/journal/${article.slug}`}
                  className="text-xs font-sans text-[#51292D] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
