'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { useAuth } from '@/lib/store/authStore';

export default function Header() {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen, setIsSearchOpen } = useCommerce();
  const { currentUser, isAdmin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close menus on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Determine styling: on homepage at top, transparent; otherwise solid warm ivory
  const isTransparent = isHomepage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent text-[#F3EFE6]'
          : 'bg-[#F3EFE6]/95 backdrop-blur-md text-[#252522] border-b border-[#A58B5F]/20 shadow-sm'
      }`}
    >
      {/* Top utility row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Mobile hamburger & Region currency */}
        <div className="flex items-center gap-4 lg:w-1/4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-current hover:opacity-75 transition-opacity"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase opacity-80">
            <span>India</span>
            <span>·</span>
            <span>INR (₹)</span>
          </div>
        </div>

        {/* Center: Brand Wordmark / Emblem Logo */}
        <div className="flex justify-center items-center lg:w-2/4">
          <Link href="/" className="relative flex items-center justify-center group" aria-label="Gulati & Sons Home">
            <div className="relative h-14 w-28 sm:h-16 sm:w-32 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/logo-nav.png"
                alt="Gulati & Sons - The Private House"
                fill
                priority
                className={`object-contain transition-all duration-300 ${
                  isTransparent ? 'brightness-125 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]' : ''
                }`}
                sizes="(max-width: 640px) 112px, 128px"
              />
            </div>
          </Link>
        </div>

        {/* Right: Actions (Search, Wishlist, Account, Bag) */}
        <div className="flex items-center justify-end gap-3 sm:gap-5 lg:w-1/4">
          {/* Global Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-current hover:text-[#51292D] transition-colors flex items-center gap-1.5"
            aria-label="Search collection"
          >
            <Search className="w-5 h-5" />
            <span className="hidden xl:inline text-xs uppercase tracking-wider font-mono">Search</span>
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2 text-current hover:text-[#51292D] transition-colors relative"
            aria-label="Saved Items"
          >
            <Heart className="w-5 h-5" />
            {mounted && wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#51292D] rounded-full" />
            )}
          </Link>

          {/* Account */}
          <Link
            href="/account"
            className="p-2 text-current hover:text-[#51292D] transition-colors hidden sm:block"
            aria-label="Patron Account"
            title={mounted && currentUser ? `Account: ${currentUser.name}` : 'Patron Account'}
            suppressHydrationWarning
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Admin shortcut badge if logged in */}
          {mounted && isAdmin && (
            <Link
              href="/admin"
              className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#51292D] text-[#F3EFE6] tracking-wider rounded-sm hidden sm:inline-block"
            >
              Admin
            </Link>
          )}

          {/* Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-current hover:text-[#51292D] transition-colors flex items-center gap-1.5 relative"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-mono font-medium">{mounted ? totalCartCount : 0}</span>
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav aria-label="Main Navigation" className="hidden lg:block border-t border-current/10">
        <div className="max-w-7xl mx-auto px-8 flex justify-center items-center gap-10 h-11 text-xs tracking-[0.2em] uppercase font-sans">
          <Link
            href="/collections/all"
            className="hover:text-[#51292D] transition-colors relative py-2"
          >
            New Arrivals
          </Link>

          {/* Fragrance with Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('fragrance')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link
              href="/collections/fragrances"
              className="hover:text-[#51292D] transition-colors flex items-center gap-1 py-2"
            >
              Fragrance <ChevronDown className="w-3 h-3 opacity-60" />
            </Link>

            {activeMegaMenu === 'fragrance' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#F3EFE6] text-[#252522] border border-[#A58B5F]/30 shadow-2xl p-8 grid grid-cols-4 gap-6 animate-in fade-in duration-200">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">Shop All</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/collections/fragrances" className="hover:text-[#51292D]">All Fragrances</Link></li>
                    <li><Link href="/collections/fragrances?family=oud" className="hover:text-[#51292D]">Oud & Amber</Link></li>
                    <li><Link href="/collections/fragrances?type=edp" className="hover:text-[#51292D]">Eau de Parfum</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">By Character</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/collections/fragrances?character=woody" className="hover:text-[#51292D]">Woody & Smokey</Link></li>
                    <li><Link href="/collections/fragrances?character=fresh" className="hover:text-[#51292D]">Sunlit Citrus</Link></li>
                    <li><Link href="/collections/fragrances?character=floral" className="hover:text-[#51292D]">Rose & Orris</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">Occasion</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/collections/fragrances?occasion=everyday" className="hover:text-[#51292D]">Everyday Sillage</Link></li>
                    <li><Link href="/collections/fragrances?occasion=evening" className="hover:text-[#51292D]">Black Tie & Evenings</Link></li>
                    <li><Link href="/gifting" className="hover:text-[#51292D]">Gifting Selections</Link></li>
                  </ul>
                </div>
                <div className="bg-[#E2D9C8]/40 p-4 border border-[#CCC5B9]/60 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58B5F]">Signature</span>
                    <h5 className="font-serif text-sm text-[#252522] mt-1">Bella Vita OUD Gold</h5>
                    <p className="text-[11px] text-[#252522]/70 mt-1 normal-case tracking-normal">Woody oriental parfum in 50ml flacon.</p>
                  </div>
                  <Link href="/products/bella-vita-luxury-oud-gold-eau-de-parfum" className="text-[11px] text-[#51292D] font-medium uppercase tracking-wider mt-3">
                    Explore Bottle &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Watches with Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('watches')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link
              href="/collections/watches"
              className="hover:text-[#51292D] transition-colors flex items-center gap-1 py-2"
            >
              Watches <ChevronDown className="w-3 h-3 opacity-60" />
            </Link>

            {activeMegaMenu === 'watches' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#F3EFE6] text-[#252522] border border-[#A58B5F]/30 shadow-2xl p-8 grid grid-cols-4 gap-6 animate-in fade-in duration-200">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">Horology</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/collections/watches" className="hover:text-[#51292D]">All Timepieces</Link></li>
                    <li><Link href="/collections/watches?style=sports" className="hover:text-[#51292D]">Luxury Sports</Link></li>
                    <li><Link href="/collections/watches?style=dress" className="hover:text-[#51292D]">Dress Models</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">Materials</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/collections/watches?material=rolesor" className="hover:text-[#51292D]">Yellow Rolesor</Link></li>
                    <li><Link href="/collections/watches?material=oystersteel" className="hover:text-[#51292D]">Oystersteel</Link></li>
                    <li><Link href="/collections/watches?material=leather" className="hover:text-[#51292D]">Leather Straps</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">Horological Care</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/journal/demystifying-watch-case-proportions" className="hover:text-[#51292D]">Case Size Guide</Link></li>
                    <li><Link href="/support" className="hover:text-[#51292D]">Authenticity & Care</Link></li>
                  </ul>
                </div>
                <div className="bg-[#3C2921] text-[#F3EFE6] p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58B5F]">Featured View</span>
                    <h5 className="font-serif text-sm mt-1">Submariner 126613LN</h5>
                    <p className="text-[11px] text-[#E2D9C8]/70 mt-1 normal-case tracking-normal">Interactive Watchmaker 3D Explorer.</p>
                  </div>
                  <Link href="/products/rolex-submariner-date-126613ln" className="text-[11px] text-[#A58B5F] uppercase tracking-wider mt-3">
                    Launch Inspector &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Essentials */}
          <Link
            href="/collections/essentials"
            className="hover:text-[#51292D] transition-colors py-2"
          >
            Essentials
          </Link>

          {/* Clothing / Outerwear */}
          <Link
            href="/collections/clothing"
            className="hover:text-[#51292D] transition-colors py-2"
          >
            Clothing
          </Link>

          {/* The House with Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('house')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link
              href="/the-house"
              className="hover:text-[#51292D] transition-colors flex items-center gap-1 py-2"
            >
              The House <ChevronDown className="w-3 h-3 opacity-60" />
            </Link>

            {activeMegaMenu === 'house' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] bg-[#F3EFE6] text-[#252522] border border-[#A58B5F]/30 shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in duration-200">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">Our Legacy</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/the-house" className="hover:text-[#51292D]">The Private House</Link></li>
                    <li><Link href="/our-philosophy" className="hover:text-[#51292D]">Selection Philosophy</Link></li>
                    <li><Link href="/journal" className="hover:text-[#51292D]">Notes from the House</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">Services</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/gifting" className="hover:text-[#51292D]">Bespoke Gifting</Link></li>
                    <li><Link href="/delivery" className="hover:text-[#51292D]">Pan-India Delivery</Link></li>
                    <li><Link href="/contact" className="hover:text-[#51292D]">Concierge Assistance</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#51292D] mb-3">Assistance</p>
                  <ul className="space-y-2 text-xs normal-case tracking-normal">
                    <li><Link href="/track-order" className="hover:text-[#51292D]">Order Tracking</Link></li>
                    <li><Link href="/shipping" className="hover:text-[#51292D]">Shipping Standards</Link></li>
                    <li><Link href="/faqs" className="hover:text-[#51292D]">Frequently Asked</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-[#252522]/80 backdrop-blur-sm lg:hidden"
        >
          <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#F3EFE6] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-[#CCC5B9]/60">
                <div className="relative h-10 w-36">
                  <Image src="/logo-nav.png" alt="Gulati & Sons" fill className="object-contain" sizes="144px" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#252522] hover:text-[#51292D]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <Link
                  href="/collections/all"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  View All Pieces &rarr;
                </Link>
                <Link
                  href="/collections/fragrances"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  Fragrances
                </Link>
                <Link
                  href="/collections/watches"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  Timepieces
                </Link>
                <Link
                  href="/collections/essentials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  Daily Essentials
                </Link>
                <Link
                  href="/collections/clothing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  Clothing & Atelier
                </Link>
                <Link
                  href="/the-house"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  The House
                </Link>
                <Link
                  href="/journal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  Journal
                </Link>
                <Link
                  href="/gifting"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  Gifting Services
                </Link>
                <Link
                  href="/delivery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#252522] hover:text-[#51292D]"
                >
                  Pan-India Delivery
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#CCC5B9]/60 space-y-3">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-[#252522]"
              >
                <User className="w-4 h-4" /> Account & Orders
              </Link>
              <p className="text-[11px] font-mono text-[#252522]/60">
                Pan-India White Glove Concierge
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
