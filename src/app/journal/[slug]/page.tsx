import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/lib/data/journal';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Essay Not Found' };
  return {
    title: `${article.title} | Gulati & Sons Journal`,
    description: article.summary,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-mono text-[#252522]/60 uppercase tracking-widest">
        <Link href="/" className="hover:text-[#51292D]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/journal" className="hover:text-[#51292D]">Journal</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#51292D] font-medium">{article.category}</span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4 border-b border-[#CCC5B9]/80 pb-8">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#A58B5F]">
          <span>{article.category}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#252522] font-normal leading-tight">
          {article.title}
        </h1>
        <p className="font-serif text-lg sm:text-xl text-[#252522]/80 italic">
          {article.subtitle}
        </p>
      </div>

      {/* Featured Header Media */}
      <div className="relative w-full aspect-[16/9] bg-[#E2D9C8] border border-[#CCC5B9] overflow-hidden shadow-lg">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="900px"
        />
      </div>

      {/* Article Body */}
      <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base text-[#252522]/90 font-serif leading-relaxed">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="first-letter:text-4xl first-letter:font-serif first-letter:text-[#51292D] first-letter:float-left first-letter:mr-2">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Footer & Back to Journal */}
      <div className="pt-12 border-t border-[#CCC5B9]/80 flex justify-between items-center">
        <Link
          href="/journal"
          className="text-xs font-sans uppercase tracking-[0.2em] text-[#51292D] flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Notes from the House
        </Link>
        <span className="text-xs font-mono text-[#252522]/50">GULATI & SONS ATELIER</span>
      </div>
    </article>
  );
}
