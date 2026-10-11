import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/lib/data/journal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes From the House | Gulati & Sons Journal',
  description: 'Editorial essays on olfactory chemistry, watch case proportions, and the craftsmanship of full-grain leathers.',
};

export default function JournalPage() {
  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-16">
      <div className="max-w-3xl space-y-4 border-b border-[#CCC5B9]/80 pb-8">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          THE HOUSE JOURNAL
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] font-normal">
          Notes From the House.
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
          Considered writings dedicated to the connoisseurship of fragrances, horology, materials, and domestic rituals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {JOURNAL_ARTICLES.map((article) => (
          <article key={article.slug} className="group flex flex-col justify-between space-y-4">
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

              <h2 className="font-serif text-2xl text-[#252522] group-hover:text-[#51292D] transition-colors leading-snug">
                <Link href={`/journal/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-xs text-[#252522]/70 font-sans line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/journal/${article.slug}`}
                className="text-xs font-sans text-[#51292D] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
