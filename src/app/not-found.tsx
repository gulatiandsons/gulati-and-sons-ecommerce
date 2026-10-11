import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full pt-36 pb-36 px-6 text-center max-w-xl mx-auto space-y-6">
      <div className="w-20 h-20 border border-[#A58B5F]/40 flex items-center justify-center rounded-full mx-auto bg-[#E2D9C8]/40">
        <span className="font-serif text-3xl text-[#51292D]">404</span>
      </div>

      <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
        PAGE NOT DISCOVERED
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl text-[#252522]">
        This Piece Is No Longer Available.
      </h1>

      <p className="text-xs sm:text-sm text-[#252522]/70 font-sans leading-relaxed">
        The requested address or publication does not exist in our Private House catalog. Explore our current collections or return to the main reception.
      </p>

      <div className="pt-4 flex justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-colors"
        >
          Return to Reception
        </Link>
        <Link
          href="/collections/all"
          className="px-6 py-3.5 bg-transparent border border-[#51292D] text-[#51292D] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#51292D] hover:text-[#F3EFE6] transition-colors"
        >
          View Collections
        </Link>
      </div>
    </div>
  );
}
