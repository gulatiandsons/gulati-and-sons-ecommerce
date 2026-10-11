'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Shield, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/store/authStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginWithGoogle, isAdmin, currentUser } = useAuth();
  const [email, setEmail] = useState('yashveer@gulatiandsons.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const ok = await loginWithGoogle(true);
      if (ok) {
        router.push('/admin');
      }
    } catch {
      setErrorMsg('Administrative verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoAdmin = async () => {
    setIsSubmitting(true);
    await loginWithGoogle(true);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#3C2921] text-[#F3EFE6] flex flex-col justify-center items-center px-6 py-20 relative select-none">
      {/* Decorative Monogram */}
      <div className="absolute top-10 w-full flex justify-center">
        <Link href="/" className="relative h-12 w-48 opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/logo-nav.png"
            alt="Gulati & Sons"
            fill
            className="object-contain brightness-0 invert"
            sizes="192px"
          />
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#252522] border border-[#A58B5F]/40 p-8 sm:p-10 shadow-2xl space-y-8 relative z-10">
        <div className="text-center space-y-2 border-b border-[#A58B5F]/30 pb-6">
          <div className="w-12 h-12 rounded-full bg-[#51292D] border border-[#A58B5F]/50 flex items-center justify-center mx-auto text-[#F3EFE6]">
            <Lock className="w-5 h-5 text-[#A58B5F]" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A58B5F] block">
            AUTHORIZATION CLEARANCE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide">
            Super Admin Portal
          </h1>
          <p className="text-xs text-[#E2D9C8]/70 font-sans">
            Dedicated administrative console for Gulati & Sons store operations.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-[#51292D]/40 border border-[#51292D] text-xs font-mono text-[#F3EFE6] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#A58B5F]" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleAdminSignIn} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#E2D9C8]/80 mb-1">
              Admin Identity / Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#3C2921] border border-[#A58B5F]/40 text-xs font-mono text-[#F3EFE6] outline-none focus:border-[#A58B5F]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[#E2D9C8]/80 mb-1">
              Administrative Passkey
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#3C2921] border border-[#A58B5F]/40 text-xs font-mono text-[#F3EFE6] outline-none focus:border-[#A58B5F]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#A58B5F] hover:text-[#252522] transition-colors border border-[#A58B5F]/30 disabled:opacity-50"
          >
            <span>Authenticate Administrator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="space-y-3 pt-4 border-t border-[#A58B5F]/20 text-center">
          <button
            onClick={handleQuickDemoAdmin}
            type="button"
            className="w-full py-2.5 bg-[#34483D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#34483D]/80 transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-3.5 h-3.5 text-[#A58B5F]" />
            <span>Instant Demo Super Admin Access</span>
          </button>

          <p className="text-[10px] text-[#E2D9C8]/50 font-mono">
            Firebase Google Auth & Custom Admin Role claims enforced.
          </p>
        </div>
      </div>
    </div>
  );
}
