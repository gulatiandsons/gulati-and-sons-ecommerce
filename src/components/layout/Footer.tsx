'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BUSINESS_CONFIG } from '@/lib/config/business';

export default function Footer() {
  return (
    <footer className="relative bg-[#3C2921] text-[#E2D9C8] overflow-hidden pt-12 pb-16 border-t border-[#A58B5F]/30">
      {/* Monumental architectural typography immediately before/blending into footer */}
      <div className="w-full overflow-hidden select-none pointer-events-none pb-6 sm:pb-10 text-center opacity-15 px-4">
        <h2 className="font-serif text-[5.6vw] font-medium tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.15em] uppercase text-[#F3EFE6] leading-none whitespace-nowrap mx-auto">
          GULATI AND SONS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Brand Header inside Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-[#A58B5F]/20 gap-8">
          <div className="space-y-4">
            {/* Big, radiant House Crest & Lettering Logo */}
            <div className="relative h-28 w-36 sm:h-36 sm:w-48 md:h-44 md:w-56 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/logo-footer.png"
                alt="Gulati & Sons - The Private House"
                fill
                priority
                className="object-contain object-left drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 224px"
              />
            </div>
            <p className="text-xs font-serif text-[#E2D9C8]/80 max-w-sm tracking-wide leading-relaxed">
              The Private House. Curated fragrances, horological masterpieces, and everyday essentials selected with intention.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs font-mono tracking-wider text-[#A58B5F]">
            <div>
              <span className="block text-[10px] text-[#E2D9C8]/50 uppercase">Concierge Desk</span>
              <a href={BUSINESS_CONFIG.phoneTelLink} className="text-[#E2D9C8] hover:text-[#A58B5F] transition-colors">
                {BUSINESS_CONFIG.phoneFormatted}
              </a>
            </div>
            <div>
              <span className="block text-[10px] text-[#E2D9C8]/50 uppercase">Direct Inquiries</span>
              <a href={BUSINESS_CONFIG.emailMailtoLink} className="text-[#E2D9C8] hover:text-[#A58B5F] transition-colors">
                {BUSINESS_CONFIG.email}
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-[#A58B5F]/20 text-xs">
          {/* Col 1: Explore */}
          <div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#F3EFE6] mb-4">Explore</h4>
            <ul className="space-y-2.5 text-[#E2D9C8]/75">
              <li><Link href="/collections/all" className="hover:text-[#F3EFE6] transition-colors">All Pieces</Link></li>
              <li><Link href="/collections/fragrances" className="hover:text-[#F3EFE6] transition-colors">Fragrances</Link></li>
              <li><Link href="/collections/watches" className="hover:text-[#F3EFE6] transition-colors">Timepieces</Link></li>
              <li><Link href="/collections/essentials" className="hover:text-[#F3EFE6] transition-colors">Daily Essentials</Link></li>
              <li><Link href="/collections/clothing" className="hover:text-[#F3EFE6] transition-colors">Clothing Atelier</Link></li>
            </ul>
          </div>

          {/* Col 2: The House */}
          <div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#F3EFE6] mb-4">The House</h4>
            <ul className="space-y-2.5 text-[#E2D9C8]/75">
              <li><Link href="/founder" className="hover:text-[#F3EFE6] transition-colors font-medium text-[#A58B5F]">The Founder</Link></li>
              <li><Link href="/the-house" className="hover:text-[#F3EFE6] transition-colors">Our Story</Link></li>
              <li><Link href="/our-philosophy" className="hover:text-[#F3EFE6] transition-colors">Selection Philosophy</Link></li>
              <li><Link href="/journal" className="hover:text-[#F3EFE6] transition-colors">Notes from the House</Link></li>
              <li><Link href="/gifting" className="hover:text-[#F3EFE6] transition-colors">Bespoke Gifting</Link></li>
            </ul>
          </div>

          {/* Col 3: Assistance */}
          <div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#F3EFE6] mb-4">Assistance</h4>
            <ul className="space-y-2.5 text-[#E2D9C8]/75">
              <li><Link href="/track-order" className="hover:text-[#F3EFE6] transition-colors">Track Your Order</Link></li>
              <li><Link href="/shipping" className="hover:text-[#F3EFE6] transition-colors">Shipping Standards</Link></li>
              <li><Link href="/returns" className="hover:text-[#F3EFE6] transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faqs" className="hover:text-[#F3EFE6] transition-colors">Frequently Asked</Link></li>
              <li><Link href="/contact" className="hover:text-[#F3EFE6] transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* Col 4: Pan-India Delivery */}
          <div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#F3EFE6] mb-4">Pan-India</h4>
            <ul className="space-y-2.5 text-[#E2D9C8]/75">
              <li><Link href="/delivery" className="hover:text-[#F3EFE6] transition-colors font-medium text-[#A58B5F]">Delivery Directory</Link></li>
              <li><Link href="/delivery/delhi" className="hover:text-[#F3EFE6] transition-colors">Delhi NCR Hub</Link></li>
              <li><Link href="/delivery/maharashtra" className="hover:text-[#F3EFE6] transition-colors">Maharashtra</Link></li>
              <li><Link href="/delivery/karnataka" className="hover:text-[#F3EFE6] transition-colors">Karnataka</Link></li>
              <li><Link href="/delivery/west-bengal" className="hover:text-[#F3EFE6] transition-colors">West Bengal</Link></li>
            </ul>
          </div>

          {/* Col 5: Legal & Policies */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#F3EFE6] mb-4">Integrity</h4>
            <ul className="space-y-2.5 text-[#E2D9C8]/75">
              <li><Link href="/privacy" className="hover:text-[#F3EFE6] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#F3EFE6] transition-colors">Terms of Commerce</Link></li>
              <li><Link href="/cancellation-refunds" className="hover:text-[#F3EFE6] transition-colors">Refund Policies</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with subtle administrator access emoji 📩 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E2D9C8]/60 font-mono gap-4">
          <p>© 2026 GULATI & SONS · All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <span>Secure 256-Bit SSL Checkout</span>
            <span>·</span>
            <span>Pan-India Logistics</span>
            <span>·</span>
            {/* The exact specified administrator emoji entry */}
            <Link
              href="/admin/login"
              title="Super Administrator Access"
              className="text-base text-[#E2D9C8]/40 hover:text-[#E2D9C8] transition-colors cursor-pointer select-none"
              aria-label="Staff and Super Admin Login"
            >
              📩
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
