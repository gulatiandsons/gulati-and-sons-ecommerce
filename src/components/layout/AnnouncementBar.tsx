'use client';

import React from 'react';
import { useCommerce } from '@/lib/store/commerceStore';

export default function AnnouncementBar() {
  const { settings } = useCommerce();

  if (!settings.showAnnouncement || !settings.announcementText) {
    return null;
  }

  return (
    <aside aria-label="Announcement" className="bg-[#3C2921] text-[#E2D9C8] text-[11px] sm:text-xs tracking-[0.2em] uppercase py-2 px-4 text-center font-sans border-b border-[#A58B5F]/20 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span>{settings.announcementText}</span>
      </div>
    </aside>
  );
}
