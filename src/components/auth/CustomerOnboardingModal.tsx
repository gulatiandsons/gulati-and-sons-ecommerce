'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/store/authStore';
import { PAN_INDIA_REGIONS } from '@/lib/data/deliveryStates';
import {
  User,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function CustomerOnboardingModal() {
  const {
    currentUser,
    showOnboardingModal,
    setShowOnboardingModal,
    checkUsernameAvailable,
    completeOnboarding
  } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Step 1: Personal Details
  const [fullName, setFullName] = useState(currentUser?.fullName || currentUser?.name || '');
  const [age, setAge] = useState<number | ''>(25);
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  // Step 2: Contact Information
  const [primaryPhone, setPrimaryPhone] = useState(currentUser?.phone || '');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');

  // Step 3: Delivery Address
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressLine3, setAddressLine3] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('');

  // Auto-generate suggested username from Google name or email
  useEffect(() => {
    if (currentUser && !username) {
      const base = (currentUser.name || currentUser.email.split('@')[0])
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
      const candidate = `${base.slice(0, 12)}_${Math.floor(100 + Math.random() * 900)}`;
      setUsername(candidate);
    }
    if (currentUser?.email && !contactEmail) {
      setContactEmail(currentUser.email);
    }
  }, [currentUser]);

  // Username validation check
  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameStatus('idle');
      return;
    }

    const timer = setTimeout(async () => {
      setUsernameStatus('checking');
      const isOk = await checkUsernameAvailable(username);
      setUsernameStatus(isOk ? 'available' : 'taken');
    }, 450);

    return () => clearTimeout(timer);
  }, [username]);

  if (!showOnboardingModal) return null;

  const validateStep1 = () => {
    setErrorMsg(null);
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return false;
    }
    if (!age || Number(age) < 18) {
      setErrorMsg('Patrons must be at least 18 years of age.');
      return false;
    }
    if (!/^[a-z0-9_-]{3,20}$/i.test(username.trim())) {
      setErrorMsg('Username must be 3–20 characters using letters, numbers, underscores, or hyphens.');
      return false;
    }
    if (usernameStatus === 'taken') {
      setErrorMsg('This username is already claimed. Please choose a different handle.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    setErrorMsg(null);
    const cleanedPhone = primaryPhone.replace(/[^0-9]/g, '');
    if (cleanedPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number for courier notifications.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      setErrorMsg('Please enter a valid correspondence email address.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    setErrorMsg(null);
    if (!addressLine1.trim() || !addressLine2.trim() || !city.trim() || !pincode.trim()) {
      setErrorMsg('Please complete required address fields (Lines 1 & 2, City, and PIN code).');
      return false;
    }
    if (!/^[1-9][0-9]{5}$/.test(pincode.trim())) {
      setErrorMsg('Please enter a valid 6-digit Indian Postal PIN code (e.g. 110003).');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const result = await completeOnboarding({
      fullName,
      age: Number(age),
      username,
      primaryPhone,
      secondaryPhone,
      contactEmail,
      addressLine1,
      addressLine2,
      addressLine3,
      landmark,
      city,
      state,
      pincode
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to complete profile registration.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-heading"
      className="fixed inset-0 z-50 bg-[#252522]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="w-full max-w-lg bg-[#F3EFE6] text-[#252522] border border-[#A58B5F]/40 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-[#3C2921] text-[#F3EFE6] px-6 py-5 border-b border-[#A58B5F]/40 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A58B5F] block">
              PATRON INAUGURATION · STEP {step} OF 3
            </span>
            <h2 id="onboarding-heading" className="font-serif text-xl sm:text-2xl font-normal">
              {step === 1 && 'Tell Us About Yourself'}
              {step === 2 && 'Your Contact Information'}
              {step === 3 && 'Where Should We Deliver?'}
            </h2>
          </div>
          <button
            onClick={() => setShowOnboardingModal(false)}
            className="p-1 text-[#E2D9C8]/70 hover:text-[#F3EFE6] transition-colors"
            aria-label="Dismiss modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#E2D9C8] h-1">
          <div
            className="bg-[#51292D] h-1 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-[#51292D]/10 border border-[#51292D] text-xs font-mono text-[#51292D] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#51292D]" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: PERSONAL DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[#252522]/70 font-sans leading-relaxed">
                Establish your private identity with Gulati & Sons for seamless acquisition, bespoke correspondence, and client privilege.
              </p>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                  Your Full Name <span className="text-[#51292D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maharaja Vikramaditya Singh"
                  className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                    Your Age <span className="text-[#51292D]">*</span>
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={120}
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-mono text-[#252522] outline-none focus:border-[#51292D]"
                  />
                  <span className="text-[11px] font-mono text-[#252522]/50 mt-1 block">Min. 18 years</span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                    Unique Username <span className="text-[#51292D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    placeholder="e.g. devraj_c"
                    className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-mono text-[#252522] outline-none focus:border-[#51292D]"
                  />
                  <div className="text-[11px] font-mono mt-1 flex items-center gap-1">
                    {usernameStatus === 'checking' && <span className="text-[#A58B5F]">Verifying...</span>}
                    {usernameStatus === 'available' && <span className="text-[#34483D] flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Available</span>}
                    {usernameStatus === 'taken' && <span className="text-[#51292D] flex items-center gap-0.5"><AlertCircle className="w-3 h-3" /> Already taken</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONTACT DETAILS */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-[#252522]/70 font-sans leading-relaxed">
                Provide your direct contact coordinates for courier SMS tracking updates and secure delivery handover.
              </p>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                  Primary Mobile Number <span className="text-[#51292D]">*</span>
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 bg-[#E2D9C8]/50 border border-[#CCC5B9] text-xs font-mono text-[#252522]/70 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={primaryPhone.replace('+91', '').trim()}
                    onChange={(e) => setPrimaryPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-mono text-[#252522] outline-none focus:border-[#51292D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                  Secondary Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  placeholder="Alternate phone or estate landline"
                  className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-mono text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                  Correspondence Email <span className="text-[#51292D]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-mono text-[#252522] outline-none focus:border-[#51292D]"
                />
                <span className="text-[11px] font-mono text-[#252522]/50 mt-1 block">
                  Prefilled from verified Google Auth identity
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: DELIVERY ADDRESS */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-[#252522]/70 font-sans leading-relaxed">
                Enter your residential or estate address for white-glove Pan-India delivery dispatch.
              </p>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                  Address Line 1 <span className="text-[#51292D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Apartment, suite, or flat number"
                  className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                  Address Line 2 <span className="text-[#51292D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Building name, estate, or street name"
                  className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                    Address Line 3 (Optional)
                  </label>
                  <input
                    type="text"
                    value={addressLine3}
                    onChange={(e) => setAddressLine3(e.target.value)}
                    placeholder="Locality or sector"
                    className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Near prominent landmark"
                    className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                    City <span className="text-[#51292D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3 py-2 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                    State <span className="text-[#51292D]">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans text-[#252522] outline-none focus:border-[#51292D]"
                  >
                    {PAN_INDIA_REGIONS.map((r) => (
                      <option key={r.slug} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/80 mb-1">
                    PIN Code <span className="text-[#51292D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="6 digits"
                    className="w-full px-3 py-2 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-mono text-[#252522] outline-none focus:border-[#51292D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#CCC5B9]/60 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                className="px-4 py-2.5 border border-[#CCC5B9] text-xs font-mono uppercase tracking-wider text-[#252522] hover:bg-[#E2D9C8] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.15em] hover:bg-[#3C2921] flex items-center gap-1.5 transition-colors shadow-sm ml-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.15em] hover:bg-[#3C2921] flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50 ml-auto"
              >
                {isSubmitting ? (
                  <span>Registering Patron Dossier...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#A58B5F]" />
                    <span>Complete Inauguration</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
