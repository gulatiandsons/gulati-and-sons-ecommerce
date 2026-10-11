'use client';

import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { Review } from '@/types';

export default function CustomerConfidence() {
  const { reviews } = useCommerce();
  const approvedReviews = reviews.filter((r) => r.status === 'approved');

  // Ensure 20 reviews (10 for Row 1, 10 for Row 2)
  const row1Reviews: Review[] = approvedReviews.slice(0, 10);
  const row2Reviews: Review[] = approvedReviews.slice(10, 20);

  // If there are fewer than 10 in either row, fill from available
  const filledRow1 = row1Reviews.length > 0 ? row1Reviews : approvedReviews;
  const filledRow2 = row2Reviews.length > 0 ? row2Reviews : approvedReviews;

  const renderCard = (rev: Review, key: string) => (
    <div
      key={key}
      className="w-[320px] sm:w-[380px] lg:w-[420px] flex-shrink-0 p-6 sm:p-7 bg-[#F3EFE6] border border-[#CCC5B9] flex flex-col justify-between space-y-5 shadow-sm transition-transform duration-300 hover:border-[#51292D]/60 hover:shadow-md"
    >
      <div className="space-y-3.5">
        {/* 5 Stars */}
        <div className="flex text-[#A58B5F] gap-1">
          {[...Array(rev.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>

        <p className="font-serif text-sm sm:text-base text-[#252522] italic leading-relaxed line-clamp-4">
          &ldquo;{rev.comment}&rdquo;
        </p>
      </div>

      <div className="pt-3.5 border-t border-[#CCC5B9]/60 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-xs font-semibold text-[#252522] truncate">
            {rev.authorName}
          </span>
          {rev.verifiedPurchase && (
            <span className="text-[12px] font-mono text-[#34483D] flex items-center gap-1 flex-shrink-0">
              <CheckCircle2 className="w-3 h-3 text-[#34483D]" /> Verified Patron
            </span>
          )}
        </div>
        <p className="text-[13px] font-mono text-[#252522]/65 truncate">
          Acquired: {rev.productName}
        </p>
        <span className="text-[12px] font-mono text-[#252522]/40 block">{rev.date}</span>
      </div>
    </div>
  );

  return (
    <section
      aria-labelledby="confidence-heading"
      className="w-full bg-[#E2D9C8]/40 text-[#252522] py-20 lg:py-28 overflow-hidden border-b border-[#CCC5B9]/80 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              PATRON EXPERIENCES
            </span>
            <h2
              id="confidence-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
            >
              Words From Those Who Know Us.
            </h2>
          </div>
          <p className="text-xs font-mono text-[#252522]/60 uppercase tracking-wider self-start sm:self-auto">
            Twenty Verified Reflections · Hover to Pause
          </p>
        </div>
      </div>

      {/* Dual Marquee Track Area with Vignette Masks */}
      <div className="relative w-full marquee-container space-y-6 sm:space-y-8">
        {/* Soft Left & Right Edge Vignette Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#E2D9C8] via-[#E2D9C8]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#E2D9C8] via-[#E2D9C8]/80 to-transparent z-10" />

        {/* Row 1: 10 Reviews moving LEFT to RIGHT */}
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee-left-to-right flex gap-6 sm:gap-7">
            {filledRow1.map((rev, idx) => renderCard(rev, `r1-orig-${idx}`))}
            {filledRow1.map((rev, idx) => renderCard(rev, `r1-dup-${idx}`))}
          </div>
        </div>

        {/* Row 2: 10 Reviews moving RIGHT to LEFT below Row 1 */}
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee-right-to-left flex gap-6 sm:gap-7">
            {filledRow2.map((rev, idx) => renderCard(rev, `r2-orig-${idx}`))}
            {filledRow2.map((rev, idx) => renderCard(rev, `r2-dup-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  );
}

