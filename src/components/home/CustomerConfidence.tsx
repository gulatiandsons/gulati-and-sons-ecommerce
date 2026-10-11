'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Star } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';

export default function CustomerConfidence() {
  const { reviews } = useCommerce();
  const approvedReviews = reviews.filter((r) => r.status === 'approved');
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? approvedReviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === approvedReviews.length - 1 ? 0 : prev + 1));
  };

  if (approvedReviews.length === 0) return null;

  return (
    <section
      aria-labelledby="confidence-heading"
      className="w-full bg-[#E2D9C8]/40 text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/80"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
              PATRON EXPERIENCES
            </span>
            <h2
              id="confidence-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
            >
              Words From Those Who Know Us.
            </h2>
          </div>

          {/* Navigation Controls */}
          {approvedReviews.length > 1 && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={prevReview}
                className="w-10 h-10 border border-[#CCC5B9] bg-[#F3EFE6] hover:bg-[#51292D] hover:text-[#F3EFE6] text-[#252522] flex items-center justify-center transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 border border-[#CCC5B9] bg-[#F3EFE6] hover:bg-[#51292D] hover:text-[#F3EFE6] text-[#252522] flex items-center justify-center transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Review Cards Grid / View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {approvedReviews.map((rev, idx) => (
            <div
              key={rev.id}
              className={`p-8 bg-[#F3EFE6] border border-[#CCC5B9] flex flex-col justify-between space-y-6 shadow-sm transition-all ${
                idx === currentIndex ? 'ring-1 ring-[#51292D]' : 'opacity-85'
              }`}
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex text-[#A58B5F] gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif text-base sm:text-lg text-[#252522] italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#CCC5B9]/60 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-semibold text-[#252522]">{rev.authorName}</span>
                  {rev.verifiedPurchase && (
                    <span className="text-[10px] font-mono text-[#34483D] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#34483D]" /> Verified Patron
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-mono text-[#252522]/60 truncate">
                  Acquired: {rev.productName}
                </p>
                <span className="text-[10px] font-mono text-[#252522]/40 block">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
