'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function PrivateCorrespondence() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <section
      aria-labelledby="correspondence-heading"
      className="w-full bg-[#E2D9C8] text-[#252522] py-24 lg:py-32 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]"
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <span className="text-[13px] font-mono uppercase tracking-[0.3em] text-[#51292D] block">
          PRIVATE CORRESPONDENCE
        </span>

        <h2
          id="correspondence-heading"
          className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#252522] font-normal"
        >
          A Letter From the House.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#252522]/80 max-w-xl mx-auto font-light leading-relaxed">
          Occasional notes on new collections, considered essentials and what is coming next. Sent with restraint.
        </p>

        {status === 'success' ? (
          <div className="p-6 bg-[#F3EFE6] border border-[#34483D]/40 max-w-md mx-auto text-center space-y-2 animate-in fade-in duration-300">
            <CheckCircle2 className="w-6 h-6 text-[#34483D] mx-auto" />
            <h3 className="font-serif text-xl text-[#252522]">You Are Subscribed</h3>
            <p className="text-xs text-[#252522]/70 font-sans">
              Thank you. Future correspondence will arrive quietly at your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address..."
                aria-label="Email address for private correspondence"
                required
                className="flex-1 px-4 py-3.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] placeholder:text-[#252522]/50 outline-none focus:border-[#51292D]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center min-w-[130px] min-h-[44px]"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#F3EFE6]" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-[#51292D] text-left">
                Please provide a valid email address.
              </p>
            )}

            <p className="text-[13px] text-[#252522]/80 font-sans">
              By submitting, you agree to our{' '}
              <Link href="/privacy" className="underline hover:text-[#51292D] font-medium">
                Privacy Terms
              </Link>
              . You may unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
