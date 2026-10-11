'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';

export default function PersonalSelection() {
  const { products } = useCommerce();
  const [step, setStep] = useState(1);
  const [categoryChoice, setCategoryChoice] = useState<'fragrance' | 'watch' | 'clothing' | null>(null);
  const [occasionChoice, setOccasionChoice] = useState<string | null>(null);
  const [priorityChoice, setPriorityChoice] = useState<string | null>(null);

  const handleReset = () => {
    setStep(1);
    setCategoryChoice(null);
    setOccasionChoice(null);
    setPriorityChoice(null);
  };

  // Determine matched product based on user selections
  const getMatchedProduct = () => {
    if (categoryChoice === 'watch') {
      return products.find((p) => p.category === 'watches') || products[0];
    }
    if (categoryChoice === 'clothing') {
      return products.find((p) => p.category === 'clothing') || products[0];
    }
    return products.find((p) => p.category === 'fragrances') || products[0];
  };

  const matchedProduct = getMatchedProduct();

  return (
    <section
      aria-labelledby="personal-selection-heading"
      className="w-full bg-[#E2D9C8]/60 text-[#252522] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-[#CCC5B9]/80"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
            PRIVATE CONSULTATION
          </span>
          <h2
            id="personal-selection-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] font-normal"
          >
            Not Sure Where to Begin?
          </h2>
          <p className="text-xs sm:text-sm text-[#252522]/70 font-sans max-w-md mx-auto">
            A few simple choices can help you find something suitable from our Private House catalog.
          </p>
        </div>

        {/* Consultation Container */}
        <div className="bg-[#F3EFE6] border border-[#A58B5F]/40 shadow-xl p-8 sm:p-12 relative">
          {step < 4 ? (
            <div className="space-y-8">
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs font-mono text-[#51292D] border-b border-[#CCC5B9]/60 pb-4">
                <span>CONSULTATION PHASE {step} OF 3</span>
                <span>STEP 0{step}</span>
              </div>

              {/* Step 1: Category */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl text-[#252522]">What are you shopping for?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'fragrance', label: 'An Artisanal Fragrance', desc: 'Resinous ouds & amber compositions' },
                      { id: 'watch', label: 'A Heritage Timepiece', desc: 'Precision luxury sports horology' },
                      { id: 'clothing', label: 'Tailored Leather Outerwear', desc: 'Supple Nappa utility moto cut' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setCategoryChoice(opt.id as any);
                          setStep(2);
                        }}
                        className="p-5 text-left bg-[#E2D9C8]/40 border border-[#CCC5B9] hover:border-[#51292D] hover:bg-[#E2D9C8] transition-all group"
                      >
                        <h4 className="font-serif text-lg text-[#252522] group-hover:text-[#51292D]">{opt.label}</h4>
                        <p className="text-xs text-[#252522]/60 mt-1 font-sans">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Occasion */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl text-[#252522]">What is the primary occasion?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'everyday', label: 'Everyday Discernment', desc: 'Versatile character for routine wear' },
                      { id: 'special', label: 'Special Evenings & Soirees', desc: 'Commanding presence for notable hours' },
                      { id: 'gift', label: 'A Commemorative Gift', desc: 'Presented in signature hardboard casing' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setOccasionChoice(opt.id);
                          setStep(3);
                        }}
                        className="p-5 text-left bg-[#E2D9C8]/40 border border-[#CCC5B9] hover:border-[#51292D] hover:bg-[#E2D9C8] transition-all group"
                      >
                        <h4 className="font-serif text-lg text-[#252522] group-hover:text-[#51292D]">{opt.label}</h4>
                        <p className="text-xs text-[#252522]/60 mt-1 font-sans">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Priority */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl text-[#252522]">What matters most to you?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'character', label: 'Distinctive Character', desc: 'Unmistakable aesthetic and presence' },
                      { id: 'durability', label: 'Enduring Craftsmanship', desc: 'Materials built to weather decades' },
                      { id: 'versatility', label: 'Subtle Versatility', desc: 'Seamlessly moving between occasions' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setPriorityChoice(opt.id);
                          setStep(4);
                        }}
                        className="p-5 text-left bg-[#E2D9C8]/40 border border-[#CCC5B9] hover:border-[#51292D] hover:bg-[#E2D9C8] transition-all group"
                      >
                        <h4 className="font-serif text-lg text-[#252522] group-hover:text-[#51292D]">{opt.label}</h4>
                        <p className="text-xs text-[#252522]/60 mt-1 font-sans">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Result Panel */
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[#CCC5B9]/60 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#34483D] flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#34483D]" /> Personal Recommendation Verified
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-[#51292D] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 relative aspect-[4/5] bg-[#E2D9C8] border border-[#CCC5B9] overflow-hidden">
                  <Image
                    src={matchedProduct.images[0]?.url || ''}
                    alt={matchedProduct.name}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58B5F]">
                      {matchedProduct.categoryLabel}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#252522] mt-1">
                      {matchedProduct.name}
                    </h3>
                    <p className="font-serif text-xl text-[#51292D] font-medium mt-1">
                      ₹{matchedProduct.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#252522]/80 leading-relaxed font-sans">
                    Recommended based on your stated preference for {categoryChoice} with focus on {priorityChoice} for {occasionChoice} settings.
                  </p>

                  <div className="pt-2 flex gap-4">
                    <Link
                      href={`/products/${matchedProduct.slug}`}
                      className="px-6 py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-[#3C2921] transition-colors"
                    >
                      Inspect Match <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
