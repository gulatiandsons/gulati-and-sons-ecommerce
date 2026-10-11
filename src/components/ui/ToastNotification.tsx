'use client';

import React from 'react';
import { useCommerce } from '@/lib/store/commerceStore';
import { CheckCircle2 } from 'lucide-react';

export default function ToastNotification() {
  const { activeToast } = useCommerce();

  if (!activeToast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[120] bg-[#3C2921] text-[#F3EFE6] px-5 py-3.5 shadow-2xl border border-[#A58B5F]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <CheckCircle2 className="w-4 h-4 text-[#A58B5F]" />
      <span className="font-sans text-xs tracking-wide">{activeToast}</span>
    </div>
  );
}
