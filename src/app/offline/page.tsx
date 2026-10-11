'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, PhoneCall, Mail } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-[#F3EFE6] text-[#252522]">
      <div className="max-w-lg w-full text-center space-y-6 p-8 border border-[#CCC5B9] bg-[#E2D9C8]/40 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#51292D]/10 flex items-center justify-center text-[#51292D]">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#51292D]">
            Interrupted Handshake
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#252522]">
            Atelier Offline Notice
          </h1>
        </div>

        <p className="text-sm font-sans text-[#252522]/80 leading-relaxed">
          Your internet connectivity appears presently unavailable. To protect transaction security, preserve authentic batch stock, and calculate live pan-India dispatch logistics, an active connection is required.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3C2921] transition-colors min-h-[44px]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 border border-[#51292D] text-[#51292D] hover:bg-[#51292D] hover:text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center transition-colors min-h-[44px]"
          >
            Return to Entrance
          </Link>
        </div>

        <div className="border-t border-[#CCC5B9]/60 pt-6 space-y-2 text-xs font-mono text-[#252522]/70">
          <p className="uppercase tracking-wider">Direct Concierge Assistance</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs">
            <a
              href="tel:+918375044808"
              className="hover:text-[#51292D] flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#51292D]" />
              <span>+91 83750 44808</span>
            </a>
            <a
              href="mailto:gulatiandsons.info@gmail.com"
              className="hover:text-[#51292D] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#51292D]" />
              <span>gulatiandsons.info@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
