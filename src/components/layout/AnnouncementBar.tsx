'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCommerce } from '@/lib/store/commerceStore';

export default function AnnouncementBar() {
  const pathname = usePathname();
  const { settings } = useCommerce();
  const [hasScrolled, setHasScrolled] = useState(false);

  const isHomepage = pathname === '/';

  useEffect(() => {
    if (!isHomepage) {
      setHasScrolled(true);
      return;
    }

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  if (!settings.showAnnouncement || !settings.announcementText) {
    return null;
  }

  // On homepage initial load, keep hidden so the opening video is the only visible element
  if (isHomepage && !hasScrolled) {
    return null;
  }

  return (
    <aside aria-label="Announcement" className="bg-[#3C2921] text-[#E2D9C8] text-[13px] sm:text-xs tracking-[0.2em] uppercase py-2 px-4 text-center font-sans border-b border-[#A58B5F]/20 relative z-50 transition-opacity duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span>{settings.announcementText}</span>
      </div>
    </aside>
  );
}

